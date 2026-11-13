*Generated from the 2026-11-13 fleet snapshot by `tools/build_resale.py`. 41 started cards out of 100 sheet slots. Every grade below says what the recorded evidence supports; none says a card is healthy.*

## The short version

Of 41 started cards, **31 can be listed now** (3 with a clean memory test, 28 on benchmarks alone), **8 need more testing**, **1 needs the evidence fixed** and **1 should be held back**. At the observed asking range, the "list now" group is worth about **AU$3,780 to AU$5,020 gross**, and the cards that still need tests could add roughly AU$960 to AU$1,280 if they pass. Those are asking prices before fees, shipping and time, not what the cards will sell for.

## How cards are graded

| Grade | Meaning | Rule |
|---|---|---|
| **A** | Benchmarks and VRAM test passed | Three scores within range of its rig, public result verified, OCCT memory test with no errors. |
| **B** | Benchmarks passed | Three scores within range of its rig and the public result verified. Memory, outputs and fan are not yet tested. |
| **R** | Retest | A score is more than 3% under its rig's median, or the scores disagree by more than 5 points. Repeat on the same rig. |
| **I** | Incomplete | Fewer than three benchmark scores recorded. |
| **V** | Verify the result | The public result link is missing or belongs to a different card. |
| **H** | Hold: do not sell | Physical fault noted or the card is not recognised. Check it before any further test or listing. |

Rules are applied in order: hold, then verify, then incomplete, then retest, then A or B. Two thresholds drive the retest grade: a score more than **3%** under its test PC's median, or scores that disagree by more than **5 percentage points** (for example a high FurMark with a low Superposition, which usually means a settings mismatch). Both are in `tools/build_resale.py` and easy to change.

**Why rig-normalised.** Your three test PCs use different CPUs and drivers, so raw scores are not comparable across them. Each card is compared with the median of the verified cards on its own test PC. The five cards with no recorded test PC are compared with the whole batch and marked lower confidence. A card whose public result link points to a different GPU is left out of the medians.

| Test PC | Verified cards | FurMark median | Superposition median | Steel Nomad median |
|---|---|---|---|---|
| ASrock | 9 | 5,033 | 12,506 | 1,320 |
| Asus B250 | 10 | 5,007 | 12,354 | 1,310 |
| Gigabyte | 12 | 5,124 | 12,888 | 1,362 |

## Results

- **A (3):** #18, #19, #20
- **B (28):** #1, #2, #3, #5, #6, #7, #8, #9, #10, #12, #13, #16, #17, #21, #24, #26, #27, #28, #29, #30, #31, #32, #34, #35, #37, #38, #39, #41
- **R, retest (7):** #11, #14, #15, #22, #23, #25, #33
- **I, incomplete (1):** #40
- **V, verify the result (1):** #4
- **H, hold (1):** #36

The whole batch is tight: most cards sit within a few percent of their rig's median, so the retest list is short and the differences are small. A low score here is a reason to repeat the test, not evidence of a fault.

## Lots

| Lot | Cards | Grades | What to do |
|---|---|---|---|
| List now | 31 | A, B | Individually, honest about what is untested. |
| Finish tests first | 8 | R, I | Retest or complete the missing benchmarks, then re-grade. |
| Resolve the evidence | 1 | V | Find the real public result, then re-grade. |
| Hold | 1 | H | Do not list until the fault is understood. |

**Gross asking range for "list now":** AU$3,780 to AU$5,020 individually. If sold as one wholesale lot at a discount (a planning assumption, not a sourced figure): 0% off gives AU$3,780 to AU$5,020; 15% off gives AU$3,213 to AU$4,267; 30% off gives AU$2,646 to AU$3,514.

**Where the price range comes from.** The earlier audit observed November 2026 asking prices for ordinary used GTX 1070 8 GB cards on eBay Australia of about AU$135 to 158, with some ASUS examples AU$170 to 200 and more, and concluded **AU$120 to 180** is a defensible individual asking range for a correctly identified, clean, adequately tested card. This analysis splits that range by evidence: A cards (memory tested) AU$140 to 180, B cards AU$120 to 160. The split is a planning choice. It is not a market fact, and a pile sold as one lot would likely achieve less per card (see the [audit](gpu-batch-research.html)).

## What is still missing for every card

The sheet does not yet prove any of these, and a careful buyer would ask:

- **VRAM test.** Run an OCCT VRAM test and record the error count.
- **Display outputs.** Test every HDMI / DisplayPort output.
- **Fan and noise.** Check fan response at idle and moderate load; listen for rubbing.
- **Physical identity.** Numbered sticker, photo of both sides, model/revision label and a GPU-Z screenshot.
- **Board maker.** Public results show subsystem 7377:0000 (Colorful), which conflicts with the Gigabyte label. Confirm before a brand-specific listing.
- **Superposition / Steel Nomad settings.** Record the Superposition preset and API and whether standard Steel Nomad or Light was run.

Missing tests are **unknown**, not passes or fails. Each card's listing sheet carries its own checklist and an honest listing draft with the untested items left as placeholders.

## What this analysis cannot tell you

- **Health.** Short benchmark runs show a card initialised and completed three workloads. They do not show memory correctness, outputs, fan bearings or reliability over time. Only three cards (#18 to #20) have a recorded memory test.
- **Which board each card is.** The public results report subsystem 7377:0000, which the PCI-SIG registry assigns to Colorful, not Gigabyte. That conflict is unresolved.
- **Mining history, condition or warranty.** Not in the sheet.
- **A real selling price.** Only asking prices were observed. Completed sales, fees and shipping are unknown.
- **Whether 100 slots means 100 cards.** The sheet has 100 numbered slots; {len(rows)} have been started.

## Using it

- Open the [resale analysis](../resale.html) to filter by grade or test PC, sort the table, see the lots and the gap matrix, and download the grades as a CSV.
- The [sale preparation queue](../sale.html) holds the printable bench sheet and the priority order for physical inspection; this analysis tells you which cards are ready and why.
- Open a card's listing sheet from the table. It prints cleanly and includes a copyable listing draft.
- After retesting or adding results, update the sheet, run `python3 tools/sync_fleet.py` (or `tools/build_fleet.py`), then `python3 tools/build_resale.py && python3 tools/build_site.py`. Grades update from the new data.

## Sources

1. This repository's GTX 1070 audit and snapshot: [GPU_BATCH_RESEARCH.md](gpu-batch-research.html) and `data/benchmark_snapshot_{snap}.csv`.
2. UL, "How is the 3DMark Steel Nomad score calculated?" (score = average FPS x 100): https://support.benchmarks.ul.com/support/solutions/articles/44002528064-how-is-the-3dmark-steel-nomad-score-calculated-
3. NVIDIA, FurMark power and hardware-safety warning: https://nvidia.custhelp.com/app/answers/detail/a_id/2603/
4. PCI-SIG vendor registry (0x7377 = Shenzhen Colorful Yugong): https://pcisig.com/membership/member-companies
5. eBay Australia used GTX 1070 8GB listings and Gumtree asking prices, as observed in November 2026 (see the audit's source list).
