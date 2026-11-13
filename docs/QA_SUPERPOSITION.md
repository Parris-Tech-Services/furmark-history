# UNIGINE Superposition: ten questions answered

*Researched 13 November 2026. UNIGINE's own pages and manual were read directly; hardware-review sites and forums are labelled. Claims I could not confirm are marked "not confirmed". Sources are numbered at the end.*

## 1. Who is UNIGINE, and what is the UNIGINE 2 engine?

UNIGINE is a real-time 3D engine company. Its engine's roots are the open-source "frustum.org" project, started in 2002 by Alexander "Frustum" Zapryagaev, who co-founded the company with Denis Shergin (CEO) [1]. The engine's first public version is listed as 0.3 on 4 May 2005, and UNIGINE's own About page says the company was established in 2005 [1][2]. In 2021 it claimed more than 250 business customers [1].

Where it is based: after a restructuring completed on 30 October 2020, UNIGINE Holding S.à r.l. in Luxembourg is the 100% parent of UNIGINE LLC (Russia). Denis Shergin is the main shareholder, and the venture firm LETA Capital is a minority shareholder. The old entity, UNIGINE Corp., was liquidated. The company then listed three offices (the Luxembourg headquarters, Tomsk and Saint Petersburg) plus remote staff across Europe and Russia [3]. So Tomsk is a development office, not the headquarters. The 2013 Valley announcement quotes lead technical artist Andrey Kushner: "Living in Siberia, we wanted to show how beautiful the nature is here" [4]. UNIGINE's About page says it has "more than 80" staff and that its benchmarks have "over 40 million active users" (company figures) [2].

**UNIGINE 2** was released on 10 October 2015. It kept UNIGINE 1's features and moved from forward to deferred rendering, added physically based shading, geometry water, multi-layered volumetric clouds, SSRTGI and voxel-based lighting [1]. The engine is C++ with C# and UnigineScript scripting [1].

## 2. What do typical Superposition scores look like, and who holds records?

Scores depend on preset, and UNIGINE's manual says scores from different presets are not comparable and there is no overall score [5]. Collected data points (all from third parties; systems differ):

- **RTX 4090, 4K Optimized:** a forum user reports 39,406 on a Core i9-13900K, and 37,616 with ECC memory on [6]. A Micro Center article reports 33,744 for a 4090 (its settings were not clear in the summary I saw) [7].
- **RTX 3080 Ti, 4K Optimized:** forum users report 15,723 to 17,826 [8][6].
- **Overclocking records (HWBot):** on the 8K Optimized list, LN2 runs on RTX 4090 cards reach 17,657 (3885/1563 MHz) and 17,613; air and water submissions sit lower, around 15,900 to 16,800. On the 1080p Xtreme list, LN2 4090 runs reach 30,635 to 30,724 [9]. Tom's Hardware reported that the overclocker CENS ran an RTX 4090 at 3.825 GHz with 3D stability, validated with Superposition 8K Optimized, scoring 18,701 (his own tweet is dated 9 May 2023) [10].

HWBot standings change constantly and its pages blocked my automated fetch, so treat the figures as a snapshot from search results. A "good" score for a given card is best found in the UNIGINE global leaderboard [5]. I found no authoritative GTX 1080 Ti 4K score. Not confirmed.

## 3. How do the stress test and VR-ready test work?

UNIGINE's manual lists three test types in benchmark mode: Performance, VR Ready, and Stress [5].

- **Performance** gives the actual game-like score for a preset (1080p Medium, 1080p High, 1080p Extreme, 4K Optimized, 8K Optimized, or Custom) [5].
- **VR Ready** reports whether the system can run VR at the chosen quality. Its score is capped at 10,000, used only to judge VR capability, and not submitted to the leaderboards [5]. Version 1.1 added a Vive Pro preset to it [5].
- **Stress** is a loop over a specific time interval to check stability, available only in the Advanced and Pro editions [5].

UNIGINE describes the stress mode as "putting the GPU under a stress workload to determine the system's reliability" [5]. Reviewers mostly use the Performance test: Phoronix runs the Linux OpenGL build in its test suite at 1080p High as a default profile [11].

## 4. Why DirectX 11 and OpenGL, not Vulkan or DX12?

On Windows, Superposition offers Direct3D 11 and OpenGL; on Linux, OpenGL only (it requires OpenGL 4.5) [12][13]. The Linux launch reviewer hoped Vulkan would come later and a tweet suggested it was not certain [13]. A 2019 reader reply confirms Linux is still OpenGL only [14].

