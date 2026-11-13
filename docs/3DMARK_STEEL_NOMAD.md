# The history of 3DMark, and 3DMark Steel Nomad

*Compiled 13 November 2026. UL's own news posts are the primary sources; the version table comes from Wikipedia and is labelled as such. A second research pass resolved the first draft's conflicts; what is still open is listed at the end. Source numbers in brackets point to the list at the bottom.*

## The short version

3DMark grew out of Final Reality, a 1997 benchmark made at Remedy Entertainment. The same team left to form Futuremark, which released 3DMark99 on 26 October 1998. Futuremark changed names, spun off a business, was sold twice, and since 2014 has belonged to UL, which rebranded the products "UL Benchmarks" in 2018. 3DMark has been rebuilt for each major DirectX generation. Steel Nomad, launched on 21 May 2024 after two delays, is the official successor to Time Spy: a non-ray-traced, cross-platform test at native 4K, about three times heavier than Time Spy. UL announced a fully path-traced successor in June 2026. [1][2][3][5][10]

## Company timeline

| Date | Event | Source |
|---|---|---|
| May 1997 | Final Reality, made by the founding team at Remedy Entertainment with VNU Labs | [2][11] |
| Nov 1997 | Company founded in Espoo, Finland | [2] |
| 27 Feb 1998 | Company launched | [2] |
| 26 Oct 1998 | 3DMark99 released, "the world's first 3D benchmark aimed directly at the 3D gaming community" | [10] |
| By Nov 1999 | Trading name changed to MadOnion.com (Futuremark press release dated 9 Nov 1999) | [2] |
| 2002 | Renamed Futuremark | [2] |
| Dec 2009 | Mobile and embedded unit spun off as Rightware | [2] |
| Mar 2012 | Games division sold to Rovio | [2] |
| 31 Oct 2014 | Futuremark acquired by UL | [2] |
| 23 Apr 2018 | Rebranded UL Benchmarks; the Futuremark website closed | [2] |

## 3DMark by generation

Scores are not comparable across versions, because each is tied to a DirectX generation. [3]

| Version | Released | API / focus | Source |
|---|---|---|---|
| 3DMark99 | 26 Oct 1998 | DirectX 6, Remedy's MAX-FX engine | [10][11] |
| 3DMark99 MAX | 8 Mar 1999 | content update | [3] |
| 3DMark2000 | 6 Dec 1999 | DirectX 7, hardware transform and lighting | [3] |
| 3DMark2001 | 13 Mar 2001 | DirectX 8; first with vertex and pixel shaders; last on MAX-FX | [3][11] |
| 3DMark2001 SE | 12 Feb 2002 | DirectX 8.1 | [3] |
| 3DMark03 | 11 Feb 2003 | DirectX 9; no third-party engine; first to include CPU tests | [3][11] |
| 3DMark05 | 29 Sep 2004 | DirectX 9, Shader Model 2 | [3] |
| 3DMark06 | 18 Jan 2006 | first to fold the CPU result into the score | [3] |
| 3DMark Vantage | 28 Apr 2008 | DirectX 10 | [3] |
| 3DMark 11 | 7 Dec 2010 | DirectX 11: tessellation, compute shaders | [3] |
| 3DMark (Fire Strike era) | 4 Feb 2013 | one app with separate tests; Windows, Android and iOS scores comparable for the first time | [3][11] |
| Time Spy | 14 Jul 2016 | DirectX 12; trailer shown 23 Jun 2016 | [12][13] |
| Port Royal | 8 Jan 2019 | "world's first dedicated real-time ray tracing benchmark for gamers"; DXR; 2560 x 1440 | [14] |
| Speed Way | 12 Oct 2022 | DirectX 12 Ultimate, DXR 1.1, mesh shaders; sponsored by Lenovo Legion | [4] |
| Steel Nomad | 21 May 2024 | non-ray-traced, cross-platform | [1] |

### Time Spy

Futuremark announced Time Spy on 23 June 2016 with a trailer that revisits classic 3DMark scenes. It went on sale on 14 July 2016 as a free update to every Windows edition of 3DMark, the free Basic edition and the Steam demo included. Futuremark pitched it as a "pure DirectX 12 engine" with asynchronous compute, explicit multi-adapter and multi-threading, built with input from AMD, Intel, Microsoft, NVIDIA and others. [12][13]

## Steel Nomad

UL's launch post, dated 21 May 2024, says: [1]

- **Why.** Time Spy had gathered "almost 48 million" results since 2016, and the average Time Spy score had roughly tripled, so a new non-ray-traced test was needed. Time Spy is "not fully retired".
- **What.** A non-ray-traced, cross-platform GPU benchmark running at "a native 4k resolution", about **three times heavier than Time Spy** and almost **seven times heavier than Fire Strike**. UL notes that CPU bottlenecking can flatten Fire Strike and Time Spy results on a high-end 2024 GPU.
- **Where.** Windows and Windows-on-Arm via DirectX 12 and Vulkan; Android via Vulkan; iOS via Metal.
- **Editions.** Steel Nomad and a lighter Steel Nomad Light, both free for existing 3DMark users. On Steam, Steel Nomad cost US$34.99 for people who did not own 3DMark, with a launch-week 75% discount. [1][15]

### Why the resolution is reported two ways

UL's support page for Steel Nomad **Light** says its rendering resolution is 2560 x 1440. PC Gamer describes Light as designed for integrated graphics, tablets and phones, running at 1440p. The standard Steel Nomad is the 4K test, and Light is the 1440p one. The "1440p" claim in some coverage is Light's, not the standard test's. [1][15][16]

### The delays

UL first planned Steel Nomad for the end of Q1 2024. A Steam message then moved it to the start of Q2, probably April; later statements said it would slip past April, with a release candidate ready but a final round of partner feedback and the Windows UI still being finished. It launched 21 May 2024. The sources give partner feedback and UI work as the reasons and nothing more. [17]

