# GPU benchmark histories

This repo documents the history of GPU benchmark culture: sourced research on FurMark, plus companion histories of UNIGINE Superposition and 3DMark / Steel Nomad. It includes research notes, podcast scripts, generated audio, PDF companions, and a GitHub Pages site.

Sourced histories of GPU benchmarks. The main project is **FurMark** (below); newer write-ups cover **UNIGINE Superposition** and **3DMark / Steel Nomad**.

**More research**
- [Source audit and corrections (13 November 2026)](docs/SOURCE_AUDIT_2026-11-13.md): primary-source fact-checks, unresolved questions and media errata
- [GPU benchmark testing and interpretation](docs/BENCHMARK_PRACTICE.md): safe repeatable procedures, score comparability, record keeping
- [docs/SUPERPOSITION.md](docs/SUPERPOSITION.md): UNIGINE Superposition (2017) and its Sanctuary, Tropics, Heaven, Valley lineage
- [docs/3DMARK_STEEL_NOMAD.md](docs/3DMARK_STEEL_NOMAD.md): 3DMark from 1998, Futuremark to UL, and Steel Nomad (2024)

## FurMark history

The story of **FurMark**, the furry-donut GPU stress test: a sourced timeline, an 8-minute two-host podcast (script + audio), and a PDF companion.

**Listen / read online**
- Podcast PDF (cover, episode guide, timeline, full transcript, sources): https://parris-tech-services.github.io/furmark-history/furmark-history-podcast.pdf
- Podcast audio (MP3, ~8 min): https://cdn.jsdelivr.net/gh/Parris-Tech-Services/furmark-history@main/site/furmark-history-podcast.mp3
- Corrected authoritative research: [docs/HISTORY.md](docs/HISTORY.md). The original MP3s were generated **before** the 13 November fact-check; follow the updated scripts and [source audit](docs/SOURCE_AUDIT_2026-11-13.md) where narration differs.

**Free podcast episodes** (no API key; built offline by `tools/build_free_audio.py`)
- Superposition, voices by Kokoro-82M: [audio](site/superposition-history-podcast.mp3) · [script](podcast/superposition_script.txt)
- Steel Nomad / 3DMark, voices by Piper: [audio](site/steelnomad-history-podcast.mp3) · [script](podcast/steelnomad_script.txt)

Why these two: of the free routes I checked, Google's NotebookLM sounds best but has no way to run from a script, and the hosted services (Edge TTS) are unreachable from the build sandbox. Kokoro and Piper are the local TTS engines I could run without an external API for the companion episodes.

**What's here**
| Path | What |
|---|---|
| `docs/HISTORY.md` | The research: timeline, the "power virus" years, what could not be verified, numbered sources with audit additions |
| `docs/SUPERPOSITION.md` | The history of UNIGINE Superposition and its benchmark lineage |
| `docs/3DMARK_STEEL_NOMAD.md` | 3DMark history from 1998 to Steel Nomad (2024) |
| `podcast/script.txt` | The FurMark episode script (Leda and Doral). Spoken forms: numbers are written out |
| `tools/build_audio.py` | Builds the MP3 with ElevenLabs Turbo v2.5 (0.5 credit/character); caches every line |
| `tools/build_pdf.py` | Builds the PDF from the script and HISTORY.md (needs pandoc and Playwright Chromium; also rebuilt automatically during Pages deployment) |
| `site/` | The built MP3, PDF, and a small player page (`index.html`, works if GitHub Pages is switched on) |

**How accurate is it?** The [13 November source audit](docs/SOURCE_AUDIT_2026-11-13.md) distinguishes corroborated details, source-attributed claims, estimates and remaining uncertainties. An original 26 August 2007 post places the first fur-rendering benchmark around **22 August 2007**, rather than an unknown month. This is inferred from the author's statement, not a verified binary timestamp.

**Rebuild**
```bash
export ELEVENLABS_API_KEY=...        # your key; never commit it
python3 tools/build_audio.py --dry-run   # shows characters and credits first
python3 tools/build_audio.py && python3 tools/build_pdf.py
```

**Notes**
- Voices are synthetic (ElevenLabs "Laura" and "Charlie"). The intro/outro bed is generated noise, not licensed music.
- Short quotations from the developer's posts are used for commentary; follow the source links for the originals.
- Licence: [MIT](LICENSE) for the code and the original text (script, research write-up, PDF layout). Short quotations from the developer's posts and the sources they come from stay with their own rights and original licensing.

## Audit and publication status

The Markdown research and podcast scripts were fact-checked on **13 November 2026**. The original MP3 recordings remain **archival audio of the earlier scripts**; they have not been re-synthesised. The FurMark companion PDF is generated from the updated research and script in the publishing workflow. Check the latest [Pages deployment](https://github.com/Parris-Tech-Services/furmark-history/actions/workflows/pages.yml) if the PDF seems stale. The [source audit](docs/SOURCE_AUDIT_2026-11-13.md) distinguishes confirmed corrections, developer claims, estimates and unknowns.