The reason is timing. UNIGINE built Superposition on UNIGINE 2.x, whose supported APIs were DirectX 11 and OpenGL 4 [1]. UNIGINE 2.16 (10 October 2022) added experimental DirectX 12 and Vulkan renderers. UNIGINE wrote that "it took a while" because of "low quality of drivers and poor support from vendors at early stages" and the "industry's negative experience of porting AAA games" [15]. Phoronix and 80.lv reported some features missing in that first build, and UNIGINE 2.17 lists both APIs as production-ready [16]. So the engine now has newer APIs, but I found no Superposition release that uses them: version 1.1 (April 2019) is still the latest in UNIGINE's version history [5]. UNIGINE has not said why. Not confirmed.

## 5. What are the histories of Heaven and Valley, and are they still used?

| Date | Event | Source |
|---|---|---|
| 22 Oct 2009 | Heaven 1.0 announced as the first true DX11 benchmark | [17] |
| 2 Mar 2011 | Heaven 2.5, plus a Professional edition | [18] |
| 7 Mar 2012 | Heaven 3.0, first to run on Mac | [19] |
| 12 Feb 2013 | Heaven 4.0: presets, GPU temperature and clock monitoring, improved SSDO, multi-GPU detection, new Advanced edition | [20] |
| 14 Feb 2013 | Valley 1.0, set in a forest-covered mountain valley, for Windows, Linux and OS X | [4][21] |

Heaven's scene is a steampunk village on flying islands with a dragon on the central square [20]. Heaven 4.0 is still the latest on UNIGINE's page, and OpenBenchmarking lists Valley profile 1.1.7 from July 2018 [22]. HWBot still has Heaven categories [23]. Are they "still used"? Reviewers and overclockers still reference them; Wikipedia says UNIGINE benchmarks are used by Tom's Hardware, Linus Tech Tips, PC Gamer and JayzTwoCents and are part of the Phoronix Test Suite [1]. I did not count current usage.

## 6. What about the 8K demo broadcast from space?

The only source is UNIGINE itself. Its 1.1 release post (12 April 2019) lists, among two years of statistics, that "the Superposition 8K demo was broadcasted from space via satellite system" [24]. 80.lv repeats the sentence [25]. I found no mission name, date, broadcaster or receiving network, and nothing independent. The launch coverage does confirm that UNIGINE published a 4320p (8K) 60 FPS video clip of the benchmark at release, and that 8K Optimized is a real preset [26][5]. Whether the satellite claim means a downlink test, a trade-show feed or something else is not confirmed.

## 7. Which sites and test suites adopted Superposition?

- **Phoronix and the Phoronix Test Suite.** The test profile `unigine-super` was created on 11 April 2017, the launch day, and the latest version listed is 1.0.8; the default configuration is 1920x1080, fullscreen, High quality, OpenGL [11][12]. Phoronix published a 17-card comparison the same day [12].
- **Launch coverage:** Tom's Hardware, Legit Reviews, TechSpot, PC Perspective, Digital Trends, GamingOnLinux and others covered the launch [26][27].
- **Ongoing use:** UNIGINE's 1.1 post says Tom's Hardware, Linus Tech Tips, PC Magazine and Phoronix "use Superposition on a regular basis" [24]; Wikipedia adds PC Gamer and JayzTwoCents for UNIGINE benchmarks in general [1]. PC Magazine's reviews do cite it [28].
- **Overclocking:** HWBot hosts Superposition leaderboards (8K Optimized, 1080p Xtreme) [9].

## 8. How does SSRTGI work, per UNIGINE?

UNIGINE describes SSRTGI (Screen-Space Ray-Traced Global Illumination) as a set of screen-space ray tracing techniques giving real-time global illumination. It incorporates screen-space ambient occlusion, screen-space global illumination and bent normals [29][30]. Ordinary screen-space effects "do not treat objects as obstacles for light rays"; SSRTGI instead "provides real 180° ray tracing for each pixel in the scene with a fixed number of steps per ray to define occlusions" [30]. Bent normals reduce noise and smooth shadow borders [30]. The engine exposes settings for the number of rays per pixel, steps per ray, resolution and noise [29]. UNIGINE's 2.5 devlog is dated 31 May 2017, and UNIGINE presented it at SIGGRAPH 2017 Real-Time Live! (post dated 1 August 2017), saying the technique was "created for Superposition Benchmark" [30][31]. In SDK 2.19.1 the ray distribution across the hemisphere was redesigned [32].

