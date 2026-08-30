import { z } from "zod";

/**
 * THE CONFIG. One typed file drives one template instance.
 *
 * Customizing a template for a client is: copy the demo config, replace the
 * strings and the images, reorder or delete entries in `sections`. No component
 * is edited, ever. If a change a client wants requires touching a component,
 * that is a gap in this schema and the schema is what gets fixed.
 *
 * `sections` is a discriminated union and its ORDER IS THE RENDER ORDER, so
 * moving a band up the page is moving an array element. An unknown `type`
 * fails validation at build time rather than rendering nothing, which is the
 * failure mode that matters: a silently missing section on a client's live
 * site is worse than a build that stops.
 *
 * Every section is validated with zod rather than only typed, because a config
 * is the one part of this system a non-author is expected to edit. TypeScript
 * catches a wrong shape while editing; zod catches a wrong shape that arrived
 * some other way, and gives a readable path to it.
 */

// --------------------------------------------------------------- primitives

const hex = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/, "Colours are six-digit hex, for example #1A2B3C");

export const linkSchema = z.object({
  label: z.string().min(1),
  /** In-page anchors ("#book") and absolute URLs both work. */
  href: z.string().min(1),
});

export const actionSchema = linkSchema.extend({
  /**
   * `primary` is the accent field. A band may carry at most one, and the
   * booking-led archetype states the same primary action on every band.
   */
  style: z.enum(["primary", "secondary", "quiet"]).default("secondary"),
});

