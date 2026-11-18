# The 89-card GTX 1070 collection: engineering, history, unlocks, AI and economics

**Research date:** 18 November 2026 (Australia/Sydney)  
**Inventory declared by owner:** 66 × Colorful iGame GTX1070 U-TOP-8G; 23 × Gigabyte GV-N1070WF2OC-8GD Rev. 2.0; **89 cards, 712 GB aggregate GDDR5**.  
**Scope:** documentary research, not a physical examination or a completed independent benchmark of all 89 devices. **Evidence tags:** VERIFIED = manufacturer/primary evidence; REPORTED = contemporary third-party source; INFERRED = engineering reasoning; UNKNOWN = requires physical inspection; NOT DEMONSTRATED = no credible exact-model reproduction located, not a proof of physical impossibility.

> **Inventory correction (18 Nov):** The 100 numbered rows in the historic GPU test sheet are *test slots*, not 100 verified physical GPUs. The previous 92- and approximately 100-card estimates are superseded by the owner's explicit **66 + 23 = 89** stocktake. Existing test data, seller reservations, and hardware labels have **not** automatically been reconciled to the new stocktake. See [the prior audit](GPU_BATCH_RESEARCH.md), [current generated resale evidence](RESALE_ANALYSIS.md), and the [dated testing snapshot](../data/benchmark_snapshot_2026-11-13.csv).

## 1. Executive findings and decision

1. **Both cards are GP104/Pascal GTX 1070 8GB designs**, not cut-down GA100 mining accelerators. There is no verified, practical 8-to-16GB or GTX-1070-to-GTX-1080 unlock for either *specific* board in the sources examined. Avoid buying flash files or advertising more than 8GB VRAM per unit. [S1–S7]
2. **The exact boards are different.** Colorful's U-TOP lists three 80mm fans, four 7mm heatpipes, two 8-pin power connectors, and a dual-clock specification; launch reporting names 8+2 power phases and its modular i-MSD design. Gigabyte Rev 2.0 lists WINDFORCE 2X, one 8-pin connector, 6+2 phases and its own mode clocks. These are *board-level* distinctions, not proof one survives longer. [S1–S4]
3. **The collection is not yet 89 verified-good GPUs.** Historic FurMark results repeatedly identify subsystem vendor 7377 (Colorful), while separate photographed cards were labelled Gigabyte. Physical model/revision and a serial-to-test mapping must be established before representing every result as belonging to an exact board. The latest generated resale analysis is dated 16 November, before this revised inventory. [I1–I3]
4. **712GB does not act like one GPU with 712GB memory.** The most practical cluster workloads are independent jobs and data-parallel batches, not a single enormous model stretched across 89 consumer GPUs over PCIe and Ethernet.
5. **Software longevity is becoming the bottleneck.** GTX 1070 compute capability is 6.1. CUDA 13 removed Pascal offline compilation and libraries, and PyTorch announced the end of published CUDA 12.6 wheels with 2.15. Preserve pinned, tested CUDA 12.x / driver combinations for experimental use; do not assume a new CUDA/PyTorch wheel will work. [S8–S12]
6. **An always-on 89-GPU rig would be expensive.** An illustrative 12-host, 150W/card, 90%-efficient PSU scenario is ~16.2kW at the wall, about **AU$3,492 per 30-day month** at an assumed 30c/kWh, excluding active cooling. Measure real watts before committing.
7. **Practical recommendation:** audit and grade the stock first, retain a modest 2–8-card reproducible compute/benchmark lab, benchmark useful workloads *per watt*, then sell or separately use the rest if their operating cost is unjustifiable. Keep firmware and voltage experiments away from sale-ready cards.

## 2. Model identification and side-by-side specifications

