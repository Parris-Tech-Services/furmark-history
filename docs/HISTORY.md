# FurMark: a history

*Compiled 13 November 2026 from the developer's own posts and release notes, plus independent coverage. Every claim below has a source number in brackets; the list is at the end. Where the evidence is thin, it says so.*

## The short version

FurMark is a free graphics-card stress test and benchmark. Its signature scene is a rotating, fur-covered torus (the "donut") drawn with OpenGL shaders. The developer says the first version of FurMark 1 was released in **2007** [1]. It was written to push a GPU as hard as possible, mainly so overclockers could check stability [2]. That very quality made driver teams treat it as a "power virus" and throttle cards when it ran [3][4]. FurMark 2, rebuilt on the author's GeeXLab engine, began beta testing on 1 December 2022 [7] and was released publicly in February 2024 [6]. The most recent changelog entry I found is version 2.11.0.4, dated 30 October 2026 [7].

## Who made it

FurMark is the work of a developer who goes by **JeGX** (listed as Jérôme Guinot on his early site oZone3D.net, where he wrote OpenGL tutorials) and who later ran **Geeks3D** [1][15]. Geeks3D hosts the official downloads and warns that other sites claiming to be the official page are not [1].

## What it actually does

A scene of a furry torus plus a dynamic background (the changelog mentions a "new dynamic background (fire)" [7]), rendered in OpenGL, repeating heavy shader maths each frame. It reports an FPS-style score and can read data from GPU-Z when that tool is running [2]. In FurMark 2 the "classic donut" is joined by a "new knot" scene [6]. Beginner guides describe it as a stress test rather than a benchmark, much harsher than any game [16]. I could not confirm, from a primary source, the exact fur-rendering technique, so this document does not claim one.

## Timeline

