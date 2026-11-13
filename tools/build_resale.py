#!/usr/bin/env python3
"""Resale-readiness analysis for the GTX 1070 batch.

Reads  site/data/batch.json   (the fleet data kept in sync with your sheet by tools/sync_fleet.py)
Writes site/data/resale.json   grades, rig-normalised scores, gaps, lots (read by site/resale.html)
       site/data/resale-grades.csv  and data/resale_grades_<snapshot>.csv  (one row per started card)
       site/cards/card-NN.html  one printable listing sheet per started card
       docs/RESALE_ANALYSIS.md  the written method and findings (rendered by tools/build_site.py)

Run:  python3 tools/build_resale.py && python3 tools/build_site.py

Rules are conservative on purpose. A grade says what the evidence supports, never that a card is healthy:
benchmarks prove a card initialised and completed short high-load runs. They do not prove memory,
display outputs, fan bearings or sustained reliability.
"""
import csv, html, json, os, statistics as st, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = os.path.join(ROOT, "site")
BASE = "https://parris-tech-services.github.io/furmark-history/"

# ---- Tunable rules (documented in docs/RESALE_ANALYSIS.md) -------------------------------------------------
RETEST_BELOW_PCT = -3.0      # any score this far under its rig median means: retest on the same rig
SPREAD_PCT_POINTS = 5.0      # scores that disagree by more than this many points suggest a settings mismatch
MIN_RIG_CARDS = 4            # a rig needs this many verified cards before its median is used
# Asking-price planning ranges in AU$ per card. Base range AU$120-180 comes from docs/GPU_BATCH_RESEARCH.md
# (observed Nov 2026 asking prices, not completed sales). The A/B split is a planning choice, not a market fact.
ASK = {"A": (140, 180), "B": (120, 160)}
LOT_DISCOUNTS = (0, 15, 30)  # per-card discount for a single wholesale lot: a planning assumption, not sourced

GRADES = {
    "A": ("Benchmarks and VRAM test passed", "ok", "Three scores within range of its rig, public result verified, OCCT memory test with no errors."),
    "B": ("Benchmarks passed", "ok", "Three scores within range of its rig and the public result verified. Memory, outputs and fan are not yet tested."),
    "R": ("Retest", "note", "A score is more than 3% under its rig's median, or the scores disagree by more than 5 points. Repeat on the same rig."),
    "I": ("Incomplete", "note", "Fewer than three benchmark scores recorded."),
    "V": ("Verify the result", "warn", "The public result link is missing or belongs to a different card."),
    "H": ("Hold: do not sell", "warn", "Physical fault noted or the card is not recognised. Check it before any further test or listing."),
}
ORDER = ["A", "B", "R", "I", "V", "H"]

# Things a buyer would reasonably expect and the sheet does not yet prove.
GAPS = [
    ("vram", "VRAM test", "Run an OCCT VRAM test and record the error count."),
    ("outputs", "Display outputs", "Test every HDMI / DisplayPort output."),
    ("fan", "Fan and noise", "Check fan response at idle and moderate load; listen for rubbing."),
    ("identity", "Physical identity", "Numbered sticker, photo of both sides, model/revision label and a GPU-Z screenshot."),
    ("board", "Board maker", "Public results show subsystem 7377:0000 (Colorful), which conflicts with the Gigabyte label. Confirm before a brand-specific listing."),
    ("preset", "Superposition / Steel Nomad settings", "Record the Superposition preset and API and whether standard Steel Nomad or Light was run."),
]


def money(n):
    return "AU$%s" % format(int(n), ",")


def median_of(vals):
    return st.median(vals) if vals else None