| Attribute | Colorful iGame GTX1070 U-TOP-8G (66 claimed) | Gigabyte GV-N1070WF2OC-8GD **Rev. 2.0** (23 claimed) |
|---|---|---|
| Company / family | Colorful Technology / iGame | Gigabyte / WINDFORCE OC |
| Exact SKU status | Manufacturer/distributor product page says iGame GTX1070 U-TOP-8G; variant stickers not inspected | Gigabyte official Rev. 2.0 page matches full user-supplied identifier |
| Launch history | Custom U-TOP and X-TOP announced 10 June 2016; expected late June China availability | Exact Rev. 2.0 first-sale date **not verified**; do not use initial GTX 1070 launch date as board-revision date |
| Silicon | NVIDIA GP104 Pascal, GTX 1070 | NVIDIA GP104 Pascal, GTX 1070 |
| Cores / memory | 1,920 CUDA cores, 8GB GDDR5, 256-bit | 1,920 CUDA cores, 8GB GDDR5, 256-bit |
| Listed base clock | 1506–1684 MHz (manufacturer publishes a range, probably operating modes; confirm card VBIOS) | Gaming 1556 MHz; OC mode 1582 MHz |
| Listed boost clock | 1607–1797 MHz (range as published) | Gaming 1746 MHz; OC mode 1771 MHz |
| Memory data rate | 8008 MT/s effective | 8008 MT/s effective (check actual VBIOS) |
| Cooler | 3 × 80mm fans, 4 × 7mm plated heatpipes on distributor page | WINDFORCE 2X, two fans, composite heatpipes |
| Listed VRM | 8+2 phases in contemporary Colorful launch coverage; not a component-level schematic | 6+2 phases on official Gigabyte page |
| Auxiliary power | **2 × 8-pin** per Colorful Europe product listing | **1 × 8-pin** on Gigabyte Rev 2.0 spec |
| Video ports | 3 × DisplayPort 1.4, 1 × HDMI 2.0b, 1 × DVI | 3 × DisplayPort, 1 × HDMI, 1 × DVI-D |
| Listed reference-style TDP | 150W (vendor listing); a firmware power limit may be higher | 150W class / actual firmware limit varies |
| Board dimensions | Exact measured U-TOP dimensions **not verified** | 280 × 131 × 37mm on official Gigabyte spec |
| PCIe | PCIe 3.0 x16 (GPU capability; electrical slot wiring may be narrower) | PCIe 3.0 x16 |
| Confidence | HIGH on product listing; MEDIUM that every physical card is identical | HIGH on official model specs; physical individual IDs remain UNKNOWN |

**Sources:** Colorful distribution page [S1], Gigabyte official Rev 2.0 [S2], contemporary U-TOP launch coverage [S3–S4], NVIDIA/2016 technical analysis [S5–S7]. Verify the Colorful's exact model string printed on each reverse sticker: **U-TOP** is not the same as **X-TOP**, **Vulcan** or **U**. Similarly, Gigabyte **WF2OC** is not **WF2** or **G1 Gaming**.

## 3. Historical timeline and manufacturing context

- **Pre-2016:** NVIDIA's Maxwell family precedes Pascal. Colorful had established iGame gaming cards in China; Gigabyte offered various WINDFORCE cooler generations. The two companies serve different channels; there is no evidence in this review of shared PCB designs between these SKUs.
- **May 2016:** NVIDIA publicly detailed GTX 1070's cut-down GP104: 1,920 CUDA cores, full 256-bit GDDR5 interface, 8GB memory. The earlier full GTX 1080 used 2,560 cores and faster GDDR5X. [S5–S7]
- **10 June 2016:** GTX 1070 retail launch, US MSRP **US$379** partner / approximately **US$449** Founders Edition, not a current Australian value. Colorful introduced U-TOP and X-TOP versions for the Chinese market; contemporary coverage describes the 8+2 phase and i-MSD modular hardware. [S3–S7]
- **Late June 2016:** Period reporting expected custom Colorful boards to be available; this is an announcement-window estimate, **not proof of when these 66 particular cards were manufactured**. [S3–S4]
- **2017–2021:** Pascal remained popular in budget gaming and later used mining markets. Individual cards' previous mining history is **unknown**; cooling or fan wear cannot establish their previous workload by itself.
- **October 2025:** NVIDIA stopped normal feature/Game Ready development for Maxwell, Pascal and Volta, while announcing critical-security fixes to October 2028. [S9]
- **2025:** NVIDIA CUDA 13 removed compilation/library targets for pre-Turing GPUs (SM below 7.5), even though an appropriate supported driver can continue to run *older* compiled applications. [S10–S11]
- **September–November 2026:** PyTorch maintainers described 2.14 as the last published CUDA 12.6 wheel path for pre-Turing cards; later builds require a pinned old environment or source build, with caveats. [S12]
- **November 2026:** Historic fleet spreadsheet contained 100 slots; prior snapshots show only a subset actually benchmarked. **18 November:** user explicitly confirmed a physical stocktake of 89 by model. [I1–I3]

**Unresolved history:** Serial date codes, factory/contract manufacturer, first Australian sale date, original AU$ price and Gigabyte Rev 2.0 launch month were not firmly established. Do not assign a manufacture year from the architecture launch alone. A Chinese-language review of a related iGame "U" variant identified Samsung memory and a GP104-200-A1 package, but **this is not proof for the exact U-TOP batch**. [S18]

## 4. GP104 engineering and memory details

The GTX 1070 GP104-200 variant is fabricated on TSMC 16nm FinFET, with approximately 7.2 billion transistors in the full GP104 design. The retail 1070 enables **15 streaming multiprocessors × 128 FP32 CUDA lanes = 1,920**, 120 texture units and 64 ROPs; the full GTX 1080 has 20 SMs/2,560 CUDA cores. The memory backend is not the GTX 970's split-memory arrangement: 8GB is attached to the full 256-bit bus, about **256GB/s** at 8Gbps. A typical board uses eight 8Gbit GDDR5 packages (8 × 1GB = 8GB); verify actual vendor chip markings before stating exact per-board chips. [S5–S7]