| Date | What happened | Source |
|---|---|---|
| 2007 | First version of FurMark 1 released (developer's statement, repeated in 2024 as "more than 16 years ago") | [1][6][13] |
| Aug 2008 (approx.) | Catalyst 8.8 adds an AMD protection keyed on the file name `FurMark.exe`, per Geeks3D | [3] |
| Aug 2009 (approx.) | Catalyst 9.8 improves detection by measuring the ratio of texture to ALU instructions, per Geeks3D | [3] |
| 25 Sep 2009 | Geeks3D reports the Radeon HD 5870 (Cypress) has a hardware monitoring chip that throttles one PowerPlay level when the voltage regulators are overloaded | [3] |
| 2 Feb 2010 | FurMark 1.8.0 "Hot Like Hell Edition": heat post-effect, vertex-displacement mode for more load, XML localization; scores lower than earlier versions | [2] |
| 19 Apr 2010 | FurMark 1.8.2 | [2] |
| 9 Nov 2010 | GeForce GTX 580 launches with power sensors plus driver detection of FurMark/OCCT; Geeks3D headline: "The Anti-FurMark DX11 Card". TechPowerUp measured 153 W with the limiter, 304 W without | [4] |
| 27 Jan 2011 | JeGX comments on a TechPowerUp poll about limiters; objects to Nvidia's being an application blacklist; notes AMD PowerTune is adjustable by about 20% | [5] |
| Mar 2011 | MSI support page describes Kombustor as co-developed by MSI and the FurMark team; Geeks3D calls it MSI's burn-in tool "based on the well-known FurMark software" | [9][20] |
| Jun 2011 | FurMark 1.8.5 and 1.9.1 (maintenance, newer card support, improved score submission) | [10] |
| 12 Jun 2011 | Geeks3D's ASUS ROG Matrix GTX 580 Platinum review uses FurMark as a burn-in test; a pingback in its comments is titled "FurMark at DreamHack 2011" (I could not open that post) | [15] |
| Jan 2011 | JeGX notes ASUS left the power limiter off its GTX 560 Ti, so FurMark ran at full speed in his review | [5] |
| 21 Aug 2015 | FurMark 1.17.0 | [7] |
| 24 Aug 2016 | FurMark 1.18.0: GTX 1080/1070/1060 and RX 480/470/460 support, 5K resolution | [7] |
| 1 Dec 2022 | FurMark 2.0.0.0, first beta, via the Geeks3D Discord | [7] |
| 9 Jan 2023 | 2.0.4.0 adds Linux support | [7] |
| 18 Sep 2023 | First beta of a separate ASUS ROG Edition of FurMark 2 ("first beta for ASUS", per the ROG changelog); the Geeks3D ROG page describes it as a heavily revamped version for ASUS | [18] |
| Sep 2023 | TechPowerUp headline "FurMark 2.0 launching this month" (page not retrievable; month not re-confirmed). The public release did not follow until 2.1 | [11] |
| 15–26 Feb 2024 | FurMark 2.1.0.2 (changelog 15 Feb; release post 24 Feb; KitGuru's "leaves beta" story 26 Feb; TechPowerUp 27 Feb): Windows 32/64-bit, Linux 64-bit, OpenGL 3.2 and Vulkan 1.1, GUI plus command-line tool, online scores | [6][7][12][19] |
| 3 May 2024 | 2.3.0.0 adds Raspberry Pi 64-bit | [7] |
| 26 Dec 2024 | 2.5.0.0 adds Intel Arc B580/B570 | [7] |
| 2025 | Releases track RTX 50-series and Radeon RX 9070 launches | [7] |
| 13 Mar 2025 | Geeks3D post for FurMark 1.39 (changelog: 1.39.0.0, 12 Mar 2025): JeGX writes that branch 1.39.x is "probably the last", with only patches until a final stop ("2026?") | [1][7] |
| 1 Oct 2026 | FurMark 1.39.4.0 per the changelog (the 2025 post was later updated to link it): still shipping new-GPU support | [1][7] |
| 30 Oct 2026 | 2.11.0.4: new NVIDIA Blackwell GPUs; elapsed time shown as days/hours/minutes/seconds. The ASUS ROG Edition carries the same version number | [7][1][18] |

## The "power virus" years

By Geeks3D's account, the power circuitry on Radeon HD 4850/4870 cards was undersized for FurMark-type loads, so AMD added software protection, first by file name, later by instruction ratio [3]. AnandTech's coverage of the Radeon HD 5970 says AMD lists FurMark and OCCT as "power virus" applications: they load a card harder than AMD believes is realistic. It also notes the 5800-series cards never throttled under them [14]. A commenter objected that neither is a virus in the usual sense: "power virus" is AMD's term for the workload. Forum users reported that renaming the executable defeated the early check; I found no vendor confirmation of that, so treat it as unverified [17].

For the GTX 580, TechPowerUp's testing (quoted by Geeks3D) found the limiter engaged only when the driver detected FurMark or OCCT, not in games [4]. A review quoted in the same Geeks3D post said Nvidia's stated reason was to combat the two programs, which it called dangerous for the PSU, and suspected a PR motive too: Nvidia being "tired of seeing" review sites publish huge power numbers for non-real-world loads [4]. JeGX's position in 2011: limiters are acceptable if the user can fully control or disable them, and an application blacklist is not [5].

## Things I could not verify

- The **exact fur-rendering technique** (no primary source found).
- Whether renaming the executable really bypassed AMD's early check (forum reports only).
- The **exact first release date** in 2007 (the year is the developer's; the month is not stated in what I read).
- A press article stating the original FurMark "used DirectX": this contradicts every other source (OpenGL) and is not used here.
- What the "FurMark at DreamHack 2011" post says: only its title survives in a pingback.
- The AnandTech 5970 text: I saw its follow-up coverage through search summaries, not the full page.

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
15. Geeks3D, "(Tested and Burned) ASUS ROG Matrix GTX 580 Platinum Review", 12 Jun 2011 (its comments carry the "FurMark at DreamHack 2011" pingback). https://geeks3d.com/20110612/asus-rog-matrix-gtx-580-platinum-review-overclocking/
16. Beginner guides that describe it as a stress test rather than a benchmark: Corsair, "How to use FurMark"; Make Tech Easier, "How to Stress Test Your GPU with FurMark". https://www.corsair.com/explorer/gamer/gaming-pcs/how-to-use-furmark
17. Forum reports on early AMD throttling and a renamed executable (anecdotal, unverified): Guru3D thread "radeon hd 4870 overheating". http://forums.guru3d.com/showthread.php?t=360883
18. Geeks3D, FurMark ROG Edition page and changelog (first ASUS beta 2023.09.18). https://glslhacker.geeks3d.com/furmark/rog and https://geeks3d.com/furmark/rog/downloads
19. KitGuru, "Furmark 2 benchmark leaves beta and officially launches", 26 Feb 2024. https://www.kitguru.net/gaming/joao-silva/furmark-2-benchmark-leaves-beta-and-officially-launches/
20. Geeks3D, MSI Kombustor page: "MSI's exclusive burn-in benchmarking tool based on the well-known FurMark software." https://glslhacker.geeks3d.com/furmark/kombustor
