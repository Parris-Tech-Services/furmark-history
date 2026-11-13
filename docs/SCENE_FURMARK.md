# FurMark: ten questions about the furry doughnut and its visual story

*Research: 13 November 2026. Companion to the [30 new scene questions](SCENE_STORY_QUESTIONS.md), [historical timeline](HISTORY.md) and [technical questions](QA_FURMARK.md). This asks a different question from 'is it an effective stress test?': why this particular **thing** on the screen?*

**Evidence convention:** **Confirmed** = explicitly documented; **interpretation** = plausible artistic/technical reasoning, not attributed to JeGX; **unknown** = no source establishes it. 'Donut' describes the shape, not edible food; a **torus** is the technical name of the ring-shaped geometric surface.

## 1. Why fur, rather than explosions, fire or a game level?

**Confirmed:** FurMark began as a *fur-rendering* benchmark. On 26 August 2007 creator **JeGX** wrote that he had released it four days earlier and highlighted how little the measured performance depended on CPU speed, and how much it loaded GPUs [F1]. Its name openly combines 'fur' and 'mark' (a benchmark mark). Later descriptions explain that its synthetic fur algorithm deliberately applies an unusually intensive graphics workload [F2][F3].

**What makes fur an attractive technical showcase?** A furry surface is not simply a flat material: it has thousands of visible tips or layers, translucency, directional shading and silhouette complexity. Classic real-time approaches can require repeated geometry draws, texture lookups and alpha blending. NVIDIA's February 2007 developer white paper explains the *general* graphics challenge and the shells-and-fins family of solutions [F4]. This explains how fur **could** make a stress-test subject, but does **not** independently prove every internal technique used by FurMark.

**Why this exact creative choice? Unknown.** I found no JeGX interview saying 'I chose fur instead of fire because …'. The documented goal was GPU-dominant stress, not an action scene; claiming a personal inspiration would be invention. Some versions later added fire-like visual effects, but fur remained the named workload.

## 2. Why a torus/doughnut rather than a furry animal—and did furry doughnuts already exist?

**Confirmed:** The main object is a hair-covered **torus**, an endlessly continuous ring. A torus is a conventional procedural graphics test object because its curved inside, outside and silhouette show effects from many angles without requiring an animated character rig. That is a *technical interpretation*, not a direct quote from JeGX.

Importantly, FurMark did **not** invent the idea of the **furry doughnut**. A Stanford computer-graphics project from **2001** contains an explicitly labelled 'Furry Donut' example made with fur shaders [F5]. Earlier fur-rendering research also used torus-shaped models. This is evidence of a pre-existing **graphics-demo motif**, **not** proof JeGX saw or borrowed that particular project. The answer to 'which illustration or artist directly inspired JeGX?' is **not established**.

The ring makes the image striking and readable. Its memorable absurdity—the contrast between a fluffy toy-like shape and a stressed graphics card—is an interpretation of how its iconography works, rather than official lore.

## 3. What did the earliest doughnut look like, and how has it changed?

**Confirmed historical arc:** The August 2007 report already presented this as a fur demo, with contemporary screenshot(s) and 8800 GTX temperature measurements [F1]. A **2 December 2008** illustrated contemporary article shows the familiar ring as the benchmark's visual centre, well before FurMark 2 [F6]. Early FurMark was fundamentally an OpenGL 2-era repeating fur scene.

Later releases changed more than hardware support. FurMark 1.8.0 (February 2010) introduced a post-process heat effect and displacement controlling fur height [F7]. FurMark 1.9.0 (February 2011) introduced an animated background, camera movement and a mode with **two interlaced furry tori** [F8]. FurMark 2 (public in February 2024) retained the iconic **donut** and added the **knot** scene [F9]. The continuity of the central fur-covered shape is documented, though exact colours and decorations vary by release, API, settings and screenshots.

Do not treat an image of today's FurMark 2 as a perfect reconstruction of the 2007 scene.

## 4. Are those hairs actual polygons or a shader trick?

**Partially established.** Independent technical descriptions of classic FurMark refer to many shader passes and layered fur, sometimes characterised as roughly a hundred passes [F10]. There is **not** a publicly audited primary-source FurMark shader breakdown here proving that exact pass count, the shape of every strand or the implementation in **FurMark 2**. The previous technical Q&A makes that limitation explicit [F11].

