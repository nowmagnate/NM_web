import { defineTemplate } from "../kit/schema";
import { theme } from "./theme";

/**
 * VERGE, as a working practice.
 *
 * THORNFIELD GARDENS DOES NOT EXIST. Fictional, and labelled as such in a bar
 * above the design that cannot be dismissed.
 *
 * NO BEFORE-AND-AFTER PAIRS HERE EITHER. When the `pairs` layout was built the
 * note said it was being kept for Threshold and Verge. That was corrected on
 * Threshold and the correction applies just as much here: stock photography
 * cannot supply the same garden shot twice, so a pair would be fabricated
 * evidence. A garden's argument is made better anyway by the seasonal band,
 * which is the thing landscape clients genuinely do not think about.
 *
 * `pairs` remains the right component for a client with their own photographs
 * of one garden in March and the following September.
 */

const PHONE = "01273 496 022";

export const config = defineTemplate({
  brand: {
    name: "Thornfield Gardens",
    mark: "Thornfield",
    tagline: "Garden design and build across Sussex and the South Downs.",
    contact: {
      phone: PHONE,
      email: "studio@thornfieldgardens.example",
      address: ["The Nursery, Ditchling Road", "Brighton BN1 6JA"],
      hours: "Monday to Friday",
    },
    social: [{ label: "Instagram", href: "https://instagram.com" }],
  },

  theme,

  seo: {
    title: "Thornfield Gardens",
    description:
      "Garden design and build in Sussex. Design-build under one contract, planting plans that account for year three, and a two-year establishment guarantee.",
  },

  settings: {},

  sections: [
    {
      type: "nav",
      links: [
        { label: "Projects", href: "#projects" },
        { label: "Services", href: "#services" },
        { label: "Where we work", href: "#areas" },
        { label: "Seasonal care", href: "#seasonal" },
      ],
      phone: PHONE,
    },

    {
      type: "heroField",
      tone: "field",
      layout: "editorial",
      ghost: ["Year three"],
      eyebrow: "Sussex and the South Downs",
      headline: { lead: "Gardens designed for", main: "the year they mature." },
      sub: "Design and build under one contract, so nobody is blaming anybody else. Planting plans drawn for what the garden becomes in year three rather than how it photographs in week one.",
      actions: [{ label: "See recent projects", href: "#projects", style: "secondary" }],
      chips: [],
      subject: {
        src: "/templates/landscape-design-build/hero.jpg",
        alt: "A pergola thick with climbing foliage over a stone-paved terrace.",
        width: 1200,
        height: 1800,
      },
      facts: [
        { label: "Design and build", value: "One contract, one team" },
        { label: "Establishment", value: "Two years guaranteed" },
        { label: "Season", value: "Design in winter, build in spring" },
        { label: "Where", value: "Within 40 miles of Brighton" },
      ],
    },

    {
      type: "projectIndex",
      id: "projects",
      eyebrow: "Projects",
      title: "Gardens we have made",
      intro: "Photographed in the second or third summer, which is the only honest time to photograph a garden.",
      layout: "asymmetric",
      projects: [
        {
          title: "A courtyard in Kemptown",
          meta: "Brighton · Planted 2022 · Photographed 2024",
          body: "Eleven metres by six, north facing, and overlooked on three sides. Structure first, then a planting palette that does most of its work in shade.",
          image: {
            src: "/templates/landscape-design-build/project-1.jpg",
            alt: "A densely planted courtyard garden with a timber pergola and a curving stone path.",
            width: 1200,
            height: 1600,
          },
        },
        {
          title: "A formal garden near Lewes",
          meta: "East Sussex · Planted 2021 · Photographed 2024",
          body: "Clipped hedging, a long axis and roses that were argued about for a month. Three years in, the structure is doing what it was drawn to do.",
          image: {
            src: "/templates/landscape-design-build/project-2.jpg",
            alt: "A formal garden with rose beds, clipped hedging and a patterned stone path to a gate.",
            width: 1400,
            height: 934,
          },
        },
      ],
    },

    {
      type: "serviceMenu",
      id: "services",
      tone: "surface",
      eyebrow: "Services",
      title: "What we do, and what it costs",
      intro: "Published. Garden design is an industry where nobody quotes until they have seen your house, and the reason is not flattering.",
      layout: "menu",
      groups: [
        {
          name: "Design",
          items: [
            {
              name: "Consultation visit",
              body: "Two hours on site with a written summary afterwards, including an honest view on what the garden can and cannot be.",
              price: "£350",
            },
            {
              name: "Design only",
              body: "Survey, concept, planting plan and a costed schedule you can put out to any contractor.",
              price: "From £2,800",
            },
            {
              name: "Planting plan for an existing garden",
              body: "For gardens where the hard landscaping is already right and the planting never was.",
              price: "From £1,400",
            },
          ],
        },
        {
          name: "Build",
          items: [
            {
              name: "Design and build",
              body: "One contract for the whole thing. Most of our work, and the only version where nobody is blaming anybody else.",
              price: "From £24,000",
            },
            {
              name: "Hard landscaping only",
              body: "Terraces, walls, steps and drainage, to our drawings or somebody else's.",
              price: "From £14,000",
            },
          ],
        },
      ],
      note: "Design fees are credited in full against a build contract. Prices are indicative until we have seen the site, and access is usually what moves them: a garden reachable only through a house costs meaningfully more than one with a side gate.",
    },

    {
      type: "checklist",
      id: "areas",
      eyebrow: "Where we work",
      title: "Service areas",
      intro: "Within about forty miles of Brighton. Beyond that the site visits stop being frequent enough to be useful, and frequent site visits are most of what a design-build contract is.",
      columns: [
        {
          name: "Core area",
          items: ["Brighton and Hove", "Lewes", "Ditchling", "Hurstpierpoint", "Steyning"],
        },
        {
          name: "Covered",
          items: ["Worthing", "Haywards Heath", "Uckfield", "Arundel", "Petworth"],
        },
        {
          name: "By arrangement",
          items: [
            "Eastbourne and the far east of the county",
            "Chichester and the Manhood peninsula",
            "Anywhere further, for design only",
          ],
        },
      ],
      note: "If you are outside these areas we will happily do the design and hand it to a contractor near you, and we will tell you honestly what to ask them.",
    },

    {
      type: "checklist",
      id: "seasonal",
      tone: "wash",
      eyebrow: "Seasonal care",
      title: "What a new garden needs, and when",
      intro: "The part nobody thinks about at the point of commissioning, and the part that decides whether the garden looks like the drawing in year three.",
      columns: [
        {
          name: "First year",
          items: [
            "Watering, properly, through the first two summers",
            "Formative pruning on trees and shrubs in the first winter",
            "Mulching in late winter, before growth starts",
            "Replacing anything that fails, at our cost",
          ],
        },
        {
          name: "Ongoing",
          items: [
            "Two visits a year keeps most designed gardens on plan",
            "Hedging cut once in late summer, not three times",
            "Perennials cut back in late winter, not autumn",
            "Beds edged annually, which does more than any other hour spent",
          ],
        },
        {
          name: "What we offer",
          items: [
            "Two-year establishment guarantee on all planting",
            "Twice-yearly maintenance visits, £480 a year",
            "A written care calendar with every garden, free",
            "One phone call a year, whether or not you use us",
          ],
        },
      ],
      note: "The establishment guarantee is real and it is the reason we water for two summers rather than one. Anything that fails in that period is replaced at our cost, unless it was not watered, which is why the care calendar exists.",
    },

    {
      type: "steps",
      id: "process",
      eyebrow: "How it works",
      title: "Design in winter, build in spring",
      intro: "Gardens have a season, and pretending otherwise is how people end up planting in July.",
      steps: [
        {
          title: "Consultation, any time",
          body: "Two hours on site. What you want, what the soil and the aspect will actually allow, and a written summary whether or not you go further.",
        },
        {
          title: "Survey and design, autumn to winter",
          body: "Measured survey, levels, soil tests, then concept and planting plan. Six to ten weeks, and the time of year when we are not on site.",
        },
        {
          title: "Build, spring",
          body: "Hard landscaping first, then planting into ground that has warmed. Six to fourteen weeks depending on the size and on access.",
        },
        {
          title: "Establishment, two years",
          body: "Watering, formative pruning and replacement of anything that fails. This is part of the contract, not an afterthought.",
        },
      ],
      aside: {
        title: "Why the seasons matter more than the schedule",
        body: "A garden built in the wrong season can be made to look correct on handover day and will be visibly struggling by the second summer. Planting into cold ground, laying turf in a drought, cutting a hedge at the wrong point in the year: all of them are invisible for months and all of them cost the client eventually. We would rather tell you in March that the right start is October than take the work and hope.",
      },
    },

    {
      type: "reviews",
      eyebrow: "Clients",
      title: "What people say afterwards",
      items: [
        {
          quote:
            "They told us to wait six months and start in the autumn. Every other firm we spoke to could start in three weeks. Three years on I understand exactly what we were being offered.",
          name: "Bea and Tom H.",
          meta: "Kemptown courtyard",
        },
        {
          quote:
            "Two plants failed in the first winter and were replaced without an invoice or a conversation about whose fault it was.",
          name: "Marianne L.",
          meta: "Lewes",
        },
        {
          quote:
            "The care calendar is a single sheet of paper on my kitchen wall and it has done more for the garden than anything else they gave us.",
          name: "Idris P.",
          meta: "Hurstpierpoint",
        },
      ],
      sourceNote:
        "These reviews are demo content written for this template. On a live site this line names the platform the reviews were collected on and links to the profile they came from.",
    },

    {
      type: "faq",
      tone: "surface",
      eyebrow: "Questions",
      title: "Before you book a visit",
      items: [
        {
          q: "When should we start?",
          a: "Design in autumn and winter, build in spring. If you call in May, the honest answer is usually that we should design now and build next year.",
        },
        {
          q: "Do you do maintenance?",
          a: "Twice a year on gardens we have built, which is enough for most designed gardens. We do not do weekly grounds maintenance and would do it badly.",
        },
        {
          q: "What if we only want the design?",
          a: "That is fine and it is a listed service. You get a costed schedule you can put out to any contractor, and we will tell you what to ask them.",
        },
        {
          q: "How much does a garden cost?",
          a: "Design and build starts around twenty-four thousand for a typical suburban garden. Access is usually what moves the number, not size.",
        },
        {
          q: "Is the guarantee real?",
          a: "Two years on planting, and yes. The condition is that the garden was watered, which is why we hand over a care calendar and why we do the watering ourselves in year one.",
        },
      ],
    },

    {
      type: "booking",
      id: "visit",
      tone: "ink",
      ghost: ["Thornfield"],
      eyebrow: "Site visit",
      title: "Request a site visit",
      intro: "Two hours on site, £350, with a written summary afterwards and credited in full against any design work.",
      fields: [
        { name: "name", label: "Your name", type: "text", required: true, half: true },
        { name: "phone", label: "Phone", type: "tel", required: true, half: true },
        { name: "email", label: "Email", type: "email", required: true, half: true },
        {
          name: "where",
          label: "Where is the garden",
          type: "text",
          required: true,
          half: true,
          placeholder: "Town or postcode",
        },
        {
          name: "scope",
          label: "What are you after",
          type: "select",
          required: true,
          half: true,
          placeholder: "Please choose",
          options: [
            "Design and build",
            "Design only",
            "Planting plan for an existing garden",
            "Hard landscaping only",
            "Not sure yet",
          ],
        },
        {
          name: "access",
          label: "Is there side access",
          type: "select",
          half: true,
          placeholder: "Please choose",
          options: [
            "Yes, wide enough for a machine",
            "Yes, but narrow",
            "No, through the house only",
            "Not sure",
          ],
        },
        {
          name: "notes",
          label: "About the garden",
          type: "textarea",
          placeholder: "Rough size, which way it faces, what is there now, and what you want to be able to do in it.",
        },
      ],
      submitLabel: "Request a visit",
      note: "We reply within three working days. Your details are used to arrange the visit and nothing else.",
      aside: {
        title: "Worth knowing",
        items: [
          "Design happens in autumn and winter, build in spring",
          "The visit fee is credited in full against design work",
          "Access matters more to the price than size does",
        ],
        phone: PHONE,
      },
    },

    {
      type: "footer",
      columns: [
        {
          title: "Practice",
          links: [
            { label: "Projects", href: "#projects" },
            { label: "Services and rates", href: "#services" },
            { label: "Where we work", href: "#areas" },
            { label: "Seasonal care", href: "#seasonal" },
          ],
        },
        { title: "Getting started", links: [{ label: "Request a site visit", href: "#visit" }] },
      ],
      note: "Every garden on this page was photographed in its second or third summer. A garden photographed on handover day tells you what the contractor did, not what the designer knew.",
      legal: [
        "Thornfield Gardens is a fictional practice created to demonstrate this template.",
        "On a live site this line carries the company registration and the public liability cover.",
      ],
    },
  ],
});

/** What the demo bar says. Named separately so the preview route stays generic. */
export const demoLabel = { practice: "Thornfield Gardens", templateName: "Verge" };
