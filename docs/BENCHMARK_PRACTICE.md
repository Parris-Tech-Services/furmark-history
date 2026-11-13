# GPU benchmark interpretation and safe testing

This companion separates **historical research** from **practical testing**. It is particularly relevant when comparing dozens of second-hand graphics cards. Manufacturer guidance and benchmark-specific rules take priority over a generic checklist.

## What each tool tells you

| Program | Main purpose | Critical limitation |
|---|---|---|
| **FurMark / FurMark 2** | High-intensity GPU thermal and stability stress; benchmark mode produces a score | It can draw unusually high power and trigger protective throttling, so its score is **not a general gaming FPS rating** |
| **UNIGINE Superposition** | Repeatable graphical workload, performance score, interactive visual scene | Compare scores **only with matching preset, resolution, API and version context**. The loop stress test is in the paid editions, not the free Basic edition |
| **3DMark / Steel Nomad** | Modern synthetic graphics workloads and cross-platform comparisons where supported | Scores from different tests (Fire Strike, Time Spy, Steel Nomad, Light) are **not interchangeable**; official comparisons require equivalent tests/versions |

Primary sources: [NVIDIA FurMark safety notice](https://nvidia.custhelp.com/app/answers/detail/a_id/2603/kw/overheat), [UNIGINE Superposition editions](https://benchmark.unigine.com/superposition/), [UL Steel Nomad launch](https://benchmarks.ul.com/news/3dmark-steel-nomad-is-out-now).

## Suggested repeatable procedure for a batch of cards

1. **Identify first:** photograph the label and PCB; record card number, complete board make/model, GPU device ID, VRAM, condition and any visible damage. GPU name alone does not identify an aftermarket board.
2. **Establish a controlled tester:** record CPU, motherboard/BIOS, RAM, PSU model/wattage, OS version, graphics driver version, GPU software version, display resolution, room conditions and driver install/cleanup method.
3. **Inspect cooling and power:** confirm both fans rotate as intended, heatsink/connector conditions are acceptable and the PSU/connectors are suitable before full load.
4. **Start supervised and short:** begin with a repeatable normal benchmark and monitor temperature, clocks, fan behaviour, power reporting, obvious visual artefacts and stability. Increase stress conservatively if justified; **do not bypass GPU safety limits**.
5. **Run consistent tests:** choose one **exact FurMark benchmark preset** and one **exact Superposition preset** across comparable GPUs. Keep API, resolution, quality, duration and application version recorded. Not every legacy card supports every test.
6. **Capture results independently:** record each test's raw score, units and URL or screenshot, date/time, benchmark version and status. An external score link is supporting evidence, not a substitute for the physical card ID.
7. **Separate outcomes:** **PASS** (completed, no observed issue in this test), **FAIL** (visible issue, crash, excessive or unexpected behaviour), **NOT RUN** (unsupported/not attempted), and **INCONCLUSIVE** (environmental/driver/thermal confounder). Never call one successful benchmark proof of long-term health.
8. **Repeat anomalies before attributing them to a card:** investigate driver, PSU, cable, cooling, background activity and installation conditions. Don't continue running a test if there are signs of electrical or thermal distress.

If an older GPU cannot run a selected benchmark, **record compatibility as a constraint**, not a zero score. Separating **performance scores** from **hardware health** prevents unfair comparisons.

## Minimum result fields

`card_id, card_make, full_model, gpu_chip, vram_gb, tester_id, os_version, driver_version, test_app, test_version, test_name, preset, api, resolution, score, units, temperature_peak_c, observed_artifacts, test_status, tested_at, result_url, notes`

Record the original FurMark **score and FPS separately** if both are displayed. Do not mix score values from OpenGL/Vulkan, FurMark 1/2, the donut/knot scene, or differing resolutions. Do not compare a Superposition score with a FurMark score. Do not compare 3DMark's Steel Nomad to Steel Nomad Light numerically as if they were the same test.

## When something looks wrong

- **FurMark clocks/power fall:** this may be intentional protection; inspect vendor limits and thermals before concluding failure.
- **Performance abnormally low:** confirm matching preset, OS driver, PCIe link, power limits, ambient/cooling and CPU bottlenecks.
- **Crash or artefacts:** note exactly which program/test/phase triggered it; investigate repeatability and stop if hardware safety is in doubt.
- **Unsupported DirectX/Vulkan/VRAM:** mark not run, use an appropriate supported benchmark and keep performance groups separate.
- **Old 3DMark macOS scores:** UL invalidated affected initial June 2025 results after a compiler fix on **18 June**. [UL release notes](https://support.benchmarks.ul.com/support/solutions/articles/44002626797-3dmark-for-macos-application-release-notes)

## Evidence to retain

Keep one numbered inventory row per physical GPU, raw tool output or screenshot, original result URL, and a dated tester configuration. Before issuing a pass/fail claim, specify the testing coverage and what was **not** tested (for example, VRAM integrity, extended reliability, all output ports, or game compatibility).

> **Safety:** NVIDIA cautions that FurMark can exceed real-world game power draw and that defeating protective circuitry can permanently damage a card or void its warranty. Supervise load testing and do not treat an aggressive stress run as obligatory. [NVIDIA support](https://nvidia.custhelp.com/app/answers/detail/a_id/2603/kw/overheat)
