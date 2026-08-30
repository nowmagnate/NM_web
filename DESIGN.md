# Design

<!-- impeccable:design-schema 1 -->

**Struck & Assayed.** Recorded from the built world, not from intention. Seed
key `bf69486d`; the direction contract ships in the emitted markup (grep the
build output for the key).

---

## Two design worlds, and this document covers one of them

**This file describes the studio's own site.** The 24 templates sold at
`/preview/<slug>/` are a completely separate visual system with its own tokens,
its own type, its own motion and its own rules, and they are documented in
**`design/TEMPLATE-DIRECTION.md`**.

They have to be separate. A template that inherited this site's white sheet,
Syne headlines and square geometry would be selling the studio's identity to a
dentist. So `src/templates/kit/tokens.css` declares a parallel `tpl-*`
namespace, the palette arrives as inline custom properties from a config file,
and a site utility appearing inside `src/templates/` is a review failure.

If you are looking for the template system, stop reading here.

**One correction owed on this document:** it records the site as *Struck &
Assayed*, and `src/app/globals.css` has since been migrated to **SPECTRUM** (a
white sheet, Syne / Heebo / Archivo, and a five-stop gradient accent), with a
migration shim aliasing the old token names. The two disagree, globals.css is
the one that ships, and rewriting this file is the studio site's own job rather
than the template catalog's.

## Thesis

A hallmark is the short row of small marks struck into finished metal that
certifies **who made a thing, where, and in what year**. That is exactly what
this site has to prove, so the page is a bright milled plate and the facts are
struck into it.

The arrangement it refuses: the dev-studio default of dark hero, gradient wash,
logo strip, three icon cards.

## Ground rules

- **Light only, by decision.** The scene is a finished metal plate under
  daylight. There is no dark rendition of this world, because that would be a
  different material rather than a theme of the same one. `color-scheme: light`
  is declared so browser-drawn UI follows.
- **One continuous plate.** The page does not stack alternating section
  backgrounds. A section either sits on the ground, is milled into it as a
  pocket, or is the single struck-through dark field a page is allowed (used
  once, on the commercial break).
- **Depth is material, not decoration.** Every surface is either *struck*
  (inset: dark at the top edge where the punch entered, light rebound below) or
  *raised* (outset, offset, soft, tinted to the ground's hue). There are no
  flat bordered boxes.

## Colour

Defined once in `src/app/globals.css`. No hex appears anywhere else except the
four documented exceptions in `scripts/audit-copy.mjs`'s allowlist (the
`<meta name="theme-color">` tag and the Satori-rendered images, neither of
which can read a CSS custom property).

| Token | Value | Role |
|---|---|---|
| `--ground` | `#F2F3EF` | Milled aluminium. Page ground |
| `--plate` | `#FFFFFF` | A polished face standing off the ground |
| `--pocket` | `#E7E9E3` | A recess milled into the ground |
| `--ink` | `#15171A` | The punch impression. Primary text |
| `--ink-muted` | `#565C60` | Body copy, helper text |
| `--ink-faint` | `#868D89` | Rules, icons, display figures. **3.25:1 — never small text** |
| `--mark` | `#C9F24D` | The inked assay mark. The only accent |
| `--deep` | `#17191C` | The one dark field, once per page |
| `--danger` | `#B3261E` | Form validation, the single documented exception |

**Colour strategy: committed.** The chartreuse is a *field* colour: it fills
marks, the highlighted engagement plate, and the active filter. Text is never
set in it, because chartreuse on the plate cannot pass AA. The relationship is
always ink-on-chartreuse (~14:1), never the reverse.

## Type

| Role | Face | Notes |
|---|---|---|
| Display | **Clash Display** | Struck lettering. Tight, squared terminals |
| Body | **General Sans** | The working face |

Both self-hosted from Fontshare (ITF Free Font License, in `src/fonts/`), both
variable 200–700, both `display: "optional"` with `adjustFontFallback`.

**There is no mono face, deliberately.** Monospace as a costume for
"technical" is a category tell; the small marks in this world are struck caps
of the display face, which is what the world actually uses.

**No eyebrows.** The kicker label above a heading is banned outright, not
discouraged. The heading carries its own weight.

Display sizes are `clamp()`-driven. Measures live on the text element itself,
never on a wrapper: `ch` resolves against the element's own font size, so a
`15ch` cap on a 16px wrapper is ~120px wide and shreds a display headline into
a column. This bug shipped once during the build and was caught by measuring
rendered line counts.