It is not hardware ray tracing. As a general property of screen-space methods (not a UNIGINE statement), it can only see what is on screen. I found no UNIGINE slide deck or paper with the exact sampling and denoising steps. Not confirmed.

## 9. What do the editions cost?

From UNIGINE's current Superposition page (price table, tax not included) [33]:

| Edition | For | Price |
|---|---|---|
| Basic | Gamer / VR user | Free |
| Advanced | Overclocker / VR user | $19.95 |
| Professional | Assembly or repair shop, hardware manufacturer | $495 |
| Enterprise | Company with multiple installations (unlimited seats) | $7,500 |

Bundles including Superposition, Valley and Heaven are $29.95 (Advanced), $995 (Professional) and $14,495 (Enterprise) [33]. At launch, Legit Reviews reported the Advanced edition at $19.95 [26]. A search summary of launch coverage suggested a $995 Professional price, which equals today's Professional bundle; I could not open that article, so I treat it as unconfirmed. The feature split (leaderboards and loop stress test from Advanced; command-line automation, CSV reports, commercial use and support from Professional) is in the manual [5].

## 10. How does Superposition rank among competing benchmarks in overclocking?

I found no ranking or participation figures that compare benchmarks, and HWBot blocked automated fetching. What the evidence does show: HWBot hosts separate Superposition categories (8K Optimized and 1080p Xtreme appear in the search results) with record-holders running RTX 4090s on liquid nitrogen [9]. Tom's Hardware's coverage of the 3.825 GHz record used Superposition 8K as the 3D stability test, noting that frequency records are normally set with lighter loads like GPUPI, and that a full 3D stress test is harder [10]. That implies Superposition is accepted as a demanding validation load, not that it is the most popular one. How it compares with 3DMark Time Spy or Port Royal in HWBot participation: not confirmed.

## Sources

