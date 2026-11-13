# Source audit — 13 November 2026

This records the changes made during a source-first review of the three histories, the podcast scripts, and the published entry point. **Source verification is about specific claims, not blanket certification that every external web link or historical assertion is independently proven.** Publisher and developer statements are attributed; marketing superlatives, benchmark-count totals, and forum anecdotes are not independently audited.

## Confirmed corrections and additions

| Claim | Outcome | Evidence |
|---|---|---|
| FurMark first launched in 2007; month unknown | **Refined:** JeGX wrote on 26 Aug 2007 that the *fur-rendering benchmark* launched four days earlier, implying **about 22 Aug 2007**. Exact independently verified binary timestamp remains open | [JeGX's contemporary post](https://www.ozone3d.net/blogs/lab/20070826/fur-rendering-benchmark/) |
| FurMark is harmless when GPU protection is overridden | **Do not infer safety from a successful run.** NVIDIA explicitly warns against bypassing GPU protection; the term *power virus* does not imply malware | [NVIDIA support](https://nvidia.custhelp.com/app/answers/detail/a_id/2603/kw/overheat) |
| 3DMark2000 was released December 2000 | **False:** UL's own history says **December 1999** | [UL history](https://benchmarks.ul.com/about) |
| 3DMark99 released 26 or 28 October 1998 | **26 Oct 1998 confirmed** by the original press release preserved by UL | [UL historical press release](https://benchmarks.ul.com/news/20408) |
| Futuremark acquired 31 Oct or Nov 2014 | **Both describe different events:** transaction closed **31 Oct 2014**; announcement **3 Nov 2014** | [UL's 3 Nov announcement](https://www.ul.com/news/ul-signals-strategic-expansion-performance-benchmarking-services-futuremark-acquisition) |
| Superposition only has three editions | **Outdated:** 1.1 manual documents Basic/Advanced/Pro, but the live store now lists **Basic, Advanced, Professional and Enterprise** | [UNIGINE product page](https://benchmark.unigine.com/superposition/) |
| Superposition has a free loop stress-test | **Incorrect implication:** official feature matrix places loop stress testing with extended/paid editions, not Basic | [UNIGINE product page](https://benchmark.unigine.com/superposition/) |
| Superposition 1.1 changed the score workload | **No:** UNIGINE says its measurement and workload stayed the same between versions 1.0 and 1.1 | [UNIGINE 12 Apr 2019 release](https://unigine.com/news/2019/superposition-benchmark-1-1-free-vr-to-everyone) |
| Superposition 1.0 launched 11 or 12 Apr 2017 | **11 Apr 2017** supported by a dated contemporary launch report and archived installer; 12 Apr is later coverage | [TechPowerUp launch](https://www.techpowerup.com/232288/unigine-superposition-1-0-benchmark-released), [installer archive](https://www.techpowerup.com/download/unigine-superposition/) |
| 3DMark (2013) scores universally comparable between platforms | **Too broad:** Windows launched in Feb, Android in Apr, iOS in Sep; compare **the same test** under rules, not unrelated benchmark scores | [UL history](https://benchmarks.ul.com/about), [Android release notes](https://support.benchmarks.ul.com/support/solutions/articles/44002142020-3dmark-android-application-release-notes) |
| Steel Nomad standard and Light have the same resolution | **False:** standard is native **4K**; Light is **2560×1440** | [UL launch](https://benchmarks.ul.com/news/3dmark-steel-nomad-is-out-now), [UL Light overview](https://support.benchmarks.ul.com/support/solutions/articles/44002528070-overview-of-steel-nomad-light) |
| All June 2025 Mac results are valid | **False:** compiler issue affected Steel Nomad, Light and Solar Bay results from the initial Mac release; a fix shipped **18 Jun 2025** and UL invalidated affected results | [UL macOS release notes](https://support.benchmarks.ul.com/support/solutions/articles/44002626797-3dmark-for-macos-application-release-notes) |
| The next path-traced 3DMark benchmark has an announced title/date | **Not established:** June 2026 announcement confirms **Thermal Grizzly** as first sponsor; Seasonic joined in July. No release date/name was verified here | [UL June 2026 announcement](https://benchmarks.ul.com/news/announcing-our-next-generation-3dmark-gpu-benchmark-and-its-first-sponsor), [UL news](https://benchmarks.ul.com/news) |
| FurMark 2.11.0.4 on 30 Oct 2026 | **Corroborated** by distributed upstream release notes; do not confuse upstream release date and package listing date | [Flathub upstream release notes](https://flathubupdates.popey.com/app/com.geeks3d.furmark) |

## Additional items brought into the history

- The early **August 2007** developer account documents contemporary temperature and power-supply anecdotes, which are **not** proof that FurMark itself caused a specific hardware failure.
- The April 2019 UNIGINE release says Superposition 1.0 and 1.1 use an unchanged workload, an important exception to blanket "different versions always incomparable" advice.
- The **18 June 2025** 3DMark for macOS compiler correction is essential when interpreting historic results.
- Clarified the difference between historical *power-virus* rhetoric, measured GPU power limiting, and genuine malicious software.
- Added [benchmark testing and score interpretation](BENCHMARK_PRACTICE.md), including a repeatable procedure for comparing many graphics cards.

## Remaining uncertainties / limits

- **FurMark's exact original binary release timestamp:** 22 Aug 2007 is inferred from the author's wording, not authenticated installer metadata.
- **AMD exe-rename protection bypass:** forum account only; no authenticated vendor technical notice in the material checked. Keep as a caveated anecdote.
- **FurMark fur shader internals:** no verified original shader implementation identified.
- **3DMark2000 exact day:** the month/year are primary-source confirmed; a specific day would need a dated original announcement.
- **Steel Nomad public Linux release:** UL's launch promised support; no independent public release confirmation was obtained in this review. Do not turn "not confirmed" into "impossible."
- **Next 3DMark path-traced benchmark:** source claims are announcements; no verified release name/date.
- **Company reported adoption numbers** for Superposition, Steel Nomad and 3DMark are *their own published counts* rather than independently audited statistics.
- **Source reachability:** some older Geeks3D/third-party/forum pages were not accessible to the current reviewer, although their URLs and attributed material remain in the histories. Do not describe those as independently re-read during this audit.
- **Derived media:** existing MP3 files were produced from earlier scripts and have *not* been re-synthesised. The corrected text scripts and research are authoritative; listen to the old recordings with this errata in view. The FurMark PDF is generated separately from the corrected text by the publishing workflow.

## Source hierarchy and change policy

1. Contemporary author/vendor statements and historical archived press releases for dates, release features and technical descriptions.
2. Verified contemporary tech reporting as corroboration, with article date separated from launch date.
3. Independent project/distribution archives for version/date cross-checking.
4. Wikipedia, forum comments and search-result summaries are leads or context, **not independent proof** when contradicted by a primary source.

For scores, a published leaderboard entry is evidence that a score was uploaded, **not** proof of the board's exact make/model, condition, authenticity, or suitability for commercial sale.

_This audit reflects sources checked on 13 November 2026 and is not a live release monitor._
