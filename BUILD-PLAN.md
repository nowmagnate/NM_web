# NowMagnate Innovations — Website Build Plan

## Context

You have been running a software practice since **2017**, starting as a freelance operation and delivering projects for Indian clients and startups. Growth has been deliberate and slow. You are now formalizing it into a full studio and opening it to international clients in the US, Canada, and Europe.

The website has two jobs that pull in different directions, and both must work:

1. **Credibility engine** for custom software work — web apps, mobile apps, SaaS, ecommerce, 2D mobile games, AI agents and AI tooling. Buyers are founders and product leads who have been burned by offshore vendors. The site has to defeat that prior, not ignore it. Your nine-year track record is the strongest asset you have, and it is true, so the site leads with it.
2. **Productized commerce** for a **$499 template-based landing page** offer aimed at established local businesses in the US/CA/EU — realtors, interior designers, architects, doctors, dentists, law firms and similar professional practices. These buyers are non-technical and decide in one session.

Two constraints shape the architecture:

- **The company name and logo are not final.** "NowMagnate Innovations" is a placeholder. Every brand-bearing string and mark resolves from one config module, so a rename is a one-file edit plus an asset swap, verified by a grep returning zero hits.
- **Stripe is not connected yet.** You need a registered business first. Payment UI is env-gated: absent key means a "Coming soon" state and brief-only flow, present key means live checkout, with no code change between the two.

Current state: `C:\Projects\NM` is empty. Not a git repo. Node v24.18.0, npm 11.16.0.

**Step 0 of implementation: copy this file to `C:\Projects\NM\BUILD-PLAN.md`** so it lives with the code.

---

## Decisions locked

| Decision | Choice |
|---|---|
| Visual direction | Light editorial studio — cool bone canvas, oversized grotesk display, photography-led, ONE saturated cobalt accent |
| Stack | Next.js 15 App Router + Tailwind v4 + TypeScript, **`output: 'export'` static** |
| Hosting | **Firebase Hosting, Spark (free) tier**. Firestore free tier for leads |
| $499 payment | Stripe **Payment Link**, env-gated. Hidden as "Coming soon" until the key exists |
| Template audience | Professional local practices — realtors, interior designers, architects, doctors, dentists, law firms and adjacent |
| Content | Real narrative written from the 2017-freelance-to-studio story. Client names and projects stay as empty typed data until you supply them |

---

## The free-tier constraint and what it forces

Firebase **Spark** tier gives free Hosting and Firestore but **no Cloud Functions** and no App Hosting. That rules out Next.js SSR and Server Actions. The architecture adapts:

| Need | Spark-tier solution |
|---|---|
| Page rendering | `output: 'export'` — fully static, prerendered at build. All 24 template routes via `generateStaticParams` |
| Image optimization | `images: { unoptimized: true }` in `next.config.ts`. Compress assets at build time instead; ship AVIF/WebP with correct `width`/`height` |
| Lead form submission | Firebase **client SDK** writes directly to Firestore `leads`, guarded by security rules + App Check (reCAPTCHA v3, free) |
| Email notification | No Cloud Functions on Spark. Primary record is the Firestore document. Optional env-gated webhook to a free form-relay (Web3Forms / Formspree free tier) for an email ping. If neither env is set, leads land in Firestore only and you check the console |
| $499 payment | Stripe **Payment Link** — a static URL, no server needed, no secret key ever in the client |

**Known growth blockers, so you know when to upgrade:** Hosting free tier caps at ~360MB/day transfer and 10GB storage; Firestore at 20k writes and 50k reads/day. A marketing site will not hit these early. The first real blocker will be wanting server-side Stripe Checkout Sessions, webhooks, or transactional email — all of which need Blaze. **The code is structured so that upgrade is an adapter swap, not a rewrite** (see Payments below).

---

## Design system

> **SUPERSEDED — this section is a historical record, not current guidance.**
> The visual system described below (cool off-white canvas, cobalt accent,
> Cabinet Grotesk + Geist + Geist Mono, double-bezel cards, section eyebrows)
> was replaced wholesale in a later session by **Struck & Assayed**.
> The authority is [`/DESIGN.md`](./DESIGN.md). Everything else in this plan —
> architecture, constraints, content strategy, phase record — is still accurate.

### Design read
> B2B services site plus a productized commerce catalog, for international startup founders and US/CA/EU professional practices, with a light editorial studio language, leaning toward Tailwind v4 + Cabinet Grotesk + Geist + restrained motion.

