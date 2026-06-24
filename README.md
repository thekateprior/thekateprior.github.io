# thekateprior.github.io

The personal portfolio site of **Kate Prior** (née Kathryn Loesel) — doctoral
candidate in Texts and Technology (Digital Humanities) at the University of
Central Florida.

## How it's built

A single-page [Jekyll](https://jekyllrb.com/) site served by GitHub Pages.
Content is plain Markdown; presentation is handled by a custom layout, CSS, and a
small vanilla-JS enhancement.

| Path | Purpose |
| --- | --- |
| `index.md` | All page content as clean Markdown (one `##` per section). |
| `_layouts/default.html` | Page shell + the top infinite-scroll ribbon banner. |
| `assets/css/style.css` | Pastel theme drawn from the avatar, plus marquee animations. |
| `assets/js/main.js` | Wraps each section into a card and adds its scrolling ribbon header. |
| `pfp26_closeup.png` | Illustrated avatar (also the favicon / social image). |
| `Prior 2026 CV.pdf`, `PriorCL_VC.pdf` | Downloadable source documents. |

## Run locally

```bash
bundle install
bundle exec jekyll serve
# open http://localhost:4000
```

## Design

The palette — cream paper, blush pink, sage/olive green, and soft mauve — is taken
from the illustrated portrait. A ribbon banner scrolls infinitely across the top,
and every section is introduced by its own infinitely scrolling ribbon. Animations
respect `prefers-reduced-motion`.
