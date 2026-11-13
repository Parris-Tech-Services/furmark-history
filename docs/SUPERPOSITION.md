# The history of the UNIGINE Superposition benchmark

*Compiled 13 November 2026 from the developer's own pages first, then press and Wikipedia. A second research pass resolved most of the first draft's open questions; what is still open is listed at the end. Source numbers in brackets point to the list at the bottom.*

## The short version

Superposition is the fifth GPU benchmark in a line that UNIGINE, a real-time 3D engine company, began in 2007. It launched on 11 April 2017 on the UNIGINE 2 engine, as the successor to Heaven (2009) and Valley (2013). Its scene is a cluttered lab belonging to a fictional professor; its headline feature is a lighting method UNIGINE calls SSRTGI. It was built to double as a stability and overclocking test, and the latest version currently listed by the developer is version 1.1, released in April 2019. [1][2][7]

## The family it comes from

UNIGINE says it was established in 2005 and builds the UNIGINE engine for simulation, visualization, games and VR. Its own list of its benchmarks is: Sanctuary (2007), Tropics (2008), Heaven (2009), Valley (2013), Superposition (2017). UNIGINE claims "over 40 million active users" across them (a company figure, not independently checked). [1]

Heaven is the one most people remember. It was released on 22 October 2009 and is widely described as the first DirectX 11 benchmark; Wikipedia attributes that to press coverage from Legit Reviews and others, so treat "first" as a contemporary claim, not an audited fact. [4]

## Timeline

