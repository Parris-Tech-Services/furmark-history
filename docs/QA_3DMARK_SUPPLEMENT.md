# 3DMark: supplementary answers

*This file was written in parallel with [QA_3DMARK.md](QA_3DMARK.md), which answers the same ten questions from a different set of sources. Read both: this one adds UL's About-page timeline, the Time Spy async-compute post, the 2003 audit, the Huawei delisting, Steel Nomad's engine page and the pricing notices. Where the two differ, check the cited primary page.*

*Researched 13 November 2026. UL's own support pages, news posts, About-page timeline and technical guide were read directly; press and forums are labelled. Claims I could not confirm are marked "not confirmed". Sources are numbered at the end.*

## 1. How are Time Spy and Steel Nomad scored, and what do they render?

**Time Spy.** Two graphics tests (2560x1440) and a CPU test. The overall score is a weighted harmonic mean: (W_g + W_c) / (W_g / S_g + W_c / S_c), with the graphics weight 0.85 and the CPU weight 0.15 [1]. The graphics score is the harmonic mean of the two tests' average frame rates times a scaling constant, which brings it in line with traditional 3DMark levels; the CPU score derives from simulation time per frame [1]. A harmonic mean means a weak CPU or GPU drags the total down more than an arithmetic mean would [1].

**Steel Nomad.** Rendering resolution 3840 x 2160, DirectX 12 feature level 12 or Vulkan 1.1, one graphics test and no CPU test [2]. The overall score equals the graphics score, which is the average frame rate times 100 [3]. Speed Way uses the same rule: score = average FPS x 100 [4].