**Dials: `DESIGN_VARIANCE: 8` / `MOTION_INTENSITY: 6` / `VISUAL_DENSITY: 3`**

Follow `~/.claude/skills/design-taste-frontend/SKILL.md` throughout — load it at the start of every build phase. Sections 4.7 (layout discipline), 4.8 (image strategy), 4.9 (content density), 9 (AI tells) and 14 (pre-flight) are enforcement gates. Load `high-end-visual-design` for double-bezel card architecture and motion choreography.

### Tokens — `src/app/globals.css`

Single source of truth as CSS custom properties. No hex values outside this file.

```
Light (default, on bare :root)
  --canvas      #F7F7F6   cool off-white paper, NOT warm beige
  --surface     #FFFFFF
  --surface-alt #EFEFEE
  --ink         #0D0D0F   neutral near-black, NOT espresso
  --ink-muted   #5A5A60
  --ink-faint   #8E8E96
  --hairline    rgba(13,13,15,0.08)
  --accent      #1B4DFF   cobalt, the ONLY accent
  --accent-ink  #FFFFFF
  --accent-soft rgba(27,77,255,0.08)

Dark  (@media prefers-color-scheme: dark guarded by :root:not([data-theme="light"]), plus :root[data-theme="dark"])
  --canvas      #0B0B0C
  --surface     #141416
  --surface-alt #1C1C1F
  --ink         #F5F5F4
  --ink-muted   #A1A1A8
  --hairline    rgba(255,255,255,0.10)
  --accent      #4A72FF   lifted for contrast on dark
```

**Color consistency lock:** cobalt is the only accent site-wide. No teal badges, no green success chips, no amber warnings. Form validation error red is the single documented exception, desaturated to harmonize with the neutrals.

**Warm-craft palette ban applies.** Do not drift the canvas toward `#f5f1ea` / `#faf7f1` beige, and no brass, clay or ochre accents.

### Typography

| Role | Font | Source |
|---|---|---|
| Display | **Cabinet Grotesk** Variable | Fontshare, self-hosted via `next/font/local` |
| Body / UI | **Geist Sans** | `geist` npm package |
| Micro-labels | **Geist Mono** | `geist` npm package |

Never link Google Fonts via `<link>`. Inter, Roboto, Arial, Open Sans, Helvetica are banned. **No serif anywhere.** Emphasis inside a headline uses italic or bold of Cabinet Grotesk itself, never a second family. Italic words containing `y g j p q` need `leading-[1.1]` minimum plus `pb-1` reserve.

Scale: display `text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-[1.05]` · hero may reach `text-5xl md:text-6xl lg:text-7xl` only at 3–5 words · body `text-base text-[--ink-muted] leading-relaxed max-w-[65ch]`.

### Shape and material — documented once, applied everywhere

- **Radius scale (locked):** buttons `rounded-full` · cards and panels `rounded-[20px]` · inputs and chips `rounded-[10px]` · images inside cards `rounded-[14px]`. No other values.
- **Double-bezel cards:** outer shell `p-1.5 rounded-[20px] bg-[--surface-alt] ring-1 ring-[--hairline]` wrapping inner core `rounded-[14px] bg-[--surface] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]`. Concentric radii.
- **Shadows:** diffused, tinted to canvas hue. Never `shadow-md`, never `rgba(0,0,0,0.3)`.
- **Rhythm:** `py-24` minimum, `py-32`/`py-40` for major sections.
- **Container:** `max-w-[1400px] mx-auto px-4 md:px-8`. **Full-height:** `min-h-[100dvh]`, never `h-screen`. **Grid over flex-math.**

### Icons and motion
`@phosphor-icons/react` at weight `"light"`, one family site-wide, never hand-rolled SVG paths, no emoji in UI.

`motion` (import from `motion/react`), cubic-bezier `[0.16, 1, 0.3, 1]`, no `linear` or `ease-in-out`. GSAP + ScrollTrigger only for the single pinned sticky-stack section. Every animation justifiable in one sentence. Full `prefers-reduced-motion` support. Animate only `transform` and `opacity`.

---

## Brand abstraction — the rename requirement

**`src/config/brand.ts`** is the only place brand facts exist:

