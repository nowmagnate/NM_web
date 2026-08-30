# Template direction: the merged opening

**This governs all 24 templates, not just the one it was written for.** It
supersedes the split-hero wireframe on the art-direction board.

## The instruction

Set by the client against a 2026 reference: **bold huge text and a relevant
image or 3D model as the background of the hero, completely merged into one, so
the text and the image do not look separate from each other.**

## What that means mechanically

A hero is **one photograph carrying the type**, never an image placed beside
or between the copy.

| Layer | Token / component | Rule |
|---|---|---|
| 1. The photograph | `Backdrop` | Full bleed, from the very top of the page. The header is `fixed` so the image starts at y=0 and the nav sits ON it. |
| 2. The scrim | `[data-scrim]` in tokens.css | Three stacked gradients: nav zone, type region, foot wash. The type region is never below 80% ink. |
| 3. The ghost lettering | `Ghost onMedia` | Inverts to light at 15%, since ink at 11% is invisible on a scrim. |
| 4. Copy and action | `HeroField` | Light type only, at 100% or 85%. The primary action inverts to a light pill. |

**The image is the ground, not an object.** The first version of this kit
masked the hero image and floated it inside a tinted field. It read as a
picture stuck in the middle of the copy, because that is what it was. An object
in a layout is something type sits *next to*. A hero photograph is the surface
type is printed *on*.

### Legibility is arithmetic, not taste

A client will swap the hero photograph without asking anybody, so the only
image worth designing against is the palest one possible. Every scrim is
measured composited over **pure white**:

- full-strength `--tpl-on-ink` clears **5.8:1** on the lightest ink in the catalog
- the nav zone sits at 82% ink

`npm run check:contrast` measures all three for every template. The scrim
started at 72% and the check immediately failed the sub-headline on **seven of
eight templates**; the numbers above are what it took to pass. The eye did not
catch that, and would not have.

**There is NO dimmed tier over media.** All hero type is full-strength
`--tpl-on-ink`; hierarchy comes from size and weight. An 85% tier existed
briefly and the check failed it on Threshold, whose ink is the lightest in the
catalog. Deleting the tier was the right fix rather than darkening the scrim
again: the small uppercase labels wearing that 85% need *more* contrast than
the headline, not less, and a tier that only just passes today is a trap for
the next template whose ink nobody has chosen yet.

### Alignment

The demo bar, the nav and every `Wrap` share `max-w-[1180px]` and
`px-[var(--tpl-gutter)]`. The demo bar previously padded at a flat 20px against
the nav's gutter, which reaches 48px wide, and two stacked bars whose first
characters sit 28px apart is exactly the tell that makes a page look assembled.

### The three tests a hero has to pass### The three tests a hero has to pass

1. **The photograph is the ground.** If the image has an edge inside the band,
   it has failed. It bleeds to all four sides and starts at y=0.
2. **The type is on it, not beside it.** No column owns the copy and no box
   owns the image.
3. **The lettering is cropped.** Type that is fully visible reads as a headline
   and competes; type that runs off the edge reads as ground.
4. **The scrim, not the picture, decides legibility.** If swapping the image
   could break the headline, it has failed.

### Contrast is compositional, not a scrim

The headline never crosses the subject. It sits on flat field in the lower left
while the subject occupies the upper right. There is no gradient overlay to
tune, so a client swapping in a lighter photograph cannot break legibility.

`--tpl-field` holds ink at better than 10:1 by construction. Secondary copy on
the field uses `--tpl-muted-strong`, **not** `--tpl-muted`: the ordinary muted
token is derived against the plain ground and lands near 4.2:1 on a tinted one,
which is under AA. `npm run check:contrast` measures both.

### Mobile is a different composition on purpose

Absolute overlap at 375px is how a hero ends up with a headline across
somebody's face. Below `lg` the layers stack in flow: ghost behind, headline,
subject, action. The ghost survives at the smaller of its two sizes because it
carries the character.

## The differentiation rule

**The merged field is a principle, not an arrangement.** Shipped as one
arrangement it produces exactly the failure it exists to prevent: 24 templates
that are one template with the colours swapped. Enamel and Elm proved this the
hard way, so the rule is now explicit.

**No two templates in the same category may share any of these five:**
hero composition, display face, body face, ground temperature, signature detail.

**COMPLETE: 24 of 24.** All four archetypes built, every template running at
`/preview/<slug>/` and linked from the catalog.

