#!/usr/bin/env python3
"""Build the reading pages, search index and Q&A data for the site.

  python3 tools/build_site.py

Reads docs/*.md (needs pandoc) and writes:
  site/read/<name>.html   one reading page per document (TOC, citations, progress bar)
  site/data/search.json   section-level full-text index
  site/data/qa.json       every numbered question/answer from the QA_* and SCENE_* docs
The home page (site/index.html) is hand-written and reads site/data/*.json.
"""
import datetime, html, json, os, re, subprocess
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS, SITE = os.path.join(ROOT, "docs"), os.path.join(ROOT, "site")
GH = "https://github.com/Parris-Tech-Services/furmark-history/blob/main/"
BASE = "https://parris-tech-services.github.io/furmark-history/"
TODAY = datetime.date.today().isoformat()
FONTCSS = open(os.path.join(SITE, "assets", "fonts.css"), encoding="utf-8").read().split("\n", 1)[1].strip().replace("url(fonts/", "url(../assets/fonts/")
BENCH_LABEL = {"furmark": "FurMark", "superposition": "UNIGINE Superposition", "3dmark": "3DMark", "fleet": "Your GPUs", "all": "Guides and method"}

# file -> (title, benchmark, kind, blurb)
META = {
 "HISTORY":               ("FurMark: a history", "furmark", "History", "Timeline from 2007 to FurMark 2.11, the power-virus years, sources."),
 "QA_FURMARK":            ("FurMark: ten questions answered", "furmark", "Deep dive", "Fur technique, scoring, GeeXLab, damage myths, modern throttling."),
 "SCENE_FURMARK":         ("The furry doughnut: scene and lore", "furmark", "Lore", "Why fur, why a torus, what the knot means."),
 "SUPERPOSITION":         ("UNIGINE Superposition: a history", "superposition", "History", "From Sanctuary to Superposition 1.1."),
 "QA_SUPERPOSITION":      ("Superposition: ten questions answered", "superposition", "Deep dive", "UNIGINE, scores, SSRTGI, editions, records."),
 "SCENE_SUPERPOSITION":   ("The vanished professor: scene and lore", "superposition", "Lore", "The abandoned classroom and its missing physicist."),
 "3DMARK_STEEL_NOMAD":    ("3DMark and Steel Nomad: a history", "3dmark", "History", "Final Reality to the path-traced future."),
 "QA_3DMARK":             ("3DMark: ten questions answered", "3dmark", "Deep dive", "Scores, records, scandals, feature tests."),
 "QA_3DMARK_SUPPLEMENT":  ("3DMark: supplementary answers", "3dmark", "Deep dive", "UL timeline, async compute, audits, pricing."),
 "SCENE_STEEL_NOMAD":     ("The masked wanderer: scene and lore", "3dmark", "Lore", "Who is the Nomad, and what is the world?"),
 "QUESTIONS":             ("The thirty technical questions", "all", "Index", "Every open question and where it is answered."),
 "SCENE_STORY_QUESTIONS": ("The thirty scene questions", "all", "Index", "Story and visual-lore questions."),
 "GPU_BATCH_RESEARCH":     ("My GTX 1070 batch: deep research", "fleet", "Your GPUs", "100 sheet slots, 38 started cards, link audit, rig bias, health and resale."),
 "WEBSITE_NOTES":          ("How this site is built: web best practices applied", "all", "Method", "What research says makes a great website, and what was changed because of it."),
 "RESALE_ANALYSIS":        ("Resale analysis: which GTX 1070s are ready to sell", "fleet", "Your GPUs", "Rig-normalised grades, lots, asking ranges and the checks still missing."),
 "FACT_CHECK":            ("Fact-check log", "all", "Method", "What was re-checked and corrected."),
}
ORDER = list(META)

def slug(name): return name.lower().replace("_", "-")
def pandoc(md):
    return subprocess.run(["pandoc", "-f", "gfm+gfm_auto_identifiers", "-t", "html5", "--wrap=none"],
                          input=md, capture_output=True, text=True, check=True).stdout

def fix_links(h):
    def rep(m):
        href = m.group(1)
        if re.match(r"^(https?:|#|mailto:)", href): return m.group(0)
        base, _, frag = href.partition("#")
        name = os.path.basename(base)
        if name.endswith(".md") and name[:-3] in META:
            return 'href="%s.html%s"' % (slug(name[:-3]), "#" + frag if frag else "")
        if base.startswith("../") or base.endswith(".md") or base.endswith(".txt") or base.endswith(".py"):
            return 'href="%s%s"' % (GH + base.replace("../", ""), "#" + frag if frag else "")
        return m.group(0)
    return re.sub(r'href="([^"]+)"', rep, h)

