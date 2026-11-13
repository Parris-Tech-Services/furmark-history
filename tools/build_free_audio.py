#!/usr/bin/env python3
"""Free, offline two-host podcast builder. No API key, no account.

  kokoro : Kokoro-82M via kokoro-onnx (Apache-2.0)  -> Superposition episode
  piper  : Piper neural TTS (en_US lessac + ryan)   -> Steel Nomad episode

  pip install kokoro-onnx piper-tts soundfile numpy   (ffmpeg on PATH)
  python3 tools/build_free_audio.py kokoro podcast/superposition_script.txt site/out.mp3 \
      --model kokoro.onnx --voices voices.bin
  python3 tools/build_free_audio.py piper podcast/steelnomad_script.txt site/out.mp3 \
      --model-a en_US-lessac-medium.onnx --model-b en_US-ryan-high.onnx
Model files: kokoro-onnx release "model-files-v1.0" (github.com/thewh1teagle/kokoro-onnx);
Piper voices from huggingface.co/rhasspy/piper-voices.
"""
import argparse, subprocess, sys, tempfile, wave, os
import numpy as np

ap = argparse.ArgumentParser()
ap.add_argument("engine", choices=["kokoro", "piper"])
ap.add_argument("script"); ap.add_argument("out")
ap.add_argument("--model"); ap.add_argument("--voices")
ap.add_argument("--model-a"); ap.add_argument("--model-b")
a = ap.parse_args()

lines = []  # (speaker_index, text, is_new_segment)
speakers = []
new_seg = False
for raw in open(a.script, encoding="utf-8"):
    raw = raw.strip()
    if not raw or raw.startswith("# "):
        continue
    if raw.startswith("##"):
        new_seg = True; continue
    name, _, text = raw.partition(":")
    if name not in speakers: speakers.append(name)
    lines.append((speakers.index(name), text.strip(), new_seg)); new_seg = False
assert len(speakers) == 2, speakers

def silence(sr, sec): return np.zeros(int(sr * sec), dtype=np.float32)

chunks, SR = [], 24000
if a.engine == "kokoro":
    from kokoro_onnx import Kokoro
    k = Kokoro(a.model, a.voices)
    voice = ["af_heart", "am_michael"]
    for who, text, seg in lines:
        s, sr = k.create(text, voice=voice[who], speed=1.0, lang="en-us")
        SR = sr
        if seg: chunks.append(silence(sr, 0.9))
        chunks += [s.astype(np.float32), silence(sr, 0.35)]
else:
    models = [a.model_a, a.model_b]
    for who, text, seg in lines:
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as t: p = t.name
        subprocess.run([sys.executable, "-m", "piper", "-m", models[who], "-f", p, "--", text],
                       check=True, capture_output=True)
        with wave.open(p) as w:
            sr = w.getframerate(); d = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768
        os.unlink(p)
        if SR != sr or not chunks: SR = sr
        if sr != SR: raise SystemExit("voices differ in sample rate; resample first")
        if seg: chunks.append(silence(sr, 0.9))
        chunks += [d, silence(sr, 0.35)]

audio = np.concatenate(chunks)
peak = float(np.abs(audio).max()) or 1.0
audio = (audio / peak * 0.9 * 32767).astype(np.int16)
tmp = a.out + ".wav"
with wave.open(tmp, "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(audio.tobytes())
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", tmp, "-b:a", "96k", a.out], check=True)
os.unlink(tmp)
print(f"{a.out}: {len(audio)/SR/60:.1f} min, {len(lines)} lines")