```ts
export const brand = {
  name: "NowMagnate Innovations",
  shortName: "NowMagnate",
  legalName: "NowMagnate Innovations",       // update on registration
  domain: "nowmagnate.com",
  tagline: "<edit later>",
  foundedYear: 2017,
  email: { sales: "...", support: "..." },
  phone: "...",
  address: { line1, city, state, country, postal },
  social: { linkedin, x, github, dribbble },
  templatePrice: 499,
  templateCurrency: "USD",
} as const;
```

**`src/components/brand/Logo.tsx`** — one component, variants `wordmark | mark | lockup`, sizes `sm | md | lg`, reads `brand.shortName`, inherits `currentColor` so light and dark need one asset.

Enforced rules:
- No literal `"NowMagnate"` anywhere outside `brand.ts` and `Logo.tsx`. Grep must return zero hits.
- Metadata, OpenGraph, JSON-LD, footer copyright, form email templates all derive from `brand`.
- Assets at fixed filenames in `public/brand/` (`logo-mark.svg`, `logo-wordmark.svg`, `og-default.png`) so swapping is a file replace.
- **Years-in-business is computed**, never hardcoded: `new Date().getFullYear() - brand.foundedYear`.

---

## Content strategy — real, from your actual story

No invented clients, no fabricated testimonials, no fake metrics. The true story is stronger than filler, and it is the spine of the copy.

**The narrative:** a practice that has been shipping since 2017, built on referrals and repeat work with Indian startups, deliberately grown rather than scaled fast, now opening to international clients. The honest positioning is *"nine years of shipping, now open to the world"* — experience without the agency overhead. Section 5 of the home page and `/about` both run on this.

**Data files with editable placeholders:**

| File | Contents | Launch state |
|---|---|---|
| `src/data/story.ts` | Founding year, milestone timeline, positioning statements | Written from your real history. Milestone details left as `TODO` comments where I lack specifics |
| `src/data/clients.ts` | `export const clients: Client[] = []` with typed shape and two commented example entries | **Empty.** Trust bar renders the tech-stack logo wall while empty, client logos once populated |
| `src/data/case-studies/*.mdx` | Frontmatter shape defined, pipeline scaffolded | **Zero entries.** `/work` renders a composed empty state |
| `src/data/testimonials.ts` | Typed empty array | **Empty.** Section does not render until length > 0 |
| `src/data/services.ts` | 11 capability definitions with real copy | Fully written |
| `src/data/templates.ts` | 24 template definitions | Fully written |
| `src/data/offer.ts` | $499 scope, inclusions, exclusions, turnaround | Fully written, **you must review before launch** |
| `src/data/faq.ts` | Objection-handling Q&A | Fully written |

Every section that depends on empty data is **gated by a length check**, so the site never renders a hollow "Testimonials" heading with nothing under it. When you hand over real client names and projects, populating the array is the only change needed.

---

> **Superseded.** Payments now go through Razorpay Standard Checkout with a small Cloudflare Worker (see `workers/payments/README.md` and `src/config/payments.ts`), gated by `NEXT_PUBLIC_PAYMENTS_API_URL`. The Stripe Payment Link design below is kept for history only.

## Payments — env-gated Stripe

### `src/config/payments.ts`

```ts
const link = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;
export const paymentsEnabled = Boolean(link && link.startsWith("https://"));
export function checkoutUrl(templateSlug: string, email?: string) { /* appends
  ?client_reference_id=<slug> and optional prefilled_email */ }
```

**Why a Payment Link and not Checkout Sessions:** Checkout Sessions require a server to hold the secret key. On the Spark free tier there is no server. A Stripe Payment Link is a static URL created in the Stripe dashboard, safe to embed, and supports `client_reference_id` so you know which template each payment came from. It is the only architecture that satisfies both "free tier" and "real payments".

**Two states, one codebase:**

| `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` | Behavior on `/templates/[slug]` |
|---|---|
| unset | Primary CTA is "Request this template" → `/brief?template=<slug>`. A secondary line reads "Online checkout coming soon". No dead or disabled buttons |
| set | Primary CTA is "Get started — $499" → Stripe Payment Link with `client_reference_id`. Secondary CTA "Ask a question first" → `/brief` |

**Important for static export:** `NEXT_PUBLIC_*` vars are inlined at build time. Turning payments on means setting the env and **rebuilding and redeploying** — not a runtime toggle. Documented in `README.md`.

**Upgrade path when you move to Blaze:** all payment logic is behind `src/config/payments.ts` and a `PaymentCTA` component. Swapping to server-side Checkout Sessions plus webhooks means changing those two files, not the 24 template pages.

