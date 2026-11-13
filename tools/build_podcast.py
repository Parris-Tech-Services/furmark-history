#!/usr/bin/env python3
"""Write site/podcast.xml, a podcast RSS feed for the three episodes.

Submit https://parris-tech-services.github.io/furmark-history/podcast.xml to Spotify for Creators.
Add your own <itunes:owner><itunes:email> before submitting (left blank on purpose: this repo is public).
"""
import os, subprocess, email.utils, datetime, html
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = os.path.join(ROOT, "site")
BASE = "https://parris-tech-services.github.io/furmark-history/"
EPS = [
 ("furmark-history-podcast.mp3", "The Donut That Cooks GPUs: the story of FurMark",
  "How a furry OpenGL donut became the program GPU makers built protections against: Catalyst name checks, the GTX 580 limiter, and FurMark 2. Two synthetic hosts, sourced from Geeks3D's own posts and changelog. Transcript and sources: " + BASE + "read/history.html", (2026, 11, 12)),
 ("superposition-history-podcast.mp3", "The Professor's Lab: the story of UNIGINE Superposition",
  "From Sanctuary and Heaven to Superposition 1.1: UNIGINE's benchmarks, the vanished professor, SSRTGI lighting and the editions. Sources: " + BASE + "read/superposition.html", (2026, 11, 13)),
 ("steelnomad-history-podcast.mp3", "From Fire Strike to Steel Nomad: the story of 3DMark",
  "Final Reality, 3DMark99, Futuremark's owners, one test per DirectX, and Steel Nomad's delays and scoring. Sources: " + BASE + "read/3dmark-steel-nomad.html", (2026, 11, 13)),
]
def dur(p):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", p], capture_output=True, text=True).stdout.strip()
    s = int(float(out)); return "%d:%02d" % (s // 60, s % 60)
items = []
for f, t, d, (y, m, dd) in EPS:
    p = os.path.join(SITE, f)
    items.append(f"""    <item>
      <title>{html.escape(t)}</title>
      <description>{html.escape(d)}</description>
      <enclosure url="{BASE}{f}" length="{os.path.getsize(p)}" type="audio/mpeg"/>
      <guid isPermaLink="false">gpu-benchmark-lore-{f}</guid>
      <pubDate>{email.utils.format_datetime(datetime.datetime(y, m, dd, 12, 0, tzinfo=datetime.timezone.utc))}</pubDate>
      <itunes:duration>{dur(p)}</itunes:duration>
      <itunes:explicit>false</itunes:explicit>
    </item>""")
feed = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>GPU Benchmark Lore</title>
    <link>{BASE}</link>
    <atom:link href="{BASE}podcast.xml" rel="self" type="application/rss+xml"/>
    <language>en</language>
    <description>Short two-host histories of FurMark, UNIGINE Superposition and 3DMark: the companies, the scenes and the scandals. Voices are synthetic; every episode is built from the sourced research at {BASE}.</description>
    <itunes:author>Parris Tech Services</itunes:author>
    <itunes:summary>Short two-host histories of FurMark, UNIGINE Superposition and 3DMark. Synthetic voices, sourced scripts.</itunes:summary>
    <itunes:explicit>false</itunes:explicit>
    <itunes:type>episodic</itunes:type>
    <itunes:image href="{BASE}assets/podcast-cover.jpg"/>
    <itunes:category text="Technology"/>
    <itunes:owner><itunes:name>Parris Tech Services</itunes:name></itunes:owner>
{chr(10).join(items)}
  </channel>
</rss>
"""
open(os.path.join(SITE, "podcast.xml"), "w", encoding="utf-8").write(feed)
print("wrote podcast.xml with", len(items), "episodes")
