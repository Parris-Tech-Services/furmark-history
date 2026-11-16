#!/usr/bin/env python3
"""Best-effort read-only audit of unverified FurMark result URLs.

This NEVER auto-promotes a GPU to sale-ready. A public page can mention a score
and model in unrelated content; physical identity and result ownership still
require confirmation. Failure to fetch a page is not evidence the GPU failed.
"""
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from html import unescape
import json
from pathlib import Path
import re
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
batch = json.loads((ROOT / "site/data/batch.json").read_text(encoding="utf-8"))
pending = [c for c in batch["cards"] if c.get("status") in ("UNAUDITED", "LINK_SCORE_MISMATCH") and c.get("url")]
url_pattern = re.compile(r"https://www\.gpumagick\.com/scores/\d+")


def inspect(c):
    answer = {
        "card": c["card"], "url": c["url"], "recorded_score": c.get("fm"),
        "status": c.get("status"), "verification": "not_verified"
    }
    if not url_pattern.fullmatch(c["url"]):
        answer["reason"] = "Invalid or unsupported URL"
        return answer
    try:
        request = Request(c["url"], headers={"User-Agent": "Mozilla/5.0 (compatible; public-resale-evidence-check/1.0)"})
        with urlopen(request, timeout=10) as response:
            answer["http_status"] = response.status
            content = response.read(1000000).decode("utf-8", "replace")
        title_match = re.search(r"<title[^>]*>(.*?)</title>", content, re.I | re.S)
        title = re.sub(r"\s+", " ", unescape(title_match.group(1))).strip() if title_match else ""
        source = re.sub(r"(?is)<(script|style)\b[^>]*>.*?</\1>", " ", content)
        text = unescape(re.sub(r"<[^>]+>", " ", source))
        text = re.sub(r"\s+", " ", text)
        score = c.get("fm")
        answer["page_title"] = title[:180]
        answer["score_visible"] = bool(score is not None and re.search(r"(?<!\d)" + str(score) + r"(?!\d)", text))
        answer["gtx_1070_visible"] = bool(re.search(r"(?i)(?:geforce\s+)?GTX[\s-]*1070(?!\s*ti)", text))
        answer["page_excerpt"] = text[:260]
        # A hit is only an evidence candidate, never proof of matching GPU/score.
        answer["reason"] = ("Page text contains possible score and GPU matches; manually compare result details"
                            if answer["score_visible"] and answer["gtx_1070_visible"]
                            else "Insufficient page text for verification; check browser screenshot or export")
    except Exception as exc:
        answer["reason"] = "Public page could not be retrieved: " + type(exc).__name__
    return answer


with ThreadPoolExecutor(max_workers=4) as pool:
    results = sorted(pool.map(inspect, pending), key=lambda r: r["card"])
out = {
    "generated_utc": datetime.now(timezone.utc).isoformat(timespec="seconds"),
    "fleet_started": batch["started"],
    "checked": len(results),
    "confirmed_by_this_script": 0,
    "warning": "Automated text matches are NOT verification or proof of GPU health. Check each public result manually.",
    "results": results,
}
path = ROOT / "site/data/public-link-audit.json"
path.write_text(json.dumps(out, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
print("Public result audit:", len(results), "attempted,", sum("http_status" in r for r in results), "readable; no automatic grade changes")