What Steel Nomad renders (UL's "engine" page) [5]: opaque objects with deferred rendering into a G-buffer with PBR material parameters, shading in linear HDR; order-independent transparency; decals; reflections and diffuse global illumination sampled from probes spread around the scene; GPU-simulated particles (compute shaders); grass in compute shaders with distance-based level of detail; a dynamic ray-marched volumetric cloud sky; screen-space contact shadows; screen-space reflections with a cube-map fallback; heat distortion from particles; compute-shader FFT bloom (blur, streaks, anamorphic flare, lenticular halo); a three-pass froxel volume illumination for fog; scatter-as-gather depth of field; and XeGTAO ambient occlusion (ultra quality in compute shaders in Steel Nomad, high quality in pixel shaders in Light) [5]. Steel Nomad uses asynchronous compute to overlap the first volume-illumination pass with other passes; Light does not, and also has no volume illumination [5]. It is explicitly non-ray-traced [6]. Version history: 1.0, launch version, and no later version [7].

## 2. How big is 3DMark's user base, and who holds records?

UL gives few total figures. Hard numbers from UL: Time Spy had "almost 48 million" submitted results by May 2024 [6]; the Android app had "more than 100,000 downloads in its first week" (April 2013) and the iOS app 50,000 downloads in two weeks (September 2013) [8]; UL describes the 3DMark Hall of Fame as the home of world-record scores [9]. A third-party download page claims "25 years, 50M+ results" but I could not trace that to UL, so I treat it as unconfirmed [10]. I found no UL total for all results or for active users.

Records: cached Hall of Fame pages show Port Royal's top entries in the high 40,000s on RTX 5090 systems (for example 47,311 on an RTX 5090 with a Core i9-14900KS at rank 85 in one snapshot), and an old Time Spy snapshot headed by multi-GPU rigs [9]. The pages carry a notice about turbulence and the snapshots are of different dates, so these are not current standings. HWBot and the Hall of Fame both hold records; I did not reconcile them. Not confirmed.

## 3. The 3DMark03 driver scandal and the smartphone delistings

**May 2003.** An ExtremeTech investigation of Nvidia's drivers prompted a Futuremark audit [11]. On Friday 23 May 2003, Futuremark published a seven-page audit of Detonator FX 44.03 and 43.51 drivers listing eight instances where it believed Nvidia modified drivers unfairly; renaming the benchmark executable lowered scores in certain tests [11][12]. Futuremark's patch 330 stops the drivers recognising the benchmark; it measured the GeForce FX 5900 Ultra dropping about 24% with it, versus under 2% for ATI's Radeon 9800 Pro [12]. The Register (27 May 2003) reported ATI also admitted tweaks: renaming the executable cut Game Test 4 by 8% and the total by just under 2% (ATI said it was an optimization of the water and sky shaders, "mathematically and functionally identical", and promised to remove it) [11]. Weeks later Futuremark reversed course: it said Nvidia's approach was an "application specific optimization" rather than a cheat, but still said the rules were broken, and did not reinstate the original results; a joint statement called for clear industry rules for benchmarks [13].

**Phones.** On 7 September 2018 UL delisted the Huawei P20 Pro, Nova 3 and Honor Play (and the P20 based on AnandTech's testing). UL compared the public 3DMark app with a private build that is not available to manufacturers: public-app scores were up to 47% higher with identical tests, meaning the phones recognised the app by name. Delisted devices appear unranked, without scores [14]. Other delistings reported: OPPO's Find X and F7 (2018) and a 2013 sweep of HTC and Samsung Android devices [15]; and in April 2020 MediaTek-based phones from Xiaomi, OPPO, Vivo, Sony and Realme [16].

## 4. The Time Spy asynchronous compute controversy

In July 2016 a forum post on Overclock.net argued Time Spy's async compute use fit Nvidia's architecture better than AMD's: in DOOM and Ashes of the Singularity the Fury X beat a GTX 1070, but not in Time Spy [17]. PC Perspective explained the issue and noted the causes were unknown (driver maturity, optimization differences) [17].

Futuremark replied on 19 July 2016 with a detailed post. Its main points: Time Spy was developed with input from AMD, Intel, Microsoft, NVIDIA and others in the Benchmark Development Program, in development for nearly two years; vendors spent weeks in the office, downloaded daily source drops hundreds of times, and exchanged "around one thousand emails" on it; the engine uses two queues, DIRECT and COMPUTE, regardless of the hardware; "the implementation is the same regardless of the underlying hardware" with no vendor-specific optimizations; and whether COMPUTE-queue work runs in parallel or serial "is ultimately the decision of the underlying driver" because DirectX 12 only lets an application permit parallel execution [18]. The post shows GPUView traces for the GTX 970, Fury and GTX 1080 with async compute on and off, and the compute work items: particle simulation, light culling and tiling, environment reflections, HBAO and unshadowed surface illumination [18]. Futuremark's stated principle is that 3DMark predicts games in general, not absolute theoretical maximums [18]. Forum claims that Nvidia's driver disables async on pre-Pascal cards, or that Time Spy's version is "preemption based", are unconfirmed forum claims [19].

## 5. Which feature tests exist, and when did they arrive?

From UL's About-page timeline and release notes [8][20]:

| Date | Feature test |
|---|---|
| March 2015 | API Overhead, "the world's first DirectX 12 API performance test" (Vulkan added March 2017; Android Vulkan August 2017) |
| June 2016 | Stress tests added (loop runs to check stability) |
| February 2019 | NVIDIA DLSS feature test (DLSS 2 and three quality modes added September 2020; DLSS 3 and Frame Generation October 2022) |
| June 2019 | PCI Express bandwidth feature test |
| August 2019 | VRS feature test (Tier 2 option added December 2019) |
| October 2020 | DirectX Raytracing feature test |
| February 2021 | Mesh Shader feature test |
| June 2021 | CPU Profile (1, 2, 4, 8, 16 or max threads) |
| August 2021 | Sampler Feedback feature test |
| November 2021 | Storage Benchmark (a paid add-on) |
| October 2022 | Intel XeSS feature test |
| March 2023 | AMD FSR feature test (release notes: 30 March 2023, "FSR 2") |
| October 2024 | Opacity Micromap feature test (Android) |
| November 2024 | DirectStorage feature test |

The Mesh Shader test, per UL, uses a hall of carved pillars: one pass culls with the traditional approach, a second with mesh shaders, to show how game engines can boost frame rates [21]. UL's Sampler Feedback test (24 August 2021 per its news post; the timeline says August 2021) made 3DMark the first public app with all four DirectX 12 Ultimate features, according to UL's coverage [20][22].

## 6. The mobile tests

UL's timeline gives: 3DMark for Android in April 2013 (100,000+ downloads in the first week), iOS in September 2013 (50,000 in two weeks), Windows RT in October 2013 [8]. Ice Storm and Ice Storm Extreme were released in 2013 and support ended on 14 January 2020 (Ice Storm used OpenGL ES 2.0 on mobile) [23]. Sling Shot (OpenGL ES 3.1 and 3.0) arrived on Android in July 2015 and iOS in October 2015, with Sling Shot Extreme using Apple's Metal in March 2016 [8]. Wild Life arrived in October 2020 as a cross-platform benchmark for Apple, Android and Windows (Vulkan on Windows and Android; 2560 x 1440) [8][24]. Wild Life Extreme followed in May 2021 at 3840 x 2160, for Windows notebooks, Arm PCs and Apple M1 Macs [8][24]. Solar Bay launched in August 2023 as a ray-tracing benchmark: Vulkan 1.1, a benchmark whose ray-traced workload increases linearly by 100% over three stages with four scores, plus a stress test that loops for 20 minutes; the app was previously "3DMark Wild Life Benchmark" [25]. Steel Nomad Light (May 2024) is the 1440p test for lighter devices [24]. Solar Bay Extreme followed in August 2025 [8].

## 7. What has 3DMark cost?

UL's own price statements: from 12 October 2022, 3DMark Advanced Edition and 3DMark on Steam cost US$34.99, because Speed Way was included; existing owners could buy a Speed Way Upgrade DLC for $4.99, and a Steam policy change meant standalone Advanced licenses bought after that date could not be added to Steam accounts [26]. In May 2024 Steel Nomad cost US$34.99 on Steam for newcomers (launch-week 75% off) and was free to existing owners [6][27]. Earlier price points: UL's statement that the price rose implies a lower earlier price; a secondary source says US$29.99 normal Advanced price, and PC Gamer reports sales taking Advanced under US$5 [28]. A reseller page lists Professional at US$995 and a third-party page US$1,495 per year; neither is UL's own page, so unconfirmed [29]. UL says Professional customers with a perpetual license need an annual license for Speed Way [26]. Free: Basic Edition with the main tests (UL's 2011 Vantage Basic was also free) [29]. I did not find Steam player counts or review totals. Not confirmed.

## 8. Other Futuremark benchmarks, and the Vantage PhysX dispute

From UL's timeline [8]: Final Reality (May 1997, Remedy, before the company existed) [30]; PCMark2002 (March 2002); PCMark04 (November 2003); PCMark05 (June 2005); PCMark Vantage (October 2007); Peacekeeper (March 2009, free browser test; universal-browser version November 2011); PCMark 7 (May 2011); Powermark (December 2011); PCMark 8 (June 2013 Professional); PCMark for Android (October 2014); VRMark (November 2016; Cyan Room November 2017); PCMark 10 (June 2017); Testdriver (July 2017); Servermark (November 2017 onward); Procyon (September 2020). Peacekeeper support ended on 29 July 2015 [31]. The UL timeline states 3DMark06 (January 2006) was "our most popular 3DMark yet" and Fire Strike Ultra (October 2014) the "world's first 4K Ultra HD benchmark" and Time Spy Extreme (October 2017) the "world's first 4K DirectX 12 benchmark test" [8].

**Vantage PhysX.** Nvidia's ForceWare 177.39 drivers let 3DMark Vantage's CPU physics test run on the GPU, via PhysX, inflating the CPU score; reports quote CPU Test 2 at about 15 FPS without and 128 FPS with GPU PhysX [32]. Nvidia said this was a physics test, not a graphics test; AMD and others objected. Futuremark's CEO said GPU PhysX would not be allowed because the CPU test measures CPU physics, and Futuremark updated its Hall of Fame to exclude GPU PhysX results [32]. I did not retrieve Futuremark's own statement or exact dates, and some reports conflict on stages of the policy. Partly confirmed.

## 9. How does the Benchmark Development Program work?

UL describes it as industry cooperation: each 3DMark "was developed with input from" AMD, Intel, NVIDIA and other members of the "UL Benchmark Development Program" [2][24]. The fullest account is Futuremark's own July 2016 post: members receive regular builds throughout development and conduct their own testing at each stage; they have source-code access and can suggest changes; all work is in a single source tree, so anything suggested by a vendor can be seen; vendors reviewed Time Spy for weeks in the office; and when members disagree, Futuremark listens to all sides, consults game developers, and asks "Is this the approach a game developer would take?" [18]. Futuremark says vendors are invariably against vendor-specific paths, because they would alter the work done and break comparability [18]. A forum claim that Futuremark cannot publish unless all vendors approve is unconfirmed [19]. UL's 2026 Seasonic sponsorship shows another input: UL says the sponsor's logo is displayed inside the benchmark [33]; it does not say what sponsors pay or whether they influence the test. UL's BDP page was not retrievable; a full member list is not confirmed.

## 10. How were Port Royal and Speed Way received, and how do they relate to games?

**Port Royal** launched on 8 January 2019 at 2560 x 1440, requiring DirectX Raytracing, as "the world's first dedicated real-time ray tracing benchmark for gamers" [34]. Early press tests: one put the RTX 2080 at 5,986 (28 FPS) and the RTX 2080 Ti at 7,925 (37 FPS); another saw an ASUS ROG Strix RTX 2080 OC at 6,106 [35]. Reviewers noted that the GTX 1080 fell far behind in this test, and that Port Royal does not run at maximum quality for ray tracing (one outlet measured an RTX 2080 Ti dropping from 37.8 to 23.0 FPS at lower ray-tracing quality) [35]. NVIDIA added DLSS to the benchmark in February 2019, claiming up to 50% more performance [35].

**Speed Way** launched on 12 October 2022 for DirectX 12 Ultimate (feature level 12_2), at 2560 x 1440 [4][36]. Its engine removes all precomputed lighting (no lightmaps or probes), is fully dynamic, uses mesh shaders for continuous level-of-detail selection and culling, a deferred direct-lighting path, and DirectX Raytracing 1.1 for global illumination and reflections [4][36]. It was sponsored by Lenovo Legion [36]. UL's pricing moved to $34.99 with it [26]. Typical RTX 4090 results in forums run around 10,000 to 12,000 [37]; one overclocker record was later deemed invalid by 3DMark due to a VRAM artifacting bug (a forum report) [37].

**Relationship to games.** UL's stated aim is to predict game performance generally, not the theoretical maximum of the hardware, through a neutral, common code path [18]. UL also publishes a support article on estimating game performance from scores; I could not retrieve it, so I cannot quote its guidance. Tom's Hardware uses a FurMark run as a power worst-case rather than 3DMark as a game proxy [38]. Independent studies of how well 3DMark scores predict frame rates in particular games: not found.

## Sources

1. UL Benchmarks support, "How is the 3DMark Time Spy score calculated?". https://support.benchmarks.ul.com/support/solutions/articles/44002136143-how-is-the-3dmark-time-spy-score-calculated-
2. UL Benchmarks support, "Overview of 3DMark Steel Nomad" (resolution 3840 x 2160). https://support.benchmarks.ul.com/support/solutions/articles/44002528058-overview-of-3dmark-steel-nomad
3. UL Benchmarks support, "How is the 3DMark Steel Nomad score calculated?". https://support.benchmarks.ul.com/support/solutions/articles/44002528064-how-is-the-3dmark-steel-nomad-score-calculated-
4. UL Benchmarks support, "How is the 3DMark Speed Way score calculated?" and "Speed Way engine". https://support.benchmarks.ul.com/support/solutions/articles/44002378659-how-is-the-3dmark-speed-way-score-calculated-
5. UL Benchmarks support, "Steel Nomad Engine". https://support.benchmarks.ul.com/support/solutions/articles/44002528067-steel-nomad-engine
6. UL Benchmarks, "3DMark Steel Nomad is out now!", 21 May 2024. https://benchmarks.ul.com/news/3dmark-steel-nomad-is-out-now
7. UL Benchmarks support, "Steel Nomad Version History". https://support.benchmarks.ul.com/support/solutions/articles/44002528068-steel-nomad-version-history
8. UL Benchmarks, "About us" (company timeline). https://benchmarks.ul.com/about
9. 3DMark Hall of Fame pages (via search summaries). https://www.3dmark.com/hall-of-fame-2/
10. pcgamingtools.com 3DMark page (third party; unverified claim). https://pcgamingtools.com/3dmark-download/
11. The Register, "ATI admits it 'optimised' drivers for 3DMark 03", 27 May 2003. https://www.theregister.com/2003/05/27/ati_admits_it_optimised_drivers
12. Futuremark audit report, "Alleged NVIDIA Driver Cheating on 3DMark03" (third-party mirror) http://www.kickassgear.com/downloads/3dmark03_audit_report.pdf ; GameSpot, "Nvidia accused of cheating in 3DMark 03" https://www.gamespot.com/articles/nvidia-accused-of-cheating-in-3dmark-03/1100-6028894/ (via search summaries)
13. GameSpot, "Futuremark says Nvidia didn't cheat" https://www.gamespot.com/articles/futuremark-says-nvidia-didnt-cheat/1100-6029339/ ; InfoWorld, "Futuremark says Nvidia didn't cheat, but broke rules" https://infoworld.com/article/2680144/futuremark-says-nvidia-didn-t-cheat--but-broke-rules.html
14. UL Benchmarks, "UL delists Huawei phones with suspect benchmark scores", Sep 2018. https://benchmarks.ul.com/news/ul-delists-huawei-phones-with-suspect-benchmark-scores
15. XDA Developers and Engadget coverage of Huawei, OPPO and earlier delistings (via search summaries). https://www.xda-developers.com/huawei-p20-huawei-nova-3-honor-play-cheating-benchmarks/
16. Forbes (Moor Insights), "UL Benchmarks Delists MediaTek-Based Xiaomi, OPPO, Vivo, Sony, And Realme Smartphones", 16 Apr 2020 (via search summary). https://www.forbes.com/sites/moorinsights/2020/04/16/ul-benchmarks-delists-mediatek-based-xiaomi-oppo-vivo-sony-and-realme-smartphones-devices-with-suspect-scores/amp/
17. PC Perspective, "What's Asynchronous Compute? 3DMark Time Spy Controversy", July 2016. https://pcper.com/2016/07/whats-asynchronous-compute-3dmark-time-spy-controversy/
18. Futuremark, "A closer look at asynchronous compute in 3DMark Time Spy", 19 Jul 2016. https://aws.futuremark.com/en/news/a-closer-look-at-asynchronous-compute-in-3dmark-time-spy
19. Guru3D and AnandTech forum threads on Time Spy async (anecdotal). https://forums.guru3d.com/threads/futuremark-developer-responds-to-accusations-of-cheating-in-time-spy-benchmark.408769/
20. UL Benchmarks support, "3DMark Windows application release notes". https://support.benchmarks.ul.com/support/solutions/articles/44001971281-3dmark-windows-application-release-notes
21. UL Benchmarks, "New 3DMark test measures mesh shader performance". https://benchmarks.ul.com/news/new-3dmark-test-measures-mesh-shader-performance
22. TechPowerUp, "3DMark Receives DirectX 12 Ultimate Sampler Feedback Feature Test" (via search summary). https://www.techpowerup.com/286021/3dmark-receives-directx-12-ultimate-sampler-feedback-feature-test
23. UL, 3DMark Technical Guide (updated 14 Jan 2021). https://s3.amazonaws.com/download-aws.futuremark.com/3dmark-technical-guide.pdf
24. UL Benchmarks, 3DMark product page. https://benchmarks.ul.com/3dmark
25. UL Benchmarks, "UL Solutions Launches 3DMark Solar Bay, New Cross-Platform Ray Tracing Benchmark". https://benchmarks.ul.com/news/ul-solutions-launches-3dmark-solar-bay-new-crossplatform-ray-tracing-benchmark
26. UL Benchmarks, "3DMark Speed Way launches on October 12" (price notice). https://benchmarks.ul.com/news/3dmark-speed-way-launches-on-october-12
27. PC Gamer, "3DMark Steel Nomad is now available to give your GPU an inferiority complex". https://www.pcgamer.com/hardware/graphics-cards/3dmark-steel-nomad-is-now-available-to-give-your-gpu-an-inferiority-complex/
28. PC Gamer, "Unlock 3DMark Advanced for under $5". https://pcgamer.com/unlock-3dmark-advanced-for-under-dollar5-and-benchmark-your-pc-like-the-pros
29. Newegg and reseller listings for 3DMark (third party; via search summary). https://www.newegg.com/ul-3dmark-advanced-edition/p/N82E16833980093
30. James Mackenzie, "The History of (and Nostalgia for) 3DMark". https://www.jamesfmackenzie.com/2023/04/21/the-history-of-and-nostalgia-for-futuremark-3dmark/
31. UL Benchmarks, "Peacekeeper support ends July 29". https://aws.futuremark.com/en/news/peacekeeper-support-ends-july-29
32. HotHardware, "Futuremark Removes GPU PhysX Results" https://hothardware.com/news/futuremark-removes-gpu-physx-results ; TechPowerUp, "GPU PhysX Doesn't get you to 3DMark Vantage Hall of Fame Anymore" https://www.techpowerup.com/66327/gpu-physx-doesnt-get-you-to-3dmark-vantage-hall-of-fame-anymore (via search summaries; pages blocked)
33. UL Benchmarks, "Seasonic joins as a sponsor of the next 3DMark GPU Benchmark", 24 Jul 2026. https://benchmarks.ul.com/news
34. UL Benchmarks, "3DMark Port Royal ray tracing benchmark now available", 8 Jan 2019. https://benchmarks.ul.com/news/3dmark-port-royal-ray-tracing-benchmark-now-available
35. PC Gamer, "Testing ray tracing performance with 3DMark's latest benchmark" https://www.pcgamer.com/testing-ray-tracing-performance-with-3dmarks-latest-benchmark/ ; Geeks3D, "(Tested) 3DMark Port Royal" https://www.geeks3d.com/20190114/tested-3dmark-port-royal-directx-raytracing-benchmark/ ; NVIDIA, "Port Royal Benchmark Adds NVIDIA DLSS" https://www.nvidia.com/en-in/geforce/news/nvidia-dlss-3dmark-port-royal-benchmark/ (via search summaries)
36. UL Benchmarks, "3DMark Speed Way is now available", 12 Oct 2022; UL support, "Overview of 3DMark Speed Way benchmark" (resolution 2560 x 1440). https://benchmarks.ul.com/news/3dmark-speed-way-is-now-available
37. Tom's Hardware and Overclock.net forum threads on Speed Way scores (anecdotal). https://forums.tomshardware.com/threads/worried-about-my-3dmark-speed-way-score-with-rog-strix-rtx-4090-oc.3791463/
38. Tom's Hardware, "AMD Radeon RX 7900 XTX and XT Review". https://www.tomshardware.com/reviews/amd-radeon-rx-7900-xtx-and-xt-review-shooting-for-the-top/8
