# GPU benchmark histories

Sourced histories of GPU benchmarks. The main project is **FurMark** (below); newer write-ups cover **UNIGINE Superposition** and **3DMark / Steel Nomad**.

**More research**
- [docs/FACT_CHECK.md](docs/FACT_CHECK.md): what was re-checked and corrected on 13 Nov 2026
- [docs/SUPERPOSITION.md](docs/SUPERPOSITION.md): UNIGINE Superposition (2017) and its Sanctuary, Tropics, Heaven, Valley lineage
- [docs/3DMARK_STEEL_NOMAD.md](docs/3DMARK_STEEL_NOMAD.md): 3DMark from 1998, Futuremark to UL, and Steel Nomad (2024)

## FurMark history

The story of **FurMark**, the furry-donut GPU stress test: a sourced timeline, an 8-minute two-host podcast (script + audio), and a PDF companion.

**Listen / read online**
- Podcast PDF (cover, episode guide, timeline, full transcript, sources): https://cdn.jsdelivr.net/gh/Parris-Tech-Services/furmark-history@main/site/furmark-history-podcast.pdf
- Podcast audio (MP3, ~8 min): https://cdn.jsdelivr.net/gh/Parris-Tech-Services/furmark-history@main/site/furmark-history-podcast.mp3
- Research write-up with every source: [docs/HISTORY.md](docs/HISTORY.md)

**Free podcast episodes** (no API key; built offline by `tools/build_free_audio.py`)
- Superposition, voices by Kokoro-82M: [audio](site/superposition-history-podcast.mp3) · [script](podcast/superposition_script.txt)
- Steel Nomad / 3DMark, voices by Piper: [audio](site/steelnomad-history-podcast.mp3) · [script](podcast/steelnomad_script.txt)

Why these two: of the free routes I checked, Google's NotebookLM sounds best but has no way to run from a script, and the hosted services (Edge TTS) are unreachable from the build sandbox. Kokoro and Piper are open-source, run offline, and are scriptable. Kokoro sounds more natural; Piper is lighter and faster. Piper's voice licences vary by voice, so check the voice card before reusing the audio commercially.

**What's here**
| Path | What |
|---|---|
| `docs/HISTORY.md` | The research: timeline, the "power virus" years, what could not be verified, 17 numbered sources |
| `podcast/script.txt` | The episode script (Leda and Doral). Spoken forms: numbers are written out |
| `tools/build_audio.py` | Builds the MP3 with ElevenLabs Turbo v2.5 (0.5 credit/character); caches every line |
| `tools/build_pdf.py` | Builds the PDF from the script and HISTORY.md (needs pandoc and Playwright Chromium) |
| `site/` | The built MP3, PDF, and a small player page (`index.html`, works if GitHub Pages is switched on) |

**How accurate is it?** Dates and quotes come from the developer's own Geeks3D posts and changelog wherever possible; secondary and forum-only claims are marked as such. HISTORY.md ends with a list of things that could not be verified. The first-release year (2007) is the developer's own statement; the exact month is not stated in the sources read.

**Rebuild**
```bash
export ELEVENLABS_API_KEY=...        # your key; never commit it
python3 tools/build_audio.py --dry-run   # shows characters and credits first
python3 tools/build_audio.py && python3 tools/build_pdf.py
```

**Notes**
- Voices are synthetic (ElevenLabs "Laura" and "Charlie"). The intro/outro bed is generated noise, not licensed music.
- Short quotations from the developer's posts are used for commentary; follow the source links for the originals.
- Licence: [MIT](LICENSE) for the code and the original text (script, research write-up, PDF layout). Short quotations from the developer's posts and the sources they come from stay with their owners. The audio is synthetic speech generated with ElevenLabs under that service's terms.
