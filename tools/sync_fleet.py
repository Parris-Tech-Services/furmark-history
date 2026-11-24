"""Import only public numeric scores and recognised rig labels from the testing sheet."""
import csv
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import urlopen
from io import StringIO

ROOT = Path(__file__).resolve().parents[1]
target = ROOT / 'site/data/batch.json'
old = json.loads(target.read_text())
audit = list(csv.DictReader(line for line in sorted((ROOT / 'data').glob('benchmark_snapshot_*.csv'))[-1].read_text().splitlines() if not line.startswith('#')))
url = 'https://docs.google.com/spreadsheets/d/1yCaJ1PXI7R5sCuZopxetPMwNWyK142i7SJOmZRwTj44/gviz/tq?tqx=out:csv&gid=0'
raw = Path(sys.argv[1]).read_text() if len(sys.argv) > 1 else urlopen(url, timeout=30).read().decode('utf-8-sig')
reader = csv.DictReader(StringIO(raw))
fields = [' ', 'GPU Z Recognises', 'Test 2 – FurMark', 'Test 3 – Unique Superposition', 'Test 4 – 3D Mark (Steel Nomad Score)', 'Notes', 'Which PC?']
if not set(fields).issubset(reader.fieldnames or []):
    raise ValueError('Unexpected sheet headers')
cards = []
seen = set()
now = datetime.now(timezone.utc).isoformat(timespec='seconds')
prior = {c['card']: c for c in old['cards']}
verified_runs = json.loads((ROOT / 'data/verified_furmark_runs.json').read_text())
for row in reader:
    number, recognised, *rest = (row[key].strip() for key in fields)
    if not number.isdigit() or int(number) < 1 or int(number) in seen:
        raise ValueError('Invalid or duplicate slot')
    n = int(number)
    seen.add(n)
    # Text in a benchmark cell is a safety note (for example a noisy fan), not a score.
    nonnumeric = [x for x in rest[:3] if x and not x.isdecimal()]
    scores = [int(x) if x.isdecimal() else None for x in rest[:3]]
    # The sheet may record a stopped test instead of a recognition result.
    # This exact observed note is not proof of recognition and must never clear a sale hold.
    gpuz_fan_hold = recognised.casefold() == 'didnt continue with benchmarking, fans need tightening'
    if recognised not in ('', 'Y', 'N') and not gpuz_fan_hold:
        raise ValueError(f'Unknown GPU-Z result in slot {n}')
    if not gpuz_fan_hold and not any((recognised, *rest)):
        continue
    link = rest[3].split('#')[0]
    if re.fullmatch(r'(?:https?://)?(?:www\.)?gpumagick\.com/scores/\d+', link):
        link = 'https://www.gpumagick.com/scores/' + link.rsplit('/', 1)[1]
    link = link if re.fullmatch(r'https://www\.gpumagick\.com/scores/\d+', link) else None
    rig = rest[4] if rest[4] in ('Gigabyte', 'Asus B250', 'ASrock') else 'unlabelled'
    prev = prior.get(n, {})
    card = dict(prev, card=n, gpuz=recognised=='Y', fm=scores[0], sp=scores[1], sn=scores[2], rig=rig, url=link)
    if any(card.get(k) != prev.get(k) for k in ('fm','url','rig')) or not prev:
        card.update(status='UNAUDITED', **dict.fromkeys(('temp','power','clockmax','cpu','driver','gpu','pci','tested','preset','note','occt')))
    # Read OCCT notes as notes only. 'No errors' does not identify test mode or duration.
    occt_cell = (row.get('Test 8 - OCCT') or '').strip()
    if occt_cell:
        card['occt'] = occt_cell[:160]
    extra_note = (row.get('Other notes') or '').strip()
    if nonnumeric or ('fan' in extra_note.lower() and ('noisy' in extra_note.lower() or 'loud' in extra_note.lower())):
        note = '; '.join([*nonnumeric, extra_note]).strip('; ')[:200]
        card['status'] = 'FAN_NOISE_STOP' if 'fan' in note.lower() else 'TEST_NOTE_HOLD'
        card['note'] = note
    # Hold #40 pending confirmation that earlier test-PC BSOD was unrelated to its GPU.
    if n == 40 and not card.get('note'):
        card['note'] = 'Earlier NVIDIA-related BSOD on test PC; GPU causation unconfirmed. Retest before sale.'
    verified = verified_runs.get(link)
    if verified and verified['fm'] == scores[0]:
        card.update(verified)
    elif card.get('status') == 'MATCHED_GTX1070':
        record = next((r for r in audit if int(r['Card']) == n), None)
        if record:
            card.update(tested=record['Published_submission_time'], preset='2.11.0.4 · OpenGL 3.2 · P1080 · 60 s')
    # Apply after the public-result lookup so old verified scores cannot remove this hold.
    if gpuz_fan_hold:
        card.update(gpuz=False, status='FAN_NOISE_STOP',
                    note='Benchmarking stopped; fans need tightening. GPU-Z recognition unverified.')
    if prev and any(card.get(k) != prev.get(k) for k in ('fm','sp','sn','url','rig')):
        card['history'] = prev.get('history', []) + [dict(observed=old.get('synced',old['snapshot']), **{k:prev.get(k) for k in ('fm','sp','sn','rig','tested')})]
    cards.append(card)
if not seen or seen != set(range(1,max(seen)+1)) or max(seen)<old['slots'] or not set(prior).issubset(c['card'] for c in cards):
    raise ValueError('Incomplete sheet; keeping last successful import')
if cards == old['cards'] and len(cards) == old['started'] and len(seen) == old['slots']:
    print('Fleet unchanged; no write required')
    sys.exit(0)
old.update(cards=cards, started=len(cards), slots=len(seen), synced=now)
tmp = target.with_suffix('.tmp')
tmp.write_text(json.dumps(old,separators=(',',':')))
tmp.replace(target)
