# Asset Manifest

Every image slot on the site, with the exact dimensions and subject needed.

**Status: split.** The 24 sold templates are **finished** and carry 92 real,
self-hosted photographs; see "Template imagery" at the foot of this file, which
is the part of this document that is current.

The studio's OWN pages still use `picsum.photos` with descriptive seeds as
documented placeholders, so layout, aspect ratios and CLS behaviour are correct
from day one. Each slot below swaps to a real file at the given path without
touching any component.

Image generation is not available in the environment this site was built in, so
the `brandkit` and `imagegen-frontend-web` skills could not be run. Two ways to
fill this list:

1. Run those two skills in a session that has image generation, using
   [`/DESIGN.md`](../DESIGN.md) as the art direction brief. NOTE: the site was
   redesigned into Struck & Assayed after this manifest was written, so the
   art direction below is superseded by DESIGN.md where the two disagree.
   The slot list, paths and dimensions are still current.
2. Supply real photography. Preferred for anything showing people or work.

---

## Art direction (applies to every slot)

Available light. Real workspaces. Slightly desaturated so cobalt stays the
loudest element on the page. People are working, not posing at the camera.

**Banned:** stock-photo eye contact, team high-fives, handshake-over-desk,
floating 3D geometry, purple or blue gradient glow, fake dashboard screenshots,
anything with legible fake UI text.

---

## Brand assets — `public/brand/`

| File | Size | Notes |
|---|---|---|
| `logo-mark.svg` | square, 32px grid | **Placeholder exists** — geometric mark drawn inline in `Logo.tsx`. Replace with designed artwork |
| `logo-wordmark.svg` | height 32 | Optional. Currently set in Cabinet Grotesk as live text, which is sharper at every size |
| `og-default.png` | 1200×630 | Default social share card. **Missing** |
| `icon.svg` | 32×32 | Favicon, derived from the mark. **Missing** |
| `apple-icon.png` | 180×180 | **Missing** |

---

## Home page

| # | Slot | Dimensions | Subject |
|---|---|---|---|
| 1 | Hero primary | 1600×1200 (4:3) | A developer's desk mid-work. Real screen content out of focus, notebook, coffee, natural window light from the side. No face to camera |
| 3 | Bento — capability tile A | 800×600 | Close crop of hands at a mechanical keyboard, warm side light |
| 3 | Bento — capability tile B | 800×600 | A phone held in one hand showing an app in use, shallow depth of field |
| 3 | Bento — capability tile C | 800×1200 (tall) | Wide shot of a small studio workspace, two or three desks, no people or people out of focus |
| 5 | Since-2017 editorial | 1600×900 (16:9) | The most important image on the site. Should read as "a real team in a real place". Interior of a working studio, lived-in, not a rendered co-working space |
| 8 | Case-study cards | 1200×800 each | Only needed once real case studies exist. Should be real project screenshots, never mockups |

## Template catalog — SUPERSEDED

This section originally called for **24 files at
`public/templates/<slug>/preview.jpg`**, 1600×1200, as design-direction comps
until the templates existed. None were ever produced and none are needed.

All 24 templates are now built and run at `/preview/<slug>/`. The catalog does
two things instead:

- **Card image** — the template's own `hero.jpg`, which is a real photograph
  from the template rather than a comp of it.
- **Detail page** — a live scaled iframe of the running template, plus a link
  to open it full size.

A captured screenshot was considered and rejected: it is a second artefact that
goes stale the moment a template changes, and this build shipped thirteen
ground corrections and a complete hero rework, each of which would have
invalidated a set of captures nobody remembered to retake. The embed cannot go
stale, because it is the template.

The original warning still holds and is now enforced by the registry rather
than by a flag: **a card may only offer a live preview for a slug that has an
entry in `src/templates/registry.ts`.** Anything else falls back to the concept
chip. See "Template imagery" below for what actually shipped.

Slugs, in catalog order:

