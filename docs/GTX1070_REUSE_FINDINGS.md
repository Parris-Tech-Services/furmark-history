# GTX 1070 second lives: local AI, Jellyfin, Plex and Immich

Research checked **21 November 2026**. Scope: 66 Colorful iGame U-TOP + 23 Gigabyte WINDFORCE = **89 GTX 1070 8GB cards**. This is documentary research and a proposed test plan, not a hardware benchmark. Exact QNAP model and host specifications remain unknown. The private discussion that prompted this research is paraphrased; personal details and screenshots are not published.

**Decision:** retain one healthy card for a local-AI experiment and evaluate one card for media/photo duties, potentially sharing the same PC at first. Keep the QNAP as storage if suitable. Expand only after measured benefit. There is no evidence here justifying a motherboard purchase or powering all 89 cards.

[Reusable deep research prompt](GTX1070_REUSE_RESEARCH_PROMPT.md) · [Previous exact-model research](GTX1070_89_CARD_RESEARCH.md)

## What the suggestions get right

| Proposition | Verdict | Practical qualification |
|---|---|---|
| Ethereum mining ended | Correct for Ethereum mainnet | The network changed consensus; it was not mined out. |
| Australian mining is not worthwhile | Plausible, not universally established | Depends on coin revenue and actual marginal electricity cost. No current profit is demonstrated here. |
| Local LLMs suit these cards | Feasible for selected models | 8GB and legacy software support constrain the experience. |
| Several GPUs require a special motherboard | Sometimes | A single card works in an ordinary suitable PC; multi-card systems need slots, lanes, address space, power and cooling. |
| GPUs can transcode media | Correct | Pascal supports useful older codecs; no hardware AV1. |
| Jellyfin is free whereas Plex is paid | Partly correct | Jellyfin is free software; Plex has free functions, but hardware transcoding requires Plex Pass. |
| A NAS with Immich can host a personal gallery | Correct in principle | NAS compatibility is model-specific; photo storage and GPU compute can be on separate machines. |
| One 66°C result demonstrates condition | Insufficient evidence | It describes one sensor under one workload, not VRAM, fan, output or long-term reliability. |
| The sender builds mining rigs | Personal statement | Neither verifiable nor necessary to the technical conclusions. |

## Ethereum and the mining economics

Ethereum mainnet moved from proof-of-work to proof-of-stake on **15 September 2022**. Its native ETH is no longer GPU-mined. Other chains are separate projects; their existence does not make a GTX 1070 profitable. [1]

Electricity matters directly. Storage cost is not a universal dominant GPU-mining expense; it matters only when that workload actually needs substantial storage. Hardware already owned still has resale value, and fans, maintenance, cooling and host power remain costs. A brief income estimate cannot establish future earnings.

The useful calculation is: **net AUD/day = realised AUD receipts − electricity − fees not already deducted − cooling/maintenance/other operating costs**. Break-even electricity tariff equals net receipts before electricity divided by wall kWh/day. For example, hypothetical receipts of \$1/day with 200W continuous whole-system consumption imply only \$0.208/kWh before other costs. This is an arithmetic example, not a revenue forecast.

| Assumed whole-system wall load, 24 h/day | kWh/day | At \$0.25/kWh | At \$0.35/kWh | At \$0.45/kWh |
|---|---:|---:|---:|---:|
| 75W | 1.8 | \$0.45/day | \$0.63/day | \$0.81/day |
| 150W | 3.6 | \$0.90/day | \$1.26/day | \$1.62/day |
| 250W | 6.0 | \$1.50/day | \$2.10/day | \$2.70/day |

These tariffs and loads are assumptions, not a NSW quote or measurements. At 150W continuous and \$0.35/kWh, annual energy is **\$459.90**. An extra idle 10W costs **\$30.66/year**. A deliberately hypothetical 89 × 150W GPU load alone would be 13.35kW and \$112.14/day at that tariff, excluding hosts and cooling. Do not confuse that illustration with actual card draw.

**Finding:** mining is not demonstrated as a better use than sale or selective reuse. A live, coin-specific profitability exercise would need a fresh hashrate test, revenue quote, actual tariff and measured wall power; none is available for this fleet.

