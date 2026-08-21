# Next Steps — NowMagnate Innovations Website

**Read this first in any fresh session.** It summarizes a long build session and
tells you exactly what's done, what's not, and what will bite you if you don't
know about it. For full detail, see [`BUILD-PLAN.md`](./BUILD-PLAN.md) (the
original architecture plan and phase-by-phase build record) and
[`README.md`](./README.md) (setup, scripts, deployment).

Last updated: 2026-08-14. Nothing has been committed to git yet — everything
in the repo is untracked (`git status` shows the whole tree as `??`). No
Firebase project exists, nothing is deployed.

---

## What this is

An India-based software studio's marketing site, serving two audiences on one
site: (1) custom software services for international founders, and (2) a
$499 productized landing-page offer for US/CA/EU local professional practices
(realtors, dentists, lawyers, etc.), with a 24-template catalog. Full context
and the "why" behind every architectural decision is in `BUILD-PLAN.md`.

**Stack:** Next.js 15 (App Router) + Tailwind v4 + TypeScript, fully static
export (`output: 'export'`), targeting Firebase Hosting's free Spark tier.
That last constraint (no server, no Cloud Functions) shapes almost every
architectural decision in this codebase — read the "free-tier constraint"
section of `BUILD-PLAN.md` before changing how forms, payments, or dynamic
routes work.

---

## Current status: built, redesigned, and verified

All 9 build phases complete, then the whole visual system was **replaced** in a
later session. The current design is **Struck & Assayed** — see `DESIGN.md`.
The earlier light-editorial look is gone; `design/DESIGN-NOTES.md` is a
superseded pointer.

Static pages build clean. Typecheck, lint, and the custom copy/brand audit all
pass. Lighthouse desktop: home **P99 A100 B100 SEO100**, templates P96 A100
B100 SEO100, contact P100 A100 B100 SEO100. CLS **0** on all three. Impeccable
detector clean. Zero contrast failures across 172 elements.

**Nobody has looked at it yet.** Every visual check in these sessions was
programmatic — the browser pane never composited frames, so no screenshot was
ever captured. A human look at the rendered pages is the first thing worth
doing, and the most likely source of "this reads wrong" feedback the automated
checks cannot catch.

Verify the build is still green before doing anything else:
```bash
npm install
npm run typecheck && npm run audit && npx eslint . && npm run build
```

The impeccable plugin is installed in `.claude/` with detector hooks active on
UI edits. `npx impeccable detect src/` runs it manually; `/impeccable audit`
and `/impeccable critique` are available for design review.

---

## Do these things next, roughly in priority order

### 1. Real content (blocks nothing technically, blocks launch quality)
- **`src/config/brand.ts`** — business address, phone, sales email, social
  handles are all placeholder/empty. `legalName` needs updating once
  registered.
- **`src/data/story.ts`** — the 2017-to-now milestone timeline has 2 entries
  marked `TODO(content)` with no real substance. Get real dates/turning
  points from the user.
- **`src/data/offer.ts`** — READ THIS BEFORE LAUNCH. It's the $499 offer's
  scope, inclusions, exclusions, and 5–7 day turnaround. This is a
  commercial commitment rendered verbatim on 4+ pages. The user needs to
  approve or edit it.
- **`src/data/clients.ts` / `src/data/case-studies.ts`** — both ship as typed
  empty arrays on purpose (no fabricated clients/testimonials/case studies).
  When the user has real ones: populate `clients.ts` and `case-studies.ts`,
  and for a full case-study page also add an `.mdx` file per
  `src/content/case-studies/README.md`. **Verified working**: populating
  these switches the trust bar, testimonials section, and `/work` from their
  honest empty states to full content automatically — no other code changes
  needed. (I tested this by temporarily adding fake entries, confirming the
  switch, then reverting — see the chat history / git diff pattern if you
  want to re-verify.)
- **Domain name** — `brand.domain` and `NEXT_PUBLIC_SITE_URL` in `.env.local`
  both need to match whatever domain the user actually buys.

### 2. Real photography — the single biggest visible gap
Every image on the site (51 slots total) is a `picsum.photos` placeholder
with a `TODO(asset)` comment next to it. Full list with exact dimensions:
**`design/ASSET-MANIFEST.md`**.

No image-generation tool has been available in any session so far, so no
comps were ever produced. If a fresh session has image-gen tools, that is
the natural next step: generate against **`DESIGN.md`** (the current
Struck & Assayed art direction — bright milled plate, struck depth,
chartreuse assay mark), then swap the picsum URLs for real assets using the
seeds and paths already documented in `ASSET-MANIFEST.md`.

Note the redesign reduced how much the design leans on photography: the
hero has no image box at all, and the capability section is a milled index
rather than image tiles. The remaining slots are mostly template previews
and per-service heroes.

### 3. Deploy — nothing is live yet
Complete step-by-step instructions are in the **"Deploying"** section of
`README.md`: create a Firebase project (Spark plan), enable Firestore +
App Check, fill in `.env.local` from `.env.example`, deploy rules, then
hosting, then verify the lead pipeline end-to-end on the live URL. This
needs the user's own Firebase account and credentials — not something to do
without them present.

### 4. Firestore rules — written, never actually run against a real emulator
`scripts/test-firestore-rules.mjs` tests `firestore.rules` (create-only
leads collection, field-shape validation, App-Check-required) against the
Firestore emulator. **The sandbox this was built in has no Java**, which the
emulator needs, so this was verified by careful manual trace + confirming
the harness loads the rules correctly, but the actual test run never
executed. Run it for real before trusting the rules in production:
```bash
npx firebase emulators:exec --only firestore "node scripts/test-firestore-rules.mjs"
```

