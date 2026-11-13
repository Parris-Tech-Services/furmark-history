#!/usr/bin/env python3
"""Turn data/benchmark_snapshot_*.csv into site/data/batch.json for the 'My GTX 1070s' explorer.

Only rows that have been started are kept (blank slots are counted, not listed).
Run after updating the snapshot:  python3 tools/build_fleet.py [path/to/snapshot.csv]
"""
import csv, glob, json, os, re, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = sys.argv[1] if len(sys.argv) > 1 else sorted(glob.glob(os.path.join(ROOT, "data", "benchmark_snapshot_*.csv")))[-1]
rows = list(csv.DictReader(l for l in open(src, encoding="utf-8") if not l.startswith("#")))
def num(x):
    x = (x or "").replace(",", "").strip()
    return float(x) if re.fullmatch(r"-?\d+(\.\d+)?", x) else None
def first_num(x):
    m = re.search(r"-?\d+(\.\d+)?", x or ""); return float(m.group()) if m else None
out = []
for r in rows:
    if r["Link_audit_status"] == "UNSTARTED_SLOT": continue
    clock = re.findall(r"(\d+) MHz", r["Published_core_clock_min_max"] or "")
    cpu = re.sub(r"\((R|TM)\)|CPU|@.*$", "", r["Published_CPU"] or "").replace("Intel", "").strip()
    out.append(dict(
        card=int(r["Card"]), gpuz=r["Spreadsheet_GPU_Z_recognised"] == "Y",
        fm=num(r["Spreadsheet_FurMark_score"]), sp=num(r["Spreadsheet_Superposition_score"]), sn=num(r["Spreadsheet_Steel_Nomad_score"]),
        rig=(r["Test_PC_label"] if r["Test_PC_label"] not in ("", "?") else "unlabelled"), url=r["FurMark_result_URL"] or None, status=r["Link_audit_status"],
        temp=first_num(r["Published_max_temperature"]), power=first_num(re.sub(r"^.*?\((\d+) W\).*$", r"\1", r["Published_max_power"] or "")) if "(" in (r["Published_max_power"] or "") else first_num(r["Published_max_power"]),
        clockmax=int(clock[1]) if len(clock) > 1 else None, cpu=cpu or None, driver=r["Published_driver"] or None, gpu=r["Published_GPU"] or None,
        pci=r["Published_PCI_ID"] or None, heaven=num(r["Sheet_Heaven_score"]), occt=r["Sheet_OCCT_note"] or None, note=r["Sheet_notes"] or None))
for c in out:  # the linked result for this card belongs to a different GPU: do not show its telemetry
    if c["status"] == "LINK_SCORE_MISMATCH":
        for k in ("temp", "power", "clockmax", "cpu", "driver", "gpu", "pci"): c[k] = None
snap = re.search(r"\d{4}-\d{2}-\d{2}", os.path.basename(src)).group()
json.dump(dict(snapshot=snap, slots=len(rows), started=len(out), cards=out), open(os.path.join(ROOT, "site", "data", "batch.json"), "w"), separators=(",", ":"))
print("wrote batch.json:", len(out), "cards from", len(rows), "slots")