CITE = re.compile(r"\[((?:[A-Z]{1,2})?\d{1,3})\]")
def link_cites(h):
    """Turn [12] / [F3] into links to #src-12 outside the Sources section and outside tags."""
    parts = re.split(r"(<[^>]+>)", h); out = []; in_a = 0
    for p in parts:
        if p.startswith("<"):
            if re.match(r"<a[ >]", p): in_a += 1
            if p.startswith("</a"): in_a = max(0, in_a - 1)
            out.append(p)
        else:
            out.append(p if in_a else CITE.sub(lambda m: '<a class="cite" href="#src-%s">%s</a>' % (m.group(1), m.group(1)), p))
    return "".join(out)

def split_sections(h):
    """Return list of (id, heading_text, html) split on <h2>."""
    pieces = re.split(r'(?=<h2 id=")', h)
    out = []
    for p in pieces:
        m = re.match(r'<h2 id="([^"]+)">(.*?)</h2>', p, re.S)
        out.append((m.group(1), re.sub(r"<[^>]+>", "", m.group(2)), p) if m else ("intro", "", p))
    return out

def number_sources(h):
    """Give each item of the Sources list an id: src-<n> for numbered lists, src-<label> for '[F1] ...' bullets."""
    m = re.search(r'(<h2 id="source[^"]*">.*?</h2>)(.*)$', h, re.S)
    if not m: return h
    tail, n = m.group(2), [0]
    # walk <li> elements, looking ahead at their text for a [A1] label
    out, pos = [], 0
    for mm in re.finditer(r"<li([^>]*)>", tail):
        n[0] += 1
        look = re.sub(r"<[^>]+>", "", tail[mm.end():mm.end() + 120])[:24]
        lab = re.match(r"\s*\[([A-Z]{1,2}\d{1,3})\]", look)
        out.append(tail[pos:mm.start()] + '<li id="src-%s"%s>' % (lab.group(1) if lab else n[0], mm.group(1)))
        pos = mm.end()
    out.append(tail[pos:])
    return h[:m.start(2)] + "".join(out)

def text_of(h): return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", h))).strip()

TEMPLATE = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "reader_template.html"), encoding="utf-8").read()

def crumbs(name, p):
    return ('<nav class="crumbs" aria-label="Breadcrumb"><a href="../index.html">Home</a><span aria-hidden="true">/</span>'
            '<a href="../index.html#library">%s</a><span aria-hidden="true">/</span><span aria-current="page">%s</span></nav>'
            % (html.escape(BENCH_LABEL[p["bench"]]), html.escape(p["title"])))