def analyse(cards):
    verified = [c for c in cards if c["status"] == "MATCHED_GTX1070"]
    metrics = ("fm", "sp", "sn")
    rig_med, rig_n = {}, {}
    for rig in {c["rig"] for c in cards if c["rig"] != "unlabelled"}:  # unlabelled cards use the batch median
        group = [c for c in verified if c["rig"] == rig]
        rig_n[rig] = len(group)
        for k in metrics:
            vals = [c[k] for c in group if c.get(k) is not None]
            if len(group) >= MIN_RIG_CARDS and len(vals) >= MIN_RIG_CARDS:
                rig_med[(rig, k)] = median_of(vals)
    batch_med = {k: median_of([c[k] for c in verified if c.get(k) is not None]) for k in metrics}
    out = []
    for c in cards:
        row = {"card": c["card"], "rig": c["rig"], "gpuz": bool(c["gpuz"]), "status": c["status"], "note": c.get("note"),
               "url": c.get("url"), "occt": c.get("occt"), "pci": c.get("pci"), "temp": c.get("temp"), "power": c.get("power"),
               "clockmax": c.get("clockmax"), "tested": c.get("tested")}
        for k in metrics: row[k] = c.get(k)
        pct, basis = {}, {}
        for k in metrics:
            if c.get(k) is None: continue
            med = rig_med.get((c["rig"], k))
            if med is not None:
                pct[k] = (c[k] / med - 1) * 100; basis[k] = "rig"
            elif batch_med.get(k):
                pct[k] = (c[k] / batch_med[k] - 1) * 100; basis[k] = "batch"
        row["pct"] = {k: round(v, 1) for k, v in pct.items()}
        row["basis"] = "rig" if pct and all(basis[k] == "rig" for k in pct) else "batch"
        row["spread"] = round(max(pct.values()) - min(pct.values()), 1) if len(pct) >= 2 else None
        have = [k for k in metrics if c.get(k) is not None]
        reasons = []
        occt_ok = "no error" in (c.get("occt") or "").lower()
        if c["status"] == "FAN_NOISE_STOP" or c.get("note") or not c["gpuz"]:
            grade = "H"; reasons.append(c.get("note") or "Card flagged; test stopped")
        elif c["status"] == "LINK_SCORE_MISMATCH" or (c.get("fm") is not None and not c.get("url")):
            grade = "V"; reasons.append("Public FurMark link opens a different GPU" if c["status"] == "LINK_SCORE_MISMATCH" else "No public result link")
        elif len(have) < 3:
            grade = "I"; reasons.append("Missing: " + ", ".join({"fm": "FurMark", "sp": "Superposition", "sn": "Steel Nomad"}[k] for k in metrics if k not in have))
        else:
            low = [k for k in have if pct.get(k, 0) < RETEST_BELOW_PCT]
            if low:
                grade = "R"; reasons.append("Under rig median by more than 3%: " + ", ".join({"fm": "FurMark", "sp": "Superposition", "sn": "Steel Nomad"}[k] for k in low))
            elif row["spread"] is not None and row["spread"] > SPREAD_PCT_POINTS:
                grade = "R"; reasons.append("Scores disagree by %.1f points: check settings" % row["spread"])
            else:
                grade = "A" if occt_ok else "B"
        row["grade"], row["reasons"] = grade, reasons
        gaps = ["outputs", "identity", "preset"]
        if not occt_ok: gaps.insert(0, "vram")
        if c["status"] != "FAN_NOISE_STOP": gaps.insert(2, "fan")
        if c["status"] == "MATCHED_GTX1070" and (c.get("pci") or "").find("7377") >= 0: gaps.append("board")
        # keep the display order of GAPS
        row["gaps"] = [g[0] for g in GAPS if g[0] in gaps]
        lo, hi = ASK.get(grade, (None, None))
        row["ask"] = [lo, hi] if lo else None
        out.append(row)
    return out, {"%s|%s" % k: round(v, 1) for k, v in rig_med.items()}, rig_n, {k: round(v, 1) for k, v in batch_med.items()}


def lots(rows):
    defs = [
        ("list", "List now", "Individually, honest about what is untested.", ["A", "B"]),
        ("finish", "Finish tests first", "Retest or complete the missing benchmarks, then re-grade.", ["R", "I"]),
        ("evidence", "Resolve the evidence", "Find the real public result, then re-grade.", ["V"]),
        ("hold", "Hold", "Do not list until the fault is understood.", ["H"]),
    ]
    out = []
    for key, name, note, gs in defs:
        cs = [r for r in rows if r["grade"] in gs]
        lot = {"key": key, "name": name, "note": note, "grades": gs, "cards": [r["card"] for r in cs], "count": len(cs)}
        if key == "list":
            lo = sum(ASK[r["grade"]][0] for r in cs); hi = sum(ASK[r["grade"]][1] for r in cs)
            lot["ask_total"] = [lo, hi]
            lot["wholesale"] = [{"discount": d, "total": [round(lo * (100 - d) / 100), round(hi * (100 - d) / 100)]} for d in LOT_DISCOUNTS]
        if key == "finish":
            lo = sum(ASK["B"][0] for _ in cs); hi = sum(ASK["B"][1] for _ in cs)
            lot["upside_if_pass"] = [lo, hi]
        out.append(lot)
    return out