---

## Information architecture

```
/                        Home
/services                Capability hub
/services/[slug]         11 capability pages
/templates               $499 catalog, 24 templates, filterable
/templates/[slug]        Template detail + payment or brief CTA
/brief                   $499 structured intake (accepts ?template=slug)
/work                    Case studies index (composed empty state at launch)
/work/[slug]             MDX case study
/about                   The 2017-to-now story
/process                 How engagements run
/pricing                 Engagement models
/contact                 General enquiry
/legal/privacy | /legal/terms | /legal/refund-policy
```

Service slugs (11): `landing-pages`, `web-applications`, `mobile-apps`, `saas-products`, `ecommerce`, `mobile-games`, `ai-agents`, `ai-tools`, `mvp-engineering`, `cloud-devops`, `product-design`.

---

## Home page composition

Eleven sections. Constraints verified: 4+ distinct layout families ✓ · max **3 eyebrows** total (1 per 3 sections) ✓ · no 3rd consecutive image+text split ✓ · exactly one marquee ✓ · one theme throughout ✓.

| # | Section | Layout family | Notes |
|---|---|---|---|
| 1 | Hero | Asymmetric editorial split, off-grid | Headline max 2 lines. Subtext **max 20 words**. 1 primary + 1 secondary CTA. Real photograph. **Nothing else** — no trust strip, no tagline under CTAs, no stat row. `pt-24` max top padding |
| 2 | Capability strip | Logo wall | Real SVG logos via Simple Icons: React, Next.js, TypeScript, Node, Python, Flutter, Unity, AWS, Postgres, Stripe, OpenAI, Anthropic. **Logos only, no labels underneath.** Swaps to client logos when `clients.ts` is populated |
| 3 | What we build | Asymmetric bento | Exactly 11 cells for 11 capabilities, varied spans, no empty tiles. **At least 3 cells carry real imagery or a tinted background** |
| 4 | $499 templates | Full-width cobalt color-block + horizontal scroll-snap | The commercial break. 6 featured templates, flick-scrollable. "Browse all 24" → `/templates` |
| 5 | Since 2017 | Full-width editorial, stacked, one large image | The real differentiator: nine years shipping, referral-built, now open internationally. Answers the offshore objection directly — quality bar, timezone overlap, IP ownership, communication. **Prose, no invented percentages** |
| 6 | How we work | GSAP sticky-stack, pinned | 4 stages. The only pinned scroll section on the site. `start: "top top"`, `pin: true` |
| 7 | Engagement models | 3-up comparison, not a matrix | Fixed-scope project · dedicated squad · $499 template |
| 8 | Selected work | Card grid **or** composed empty state | Gated on `caseStudies.length`. Designed empty state until you supply real projects |
| 9 | FAQ | Accordion | IP and code ownership, NDA, contract and jurisdiction, payment terms, timezone overlap, handover, what happens if it goes wrong |
| 10 | Final CTA | Centered manifesto | Single intent, single label |
| 11 | Footer | Multi-column | Sitemap, legal, brand, locale |

**One CTA label per intent site-wide.** Pick "Start a project" and use that exact string in nav, hero, section 10 and footer — never mixed with "Get in touch" / "Let's talk" / "Contact us". Same discipline for the template intent.

Hero copy candidates (pick one during build, do not ship all three):
- "Shipping software since 2017. Now for the world."
- "We build the software you'd rather not outsource."
- "Nine years of shipping. Newly open to you."

---

## The $499 template catalog

### Data model — `src/data/templates.ts`

```ts
export type Template = {
  slug: string;
  name: string;
  category: TemplateCategory;
  practiceType: string;          // "Real estate agent", "Endodontic practice"
  blurb: string;                 // <= 22 words
  sections: string[];            // what the template ships with
  bestFor: string;
  palette: { name: string; swatches: [string, string, string] };
  previewImage: string;          // /templates/<slug>/preview.jpg
  previewStatus: "comp" | "screenshot";   // honest labeling
  featured?: boolean;
  regions: ("US" | "CA" | "EU")[];
};
```

### 24 launch templates, weighted to professional practices

