#!/usr/bin/env python3
"""Build site/furmark-history-podcast.pdf (companion to the episode) from podcast/script.txt and docs/HISTORY.md.
Needs: pandoc and Playwright's Chromium (node). Usage: python3 tools/build_pdf.py"""
import html, os, re, subprocess, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO_URL = "https://cdn.jsdelivr.net/gh/Parris-Tech-Services/furmark-history@main/site/furmark-history-podcast.mp3"
REPO_URL = "https://github.com/Parris-Tech-Services/furmark-history"

segs, cur = [], None
for line in open(os.path.join(ROOT, "podcast", "script.txt"), encoding="utf-8"):
    line = line.rstrip("\n")
    if line.startswith("## "): cur = {"name": line[3:], "lines": []}; segs.append(cur)
    elif re.match(r"^(LEDA|DORAL):", line):
        who, t = line.split(":", 1); cur["lines"].append((who, t.strip()))
transcript = ""
for s in segs:
    transcript += f'<h3>{html.escape(s["name"])}</h3>'
    for who, t in s["lines"]:
        transcript += f'<p class="line {who.lower()}"><b>{who.title()}</b> {html.escape(t)}</p>'

md = open(os.path.join(ROOT, "docs", "HISTORY.md"), encoding="utf-8").read()
# pandoc: markdown -> html fragment (tables supported)
frag = subprocess.run(["pandoc", "-f", "gfm", "-t", "html"], input=md, capture_output=True, text=True, check=True).stdout
frag = re.sub(r"<h1[^>]*>.*?</h1>", "", frag, count=1, flags=re.S)  # drop duplicate title

words = sum(len(t.split()) for s in segs for _, t in s["lines"])
page = f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><title>The Donut That Cooks GPUs: the story of FurMark</title>
<style>
@page {{ size: A4; margin: 18mm 16mm 18mm 16mm; }}
:root {{ --ink:#1c1b22; --mut:#5d5a6b; --hot:#e4572e; --hot2:#ffb347; --bg:#fff; }}
* {{ box-sizing:border-box; }}
body {{ font: 10.5pt/1.55 "Inter","Helvetica Neue",Arial,sans-serif; color:var(--ink); margin:0; }}
.cover {{ height:257mm; display:flex; flex-direction:column; justify-content:center; padding:0 6mm;
  background: radial-gradient(circle at 78% 22%, #ffd9a3 0, #ffb347 14%, transparent 15%), linear-gradient(160deg,#1c1b22 0,#2b2233 60%,#4a2a2a 100%);
  color:#fff; border-radius:6mm; page-break-after:always; }}
.cover .kick {{ letter-spacing:.2em; text-transform:uppercase; font-size:9pt; color:var(--hot2); }}
.cover h1 {{ font-size:34pt; line-height:1.08; margin:.35em 0 .25em; max-width:150mm; }}
.cover p {{ font-size:12.5pt; max-width:140mm; color:#ece8f2; }}
.cover .meta {{ margin-top:14mm; font-size:10pt; color:#cfc7dc; }}
.cover a {{ color:var(--hot2); }}
h2 {{ font-size:17pt; margin:1.4em 0 .4em; border-bottom:2px solid var(--hot); padding-bottom:.15em; page-break-after:avoid; }}
h3 {{ font-size:12pt; margin:1.2em 0 .3em; color:var(--hot); page-break-after:avoid; }}
a {{ color:#b03a14; word-break:break-word; }}
table {{ border-collapse:collapse; width:100%; font-size:9pt; margin:.6em 0; }}
th,td {{ border:1px solid #ddd; padding:4px 6px; vertical-align:top; }} th {{ background:#f6f1ee; text-align:left; }}
tr {{ page-break-inside:avoid; }}
.box {{ background:#fff6ee; border-left:4px solid var(--hot); padding:8px 12px; margin:10px 0; border-radius:3px; }}
.line {{ margin:.35em 0; padding-left:20mm; position:relative; }} .line b {{ position:absolute; left:0; width:18mm; font-size:8.5pt; letter-spacing:.06em; text-transform:uppercase; color:var(--mut); }}
.line.leda b {{ color:#b03a14; }} .line.doral b {{ color:#24558a; }}
ol {{ padding-left:1.4em; }} li {{ margin:.25em 0; }}
.small {{ font-size:9pt; color:var(--mut); }}
</style></head><body>
<section class="cover">
  <div class="kick">Podcast companion · FurMark History</div>
  <h1>The Donut That Cooks GPUs</h1>
  <p>The story of FurMark: the furry OpenGL donut that stress-tests graphics cards, got treated like a power virus by driver teams, and is still being updated in 2026.</p>
  <div class="meta">Hosts: Leda &amp; Doral · about 8 minutes · {words} spoken words<br>
  Listen: <a href="{AUDIO_URL}">{AUDIO_URL}</a><br>
  Source files and full research: <a href="{REPO_URL}">{REPO_URL}</a><br>
  Compiled 13 November 2026 from the developer's own posts and release notes.</div>
</section>

<h2>About this episode</h2>
<p>An eight-minute, two-host walk through FurMark's history: its 2007 beginnings, the 2010 "Hot Like Hell Edition", the years when AMD and NVIDIA built throttling around it, MSI's Kombustor spin-off, and the 2022 to 2026 rebuild as FurMark 2. Voices are synthetic (ElevenLabs); the script was written from the sources listed at the end.</p>
<div class="box"><b>How to read the sourcing.</b> Dates and quotes come from the developer's own Geeks3D posts and changelog wherever possible. Anything that rests on forum reports or on a single secondary source is marked as such in the audio and on the last pages. Nothing here is vendor-confirmed unless it says so.</div>
<h3>Episode guide</h3>
<ol>{''.join(f'<li>{html.escape(s["name"])}</li>' for s in segs)}</ol>

<h2>Research: FurMark, a history</h2>
{frag}

<h2>Full transcript</h2>
<p class="small">Numbers are written the way they are spoken. Quoted phrases are short extracts from the developer's posts.</p>
{transcript}
<p class="small" style="margin-top:2em">Generated from <a href="{REPO_URL}">the repository</a>. Spoken audio: ElevenLabs, voices Laura and Charlie, model Turbo v2.5.</p>
</body></html>"""
out = os.path.join(ROOT, "site", "furmark-history-podcast.html"); open(out, "w", encoding="utf-8").write(page)
pdf = os.path.join(ROOT, "site", "furmark-history-podcast.pdf")
js = f"""const {{chromium}}=require('playwright');(async()=>{{const b=await chromium.launch();const p=await b.newPage();
await p.goto('file://{out}');await p.pdf({{path:'{pdf}',format:'A4',printBackground:true,displayHeaderFooter:true,
headerTemplate:'<span></span>',footerTemplate:'<div style="font:8px Arial;color:#777;width:100%;text-align:center">The Donut That Cooks GPUs · page <span class=pageNumber></span> of <span class=totalPages></span></div>',
margin:{{top:'18mm',bottom:'18mm',left:'16mm',right:'16mm'}}}});await b.close()}})()"""
subprocess.run(["node", "-e", js], check=True)
os.remove(out)
print("wrote", pdf, os.path.getsize(pdf) // 1024, "KB")
