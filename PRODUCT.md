# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two distinct audiences on one site, with opposite needs:

1. **Founders and product leads** evaluating a software build partner, typically
   from the US, Canada, or Europe. They are shopping for a team, often after a
   bad experience with an offshore vendor, and are scanning for evidence of
   judgment and seniority rather than a capability list. They read carefully and
   leave if the site feels like a body shop.
2. **Owners of established local professional practices** (real estate agents,
   interior designers, architects, doctors, dentists, law firms, and similar) in
   the US, Canada, and Europe who need a website and want a fixed price. They
   are non-technical, price-anchored, and decide in a single session. They do
   not read the parts of the site written for audience 1.

## Product Purpose

A software studio that builds web applications, mobile apps, SaaS products,
ecommerce, 2D mobile games, AI agents, and AI tooling for clients, plus a
productized fixed-price landing-page offer for local businesses. The site's job
is to convert both audiences: an enquiry from audience 1, a template brief or
purchase from audience 2. Success is a qualified enquiry, not traffic.

## Positioning

The practice has been delivering client work continuously since 2017, starting
as freelance work and growing almost entirely on referral and repeat business,
and is only now opening to international clients. The team is deliberately
small: the client talks to the people writing the code, with no account-manager
layer, and work is turned down when it cannot be staffed properly. That
combination, a long delivery record with direct access to the builders, is the
claim a newly-formed agency cannot truthfully make.

## Operating Context

- Buyers in audience 1 arrive skeptical about offshore delivery specifically.
  The concrete objections are known and answered in the site's content: who owns
  the code, how much timezone overlap is real, NDA and jurisdiction, payment
  terms across borders, what happens if the project goes badly, and who they
  actually talk to day to day.
- Engagements run in two-week cycles with a paid discovery up front; a client
  can stop at the end of any cycle and keep everything built so far.
- Audience 2 buys once, needs no meetings, and supplies their own logo, photos,
  and copy. Turnaround is quoted from receipt of those assets, not from payment.
- Several template categories serve regulated practices (medical, dental,
  legal). The offer explicitly excludes compliance review, and the site says so.

## Capabilities and Constraints

- 11 named service capabilities and a 24-template catalog, both data-driven.
- **Static export only.** `output: 'export'` in Next.js 15, deployed to Firebase
  Hosting's free Spark tier. No server at runtime: no server-side rendering, no
  API routes, no Cloud Functions. Every dynamic route needs `generateStaticParams`.
- `useSearchParams()` is unusable in this project: it defers a component's
  content to client-only rendering under static export, which previously emptied
  two whole pages from the static HTML. Query-string state is read from
  `window.location.search` after mount instead.
- Lead capture writes directly from the browser to Firestore under create-only
  security rules with App Check; there is no server to broker it.
- Payments for the fixed-price offer use a Stripe Payment Link (a static URL),
  because no server exists to hold a secret key. Currently unset, so the site
  shows a brief-request flow instead of checkout.
- All environment configuration is inlined at build time; changing it requires
  a rebuild and redeploy.

## Brand Commitments

- **The company name is not final.** "NowMagnate Innovations" is a working
  placeholder. Every brand-bearing string and mark resolves from a single config
  module so a rename stays a one-file edit, and this must not regress.
- No fabricated social proof of any kind. This is a standing commitment, not a
  temporary state.
- Voice is direct and plainspoken: objections are named out loud rather than
  managed around, and claims are specific rather than superlative.

## Evidence on Hand

Real and usable:
- The 2017 founding date and the continuous delivery record since then.
- 11 service definitions and 24 template definitions, with real scope copy.
- The fixed-price offer's full inclusion and exclusion list, and its turnaround.
- The technology actually used, which is the current trust-strip content.

**Absent, and must never be fabricated:**
- No named clients, no client logos, no testimonials, no case studies. All the
  corresponding data files ship as typed empty arrays, and the sections that
  consume them render honest empty states until real content exists.
- No photography of the team, the studio, or any client work. Every image slot
  currently holds a labeled placeholder.
- Milestone detail between 2017 and now is only partly known; the unknown
  entries are explicitly marked and are hidden from the rendered timeline.

## Product Principles

1. **Never fabricate proof.** An empty state that says something true beats a
   fabricated client every time; the first prospect who asks a follow-up
   question about work that never happened costs more than the section earned.
2. **Answer the objection out loud.** The offshore-delivery doubts are real and
   specific; naming them is more persuasive than projecting confidence.
3. **Serve both audiences without averaging them.** The page must let a
   local-business buyer find their path without hijacking the page for a founder
   evaluating an engineering partner.
4. **Scope honesty is the product.** What the fixed price does not cover is
   published as prominently as what it does, because an unhappy buyer is almost
   always someone who assumed an exclusion was included.
5. **The brand is swappable.** No design or content decision may assume the
   current name, wordmark, or domain is permanent.

## Accessibility & Inclusion

WCAG AA is the working floor and is currently met and verified: contrast checked
programmatically in both themes, full keyboard operability with visible focus,
reduced-motion respected with a CSS backstop plus per-component checks, and a
Lighthouse accessibility score of 100.