In the general *shells and fins* approach, a base shape is repeatedly drawn with increasingly displaced, partly transparent layers, sometimes augmented by fins at its outer edge; blending produces the impression of countless hairs without simulating every strand independently [F4]. Other graphics research used volumetric textures to avoid individually modelling hair [F5]. **Explanation of the method is not proof of FurMark's proprietary shader.**

What JeGX definitely documented was changing fur length by vertex displacement in 1.8.0 [F7]. Saying 'the doughnut contains millions of physically simulated individual hairs' would be unjustified.

## 5. Why does it just rotate, instead of moving through a fictional world?

**Confirmed:** The original benchmark's purpose was repeatable, GPU-centred workload and temperature testing, not a playable environment [F1][F3]. The looping torus offers a largely consistent object and camera workload; FurMark can keep rendering until the chosen duration or stability test ends.

**Interpretation:** Rotation reveals lighting and the interior of the furred ring while continuously exercising the GPU without random gameplay, camera controls, scripted NPCs or CPU-heavy world simulation. Constant movement can also make flickering, aliasing and texture issues more visible. These are sensible design consequences but no source located states them as JeGX's artistic rationale.

FurMark's 'story' is therefore mainly a **performance test happening to the machine**, not a drama happening to the object.

## 6. Why is it orange, fiery and set against checkerboards, dragons or flames?

**Confirmed:** Screenshots and versions are not identical. A 2011 release description from JeGX explicitly mentions replacing a static background with an **optional dynamic background** and says those who wanted to keep their 'favourite dragon' could disable it [F8]. FurMark 1.8.0 had already added a **heat-shimmer post-effect** [F7]. The checkerboard and fiery backgrounds visible in different screenshots are graphic presentation, not evidence of a dragon character or a fictional volcanic location. More recent FurMark 2 presentations use an animated background; the appearance depends on test settings [F2][F9].

**Interpretation:** Hot orange/red colours visually reinforce the intense thermal test, and a patterned background supplies contrast and motion. There is no identified designer statement establishing the original colour palette's symbolism. We should not attribute every screenshot's orange tint to a precise rendering mode without identifying that version.

## 7. How did this almost silly object become the 'power virus'?

That contrast *is* the unusual history. JeGX's 2007 note described a test that could overwhelm a GPU and quoted reports of exceptionally high temperatures and a PSU shutdown [F1]. By August 2008, independent reviewers reported AMD Catalyst driver behaviour that slowed FurMark under its original executable name, with different figures after renaming [F12]. Later GPU vendors added and described protective throttling, rather than treating the graphical scene as a typical game [F13].

NVIDIA explicitly warned in support documentation that FurMark aims to maximise power draw well beyond real-world applications and that **disabling protection mechanisms can permanently damage hardware** [F13]. FurMark's fluffy appearance is not a safety indicator. The 'power virus' label refers to sustained workload/power behaviour; FurMark is not thereby being alleged to be malicious computer malware.

## 8. What do the two interlaced tori and FurMark 2 'knot' represent?

**Confirmed:** JeGX's 1.9.0 notes introduced an optional two-torus scene with a moving camera [F8]. FurMark 2 adds the separate **knot** test alongside the familiar doughnut, with score results that should be compared within the **same test** rather than against donut scores [F9][F14].

**Interpretation:** Both increase visual/geometric complexity while preserving FurMark's recognisably abstract 'strange fuzzy object' identity. Torus knots are also a familiar procedural modelling subject, just as a single torus is. No source reviewed establishes a canonical story in which two doughnuts collide, the knot is a monster, or the shapes have a personality. These are *alternative workloads and demo shapes*, not known named characters.

## 9. What was the artistic point of 'Hot Like Hell' and its uneven fur?

JeGX released FurMark **1.8.0 'Hot Like Hell Edition'** on 2 February 2010 [F7]. Two striking additions were a **heat post-effect** and **vertex displacement** that allowed the fur height to change across the object (some parts could have much shorter fur). Those effects deliberately change the *appearance* of the object and the amount/type of shader work.

