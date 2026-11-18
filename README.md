# GPU benchmark histories

**Read it as a website: https://parris-tech-services.github.io/furmark-history/** (interactive timeline, embedded videos, podcasts, photos, your GTX 1070 fleet, searchable questions).

This repo documents the history of GPU benchmark culture: sourced research on FurMark, plus companion histories of UNIGINE Superposition and 3DMark / Steel Nomad. It includes research notes, podcast scripts, generated audio, PDF companions, and a GitHub Pages site.

Sourced histories of GPU benchmarks. The main project is **FurMark** (below); newer write-ups cover **UNIGINE Superposition** and **3DMark / Steel Nomad**.

**NEW: The actual GTX 1070 batch being benchmarked (13 November 2026)**

- **[Exact model schematics and boardviews — source index](docs/GTX1070_EXACT_SCHEMATICS_BOARDVIEWS.md)** — Colorful U-TOP GP104H8-D50 Rev A schematic listing and Gigabyte WINDFORCE Rev 2.0 TVW boardview listings; actual file bytes/physical PCB revisions not yet verified.
- **[89-card GTX 1070 deep research (18 Nov 2026)](docs/GTX1070_89_CARD_RESEARCH.md)** — exact Colorful iGame U-TOP vs Gigabyte WINDFORCE OC Rev 2.0 history, physical design, memory/core unlock feasibility, legacy CUDA/AI, 89-GPU lab and cluster scenarios, electricity and Australian market evidence. **Current physical inventory: 66 Colorful + 23 Gigabyte = 89 GPUs / 712GB aggregate VRAM (working condition not individually verified).**
- [Deep research and hardware identification audit](docs/GPU_BATCH_RESEARCH.md) — 2016 GTX 1070 history/specs, Colorful PCI subsystem vs Gigabyte-label discrepancy, real score analysis, driver lifespan, cooling/VRAM, resale and recommended checks.
- [Source-linked GPU testing snapshot (CSV)](data/benchmark_snapshot_2026-11-13.csv) — 100 numbered sheet slots, each published test URL, result verification, CPU/driver/temperature/power and issue flags. This is a dated snapshot, not live-sync.
- [Live GPU Testing Sheet](https://docs.google.com/spreadsheets/d/1yCaJ1PXI7R5sCuZopxetPMwNWyK142i7SJOmZRwTj44/edit) (also linked by the raw [benchmark](benchmark) file).
- [GPU seller allocation: 20 each for Ned, James and Josh](docs/GPU_SELLER_ALLOCATION.md) — [machine-readable allocation](data/gpu_seller_allocation.json). Provisional reservations; #60–61 need testing, #36 excluded.
- **Important findings:** 36 correctly linked GTX 1070 submissions; card #4 has an unrelated RX 9070 XT URL, #36 has a noisy fan, and the actual physical board manufacturer needs verification. **The live Google Sheet was not modified.**

**The stories behind the scenes (30 additional questions, completed 13 November 2026)**

- [All 30 scene-story questions](docs/SCENE_STORY_QUESTIONS.md) — the furry doughnut, the vanished professor and the masked Steel Nomad
- [FurMark: why fur, why a doughnut, and how its strange visual evolved](docs/SCENE_FURMARK.md)
- [Superposition: who is the professor, what happened in the lab, and what can you uncover?](docs/SCENE_SUPERPOSITION.md)
- [Steel Nomad: the traveller, the frontier settlement, night-time lake and old 3DMark Easter eggs](docs/SCENE_STEEL_NOMAD.md)

**Research method:** Each story answer distinguishes verified creator statements, independent observations, plausible interpretations, and things that have **not** been established. The documents do not invent character names or outcomes where the makers have not published them.

**Original thirty-question technical/history research (10 per benchmark, also completed 13 November 2026)**
- [Thirty questions and completion status](docs/QUESTIONS.md)
- [FurMark: 10 detailed answers](docs/QA_FURMARK.md)
- [Superposition: 10 detailed answers](docs/QA_SUPERPOSITION.md)
- [3DMark / Steel Nomad: 10 detailed answers and 56 numbered references](docs/QA_3DMARK.md)
- [3DMark supplementary answers](docs/QA_3DMARK_SUPPLEMENT.md): UL timeline, async-compute post, 2003 audit, delistings, pricing notices

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

Why these two: of the free routes I checked, Google's NotebookLM sounds best but has no way to run from a script, and the hosted services (Edge TTS) are unreachable from the build sandbox. Kokoro and Piper are the local TTS engines I could run without an external API for the companion episodes.

**The website** (`site/`)
| Path | What |
|---|---|
| `site/index.html`, `site/assets/` | Home page: hero, timeline, lore, video, podcasts, photos, GPU lab, question explorer, library |
| `tools/build_site.py` + `tools/reader_template.html` | Renders every `docs/*.md` to `site/read/*.html` and writes the search and Q&A indexes |
| `tools/build_fleet.py` | Turns `data/benchmark_snapshot_*.csv` into `site/data/batch.json` for the GTX 1070 explorer |
| `tools/build_resale.py` | Grades every started GTX 1070 (rig-normalised), plans lots, writes `site/data/resale.json`, `site/cards/*.html` listing sheets, the grades CSV and `docs/RESALE_ANALYSIS.md` |
| `tools/build_podcast.py` | Writes `site/podcast.xml`, the RSS feed to submit to Spotify |
| `site/data/*.json` | Editable data: `timeline.json`, `media.json` (YouTube IDs), `gpus.json`, `photos.json` |

Rebuild after editing docs or data: `python3 tools/build_site.py && python3 tools/build_fleet.py && python3 tools/build_resale.py && python3 tools/build_site.py && python3 tools/build_podcast.py`.

**What's here**
| Path | What |
|---|---|
| `docs/HISTORY.md` | The research: timeline, the "power virus" years, what could not be verified, 20 numbered sources |
| `docs/SUPERPOSITION.md` | The history of UNIGINE Superposition and its benchmark lineage |
| `docs/3DMARK_STEEL_NOMAD.md` | 3DMark history from 1998 to Steel Nomad (2024) |
| `podcast/script.txt` | The FurMark episode script (Leda and Doral). Spoken forms: numbers are written out |
| `tools/build_audio.py` | Builds the MP3 with ElevenLabs Turbo v2.5 (0.5 credit/character); caches every line |
| `tools/build_pdf.py` | Builds the PDF from the script and HISTORY.md (needs pandoc and Playwright Chromium) |
| `site/` | The built MP3, PDF, and a small player page (`index.html`, works if GitHub Pages is switched on) |

**How accurate is it?** Dates and quotes come from the developer's own Geeks3D posts and changelog wherever possible; secondary and forum-only claims are marked as such. HISTORY.md ends with a list of numbered sources, and the PDF companion includes the same sourcing.

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