This GP104's FP16 arithmetic is **1/64 FP32 throughput**, unlike the data-centre GP100's strong half-precision path. It has no Tensor cores and no RTX hardware. It has NVENC/NVDEC blocks of the Pascal generation, but codec specifics must be checked against NVIDIA's exact encode/decode matrix for the chosen application; do not presume AV1 hardware encode/decode. ECC workstation, NVLink and data-centre MIG features are not retail GTX 1070 capabilities. SLI support does not pool VRAM for ordinary AI tasks. [S13]

**Potentially confusing 16GB precedent:** NVIDIA's **Quadro P5000** is a Pascal workstation board with **16GB of GDDR5X**, showing a related GP104-family design can be sold with more VRAM. That is **not** evidence that a GTX 1070 PCB, memory straps, VBIOS and GDDR5 controller configuration accept a drop-in upgrade. [S14] Do not treat different density or GDDR5X chips as pin-compatible until proven by component datasheets and electrical analysis.

**PCB investigation queue:** identify board revision/silkscreen, VRM controller, MOSFET/driver part numbers, memory package markings (Samsung/Hynix/Micron may vary), power shunts, BIOS EEPROM, fan part numbers, cooler attachment and thermal-pad thickness. No exact full factory schematics or side-by-side PCB x-rays for the *two physical batches* were established in this research. Capacitor counts and phase quality must not be inferred solely from marketing.

## 5. Can anything be unlocked? A feasibility matrix

| Proposed modification | Evidence-based status | Explanation / safer action |
|---|---|---|
| Software unlock hidden extra GTX 1070 VRAM | **NOT DEMONSTRATED** | Physical 8GB GDDR5 fitted; no known 16GB HBM stockpile hiding under firmware, unlike a CMP 170HX. |
| Reball/replace 8GB with 16GB on **these two PCB designs** | **THEORETICAL / UNVERIFIED** | Different memory density, routing, strap, controller/VBIOS support; no exact-model reproducible successful 16GB GTX 1070 procedure identified. Do not assume Quadro P5000 proves it. |
| Unlock 5 absent GP104 SMs to match GTX 1080 | **NOT DEMONSTRATED** | The cut-down 1070 SKU has 15/20 SMs enabled; disabling may be fused and/or partly defective. A changed device name or VBIOS does not create functioning cores. |
| Voltage glitching Pascal fuses like CMP 170HX | **UNVERIFIED / HIGH RISK** | CMP GA100's secure-processor/OTP attack is a different GPU generation/package; no safe GP104 port demonstrated. |
| Genuine extra compute using tuning | **VERIFIED FEASIBILITY, NOT A CAPACITY UNLOCK** | Cooling, safe power limits, moderate core/memory clocks and undervolting can alter output/watts; must benchmark each card. |
| Change firmware power limits/cross-flash | **POSSIBLE IN SOME HISTORIC CONTEXTS, NOT RECOMMENDED HERE** | Signature/board variants, vendor IDs and VRM tables make bricking or incorrect voltages possible. Do not flash to identify cards. |
| Replace fan, clean, repaste correctly | **ESTABLISHED REPAIR CATEGORY** | Useful if inspection and measured tests show a need; preserve exact fan connector, thickness and mounting. |

The **CMP 170HX comparison has an evidentiary trap**. GA100-based mining cards had restricted *already-mounted HBM*, and community software unlocks to **64GiB** on 8GB variants have detailed reports. A separate November 2026 voltage/fuse-glitch report claimed ~80GiB and more cores on some cards, but it remains a different, specialised attack requiring independent replication and is **not a blanket claim that all mining GPUs can unlock 10× their memory**. Some claimed higher configurations elsewhere alias or fault at higher addresses. [S15–S17] None of this supplies a memory modification method for GDDR5 GTX 1070s.

**Risk rule:** no overcurrent/overtemperature bypass, blind VBIOS flashing, unverified memory soldering or shunt mods on stock intended for reuse/sale. Experimental hardware work, if ever justified, belongs on an already-diagnosed non-saleable specimen with backup ROM and independent recovery equipment.

## 6. Actual fleet evidence and identity conflict

The historic [GPU audit](GPU_BATCH_RESEARCH.md) and [snapshot](../data/benchmark_snapshot_2026-11-13.csv) found **36 correct linked public GTX 1070 FurMark submissions** among 37 originally examined URLs. Published device **10DE:1B81** had **subsystem vendor 7377** on those matched results, consistent with Colorful. Gigabyte commonly reports subsystem vendor **1458**. This does not prove physical counterfeits, nor establish that all benchmarked cards were Colorful, because exterior labels, ROMs and sheet entries have not been matched by hardware serials. [I1]