```
Property & Design      real-estate-agent, interior-designer, architecture-studio,
                       home-staging, property-management
Medical & Dental       family-practice, dental-practice, pediatric-clinic,
                       physiotherapy-chiropractic, med-spa-aesthetics
Legal & Financial      law-firm, immigration-attorney, accounting-bookkeeping,
                       financial-advisory
Wellness & Therapy     therapy-counseling, yoga-pilates-studio, personal-training
Creative & Events      photography-studio, wedding-event-planning,
                       design-consultancy
Home & Property        custom-home-builder, landscape-design-build,
                       remodeling-contractor, cleaning-services
```

## Service pages — `public/services/<slug>/hero.jpg`

**11 files, 1600×900 each.** Each service page needs a distinct image, otherwise
eleven pages built from one template read as eleven copies of the same page.

```
landing-pages, web-applications, mobile-apps, saas-products, ecommerce,
mobile-games, ai-agents, ai-tools, mvp-engineering, cloud-devops, product-design
```

## Other pages

| Page | Slot | Dimensions |
|---|---|---|
| `/about` | Studio / team | 1600×900 |
| `/about` | Timeline supporting image | 1200×800 |
| `/process` | One image per stage (4) | 1000×750 each |

---

## Totals

| Group | Count | Status |
|---|---|---|
| Brand | 5 | Outstanding |
| Home | 5 (+ case studies later) | Outstanding |
| Template previews | 0 | **No longer needed.** Superseded by live embeds |
| Template photography | 92 | **Done.** Real, self-hosted, see below |
| Services | 11 | Outstanding |
| About / Process | 6 | Outstanding |
| **Outstanding total** | **27** | The studio's own site |

The template catalog is finished. Everything still outstanding belongs to the
studio's own pages, not to the product.

---

## Placeholder convention used in code

```tsx
// TODO(asset): hero photograph 1600x1200 — see design/ASSET-MANIFEST.md
<Image src="https://picsum.photos/seed/nm-hero-desk/1600/1200" ... />
```

Seeds are descriptive and stable (`nm-<section>-<subject>`) so the same
placeholder renders on every build rather than shuffling between deploys.
Search the codebase for `TODO(asset)` to find every remaining slot.

---

# Template imagery

**Status: complete. 24 of 24 templates, 92 photographs, all real, all
self-hosted.** No template references `picsum.photos`, and `npm run
check:templates` fails the build if one ever does.

Files live at `public/templates/<slug>/`. Every image slot in `src/templates/`
points at one of them.

## The sourcing rule, applied to all 24

1. **Source:** Pexels. Free for commercial use, no attribution required, and
   the URLs are stable and downloadable.
2. **Self-host, never hotlink.** Committed under `public/templates/<slug>/`.
   That removes a `remotePatterns` entry, removes a third-party request from a
   page whose job is a first appointment, and means a preview link a prospect
   opens cannot break because a CDN changed.
3. **Look at every image before using it.** Not the search-result title, the
   image itself. Around forty candidates were rejected across the build, and
   not one of them for a reason the title disclosed.
4. **Record the real pixel dimensions** in the config. Mandatory in the schema,
   and what holds CLS at zero.
5. **Write the alt text against the photograph you actually got**, not the one
   you went looking for.

## What gets a photograph rejected

- **Another business's identity.** "Deko+" and "Dentify" on a clinic wall and
  uniform; a "Recovery Sport Center" wall; an "EAST WEST" gym rack;
  "SENSASKIN" towels; a "lash out" apron.
- **A real person's identity.** A lab coat embroidered "Dr. José Pedro,
  Ortodontia"; another reading "…el Moranchel"; a family's name plaque over a
  fireplace.
- **Third-party creative work as the subject.** A room dominated by a
  recognisable living artist's framed painting.
- **A brand that dominates the frame.** Two large softbox logos as the visual
  focus; a camera body filling a third of the image; a sportswear crest.