def jsonld(name, p):
    url = "%sread/%s.html" % (BASE, slug(name))
    g = {"@context": "https://schema.org", "@graph": [
        {"@type": "Article", "headline": p["title"], "description": p["blurb"], "url": url, "mainEntityOfPage": url,
         "inLanguage": "en", "dateModified": TODAY, "license": "https://opensource.org/licenses/MIT",
         "isPartOf": {"@type": "WebSite", "name": "GPU Benchmark Lore", "url": BASE},
         "publisher": {"@type": "Organization", "name": "Parris Tech Services"}},
        {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": BASE},
            {"@type": "ListItem", "position": 2, "name": BENCH_LABEL[p["bench"]], "item": BASE + "#library"},
            {"@type": "ListItem", "position": 3, "name": p["title"], "item": url}]}]}
    return json.dumps(g, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")

def write_site_files(pages):
    """sitemap, robots, manifest and the 404 page: small files search engines and browsers look for."""
    urls = [BASE, BASE + "resale.html"] + [BASE + "read/%s.html" % slug(n) for n in pages]
    open(os.path.join(SITE, "sitemap.xml"), "w", encoding="utf-8").write(
        '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "".join("  <url><loc>%s</loc><lastmod>%s</lastmod></url>\n" % (u, TODAY) for u in urls) + "</urlset>\n")
    open(os.path.join(SITE, "robots.txt"), "w", encoding="utf-8").write("User-agent: *\nAllow: /\n\nSitemap: %ssitemap.xml\n" % BASE)
    json.dump({"name": "GPU Benchmark Lore", "short_name": "Benchmark Lore", "description": "Sourced histories of FurMark, UNIGINE Superposition and 3DMark.",
               "start_url": "./", "scope": "./", "display": "standalone", "background_color": "#07080d", "theme_color": "#07080d",
               "icons": [{"src": "assets/icon-192.png", "sizes": "192x192", "type": "image/png"},
                         {"src": "assets/icon-512.png", "sizes": "512x512", "type": "image/png"},
                         {"src": "assets/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"}]},
              open(os.path.join(SITE, "manifest.webmanifest"), "w", encoding="utf-8"), indent=1)
    open(os.path.join(SITE, "404.html"), "w", encoding="utf-8").write(NOT_FOUND)

NOT_FOUND = """<!doctype html><html lang="en" data-bench="furmark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Page not found · GPU Benchmark Lore</title><meta name="robots" content="noindex"><meta name="theme-color" content="#07080d">
<base href="%s"><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/fonts.css"><link rel="stylesheet" href="assets/style.css">
<style>main{max-width:640px;margin:0 auto;padding:12vh 20px}h1{font:700 clamp(36px,7vw,64px)/1.05 var(--f-ui);letter-spacing:-.03em;margin:.3em 0}p{color:var(--mut);font-size:18px}.row{display:flex;gap:10px;flex-wrap:wrap;margin-top:22px}</style></head>
<body><main id="maincontent"><span class="kicker">Error 404</span><h1>That page isn’t in the archive.</h1>
<p>The link may be old, or the page was renamed. Try the search (press <span class="kbd">/</span> on any page) or start from one of the three histories.</p>
<div class="row"><a class="btn" href="./">Go to the home page</a><a class="btn ghost" href="read/history.html">FurMark</a><a class="btn ghost" href="read/superposition.html">Superposition</a><a class="btn ghost" href="read/3dmark-steel-nomad.html">3DMark</a></div></main>
<script src="assets/app.js" data-base=""></script></body></html>
""" % BASE

def build():
    search, qa, pages = [], [], {}
    for name in ORDER:
        md = open(os.path.join(DOCS, name + ".md"), encoding="utf-8").read()
        title, bench, kind, blurb = META[name]
        md_body = re.sub(r"^# .*\n", "", md, count=1)
        h = pandoc(md_body)
        h = fix_links(number_sources(h))
        words = len(text_of(h).split())
        secs = split_sections(h)
        toc = [(i, t) for i, t, _ in secs if i != "intro" and t]
        body = []
        for i, t, s in secs:
            body.append(link_cites(s) if not i.startswith("source") else s)
            if i != "intro":
                search.append({"doc": slug(name), "title": title, "bench": bench, "h": t, "id": i, "t": text_of(s)[:2500]})
            m = re.match(r"(\d+)\.\s*(.*)", t)
            if m and name.startswith(("QA_", "SCENE_")) and not name.startswith("QA_3DMARK_SUPP") or (m and name == "QA_3DMARK_SUPPLEMENT"):
                inner = re.sub(r'^<h2[^>]*>.*?</h2>', "", s, count=1, flags=re.S)
                qa.append({"bench": bench, "kind": "lore" if name.startswith("SCENE_") else "technical", "n": int(m.group(1)),
                           "q": m.group(2), "doc": slug(name), "id": i, "a": link_cites(inner)})
        pages[name] = dict(title=title, bench=bench, kind=kind, blurb=blurb, words=words, toc=toc, body="".join(body))
    # prev/next within the same benchmark, in ORDER
    for name, p in pages.items():
        peers = [n for n in ORDER if pages[n]["bench"] == p["bench"]] if p["bench"] != "all" else [n for n in ORDER if pages[n]["bench"] == "all"]
        k = peers.index(name)
        p["prev"] = peers[k - 1] if k > 0 else None
        p["next"] = peers[k + 1] if k + 1 < len(peers) else None
    for name, p in pages.items():
        def nav(n):
            return "" if not n else '<a href="%s.html"><span>%s</span><b>%s</b></a>' % (slug(n), "Read", html.escape(pages[n]["title"]))
        tocli = "".join('<li><a href="#%s">%s</a></li>' % (i, html.escape(t)) for i, t in p["toc"])
        page = (TEMPLATE.replace("{{TITLE}}", html.escape(p["title"])).replace("{{BENCH}}", p["bench"])
                .replace("{{KIND}}", p["kind"]).replace("{{BLURB}}", html.escape(p["blurb"]))
                .replace("{{MINS}}", str(max(1, round(p["words"] / 220)))).replace("{{TOC}}", tocli)
                .replace("{{BODY}}", p["body"]).replace("{{PREV}}", nav(p["prev"])).replace("{{NEXT}}", nav(p["next"]))
                .replace("{{GITHUB}}", GH + "docs/" + name + ".md").replace("{{FONTCSS}}", FONTCSS).replace("{{SLUG}}", slug(name)).replace("{{DATE}}", TODAY)
                .replace("{{CRUMBS}}", crumbs(name, p)).replace("{{JSONLD}}", jsonld(name, p)))
        open(os.path.join(SITE, "read", slug(name) + ".html"), "w", encoding="utf-8").write(page)
    json.dump(search, open(os.path.join(SITE, "data", "search.json"), "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    json.dump(qa, open(os.path.join(SITE, "data", "qa.json"), "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    lib = [{"slug": slug(n), "title": p["title"], "bench": p["bench"], "kind": p["kind"], "blurb": p["blurb"],
            "mins": max(1, round(p["words"] / 220))} for n, p in pages.items()]
    json.dump(lib, open(os.path.join(SITE, "data", "library.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    json.dump({"qa": len(qa), "docs": len(pages), "sections": len(search)}, open(os.path.join(SITE, "data", "counts.json"), "w"))
    write_site_files(pages)
    print("pages", len(pages), "search sections", len(search), "qa", len(qa))

if __name__ == "__main__":
    build()