def listing_text(r):
    f = lambda v: format(int(v), ",")
    lines = ["NVIDIA GeForce GTX 1070 8GB graphics card (Pascal), used."]
    if r["grade"] in ("A", "B"):
        lines.append("Recognised by GPU-Z and tested with FurMark 2.11 (OpenGL, 1080p, 60 s): %s points (about %d FPS)." % (f(r["fm"]), round(r["fm"] / 60)))
        lines.append("Also tested: UNIGINE Superposition %s; 3DMark Steel Nomad %s (about %.1f FPS at 4K)." % (f(r["sp"]), f(r["sn"]), r["sn"] / 100))
        if r["temp"]: lines.append("Peak reported GPU temperature during the FurMark run: %d °C." % r["temp"])
        lines.append("Memory test (OCCT VRAM): %s." % ("passed, no errors" if r["grade"] == "A" else "not yet run [FILL IN BEFORE LISTING]"))
        lines.append("Display outputs and fan: [CHECK AND FILL IN BEFORE LISTING].")
        lines.append("Board maker / model: [CONFIRM FROM THE CARD'S LABEL BEFORE LISTING].")
        lines.append("Sold as tested; no warranty implied.")
    else:
        lines.append("NOT READY TO LIST. " + "; ".join(r["reasons"]) + ".")
    return "\n".join(lines)


def card_page(r, template):
    G = GRADES[r["grade"]]
    cls = {"ok": "ok", "note": "note", "warn": "warn"}[G[1]]
    def cell(label, v): return "<div><span>%s</span><b>%s</b></div>" % (html.escape(label), v)
    nm = lambda k, v: (format(int(v), ",") if v is not None else "not recorded")
    pc = lambda k: ("%+.1f%% vs %s median" % (r["pct"][k], "rig" if r["basis"] == "rig" else "batch")) if k in r["pct"] else "no comparison"
    scores = "".join(cell(l, nm(k, r[k]) + ("<small>%s</small>" % pc(k) if r[k] is not None else "")) for k, l in (("fm", "FurMark 1080p"), ("sp", "Superposition"), ("sn", "Steel Nomad")))
    tele = "".join(cell(l, v) for l, v in (("Peak temp", "%d °C" % r["temp"] if r["temp"] else "–"), ("Peak power (est.)", "%d W" % r["power"] if r["power"] else "–"),
                                           ("Max clock", "%d MHz" % r["clockmax"] if r["clockmax"] else "–"), ("Test PC", html.escape(r["rig"])), ("PCI ID", html.escape(r["pci"] or "–"))))
    gaps = "".join('<li><label><input type="checkbox"> <span><b>%s</b>: %s</span></label></li>' % (html.escape(g[1]), html.escape(g[2])) for g in GAPS if g[0] in r["gaps"])
    reasons = "".join("<li>%s</li>" % html.escape(x) for x in r["reasons"]) or "<li>No concerns found in the recorded scores.</li>"
    link = ('<a href="%s" target="_blank" rel="noopener">Open the public FurMark result</a>' % html.escape(r["url"])) if r["url"] else "No public link recorded"
    ask = ("%s to %s (planning range, not a sold price)" % (money(r["ask"][0]), money(r["ask"][1]))) if r["ask"] else "No price until the grade improves"
    return (template.replace("{{N}}", "%02d" % r["card"]).replace("{{NUM}}", str(r["card"])).replace("{{GRADE}}", r["grade"])
            .replace("{{GRADENAME}}", html.escape(G[0])).replace("{{GRADEWHY}}", html.escape(G[2])).replace("{{CLS}}", cls)
            .replace("{{SCORES}}", scores).replace("{{TELE}}", tele).replace("{{GAPS}}", gaps).replace("{{REASONS}}", reasons)
            .replace("{{LINK}}", link).replace("{{ASK}}", ask).replace("{{LISTING}}", html.escape(listing_text(r))).replace("{{BASE}}", BASE))


