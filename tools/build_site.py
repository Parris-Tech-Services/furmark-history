#!/usr/bin/env python3
"""Build the reading pages, search index and Q&A data for the site.

  python3 tools/build_site.py

Reads docs/*.md (needs pandoc) and writes:
  site/read/<name>.html   one reading page per document (TOC, citations, progress bar)
  site/data/search.json   section-level full-text index
  site/data/qa.json       every numbered question/answer from the QA_* and SCENE_* docs
The home page (site/index.html) is hand-written and reads site/data/*.json.
"""
import html, json, os, re, subprocess
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS, SITE = os.path.join(ROOT, "docs"), os.path.join(ROOT, "site")
GH = "https://github.com/Parris-Tech-Services/furmark-history/blob/main/"

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
    m = re.search(r'(<h2 id="sources[^"]*">.*?</h2>)(.*)$', h, re.S)
    if not m: return h
    tail = m.group(2)
    n = [0]
    def li(mm):
        n[0] += 1
        return '<li id="src-%d"' % n[0]
    tail2 = re.sub(r"<li(?=[ >])", li, tail)
    # sources such as "[F1] text" keep their own labels: expose them as ids as well
    tail2 = re.sub(r"<li id=\"src-\d+\"([^>]*)>(\s*(?:<p>)?)\[?([A-Z]{1,2}\d{1,3})\]?[ .:]", lambda mm: '<li id="src-%s"%s>%s' % (mm.group(3), mm.group(1), mm.group(2)), tail2)
    return h[:m.start(2)] + tail2

def text_of(h): return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", h))).strip()

TEMPLATE = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "reader_template.html"), encoding="utf-8").read()

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
            body.append(link_cites(s) if not re.match(r"sources", i) else s)
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
                .replace("{{GITHUB}}", GH + "docs/" + name + ".md"))
        open(os.path.join(SITE, "read", slug(name) + ".html"), "w", encoding="utf-8").write(page)
    json.dump(search, open(os.path.join(SITE, "data", "search.json"), "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    json.dump(qa, open(os.path.join(SITE, "data", "qa.json"), "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    lib = [{"slug": slug(n), "title": p["title"], "bench": p["bench"], "kind": p["kind"], "blurb": p["blurb"],
            "mins": max(1, round(p["words"] / 220))} for n, p in pages.items()]
    json.dump(lib, open(os.path.join(SITE, "data", "library.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("pages", len(pages), "search sections", len(search), "qa", len(qa))

if __name__ == "__main__":
    build()