## Local AI: what one GTX 1070 can realistically do

Ollama is a runtime; Qwen is a family of models. Ollama currently lists GTX 1070 as compute capability **6.1**, with driver **570 or newer** required for its 5.0–6.2 devices. Listing support does not prove a particular download works on this host. [2]

NVIDIA removed pre-7.5 offline compilation targets in CUDA 13. For a Pascal CUDA build, use **CUDA 12.9 or earlier** and a supported Pascal driver; NVIDIA identifies **R580 as the last supporting driver branch**. This is different from claiming every CUDA application suddenly stopped working. Record the actual runtime build and libraries, not merely the CUDA version displayed by nvidia-smi. [3]

A sensible candidate is an explicitly selected **Qwen3-8B GGUF Q4_K_M** model; its publisher documents llama.cpp use. A smaller 4B-class model offers more memory headroom. Neither is a promise of quality, speed or fit at every context length. [4]

Raw 4-bit weights need approximately parameters × 0.5 bytes: 4B = 2GB, 8B = 4GB, 14B = 7GB, 32B = 16GB, 70B = 35GB, in decimal units. Actual GGUF files add quantisation metadata; execution adds KV cache, buffers and other allocations. Thus an 8B 4-bit model is a reasonable single-card trial; a 14B model at 4-bit is tight on 8GB; 32B is not realistically a fully resident two-card 16GB setup once overhead is included. These are memory estimates, not measured fit or performance.

Start at 2,048–4,096 context tokens and one request. Record the exact quantisation, prompt and response lengths. Ollama's `ollama ps` reports whether placement is GPU, CPU or mixed; context and concurrency change memory demand. It normally prefers one GPU when the model fits and spreads a larger model across available GPUs. This is host-local model placement, not automatic distribution across networked PCs. [5]

llama.cpp offers CUDA and Vulkan backends. A controlled CUDA build can target `CMAKE_CUDA_ARCHITECTURES=61` with a compatible toolkit; check the selected source revision's build instructions. Vulkan is an alternative to evaluate if a CUDA binary lacks Pascal support, not a guaranteed faster path. Pin a proven build rather than assuming every newest binary includes old GPU kernels. [6]

## Motherboards, mining risers and 712GB of VRAM

One card needs a suitable physical slot, firmware, PSU connectors and case clearance; it does not inherently need a mining board. The owner reports **Colorful 2 × 6-pin; Gigabyte 1 × 8-pin**. This is user-supplied physical information, not independent verification of every PCB revision.

Two cards can use an ordinary board with suitable slot spacing and lane routing. Read that board's manual: a physical x16 slot might be electrically x4, or share lanes with an SSD. High card counts add BIOS address-space and Above-4G-decoding requirements, PSU distribution, airflow and chassis constraints.

A mining riser often exposes only x1 bandwidth. That may suffice for some mining work but can hamper model loading or inter-GPU transfers. PCIe 3.0 theoretical bandwidth is about 0.985GB/s per lane per direction before transaction overhead: x1, x4, x8 and x16 differ substantially. Actual negotiated generation and lane width need measuring. Do not infer AI suitability from a mining rig's card count.

89 × 8GB = **712GB aggregate VRAM**, spread across separate devices. There is no automatic contiguous 712GB pool. Sharding requires explicit software placement and transfers, and slower links can dominate latency. Independent jobs or replicas are often a more practical fleet experiment than one enormous model; that is an engineering recommendation, not a measured result. Full training and modern tensor-core optimisations are a different proposition from quantised inference.

## Media servers: where Pascal is still useful

NVIDIA's matrix lists the GTX 1070/1070 Ti with Pascal NVENC and H.264/HEVC encoding, including HEVC 10-bit, but no AV1 encoding. AV1 decode is also absent from this generation. Encoding hardware capability does not guarantee every application exposes every mode. [7]

Jellyfin documents NVIDIA acceleration, including Pascal HEVC 10-bit support and CUDA-based HDR-to-SDR tone mapping on suitable hardware. Decoding, scaling, tone mapping, subtitle burn-in and encoding are separate pipeline stages. Unsupported stages can still consume CPU. Stream counts depend on source codec, resolution, bitrate, subtitles, encoder preset, VRAM, CPU and storage. No stream-count benchmark has been performed here. [8]