## Geometry

Machined, not soft. Four radii, no others:

| Token | Value | Applies to |
|---|---|---|
| `--r-mark` | 3px | Marks, chips, inputs, buttons |
| `--r-plate` | 6px | Plates, panels |
| `--r-pocket` | 10px | Large milled pockets |
| `--r-full` | 999px | Only genuinely circular parts (the assay disc) |

**Nothing is a pill.** This world has no round-ended parts; a pill button would
be borrowed from a different system.

## The signature element

`src/components/ui/Hallmark.tsx` — the row of struck marks carrying maker's
mark, date letter (2017), and assay office. It opens the first viewport and
closes the page, and it rides on the OG share card so a shared link carries the
world. Each mark encodes something true; it is a structural device, not
ornament. The maker's mark derives from the capitals in `brand.shortName`, so a
rename cannot break it.

## Motion

The world's native motion is **the strike**: a punch descends, contacts, the
metal rebounds. Everything is that one gesture at different intensities rather
than a set of unrelated effects.

- `--ease-strike` `cubic-bezier(0.16, 1, 0.3, 1)` for entrances and presses.
- `--ease-settle` `cubic-bezier(0.22, 1, 0.36, 1)` for landings.
- `Reveal` has two modes: `settle` (quiet, for lists) and `strike` (falls
  further, lands with a blur clearing — for a section's own arrival). The page
  is not one identical entrance repeated down its length.
- The hero is the one **authored** moment: headline, subtext and marks are
  struck in sequence.
- Controls never float upward on hover. A raised control goes struck; a struck
  control goes deeper. A mark in metal does not levitate.
- `Process` is CSS `position: sticky` with a 14px per-card offset — the content
  *is* a sequence, so pinning makes the order literal. Zero JavaScript, and it
  respects reduced motion for free because there is no animation to disable.

Content is visible by default: no CSS hides it, and with JavaScript off no
inline style is applied, so the static export renders fully. Reduced motion is
enforced twice — per-component `useReducedMotion()` plus a CSS backstop.

## Browser surfaces

Themed from the palette rather than shipped as defaults: text selection
(chartreuse), the caret, custom scrollbars, and focus rings (2px solid ink,
2px offset). Tabular figures via `.tabular` wherever numbers align in a column.

## What this world refuses

Recorded because each was considered and rejected during the build:

- **Decorative grid backgrounds.** A tiled hairline grid shipped briefly behind
  the hero and was removed: the impeccable detector flagged it as a
  generated-UI signature, and it was correct — the grid was decorating, not
  measuring. Replaced with `plate-light`, a broad low-contrast highlight, which
  is material rather than pattern. Structure comes from hairline rules that
  actually divide content.
- **Cards as page structure.** The eleven capabilities are a milled index of
  ruled rows, not eleven identical tiles. Same-size icon-plus-heading-plus-text
  boxes are the lazy container, and nested plates are always wrong.
- **Independent catalog cards.** The featured templates are one sweepable row
  of identical units where only the practice name and swatch vary — you read
  across the row rather than opening each one.

## Non-negotiables inherited from the product

These are not visual decisions and must survive any future redesign:

- The brand name is swappable: it lives only in `src/config/brand.ts` and
  `src/components/brand/Logo.tsx`, verified by `npm run audit`.
- No fabricated clients, testimonials, or case studies. Sections gate on data
  length and render honest empty states.
- Static export only: no `useSearchParams()`, and every dynamic route needs
  `generateStaticParams`.

## Verified

Measured against the built output, not asserted:

- Lighthouse desktop — home: **P99 A100 B100 SEO100**, templates: P96 A100
  B100 SEO100, contact: P100 A100 B100 SEO100. CLS **0** on all three.
- Contrast: 172 elements on the home page, **zero failures**, using a canvas
  resolver (Tailwind's opacity modifier emits `oklab()`, which a naive regex
  parses as RGB and reports false failures).
- No horizontal overflow at 375 / 768 / 1440.
- Impeccable detector: clean.
- 51 internal links across 50 pages, none broken.

**Not verified:** no screenshot was captured. The browser pane in the build
session was not compositing frames, so every visual check here is
programmatic (computed styles, measured geometry, resolved contrast). A human
look at the rendered page is still owed.