**Property & Design (5)** — Real Estate Agent · Interior Designer · Architecture Studio · Home Staging · Property Management
**Medical & Dental (5)** — Family Practice · Dental Practice · Pediatric Clinic · Physiotherapy & Chiropractic · Med Spa & Aesthetics
**Legal & Financial (4)** — Law Firm · Immigration Attorney · Accounting & Bookkeeping · Financial Advisory
**Wellness & Therapy (3)** — Therapy & Counseling Practice · Yoga & Pilates Studio · Personal Training
**Creative & Events (3)** — Photography Studio · Wedding & Event Planning · Design Consultancy
**Home & Property Services (4)** — Custom Home Builder · Landscape Design & Build · Remodeling Contractor · Cleaning Services

24 total. Categories are data-driven, so adding a 25th is a one-array-entry change.

### Catalog page `/templates`
Filter by category and region, sort by featured/name. Grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`. **Filter state in URL search params** so filtered views are shareable and indexable. Designed empty state when filters match nothing.

### Detail page `/templates/[slug]`
Preview · what's included · what $499 covers · turnaround · **what it does not cover** · payment or brief CTA per the env gate. `generateStaticParams` over the data file so all 24 prerender.

### Offer scope — draft in `src/data/offer.ts`, review before launch

**Included at $499 (one-time):** template customized to your practice · your logo, colors and photos placed · up to 5 sections on one page · contact form delivered to your email · Google Maps embed · mobile responsive · basic on-page SEO (title, description, OG image) · Google Analytics setup · 1 revision round · deployment guidance.

**Turnaround:** 5–7 business days from receipt of content and assets.

**Not included, quoted separately:** custom design from scratch · ecommerce or payments · booking, scheduling or patient-intake systems · copywriting · photography · multi-language · ongoing hosting and maintenance · additional revision rounds.

This block renders from one file and appears identically on `/templates`, every detail page, `/pricing` and `/brief`. **It is a commercial commitment — read it before it goes live.** Note that medical and legal templates may carry compliance expectations (HIPAA-adjacent intake, attorney advertising rules); the scope explicitly excludes compliance consulting.

---

## Image strategy

No image-generation tool is available in this session. Visual assets are a **dedicated design phase** using the skills already installed on this machine.

**Phase 1 produces:**
- `brandkit` → logo concepts, mark, wordmark, brand board. Output to `public/brand/`.
- `imagegen-frontend-web` → one horizontal comp per home section (11 images), the reference the code is built against. Output to `design/comps/`.
- 24 template previews at 1600×1200, labeled `previewStatus: "comp"` with a visible "Design concept — live preview coming soon" chip until the real templates are built.

**Hard rules:**
- Every image slot gets a real asset or an explicit `<!-- TODO: hero photograph, 1600x1200 -->` marker. Never a gradient blob standing in for a hero.
- **Div-based fake screenshots are banned.** No hand-built browser chrome with fake nav and fake content posing as a template preview.
- Interim fallback: `https://picsum.photos/seed/<descriptive-slug>/1600/1200` with descriptive seeds.
- Static export means `unoptimized: true`, so compress at build: ship AVIF/WebP, explicit `width`/`height` on every image to protect CLS, `priority` on the hero only, `loading="lazy"` elsewhere.

---

## Lead capture

Two forms, one shared client-side pipeline:
- `/contact` — name, email, company, project type, budget band, message.
- `/brief` — business name, practice type, template choice (prefilled from `?template=`), current site, domain status, logo and photos available, content readiness, target launch, contact details.

**Implementation on Spark:**
- Zod schema per form in `src/lib/schemas.ts`, validated before any write.
- Firebase **client SDK** writes to Firestore `leads` collection.
- **App Check with reCAPTCHA v3** (free) enforced on Firestore, plus a honeypot field and a minimum time-to-submit check.
- Firestore rules: `allow create: if` App Check passes, required fields present, field types correct, and string lengths bounded. **`allow read, update, delete: if false`** — nobody reads leads from the client, only the Firebase console.
- Optional env-gated relay `NEXT_PUBLIC_FORM_RELAY_ENDPOINT` (Web3Forms or Formspree free tier) fired after a successful Firestore write, so you get an email ping. If unset, the Firestore document is the record and no email is sent. Failure of the relay must never fail the submission.
- Full UI state cycle: idle · submitting (inline button spinner, not a page spinner) · success · inline field errors · network error with retry.
- Label above input, helper text in markup, error below input. **No placeholder-as-label, ever.** All form text passes WCAG AA against its section background.

---

## Build phases