export const imageSchema = z.object({
  src: z.string().min(1),
  /** Required, not optional. An image with no alt text fails the build. */
  alt: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

const factSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

/** Shared band chrome. Every section may carry it; most do. */
const bandSchema = {
  id: z.string().optional(),
  eyebrow: z.string().optional(),
  title: z.string().optional(),
  intro: z.string().optional(),
  tone: z.enum(["bg", "surface", "wash", "field", "ink"]).default("bg"),
  /**
   * Giant lettering drawn into the band's ground and cropped by its edges.
   * Decorative and `aria-hidden`; it is texture, not a heading.
   */
  ghost: z.array(z.string()).max(3).default([]),
};

export const fieldSchema = z.object({
  name: z.string().min(1),
  label: z.string().min(1),
  type: z
    .enum(["text", "email", "tel", "textarea", "select", "date"])
    .default("text"),
  required: z.boolean().default(false),
  placeholder: z.string().optional(),
  /** Required when `type` is "select". */
  options: z.array(z.string()).optional(),
  /** Half-width on desktop, so two short fields can share a row. */
  half: z.boolean().default(false),
});

// ----------------------------------------------------------------- sections

/**
 * NAV. Booking-led keeps the action in the bar at every width; portfolio-led
 * drops it, because that archetype earns its one enquiry at the foot of the
 * page rather than asking on arrival.
 */
const navSection = z.object({
  type: z.literal("nav"),
  id: z.string().optional(),
  links: z.array(linkSchema).max(6),
  action: actionSchema.optional(),
  /** Shown beside the action on desktop, tappable on mobile. */
  phone: z.string().optional(),
});

/**
 * THE HERO. One field, not two columns.
 *
 * The opening is a single tinted field carrying four layers that overlap on
 * purpose: giant `ghost` lettering cropped by the viewport, the `subject`
 * dissolved into the ground with no frame and no corner radius, the real
 * `headline` laid over both, and the chips and action sitting on the same
 * plane. Nothing is in a box, and nothing has a column of its own.
 *
 * That is the difference between this and the split hero it replaces. A split
 * hero states the copy and then shows a photograph beside it, and a reader
 * sees two objects. This states them as one image, which is what a 2026
 * landing page looks like and, more usefully, is what makes a $499 template
 * look drawn rather than assembled.
 *
 * WHY `headline` IS TWO FIELDS. The device is a light lead word running into a
 * heavy phrase ("Graceful" into "Glow Dental"): one headline set in two
 * weights so it reads as a composed line rather than a sentence in a big font.
 * Two fields rather than markup in a string, so a client editing a config
 * never has to write HTML and can never break the page with it.
 */
const heroFieldSection = z.object({
  type: z.literal("heroField"),
  ...bandSchema,
  /**
   * WHICH COMPOSITION. The merged field is the principle; it is not one
   * arrangement, and treating it as one is how twenty-four templates become
   * one template recoloured twenty-four times.
   *
   * `offset` places the subject upper right and the headline on flat ground
   * lower left. Asymmetric, editorial, and the two never touch.
   *
   * `centred` runs the headline across the full measure and tucks the subject
   * up underneath it so the two overlap, which is the closest this kit gets to
   * the type-behind-object reading of the reference. Symmetric and calmer.
   *
   * `banner` states the headline first at full width and then drops a
   * wide subject band edge to edge underneath it, with the chips sitting on
   * the band. Reads as a masthead over a photograph.
   *
   * `split` bleeds a tall subject off the LEFT edge with the copy to its
   * right, and runs the ghost lettering along the foot of the band instead of
   * the head. The mirror of `offset` in every axis, so the two do not read as
   * the same composition flipped.
   *
   * `editorial` splits the headline in two and puts the subject BETWEEN the
   * halves, overlapping both: the lead sits above it, right-aligned, and the
   * main sits below it, left-aligned. A magazine masthead interrupted by the
   * image. Needs `headline.lead` to be set, and falls back to a single stack
   * above the subject when it is not.
   *
   * No two templates a buyer would compare side by side may share one. That is
   * enforced by category in `design/TEMPLATE-DIRECTION.md`, which is why there
   * are four of these and not one.
   */
  layout: z
    .enum(["offset", "centred", "banner", "split", "editorial"])
    .default("offset"),
  eyebrow: z.string().optional(),
  headline: z.object({
    /** The light lead. Optional; without it the headline is one weight. */
    lead: z.string().optional(),
    main: z.string().min(1),
  }),
  sub: z.string().min(1),
  actions: z.array(actionSchema).max(2).default([]),
  /** Pills under the headline. Short claims, not sentences. */
  chips: z.array(z.string()).max(3).default([]),
  /**
   * The hero photograph, and it is the GROUND rather than an object placed on
   * the ground. It covers the whole band and the type is printed on it. There
   * is no edge treatment to choose, because there is no edge: the legibility
   * comes from the scrim, which each composition sets for the region its type
   * occupies. See `parts/Backdrop.tsx`.
   */
  subject: imageSchema,
  /** The rotating seal. One per page, and only ever in the hero. */
  seal: z
    .object({ ring: z.string().min(1), center: z.string().optional() })
    .optional(),
  facts: z.array(factSchema).max(4).default([]),
});

/**
 * ASSURANCE STRIP. The band directly under the hero, answering the objection
 * that stops the booking rather than restating the offer.
 */
const assuranceSection = z.object({
  type: z.literal("assurance"),
  ...bandSchema,
  items: z.array(z.object({ title: z.string(), body: z.string() })).min(2).max(4),
});

/**
 * SERVICE MENU. The swappable slot in the booking-led skeleton: a treatment
 * list for a dentist, a class timetable for a studio, a condition index for a
 * physio. Grouping is optional, so a flat list of six services and a menu of
 * four groups are the same component.
 */
const serviceMenuSection = z.object({
  type: z.literal("serviceMenu"),
  ...bandSchema,
  layout: z.enum(["menu", "cards"]).default("menu"),
  groups: z
    .array(
      z.object({
        name: z.string().optional(),
        items: z
          .array(
            z.object({
              name: z.string().min(1),
              body: z.string().optional(),
              price: z.string().optional(),
              meta: z.string().optional(),
            }),
          )
          .min(1),
      }),
    )
    .min(1),
  note: z.string().optional(),
  action: actionSchema.optional(),
});

/** STEPS. What to expect, how it works, the first visit. Numbered by index. */
const stepsSection = z.object({
  type: z.literal("steps"),
  ...bandSchema,
  steps: z
    .array(z.object({ title: z.string().min(1), body: z.string().min(1) }))
    .min(2)
    .max(6),
  aside: z
    .object({ title: z.string(), body: z.string(), image: imageSchema.optional() })
    .optional(),
});

/** PEOPLE. Named practitioners, which is most of what "authority" means here. */
const peopleSection = z.object({
  type: z.literal("people"),
  ...bandSchema,
  people: z
    .array(
      z.object({
        name: z.string().min(1),
        role: z.string().min(1),
        bio: z.string().optional(),
        image: imageSchema,
        credentials: z.array(z.string()).max(4).default([]),
      }),
    )
    .min(1),
});

/** PRICING. A ruled table, not cards. Cards imply tiers; most of these are rates. */
const pricingSection = z.object({
  type: z.literal("pricing"),
  ...bandSchema,
  /** Column headers. A dentist lists treatments, a cleaner lists home sizes. */
  nameLabel: z.string().default("Service"),
  priceLabel: z.string().default("From"),
  rows: z
    .array(
      z.object({
        name: z.string().min(1),
        detail: z.string().optional(),
        price: z.string().min(1),
      }),
    )
    .min(2),
  note: z.string().optional(),
  action: actionSchema.optional(),
});

/**
 * REVIEWS. `sourceNote` exists so a real site can say where the reviews came
 * from, and so a demo can say plainly that they are written for the demo.
 */
const reviewsSection = z.object({
  type: z.literal("reviews"),
  ...bandSchema,
  items: z
    .array(
      z.object({
        quote: z.string().min(1),
        name: z.string().min(1),
        meta: z.string().optional(),
      }),
    )
    .min(1),
  sourceNote: z.string().optional(),
});

/**
 * GALLERY. Work, results, rooms, transformations.
 *
 * `pairs` is the before-and-after layout, and it is the reason this is one
 * component rather than two: a staging company, a med spa, a landscaper and a
 * remodeler all make the same argument in the same shape, and the only thing
 * that differs is what is in the frame. A grid of single images is the same
 * component with the second image absent.
 *
 * `caption` is where the honest qualifier goes. Results photography is the
 * easiest thing on a practice site to overclaim with, and a picture with no
 * statement of what was done and over how long is a picture making a promise
 * nobody agreed to.
 */
const gallerySection = z.object({
  type: z.literal("gallery"),
  ...bandSchema,
  layout: z.enum(["grid", "pairs"]).default("grid"),
  items: z
    .array(
      z.object({
        image: imageSchema,
        /** Present only in `pairs`. Renders beside the first, labelled. */
        after: imageSchema.optional(),
        caption: z.string().optional(),
        meta: z.string().optional(),
      }),
    )
    .min(2),
  note: z.string().optional(),
});

/**
 * CHECKLIST. Short items in columns, ticked.
 *
 * Deliberately generic, because the same shape answers four different
 * questions across the catalog: what a clean includes, which insurers a
 * practice is in network with, which suburbs a firm covers, what to bring to a
 * first appointment. All of them are scanned rather than read, and all of them
 * are the thing a visitor is checking for one specific entry.
 */
const checklistSection = z.object({
  type: z.literal("checklist"),
  ...bandSchema,
  columns: z
    .array(
      z.object({
        name: z.string().optional(),
        items: z.array(z.string()).min(1),
      }),
    )
    .min(1)
    .max(4),
  note: z.string().optional(),
  action: actionSchema.optional(),
});

/**
 * PROJECT INDEX. The swappable slot for the portfolio-led archetype, and the
 * band that carries the whole argument there: a studio whose work is good does
 * not need to explain itself, it needs to show eleven things in a row.
 *
 * `asymmetric` is the default and the reason this is not just `gallery`. Every
 * project the same size reads as a contact sheet, which flattens a portfolio
 * into inventory. Alternating a full-width project against pairs gives the
 * index a rhythm and lets the studio put its best work at the size it deserves
 * without saying so.
 */
const projectIndexSection = z.object({
  type: z.literal("projectIndex"),
  ...bandSchema,
  layout: z.enum(["asymmetric", "grid"]).default("asymmetric"),
  projects: z
    .array(
      z.object({
        title: z.string().min(1),
        /** Location, year, scope. The line under a project name in a monograph. */
        meta: z.string().optional(),
        body: z.string().optional(),
        image: imageSchema,
      }),
    )
    .min(2),
  /**
   * Sits under the index. This is where a portfolio band states what its
   * images actually are, which matters most on the photography template where
   * the work IS the photographs.
   */
  note: z.string().optional(),
  action: actionSchema.optional(),
});

/**
 * FEATURE. One subject, at length: a photograph beside a passage of prose and
 * a short spec list.
 *
 * Deliberately generic, because the same shape does six different jobs across
 * the catalog: one project in depth, the practice's own editorial, an about
 * page, how a consultancy engages, seasonal care, plans and specifications. It
 * is the band a portfolio-led template uses when it finally has to say
 * something in sentences.
 *
 * `media` flips the side, which matters when two features appear on one page.
 */
const featureSection = z.object({
  type: z.literal("feature"),
  ...bandSchema,
  image: imageSchema,
  media: z.enum(["left", "right"]).default("right"),
  /** Paragraphs. Two or three; this is a passage, not a page. */
  body: z.array(z.string().min(1)).min(1).max(4),
  facts: z.array(factSchema).max(4).default([]),
  action: actionSchema.optional(),
});

/**
 * CREDITS. A ruled list of things somebody else said or granted.
 *
 * Press, awards, publications, a vendor network, a licence, a warranty, a
 * partner programme. All of them are the same shape: a name, what it was, and
 * when. All of them are third-party validation, which is why they get a plain
 * ruled list rather than a card: a card decorates, and the only thing that
 * makes this band persuasive is that it looks like a record.
 *
 * NO LOGOS, by rule. A press band built from publication logos means putting a
 * real masthead on a page, and on a fictional demo that is the same problem as
 * a competitor's sign in the photography. Names set in the template's own type
 * are also, incidentally, the only version that survives a client who has no
 * permission to use the artwork.
 */
const creditsSection = z.object({
  type: z.literal("credits"),
  ...bandSchema,
  items: z
    .array(
      z.object({
        name: z.string().min(1),
        detail: z.string().optional(),
        year: z.string().optional(),
      }),
    )
    .min(2),
  note: z.string().optional(),
});

/**
 * LISTINGS. The inventory archetype's swappable slot, and the only band in the
 * catalog that is a searchable list rather than an argument.
 *
 * A property index is not a portfolio. A portfolio is curated and its order is
 * an argument; a listing grid is inventory and its order is whatever the
 * visitor asked for. That is why this has a filter row and `projectIndex` does
 * not, and why every item is the same size: in a list of things you might buy,
 * making one bigger is a claim the agent has not earned.
 *
 * `status` drives the filter options, so the dropdown is derived from the data
 * rather than configured separately and left to drift out of sync with it.
 */
const listingsSection = z.object({
  type: z.literal("listings"),
  ...bandSchema,
  /** The filter row. Off for a short "featured" strip, on for a real index. */
  filters: z.boolean().default(true),
  items: z
    .array(
      z.object({
        title: z.string().min(1),
        address: z.string().min(1),
        price: z.string().min(1),
        /** For sale, Under offer, Let, Available. Drives the filter. */
        status: z.string().optional(),
        /** Beds, baths, floor area. Rendered as a ruled row under the price. */
        meta: z.array(z.string()).max(4).default([]),
        image: imageSchema,
      }),
    )
    .min(2),
  note: z.string().optional(),
  action: actionSchema.optional(),
});

/**
 * AUDIENCE SPLIT. Two doors, side by side.
 *
 * Built for the one template in the catalog that has to serve two audiences
 * who want opposite things on the same page: a property manager selling to
 * landlords while also being the person a tenant reports a broken boiler to.
 *
 * The usual solution is a tab control or a toggle, and both are wrong. A tab
 * hides one audience from the other, which means half your visitors see a page
 * that appears to be for somebody else, and a toggle asks a person to classify
 * themselves before they have read anything. Two panels, both visible, both
 * complete, is the honest shape: everyone can see immediately that the other
 * half exists and that it is not where they should be looking.
 */
const audienceSplitSection = z.object({
  type: z.literal("audienceSplit"),
  ...bandSchema,
  panels: z
    .array(
      z.object({
        eyebrow: z.string().optional(),
        title: z.string().min(1),
        body: z.string().min(1),
        items: z.array(z.string()).min(1).max(6),
        action: actionSchema.optional(),
      }),
    )
    .length(2),
});

const faqSection = z.object({
  type: z.literal("faq"),
  ...bandSchema,
  items: z
    .array(z.object({ q: z.string().min(1), a: z.string().min(1) }))
    .min(2),
});

/**
 * LOCATION. Address, hours and the way in. `mapsQuery` builds a link out to
 * the visitor's own map app rather than embedding an iframe, which would drop
 * a third-party tracker onto a page whose whole job is a first appointment.
 */
const locationSection = z.object({
  type: z.literal("location"),
  ...bandSchema,
  address: z.array(z.string()).min(1),
  hours: z.array(z.object({ days: z.string(), time: z.string() })).min(1),
  phone: z.string().optional(),
  email: z.string().optional(),
  mapsQuery: z.string().optional(),
  travel: z.array(z.string()).max(4).default([]),
  image: imageSchema.optional(),
});

/** BOOKING. The form band, and the one place the page asks for something. */
const bookingSection = z.object({
  type: z.literal("booking"),
  ...bandSchema,
  fields: z.array(fieldSchema).min(1),
  submitLabel: z.string().default("Request an appointment"),
  /** Under the button. Response times, cancellation policy, privacy note. */
  note: z.string().optional(),
  aside: z
    .object({
      title: z.string(),
      items: z.array(z.string()).min(1),
      phone: z.string().optional(),
    })
    .optional(),
});

const footerSection = z.object({
  type: z.literal("footer"),
  id: z.string().optional(),
  columns: z
    .array(z.object({ title: z.string(), links: z.array(linkSchema).min(1) }))
    .max(4)
    .default([]),
  note: z.string().optional(),
  legal: z.array(z.string()).max(4).default([]),
});

export const sectionSchema = z.discriminatedUnion("type", [
  navSection,
  heroFieldSection,
  assuranceSection,
  serviceMenuSection,
  stepsSection,
  peopleSection,
  pricingSection,
  reviewsSection,
  gallerySection,
  projectIndexSection,
  featureSection,
  creditsSection,
  listingsSection,
  audienceSplitSection,
  checklistSection,
  faqSection,
  locationSection,
  bookingSection,
  footerSection,
]);

// ------------------------------------------------------------------- theme

/**
 * The palette carries the three authored values. Everything else is derived in
 * `tokens.css` by rule, so a config cannot produce a combination that fails
 * contrast by accident. The optional overrides exist for the cases where a
 * derivation is technically fine and visually wrong, which does happen with
 * very dark grounds.
 */
export const paletteSchema = z.object({
  ink: hex,
  bg: hex,
  accent: hex,
  surface: hex.optional(),
  muted: hex.optional(),
  rule: hex.optional(),
  wash: hex.optional(),
  accentDeep: hex.optional(),
  onAccent: hex.optional(),
});

export const themeSchema = z.object({
  palette: paletteSchema,
  /** Which of the four motion vocabularies this template speaks. */
  motion: z.enum(["settle", "reveal", "rule", "stagger"]).default("settle"),
  density: z.enum(["airy", "regular", "tight"]).default("regular"),
  /** One value, applied to every corner in the template. */
  radius: z.number().min(0).max(24).default(0),
});

// ------------------------------------------------------------------ config

export const templateConfigSchema = z.object({
  brand: z.object({
    name: z.string().min(1),
    tagline: z.string().optional(),
    /** Wordmark text. Templates draw the mark from type, never from a logo file. */
    mark: z.string().optional(),
    contact: z.object({
      phone: z.string().optional(),
      email: z.string().optional(),
      address: z.array(z.string()).default([]),
      hours: z.string().optional(),
    }),
    social: z.array(linkSchema).max(5).default([]),
  }),
  theme: themeSchema,
  seo: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  }),
  sections: z.array(sectionSchema).min(1),
  settings: z
    .object({
      /**
       * Where the forms POST. Absent means the form runs in demo mode: it
       * validates and confirms, and says plainly that nothing was sent.
       */
      formEndpoint: z.string().optional(),
      /** The thumb-reach action on mobile. Booking-led templates all carry one. */
      stickyAction: actionSchema.optional(),
    })
    .default({}),
});

