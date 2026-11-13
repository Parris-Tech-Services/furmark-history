#!/usr/bin/env python3
"""Offline consistency checks for the benchmark histories and their publishing inputs."""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
errors = []
def require(ok, message):
    if not ok:
        errors.append(message)

docs = ("docs/HISTORY.md", "docs/SUPERPOSITION.md", "docs/3DMARK_STEEL_NOMAD.md")
for name in docs:
    text = (ROOT / name).read_text(encoding="utf-8")
    require("## Sources" in text, f"{name}: missing sources")
    prose, _, sources = text.partition("## Sources")
    cited = {int(n) for n in re.findall(r"\[(\d+)\]", prose)}
    defined = {int(n) for n in re.findall(r"(?m)^(\d+)\.\s", sources)}
    require(not (cited - defined), f"{name}: missing source definitions {sorted(cited-defined)}")
    require(not (defined - cited), f"{name}: unused source definitions {sorted(defined-cited)}")
    require(defined == set(range(1, max(defined, default=0) + 1)), f"{name}: non-consecutive source numbers")
    require(len(text) > 1000, f"{name}: unexpectedly short")

fur = (ROOT / docs[0]).read_text(encoding="utf-8")
sp = (ROOT / docs[1]).read_text(encoding="utf-8")
mark = (ROOT / docs[2]).read_text(encoding="utf-8")
require("22 August 2007" in fur and "inferred" in fur.lower(), "FurMark launch date/caveat missing")
require("NVIDIA" in fur and "over-current" in fur, "Missing FurMark power protection warning")
require("Enterprise" in sp and "measurement" in sp.lower(), "Missing Superposition licensing / score note")
require("| 3DMark2000 | **Dec 1999**" in mark, "3DMark2000 date regression")
require("18 Jun 2025" in mark, "Missing 3DMark macOS invalidated-score correction")
require("December 2000" not in mark and "| Dec 2000 |" not in mark, "Old erroneous 3DMark2000 date remains")
require("19. UL Benchmarks" in mark, "Original UL timeline source missing")
for name in ("docs/SOURCE_AUDIT_2026-11-13.md", "docs/BENCHMARK_PRACTICE.md"):
    require((ROOT / name).is_file(), f"{name}: missing companion")
for name in ("podcast/script.txt", "podcast/superposition_script.txt", "podcast/steelnomad_script.txt"):
    s = (ROOT / name).read_text(encoding="utf-8")
    lines = [line for line in s.splitlines() if line and not line.startswith("#")]
    require(all(re.match(r"^[A-Z]+:", line) for line in lines), f"{name}: malformed speaker line")
    require(len(lines) >= 20, f"{name}: unexpected lack of dialogue")
readme = (ROOT / "README.md").read_text(encoding="utf-8")
webpage = (ROOT / "site/index.html").read_text(encoding="utf-8")
require("SOURCE_AUDIT_2026-11-13.md" in readme and "archival" in readme, "README missing audit and stale-audio notice")
require("SOURCE_AUDIT_2026-11-13.md" in webpage and "predate the corrections" in webpage, "Site missing audit/audio notice")
for name in ("README.md", "site/index.html"):
    require("BENCHMARK_PRACTICE.md" in (ROOT / name).read_text(encoding="utf-8"), f"{name}: missing safety guide link")
if errors:
    for issue in errors: print("FAIL:", issue, file=sys.stderr)
    raise SystemExit(1)
print("OK: source indices, primary corrections, scripts, audit, safety guide and site cross-links")