CARD_TEMPLATE = """<!doctype html>
<html lang="en" data-bench="fleet"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Card #{{NUM}} listing sheet · GPU Benchmark Lore</title><meta name="description" content="Evidence sheet and listing draft for GTX 1070 card #{{NUM}}.">
<meta name="robots" content="noindex"><meta name="theme-color" content="#07080d"><meta name="color-scheme" content="dark light">
<link rel="icon" href="../assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="../assets/style.css">
<style>
@font-face{font-family:'Space Grotesk';font-weight:400 700;font-display:swap;src:url(../assets/fonts/space-grotesk-latin.woff2) format('woff2')}
main{max-width:860px;margin:0 auto;padding:36px 20px 80px}
h1{font:700 clamp(30px,5vw,48px)/1.08 var(--f-ui);letter-spacing:-.02em;margin:10px 0}
h2{font:700 20px var(--f-ui);margin:34px 0 10px}
.grade{display:flex;gap:16px;align-items:center;border:1px solid var(--line);border-radius:18px;padding:18px 20px;background:var(--surface)}
.grade b.big{font:700 54px var(--f-ui);line-height:1;color:var(--acc2)}
.grade.warn b.big{color:#ff8d8d}.grade.note b.big{color:#ffc15a}
.grade p{margin:0;color:var(--mut)}
.facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px}
.facts div{border:1px solid var(--line);border-radius:14px;padding:12px 14px;background:var(--surface)}
.facts span{display:block;font:600 11px var(--f-mono);letter-spacing:.08em;text-transform:uppercase;color:var(--faint)}
.facts b{font:700 22px var(--f-ui)}.facts small{display:block;color:var(--mut);font-size:12px}
ul.gaps{list-style:none;padding:0;display:grid;gap:8px}ul.gaps li{border:1px solid var(--line);border-radius:12px;padding:10px 12px}
ul.gaps label{display:flex;gap:10px;align-items:flex-start;cursor:pointer;color:var(--mut);font-size:15px}ul.gaps input{margin-top:4px;width:18px;height:18px}
textarea{width:100%;min-height:210px;background:var(--bg2);border:1px solid var(--line);border-radius:12px;color:var(--ink);padding:12px 14px;font:15px/1.5 var(--f-ui)}
.row{display:flex;gap:10px;flex-wrap:wrap;margin-top:10px}
.crumbs{font:13px var(--f-mono);color:var(--faint)}
@media print{.top,.row,footer.site,.noprint{display:none!important}html,body{background:#fff!important;color:#000!important}.facts div,.grade{border-color:#999;background:#fff}textarea{border:0;min-height:0}}
</style></head>
<body>
<a class="skiplink" href="#maincontent">Skip to main content</a>
<header class="top"><div class="wrap"><a class="brand" href="../resale.html" aria-label="Back to the resale analysis"><span class="logo"></span><span class="bt">GPU Benchmark Lore</span></a>
<nav class="nav" aria-label="Main"><a href="../resale.html">Resale analysis</a><a href="../index.html#lab">GPU lab</a></nav></div></header>
<main id="maincontent">
<p class="crumbs"><a href="../resale.html">Resale analysis</a> / card #{{NUM}}</p>
<h1>GTX 1070 card #{{NUM}}</h1>
<section aria-labelledby="g"><div class="grade {{CLS}}"><b class="big" aria-hidden="true">{{GRADE}}</b><div><h2 id="g" style="margin:0">{{GRADENAME}}</h2><p>{{GRADEWHY}}</p></div></div>
<ul style="color:var(--mut)">{{REASONS}}</ul></section>
<section aria-labelledby="s"><h2 id="s">Benchmark scores</h2><div class="facts">{{SCORES}}</div></section>
<section aria-labelledby="t"><h2 id="t">Public telemetry and test PC</h2><div class="facts">{{TELE}}</div><p style="color:var(--mut);font-size:14px">{{LINK}}. Telemetry is software-estimated from the public result, not measured at the wall.</p></section>
<section aria-labelledby="k"><h2 id="k">Still to check before listing</h2><ul class="gaps">{{GAPS}}</ul></section>
<section aria-labelledby="p"><h2 id="p">Asking-price planning range</h2><p style="color:var(--mut)">{{ASK}}. Observed asking prices, before fees, shipping and your time.</p></section>
<section aria-labelledby="l"><h2 id="l">Listing draft</h2><p style="color:var(--mut);font-size:14px">Replace every bracketed item before publishing. Do not claim anything the evidence above does not support.</p>
<label for="draft" class="sr">Listing draft text</label><textarea id="draft">{{LISTING}}</textarea>
<div class="row noprint"><button class="btn" id="copy" type="button">Copy draft</button><button class="btn ghost" type="button" onclick="window.print()">Print this sheet</button><a class="btn ghost" href="../read/resale-analysis.html">How the grade works</a></div></section>
</main>
<script src="../assets/app.js" data-base="../"></script>
<script>document.getElementById("copy").onclick=function(){var t=document.getElementById("draft"),b=this;t.select();(navigator.clipboard?navigator.clipboard.writeText(t.value):Promise.reject()).then(function(){b.textContent="Copied ✓"},function(){document.execCommand("copy");b.textContent="Copied ✓"})}</script>
</body></html>
"""