The 13 November audit recorded 38 GPU-Z-recognised slots, 37 FurMark scores and 35 scores for each of Superposition and Steel Nomad. Short FurMark peaks of approximately **50–66°C** in that data do not certify long-run thermals, fans or error-free GDDR5. The three test rigs use different CPUs and driver versions, making raw score leaderboards misleading. Card **#4** links to an unrelated RX 9070 XT result; **#36** had a reported loud fan and should be held. A later 16 November generated resale snapshot listed **54 started slots**, with 31 in A/B evidence categories, 8 retest/incomplete, 13 needing link verification and 2 hold; **these grades are not a present physical 89-card stocktake**. [I1–I3]

**Do not silently overwrite seller allocation data or the original Google Sheet.** Add private serial-to-card-to-model mappings only when measured; the public website should show anonymous card IDs without publishing serial numbers.

## 7. Driver, software and AI applications in 2026

| Software / feature | Position in November 2026 | Confidence |
|---|---|---|
| NVIDIA CUDA compute | GTX 1070 = **SM 6.1**, verified on NVIDIA legacy list [S8] | HIGH |
| CUDA 13 toolchain | Does **not** produce Pascal offline code or modern bundled Pascal libraries; build with CUDA **12.x** as appropriate [S10–S11] | HIGH |
| GPU driver | NVIDIA **R580 final legacy-compatible branch** (manufacturer statement); critical-security coverage promised through Oct 2028 [S9–S10] | HIGH |
| PyTorch | Maintainers: **2.14 last released CUDA 12.6 wheel**, 2.15 removes published 12.6 packages; source-build path may work with older toolkit, verify concrete wheel includes sm_61 [S12] | HIGH on policy; runtime UNTESTED |
| llama.cpp CUDA | Source build has documented SM 61 / Pascal logic; compile an appropriate pinned commit with a supported 12.x toolkit, then test inference and peak allocation [S19] | MEDIUM until tested locally |
| Vulkan compute | Potential alternative for older Pascal cards; actual backend/quantisation performance depends on driver and build | UNTESTED |
| Ollama / modern PyTorch frontends | Do not assume each current downloadable binary carries sm_61 kernels; inspect release notes and actual logs | UNKNOWN |
| TensorFlow / Stable Diffusion | Legacy pinned environments may run selected workloads, but modern extension stacks can reject Pascal | UNKNOWN per version |
| Blender | Verify the exact version's CUDA/OptiX minimum requirements; Pascal lacks RT cores and modern OptiX capability | VERSION-DEPENDENT |
| NVENC / media | Good candidate for compatible H.264/HEVC batch transcodes; check codec/pixel-format matrix, quality and throughput | REQUIRES TEST |
| Scientific/BOINC jobs | Suitable for kernels with sm_61 builds and bounded 8GB working sets | JOB-DEPENDENT |

**Good use cases:** parallel independent 1080p render jobs, legacy graphics benchmarking, multiple small quantised LLM inference workers, modest CUDA teaching, compatible computer-vision inference, video transcoding, and distributed batch science. **Poor use cases:** one large model requiring frequent inter-GPU activation exchanges, recent tensor-core-optimised models, high-throughput large-model training, or workloads that require more than 8GB contiguous VRAM per worker.

A realistic comparison with current GPUs must use **tokens/s per watt**, **images/minute per watt**, **frames/minute**, host utilisation and total hardware expense, not marketing peak TFLOPS. The 89 GPUs do not have any Tensor cores: adding their FP32 theoretical FLOPS does not yield equivalent modern AI inference FLOPS. At the theoretical nominal 1,920 × 2 operations/cycle × ~1.68GHz, a GTX 1070 has roughly **6.45 TFLOPS FP32** peak, but actual AI speed can be far below that.

## 8. The 89-GPU cluster: architectures and realistic limits

**Capacity accounting:** 66 × 8GB = **528GB** Colorful; 23 × 8GB = **184GB** Gigabyte; together **712GB of separate device memories**. **Core accounting:** 89 × 1,920 = **170,880 FP32 CUDA cores**, conditional on each card being functional and an ordinary 1070 configuration.

| Scale | Useful architecture | Main bottleneck / prerequisite |
|---|---|---|
| 1 GPU | Benchmark, quantised model whose layers fit 8GB, NVENC, OCCT | Single-card VRAM, software support |
| 2 GPUs | Separate workers; compare model efficiency | 8GB VRAM each; no automatic pooling |
| 4 GPUs | Parallel inference, media, renders on one host | PSU, slots, PCIe clearance |
| 8 GPUs | One dense rig for loosely coupled batches | Lane/riser links, 1.2kW GPU power at nominal 150W |
| 16 GPUs | Two rigs, network queue plus per-node worker | Cluster networking/management |
| 32 GPUs | Four rigs, brokered independent tasks | Cooling, UPS, job placement |
| 89 GPUs | Around **12 eight-slot hosts** (11×8 + 1×1) as an arithmetic layout, not a purchasing recommendation | Electrical circuits, space, failure management, PSUs, PCIe and legacy toolchains |