There is a subtle session-limit trap: the current generic NVIDIA matrix displays a maximum of 12 sessions, whereas Jellyfin documents **8 for drivers 550–58x and 12 for 590+**. Pascal's last R580 branch means a 12-session headline cannot simply be applied to this machine. Validate the actual driver/runtime combination and do not equate a permitted session count with enough performance for that many 4K streams. [7][9]

**Direct play comes first:** when the client can play the file, a GPU transcode is unnecessary. Transcoding is useful for incompatible clients, lower remote bandwidth, or format changes. It is not automatically a storage-saving operation.

| Aspect | Jellyfin | Plex |
|---|---|---|
| Core model | Free software, community maintained [10] | Free features plus paid entitlements |
| NVIDIA hardware transcoding | Available without a software subscription | Active Plex Pass required [11] |
| Existing library playback | Test actual phone/TV/browser clients | Test actual phone/TV/browser clients |
| QNAP hosting | Depends on NAS architecture and deployment | Depends on NAS model and server support |
| Best selection method | Try representative files and clients | Compare the same files and actual entitlement cost |

The discussion's broad recommendation is sound, but “Plex costs money” needs that qualification. Neither system makes the server's electricity or administration free. Prefer one working GPU initially; several cards do not automatically accelerate one playback stream.

## Immich: family photos, video and two separate GPU jobs

Immich supports NVENC video transcoding; hardware decoding is a separate setting. Its documentation warns that GPU encodes can be larger and lower quality than comparable software encodes. Keep originals and compare an actual phone clip before selecting output settings. [12]

Its machine-learning service can separately accelerate search and face processing. Current documentation lists CUDA devices from compute capability 5.2, so Pascal 6.1 meets that published threshold. The particular container's ONNX/CUDA libraries and model still need testing; this does not prove every current image works on a 1070. Video transcoding and ML must be configured and verified separately. A GPU is optional. [13]

Current requirements specify minimum **6GB RAM**, recommended **8GB**, and at least two CPU cores. The current amd64 ML container also needs x86-64-v2 CPU instructions. PostgreSQL should use local SSD storage and **not a network share**. An older NAS cannot be assumed compatible from its brand alone. [14]

The family-gallery use case is more concrete than trying to consume all 89 cards: trial phone uploads, original-file downloads, video playback, face/search jobs and recovery. Public-gallery exposure is not part of this proposal.

## A practical design around the existing QNAP

**Proposed arrangement:** existing QNAP for suitable media/photo storage; an existing x86 PC with local SSD for application state and PostgreSQL; one GTX 1070 for selected GPU jobs. Mount media shares explicitly and keep PostgreSQL on the PC. NAS availability and network speed remain constraints. Local SSD can also hold models and transcoding scratch files.

A NAS-only deployment is an alternative only after checking the precise model's CPU, RAM, container support and OS. Installing a GTX 1070 inside it is a separate compatibility question: QNAP directs users to model-specific GPU compatibility, slot size and power checks. Some NAS supplies lack auxiliary GPU power. No QNAP upgrade is justified by the information supplied so far. [15]

Immich recovery requires **both media files and database data**. Its database dumps do not contain the original photos/videos. A working gallery, RAID array or NAS snapshot alone is not proof of recoverability; test restoring a small isolated library before migrating the sole copy. [16]

## Gaming, health checks and allocation

Gaming is another plausible reuse, but this report has no current Minecraft FPS measurements for either board. A Minecraft client renders graphics; a conventional dedicated server primarily needs CPU, RAM and storage, so adding GPUs does not automatically increase server capacity. Remote gaming additionally requires encoding, network and client tests. Existing cards may be useful in modest gaming PCs, subject to actual game/version/driver tests.

A temperature such as 66°C is contextual evidence only. Record ambient temperature, workload, duration, clocks, fan behaviour and power. A card can pass a core-heavy benchmark and still have VRAM errors, unstable outputs or worn fans. Previous mining does not prove either damage or health. Keep each card's condition and failures separate from the general architectural capability.