### Phase 0 — Foundation
`git init` · `create-next-app` (TypeScript, App Router, Tailwind, `src/`, ESLint) · set `output: 'export'` and `images.unoptimized` in `next.config.ts` · Tailwind v4 via `@tailwindcss/postcss` (**not** the `tailwindcss` PostCSS plugin) · install `motion`, `@phosphor-icons/react`, `geist`, `zod`, `clsx`, `tailwind-merge`, `firebase` · self-host Cabinet Grotesk in `src/fonts/` via `next/font/local` · `globals.css` tokens · `src/config/brand.ts`, `site.ts`, `payments.ts` · `Logo.tsx` · `.env.example` documenting every env var · Prettier + `prettier-plugin-tailwindcss`.
**Gate:** dev server runs, `next build` produces a static export, tokens resolve in both themes.

### Phase 1 — Design pass, before any page code
Invoke `brandkit` for the identity. Invoke `imagegen-frontend-web` for 11 home-section comps at the locked palette and type scale. Save to `design/comps/`. Write `design/DESIGN-NOTES.md` recording dials, palette, type scale, radius rule and the chosen hero copy.
**Gate:** comps exist, share one palette, and you approve the direction before page code is written.

### Phase 2 — Primitives
`Container`, `Section`, `Eyebrow` (with the 1-per-3 rule noted in-file), `Button` (pill, nested circular trailing-icon wrapper, `active:scale-[0.98]`, contrast-audited), `Card` (double-bezel), `Reveal` (Motion `whileInView` stagger), `Accordion`, `Field` primitives, `Header` (single-line desktop nav 64–72px, floating glass pill, morphing hamburger, full-screen staggered mobile overlay), `Footer`.
**Gate:** `/dev/kitchen-sink` renders every component in both themes at 375/768/1440.

### Phase 3 — Content data layer
Write `story.ts`, `services.ts` (11 entries), `templates.ts` (24 entries), `offer.ts`, `faq.ts` with real copy. Create `clients.ts`, `testimonials.ts`, case-study frontmatter shape as typed empties.
**Gate:** all copy passes the self-audit — no AI-cute phrasing, no em-dashes, no fake numbers, no invented client names.

### Phase 4 — Home page
Build sections 1–11 against the Phase 1 comps. Run the layout-discipline audit after each section, not at the end.
**Gate:** hero fits one viewport at 1440×900 with CTAs visible · eyebrow count ≤ 3 · 4+ distinct layout families · no 3rd consecutive image+text split · empty-data sections correctly hidden.

### Phase 5 — Template marketplace
`/templates` with URL-param filtering · `/templates/[slug]` with `generateStaticParams` · `PaymentCTA` component with both env states · preview assets wired with honest `previewStatus` labeling.
**Gate:** all 24 detail routes prerender in the static export · filter combinations including empty state behave · payment CTA verified in both env states.

### Phase 6 — Forms + Firebase
Zod schemas · Firebase client init · Firestore writes · security rules · App Check · optional relay · both forms with full state cycles.
**Gate:** end-to-end submission lands in the Firestore emulator · every error path renders · rules deny client reads and malformed writes.

### Phase 7 — Remaining pages
11 service pages from a shared data-driven template with per-service hero imagery so they are not 11 identical pages · `/about` (the 2017 story) · `/process` · `/pricing` · `/work` empty state · MDX case-study pipeline · 3 legal pages.
**Gate:** every IA route resolves, no 404 from any nav or footer link.

### Phase 8 — SEO, a11y, performance
Per-route `metadata` derived from `brand` · OG images · `sitemap.ts` · `robots.ts` · JSON-LD (`Organization` with `foundingDate`, `Service`, `FAQPage`, `BreadcrumbList`) · semantic landmarks and heading order · visible focus rings · skip-to-content · image audit · font preload · Lighthouse pass.

### Phase 9 — Firebase deploy
`firebase init hosting` targeting `out/` · `firebase.json` with clean-URL and 404 config · deploy Firestore rules · custom domain and SSL · verify the live lead pipeline · document the build-and-deploy command in `README.md`.

---

## Verification

**Run it:**
```bash
npm run dev
```
Walk every route. Then verify the real deployable artifact:
```bash
npm run build && npx serve out
```
The static export is what ships, so it is what must be tested.