- **Props that contradict the copy.** A beer can on a shelf in a clinic; a
  stethoscope on a dentist.

**What is NOT a rejection: set dressing.** An appliance brand on a fridge, a
manufacturer's name on gym equipment, a newspaper on a desk, protective film on
a window. The rule is about another BUSINESS being presented as connected to
this one, or a real person's identity appearing on a fictional page. Excluding
every visible product name would make real-estate, kitchen and gym photography
impossible.

## What a paying client must replace

Stock portraits are fine on a preview whose demo bar says the practice is
fictional. They are **not** fine on a live site, where a photograph of a
stranger presented as "our dentist" is a straightforward misrepresentation.
**Every template handed to a client ships with its portraits replaced by their
own people.** A delivery checklist item, not a nice-to-have.

## Slots per template

Derived from what the configs actually reference. `hero` is the full-bleed
backdrop; see `design/TEMPLATE-DIRECTION.md` for how it is used.

| Template | Slots |
|---|---|
| accounting-bookkeeping | hero |
| architecture-studio | hero, practice, principal, work-1 to work-4 |
| cleaning-services | hero, detail |
| custom-home-builder | hero, build-1, build-2 |
| dental-practice | hero, interior, reception, team-nadia, team-marcus, team-priya, team-tom |
| design-consultancy | hero, studio, person-1, person-2 |
| family-practice | hero, rooms, registering, doctor-1 to doctor-3 |
| financial-advisory | hero, meeting |
| home-staging | hero, before, staging-1 to staging-3 |
| immigration-attorney | hero, desk |
| interior-designer | hero, feature, project-1 to project-4 |
| landscape-design-build | hero, project-1, project-2 |
| law-firm | hero, firm, attorney |
| med-spa-aesthetics | hero, room, treatment, practitioner |
| pediatric-clinic | hero, visit, room |
| personal-training | hero, session, trainer |
| photography-studio | hero, about, work-1 to work-3 |
| physiotherapy-chiropractic | hero, approach, physio-1, physio-2 |
| property-management | hero, listing-1 to listing-3 |
| real-estate-agent | hero, agent, listing-1 to listing-3 |
| remodeling-contractor | hero, project-1, project-2 |
| therapy-counseling | hero, room |
| wedding-event-planning | hero, event-1 to event-3 |
| yoga-pilates-studio | hero, studio, teacher-1, teacher-2 |

## The one asset gap left

The hero is a photograph used as the ground, which is the right model and is
what shipped. Several templates would still be improved by a **cut-out subject
on a transparent background** placed over the field: a 3D render, a masked
product shot. That is a commission rather than a stock search, and nothing in
the catalog depends on it.

## Where honesty was chosen over the obvious build

Recorded because each was a decision rather than an oversight, and a reviewer
should be able to find the reasoning without reading 24 config files:

- **Tempo and Lumen** carry no before-and-after pairs. Stock cannot supply the
  same subject photographed twice, so a pair would be fabricated evidence.
- **Threshold and Verge** likewise, correcting an earlier note that said the
  `pairs` layout would be used there. The problem was never that the subject is
  a body; it is that both frames must be the same subject.
- **Aperture** states in its index that the photographs are licensed stock
  standing in for a portfolio. On a photographer's template that band is the
  one thing that genuinely cannot be filled with anything else.
- **Atelier, Datum, Bloom and Studio** invent their press, awards, suppliers
  and client names, and say so on the page. Naming real ones on a fictional
  practice is the same problem as a logo in the photography.
- **Framework** publishes a licence number of zeros rather than a
  plausible-looking registration a reader might try to verify.
- **Quiet** carries no testimonials at all.
- **Compass** shows no performance figures anywhere.
- **Counsel** describes outcome types, with no figures and no client names.
- **Passage** refuses to build an eligibility calculator.
- **Balance** and **Ledger** publish real jurisdictional deadlines and
  obligations, because invented ones would cost a reader a penalty, and both
  say they must be re-checked before publication.
