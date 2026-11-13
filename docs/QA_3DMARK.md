# 3DMark: ten questions answered

*Research completed 13 November 2026. This continues [the thirty-question research plan](QUESTIONS.md) and supplements [the chronological history](3DMARK_STEEL_NOMAD.md) rather than repeating it. Prefer original Futuremark/UL release announcements, benchmark documentation, audit documents, and price statements; independent reporting provides context. Dates are release dates unless stated otherwise. A benchmark result, sales estimate, or leaderboard position is **not** a permanent record.*

## 1. How are Time Spy and Steel Nomad scored, and what do they render?

**Time Spy** (14 July 2016) is a DirectX 12 benchmark with two graphics tests and one CPU test. UL publishes exact score calculations [1]:

- Graphics score = **164 × 2 / (1/FPS1 + 1/FPS2)**: a scaled *harmonic mean* of the two graphics-test average frame rates. Using a harmonic mean prevents one unusually fast scene from masking a slow scene.
- CPU score = **298 × FPS_CPU3**, based on the heaviest of three 10-second CPU-test stages.
- Overall Time Spy = **1 / (0.85/graphics score + 0.15/CPU score)**. It is a weighted harmonic mean, **not** 85% of one score simply added to 15% of the other. Low CPU scores can therefore pull the total down even when the GPU is fast.
- Time Spy tests use a custom, multithreaded engine with a DirectX 12 rendering pipeline including asynchronous compute, explicit multi-adapter support, and compute/graphics work submitted through queues. The engine uses occlusion culling and other modern techniques; its 2016 technical explanation was prepared with feedback from competing GPU vendors [2][3]. It is a *synthetic gaming-style workload*, not an actual game benchmark.

**Steel Nomad** (21 May 2024) is a *single GPU graphics test*, with **no CPU test**. Its overall and graphics scores are identical: **score = average graphics FPS × 100** [4]. For example, 45.00 FPS means 4,500 points. Standard Steel Nomad renders **3840 × 2160**; Steel Nomad Light is **2560 × 1440**, a separate test with its own scale and leaderboard [5][6]. UL's engine documentation describes computer-generated terrain/grass with compute-shader distribution, moving ray-marched volumetric clouds, contact shadows, screen-space reflections with cubemap fallbacks, depth-of-field, bloom, XeGTAO ambient occlusion and temporal antialiasing [7]. **Standard Steel Nomad is not a ray-tracing benchmark**: ray marching volumetric clouds and screen-space effects do *not* make it a hardware DXR/path-tracing test.

**Why these distinctions matter.** Neither a Time Spy total and a Time Spy *Graphics* score, nor Time Spy and Steel Nomad, are interchangeable. Match exact test name, test version, resolution, API, driver and hardware before comparing results. Extreme and Light editions are distinct tests. A CPU bottleneck can still invalidate a GPU-only score if command submission is too slow [5][8].

## 2. How big is the user base and result database, and who holds the records?

There are **dated, sourceable scale measurements**, but not a reliable public running total of unique users or all accepted results:

- **March 2003:** Futuremark said 3DMark03 had been downloaded **more than 2.5 million times in its first month** [9]. Downloads are not unique users or purchases.
- **September 2003:** Futuremark said its *combined benchmark products* had **over 2 million registered users** and **more than 10 million submitted results** [10]. This was not a 3DMark-only figure.
- **2016:** Futuremark described 3DMark as used by **millions of gamers** and hundreds of review sites, without a precise unique-user count [11].
- **May 2024:** UL reported **almost 48 million Time Spy result submissions since 2016**, and said the *average* Time Spy score had roughly tripled [12]. Submissions are not a count of unique computers, people or paid licences.
- **2025:** UL said hundreds of thousands of people had run Solar Bay before Solar Bay Extreme arrived [13]. This is a different population and timeframe.