def write_csv(rows, path):
    cols = ["card", "grade", "grade_name", "test_pc", "furmark", "superposition", "steel_nomad", "furmark_pct_vs_median", "superposition_pct_vs_median",
            "steel_nomad_pct_vs_median", "comparison_basis", "spread_points", "peak_temp_c", "peak_power_w_est", "occt", "status", "reasons", "still_to_check", "ask_low_aud", "ask_high_aud", "public_result"]
    with open(path, "w", newline="", encoding="utf-8") as fh:
        w = csv.writer(fh); w.writerow(cols)
        for r in rows:
            w.writerow([r["card"], r["grade"], GRADES[r["grade"]][0], r["rig"], r["fm"], r["sp"], r["sn"], r["pct"].get("fm"), r["pct"].get("sp"), r["pct"].get("sn"),
                        r["basis"], r["spread"], r["temp"], r["power"], r["occt"] or "", r["status"], "; ".join(r["reasons"]),
                        "; ".join(dict((g[0], g[1]) for g in GAPS)[x] for x in r["gaps"]), r["ask"][0] if r["ask"] else "", r["ask"][1] if r["ask"] else "", r["url"] or ""])


def doc(rows, lot_list, rig_med, rig_n, batch_med, snap, slots):
    by = {g: [r["card"] for r in rows if r["grade"] == g] for g in ORDER}
    nums = lambda g: ", ".join("#%d" % n for n in by[g]) or "none"
    lst = next(l for l in lot_list if l["key"] == "list")
    fin = next(l for l in lot_list if l["key"] == "finish")
    rig_rows = "\n".join("| %s | %d | %s | %s | %s |" % (rig, rig_n[rig], *[(format(int(rig_med[(rig, k)]), ",") if (rig, k) in rig_med else "not used") for k in ("fm", "sp", "sn")])
                         for rig in sorted(rig_n))
    plural = lambda n, one, many: one if n == 1 else many
    return f"""*Generated from the {snap} fleet snapshot by `tools/build_resale.py`. {len(rows)} started cards out of {slots} sheet slots. Every grade below says what the recorded evidence supports; none says a card is healthy.*

## The short version

Of {len(rows)} started cards, **{len(by['A']) + len(by['B'])} can be listed now** ({len(by['A'])} with a clean memory test, {len(by['B'])} on benchmarks alone), **{len(by['R']) + len(by['I'])} need more testing**, **{len(by['V'])} {plural(len(by['V']), 'needs', 'need')} the evidence fixed** and **{len(by['H'])} {plural(len(by['H']), 'should', 'should')} be held back**. At the observed asking range, the "list now" group is worth about **{money(lst['ask_total'][0])} to {money(lst['ask_total'][1])} gross**, and the cards that still need tests could add roughly {money(fin['upside_if_pass'][0])} to {money(fin['upside_if_pass'][1])} if they pass. Those are asking prices before fees, shipping and time, not what the cards will sell for.

## How cards are graded

| Grade | Meaning | Rule |
|---|---|---|
""" + "\n".join("| **%s** | %s | %s |" % (g, GRADES[g][0], GRADES[g][2]) for g in ORDER) + f"""

Rules are applied in order: hold, then verify, then incomplete, then retest, then A or B. Two thresholds drive the retest grade: a score more than **{abs(RETEST_BELOW_PCT):.0f}%** under its test PC's median, or scores that disagree by more than **{SPREAD_PCT_POINTS:.0f} percentage points** (for example a high FurMark with a low Superposition, which usually means a settings mismatch). Both are in `tools/build_resale.py` and easy to change.

**Why rig-normalised.** Your three test PCs use different CPUs and drivers, so raw scores are not comparable across them. Each card is compared with the median of the verified cards on its own test PC. The five cards with no recorded test PC are compared with the whole batch and marked lower confidence. A card whose public result link points to a different GPU is left out of the medians.

| Test PC | Verified cards | FurMark median | Superposition median | Steel Nomad median |
|---|---|---|---|---|
{rig_rows}

## Results

- **A ({len(by['A'])}):** {nums('A')}
- **B ({len(by['B'])}):** {nums('B')}
- **R, retest ({len(by['R'])}):** {nums('R')}
- **I, incomplete ({len(by['I'])}):** {nums('I')}
- **V, verify the result ({len(by['V'])}):** {nums('V')}
- **H, hold ({len(by['H'])}):** {nums('H')}

The whole batch is tight: most cards sit within a few percent of their rig's median, so the retest list is short and the differences are small. A low score here is a reason to repeat the test, not evidence of a fault.

## Lots

| Lot | Cards | Grades | What to do |
|---|---|---|---|
""" + "\n".join("| %s | %d | %s | %s |" % (l["name"], l["count"], ", ".join(l["grades"]), l["note"]) for l in lot_list) + f"""

**Gross asking range for "list now":** {money(lst['ask_total'][0])} to {money(lst['ask_total'][1])} individually. If sold as one wholesale lot at a discount (a planning assumption, not a sourced figure): """ + "; ".join("%d%% off gives %s to %s" % (w["discount"], money(w["total"][0]), money(w["total"][1])) for w in lst["wholesale"]) + f""".

**Where the price range comes from.** The earlier audit observed November 2026 asking prices for ordinary used GTX 1070 8 GB cards on eBay Australia of about AU$135 to 158, with some ASUS examples AU$170 to 200 and more, and concluded **AU$120 to 180** is a defensible individual asking range for a correctly identified, clean, adequately tested card. This analysis splits that range by evidence: A cards (memory tested) AU$140 to 180, B cards AU$120 to 160. The split is a planning choice. It is not a market fact, and a pile sold as one lot would likely achieve less per card (see the [audit](gpu-batch-research.html)).

## What is still missing for every card

The sheet does not yet prove any of these, and a careful buyer would ask:

""" + "\n".join("- **%s.** %s" % (g[1], g[2]) for g in GAPS) + """

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
"""


