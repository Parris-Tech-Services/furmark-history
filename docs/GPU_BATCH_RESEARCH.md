# Deep research: the GTX 1070 benchmark batch

*13 November 2026, Australia/Sydney. Companion to the [live GPU Testing Sheet](https://docs.google.com/spreadsheets/d/1yCaJ1PXI7R5sCuZopxetPMwNWyK142i7SJOmZRwTj44/edit) linked in the repository's benchmark file. [Full per-card snapshot and link audit](../data/benchmark_snapshot_2026-11-13.csv). The source sheet was read-only. A numbered row is not independent proof of a physical card.*

## The main discoveries

- The sheet contains **100 numbered slots**, **38 marked GPU-Z recognised** (cards 1–38), **37 FurMark scores**, **35 Superposition scores**, **35 Steel Nomad scores**, and **35 cards with all three**. The 100 rows are inventory *slots*, not a confirmed stocktake of 100 cards. A prior conversation estimated 92 physical cards; that quantity still requires serial/label reconciliation.
- Every one of the **37 FurMark result URLs** was opened; **36 link to a GTX 1070 with the correct sheet score**. **Card #4's link is wrong**: the sheet says FurMark **5,103** but [the linked result](https://www.gpumagick.com/scores/3389368) belongs to a **PowerColor RX 9070 XT scoring 15,590**. That is an erroneous citation, **not proof that card #4 is an AMD GPU**.
- All **36 matched GTX 1070** public submissions share the PCI device ID **10DE:1B81** and reported subsystem **7377:0000**. PCI-SIG assigns vendor 7377 to **Shenzhen Colorful Yugong Technology and Development Co., Ltd**, rather than Gigabyte [1]. This conflicts with an earlier photographed-label identification as **Gigabyte GTX 1070 WINDFORCE OC 8G Rev. 2.0** [2]. It does **not** automatically mean counterfeit or modified cards: a firmware-reported PCI ID, a physical shroud/label and one earlier identification must be reconciled, not conflated. Exact board branding is **not yet independently verified across the batch**.
- These public FurMark runs show **50–66°C peak reported GPU temperature** and **99% peak GPU utilisation** in many results. Encouraging for a 60-second load, **not proof of VRAM health, acoustics or sustained reliability**.
- The three testing PCs have **different CPUs and NVIDIA drivers**, making a simple 'highest score = best physical GPU' ranking unreliable.

## 1. The silicon and history

NVIDIA launched the **GeForce GTX 1070 on 10 June 2016**, built on its **Pascal** architecture and the GP104 chip [3]. It originally offered previous-generation flagship-class raster performance for **US$379 partner / US$449 Founders Edition** at launch. This is historic US pricing, not its value in Australia today.

| GPU feature | Reference GTX 1070 |
|---|---|
| GPU family | NVIDIA Pascal GP104, desktop |
| CUDA cores | **1,920** |
| TMUs / ROPs | **120 / 64** |
| Fabrication | **16 nm** |
| Video memory | **8 GB GDDR5** |
| Bus / bandwidth | **256 bit / approx. 256 GB/s** |
| Reference clocks | approx. **1,506 MHz base / 1,683 MHz boost** |
| Reference board power | **150 W**; actual partner/VBIOS power limit may vary |
| Expansion bus | **PCIe 3.0 x16** |
| Supplemental power | commonly **one 8-pin** on reference-type boards; check each physical card |
| Gaming strengths in 2026 | older/lighter games at 1080p, retro gaming and compatible compute tasks |
| Gaming limitations | no dedicated RTX ray-tracing cores, Tensor cores or hardware DLSS |

NVIDIA's launch account and contemporary GPU specification lists support these characteristics [3][4][5]. The GPU was a strong **1440p** option in 2016. Ten years later, it remains useful for lower-cost machines, but modern high-fidelity games and current AI tooling can exceed its capabilities. **8 GB VRAM does not turn a Pascal GPU into a modern RTX GPU.**

### The board-model question is more complicated

An earlier physical photograph was identified as **Gigabyte GV-N1070WF2OC-8GD Rev. 2.0**. If that identification is accurate for a specific card, Gigabyte's **official specs** [2] list a WINDFORCE 2X dual-fan cooler, **6+2 power phases**, **1771/1582 MHz OC-mode boost/base**, **1746/1556 MHz gaming boost/base**, **280 x 131 x 37 mm**, **one 8-pin PCIe** and outputs **3 DisplayPort, HDMI, DVI-D**. These are model-specific, **not automatically applicable to all 36 matched public results**.

The result pages instead report **7377:0000**. The PCI-SIG member directory identifies 0x7377 as **Colorful** [1], and independent Linux hardware records resolve the *same GPU + subsystem* to Colorful [6]. Colorful sold several GTX 1070 designs with differing cooling and power connectors [7].

**Read-only reconciliation before selling as a named board:** Photograph both sides, sticker/model/revision (serial should be stored privately), GPU-Z Graphics Card screenshot with **Subvendor, memory size/type, PCI ID, BIOS Version**, port arrangement and physical power sockets. Compare against the manufacturer's exact model, not just the NVIDIA GPU name. **Do not flash firmware as an identification experiment.** A BIOS can expose a subvendor different from the exterior; without original records this discrepancy remains unresolved.

## 2. What does the real benchmark batch show?

The 13 November snapshot counts only nonblank numeric scores. These averages reflect **different testing PCs**, not a controlled matched-machine trial.

| Benchmark | Results | Mean score | Low | High |
|---|---:|---:|---:|---:|
| **FurMark2** | 37 | **5,050** | 4,819 (#15) | 5,182 (#24) |
| **UNIGINE Superposition** | 35 | **12,568** | 11,446 (#23) | 13,062 (#24) |
| **3DMark Steel Nomad** | 35 | **1,336** | 1,272 (#15) | 1,373 (#24) |

The matched FurMark submissions use **FurMark 2.11.0.4 (x64)**, **OpenGL (GL) 3.2**, **P1080 1920x1080**, and **60 seconds**. Reported peak GPU temperature across the 36 valid linked GTX 1070 results is **50–66°C**, average **57.8°C**. The numbers do not mean that the physical board's VRAM or fans were fully tested.

A typical result around **5,050 points** corresponds to about **84 rendered FPS** during the FurMark 60-second run. **Steel Nomad score = average FPS x 100**, according to UL [8]. Therefore **1,336 ≈ 13.36 FPS** in its deliberately demanding standard **native-4K synthetic scene**, not in an everyday video game. Contemporary community Steel Nomad testing includes a **GTX 1070 at about 1,350** [9], a useful order-of-magnitude sanity check rather than a controlled ranking.

**Do not mix test scales.** The sheet does **not preserve Superposition preset/API** or whether standard Steel Nomad versus Steel Nomad Light was selected. The two Steel Nomad editions and the various Superposition presets cannot be compared indiscriminately [10][11]. The listed Superposition scores appear plausible for a lighter 1080p preset, but **the exact preset is unverified from sheet cells**.

### Why the testing computers matter

Public Geeks3D pages reveal three different test CPUs:

| CPU in the public FurMark record | Number of matched results | Mean FurMark score | Mean peak reported temp |
|---|---:|---:|---:|
| **Core i5-3570 3.4 GHz** | 14 | **5,118** | **59.6°C** |
| **Pentium G3258 3.2 GHz** | 9 | **5,026** | **57.8°C** |
| **Celeron G3900 2.8 GHz** | 13 | **4,990** | **55.7°C** |

Driver **560.94** and driver **582.78** both appear in the public results. The difference between the highest and lowest group means is about **2.6%**. That does **not prove** CPU alone causes the difference: cooling, driver, VBIOS, power policy, which cards were assigned and room conditions can contribute. The Sheet's **'Which PC?'** names **Gigabyte / ASrock / Asus B250 / ?** identify **test rigs** and must **not** be interpreted as the GPU's board partner.

Some GPU Magick records report max board telemetry near **100–103% of an approximately 180 W firmware power target**, rather than the reference GTX 1070's 150 W design point. These figures are **software-estimated GPU telemetry, not wall-socket PSU measurements**. Do not assume the original Gigabyte variant or any given power-supply load from them.

## 3. Individual cards to follow up

| Card | Evidence | Next action |
|---|---|---|
| **#4** | Spreadsheet says 5,103; [linked record 3389368](https://www.gpumagick.com/scores/3389368) is **RX 9070 XT / 15,590**. | Find the actual GTX 1070 link or original result image; **do not classify the card as AMD or faulty** from a wrong URL. |
| **#15** | Lowest FurMark **4,819** and Steel Nomad **1,272**; Celeron/Asus B250 rig. | Retest under standard settings and note clock/power/temp; differences may be rig-related and do not themselves prove damage. |
| **#23** | Superposition **11,446** versus roughly **12,313 same-rig median** (about **7% lower**); FurMark **4,896**, Steel **1,326**. Linked FurMark peak **50°C**, max clock **1,646 MHz**, estimated peak **163 W**. | Repeat Superposition with identical preset/API; check clocks, power limits and background load. Steel score is not similarly low. |
| **#25** | FurMark **5,132**, Steel **1,366**, but Superposition **12,156**. | Check for benchmark setting mismatch, not immediate hardware condemnation. |
| **#36** | GPU-Z recognised, **loud fan** noted; test intentionally stopped. | **Keep out of stress testing until physically checked** for fan rubbing, obstruction, looseness or bearing damage. |
| **#37** | [Public FurMark](https://www.gpumagick.com/scores/3393499) **5,033 / 83 FPS**, **56°C**, max **1,772 MHz**, 99% usage, Pentium G3258 and driver 582.78. | This **matches the supplied photo**; finish whichever additional benchmarks/VRAM checks are part of your protocol. |
| **#38** | [Public FurMark](https://www.gpumagick.com/scores/3393504) **5,081**, verified GTX 1070 on Celeron/Asus B250; remaining scores blank in snapshot. | Finish Superposition and Steel Nomad if still part of regimen. |

**Card #24** has the highest recorded score in all three columns (**5,182 / 13,062 / 1,373**). This does **not** prove the card is physically superior to all the others: its test rig differs from several lower-scoring units.

**Photo-to-card matching:** #19 and #37 both have **5,033 FurMark**, but the public details distinguish them. #19 shows **59°C / max 1,785 MHz**, whereas #37 shows **56°C / max 1,772 MHz**. The attached image matches **#37**, making it a useful example of why you need numbered labels rather than identifying cards by score alone.

## 4. What do the results prove about health?

**Proven for many tested examples:** GPU-Z initialisation and the ability to complete a short high-load rendering test; for 35 cards, three scores appear in the sheet. **Not yet proven across the batch:** memory correctness, all outputs functioning, stable operation after sustained warm-up, acceptable fan-bearing sound, correct original firmware, no power/connector damage, or genuine provenance.

A useful minimal, non-redundant grading workflow:

1. **Identify the exact physical board.** Give each unit a numbered sticker, record model/revision/serial privately and GPU-Z details. An identical PCI model does not uniquely distinguish two physical cards.
2. **Inspect while powered off.** Fans spin without rubbing, no missing blades/loose screws, burnt connectors or damaged PCB. On any mechanical noise (#36), **stop before further load**.
3. **Repeatable render checks.** Keep consistent FurMark P1080 GL, same settings and a recorded test rig/driver. Use Superposition and/or standard Steel Nomad as different rendering workloads, not endless duplicates of FurMark.
4. **Test memory/errors.** Add a VRAM-error test such as OCCT VRAM, and log duration **and actual error count**. The Sheet only has 'No errors' notes for #18–20; that must not be extrapolated to other rows.
5. **Inspect function and acoustics.** Test HDMI/DisplayPort outputs and fan response at idle and at moderate load. For cards intended to be resold, a calm, repeatable functional check matters more than a peak score.
6. **Grade transparently.** 'Fully tested', 'runs but incomplete', 'needs diagnosis' and 'faulty (verified)' are distinct statuses. Missing tests are **unknown**, not passes or fails. Provide the actual test date and links when advertising.

NVIDIA cautions FurMark can draw more power than normal games and that disabling over-temperature/over-current protections can damage cards [12]. **Never bypass those protections**, and stop on artefacts, abnormal sounds, unexpected shutdowns or unsafe heat. A **60-second peak temperature of 50°C** does not establish a better cooler than another board peaking at 66°C: room conditions, fan speeds, clocks and actual GPU watts matter.

## 5. Drivers, Windows, AI and realistic 2026 use

**Driver lifecycle:** NVIDIA's official Pascal/Maxwell/Volta policy says **Game Ready feature/performance updates ended in October 2025**, with **critical security driver updates continuing through October 2028** [13]. The presence of a newer-numbered driver does not imply new gaming capabilities.

**Windows 10:** All validated public score pages say **Windows 10 build 19045**. Microsoft ended ordinary Windows 10 support on **14 October 2025**, although Extended Security Updates are available for eligible enrolled machines [14]. The benchmark records cannot establish whether a tester is enrolled. Avoid treating an unpatched online test box as a safe everyday workstation.

**Compute/AI:** NVIDIA lists the GTX 1070 at **CUDA compute capability 6.1** [15]. **CUDA Toolkit 13** removed offline compilation support for architectures older than capability 7.5; older CUDA toolkit paths may be needed for legacy GPU projects [16]. No Tensor cores, no RTX/DLSS and no compelling performance for modern large generative models. These are still good low-cost GPUs for legacy graphics research, older games and compatible image/video workflows, subject to application support.

**Hardware fit:** Full-size PCIe slot and the exact board's video outputs, external power connector(s), dimensions, PSU, cooling and BIOS compatibility must be checked before recommending a card for a particular desktop. A **laptop cannot simply accept a desktop PCIe GTX 1070 internally**. The actual current GPU and whether the machine is still owned must be established before claiming an upgrade.

## 6. What could they sell for in Australia?

**Observed November 2026 asking prices**, not verified completed sales: ordinary used GTX 1070 8GB entries on eBay Australia include approximately **AU$135 GALAX**, **AU$143 MSI**, **AU$144 Gigabyte**, **AU$158 ZOTAC**, with some ASUS examples **AU$170–200+** [17]. Gumtree offers include an **EVGA GTX 1070 at AU$150** and a **Founders Edition around AU$180** [18]. A dated Australian second-hand guide estimates roughly **AU$120–180** [19].

A defensible initial **individual asking-price range** for a correctly identified, clean and adequately tested ordinary GTX 1070 is **about AU$120–180**, dependent on branding, warranty, condition and demand. **That is not an assured selling price**, and a pile sold as a single wholesale lot would likely achieve less per card. Returns, shipping, labour and fees also matter. An unresolved Colorful/Gigabyte identification conflict should be corrected before any brand-specific listing.

## 7. What is still genuinely unknown?

- Physical count and ownership history: **100 sheet slots do not mean 100 GPUs**; earlier conversation referred to a batch of **92**, not fully reconciled against labels.
- The board manufacturer, actual submodel, serial, original VBIOS and memory chip vendor **per card**. **Colorful PCI subsystem vs earlier Gigabyte label is an open evidence conflict.**
- Whether card #4's actual FurMark submission can be recovered. Do not silently replace the wrong AMD result with a guessed link.
- Why card #36's fan is loud, and whether it is repairable.
- A same-PC, same-driver, same-preset **fair ranking** of the batch.
- Universal VRAM, output and fan tests (not present yet).
- Whether any card was previously used for mining. **Do not assume mining history merely from quantity.**
- Actual Australian sold prices and net resale proceeds.
- Superposition's exact test preset/API and Steel Nomad edition for every entry.

**Research conclusion:** the known GTX 1070 results are broadly consistent and their short-run temperatures look reasonable. The *physical manufacturer conflict*, *wrong #4 link*, *noisy #36*, *two incomplete card records* and *VRAM/port/fan certification gaps* are more important to resolve than chasing an additional few points in FurMark.

## Source links

1. [PCI-SIG vendor registry: 0x7377 = Shenzhen Colorful Yugong](https://pcisig.com/membership/member-companies)
2. [Gigabyte GTX 1070 WINDFORCE OC 8G Rev. 2.0 official specifications](https://www.gigabyte.com/Graphics-Card/GV-N1070WF2OC-8GD-rev-20/sp)
3. [NVIDIA launch, 10 June 2016](https://www.nvidia.com/en-us/geforce/news/geforce-gtx-1070/)
4. [TechSpot GTX 1070 specification and 2016 performance summary](https://www.techspot.com/specs/gpu/138288-nvidia-geforce-gtx-1070.html)
5. [TechPowerUp 2016 GTX 1070 silicon specification](https://www.techpowerup.com/222537/nvidia-geforce-gtx-1070-specifications-revealed)
6. [Independent Linux lspci example identifying 7377:0000 as Colorful](https://mail.vivaolinux.com.br/topico/Redes-Fisicas-e-logicas/Meu-Linux-reconhce-minha-placa-de-rede-porem-nao-conecta/)
7. [Colorful iGame GTX1070 model and variant specifications](https://www.colorfly.eu/products/graphic-cards-for-industrial-use/basics-for-customized/igame-gtx1070-u-top-8g/)
8. [UL Steel Nomad scoring formula](https://support.benchmarks.ul.com/support/solutions/articles/44002528064-how-is-the-3dmark-steel-nomad-score-calculated-)
9. [ComputerBase community 3DMark Steel Nomad results, including GTX 1070](https://www.computerbase.de/artikel/apps/3dmark-steel-nomad-community-benchmark.88184/)
10. [UNIGINE Superposition benchmark user manual](https://benchmark.unigine.com/docs/superposition/Superposition_Benchmark_User_Manual.pdf)
11. [UL which 3DMark benchmark to choose](https://support.benchmarks.ul.com/support/solutions/articles/44002132650)
12. [NVIDIA's FurMark power and hardware-safety warning](https://nvidia.custhelp.com/app/answers/detail/a_id/2603/)
13. [NVIDIA Pascal/Maxwell/Volta driver support plan](https://nvidia.custhelp.com/app/answers/detail/a_id/5676)
14. [Microsoft Windows 10 release/ESU information](https://learn.microsoft.com/en-au/windows/release-health/release-information)
15. [NVIDIA legacy CUDA compute capability list](https://developer.nvidia.com/cuda/gpus/legacy)
16. [NVIDIA CUDA 13 architecture retirement explanation](https://developer.nvidia.com/blog/navigating-gpu-architecture-support-a-guide-for-nvidia-cuda-developers)
17. [eBay Australia used GTX 1070 8GB live listings](https://www.ebay.com.au/b/NVIDIA-GeForce-GTX-1070-8-GB-Memory-Computer-Graphics-Video-Cards/27386/bn_7116940860)
18. [Gumtree Australia GTX 1070 second-hand asking prices](https://www.gumtree.com.au/s-electronics-computer/gtx%2B1070/k0c20045?condition=used)
19. [Australian used-GPU price guide, October 2026](https://thewilsons.au/gcards.html)

*This document and its CSV are a dated audit. The Google Sheet is live; new scores entered afterwards do not automatically alter the historical snapshot. The user's original Sheet has not been edited.*
