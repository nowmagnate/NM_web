# Case study content

This directory is empty on purpose — see `src/data/case-studies.ts` for why.

## Adding a real case study

Two files, kept in sync manually rather than derived from each other, because
the card summary and the full write-up are edited at different times by
different people:

1. **Card entry** in `src/data/case-studies.ts` — add a `CaseStudy` object to
   the `caseStudies` array. This is what shows up on the home page and the
   `/work` index.
2. **Full page** — add `<slug>.mdx` here, matching the `slug` field from step 1.
   Required frontmatter:

   ```mdx
   ---
   title: "Cutting dispatch time on a fleet management rebuild"
   client: "A logistics startup"
   summary: "Replaced a spreadsheet workflow with a scheduling tool the dispatch team actually uses."
   services: ["web-applications"]
   year: 2025
   ---

   The body is standard MDX. Write it like the rest of the site's copy: no
   invented metrics, no em-dashes, headline claims backed by something in the
   body.
   ```

Both steps need written permission from the client to publish, including
permission to use their name if `clientNamed` is `true` on the card entry.

## Third step: activate the route

Next's static export refuses to build a dynamic route whose
`generateStaticParams()` returns zero paths — that's the case right now, so
`src/app/work/[slug]/page.tsx` doesn't exist yet. **The first time you add a
real `.mdx` file here**, also copy `page.tsx.template` (same directory) to
`src/app/work/[slug]/page.tsx`. After that first case study, the route stays
working for every one you add afterward — this step is only needed once.

