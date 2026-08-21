# Asset Manifest

Every image slot on the site, with the exact dimensions and subject needed.

**Status: no real assets yet.** The build uses `picsum.photos` with descriptive
seeds as documented placeholders so layout, aspect ratios and CLS behaviour are
correct from day one. Each slot below swaps to a real file at the given path
without touching any component.

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

## Template catalog — `public/templates/<slug>/preview.jpg`

**24 files, 1600×1200 each.**

Until the templates are actually built, these are *design-direction comps*, not
screenshots. The data model marks them `previewStatus: "comp"` and the card
renders a visible "Design concept" chip, so nothing on the page claims to be a
live preview when it is not.

Do **not** substitute an industry stock photo here. A photo of a dentist where a
website preview belongs misleads the buyer about what they are purchasing.

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

| Group | Count |
|---|---|
| Brand | 5 |
| Home | 5 (+ case studies later) |
| Templates | 24 |
| Services | 11 |
| About / Process | 6 |
| **Total** | **51** |

---

## Placeholder convention used in code

```tsx
// TODO(asset): hero photograph 1600x1200 — see design/ASSET-MANIFEST.md
<Image src="https://picsum.photos/seed/nm-hero-desk/1600/1200" ... />
```

Seeds are descriptive and stable (`nm-<section>-<subject>`) so the same
placeholder renders on every build rather than shuffling between deploys.
Search the codebase for `TODO(asset)` to find every remaining slot.
