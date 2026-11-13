#!/usr/bin/env python3
"""Turn podcast/script.txt into an MP3 with ElevenLabs.

- Reads the API key from the proxy (header value is a placeholder: "proxy-injected") or from
  ELEVENLABS_API_KEY if you run it on your own machine.
- Caches every line by content hash in WORK_DIR, so a rerun never pays for the same line twice.
- Turbo v2.5 costs 0.5 credit per character.
Usage: python3 tools/build_audio.py [--dry-run]
"""
import hashlib, json, os, re, subprocess, sys, time, urllib.request, urllib.error
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPT = os.path.join(ROOT, "podcast", "script.txt")
OUT = os.path.join(ROOT, "site", "furmark-history-podcast.mp3")
WORK = os.environ.get("FM_WORK", os.path.join(ROOT, ".audio-cache"))
KEY = os.environ.get("ELEVENLABS_API_KEY", "proxy-injected")
MODEL = "eleven_turbo_v2_5"
VOICES = {"LEDA": "FGY2WhTYpPnrIDTdsKH5",   # Laura: enthusiast, quirky
          "DORAL": "IKne3meq5aSn9XLyUdCD"}  # Charlie: deep, confident, Australian
SETTINGS = {"stability": 0.42, "similarity_boost": 0.8, "style": 0.25, "use_speaker_boost": True}

def parse():
    segs, cur = [], None
    for line in open(SCRIPT, encoding="utf-8"):
        line = line.rstrip("\n")
        if line.startswith("## "):
            cur = {"name": line[3:], "lines": []}; segs.append(cur)
        elif re.match(r"^(LEDA|DORAL):", line):
            who, text = line.split(":", 1); cur["lines"].append((who, text.strip()))
    return segs

def tts(who, text, prev, nxt):
    h = hashlib.sha256(f"{MODEL}|{VOICES[who]}|{text}".encode()).hexdigest()[:20]
    path = os.path.join(WORK, f"{h}.mp3")
    if os.path.exists(path): return path, 0
    body = {"text": text, "model_id": MODEL, "voice_settings": SETTINGS, "language_code": "en"}
    if prev: body["previous_text"] = prev
    if nxt: body["next_text"] = nxt
    req = urllib.request.Request(
        f"https://api.elevenlabs.io/v1/text-to-speech/{VOICES[who]}?output_format=mp3_44100_128",
        data=json.dumps(body).encode(), method="POST",
        headers={"xi-api-key": KEY, "Content-Type": "application/json"})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=90) as r: data = r.read()
            open(path, "wb").write(data); return path, len(text)
        except urllib.error.HTTPError as e:
            msg = e.read().decode()[:300]
            if e.code in (429, 500, 502, 503) and attempt < 3: time.sleep(4 * (attempt + 1)); continue
            sys.exit(f"ElevenLabs error {e.code}: {msg}")
    sys.exit("gave up")

def run(*a):
    subprocess.run(a, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def main():
    dry = "--dry-run" in sys.argv
    os.makedirs(WORK, exist_ok=True); os.makedirs(os.path.dirname(OUT), exist_ok=True)
    segs = parse()
    total = sum(len(t) for s in segs for _, t in s["lines"])
    print(f"{sum(len(s['lines']) for s in segs)} lines, {total} characters (~{total*0.5:.0f} credits at 0.5/char)")
    if dry: return
    # silence pieces
    sil = {"line": 0.30, "seg": 0.85}
    for k, d in sil.items():
        run("ffmpeg", "-y", "-f", "lavfi", "-i", "anullsrc=r=44100:cl=mono", "-t", str(d), "-q:a", "9", os.path.join(WORK, f"sil_{k}.mp3"))
    parts, spent = [], 0
    for si, s in enumerate(segs):
        for li, (who, text) in enumerate(s["lines"]):
            prev = s["lines"][li - 1][1] if li else None
            nxt = s["lines"][li + 1][1] if li + 1 < len(s["lines"]) else None
            p, c = tts(who, text, prev, nxt); spent += c
            parts.append(p)
            if li + 1 < len(s["lines"]): parts.append(os.path.join(WORK, "sil_line.mp3"))
        if si + 1 < len(segs): parts.append(os.path.join(WORK, "sil_seg.mp3"))
        print(f"  done: {s['name']}  (characters sent so far: {spent})", flush=True)
    lst = os.path.join(WORK, "list.txt")
    open(lst, "w").write("".join(f"file '{p}'\n" for p in parts))
    raw = os.path.join(WORK, "speech.wav")
    run("ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", lst, "-ar", "44100", "-ac", "1", raw)
    # fan-whir intro/outro bed: filtered pink noise swelling then fading
    run("ffmpeg", "-y", "-f", "lavfi", "-i", "anoisesrc=d=3.5:c=pink:r=44100:a=0.5", "-af",
        "lowpass=f=900,highpass=f=80,afade=t=in:st=0:d=1.8,afade=t=out:st=2.4:d=1.1,volume=0.5", os.path.join(WORK, "intro.wav"))
    run("ffmpeg", "-y", "-f", "lavfi", "-i", "anoisesrc=d=3:c=pink:r=44100:a=0.5", "-af",
        "lowpass=f=900,highpass=f=80,afade=t=in:st=0:d=0.6,afade=t=out:st=1.2:d=1.8,volume=0.4", os.path.join(WORK, "outro.wav"))
    run("ffmpeg", "-y", "-i", os.path.join(WORK, "intro.wav"), "-i", raw, "-i", os.path.join(WORK, "outro.wav"),
        "-filter_complex", "[0:a][1:a][2:a]concat=n=3:v=0:a=1,loudnorm=I=-16:TP=-1.5:LRA=11[a]", "-map", "[a]",
        "-ar", "44100", "-b:a", "128k", "-id3v2_version", "3",
        "-metadata", "title=The Donut That Cooks GPUs: the story of FurMark", "-metadata", "artist=Leda & Doral",
        "-metadata", "album=FurMark History", OUT)
    dur = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", OUT],
                         capture_output=True, text=True).stdout.strip()
    print(f"wrote {OUT}  duration {float(dur)/60:.1f} min  characters sent this run: {spent}")

main()