| Allocation proposal | Why | Expansion gate |
|---|---|---|
| One healthy 1070 for local AI | Lowest-cost feasibility test | Useful answers at acceptable latency and wall power |
| One card for Jellyfin/Immich, or share the first PC | Concrete household use | Correct playback, GPU job evidence and recovery test |
| Optional second AI card | Test larger model placement | Better useful capability than CPU offload after accounting for energy |
| Remaining cards: continue grading/resale | Avoid idle fleet overhead | Retain more only for a specified, measured workload |

This is a proposed allocation, not a change to existing seller reservations or ownership.

## Acceptance tests and evidence still needed

1. **Inventory:** capture host CPU/RAM, OS, exact GPU IDs, driver version, negotiated PCIe links, PSU and QNAP model. Confirm each trial card's physical power connectors.
2. **One-card AI:** record runtime version/build, exact model hash and quantisation, context, GPU placement, VRAM, time to first token, prompt/decode tokens per second, answer usefulness and wall energy. Repeat three comparable runs; include a CPU baseline. Mark any CPU fallback.
3. **Two-card comparison:** use the same model/settings where possible. Separately test a model that requires splitting. Record loading time, transfer topology, useful speed and energy; do not infer scaling from total VRAM.
4. **Media:** test H.264 1080p, HEVC 10-bit/HDR, subtitles and an AV1 source. Compare direct play with forced transcode; inspect player/server logs and GPU decode/encode utilisation. Raise concurrent streams until the real bottleneck appears.
5. **Immich:** use a copied test set, test phone upload/download and search/faces, inspect both service logs, and verify the correct GPU backend is selected. Restore database plus originals into an isolated instance and compare file hashes.
6. **Economics:** meter idle and active whole-PC power, hours/day and actual marginal tariff. Compare against using an existing iGPU or selling a card. Include backups, disks and maintenance only where applicable.

**Verified:** the primary documentation and the website/repository publication checks reported separately. **Not verified:** local model speed/fit, stream capacity, specific container compatibility, QNAP suitability, actual fleet power, mining earnings or individual-card health. These need access to the physical machines; this report does not pretend those tests have happened.

## Sources

Primary documentation accessed 21 November 2026. Online compatibility tables can change; preserve actual installed versions with test results.

1. [Ethereum: The Merge](https://ethereum.org/roadmap/merge/).
2. [Ollama: hardware support](https://docs.ollama.com/gpu).
3. [NVIDIA: navigating GPU architecture support](https://developer.nvidia.com/blog/navigating-gpu-architecture-support-a-guide-for-nvidia-cuda-developers).
4. [Qwen: Qwen3-8B-GGUF model card](https://huggingface.co/Qwen/Qwen3-8B-GGUF).
5. [Ollama: local FAQ and multi-GPU placement](https://docs.ollama.com/faq).
6. [llama.cpp: build instructions](https://github.com/ggml-org/llama.cpp/blob/master/docs/build.md).
7. [NVIDIA: video encode/decode support matrix](https://developer.nvidia.com/video-encode-decode-support-matrix).
8. [Jellyfin: NVIDIA acceleration](https://jellyfin.org/docs/general/post-install/transcoding/hardware-acceleration/nvidia/).
9. [Jellyfin: known acceleration issues and driver-dependent session limits](https://jellyfin.org/docs/general/post-install/transcoding/hardware-acceleration/known-issues/).
10. [Jellyfin: free software media system](https://jellyfin.org/).
11. [Plex: using hardware-accelerated streaming](https://support.plex.tv/articles/115002178853-using-hardware-accelerated-streaming/).
12. [Immich: hardware transcoding](https://docs.immich.app/features/hardware-transcoding/).
13. [Immich: hardware-accelerated machine learning](https://docs.immich.app/features/ml-hardware-acceleration/).
14. [Immich: requirements](https://docs.immich.app/install/requirements/).
15. [QNAP: PCIe slot, card size and GPU compatibility checks](https://www.qnap.com/en/how-to/faq/article/check-qnap-nas-pcie-slot-specification-card-size).
16. [Immich: backup and restore](https://docs.immich.app/administration/backup-and-restore/).