| Category | Template | Composition | Ground | Motion | Display · Body |
|---|---|---|---|---|---|
| Medical & Dental | Enamel | `offset` | `#F3F7F9` | settle | Bricolage Grotesque · Manrope |
| | Elm | `centred` | `#F2F0E6` | settle | Fraunces · Public Sans |
| | Sprout | `banner` | `#FFF7F0` | settle | Familjen Grotesk · Figtree |
| | Fulcrum | `split` | `#E4E5E8` | settle | Chivo · Work Sans |
| | Lumen | `editorial` | `#F1E7E4` | settle | Cormorant Garamond · Jost |
| Wellness & Therapy | Asana | `banner` | `#FAF6F1` | settle | Outfit · Manrope |
| | Tempo | `centred` | `#F2F3F4` | settle | Archivo · Hanken Grotesk |
| | Quiet | `split` | `#E8ECEF` | rule | Lora · Karla |
| Home & Property | Crisp | `split` | `#F4F8F8` | settle | Familjen Grotesk · Hanken Grotesk |
| | Cornerstone | `banner` | `#F5F2ED` | reveal | Lora · Figtree |
| | Verge | `editorial` | `#EAF0E6` | reveal | Newsreader · Karla |
| | Framework | `offset` | `#E6E4E0` | reveal | Space Grotesk · IBM Plex Sans |
| Property & Design | Atelier | `editorial` | `#F0EBE3` | reveal | Cormorant Garamond · Jost |
| | Datum | `split` | `#EDEDED` | reveal | Space Grotesk · IBM Plex Sans |
| | Threshold | `banner` | `#EAEEE8` | reveal | Newsreader · Work Sans |
| | Meridian | `offset` | `#E3E0D8` | stagger | Instrument Serif · Public Sans |
| | Ledger | `centred` | `#E4E9EC` | stagger | Chivo · Manrope |
| Creative & Events | Aperture | `offset` | `#F7F7F7` | reveal | Instrument Serif · Work Sans |
| | Bloom | `centred` | `#FBF7F6` | reveal | Playfair Display · Jost |
| | Studio | `editorial` | `#E8E7E1` | reveal | Bricolage Grotesque · Hanken Grotesk |
| Legal & Financial | Counsel | `offset` | `#EDEEF1` | rule | Libre Baskerville · Karla |
| | Passage | `centred` | `#F1EDE6` | rule | DM Serif Display · Instrument Sans |
| | Balance | `split` | `#E9EFEB` | rule | Epilogue · IBM Plex Sans |
| | Compass | `editorial` | `#E8E6E0` | rule | Newsreader · Public Sans |

**Verified mechanically: 0 in-category composition clashes, 0 in-category
typeface clashes, 0 in-category ground collisions, 0 families over the
three-template budget.**

**Motion is the one axis that follows the ARCHETYPE rather than the template.**
Two templates in a category may share a curve, because the gesture belongs to
the kind of page it is: `settle` for booking-led, `reveal` for portfolio-led,
`rule` for authority-led, `stagger` for inventory. Meridian and Ledger are the
only two inventory templates and share `stagger`; they differ on composition,
both faces, ground and density instead.

**THIRTEEN catalog grounds were corrected** during the build because the
published swatch sat within a few steps of a same-category neighbour. That is
comfortably the most common defect in this whole project, and the reason it is
the first item below.

**Hue alone is not differentiation.** Elm was green and Enamel blue and they
still read as the same page, because both grounds were cool near-whites at
almost the same value. Two grounds that close in value AND temperature cancel a
difference in hue. Moving Elm to a warm chalk did more than the green did.

**Ghost treatment counts too.** `offset` stacks three words against the left
edge; `centred` runs one line across the middle and crops it symmetrically.

### The typeface rules, and why the first one was not enough

1. No family carries more than three templates across the catalog.
2. **No two templates in the same category share a family at all.**

Rule 1 was the original test and it was the wrong one. It permitted Elm and
Enamel to sit in Medical & Dental both set in Manrope. What matters is not how
many templates share a face across a catalog nobody reads end to end, it is
whether the two a buyer opens in adjacent tabs share one, and those two are
always in the same category.

Both are checkable: `assertPairingBudget()` and `assertNoCategoryClash()` in
`src/templates/kit/typography.ts`. Rule 2 found three real clashes the moment
it was written (Meridian/Ledger on Public Sans, Counsel/Passage on Karla,
Cornerstone/Verge on Figtree), all now fixed in the pairing table.

## The carries, beyond the hero

These are part of the same language and apply catalog-wide:

- **Pills for controls.** `--tpl-pill` is fully round whatever a template's
  structural `--tpl-radius` is, and is **not** configurable. A pill reads as a
  control, a rectangle reads as a container.
- **Nav as a floating group**, blending into the field at rest and taking a
  ground of its own once the field scrolls away.
- **Section headings set large and heavy**, `clamp(2rem, 4.2vw, 3.4rem)` at 700.
- **The ghost line is reusable.** Any band can carry one via `ghost` on the
  section config. The dark booking band uses it.
- **The wordmark at sign scale in the footer**, cropped by the band.
- **The seal.** One rotating stamp per page, hero only, off under reduced
  motion. The one looping animation the system permits.

## No fabricated before-and-after

Two templates have a results band in their catalog entry, and neither ships a
before-and-after grid.

Stock photographs cannot honestly be a matched pair of the same person, so
building one would be fabricating exactly the proof `PRODUCT.md` forbids, demo
label or not. **Tempo** uses written testimony with specific outcomes.
**Lumen** shows the room and the treatment, and its note states what a live
clinic should put there and what consent it needs first.

The `gallery` component keeps its `pairs` layout for **Threshold** and
**Verge**, where the before and after is a room or a garden rather than a
person. That is a comparison a photograph can honestly make.

## The asset gap, stated plainly

This layout is drawn for **cut-out subjects with a real alpha channel**: 3D
renders, masked product or equipment shots, isolated portraits. Every demo in the catalog ships a **real,
relevant, free-licensed photograph** self-hosted under
`public/templates/<slug>/`, with the `mask` treatment dissolving its edges into
the field. That is a genuine device in its own right, and it is still a
stand-in for the intended asset.

`design/ASSET-MANIFEST.md` carries the sourcing rule that applies to all 24,
including the three things that get a photograph rejected. A template that
ships to a paying client should carry `treatment: "cutout"`, a real transparent
subject, and the client's own people in the portraits.