**Brand-swap test — the requirement that started this:**
1. Change `name` and `shortName` in `src/config/brand.ts` to a throwaway value.
2. Rebuild. Every header, footer, page title, OG tag and form template shows the new name.
3. Project-wide search for `NowMagnate`. Expected: **zero hits outside `brand.ts`.**
4. Revert.

**Stripe gate test:**
1. Build with `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` unset. Confirm every template page shows "Request this template" plus the "coming soon" line, with **no disabled or dead buttons**.
2. Rebuild with a Stripe test-mode Payment Link set. Confirm the CTA switches, the URL carries `client_reference_id=<slug>`, and a test payment completes.
3. Confirm no Stripe secret key exists anywhere in the client bundle: `grep -r "sk_" out/`.

**Empty-data test:** with `clients.ts`, `testimonials.ts` and case studies all empty, confirm no hollow section headings render and `/work` shows its composed empty state. Then add one entry to each and confirm the sections appear correctly.

**Responsive:** 375 / 768 / 1440. Every multi-column section declares its `<768px` fallback in its own component. No horizontal body scroll at any width.

**Theme:** light, dark and system. No section inverts against the page theme. Every token defined on bare `:root`.

**Motion:** enable OS reduce-motion and confirm the site is fully usable and static. Confirm the sticky-stack pins at viewport top, not mid-scroll.

**Forms:** submit both happy-path, with validation errors, and offline. Confirm Firestore document shape, that rules reject a malformed write, and that a client-side read attempt is denied.

**Lighthouse (mobile, on the static export):** Performance ≥ 90 · Accessibility ≥ 95 · Best Practices ≥ 95 · SEO 100. LCP < 2.5s, CLS < 0.1, INP < 200ms.

**Pre-flight (skill §14) — all must pass before "done":**
- No banned fonts, no serif
- One accent color site-wide
- Eyebrow count ≤ ceil(sections / 3) per page
- No wrapped CTA text at desktop; one label per intent
- Every button and field passes WCAG AA in both themes
- No em-dashes in visible copy
- One icon family, no hand-rolled SVG icons
- No div-based fake screenshots; every image slot real or labeled TODO
- No invented client names, testimonials or fake-precise metrics
- Copy self-audit: re-read every visible string, rewrite anything reading as AI cleverness
- One radius scale everywhere

---

## Deliberately out of scope for v1

The 24 actual template builds (separate project, per your instruction) · server-side Stripe Checkout Sessions and webhooks (needs Blaze) · transactional email via Cloud Functions (needs Blaze) · client portal · blog posts (pipeline scaffolded only) · multi-language · CMS · live chat.

## Open items for you

The site is built, verified, and ready to deploy. Everything below is what's
still genuinely yours to decide or supply — none of it blocks development,
but each one blocks something in production.

1. **Real details for `brand.ts`** — business address, phone, sales email, social handles.
2. **Milestones for the 2017-to-now timeline** — the narrative in `src/data/story.ts` is written from what you told me; two milestone entries are marked `TODO(content)` where I had no specifics. A few real dates or turning points would make `/about` noticeably stronger.
3. **Review `src/data/offer.ts`** before launch. That text is a commercial commitment, including the 5–7 day turnaround and the compliance note for regulated-industry templates.
4. **Client names, testimonials and case studies** whenever you have them — populate the typed empty arrays in `src/data/clients.ts` and `src/data/case-studies.ts` (plus one `.mdx` file per case study, see `src/content/case-studies/README.md`). Verified end-to-end: adding data switches the trust bar, testimonials, and `/work` from their honest empty states to full content automatically.
5. **Domain name**, which follows the naming decision, and `NEXT_PUBLIC_SITE_URL` / `brand.domain` need updating to match.
6. **Real photography** — every image on the site is a labeled placeholder (`design/ASSET-MANIFEST.md` lists all 51 slots with exact dimensions). No image-generation tool was available while building this, so the design comps called for in Phase 1 were never produced either; that's the one phase gate not actually met.
7. **A Firebase project of your own** — see the new "Deploying" section in `README.md` for the complete setup and deploy steps. Nothing was deployed as part of this build; that needs your Firebase account and, for App Check, a reCAPTCHA key.
8. **Firestore rules test suite** (`scripts/test-firestore-rules.mjs`) is written and its logic verified, but never actually executed — the sandbox this was built in has no Java, which the Firestore emulator needs. Run it yourself (command's in the README) before relying on the rules in production.
9. **Stripe**, whenever the business is registered — see "Turning Stripe on later" in the README.