For a proposed cluster: add a lightweight queue/orchestrator, host inventory, per-device labels, metrics exporter (GPU memory, temperature, clocks, PCIe, wattage), failure isolation, power-budget policy and a reproducible job benchmark. Use the same driver/toolchain pinned on comparable nodes. Avoid treating an 8-slot mining board's physical slots as x16 electrical links; many risers may be effectively PCIe x1 and restrict model loading/interconnect throughput.

**Model parallelism is possible in principle**, but each 8GB card has its own memory; cross-host communication over ordinary Ethernet is slow compared with on-device bandwidth. GTX 1070 SLI does not give NVLink-like AI fabric, and MPI/NCCL/CUDA stack compatibility must be validated with chosen versions. For this fleet, independent jobs are normally the better scaling baseline.

**Initial proof of value:** benchmark 1, 2, 4 and 8 cards against a single modern, greater-than-8GB alternative on *equal job definitions*. Report task throughput, wall watts, job failures, CPU/RAM/RX/TX use and value per kilowatt-hour.

## 9. Electricity and heat: transparent planning model

**These are hypothetical calculations, not measured wall powers, electricity quotes or electrical installation designs.** Take: 12 hosts, 100W host DC load each, 90% PSU efficiency at workload, 30 days × 24h, assumed variable grid energy price **AU$0.30/kWh**, excluding active refrigeration, utility standing charges and host acquisition. Use actual meter readings and the current Dubbo/NSW retail tariff before making decisions.

| Scenario (all 89 GPUs) | GPU DC assumption | Full system wall estimate | Cost / day at 30c/kWh | Cost / 30 days |
|---|---:|---:|---:|---:|
| Low utilisation / nominal idle | 15W each | (1,335 + 1,200)/0.90 = **2.82 kW** | AU$20.28 | **AU$608.40** |
| Tuned modest compute | 90W each | (8,010 + 1,200)/0.90 = **10.23 kW** | AU$73.68 | **AU$2,210.40** |
| Sustained nominal-class load | 150W each | (13,350 + 1,200)/0.90 = **16.17 kW** | AU$116.40 | **AU$3,492.00** |
| Heavy load illustration | 180W each | (16,020 + 1,200)/0.90 = **19.13 kW** | AU$137.76 | **AU$4,132.80** |

**Tariff sensitivity:** Nominal-class 16.167kW × 720h = 11,640kWh/month: at 25c/kWh ~AU$2,910; 30c ~AU$3,492; 40c ~AU$4,656. Actual GPU draw can be very different from board TDP, and the previously observed public GPU telemetry of ~180W is **not a wall measurement**. 

One 8-card host at 150W/card +100W host DC with 90% PSU efficiency is ~**1.44kW wall**, or ~AU$312/30 days if left fully loaded continuously at 30c/kWh. A 4-card test lab at 100W/card +100W host DC is ~**0.56kW wall**, AU$120/30 days if always loaded. Running jobs only when needed is often financially better.

Nearly all electrical energy becomes indoor heat, so a ~16kW powered cluster presents a major ventilation problem before added air-conditioning. Power-board/riser arrangements and household circuits are **not** safe to extrapolate from a GPU count. Use a licensed electrician for any fixed wiring or capacity changes. Confirm total wall draw and breaker/circuit allocation before high-density operation.

## 10. Australian resale and refurbishment economics

**Market evidence quality:** A 2026 Australian Gumtree listing shows a used GTX 1070 Founders Edition **asking AU$140** (10 Nov 2026), and a contemporary used ASUS Strix 1070 **asking AU$170**. Those are *asking prices*, not a completed sale or exact Colorful/Gigabyte comparables. One October 2026 completed eBay result was **US$43.99 (~AU$64.96 on page)** but it was explicitly **for parts/no display**, not working stock; it cannot be used as the normal sale price. The [existing resale worksheet](RESALE_ANALYSIS.md) proposes **AU$120–180 asking** for tested ordinary 1070s; it is a planning range, not a statistical estimate of realised proceeds. [S20–S22, I3]

**Illustrative scenarios, not verified resale appraisals** (all 89 independently working and sold singly, before fees/shipping/taxes/labour):

| Per-card assumed gross asking realised | Collection arithmetic |
|---|---:|
| AU$100 | AU$8,900 |
| AU$120 | AU$10,680 |
| AU$150 | AU$13,350 |
| AU$180 | AU$16,020 |

A bulk sale will usually trade lower unit proceeds for lower testing, packaging and transaction effort. There is insufficient matched-model **completed sales** evidence here to responsibly quote a precise low/central/high *market valuation*, and there is no reliable proven collector premium for the U-TOP based solely on rarity. The individual-vs-bulk decision needs local sold comparables, freight quotes and confirmed condition.

