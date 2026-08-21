/**
 * Real clients and testimonials. Both ship EMPTY.
 *
 * Nothing here is invented. A services company that puts fabricated client
 * names or made-up quotes on its site is one conversation away from being
 * caught, and the damage lands on exactly the credibility the site exists to
 * build. Every section that consumes these arrays checks `.length` first and
 * renders something honest instead when they are empty.
 *
 * TO POPULATE: add entries below. Nothing else needs to change. The trust bar
 * switches from the tech-stack wall to client logos, and the testimonial
 * section starts rendering, automatically.
 */

export type Client = {
  name: string;
  /** Path under /public/clients/, or a Simple Icons slug for known brands. */
  logo: string;
  url?: string;
  /** Set true only with written permission to use the name publicly. */
  publicReference: boolean;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  /** Set true only with written permission to publish the quote. */
  approved: boolean;
};

// Example of the expected shape, kept commented so the type is obvious:
//
// export const clients: Client[] = [
//   { name: "Acme", logo: "/clients/acme.svg", url: "https://acme.com", publicReference: true },
// ];

export const clients: Client[] = [];

export const testimonials: Testimonial[] = [];

/** Only clients cleared for public use. Never render the raw array. */
export const publicClients = clients.filter((c) => c.publicReference);

/** Only quotes cleared for publication. Never render the raw array. */
export const approvedTestimonials = testimonials.filter((t) => t.approved);

/**
 * The trust bar's fallback while no client logos exist: the stack we actually
 * build on. Slugs resolve against the Simple Icons CDN, so these are real
 * vendor marks rather than text set in a row.
 *
 * Per the logo-wall rule, these render as logos ONLY. No "React — frontend"
 * captions underneath; the mark is the information.
 */
export const techStack = [
  { name: "React", slug: "react" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Python", slug: "python" },
  { name: "Flutter", slug: "flutter" },
  { name: "Unity", slug: "unity" },
  { name: "PostgreSQL", slug: "postgresql" },
  // Amazon Web Services and OpenAI's marks have been removed from Simple
  // Icons entirely (verified against the published package, not just a
  // renamed slug) — swapped for tools we equally rely on that still resolve.
  { name: "Docker", slug: "docker" },
  { name: "Stripe", slug: "stripe" },
  { name: "Firebase", slug: "firebase" },
  { name: "Anthropic", slug: "anthropic" },
] as const;