1. Wikipedia, "Unigine" (raw page, fetched 13 Nov 2026). https://en.wikipedia.org/wiki/Unigine
2. UNIGINE Benchmarks, "About us". https://benchmark.unigine.com/about
3. UNIGINE, "Company Restructuring Completed", 30 Oct 2020. https://unigine.com/news/2020/company-restructuring-completed
4. UNIGINE, "UNIGINE's Newest Valley Benchmark Features Huge, Open-Space Expanses", 14 Feb 2013. https://unigine.com/news/2013/unigines-newest-valley-benchmark
5. UNIGINE, "Superposition Benchmark 1.1 User Manual". https://benchmark.unigine.com/docs/superposition/Superposition_Benchmark_User_Manual.pdf
6. ExtremeHW forum, "Benchmarking: Superposition 4K and 8K" (via search summary; user-submitted). https://extremehw.net/topic/2646-benchmarking-superposition-4k-and-8k/
7. Micro Center, "GeForce RTX 4090 Benchmarks" (via search summary; page blocked). https://www.microcenter.com/site/mc-news/article/geforce-rtx-4090-benchmarks.aspx
8. Tom's Hardware forum, "Good Unigine Superposition score for a 3080Ti?" (user-submitted). https://forums.tomshardware.com/threads/good-unigine-superposition-score-for-a-3080ti.3771360/
9. HWBot, Unigine Superposition 8K Optimized and 1080P Xtreme hall-of-fame pages (via search summaries; the site blocked my fetch). https://hwbot.org/benchmark/unigine_superposition_-_8k_optimized/halloffame
10. Tom's Hardware, "RTX 4090 Breaks World Record, Pushing Over 3.8GHz in Full-Blown 3D Benchmark". https://www.tomshardware.com/news/rtx-4090-3d-benchmark-world-record-3-8ghz-oc
11. OpenBenchmarking.org, Phoronix Test Suite profile unigine-super 1.0.8. https://mail.openbenchmarking.org/test/pts/unigine-super-1.0.8
12. Phoronix, "Unigine Superposition Is A Beautiful Way To Stress Your GPU In 2017, 17-Way Graphics Card Comparison", 11 Apr 2017 (via search summary). https://www.phoronix.com/review/unigine-super-benchmark
13. GamingOnLinux, "Superposition, the latest benchmark by Unigine, has been released", 12 Apr 2017. https://gamingonlinux.com/2017/04/superposition-the-latest-benchmark-by-unigine-has-been-released/
14. GamingOnLinux, "UNIGINE recently updated the Superposition benchmark tool with free VR support, Linux VR supported", Apr 2019 (reader comment: Linux is OpenGL only). https://www.gamingonlinux.com/2019/04/unigine-recently-updated-the-superposition-benchmark-tool-with-free-vr-support-linux-vr-supported
15. UNIGINE, "UNIGINE 2.16 - Asset Store, Vulkan & DirectX 12, ROS Integration, New Window Manager", 10 Oct 2022. https://unigine.com/news/2022/unigine-2-16-asset-store-vulkan-directx-12-ros-integration-new-window-manager
16. Phoronix, "Unigine 2.16 Released With Experimental Vulkan Support" https://www.phoronix.com/news/Unigine-2.16-Vulkan ; 80.lv, "UNIGINE Engine 2.16 Released" https://80.lv/articles/unigine-engine-2-16-released ; UNIGINE 2.17 highlights (via search summary).
17. Legit Reviews, "Unigine 'Heaven' - The First DirectX 11 Benchmark", 31 Oct 2009. https://www.legitreviews.com/unigine-heaven-the-first-directx-11-benchmark_1117
18. UNIGINE, "Introducing Heaven DX11 Benchmark 2.5 and its Professional edition", 2 Mar 2011. https://unigine.com/ru/news/2011/introducing-heaven-dx11-benchmark-2-5-and-its-professional-edition/
19. UNIGINE, "Heaven DX11 Benchmark is Back with Version 3.0", 7 Mar 2012. https://unigine.com/news/2012/heaven-dx11-benchmark
20. UNIGINE, "UNIGINE's Heaven Benchmark Releases Version 4.0 and Extended Editions", 12 Feb 2013. https://unigine.com/news/2013/unigines-heaven-benchmark-releases-version-4-0-and-extended-editions
21. Geeks3D, "Unigine Valley 1.0 Graphics Benchmark Released", 15 Feb 2013. https://www.geeks3d.com/20130215/unigine-valley-1-0-graphics-benchmark-released/
22. OpenBenchmarking.org, Unigine Valley profile (via search summary). https://openbenchmarking.org/test/pts/unigine-valley&search
23. HWBot, Unigine Heaven Xtreme rules page (via search summary). https://hwbot.org/benchmarks/unigine_heaven_-_xtreme/rules/5283
24. UNIGINE, "Superposition Benchmark 1.1: Free VR to Everyone", 12 Apr 2019. https://unigine.com/news/2019/superposition-benchmark-1-1-free-vr-to-everyone
25. 80.lv, "UNIGINE Superposition Benchmark 1.1 with Free VR". https://80.lv/articles/unigine-superposition-benchmark-1-1-with-free-vr
26. Legit Reviews, "UNIGINE Superposition Benchmark - New Stress Test For Video Cards" (launch: "more than half a year of teasing"; 8K 60 FPS clip; Advanced $19.95). https://www.legitreviews.com/?p=193529
27. TechSpot https://www.techspot.com/news/68925-unigine-launches-superposition-benchmark-application.html ; PC Perspective https://pcper.com/2017/04/unigine-superposition-gpu-stress-test-released/ ; Digital Trends https://www.digitaltrends.com/computing/unigine-superposition-8k-vr/ (launch coverage; bodies partly blocked)
28. Wikipedia, "Superposition Benchmark" (cites PC Magazine reviews). https://en.wikipedia.org/wiki/Superposition_Benchmark
29. UNIGINE Developer, "Global Illumination" documentation. https://developer.unigine.com/en/docs/latest/editor2/lighting/gi/
30. UNIGINE, "SIGGRAPH 2017: UNIGINE at Real Time Live!", 1 Aug 2017. https://unigine.com/news/2017/siggraph-2017-unigine-at-real-time-live
31. UNIGINE Developer, "UNIGINE 2.5: Screen-Space Ray-Traced Global Illumination..." devlog, 31 May 2017. https://developer.unigine.com/devlog/20170531-unigine-2.5
32. UNIGINE, "UNIGINE SDK 2.19.1 Release", 2024 (via search summary). https://unigine.com/news/2024/unigine-sdk-2-19-1-release/
33. UNIGINE Benchmarks, Superposition product page, editions and prices table. https://benchmark.unigine.com/superposition