| Date | Event | Source |
|---|---|---|
| 2005 | UNIGINE company established | [1] |
| 2007 | Sanctuary benchmark | [1] |
| 2008 | Tropics benchmark | [1] |
| 22 Oct 2009 | Heaven announced as "the World's first true DirectX 11 benchmark" (UNIGINE's claim, repeated by Legit Reviews on 31 Oct 2009) | [11] |
| 2013 | Valley benchmark | [1] |
| Late 2016 | Superposition announced for release by the end of 2016, then slipped (as reported by VideoCardz and Alienware Arena; I saw their headlines and summaries but could not load the pages) | [13] |
| 11 Apr 2017 | Superposition 1.0 released. TechPowerUp and Overclock3D date their stories to this day; Vortez and GamingOnLinux carried it on the 12th | [8][9][10][5] |
| April 2017 | UNIGINE's own version history: "Version 1.0. First release version." | [7] |
| 12 Apr 2019 | Version 1.1 | [2][7] |

## What Superposition is

- **The scene.** A lone professor runs dangerous experiments in an abandoned classroom. A loud bang came from the laboratory moments ago, and UNIGINE invites you to work out what happened by inspecting it. [6]
- **The lighting.** SSRTGI, "Screen-Space Ray-Traced Global Illumination", is UNIGINE's own dynamic lighting technique. It works in screen space; it is not hardware DXR ray tracing, although Wikipedia describes it as a ray-tracing capability test. [3][6]
- **The engine.** UNIGINE 2. [6]
- **The presets.** 1080p Medium (entry-level gaming PCs and laptops), 1080p High (mid-range), 1080p Extreme and 4K Optimized (high-end), and 8K Optimized, which the manual labels "future configurations (2017)". A Custom preset exists but cannot be published to the leaderboards. You pick DirectX or OpenGL as the API. [7]
- **The scoring.** Each test and preset gives its own score. There is no overall score, and scores from different presets are not comparable. A separate VR-ready test is capped at 10,000 and is not sent to the leaderboards. [7]
- **The modes.** A scripted benchmark, a free interactive mode with mini-games (the manual and 1.1 notes mention throwing darts) and over 900 interactive objects, a loop stress test, VR modes, and a global leaderboard. [6][7]
- **The editions.** **Historically three in the 1.1 manual**: Basic (free: individual benchmark runs, GPU monitoring, VR-ready and interactive mode, but not score submission), Advanced (paid: leaderboards, timed loop stress test, personal use) and Pro (paid: command-line automation, reporting, per-frame analysis and commercial use) [7]. **The current product page lists four purchasing tiers**: Basic, Advanced, Professional and Enterprise (the last adds multiple seats/installs); the extra tier is a licensing option, not evidence of a new engine release [6]. Do not claim the free Basic edition includes the paid loop stress-test feature.
- **Platforms.** Windows 7 SP1 64-bit and up, and 64-bit Linux. Minimum GPU is AMD HD 7xxx, Intel HD 5xxx or NVIDIA GTX 6xx, with 2 GB of VRAM. [6]
- **No Mac version.** UNIGINE's own manual and download list cover Windows and Linux only. A MacRumors thread quotes UNIGINE support saying the Mac was not supported because macOS lacks an OpenGL 4.5 Core profile. Wikipedia's infobox lists macOS, but nothing from the developer backs that. [6][7][12]

### Score comparability across versions

UNIGINE explicitly said the version 1.1 update did **not** change its measurement algorithm or workload, so the same machine and preset should produce comparable scores in 1.0 and 1.1 [2]. That does **not** make different presets, APIs, resolutions or settings interchangeable; also see [benchmark interpretation](BENCHMARK_PRACTICE.md).

### Launch reception

GamingOnLinux's reviewer called it "very demanding", noted it spread work evenly across all cores, and found the Linux build offered only OpenGL (no Vulkan) and detected only 3 GB of his 8 GB card at launch. Headset VR was not implemented on Linux then; the 1.1 update added it via SteamVR. [5][2]

## Version 1.1

Released 12 April 2019, and per the developer's own version history it is the last entry. [7] It brought:

- VR mode for the free Basic edition (it had been paid-only) and VR on Linux via SteamVR.
- Better CPU and GPU detection, plus a major hardware-database update.
- Updated Oculus and OpenVR libraries (as of 3 March 2019) and a new HTC Vive Pro preset for the VR-ready test.
- Maximum render resolution raised to 16384 x 16384.
- Pro-edition automation: VR-ready mode, four new scripts, event-log entries for each run, and correct handling of paths with spaces.
- Fixes for the VR hotkeys, the 3440x1440 resolution selection, non-Latin profile names in licence checks, the 22:9 splash screen, and a crash when throwing darts.

UNIGINE's post also gave two years of usage figures: over 200K competitive scores, 8,000+ benchmarking videos, and 3,338,923 tests run. It says reviewers like Tom's Hardware, Linus Tech Tips, PC Magazine and Phoronix use the benchmark regularly, and that an 8K demo was broadcast from space by satellite. These are the developer's own claims. [2]

## Settled in the second research pass

- **Launch day:** 11 April 2017. Two review sites dated their stories that day; the 12 April dates are later coverage. [8][9][10][5]
- **Versions after 1.1:** as at 13 November 2026, the developer's current product page still identifies 1.1 (2019) as the current version [6]. This establishes the latest advertised release, not the impossibility of undocumented builds.
- **macOS:** never supported by the developer (see above).
- **"Superposition is a ray-tracing benchmark":** no. SSRTGI is screen-space; the later DXR-based tests came from 3DMark. [3][6]

## Still open

- The original UNIGINE press release for 1.0. I could not find it; the April 2017 date comes from the manual and the review sites.
- Several secondary launch pieces were inaccessible in the original research pass. In this audit, TechPowerUp's dated 11 April 2017 article and its 1.0 download entry were independently opened [8][14]; other listed headlines are still lower-confidence where only search snippets were available.
- UNIGINE's usage numbers and the "over 40 million active users" figure are the company's own and are not independently audited.

## Sources

1. UNIGINE Benchmarks, "About us". https://benchmark.unigine.com/about
2. UNIGINE, "Superposition Benchmark 1.1: Free VR to Everyone", 12 April 2019. https://unigine.com/news/2019/superposition-benchmark-1-1-free-vr-to-everyone
3. Wikipedia, "Superposition Benchmark" (raw page, fetched 13 Nov 2026). https://en.wikipedia.org/wiki/Superposition_Benchmark
4. Wikipedia, "Heaven Benchmark" (raw page). https://en.wikipedia.org/wiki/Heaven_Benchmark
5. GamingOnLinux, "Superposition, the latest benchmark by Unigine, has been released", 12 April 2017. https://gamingonlinux.com/2017/04/superposition-the-latest-benchmark-by-unigine-has-been-released/
6. UNIGINE Benchmarks, "Superposition benchmark" product page. https://benchmark.unigine.com/superposition
7. UNIGINE, "Superposition Benchmark 1.1 User Manual" (version history, editions, presets, scoring). https://benchmark.unigine.com/docs/superposition/Superposition_Benchmark_User_Manual.pdf
8. TechPowerUp, "Unigine Superposition 1.0 Benchmark Released", 11 April 2017 (date seen in search results; page blocked). https://www.techpowerup.com/232288/unigine-superposition-1-0-benchmark-released
9. Overclock3D, "Unigine's Superposition benchmark has been released", 11 April 2017 (date seen in search results). https://overclock3d.net/news/software/unigines-superposition-benchmark-has-been-released/
10. Vortez, "Unigine Superposition Benchmark Released", 12 April 2017 (search results only). https://www.vortez.net/unigine_superposition_benchmark_released/
11. Legit Reviews, "Unigine 'Heaven' - The First DirectX 11 Benchmark", 31 October 2009. https://www.legitreviews.com/unigine-heaven-the-first-directx-11-benchmark_1117
12. MacRumors forums, "Unigene Superposition Benchmark" (undated; predates 1.1). https://forums.macrumors.com/threads/unigene-superposition-benchmark.2043107/
13. VideoCardz, "UNIGINE announces Superposition benchmark" and Alienware Arena, "Unigine Superposition Benchmark finally released" (headlines and summaries only; pages blocked). https://videocardz.com/65465/unigine-announces-superposition-benchmark-coming-q4-2016

14. TechPowerUp download archive, *UNIGINE Superposition 1.0* (11 Apr 2017) and 1.1 (12 Apr 2019), including downloadable file hashes. https://www.techpowerup.com/download/unigine-superposition/
15. Phoronix Test Suite/OpenBenchmarking profile, benchmark test profile created 11 Apr 2017 (corroborates launch chronology, but a benchmark profile version is not a UNIGINE application release). https://openbenchmarking.org/test/pts/unigine-super-1.0.5
