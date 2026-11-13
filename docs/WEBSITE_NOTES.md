*Researched and applied 13 November 2026. This page records what the research says makes a great website, what was changed on this site because of it, how it was measured, and what was deliberately left alone. Every claim has a numbered source.*

## The short version

Four bodies of evidence agree on what matters: pages that **load fast and stay still** (Core Web Vitals), that **everyone can use** (WCAG 2.2), that **say clearly what they are** to people and search engines (Google's SEO guide), and that **respect how people actually read** (scanning, not reading) [1][2][3][4][5][6]. Measured with Lighthouse on the published site, the home page started at 81 for performance and 85 for accessibility, and the reading pages at 98 and 84. After the changes below, both kinds of page score 100 for accessibility, best practices and SEO, and 99 or 100 for performance in lab runs, with the home page's first paint nearly twice as fast (see "Measured results").

## What the research says

**Speed and stability: Core Web Vitals.** Google's three user-experience metrics have fixed "good" thresholds, judged on at least 75% of page visits: Largest Contentful Paint 2.5 seconds or less, Interaction to Next Paint 200 milliseconds or less, and Cumulative Layout Shift 0.1 or less [1][2][3][4]. The specific advice that matters for a static site like this one:

- Always give images and videos `width` and `height` (or CSS `aspect-ratio`) so the browser reserves space before they load; web fonts that swap can also shift layout, so fallback fonts should match the web font's metrics [3][7].
- Fonts: self-host WOFF2 files, preload only the critical face, use `font-display`, and be cautious with preload because it competes with other critical requests [7].
- Images: choose a modern format. WebP and AVIF compress better than JPEG and PNG and are widely supported [8].
- Interaction responsiveness comes down to the main thread: long tasks delay input, so break up or remove heavy work [4].

**Accessibility: WCAG 2.2 and what actually fails.** WebAIM's 2025 analysis of one million home pages found WCAG failures on 94.8% of them. The commonest was **low-contrast text on 79.1% of pages**, followed by missing image descriptions, missing form labels, empty links and buttons, and a missing document language [5]. WCAG 2.2 added criteria that matter for an interactive page like this one: **target size of at least 24 by 24 CSS pixels (2.5.8)**, a **non-dragging alternative for any drag interaction (2.5.7)**, and **focus must not be hidden behind sticky bars (2.4.11)** [9].

**Search and sharing: Google's SEO starter guide.** Unique, accurate titles and page-specific descriptions; descriptive link text; descriptive alt text; a canonical URL where duplicates are possible; images placed near relevant text; and a sitemap to help crawlers find pages [6]. Social preview cards (Open Graph) are not Google guidance but are the de facto standard for how a link looks when shared.

**Reading: people scan.** Nielsen Norman Group's research found that 79% of test users always scanned a new page and only 16% read word by word [10]. The practical consequences are meaningful headings, short paragraphs, lists, and a table of contents.

## What was changed, and why

| Finding | Change on this site |
|---|---|
| Fonts should be self-hosted, and a third-party font stylesheet is an extra request that blocks first render [7] | The three fonts are now **self-hosted Latin subsets** (Space Grotesk 22 KB, JetBrains Mono 31 KB, Newsreader 58 KB, pinned to one optical size), with the font CSS inlined and the main font preloaded. |
| Swapping fonts can shift layout [3][7] | Added **size-matched fallback fonts**, so the swap barely moves text. |
| Images need dimensions and modern formats [3][8] | The seven photographs are **WebP** (about 40% smaller, 1.1 MB to 0.6 MB), with `width`, `height` and `decoding="async"`; video thumbnails got dimensions too. |
| Long tasks hurt responsiveness [4] | The hero animation draws **1,500 strands instead of 3,600**, allocates nothing per frame, starts after the first paint, caps its frame rate, **adapts its density to the device**, and pauses off-screen or in a hidden tab. Decorative canvas art and the 70-question explorer now load only when you scroll near them. |
| Low contrast is the top failure [5] | The faint-text colour was darkened or lightened to pass 4.5:1 in both themes. |
| Colour alone must not signal a link (WCAG 1.4.1) [9] | Links inside running text are underlined. |
| Targets must be 24 px (2.5.8) [9] | Citation markers, chart rows, buttons and chips now meet the minimum. |
| Dragging needs an alternative (2.5.7) [9] | The hero torus rotates with the **arrow keys** as well as by dragging. |
| Accessible names must contain visible text; heading levels must not skip [5][9] | Chart rows start their accessible name with the visible label; footer and calculator headings were fixed; the logo link has a name. |
| Descriptive titles, canonical URLs, sitemap [6] | **Canonical URLs, `sitemap.xml`, `robots.txt`**, per-page descriptions, breadcrumbs, and **JSON-LD** (WebSite on the home page; Article and BreadcrumbList on each reading page). |
| Shared links need a preview | **Open Graph and Twitter card** metadata with a 1200 by 630 preview image. |
| A missing favicon logged a 404 on every page | Added an **SVG favicon**, touch icon and a web **app manifest** with theme colour. |
| People scan [10] | Reading pages already had a table of contents, reading time and hover-to-preview citations; they now also have **breadcrumbs, an "updated" date and a print stylesheet** that expands links into the page. |
| Broken links should lead somewhere | A real **404 page** with routes back into the site. |

## Measured results

Lighthouse (mobile profile, simulated slow connection) on the published site, before the changes and after them:

| Page | Performance | Accessibility | Best practices | SEO | First paint | Blocking time | Layout shift |
|---|---|---|---|---|---|---|---|
| Home, before | 81 | 85 | 96 | 100 | 1.9 s | 690 ms | 0 |
| Home, after | 99 to 100 | 100 | 100 | 100 | 1.0 s | 10 to 120 ms | 0.04 |
| A reading page, before | 98 | 84 | 96 | 100 | 1.8 s | 0 ms | 0 |
| A reading page, after | 100 | 100 | 100 | 100 | 0.9 s | 0 to 30 ms | 0 to 0.004 |

Lab scores vary from run to run, especially for the home page, which animates. The home page's layout shift rose from 0 to 0.04 because more content now renders after the data loads; that is still inside the 0.1 "good" threshold [3]. Field data from real visitors is not available for a site this new, and this site collects no analytics.

## Considered and left out

- **`content-visibility: auto` on page sections.** It skips rendering of off-screen sections, but it also made the browser report empty text for controls that had not been scrolled into view, which broke the repository's own browser tests and could confuse other tools. Total Blocking Time was already near zero without it.
- **A service worker for offline use.** Cached copies can serve stale pages while the site is still changing daily; the gain does not outweigh the confusion.
- **Analytics.** Not needed, and it would add a third party and a consent question.
- **A strict Content Security Policy.** The pages use inline styles and scripts, so a meta-tag policy would have to allow them and protect little.
- **Dark-mode-only.** The site defaults to dark, with a light theme behind the toggle; both pass contrast checks.

## Sources

1. web.dev, "Web Vitals". https://web.dev/articles/vitals
2. web.dev, "Optimize Largest Contentful Paint". https://web.dev/articles/optimize-lcp
3. web.dev, "Optimize Cumulative Layout Shift". https://web.dev/articles/optimize-cls
4. web.dev, "Optimize Interaction to Next Paint". https://web.dev/articles/optimize-inp
5. WebAIM, "The WebAIM Million: 2025 report on the accessibility of the top 1,000,000 home pages". https://webaim.org/projects/million/2025
6. Google Search Central, "SEO Starter Guide: The Basics". https://developers.google.com/search/docs/fundamentals/seo-starter-guide
7. web.dev, "Best practices for fonts". https://web.dev/articles/font-best-practices
8. web.dev, "Choose the right image format". https://web.dev/articles/choose-the-right-image-format
9. W3C Web Accessibility Initiative, "What's new in WCAG 2.2". https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
10. Nielsen Norman Group, "How Users Read on the Web". https://www.nngroup.com/articles/how-users-read-on-the-web/