**Possible repair budgets:** Instead of publishing invented quotations for unknown fan part numbers and thermal pads, define a per-unit maximum approved spend after diagnosis. For example, at a hypothetical AU$15 consumables each, all 89 would cost **AU$1,335** *before labour*; if the real parts exceed the expected increase in sale proceeds, stop. Do not repaste 89 cards blindly when measured thermals and pads are currently acceptable.

**Modern GPU comparison:** As of October–November 2026, local RTX 3060 12GB ads show hundreds of AUD per card; they add Tensor cores and a 12GB contiguous working set, but published asking price is not what a purchaser must pay. [S23] A small number of newer GPUs may deliver lower cost per useful AI job than 89 Pascal-era boards; measure exact application throughput, not spec-sheet TFLOPS.

## 11. Safe per-card test / refurbishment protocol

1. **Stocktake first:** label physical cards C-001…C-066 and G-001…G-023 *only after physical identification*; private table: serial, model/revision, PCI subsystem, GPU-Z, VBIOS checksum, GDDR5 vendor, connector layout, photos, test rig, sale allocation and condition. Do not assume an old sheet number matches a new serial.
2. **Powered-off inspection:** check 2×8-pin vs 1×8-pin, fan spins freely, screws/pads/shroud, corrosion, connectors and loose pieces. Hold any burn marks or grinding fans. Existing card **#36** needs fan diagnosis before load.
3. **Safe boot:** identify device and board with GPU-Z or nvidia-smi, record driver, PCI ID, firmware version and available VRAM; **read-only** until diagnosis. Be cautious of a Colorful subsystem ID inside a Gigabyte shroud—document first.
4. **Standard render:** fixed machine, fixed driver, same 60s FurMark2 P1080 GL + Superposition preset. Record average score, reported max temp, clock, power, fan behaviour, ambient temp, crashes/artifacts and result links. Run shorter if any anomaly; never bypass thermal protection.
5. **Memory verification:** run an appropriate supported OCCT VRAM test, record exact version, mode, duration and **error count**; one no-error test is not lifetime proof.
6. **Practical outputs:** HDMI and each DisplayPort; optional DVI if needed. Test restart/cold boot.
7. **Moderate sustained soak:** only after inspection/memory pass; observe stable temperature, fans and errors under representative workload, not an uncontrolled indefinite power-virus run.
8. **Grade:** A = defined full protocol completed; B = render pass but memory/output incomplete; R = retest; H = hold; F = confirmed faulty. Maintain historic grades separately, since the 16 Nov generator's A/B definitions differ.
9. **Remediation:** clean dust, replace diagnosed defective fans with *measured matching* parts, and repaste only with documented pad map/thickness and before/after metrics.
10. **Re-test and photograph:** resale descriptions must honestly state exact evidence and missing checks.

Track every device with a one-card JSON or CSV record and make changes traceable. Do not publish private serials to the public Pages website.

## 12. Keep / sell / repurpose decision matrix

| Option | Benefit | Constraint | Preliminary recommendation |
|---|---|---|---|
| Keep all 89 powered | Maximum parallel tasks | Huge electricity/heat/host investment; ageing | **No** until verified demand and funding |
| 2–8 card GPU research lab | Reproducible learning, benchmarking, legacy CUDA | Limited modern AI | **High priority** |
| 89-card independent batch farm | Many small jobs in parallel | Requires real job volume, orchestration and high uptime | Pilot on 4–8 before scaling |
| Split inventory, test and sell working units | Converts working stock to cash, lower maintenance | Labour, fees, pricing and fraud exposure | **Strong candidate** after grading |
| Sell bulk | Less transaction effort | Lower unit proceeds | Compare actual wholesale offers |
| Use parts from defective stock | Can recover other cards | Need careful matching and records | Only for clearly uneconomic failures |
| 16GB memory/core unlock programme | Technical curiosity | No exact-model credible procedure; high irreversible failure risk | **Not financially justified** |
| Replace with modern fewer GPUs | Tensor cores, larger per-device VRAM, support | Upfront cash; need target workloads | Compare metered jobs per AU$ |

**Decision gate:** Do not spend money on 12 rigs until one 4-card pilot outperforms a single newer GPU on at least one task worth its power and supervision costs. Compare opportunity cost of selling the bulk. 

## 13. Twenty non-obvious, source-linked discoveries

