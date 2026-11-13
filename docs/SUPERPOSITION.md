# The history of the UNIGINE Superposition benchmark

*Compiled 13 November 2026 from the developer's own pages first, then press and Wikipedia. Claims that rest on a single secondary source are marked "(unverified)". Source numbers in brackets point to the list at the bottom.*

## The short version

Superposition is the fifth GPU benchmark in a line that UNIGINE, a real-time 3D engine company, began in 2007. It launched in April 2017 on the UNIGINE 2 engine, as the successor to Heaven (2009) and Valley (2013). Its scene is a cluttered lab belonging to a fictional professor; its headline feature is a lighting method UNIGINE calls SSRTGI. It was built to double as a stability and overclocking test, and the only feature update the developer has announced is version 1.1 in April 2019. [1][2][3]

## The family it comes from

UNIGINE says it was established in 2005 and builds the UNIGINE engine for simulation, visualization, games and VR. Its own list of its benchmarks is: Sanctuary (2007), Tropics (2008), Heaven (2009), Valley (2013), Superposition (2017). UNIGINE claims "over 40 million active users" across them (a company figure, not independently checked). [1]

Heaven is the one most people remember. It was released on 22 October 2009 and is widely described as the first DirectX 11 benchmark; Wikipedia attributes that to press coverage from Legit Reviews and others, so treat "first" as a contemporary claim, not an audited fact. [4]

## Timeline

| Date | Event | Source |
|---|---|---|
| 2005 | UNIGINE company established | [1] |
| 2007 | Sanctuary benchmark | [1] |
| 2008 | Tropics benchmark | [1] |
| 22 Oct 2009 | Heaven released; described as the first DirectX 11 benchmark | [4] |
| 2013 | Valley benchmark | [1] |
| April 2017 | Superposition 1.0 released (UNIGINE says "April, 2017") | [2] |
| 11 Apr 2017 | Release date shown on Wikipedia | [3] |
| 12 Apr 2017 | GamingOnLinux publishes its launch story at 01:50 UTC | [5] |
| 12 Apr 2019 | Superposition 1.1: free VR in the Basic edition, better GPU detection, max render resolution raised to 16384 x 16384, VR on Linux via SteamVR | [2] |

## What Superposition is

- **The scene.** A lone professor runs dangerous experiments in an abandoned classroom. UNIGINE invites you to work out what happened by inspecting the lab. [6]
- **The lighting.** SSRTGI, "Screen-Space Ray-Traced Global Illumination", is UNIGINE's own dynamic lighting technique. Wikipedia describes it as meant to test ray-tracing-style capability, but SSRTGI works in screen space and is not hardware DXR ray tracing. [3][6]
- **The engine.** UNIGINE 2. [6]
- **The modes.** A scripted benchmark with presets, an interactive exploration mode with mini-games and "over 900 interactive objects", a loop stress test for checking stability, VR modes for Oculus Rift, HTC Vive and SteamVR headsets, and a global leaderboard. [6]
- **The editions.** A free Basic edition, plus paid "extended editions". UNIGINE's page lists the loop stress test, leaderboard, commercial use and QA automation under that heading; I did not map each feature to a named edition. [6]
- **Platforms.** Windows 7 SP1 64-bit and up, and 64-bit Linux. Minimum GPU on the official page is AMD HD 7xxx, Intel HD 5xxx or NVIDIA GTX 6xx, with 2 GB VRAM. [6] Wikipedia also lists macOS; the developer's current page lists only Windows and Linux downloads. [3][6]

### Launch reception

GamingOnLinux's reviewer called it "very demanding", noted it spread work evenly across all cores, and found the Linux build offered only OpenGL (no Vulkan) and showed only 3 GB of an 8 GB card's VRAM at launch. At that point, headset VR was not implemented on Linux. The 1.1 update later added Linux VR via SteamVR. [5][2]

## Version 1.1 and the "two years" numbers

UNIGINE's April 2019 post gives its own usage figures for the first two years: 200K+ competitive scores from overclockers, 8,000+ benchmarking videos on YouTube, and 3,338,923 tests run. It also says reviewers such as Tom's Hardware, Linus Tech Tips, PC Magazine and Phoronix use it routinely, and that an 8K demo was "broadcast from space via satellite". All of that is the developer's marketing; I did not find independent confirmation of any of it. [2]

## Things I could not verify

- **Exact launch day.** UNIGINE says only "April, 2017". Wikipedia's infobox says 11 April 2017, GamingOnLinux posted on 12 April 2017. One of those is probably a time-zone difference, but I could not find a primary announcement that settles it.
- **Any version after 1.1.** I found none. The Wikipedia infobox also lists 1.1 as latest. That could be stale; I could not load a release-notes page that settles it.
- **The "first DirectX 11 benchmark" claim for Heaven** rests on press coverage from the time.
- **macOS support.** Wikipedia says yes; UNIGINE's current download list does not show it.
- **Tom's Hardware's launch article** downloaded, but the page text was almost all site chrome, so I did not quote it.

## Sources

1. UNIGINE Benchmarks, "About us". https://benchmark.unigine.com/about
2. UNIGINE, "Superposition Benchmark 1.1: Free VR to Everyone", 12 April 2019. UNIGINE news post, benchmark.unigine.com (exact URL not recorded)
3. Wikipedia, "Superposition Benchmark" (raw page, fetched 13 Nov 2026). https://en.wikipedia.org/wiki/Superposition_Benchmark
4. Wikipedia, "Heaven Benchmark" (raw page). https://en.wikipedia.org/wiki/Heaven_Benchmark
5. GamingOnLinux, "Superposition, the latest benchmark by Unigine, has been released", 12 April 2017. https://gamingonlinux.com/2017/04/superposition-the-latest-benchmark-by-unigine-has-been-released/
6. UNIGINE Benchmarks, "Superposition benchmark" product page. https://benchmark.unigine.com/superposition