**Confirmed purpose:** The official release phrasing celebrated a hotter/heavier workload. **Interpretation:** Uneven tufts make the synthetic ring less like a uniform carpet and more like something tactile or scorched; heat haze turns a diagnostic image into a comic visual metaphor for GPU heat. There is no developer statement saying the torus itself is literally burning in a story.

It also marks a useful cultural difference from modern cinematic benchmarks: FurMark's visual polish serves its stress-test identity rather than trying to simulate a believable world.

## 10. Is there hidden lore behind the doughnut, and why is it still iconic?

**No verifiable fictional canon was found.** No named protagonist, dialogue, location, motivation or ending appears in JeGX's release material reviewed here. The 'furry donut' is a distinctive benchmark object, not an edible object in a fictional story. Its enduring appeal is an *interpretation*: absurd visual simplicity, immediate recognisability, history with overclockers, and real effects on GPU thermals.

JeGX's 2007 writing places the purpose in the context of testing Radeon/GeForce GPUs and power supplies, not building a narrative [F1]. FurMark 2's decision to keep the classic doughnut while adding another geometry [F9] supports its status as a project identity.

**The remaining unanswered creator questions:** Why did JeGX personally choose fur? Why precisely a torus? Who picked the original palette? Was the 2001 Stanford furry doughnut known to him? A dated creator interview, original source code, contemporaneous design notes or direct developer explanation would be needed. None is asserted here.

## Sources

- **[F1] Primary, JeGX (26 August 2007).** 'Fur Rendering Benchmark', original first-feedback post. https://www.ozone3d.net/blogs/lab/tag/gpu/ (entry dated 26 Aug; states release four days earlier).
- **[F2] Primary software description, Geeks3D.** FurMark project homepage. https://geeks3d.com/furmark/
- **[F3] Contemporary first-hand account, Geeks3D mirror.** FurMark's purpose, burn-in and 1.9.0 highlights. https://marginicidal20.rssing.com/chan-11056000/all_p1.html (archived third-party mirror: verify any quote against origin when available).
- **[F4] NVIDIA Developer (20 February 2007).** *Fur Shells and Fins*, technical white paper describing generic real-time fur rendering. https://developer.download.nvidia.com/SDK/10/direct3d/Source/Fur/doc/FurShellsAndFins.pdf
- **[F5] Stanford computer graphics project (2001).** *CS 348B Fur*, includes a labelled 'Furry Donut'. https://www.graphics.stanford.edu/courses/cs348b-competition/cs348b-01/fur/
- **[F6] GIGAZINE (2 December 2008).** Screenshots of FurMark. https://www.gigazine.net/gsc_news/en/20081202_furmark/
- **[F7] Primary, Geeks3D (2 February 2010).** *FurMark 1.8.0 Hot Like Hell Edition Available*. https://www.geeks3d.com/20100202/furmark-1-8-0-hot-like-hell-edition-available/
- **[F8] JeGX, reprinted in KitGuru (25 February 2011).** *FurMark 1.9.0 released with even heavier GPU load*, including author's notes about background, dragon, two tori. https://www.kitguru.net/channel/generaltech/carl/furmark-1-9-0-released-with-even-heavier-gpu-load/
- **[F9] TechPowerUp (27 February 2024).** FurMark 2 launch and JeGX's commentary; see also project changelog. https://www.techpowerup.com/319672/furmark-2-1-gets-public-release
- **[F10] TechPowerUp forums.** Contemporary account of FurMark's multipass fur; treat as secondary/partly unverified. https://www.techpowerup.com/forums/threads/furmark-opengl-benchmark-now-available.54248/
- **[F11] This project's earlier research.** [FurMark technical Q&A](QA_FURMARK.md), especially question 1's uncertainty about the exact shader.
- **[F12] DVHardware (29 August 2008).** *ATI makes FurMark run slower* quoting experimental renaming results. https://www.dvhardware.net/news/29503/ati-makes-furmark-run-slower
- **[F13] NVIDIA Support (2021).** *Using FurMark and other Stress Tests with GeForce graphics cards*. https://nvidia.custhelp.com/app/answers/detail/a_id/2603/
- **[F14] OC3D (26 February 2024).** FurMark 2: donut and knot workloads. https://overclock3d.net/news/software/furmark-2-is-now-available-to-download-cross-platform-benchmarking-and-stress-testing/