### After launch

| Date | Event | Source |
|---|---|---|
| 12 Jun 2025 | 3DMark for macOS (native app). UL says roughly 1 in 6 iOS submissions came from Macs, and that running the iOS build on a Mac can lower scores. Brings Steel Nomad to macOS | [5] |
| 20 Aug 2025 | Solar Bay Extreme: more ray-tracing workload (specular and glass reflections, soft shadows) | [6] |
| 22 Apr 2026 | 3DMark macOS available as a standalone download direct from UL Solutions | [7] |
| 3 Jun 2026 | UL announces a new fully path-traced 3DMark benchmark, running at native 4K and with AI upscaling and frame generation from several vendors; first sponsor named | [8] |
| 24 Jul 2026 | Seasonic added as sponsor of the upcoming benchmark; UL gives no date, only that it will share it "when it is ready" | [9] |

### Linux

UL promised Linux support in May 2024 and at one point said macOS and Linux would follow later in 2024. macOS arrived in June 2025; Linux has not shipped. GamingOnLinux reported in June 2025 that a Linux version was planned but undated, and a Russian-language article from about June 2026 says the developers still have no date. UL has described a Vulkan-based Linux build for enterprise customers and reviewers. [18]

## Settled in the second research pass

- **Steel Nomad launch day:** 21 May 2024. UL's post and the Steam listing agree; the "25 May" figure from one outlet is wrong. [1][17]
- **Steel Nomad resolution:** native 4K for the standard test; 2560 x 1440 is Steel Nomad Light. [1][16]
- **Time Spy:** 14 July 2016. [12]
- **3DMark99:** 26 October 1998, from Futuremark's own press release, which says "today, 26th of October 1998". Wikipedia's 28 October infobox date disagrees. [10]
- **The delay:** Q1 2024, then April, then 21 May. [17]

## Still open

- UL's next-generation benchmark has no name or release date in its posts.
- Whether and when Steel Nomad reaches Linux publicly.
- 3DMark2000's date (6 December 1999) comes from Wikipedia's table; a hobbyist history says December 2000, which conflicts with it. I did not retrieve Futuremark's press release.
- The Steel Nomad delay articles (VideoCardz, Overclock3D, TweakTown) are cited from search summaries; some of those pages blocked my fetches.

## Sources

1. UL Benchmarks, "3DMark Steel Nomad is out now!", 21 May 2024. https://benchmarks.ul.com/news/3dmark-steel-nomad-is-out-now
2. Wikipedia, "Futuremark" (raw page). https://en.wikipedia.org/wiki/Futuremark
3. Wikipedia, "3DMark" (raw page, version table). https://en.wikipedia.org/wiki/3DMark
4. UL Benchmarks, "3DMark Speed Way is now available", 12 Oct 2022. https://benchmarks.ul.com/news/3dmark-speed-way-is-now-available
5. UL Benchmarks, "3DMark for macOS available now!", 12 Jun 2025. https://benchmarks.ul.com/news/3dmark-for-macos-available-now
6. UL Benchmarks, "3DMark Solar Bay Extreme is available now!", 20 Aug 2025. https://benchmarks.ul.com/news
7. UL Benchmarks, "3DMark on macOS now available directly from UL Solutions", Apr 2026. https://benchmarks.ul.com/news
8. UL Benchmarks, "Announcing our next generation 3DMark GPU Benchmark and its first sponsor", 3 Jun 2026. https://benchmarks.ul.com/news
9. UL Benchmarks, "Seasonic joins as a sponsor of the next 3DMark GPU Benchmark", 24 Jul 2026. https://benchmarks.ul.com/news
10. Futuremark, "Futuremark Corporation Releases 3DMark 99 - The Gamers' Benchmark", 26 Oct 1998. https://www.futuremark.com/pressreleases/20408/
11. James Mackenzie, "The History of (and Nostalgia for) 3DMark", 21 Apr 2023. https://www.jamesfmackenzie.com/2023/04/21/the-history-of-and-nostalgia-for-futuremark-3dmark/
12. Futuremark, "3DMark Time Spy - DirectX 12 benchmark test available now", 14 Jul 2016. https://aws.futuremark.com/en/news/3dmark-time-spy-directx-12-benchmark-test-available-now
13. Futuremark, "Introducing 3DMark Time Spy DirectX 12 benchmark test", 23 Jun 2016. https://aws.futuremark.com/en/news/introducing-3dmark-time-spy-directx-12-benchmark-test
14. UL Benchmarks, "3DMark Port Royal ray tracing benchmark now available", 8 Jan 2019. https://benchmarks.ul.com/news/3dmark-port-royal-ray-tracing-benchmark-now-available
15. PC Gamer, "3DMark Steel Nomad is now available to give your GPU an inferiority complex". https://www.pcgamer.com/hardware/graphics-cards/3dmark-steel-nomad-is-now-available-to-give-your-gpu-an-inferiority-complex/
16. UL Benchmarks support, "Steel Nomad Graphics Test" and "Overview of Steel Nomad Light" (both give 2560 x 1440 for Light). https://support.benchmarks.ul.com/support/solutions/articles/44002528070-overview-of-steel-nomad-light
17. VideoCardz, "3DMark Steel Nomad non-raytraced benchmark has been delayed to April"; Overclock3D delay stories; Steam store page (release date 21 May 2024). https://store.steampowered.com/app/2695340/3DMark_Steel_Nomad/
18. GamingOnLinux, "3DMark are planning a Linux version but no date for it yet", June 2025. https://www.gamingonlinux.com/2025/06/3dmark-are-planning-a-linux-version-but-no-date-for-it-yet