1. Colorful U-TOP and X-TOP were distinct launch SKUs (not interchangeable spec names). [S3]
2. Colorful U-TOP's product page states **two** 8-pin auxiliary connectors despite the GTX 1070 reference **150W** class. [S1]
3. It lists **three 80mm fans and four plated 7mm heatpipes**. [S1]
4. Original iGame press coverage describes **i-MSD modular assembly** designed for customisation. [S4]
5. Launch reporting calls its supply design **8+2**, unlike Gigabyte's official **6+2**. [S2–S4]
6. Gigabyte's Rev 2.0 listing provides **two explicit BIOS/software clock modes**, not one fixed speed. [S2]
7. Gigabyte **WF2OC** and **WF2 without OC** have distinct official pages; conflating them corrupts clock comparisons. [S2]
8. One GPU-Z subsystem ID cannot prove a photographed board partner; the fleet has a **7377 vs 1458** identity investigation. [I1]
9. The sheet's **100 rows never proved 100 physical cards**. [I1]
10. Historic **GPU #4's linked FurMark score belongs to a different AMD GPU**, but that does not mean physical #4 is AMD. [I1]
11. Historic **#36's noisy fan** is a mechanical hold, not an automatic failed GPU-chip verdict. [I1]
12. Score differences are confounded by different **Celeron/Pentium/i5** test benches and drivers. [I1]
13. The reference GTX 1070 retains **all 64 ROPs and a full 256-bit memory bus** even with fewer SMs than GTX 1080. [S5]
14. **Pascal GP104 FP16 is 1/64 of FP32**, undermining naive half-precision AI spec comparisons. [S13]
15. A **related Quadro GP104 board shipped with 16GB**, but used GDDR5X, distinct firmware and PCB; no drop-in 1070 proof. [S14]
16. The superficially similar **CMP 170HX case is GA100 + pre-mounted HBM**, not GDDR5 upgrade magic. [S15–S17]
17. A credible community **CMP 64GB** result must not be confused with newer **80GB reported glitch** claims. [S15–S17]
18. NVIDIA's last Pascal-compatible driver branch and security-only driver policy are more consequential for 2026 tooling than "Windows can recognise the card". [S9–S11]
19. PyTorch **2.14** is described as the last published CUDA 12.6 wheel, with a packaging support break at 2.15. [S12]
20. At hypothetical continuous 150W per GPU, the **whole 89-card cluster could cost more than AU$3,000/month in electricity alone** even before cooling. (Scenario maths in §9.)

## 14. Research gaps and a prioritised experiment roadmap

**Still unknown:** exact Colorful PCB revision(s); whether all 66 are truly U-TOP not U/X-TOP/Vulcan; vendor/date/lot of GDDR5 chips; number of working vs untested vs faulty units; which tests map to which physical serial; actual operating power in Dubbo; sustained thermal distributions; exact independently confirmed 16GB GTX 1070 modification (none located); Colorful/Gigabyte motherboard source and exact BOM; exact Gigabyte Rev 2.0 launch month; current matched-model sold-price statistics; fan part numbers; repair costs; the owner's workload demand.

**Phase 0 — zero-risk evidence:** photograph one of each model front, back, model label, auxiliary sockets and PCB silkscreen (serials stored privately), and run a read-only GPU-Z/nvidia-smi identification. Reconcile counts and old sheet IDs.

**Phase 1 — sample testing:** test 4 Colorful + 2 Gigabyte with identical host, driver, cooling setting, wall meter, FurMark, Superposition, OCCT VRAM and NVENC. Include a noisy/problem card only after mechanical repair.

**Phase 2 — actual computing:** with a pinned, compatible legacy CUDA toolchain, benchmark a small quantised llama.cpp model, an independent render/transcode batch and an 8GB-constrained computer-vision job. Capture throughput and watts across 1/2/4 cards, *then* compare with a current alternative.

**Phase 3 — market evidence:** find at least 10 recent completed Australian working GTX 1070 sales, ideally exact U-TOP and WF2OC, and at least two bulk purchase offers. Record item URL, sale date, condition, postage, fees and achieved price, not asking prices.

**Phase 4 — pilot economics:** build an 8-GPU job queue only if workloads are real; meter one week; compare running cost, maintenance, heat and actual resale opportunity cost.

**Phase 5 — experimental modding only if justified:** investigate memory straps and PCB markings on already-faulty donor boards. No high-current/OTP/voltage glitch work on saleable hardware, no firmware flashing as identification.

---

## Sources and confidence catalogue

**Manufacturer/primary sources**