def main():
    data = json.load(open(os.path.join(SITE, "data", "batch.json"), encoding="utf-8"))
    cards = data["cards"]
    rows, rig_med, rig_n, batch_med = analyse(cards)
    lot_list = lots(rows)
    # ---- self-checks: fail loudly rather than publish a wrong grade ----
    assert len(rows) == len(cards) and all(r["grade"] in GRADES for r in rows)
    for r in rows:
        if r["status"] == "FAN_NOISE_STOP": assert r["grade"] == "H", r
        if r["status"] == "LINK_SCORE_MISMATCH": assert r["grade"] == "V", r
        if r["grade"] in ("A", "B"): assert all(r[k] is not None for k in ("fm", "sp", "sn")) and r["ask"], r
        if r["grade"] == "A": assert "no error" in (r["occt"] or "").lower(), r
    assert sum(l["count"] for l in lot_list) == len(rows)
    snap = data["snapshot"]
    out = {"snapshot": snap, "slots": data["slots"], "started": len(rows), "rules": {"retest_below_pct": RETEST_BELOW_PCT, "spread_points": SPREAD_PCT_POINTS, "min_rig_cards": MIN_RIG_CARDS},
           "ask": ASK, "grades": {g: {"name": GRADES[g][0], "tone": GRADES[g][1], "rule": GRADES[g][2]} for g in ORDER}, "order": ORDER,
           "gaps": [{"id": g[0], "label": g[1], "todo": g[2]} for g in GAPS], "rig_median": rig_med, "rig_count": rig_n, "batch_median": batch_med,
           "lots": lot_list, "cards": rows}
    json.dump(out, open(os.path.join(SITE, "data", "resale.json"), "w", encoding="utf-8"), separators=(",", ":"), ensure_ascii=False)
    os.makedirs(os.path.join(SITE, "cards"), exist_ok=True)
    for r in rows:
        open(os.path.join(SITE, "cards", "card-%02d.html" % r["card"]), "w", encoding="utf-8").write(card_page(r, CARD_TEMPLATE))
    write_csv(rows, os.path.join(SITE, "data", "resale-grades.csv"))
    write_csv(rows, os.path.join(ROOT, "data", "resale_grades_%s.csv" % snap))
    open(os.path.join(ROOT, "docs", "RESALE_ANALYSIS.md"), "w", encoding="utf-8").write(doc(rows, lot_list, {tuple(k.split("|")): v for k, v in rig_med.items()}, rig_n, batch_med, snap, data["slots"]))
    from collections import Counter
    print("grades:", dict(Counter(r["grade"] for r in rows)), "| lots:", {l["key"]: l["count"] for l in lot_list}, "| list-now ask:", lot_list[0]["ask_total"])


if __name__ == "__main__":
    main()
