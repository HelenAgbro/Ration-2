# Ration — website refresh

A redesigned marketing site for [Ration](https://www.ration.works/): a secure messaging and
collaboration platform built by Stackchase Limited.

The build is intentionally dependency-free at runtime — plain HTML, CSS and JavaScript with
[GSAP](https://gsap.com/) for motion. There is no build step: deploy the repository root.

## Cisco-inspired redesign (2026)

The site now follows the information design and visual system of [cisco.com](https://www.cisco.com/):
deep-navy feature bands, Cisco-blue accents, hairline card grids, near-square corners and
flat surfaces instead of gradients and drop shadows.

- **Design tokens** — navy `#0D274D`, Cisco blue `#049FD9`, light grey `#F2F2F2`, body grey
  `#4A4A4A`, hairline `#D8DCE0`; 2px corner radius; no box shadows. Headlines use Inter at 700
  weight with tight tracking; eyebrow labels are uppercase blue with a short rule.
- **Navigation** — two-tier header: a slim utility strip (Support, Documentation, Contact sales,
  locale) above the primary bar. Products opens a full-width mega-menu listing all eight apps,
  with a featured Ration Cloud panel. It opens on hover or click, closes on Escape, outside click
  or link selection, and collapses to logo + CTA + burger below 1024px.
- **Hero** — split editorial layout: static headline with a blue “Securely.”, concise subtext,
  two CTAs and a trust line, beside a flat browser-framed product preview with five labelled
  tabs (Mail, Chat, Calendar, Forms, Meet). A four-item quick-link bar closes the band.
- **At a glance** — oversized stat band with hairline dividers and badges, followed by a
  light module ticker.
- **Eight apps** — a tabbed module explorer inside a single hairline frame. Tabs, arrows,
  keyboard and swipe reuse the existing interaction layer; each panel keeps its bespoke
  product mockup, now on a flat tinted well. A “Built on one platform” fact list sits beside
  the section intro.
- **Sovereign cloud** — flat navy band with blue region indicators, the interactive Africa map,
  a hairline region list and two operational notes.
- **Remaining sections** — audience cards, the roles carousel, edition slider, pricing table
  (with the monthly/annual toggle), security accordion, FAQ, closing CTA and footer all follow
  the same hairline, no-shadow system. The closing CTA is a full-bleed navy band with actions
  in a right-hand column; the footer uses a navy field, blue top rule and four link columns.
- **Implementation** — the new system is an additive layer, `assets/css/cisco-brand.css`,
  loaded after `styles.css`, so the layout engine, reveal/scroll triggers and slider math are
  untouched. `assets/js/brand.js` adds mega-menu behaviour. Legacy decorative layers (glows,
  rings, spotlights, custom cursor, progress bar, CTA canvas) are disabled in CSS.

## Structure

```
.
├── index.html                  # the page
├── assets
│   ├── css/styles.css          # layout engine + legacy section styles
│   ├── css/cisco-brand.css     # Cisco-inspired brand layer (loaded second)
│   ├── js/main.js              # GSAP motion, sliders, accordions, interactions
│   ├── js/brand.js             # mega-menu behaviour for the new navigation
│   ├── fonts/                  # self-hosted Inter (latin + latin-ext)
│   ├── img/                    # logos, app screenshots, map, OG image, icons
│   └── vendor/                 # GSAP, ScrollTrigger, ScrollToPlugin (vendored)
├── scripts/serve.js            # zero-dependency local static server
├── robots.txt
├── sitemap.xml
└── package.json                # dev tooling only
```

## Local development

Requires Node 18+.

```bash
npm install        # optional: only GSAP/Playwright dev tooling
npm run dev        # http://localhost:5173
```

The site is static, so `python3 -m http.server 5173` works just as well.

## Deployment

Upload the repository root to any static host (Nginx, Cloudflare Pages, Netlify, GitHub Pages).
There is nothing to compile. Keep the `assets/` directory alongside `index.html`.

- `robots.txt` and `sitemap.xml` assume `https://www.ration.works/`.
- `og-image.png` is 1200×630 and lives at `assets/img/og-image.png`.
- Fonts and GSAP are self-hosted, so there are no third-party runtime requests.

### Share a preview with Vercel

[Deploy the preview to Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FHelenAgbro%2FRation%2Ftree%2Fration-share-preview&project-name=ration-design-preview&repository-name=ration-design-preview).
Sign in with GitHub and complete Vercel's Create and Deploy steps. Vercel then
provides the public HTTPS URL to share. The link uses the `ration-share-preview`
branch. `vercel.json` deploys the repository root as a static site, with no
dependency installation or build command needed.

## Motion and accessibility

- All interactive motion is progressive enhancement; the content is readable if JS fails.
- `prefers-reduced-motion: reduce` disables autoplay and scroll animation while keeping the
  tabbed module explorer fully keyboard-operable; the hero preview stops auto-advancing on a
  single frame.
- The Products mega-menu is keyboard operable: Enter/Space toggles, Escape closes and returns
  focus to the trigger, and focus or a click outside closes it.
- The slider supports arrow keys, tab/arrow buttons and touch swipes; captions are announced
  through `aria-live`.
- Skip link, visible focus styles, labelled sections and semantic headings are included.

## Updating GSAP

GSAP is vendored so production never depends on a CDN.

```bash
npm install gsap@latest
cp node_modules/gsap/dist/gsap.min.js assets/vendor/
cp node_modules/gsap/dist/ScrollTrigger.min.js assets/vendor/
cp node_modules/gsap/dist/ScrollToPlugin.min.js assets/vendor/
```

## Notes on content

Copy is based on the live ration.works site and the supplied design direction. Product
screenshots in the hero are the existing Ration Mail, Chat, Calendar and Forms captures. The
in-panel mockups use representative product content (Ogun State rollout) for continuity.

The security section after Pricing pairs a native accordion covering residency, access and operation
with matching high-resolution editorial imagery. It retains the light background and the site's
shared fonts and colours, and stacks vertically on smaller screens.