- [S1] Colorful Europe distribution product page, iGame GTX1070 U-TOP-8G, accessed 18 Nov 2026: https://www.colorfly.eu/products/graphic-cards-for-industrial-use/basics-for-customized/igame-gtx1070-u-top-8g/ (product specs, 2×8 pin, cooler).
- [S2] Gigabyte Australia, **GV-N1070WF2OC-8GD Rev 2.0**, accessed 18 Nov 2026: https://www.gigabyte.com/au/Graphics-Card/GV-N1070WF2OC-8GD-rev-20 and detailed spec https://www.gigabyte.com/Graphics-Card/GV-N1070WF2OC-8GD-rev-20/sp
- [S8] NVIDIA legacy GPU compute-capability matrix (GTX 1070 SM 6.1): https://developer.nvidia.com/cuda/gpus/legacy
- [S9] NVIDIA official legacy driver policy, October 2025–October 2028: https://nvidia.custhelp.com/app/answers/detail/a_id/5676/
- [S10] NVIDIA CUDA 13.0 features and GP104 legacy boundary: https://developer.nvidia.com/blog/?p=104118
- [S11] NVIDIA CUDA 13 toolkit release notes: https://docs.nvidia.com/cuda/archive/13.0.0/cuda-toolkit-release-notes/index.html
- [S12] PyTorch developer maintainer, **4 September 2026** legacy CUDA wheel announcement: https://dev-discuss.pytorch.org/t/notice-cuda-12-6-wheels-will-no-longer-be-published-from-pytorch-2-15-drops-maxwell-pascal-volta/3432
- [S13] NVIDIA Pascal tuning guide (GP104 FP16 discussion): https://docs.nvidia.com/cuda/pascal-tuning-guide/
- [S14] NVIDIA Quadro P5000 16GB GDDR5X official PDF: https://www.nvidia.com/content/dam/en-zz/Solutions/design-visualization/productspage/quadro/quadro-desktop/quadro-pascal-p5000-data-sheet-a4-nv-704386-r1.pdf

**Contemporary launch reporting and independent research**

- [S3] Tom's Hardware, 10 June 2016, Colorful U-TOP/X-TOP first launch report: https://www.tomshardware.com/news/colorful-igame-gtx-1070-nvidia,32037.html
- [S4] Back2Gaming, Colorful press release reproduced **10 June 2016**: https://www.back2gaming.com/press/colorful-releases-worlds-first-gtx1070-graphics-cards/
- [S5] AnandTech, NVIDIA GTX 1070 specifications, **18 May 2016**: https://www.anandtech.com/Show/Index/10336
- [S6] TechPowerUp, GTX 1070 launch specs, **May 2016**: https://www.techpowerup.com/222537/nvidia-geforce-gtx-1070-specifications-revealed
- [S7] GamersNexus GTX 1070 launch review, **2016**: https://gamersnexus.net/hwreviews/2453-nvidia-geforce-gtx-1070-founders-edition-review
- [S15] CMP Wiki unlock status, community-evidence tracker, accessed Nov 2026: https://cmp.wiki/wiki/Unlocks
- [S16] CMP 170HX community unlock and geometry analysis, accessed Nov 2026: https://cmp.wiki/wiki/Driver_unlock and https://github.com/Consensus-Protocol/cmp170hx/blob/main/docs/unlock/memory-geometry.md
- [S17] Hardware Busters, **12 November 2026**, reported voltage glitch to 80GB (reported, not independently reproduced by us): https://hwbusters.com/news/voltage-glitching-turns-nvidias-cmp-170hx-mining-card-into-an-80gb-a100-that-outruns-the-real-thing/
- [S18] Chinese-language first-hand review of **related Colorful iGame 1070 U** variant; *not exact U-TOP verification*, 2016: https://post.smzdm.com/p/469894/
- [S19] llama.cpp project CUDA CMake source supports / discusses SM61: https://github.com/ggml-org/llama.cpp/blob/master/ggml/src/ggml-cuda/CMakeLists.txt

**Pricing illustrations (not statistically representative)**

- [S20] Gumtree Founders Edition 8GB AU$140 asking, Nov 2026: https://www.gumtree.com.au/web/listing/components/1345629024
- [S21] Australian Gumtree ASUS Strix GTX1070 asking AU$170, Nov 2026: https://www.gumtree.com.au/s-components/greenwich-sydney/c18552l3003831r100?condition=used
- [S22] eBay completed listing **21 October 2026**, damaged MSI GTX1070, *for parts/no display*, ~AU$64.96 displayed: https://www.ebay.com.au/itm/168586025419
- [S23] Gumtree used RTX 3060 ads, October–November 2026, showing a different price class: https://www.gumtree.com.au/s-components/rtx%2B3060/k0c18552

**Existing internal research and its limits**

- [I1] Existing GPU batch investigation: [GPU_BATCH_RESEARCH.md](GPU_BATCH_RESEARCH.md), initial source audit **13 November 2026**.
- [I2] Read-only dated public benchmark data: [benchmark_snapshot_2026-11-13.csv](../data/benchmark_snapshot_2026-11-13.csv).
- [I3] Generated resale evidence and grading definitions: [RESALE_ANALYSIS.md](RESALE_ANALYSIS.md), snapshot **16 November 2026**.

**Research integrity:** These public sources cannot establish the real condition of all 89 GPUs, an exact valuation from achieved sales, their individual GPU-Z/PCI firmware identities or the result of unperformed experiments. All electrical and pricing calculations are explicitly identified as assumptions. **No VBIOS or hardware changes were performed.**