### 5. Stripe — deliberately off by default
`NEXT_PUBLIC_STRIPE_PAYMENT_LINK` is unset, so template pages show a
brief-request flow with "online checkout coming soon" — this is correct
until the business is actually registered with Stripe. See
`src/config/payments.ts` and the "Turning Stripe on later" section of
`README.md` when that happens. **Do not** try to build a server-side Stripe
Checkout integration — the static-export/Spark-tier constraint means a
Payment Link is the only architecture that works without a server.

---

## Traps a fresh session could fall back into (read before touching these areas)

These are real bugs found and fixed this session. The underlying causes are
non-obvious, so if similar code gets rewritten without this context, they
can silently come back.

1. **Never use `useSearchParams()` from `next/navigation` in this project.**
   It forces Next's static export to defer everything in its nearest
   Suspense boundary to client-only rendering. This actually happened: the
   entire `/brief` form and the entire `/templates` 24-card catalog were
   silently missing from the static HTML (only an empty Suspense fallback
   shipped), invisible to search engines and anyone without working JS,
   until caught via a real Lighthouse audit. If you need query-string state
   in a client component, read `window.location.search` directly in a
   `useEffect` after mount instead — see `TemplateCatalog.tsx` and
   `BriefForm.tsx` for the working pattern.

2. **Every webfont must be self-hosted with `adjustFontFallback` set.**
   The site previously used the `geist` npm package, whose own font loader
   sets `adjustFontFallback: false` — no metric matching, so the swap from
   fallback to real font caused measurable layout shift (Lighthouse CLS 0.77
   on /templates). The current faces (Clash Display, General Sans) are
   self-hosted from Fontshare in `src/fonts/` with `adjustFontFallback:
   "Arial"` and `display: "optional"`. CLS is now 0. Do not swap in a font
   package that manages its own loader without checking that setting.

   Related: a `ch` measure must sit on the text element itself, never on a
   wrapper. `ch` resolves against the element's OWN font-size, so `max-w-[15ch]`
   on a 16px wrapper is ~120px wide and shredded the hero headline into eight
   lines. Caught by measuring rendered line counts, not by eye.

3. **`output: 'export'` rejects a dynamic route with zero static params.**
   Next treats an empty `generateStaticParams()` result on a dynamic segment
   as a build error, not "generate nothing." This is why
   `src/app/work/[slug]/page.tsx` doesn't exist as a live route yet — with
   zero case studies, it can't. The working page code is preserved at
   `src/content/case-studies/page.tsx.template`; copy it to
   `src/app/work/[slug]/page.tsx` the first time a real case study is added
   (see `src/content/case-studies/README.md`).

4. **Simple Icons removed the AWS and OpenAI brand marks entirely** (verified
   by inspecting the actual npm package contents, not just a 404 on the
   CDN). If you add more tech-stack logos to `src/data/clients.ts`, test the
   slug against `https://cdn.simpleicons.org/{slug}/_/999999` before
   trusting it.

5. **The `<meta name="theme-color">` and OG-image/favicon files
   (`opengraph-image.tsx`, `icon.tsx`, `apple-icon.tsx`,
   `src/lib/brandMarkSvg.tsx`) are the ONLY places hardcoded hex colors are
   allowed.** They're in `scripts/audit-copy.mjs`'s allowlist for a real
   reason: Satori (the OG/icon image renderer) and `<meta>` tags can't read
   CSS custom properties. Don't "fix" these by trying to reference
   `var(--accent)` — it won't work, and don't add new hardcoded hex
   elsewhere without adding it to the allowlist with the same justification.

6. **Firebase Hosting needs NO SPA-style catch-all rewrite for this project.**
   An early draft of `firebase.json` had `rewrites: [{source: "**",
   destination: "/404.html"}]`, which would have sent every single request
   to the 404 page — caught before it shipped. Next's static export with
   `trailingSlash: true` already produces `<route>/index.html` for every
   page, which Firebase Hosting serves natively. The current
   `firebase.json` has no rewrites section; keep it that way unless you have
   a specific, well-understood reason to add one.

---

## Quick reference

**Key commands:**
```bash
npm run dev          # dev server, localhost:3000
npm run build         # static export to out/ — this is what actually ships
npm run typecheck     # tsc --noEmit
npm run lint           # eslint
npm run audit         # custom copy/brand/hex/secret-key audit — run before every deploy
npm run format         # prettier
```

**Key docs, in order of how often you'll need them:**
- `README.md` — setup, env vars, scripts, full deployment walkthrough
- `BUILD-PLAN.md` — the original architecture plan, decisions and why, phase-by-phase record, full "Open items for you" list
- `DESIGN.md` — **the current design system** (Struck & Assayed): palette, type, geometry, depth, motion, and what this world refuses. Read before touching any visual code
- `PRODUCT.md` — durable product truth (users, positioning, constraints, what must never be fabricated)
- `design/DESIGN-NOTES.md` — superseded, kept only as a pointer to `DESIGN.md`
- `design/ASSET-MANIFEST.md` — every image slot, exact dimensions, current placeholder status
- `src/content/case-studies/README.md` — how to add a real case study (two files + a one-time route activation step)

**Brand rename test** (verifies the core "swap the name later" requirement
still holds): edit `name`/`shortName`/`legalName` in `src/config/brand.ts`,
run `npm run build`, then `grep -rl "NowMagnate" out/` should return nothing.
Revert after testing.
