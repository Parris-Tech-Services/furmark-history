# FurMark: a history

*Compiled 13 November 2026 from the developer's own posts and release notes, plus independent coverage. Every claim below has a source number in brackets; the list is at the end. Where the evidence is thin, it says so.*

## The short version

FurMark is a free graphics-card stress test and benchmark. Its signature scene is a rotating, fur-covered torus (the "donut") drawn with OpenGL shaders. The developer says FurMark's first version appeared in **2007** [1]. His contemporary post of 26 August 2007 says the original *fur-rendering benchmark* was officially released four days earlier, placing its debut at **approximately 22 August 2007** [18]. The day is inferred from his own wording, not independently confirmed from a dated binary. It was written to push a GPU as hard as possible, mainly so overclockers could check stability [2]. That very quality made driver teams treat it as a "power virus" and throttle cards when it ran [3][4]. FurMark 2, rebuilt on the author's GeeXLab engine, began beta testing on 1 December 2022 [7] and was released publicly in February 2024 [6]. The most recent changelog entry I found is version 2.11.0.4, dated 30 October 2026 [7].

## Who made it

FurMark is the work of a developer who goes by **JeGX** (listed as Jérôme Guinot on his early site oZone3D.net, where he wrote OpenGL tutorials) and who later ran **Geeks3D** [1][15]. Geeks3D hosts the official downloads and warns that other sites claiming to be the official page are not [1].

## What it actually does

A scene of a furry torus plus a dynamic background (a red/orange background appears in the changelog [7]), rendered in OpenGL, repeating heavy shader maths each frame. It reports an FPS-style score and can read data from GPU-Z when that tool is running [2]. In FurMark 2 the "classic donut" is joined by a "new knot" scene [6]. Beginner guides describe it as a stress test rather than a benchmark, much harsher than any game [16]. I could not confirm, from a primary source, the exact fur-rendering technique, so this document does not claim one.

## Timeline

| Date | What happened | Source |
|---|---|---|
| c. 22 Aug 2007 | JeGX publicly releases the fur-rendering benchmark, the origin of FurMark; inferred from his 26 Aug statement that it launched four days earlier | [18][1] |
| 26 Aug 2007 | JeGX reports early user stress-test observations, including high temperatures and a PSU shutdown anecdote; these are observations, not controlled failure-attribution tests | [18] |
| Aug 2008 (approx.) | Catalyst 8.8 adds an AMD protection keyed on the file name `FurMark.exe`, per Geeks3D | [3] |
| Aug 2009 (approx.) | Catalyst 9.8 improves detection by measuring the ratio of texture to ALU instructions, per Geeks3D | [3] |
| 25 Sep 2009 | Geeks3D reports the Radeon HD 5870 (Cypress) has a hardware monitoring chip that throttles one PowerPlay level when the voltage regulators are overloaded | [3] |
| 2 Feb 2010 | FurMark 1.8.0 "Hot Like Hell Edition": heat post-effect, vertex-displacement mode for more load, XML localization; scores lower than earlier versions | [2] |
| 19 Apr 2010 | FurMark 1.8.2 | [2] |
| 9 Nov 2010 | GeForce GTX 580 launches with power sensors plus driver detection of FurMark/OCCT; Geeks3D headline: "The Anti-FurMark DX11 Card". TechPowerUp measured 153 W with the limiter, 304 W without | [4] |
| 27 Jan 2011 | JeGX comments on a TechPowerUp poll about limiters; objects to Nvidia's being an application blacklist; notes AMD PowerTune is adjustable by about 20% | [5] |
| Mar 2011 | MSI support page describes Kombustor as co-developed by MSI and the FurMark team | [9] |
| Jun 2011 | FurMark 1.8.5 and 1.9.1 (maintenance, newer card support, improved score submission) | [10] |
| Jun 2011 | FurMark used to stress an ASUS ROG GTX 580 at DreamHack, per an oZone3D blog post | [15] |
| 21 Aug 2015 | FurMark 1.17.0 | [7] |
| 24 Aug 2016 | FurMark 1.18.0: GTX 1080/1070/1060 and RX 480/470/460 support, 5K resolution | [7] |
| 1 Dec 2022 | FurMark 2.0.0.0, first beta, via the Geeks3D Discord | [7] |
| 9 Jan 2023 | 2.0.4.0 adds Linux support | [7] |
| 19 Sep 2023 | Press reports FurMark 2 is "launching this month" | [11] |
| 15–24 Feb 2024 | FurMark 2.1.0.2 (changelog 15 Feb; release post 24 Feb): Windows 32/64-bit, Linux 64-bit, OpenGL 3.2 and Vulkan 1.1, GUI plus command-line tool, online scores | [6][7][12] |
| 3 May 2024 | 2.3.0.0 adds Raspberry Pi 64-bit | [7] |
| 26 Dec 2024 | 2.5.0.0 adds Intel Arc B580/B570 | [7] |
| 2025 | Releases track RTX 50-series and Radeon RX 9070 launches | [7] |
| 13 Mar 2025 | FurMark 1.39.4: JeGX writes that branch 1.39.x is "probably the last", with only patches until a final stop ("2026?") | [1] |
| 30 Oct 2026 | 2.11.0.4: new NVIDIA Blackwell GPUs; elapsed time shown as days/hours/minutes/seconds | [7] |

## The "power virus" years