export type Link = z.infer<typeof linkSchema>;
export type Action = z.infer<typeof actionSchema>;
export type TplImage = z.infer<typeof imageSchema>;
export type Field = z.infer<typeof fieldSchema>;
export type Section = z.infer<typeof sectionSchema>;
export type SectionType = Section["type"];
export type Palette = z.infer<typeof paletteSchema>;
export type TemplateTheme = z.infer<typeof themeSchema>;
export type TemplateConfig = z.infer<typeof templateConfigSchema>;

/**
 * Validate at module load, so a broken config stops `next build` with a path
 * to the offending field instead of shipping a half-rendered page.
 *
 * Called by every `demo.ts`, which is why the return type is the parsed
 * config: the defaults zod fills in are part of the shape components consume.
 */
export function defineTemplate(input: z.input<typeof templateConfigSchema>): TemplateConfig {
  const result = templateConfigSchema.safeParse(input);

  if (!result.success) {
    const detail = result.error.issues
      .map((issue) => `  ${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid template config:\n${detail}`);
  }

  return result.data;
}

/**
 * The palette as inline custom properties for the template wrapper.
 *
 * Only what the config actually supplies is emitted. Anything omitted is left
 * to the derivation in `tokens.css`, which is the point: fewer declared values
 * means fewer chances for a client edit to produce a combination nobody drew.
 */
export function paletteStyle(theme: TemplateTheme): React.CSSProperties {
  const p = theme.palette;

  const vars: Record<string, string> = {
    "--tpl-ink": p.ink,
    "--tpl-bg": p.bg,
    "--tpl-accent": p.accent,
    "--tpl-radius": `${theme.radius}px`,
  };

  if (p.surface) vars["--tpl-surface"] = p.surface;
  if (p.muted) vars["--tpl-muted"] = p.muted;
  if (p.rule) vars["--tpl-rule"] = p.rule;
  if (p.wash) vars["--tpl-wash"] = p.wash;
  if (p.accentDeep) vars["--tpl-accent-deep"] = p.accentDeep;
  if (p.onAccent) vars["--tpl-on-accent"] = p.onAccent;

  return vars as React.CSSProperties;
}
