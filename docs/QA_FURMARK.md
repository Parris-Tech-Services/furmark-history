# FurMark: ten questions answered

*Researched 13 November 2026. Primary pages (Geeks3D, oZone3D, KitGuru, Tom's Hardware) were read directly. Forum posts are labelled as such. Numbered sources are at the end; claims I could not confirm are marked "not confirmed".*

## 1. How is the fur actually rendered?

The best primary evidence is a description of FurMark's rendering as heavily multipass, with about 100 passes, where each pass runs a GLSL vertex and pixel shader that makes the hairs progressively finer, with two dynamic lights giving self-shadowing [1][2]. That is the classic "shell" or layered fur method: draw the mesh repeatedly, pushing each shell outward by a growing fur length. A well-known general write-up of shell texturing describes exactly that approach, though it uses HLSL, not GLSL [3].

What I could not find is a dedicated oZone3D or Geeks3D tutorial for FurMark's fur shader. oZone3D's tutorial index lists GLSL topics such as fog and texturing but nothing on fur [4]. So the "100 passes" and "shell" wording rests on a secondary description of FurMark, not on a JeGX source; it is consistent with, but not proven by, the developer's own text. Not confirmed from a primary source.

What the developer does say: version 1.8.0 added a vertex displacement mapping effect that "controls the height of fur", so some parts of the torus have very short fur [5]. Version 1.9.0 (25 Feb 2011) added a dynamic background and a mode with two interlaced furry tori and a moving camera [6]. The 1.6.0 post (7 Jan 2009) added a post-processing pass whose shader loads from `post-processing-fx.xml` so users could write their own effect in GLSL [7].

## 2. What are the presets and burn-in modes, and how is the score calculated?

**Presets.** Version 1.9.0 introduced two presets that can submit online scores: Preset:1080 (1920x1080 fullscreen, no AA, post FX off, dynamic background, burn-in on) and Preset:720 (1280x720, same settings) [6]. Version 1.16.0 (the changelog dates it 2014-06-25; the post is 26 June 2015) added P1440 (QHD) and P2160 (4K/UHD) presets, with Top-20 tables for 1080, 1440 and 2160 [8].

**Modes.** The command-line reference from November 2008 already documents a "run_mode": 1 for benchmark and 2 for stability test, a default benchmark length of 60,000 ms (`/max_time`), a frame cap (`/max_frames`) and `/xtreme_burning`, "a mode that overburns the GPU" [9]. So Xtreme burn-in predates 1.9.0 by more than two years. (I had said earlier that 1.9.0 introduced it; the 2008 reference shows that is wrong.)

**The score.** The developer gives paired numbers: a GTX 480 scored 6478 points (108 FPS) in FurMark 1.8.2 at 1080p, and 1769 points (29 FPS) in 1.9.0 [6]. Dividing, 6478 / 108 = 60.0 and 1769 / 29 = 61.0, matching the 60-second default run. So the score is, to rounding, the number of frames rendered during the 60-second benchmark, i.e. average FPS x 60. That is my inference from the developer's own figures, not a stated formula; no document I found spells it out. It also explains why 1.9.0 scores are far lower than 1.8.2 scores: the heavier workload cut FPS by about 3.7x [6].

## 3. What is GeeXLab, and how did it shape FurMark 2?

GeeXLab is Geeks3D's cross-platform scripting tool for 3D programming, demos and creative coding, with Lua and Python as main languages and GLSL for OpenGL and Vulkan [10]. Its lineage is documented by JeGX himself in December 2015: the first public GeeXLab appeared "around 6 years" earlier (so about 2009); GLSL Hacker, "a heavily revamped version", had its first public version in January 2013; and in December 2015 GLSL Hacker was renamed back to GeeXLab when Direct3D 12 support arrived [11]. The current release in my sources is 0.67.0 (5 October 2026), for Windows and Linux on x86-64 and arm64 [10].

FurMark 2 is built on it. The 24 Feb 2024 release post says FurMark 2 is built with GeeXLab: the GUI is a pure GeeXLab application and the `furmark` command-line tool is built with the GeeXLab SDK, which is why it is cross-platform [12]. The changelog repeatedly lists "updated with GeeXLab" library versions (for example 0.49.3 in FurMark 2.0.4.0 and 0.60.x in 2.3.0.0) [13]. The exact first-release date of the original GeeXLab is "about 2009" by the author's own estimate; I found no dated release post.

## 4. Has FurMark verifiably damaged a graphics card?

I found no controlled test, teardown or RMA confirmation proving FurMark alone killed a card. What exists:

- **A documented hardware weakness.** Geeks3D's own 2009 post says the Radeon HD 4850/4870 VRM was undersized for FurMark/OCCT loads, which is why AMD added driver protection [14]. That is the developer admitting the risk was real for that generation.
- **A vendor-acknowledged risk for other parts.** A review quoted by Geeks3D said that, at an end-user level, FurMark and OCCT "really can be dangerous" because they can draw too much power from the PSU, even though cards can no longer be toasted by them [15].
- **Forum anecdotes, not proof.** HardForum and Overclock.net threads describe dead HD 4870-class cards after FurMark; the same threads include replies attributing the failures to overclocking, poor cooling, or a card that was already failing [16].

Conclusion: plausible on old, undersized VRMs, not demonstrated as a verified cause. Practical third-party guides recommend conservative run lengths and temperature monitoring [17]; I did not establish a specific run-length recommendation directly from the developer.

## 5. Do modern GPUs still detect or limit FurMark?

Power limiting is now routine, but whether drivers still detect FurMark by name is not established.

- **Hardware and BIOS limits are real.** Tom's Hardware measured the RX 7900 XTX at 366 W in FurMark at 1440p and wrote that "AMD's new cards throttle more than just about any other GPU we've tested recently", calling FurMark an atypical worst-case load [18].
- **Name detection.** In 2009 the developer shipped a copy of FurMark renamed `etqw.exe` (Enemy Territory: Quake Wars) specifically to get game profiles and to bypass "the FurMark detection included in the Catalyst graphics driver" [7]. That is first-party confirmation of the early check, and of the rename trick, from FurMark's own author.
- **Today.** Forum posts disagree: one says Nvidia detects FurMark, a reply says it does not and that the lower state comes from a power-limit "perf cap" reason; another says the card BIOS does the throttling [19]. I found no Nvidia or AMD document stating that a current driver detects FurMark. Not confirmed.
- **An RTX 4090 anecdote:** a Linus Tech Tips post reports FurMark staying near 67% of TDP, while a reply says a power virus should still push over 400 W [19]. Treat as anecdote.

## 6. What did FurMark 1.9.0 and the Xtreme burning mode change?

1.9.0 (25 February 2011, per KitGuru quoting JeGX) kept FurMark an OpenGL 2.0 stress test covering GeForce 6 to GTX 500, Radeon HD 2000 to HD 6000 and Intel HD 2000/3000. It made the workload heavier to track recent cards (GTX 480: 6478 points at 108 FPS in 1.8.2, 1769 points at 29 FPS in 1.9.0), added a dynamic background (optional), a two-torus mode, and the two online-score presets [6]. The timing matters: it arrived weeks after the January 2011 limiter debate [20].

Xtreme burning is older (see Q2). The overclockers.com thread title for 1.9.0 is "The Return of the Furry Donut" [21]. A forum poster in my sources says a good FPS without Xtreme burn-in is around 30, and around 15 with it, depending on the card. That is one user, not a developer figure [22].

## 7. Who is JeGX, and what else did Geeks3D and oZone3D build?

A 2012 article says GPU Caps Viewer is developed by Jérôme "JeGX" Guinot, based in Switzerland, who calls himself an "OpenGL developer and GPU torturer"; it also says he owns Geeks3D and founded oZone3D.Net, and lists his creations as GeeXLab, FurMark, TessMark, FluidMark, ShaderToyMark, GPU Shark, GLinspector, EVGA OC Scanner and MSI Kombustor [23]. That is secondary; I found no formal biography or interview.

Primary traces: JeGX's 2007 post on oZone3D announces GPU Caps Viewer, describing a "GPU-Burner" that opens many 3D windows, each rendering a GLSL toon-shaded object (the forerunner of FurMark-style burning) [24]. A 2008 release note credits the GPU burner to the FurMark engine [25]. He is still updating GPU Caps Viewer: version 1.64 appeared in March 2025 and he wrote there is no 2.0 planned but he will "try to update GPU Caps Viewer 1.64.x as long as I can" [25]. GPU Shark 2.11 appeared in the recent-posts list of Geeks3D in November 2026 [26].

## 8. How does FurMark behave on Raspberry Pi and Arm?

FurMark 2.3 (6 May 2024) added Raspberry Pi OS 64-bit (arm64/aarch64) support. JeGX wrote that on a Raspberry Pi 4 it runs at 1 FPS at 1024x640, and on the "a lot faster" Raspberry Pi 5 it reaches 4 FPS at that resolution. He disabled the preset benchmarks because the score-submission interface is not usable at those frame rates, and said he removed Raspberry Pi dependencies, hoping it works on other arm64 platforms [26]. Later changelog entries monitor the Pi 5 GPU and fix the donut's colour in Vulkan on arm64 "visible on raspberry pi 5" [13]. A Geeks3D forum thread reports flickering in the Vulkan arm build, which the developer attributes to rendering only the first two swapchain images [27].

Why was it added? The post gives no reason beyond cross-platform coverage; it follows from the GeeXLab engine already running on Raspberry Pi OS (GeeXLab 0.59 was released for Raspberry Pi OS) [26]. The reason is inferred, not stated. I could not find Pi GPU temperature results.

## 9. How does FurMark compare with other stress tools?

No independent lab comparison turned up; the guides I found are secondary, SEO-heavy and not consistent on numbers. Several guides *characterise* FurMark as an atypically intense thermal/power workload, OCCT as useful for error detection, and looped game-like benchmarks such as Heaven or Time Spy as complementary stability checks [28]. Those descriptions do not establish a universal temperature or wattage ranking against every OCCT mode on every GPU. Tom's Hardware's choice is instructive: it measures real-world power with a looped game (Metro Exodus) and a FurMark run as a deliberate worst-case bracket [18].

The developer's own positioning is consistent: FurMark 2 is "a very intensive GPU stress test" and "also a graphics benchmark" [29]. Specific heat and wattage comparisons would need a controlled test on one card; I did not find one and did not run one.

## 10. What do the online scores and comparative tables show?

Geeks3D keeps a comparative score table (pages for 1920x1080, 1280x720, 1280x1024 and 3840x2160) with update entries as recent as 18 Nov 2022 for the RTX 4090 and Intel Arc A750/A380 [30]. For FurMark 2, Geeks3D publishes charts per preset and API (OpenGL and Vulkan): each GPU's score is the mean of all submitted scores with some outliers removed, only scores from FurMark 2.0.8 or later are used, GPUs with fewer than five unique scores get a grey bar, and the charts were last updated 10 November 2026 against a database version of 9 November 2026 [31]. There is also a 3440x1440 chart updated the same day [26].

How large the database is: I found no total submission count. Not confirmed. One third-party listing suggests an RTX 4090 result of 37,387 points (623 FPS) and an RX 6800 XT result of 18,035 points (301 FPS); both fit the roughly 60 points per FPS I derived in Q2, but that comes from a third-party score site and not Geeks3D [32].

## Sources

1. Third-party description of FurMark's multipass rendering (100 passes, GLSL vertex and pixel shaders, two dynamic lights), via search results; TechPowerUp forum, "FurMark-OpenGL benchmark now available". https://www.techpowerup.com/forums/threads/furmark-opengl-benchmark-now-available.54248/
2. Geeks3D, "FurMark 1.6.0 Available NOW!", 7 Jan 2009. https://www.geeks3d.com/20090107/furmark-160-available-now/
3. xbdev.net, "Generating Fur in DirectX or OpenGL Easily" (shell texturing). https://xbdev.net/directx3dx/specialX/Fur/index.php
4. oZone3D.Net tutorials index. https://www.ozone3d.net/tutorials/
5. Geeks3D, "FurMark 1.8.0 Hot Like Hell Edition Available", 2 Feb 2010. https://www.geeks3d.com/20100202/furmark-1-8-0-hot-like-hell-edition-available/
6. KitGuru, "Furmark 1.9.0 released with even heavier GPU load", 25 Feb 2011 (quoting Geeks3D). https://www.kitguru.net/channel/generaltech/carl/furmark-1-9-0-released-with-even-heavier-gpu-load/
7. Geeks3D, "FurMark 1.6.0 Available NOW!" (etqw.exe note, post-processing). https://www.geeks3d.com/20090107/furmark-160-available-now/
8. Geeks3D, "FurMark 1.16.0 Released, 4K (P2160) Preset Added", 26 Jun 2015. https://www.geeks3d.com/20150626/furmark-1-16-0-download-gpu-stress-test-opengl-benchmark/
9. Geeks3D, "Geeks3D HowTo: Know FurMark's Command Line Parameters", 23 Nov 2008. https://www.geeks3d.com/20081123/geeks3d-howto-know-furmarks-command-line-parameters/
10. Geeks3D, "GeeXLab 0.67 Prototyping Engine Released", 5 Oct 2026, and GeeXLab download page. https://www.geeks3d.com/hacklab/20261005/geexlab-0-67-released/
11. Geeks3D, "Say Goodbye to GLSL Hacker and Welcome Back GeeXLab", 3 Dec 2015. https://www.geeks3d.com/hacklab/20151203/goodbye-glsl-hacker-welcome-back-geexlab
12. Geeks3D, "FurMark 2.1.0 Released", 24 Feb 2024. https://www.geeks3d.com/20240224/furmark-2-1-0-released/
13. FurMark changelog. https://glslhacker.geeks3d.com/furmark/changelog
14. Geeks3D, "ATI Cypress (Radeon HD 5870) Cards Have Hardware Protection...", 25 Sep 2009. https://www.geeks3d.com/20090925/ati-cypress-radeon-hd-5870-cards-have-hardware-protection-against-power-virus-like-furmark-and-occt/
15. Geeks3D, "NVIDIA GeForce GTX 580: The Anti-FurMark DX11 Card", 9 Nov 2010. https://www.geeks3d.com/20101109/nvidia-geforce-gtx-580-the-anti-furmark-dx11-card/
16. HardForum, "Did Furmark kill my 4870x2?" https://hardforum.com/threads/did-furmark-kill-my-4870x2.1431399/ ; Overclock.net, "Can FurMark kill your GPU? Actually, yes..." https://www.overclock.net/threads/can-furmark-kill-your-gpu-actually-yes.1360263/ ; HardForum, "Did I kill my graphics card?" https://hardforum.com/threads/did-i-kill-my-graphics-card.1736116/ (all anecdotal)
17. Guides recommending short runs, e.g. Windows 10 Forums, "FurMark - GPU Stress Test". https://www.tenforums.com/tutorials/13081-furmark-gpu-stress-test.html
18. Tom's Hardware, "AMD Radeon RX 7900 XTX and XT Review", page 8 (power). https://www.tomshardware.com/reviews/amd-radeon-rx-7900-xtx-and-xt-review-shooting-for-the-top/8
19. Forum threads: Tom's Hardware, "Furmark burnin not pushing GPU clock speeds" https://forums.tomshardware.com/threads/furmark-burnin-not-pushing-gpu-clock-speeds.2726431/ ; Linus Tech Tips, "4090 Power Draw Question" https://linustechtips.com/topic/1592748-4090-power-draw-question/ ; TechPowerUp comments under "FurMark 2.0 Launching This Month" https://www.techpowerup.com/313786/furmark-2-0-launching-this-month (anecdotal)
20. Geeks3D, "Are you Ok with Power Limiter...", 27 Jan 2011. https://www.geeks3d.com/20110127/are-you-ok-with-power-limiter-gpu-throttling-on-recent-graphics-cards/
21. Overclockers.com forum, "FurMark 1.9.0: The Return of the Furry Donut". https://www.overclockers.com/forums/threads/furmark-1-9-0-the-return-of-the-furry-donut.670211/ (title only; page blocked)
22. SimHQ forum, "New Furmark GPU test" (via search summary; anecdotal). https://simhq.net/forum/ubbthreads.php/topics/3221204/New_Furmark_GPU_test.html
23. web3.lu, "May 2012" (profile of JeGX; secondary). https://www.web3.lu/2012/05/
24. oZone3D blog, "GPU Caps Viewer" quick review, 21 Feb 2007. https://www.ozone3d.net/blogs/lab/20070221/gpu-caps-viewer/
25. Geeks3D, "GPU Caps Viewer 1.64 Released", 13 Mar 2025 (and comments), and "GPU Caps Viewer 1.5.0", 24 Jul 2008. https://geeks3d.com/20250313/gpu-caps-viewer-1-64-released/
26. Geeks3D, "FurMark 2.3 Released", 6 May 2024; Geeks3D recent-posts list, November 2026. https://www.geeks3d.com/20240506/furmark-2-3-released/
27. Geeks3D forum, "The Vulkan ARM version of Furmark2 has flickering issue". https://www.geeks3d.com/forums/index.php?topic=8101.0
28. Guides compared (secondary): AIHardware.ai, "How to Stress Test Your GPU" https://aihardware.ai/how-to-stress-test-your-gpu/ ; WindowsForum, "6 GPU Stress Test Tools for Windows" https://windowsforum.com/news/6-gpu-stress-test-tools-for-windows-check-stability-temperatures-and-overclocks.451100/
29. Geeks3D, FurMark home page. https://geeks3d.com/furmark/
30. Geeks3D, "FurMark Scores, Comparative Charts (v1.9, 1.10, 1.13, 1.14)". https://www.geeks3d.com/20120413/furmark-opengl-benchmark-scores-comparative-charts/
31. Geeks3D, "FurMark 2 Benchmark Charts for Preset 1920x1080 Scores", updated 10 Nov 2026. https://geeks3d.com/20250113/furmark-2-benchmark-charts-for-p1080-scores/
32. GPUScore / third-party FurMark scores (via search summary). https://gpuscore.top/furmark/