By Geeks3D's account, the power circuitry on Radeon HD 4850/4870 cards was undersized for FurMark-type loads, so AMD added software protection, first by file name, later by instruction ratio [3]. AnandTech's HD 5970 review lists FurMark and OCCT among AMD's "power virus" programs and accepts the rationale for them [14]. Forum users reported that renaming the executable defeated the early check; I found no vendor confirmation of that, so treat it as unverified [17].

For the GTX 580, TechPowerUp's testing (quoted by Geeks3D) found the limiter engaged when the driver detected FurMark or OCCT; do not treat that observation as evidence that every driver and every game behaves identically [4]. JeGX's position in 2011: limiters are acceptable if the user can fully control or disable them, and an application blacklist is not [5].

## Safety and interpretation (added in the 13 November 2026 audit)

NVIDIA's own support documentation warns that FurMark may draw significantly more power than real games and can trigger over-temperature or over-current protection. It explicitly cautions that disabling protections can permanently damage the graphics card and void its warranty [19]. Calling FurMark a "power virus" is historical industry shorthand for an unusually demanding *legitimate stress test*, not a claim that it is malicious software. A throttled FurMark result does **not**, by itself, establish a defective GPU. For repeatable comparisons, record FurMark version, rendering API, scene, preset, resolution, duration and cooling conditions; see [benchmark interpretation](BENCHMARK_PRACTICE.md).

## Things I could not verify

- The **exact fur-rendering technique** (no primary source found).
- Whether renaming the executable really bypassed AMD's early check (forum reports only).
- The **independently archived first-release binary date**: JeGX's 26 August 2007 post places his original fur-rendering benchmark's launch approximately four days earlier (22 August), but no release-binary timestamp has been independently authenticated [18].
- A press article stating the original FurMark "used DirectX": this contradicts every other source (OpenGL) and is not used here.

## Sources

1. Geeks3D, "FurMark 1.39.4 GPU Stress Test Utility Released", 13 Mar 2025. https://geeks3d.com/20250313/furmark-1-39-gpu-stress-test-utility/
2. Geeks3D, "FurMark 1.8.0 Hot Like Hell Edition Available", 2 Feb 2010. https://www.geeks3d.com/20100202/furmark-1-8-0-hot-like-hell-edition-available/
3. Geeks3D, "ATI Cypress (Radeon HD 5870) Cards Have Hardware Protection Against Power Virus Like FurMark and OCCT", 25 Sep 2009. https://www.geeks3d.com/20090925/ati-cypress-radeon-hd-5870-cards-have-hardware-protection-against-power-virus-like-furmark-and-occt/
4. Geeks3D, "NVIDIA GeForce GTX 580: The Anti-FurMark DX11 Card", 9 Nov 2010 (quotes TechPowerUp). https://www.geeks3d.com/20101109/nvidia-geforce-gtx-580-the-anti-furmark-dx11-card/
5. Geeks3D, "Are you Ok with Power Limiter (GPU throttling) On Recent Graphics Cards?", 27 Jan 2011. https://www.geeks3d.com/20110127/are-you-ok-with-power-limiter-gpu-throttling-on-recent-graphics-cards/
6. Geeks3D, "FurMark 2.1.0 Released", 24 Feb 2024. https://www.geeks3d.com/20240224/furmark-2-1-0-released/
7. FurMark changelog (FurMark 1 and 2 version history). https://glslhacker.geeks3d.com/furmark/changelog
8. MSI Kombustor page at Geeks3D. https://glslhacker.geeks3d.com/furmark/kombustor
9. MSI, "MSI Afterburner and MSI Kombustor" FAQ. https://forum-en.msi.com/faq/article/msi-afterburner-and-msi-kombustor
10. TechPowerUp, "FurMark updated to versions 1.8.5 and 1.9.1", 29 Jun 2011. https://techpowerup.com/148191/furmark-updated-to-versions-1-8-5-and-1-9-1
11. TechPowerUp, "FurMark 2.0 launching this month", 19 Sep 2023. https://techpowerup.com/313786/furmark-2-0-launching-this-month
12. TechPowerUp, "FurMark 2.1 gets public release", 27 Feb 2024. https://techpowerup.com/319672/furmark-2-1-gets-public-release
13. Tom's Hardware, "New FurMark Version 2.0 Arrives After 16 Years". https://www.tomshardware.com/news/furmark-to-hit-version-20-after-16-years
14. AnandTech, Radeon HD 5970 review. https://anandtech.com/print/3590
15. oZone3D blog, "FurMark at DreamHack 2011". http://www.ozone3d.net/blogs/lab/downloads/gpu-tools/furmark/
16. Beginner guides that describe it as a stress test rather than a benchmark: Corsair, "How to use FurMark"; Make Tech Easier, "How to Stress Test Your GPU with FurMark". https://www.corsair.com/explorer/gamer/gaming-pcs/how-to-use-furmark
17. Forum reports on early AMD throttling and a renamed executable (anecdotal, unverified): Guru3D thread "radeon hd 4870 overheating". http://forums.guru3d.com/showthread.php?t=360883

18. JeGX, *Fur Rendering Benchmark*, oZone3D, 26 Aug 2007 (contemporary first-person note: released four days earlier). https://www.ozone3d.net/blogs/lab/20070826/fur-rendering-benchmark/
19. NVIDIA Support, *Using FurMark and other Stress Tests with GeForce graphics cards*, updated 29 Sep 2021. https://nvidia.custhelp.com/app/answers/detail/a_id/2603/kw/overheat
20. oZone3D, contemporary GPU benchmark listings (FurMark's original OpenGL fur rendering description). https://www.ozone3d.net/index_gpu_benchmark.php