**Records are test-specific and fluid.** UL maintains the official [3DMark Hall of Fame](https://www.3dmark.com/hall-of-fame-2/3d) and per-test rankings [14]. That is where current official 3DMark/VRMark/legacy records must be checked; a result posted by a third-party site is not automatically an official record. UL validates eligibility and requires approved drivers, publicly available hardware and benchmark-specific restrictions, including **CPU-based NVIDIA PhysX for Vantage record submissions** [14][15]. Enthusiasts overclock and sometimes use exotic cooling; those records should not be used as everyday factory-speed purchase recommendations.

**Unanswered after research:** no independently audited, up-to-date count for all unique 3DMark users, total lifetime submissions across every test, total paid licences, or a stable list of 'the record holder'. Listing a username without the date and the exact test would become stale.

## 3. What happened in the 3DMark03 NVIDIA driver controversy and smartphone delistings?

**The 2003 dispute unfolded in stages rather than ending with one settled verdict.** After suspicious performance changes, Futuremark audited NVIDIA Detonator FX drivers and published a report dated **23 May 2003** identifying **eight detection mechanisms**; changing benchmark code without changing the intended graphics workload stopped those mechanisms. Futuremark released **3DMark03 build 330** to prevent the detectors from distorting scores [16][17]. Independent contemporary reporting described up to **24.1%** score impact in some configurations, along with altered output [18].

On **2 June 2003**, Futuremark and NVIDIA issued a joint statement reclassifying the driver behaviour as **application-specific optimisation rather than 'cheating'** [19]. That reversal does not erase the technical audit. In a September 2003 interview Futuremark said the *substance* of the audit was still correct, but the terminology was too contentious [20]. ATI was also scrutinised: ATI acknowledged optimising two shaders in 3DMark03; contemporary reporting put the overall boost around **1.9%** and recorded ATI's claim of mathematical equivalence [21]. Futuremark subsequently published formal benchmark optimisation guidelines on **23 September 2003**, separating general-purpose improvements from workload-specific manipulation [22]. This is an historically significant case about benchmark *trust*, not simply 'NVIDIA cheated and got caught'.

**The problem returned on smartphones.** UL's rules prohibit a device from detecting the 3DMark app and secretly increasing clocks or switching performance profiles only for it. UL compares a normal executable with an otherwise identical, renamed one, and delists stock models with proven application-dependent behaviour [23]. Its published examples include some **Samsung Galaxy S4/Note 3** Android 4.3 builds, **HTC One/One Mini**, **Oppo Find X/F7**, **Huawei P20/P20 Pro/Nova 3/Honor Play**, and, as listed in 2026, **RedMagic 11 Pro/11 Pro+**. Some older Samsung devices became eligible again with a software update. A delisted phone's owner is **not** accused of personally cheating [23]. The question is whether benchmarked performance represents ordinary applications, including thermal and power policies.

## 4. Why did Time Spy's asynchronous compute implementation cause controversy?

The debate arose during the DirectX 11-to-12 transition, when GPUs differed in their ability to overlap compute work and graphics rendering. AMD marketed dedicated async compute capability, while NVIDIA Maxwell and Pascal architectural behaviour differed. Media and enthusiasts asked whether a test that benefits one architecture was 'fair' and whether disabling async changed results [24][25].

Futuremark's **19 July 2016** technical response is unusually precise [3]. Time Spy submits work into a graphics/direct queue and a compute queue; around **10–20% of the GPU workload per frame** was described as asynchronous compute in contemporary testing [25]. The *benchmark implementation is the same across GPU vendors*. Actual concurrent execution is a **driver/hardware scheduling decision**, not an API guarantee. Advanced/Professional users can disable async in a *custom run*: the compute work moves into the direct queue, preserving the visual workload [3]. Therefore a custom no-async run is **a diagnostic**, not a directly comparable official preset score.

PCWorld compared Radeon and GeForce cards with async enabled and disabled. In that review the tested AMD cards lost substantially more performance without async than many NVIDIA Maxwell cards, while a GTX 1070 also showed benefit [26]. PC Perspective published its own per-GPU experiments [25]. These observations describe those specific 2016 cards/drivers and tests, not a universal result for every generation.

**Conclusion:** the documented architecture-sensitive behaviour was real, but it is not proof that Time Spy secretly changed work depending on vendor. Whether a synthetic workload predicts an individual game depends on that game's own compute/graphics scheduling, engine, resolution and GPU.

## 5. Which feature tests exist and when did they arrive?

A **feature test** isolates a particular graphics capability or technology, unlike a full benchmark combining many game-like effects. UL's official update chronology gives this timeline [27]; current tests and editions are listed in its support guide [28].

| First release | Test or capability | What it investigates |
|---|---|---|
| 2015 | API Overhead | CPU/API draw-call overhead; later added Vulkan (2017) |
| 2019 | NVIDIA DLSS | Upscaled vs non-DLSS performance and image quality; DLSS 2 support in 2020, DLSS 3 support in 2022, later updates |
| 2019 | PCI Express | Host-to-GPU PCIe transfer bandwidth |
| 2019 | Variable Rate Shading (VRS) | Performance and image-quality effect of shading different image regions at different rates |
| 2020 | DirectX Raytracing | Isolated DXR ray-tracing workload, rather than hybrid rasterisation plus ray tracing |
| 2021 | Mesh Shader | Geometry-processing efficiency with mesh shaders |
| 2021 | Sampler Feedback | Texture sampling/streaming technique on compatible DX12 Ultimate GPUs |
| 2022 | Intel XeSS | Upscaling and image quality using supported hardware |
| 2023 | AMD FSR | Upscaling and image-quality effects (UL describes FSR 2.2) |
| 2022/2023 | Speed Way / Solar Bay | These are **full benchmarks**, not feature tests; respectively DX12 Ultimate ray tracing and cross-platform mobile/desktop ray tracing |

UL has also shipped **CPU Profile**, **Storage Benchmark** and **DirectStorage** tests, but those are CPU/storage/component tests, not the same list of GPU-rendering feature tests [28][29]. Availability depends on platform and licence: many feature tests need the paid Advanced or Professional Edition on Windows. Test scores from unlike features should **not** be ranked as if they measured the same thing.

## 6. What is the history of 3DMark mobile benchmarks?

The mobile branch reflects changes in phone GPU APIs and power efficiency:

| Date | Family | Technology and significance |
|---|---|---|
| **2013** | **Ice Storm / Ice Storm Extreme** | Cross-platform baseline: DirectX 11 feature level 9 on Windows tablets, OpenGL ES 2.0 on phones [30] |
| **27 July 2015** | **Sling Shot Android** | OpenGL ES 3.0/3.1, multiple render targets, instancing, volumetric lighting; new high-end phone workload [31] |
| **15 October 2015** | **Sling Shot iOS** | Released on iPhone/iPad, allowing comparable OpenGL ES 3.0 testing [32] |
| **15 October 2020** | **Wild Life** | Cross-platform Apple/Android/Windows modern game-like scene, quick score and prolonged stability/thermal stress test [33] |
| **2021** | **Wild Life Extreme** | Heavier workload for faster mobile devices [27][34] |
| **14 August 2023** | **Solar Bay** | Mobile-class Vulkan ray queries and cross-platform ray-traced rendering on compatible devices; iOS addition followed in September 2023 [35][36] |
| **21 May 2024** | **Steel Nomad Light** | 1440p non-ray-traced, cross-platform; includes Android and iOS versions [12][36] |
| **20 August 2025** | **Solar Bay Extreme** | Substantially more complex ray-traced reflections, glass and soft shadows; Windows, Windows-on-Arm, macOS, Android and iOS [13] |

UL stopped supporting **Ice Storm on 14 January 2020**, because it had become too easy for modern devices [30]. On phones, the key question is often not peak short-run FPS but **sustained performance after heat builds up**; UL recommends the **20-minute stress tests** when reviewing smartphones and thin laptops [34].

Cross-platform scores are designed for comparable workloads, but different rendering APIs, driver implementations, system thermals and power limits mean equal scores do **not** prove architectural equivalence. Only compare the *same* test (and ideally the same version) across systems, and distinguish Vulkan/Metal/DirectX where relevant [29][37].

## 7. What did 3DMark cost, and what do Steam sales tell us?

The prices below are historical **US-dollar list prices or stated publisher offers**, not today's Australian pricing and not lifetime revenue [10][38][39][40][41].

- **11 February 2003:** 3DMark03 was a free public download, with **US$39.95** paid individual edition and **US$250** corporate licence [38].
- **12 September 2003:** Futuremark cut the paid 3DMark03/PCMark2002 individual versions to **US$19.95** [10].
- **5 February 2013:** new 3DMark Basic was free, Advanced **US$24.99**, Professional **US$995** (contemporary publisher-sourced coverage) [39].
- **July 2016:** Time Spy was added free to the basic tests; Advanced rose from **US$24.99 to US$29.99** after 23 July; pre-existing buyers could choose a separate Time Spy feature upgrade [40].
- **12 October 2022:** Speed Way brought Advanced's advertised price from **US$29.99 to US$34.99**, with an optional **US$4.99** upgrade for eligible existing owners [41].
- **Steam page inspected November 2026:** the US-price page displayed **US$29.99** normal price and separate optional DLC prices; regional prices, temporary sales and licence bundles can differ [42]. This shows that an old price announcement is not a dependable present-day price.

**Business model:** 2013 onward, 3DMark shifted away from issuing a completely new standalone suite for each DirectX generation. UL keeps adding free tests, paid upgrades and some separate DLC; business use requires the licensed Professional/enterprise route, not simply owning the consumer Steam version [27][41][43].

**What about success?** A Steam product page exposes reviews and its catalogue, but does **not** reveal independently auditable gross sales, net revenue, margins or total paying customers. SteamSpy/third-party owner and revenue estimates are model-derived rather than receipts. **No actual lifetime Steam revenue or unit sales could be confirmed.** Claims that Steam popularity proves precise revenue would be false precision.

## 8. What else did Futuremark make, and what was the Vantage PhysX dispute?

Beyond 3DMark, Futuremark/UL created **PCMark** (whole-PC, office/applications, storage and platform benchmarking), **VRMark** (VR performance and headset readiness), **Peacekeeper** (web-browser performance), **Powermark** (laptop battery runtime), **Servermark** (enterprise/VDI/media-transcoding), **Video2000**, and other specialised products [44]. UL's archived history dates **Peacekeeper to March 2009** and its cross-device update to 2011; Peacekeeper later ended support. PCMark evolved into separate desktop and mobile-oriented versions rather than simply measuring game graphics [45]. These are siblings, not merely earlier versions of 3DMark.

The **2008 3DMark Vantage PhysX argument** was about what a supposedly *CPU* result means when a GPU can run the physics simulation. Vantage's CPU tests included a physics workload using PhysX. With supported NVIDIA hardware/driver, portions could execute on the GPU, dramatically raising the CPU sub-score and indirectly the overall score [46][47]. NVIDIA argued that it was legitimate acceleration of the test rather than changing test code [47]; critics objected that the resulting number stopped being an apples-to-apples *CPU* comparison. This is different from 2003's driver-detection audit.

The enduring resolution is pragmatic: **UL's official Vantage Hall of Fame requires NVIDIA PhysX to run on the CPU** for comparable record scores [14]. A historical Vantage score with GPU PhysX enabled should not be compared uncritically with one using CPU-only physics.

## 9. How does the Benchmark Development Program work, and who participates?

UL's **Benchmark Development Program (BDP)** brings hardware and software companies into test design, technical review and early feedback. The public programme page describes access to benchmark workload/source-level details, feedback from specifications through release candidates, and private Developer Edition licensing [48]. UL states that every partner in the same tier pays equal fees and that one company cannot simply pay extra to dominate the outcome; this is **UL's own description**, not an independent audit.

UL explicitly names **AMD, Intel, NVIDIA and Microsoft** as participants in developing Time Spy, including the async-compute implementation [3]. Port Royal's engine documentation names AMD, Intel and NVIDIA as contributors and says Microsoft was especially closely involved in DXR implementation [49]. Speed Way's announcement also credits AMD, Intel, NVIDIA and other partners [50].

**Why it is both valuable and complicated:** competing vendors can identify incompatibilities before a benchmark launches and help make a test representative of real APIs. But the same companies have commercial interests in ranking well. The safeguards are common workloads, documented formulae, vendor-neutral code paths, published rules and validation of results [22][23][48]. Membership alone does not guarantee an unbiased final test; that depends on independent reproducibility. **The current complete paying membership roster and any confidential vote/decision records were not publicly verified.**

## 10. How were Port Royal and Speed Way received, and do their results match games?

**Port Royal** launched **8 January 2019** at **2560 × 1440**, with a hybrid rasterisation + DirectX Raytracing scene, including ray-traced reflections and shadows [51][52]. It was an early way to compare GPUs capable of Microsoft's DXR technology. Because it had *no CPU test*, it primarily targeted the GPU; CPU command-list throughput can still become a limitation [53]. At launch RTX hardware was the central consumer use case. German testing site ComputerBase found that *within the RTX card family* some broad relative performance patterns resembled those in **Battlefield V**, but also warned that synthetic benchmarks are not substitutes for actual game measurements; its alternative rasterisation comparison was not an adequate like-for-like image-quality comparison [54].

**Speed Way** launched **12 October 2022** as a more modern **DirectX 12 Ultimate** workload. It uses **DXR tier 1.1 reflections and global illumination, mesh shaders**, and the **2560 × 1440** scene; the publisher also provided an interactive scene and VS comparison mode [50][55]. Unlike Time Spy or Steel Nomad, it demands ray-tracing-capable hardware. Its specifications and sponsor/product placement were transparent in the launch announcement. It received attention as a demanding modern feature showcase, but that is not evidence that one Speed Way point predicts a certain frame rate in Cyberpunk or any other game.

UL does provide **statistical game-FPS estimates** for selected combinations of games, resolution and settings, by measuring correlations with benchmark results (examples include Time Spy Graphics against Fortnite, Apex Legends and Red Dead Redemption 2) [56]. This does **not** give a universal Port Royal/Speed Way-to-game FPS conversion. Correlations can shift with ray-tracing implementation, driver changes, CPU limits, memory, upscalers, frame generation, power settings, thermal behaviour and game patches.

**Practical reading:** use *Speed Way* for DX12 Ultimate/ray-tracing-capable GPU comparison, *Port Royal* for its older DXR hybrid test, *Steel Nomad* for non-ray-traced native 4K, *Time Spy Graphics* for broader older DX12 comparisons, and **real gameplay benchmarks** for a particular game's expected FPS. Comparisons across the benchmark families' point totals are invalid [29][51][55].

## Research limitations and verification policy

- Dates, formulae, supported APIs, publisher-stated prices and named features are checked against primary documentation linked below.
- Publisher-reported totals, comparisons and fairness claims are correctly attributed to UL/Futuremark, not represented as independent audits.
- Reviewers' conclusions are labelled as reviewers' findings and cannot be generalised to every GPU generation.
- Record-holder names and pricing are not frozen into a historical research document: both change.
- Historical scores do not establish a direct universal conversion to current games.
- There was **no physical GPU test** or new historical archival discovery from privately held company records in this research pass.

## Sources

1. UL, *How is the 3DMark Time Spy score calculated?* https://support.benchmarks.ul.com/support/solutions/articles/44002136143-how-is-the-3dmark-time-spy-score-calculated-
2. Futuremark, *Time Spy DX12 benchmark test available now* (14 July 2016). https://benchmarks.ul.com/news/3dmark-time-spy-directx-12-benchmark-test-available-now
3. Futuremark, *A Closer Look at Asynchronous Compute in 3DMark Time Spy* (19 July 2016). https://benchmarks.ul.com/news/a-closer-look-at-asynchronous-compute-in-3dmark-time-spy
4. UL, *How is the Steel Nomad score calculated?* https://support.benchmarks.ul.com/support/solutions/articles/44002528064-how-is-the-3dmark-steel-nomad-score-calculated-
5. UL, *Steel Nomad Graphics Test*. https://support.benchmarks.ul.com/support/solutions/articles/44002528063-steel-nomad-graphics-test
6. UL, *Steel Nomad Light Graphics Test*. https://support.benchmarks.ul.com/support/solutions/articles/44002528074-steel-nomad-graphics-test
7. UL, *Steel Nomad Engine*. https://support.benchmarks.ul.com/support/solutions/articles/44002528067-steel-nomad-engine
8. UL, *Overview of Steel Nomad*. https://support.benchmarks.ul.com/support/solutions/articles/44002528060-overview-of-3dmark-steel-nomad
9. Futuremark, *3DMark03 downloads exceed 2,500,000 copies in first month* (10 March 2003). https://benchmarks.ul.com/news/20387
10. Futuremark, *3DMark and PCMark Pricing Cut in Half; Distribution Marks New Records* (12 September 2003). https://benchmarks.ul.com/news/20432
11. Futuremark, *Time Spy DX12 benchmark available now* (14 July 2016). https://benchmarks.ul.com/en-pt/news/3dmark-time-spy-directx-12-benchmark-test-available-now
12. UL, *3DMark Steel Nomad is out now!* (21 May 2024). https://benchmarks.ul.com/news/3dmark-steel-nomad-is-out-now
13. UL, *Solar Bay Extreme is available now!* (20 August 2025). https://benchmarks.ul.com/news/3dmark-solar-bay-extreme-is-available-now-
14. UL, *3DMark Hall of Fame*. https://www.3dmark.com/hall-of-fame-2/3d
15. UL, *3DMark technical reporting rules*. https://benchmarks.ul.com/support/benchmark-rules
16. Futuremark, *3DMark03 driver audit report* (23 May 2003, archived copy). https://www.kickassgear.com/downloads/3dmark03_audit_report.pdf
17. GameSpot, *Nvidia accused of cheating in 3DMark 03* (23 May 2003). https://www.gamespot.com/articles/nvidia-accused-of-cheating-in-3dmark-03/1100-6028894/
18. The Register, *What's wrong with this pixel shader?* (24 May 2003). https://www.theregister.com/on-prem/2003/05/24/whats-wrong-with-this-pixel-shader/
19. GameSpot, *Futuremark says Nvidia didn't cheat* (2 June 2003). https://www.gamespot.com/articles/futuremark-says-nvidia-didnt-cheat/1100-6029339/
20. 3DCenter, *Interview with Futuremark* (September 2003). https://alt.3dcenter.org/artikel/2003/09-20_english.php
21. The Register, *ATI admits it optimised drivers for 3DMark03* (27 May 2003). https://www.theregister.com/off-prem/2003/05/27/ati-admits-it-optimised-drivers-for-3dmark-03/
22. Futuremark, *Guidelines for Driver Optimizations* (23 September 2003). https://benchmarks.ul.com/news/20392
23. UL, *Benchmark Rules and Guidelines / Delisted devices*. https://benchmarks.ul.com/support/benchmark-rules
24. VideoCardz, *Time Spy supports Asynchronous Computing* (24 June 2016). https://videocardz.com/61272/3dmark-time-spy-supports-asynchronous-computing
25. PC Perspective, *Time Spy async-compute performance* (July 2016). https://pcper.com/2016/07/3dmark-time-spy-looking-at-dx12-asynchronous-compute-performance/
26. PCWorld, *Radeon vs GeForce in Time Spy* (2016). https://www.pcworld.com/article/415661/3dmark-time-spy-tested-we-pit-radeon-vs-geforce-in-this-major-new-dx12-benchmark.html
27. UL, *3DMark updates and upgrades: major updates by year*. https://benchmarks.ul.com/support/3dmark-updates-and-upgrades
28. UL, *3DMark feature tests/editions*. https://support.benchmarks.ul.com/support/solutions/articles/44002132667-3dmark-features-by-edition
29. UL, *Which 3DMark benchmark should I use?* https://support.benchmarks.ul.com/support/solutions/articles/44002132650
30. UL, *Ice Storm (unsupported)*. https://support.benchmarks.ul.com/support/solutions/articles/44002135566-ice-storm-unsupported-
31. Futuremark, *New Sling Shot benchmarks for Android* (27 July 2015). https://benchmarks.ul.com/en/news/new-3dmark-sling-shot-benchmarks-for-android
32. Futuremark, *New benchmarks for your iPhone and iPad* (15 October 2015). https://benchmarks.ul.com/news/new-benchmarks-for-your-iphone-and-ipad
33. UL, *New cross-platform Wild Life benchmark* (15 October 2020). https://benchmarks.ul.com/en-jp/news/new-crossplatform-benchmark-for-android-ios-and-windows
34. UL, *3DMark Reviewers' Guide*. https://support.benchmarks.ul.com/support/solutions/articles/44002506454-3dmark-reviewers-guide
35. UL, *Solar Bay launch* (14 August 2023). https://benchmarks.ul.com/en-pt/news/ul-solutions-launches-3dmark-solar-bay-new-crossplatform-ray-tracing-benchmark
36. UL, *3DMark iOS release notes*. https://support.benchmarks.ul.com/support/solutions/articles/44002142029-3dmark-ios-app-release-notes
37. UL, *3DMark Android Benchmark*. https://benchmarks.ul.com/3dmark-android
38. Futuremark, *3DMark03 released* (11 February 2003). https://benchmarks.ul.com/jp/news/20386
39. HardwareZone, *New 3DMark for Windows Available Now* (5 February 2013). https://www.hardwarezone.com.sg/lifestyle/apps/tech-news-new-3dmark-windows-available-now
40. Futuremark, *Time Spy available now / new prices* (14 July 2016). https://benchmarks.ul.com/en-jp/news/3dmark-time-spy-directx-12-benchmark-test-available-now
41. UL, *3DMark Speed Way is now available* (12 October 2022). https://benchmarks.ul.com/news/3dmark-speed-way-is-now-available
42. Steam, *3DMark store listing* (observed November 2026, prices depend on region). https://store.steampowered.com/app/223850/3DMark/
43. UL, *3DMark feature availability and licence tiers*. https://support.benchmarks.ul.com/support/solutions/articles/44002132667-3dmark-features-by-edition
44. UL, *Futuremark Legacy Benchmarks*. https://benchmarks.ul.com/legacy-benchmarks
45. UL, *Company/benchmark history*. https://benchmarks.ul.com/about
46. TechPowerUp, *PhysX Runs on RV670, Scores 22,000 CPU Marks in Vantage* (26 June 2008). https://www.techpowerup.com/64042/physx-runs-on-rv670-scores-22-000-cpu-marks-in-3dmark-vantage
47. DVHardware, *NVIDIA responds to GPU PhysX cheating allegations* (26 June 2008). https://www.dvhardware.net/news/28182/nvidia-responds-to-gpu-physx-cheating-allegations
48. UL, *Benchmark Development Program*. https://benchmarks.ul.com/services/benchmark-development-program
49. UL, *Port Royal engine*. https://support.benchmarks.ul.com/support/solutions/articles/44002135563-port-royal-engine
50. UL, *3DMark Speed Way launch* (12 October 2022). https://benchmarks.ul.com/news/3dmark-speed-way-is-now-available
51. UL, *Port Royal overview*. https://support.benchmarks.ul.com/support/solutions/articles/44002135553-overview-of-3dmark-port-royal-benchmark
52. UL, *Port Royal launch* (8 January 2019). https://benchmarks.ul.com/news/3dmark-port-royal-ray-tracing-benchmark-now-available
53. UL, *Port Royal engine*. https://support.benchmarks.ul.com/support/solutions/articles/44002135563-port-royal-engine
54. ComputerBase, *3DMark Port Royal angeschaut* (January 2019). https://www.computerbase.de/artikel/grafikkarten/3dmark-port-royal.66244/
55. UL, *Speed Way benchmark overview*. https://support.benchmarks.ul.com/support/solutions/articles/44002378655-overview-of-3dmark-speed-way-benchmark
56. UL, *Estimating game performance from 3DMark scores*. https://support.benchmarks.ul.com/support/solutions/articles/44002125238-estimating-game-performance-from-3dmark-scores
