import { defineTemplate } from "../kit/schema";
import { theme } from "./theme";

/**
 * DATUM, as a working practice.
 *
 * OKONMA ARCHITECTS DOES NOT EXIST. Fictional, and labelled as such in a bar
 * above the design that cannot be dismissed.
 *
 * A SOLE PRACTITIONER, and that is a decision rather than a shortage. The
 * photography honestly supported one architect, and rather than pad a team
 * page with mismatched portraits the demo takes the position that actually
 * follows from it: one architect, ten projects on the go, everything drawn by
 * the person you meet. That is a real and common structure for a practice this
 * size, and it makes the template's Team band mean something instead of being
 * a grid of strangers.
 *
 * AWARDS AND PUBLICATIONS ARE INVENTED AND THE PAGE SAYS SO. Same rule as
 * Atelier's press band: naming real prizes on a fictional practice is the same
 * problem as a real company's logo in the photography.
 */

const PHONE = "0117 496 0208";

export const config = defineTemplate({
  brand: {
    name: "Okonma Architects",
    mark: "Okonma",
    tagline: "A one-architect practice working on houses and small public buildings.",
    contact: {
      phone: PHONE,
      email: "studio@okonma.example",
      address: ["Top floor, Sydenham Works", "Bristol BS3 4AL"],
      hours: "By appointment",
    },
    social: [],
  },

  theme,

  seo: {
    title: "Okonma Architects",
    description:
      "A one-architect practice in Bristol working on houses, extensions and small public buildings. Selected works, how the practice runs, and what it costs.",
  },

  settings: {},

  sections: [
    {
      type: "nav",
      links: [
        { label: "Works", href: "#works" },
        { label: "Practice", href: "#practice" },
        { label: "Architect", href: "#architect" },
        { label: "Recognition", href: "#recognition" },
      ],
      phone: PHONE,
    },

    {
      type: "heroField",
      tone: "field",
      // `split`. Atelier holds `editorial` in this category and Threshold
      // holds `banner`, leaving `offset` and `centred` for the two inventory
      // templates that complete Property & Design.
      layout: "split",
      ghost: ["Drawn"],
      eyebrow: "Bristol",
      headline: { lead: "Buildings that", main: "explain themselves." },
      sub: "One architect, ten projects at a time, every drawing produced by the person who will be on site when it is read. Houses, extensions, and the occasional small public building.",
      actions: [{ label: "Selected works", href: "#works", style: "secondary" }],
      chips: [],
      subject: {
        src: "/templates/architecture-studio/hero.jpg",
        alt: "A concrete facade of repeating oval windows meeting at a corner.",
        width: 1400,
        height: 2056,
      },
      facts: [
        { label: "Established", value: "2011" },
        { label: "Practice size", value: "One architect, one part-time technician" },
        { label: "Live projects", value: "Ten, deliberately" },
        { label: "Sectors", value: "Housing, extensions, small public work" },
      ],
    },

    {
      type: "projectIndex",
      id: "works",
      eyebrow: "Selected works",
      title: "Built and building",
      layout: "asymmetric",
      projects: [
        {
          title: "Ashley Down Pavilion",
          meta: "Bristol · Completed 2024",
          body: "A cricket pavilion for a club that had been in a portacabin for nineteen years. Cross-laminated timber, a single long roof, and a verandah wide enough to be useful in the rain.",
          image: {
            src: "/templates/architecture-studio/work-1.jpg",
            alt: "An angular building with a sharply cantilevered upper storey against a clear sky.",
            width: 1400,
            height: 2074,
          },
        },
        {
          title: "Cotham House",
          meta: "Bristol · Completed 2023",
          body: "A rear extension and a full internal replan of a Georgian terrace, working within a conservation area.",
          image: {
            src: "/templates/architecture-studio/work-2.jpg",
            alt: "A modern facade with a deep lattice of precast panels.",
            width: 1400,
            height: 2035,
          },
        },
        {
          title: "Redcliffe Wharf Studios",
          meta: "Bristol · On site",
          body: "Nine workspaces on a constrained dockside plot, built to a budget that assumed nothing would be bespoke.",
          image: {
            src: "/templates/architecture-studio/work-3.jpg",
            alt: "A contemporary glazed building front seen from street level.",
            width: 1400,
            height: 787,
          },
        },
        {
          title: "Two Houses, Portishead",
          meta: "North Somerset · Planning granted",
          body: "A pair of houses on one plot, arranged so neither looks into the other and both get the afternoon.",
          image: {
            src: "/templates/architecture-studio/work-4.jpg",
            alt: "A reflective glass facade mirroring the buildings opposite.",
            width: 1400,
            height: 931,
          },
        },
      ],
    },

    {
      type: "feature",
      id: "practice",
      tone: "surface",
      media: "left",
      eyebrow: "Practice",
      title: "Ten projects, one pair of hands",
      intro: "The practice is small on purpose and has turned down the work that would have changed that.",
      body: [
        "Most practices this size are trying to become a practice twice the size. This one is not. Ten live projects is the number one architect can hold properly in their head, and holding them properly is the entire product: the reason a drawing gets read correctly on site is that the person who drew it knows why every line is where it is.",
        "In practice that means the client meets the architect at the first visit and is still speaking to the same architect at handover, three years later. It also means a waiting list, which is stated honestly at the first conversation rather than discovered in month four.",
        "The work is roughly two thirds houses and extensions, one third small public and workspace projects. The public work subsidises the houses, which is the arrangement most small practices have and few describe.",
      ],
      facts: [
        { label: "Established", value: "2011" },
        { label: "Completed", value: "Sixty-two projects" },
        { label: "Typical fee", value: "9 to 12% of construction cost" },
        { label: "Waiting list", value: "Usually three to five months" },
      ],
      image: {
        src: "/templates/architecture-studio/practice.jpg",
        alt: "A studio wall of plans, elevations and models with handwritten notes pinned beside them.",
        width: 1400,
        height: 933,
      },
    },

    {
      type: "people",
      id: "architect",
      eyebrow: "The architect",
      title: "Who you will be working with",
      intro: "There is one, and there is not going to be a second.",
      people: [
        {
          name: "Chidi Okonma",
          role: "Principal",
          bio: "Chidi worked in two large Bristol practices for nine years, ran their housing teams, and left in 2011 because he was drawing less every year. He has drawn every project since himself.",
          image: {
            src: "/templates/architecture-studio/principal.jpg",
            alt: "Chidi Okonma at his desk with a scale model and drawings.",
            width: 1100,
            height: 733,
          },
          credentials: [
            "RIBA chartered",
            "ARB registered",
            "MArch, University of Bath",
          ],
        },
      ],
    },

    {
      type: "credits",
      id: "recognition",
      tone: "surface",
      eyebrow: "Recognition",
      title: "Awards and publications",
      items: [
        { name: "West Country Architecture Prize", detail: "Ashley Down Pavilion, shortlist", year: "2024" },
        { name: "The Small Practice Review", detail: "Practice profile, six pages", year: "2024" },
        { name: "Timber Building Annual", detail: "Ashley Down Pavilion", year: "2023" },
        { name: "Conservation Area Awards", detail: "Cotham House, commended", year: "2023" },
        { name: "The Long Room", detail: "On running a practice that does not grow", year: "2022" },
      ],
      note: "These awards and publications are invented for this demo. Naming real prizes and real magazines on a fictional practice would be the same problem as putting a real company's logo in the photography. On a live site this band carries what the practice has actually won and where it has actually appeared, with dates.",
    },

    {
      type: "faq",
      eyebrow: "Questions",
      title: "Before you write",
      items: [
        {
          q: "How long is the wait?",
          a: "Usually three to five months before a project can start properly. That is stated at the first conversation rather than discovered later, and it is the direct consequence of the practice staying at ten live projects.",
        },
        {
          q: "What do you charge?",
          a: "Between nine and twelve per cent of construction cost for a full service, or a fixed fee for feasibility and planning taken on their own. The percentage is agreed before any drawing starts.",
        },
        {
          q: "Will you do just the planning application?",
          a: "Yes, as a fixed-fee package. We will also tell you honestly if we think the application is likely to fail, before you pay for it.",
        },
        {
          q: "Do you work outside Bristol?",
          a: "Within about ninety minutes. Beyond that the site visits stop being frequent enough to be useful, and frequent site visits are most of what you are paying for.",
        },
        {
          q: "Can you recommend a contractor?",
          a: "Yes, and we will put the work out to three of them rather than one. We take no fee or commission from any contractor, ever.",
        },
      ],
    },

    {
      type: "booking",
      id: "enquire",
      tone: "ink",
      ghost: ["Okonma"],
      eyebrow: "Enquiries",
      title: "Write to the practice",
      intro: "Tell us about the site and what you want to do with it. Every enquiry gets a reply, including the ones we cannot take on.",
      fields: [
        { name: "name", label: "Your name", type: "text", required: true, half: true },
        { name: "email", label: "Email", type: "email", required: true, half: true },
        { name: "phone", label: "Phone", type: "tel", half: true },
        {
          name: "location",
          label: "Where is the site",
          type: "text",
          half: true,
          placeholder: "Town or postcode",
        },
        {
          name: "type",
          label: "What kind of project",
          type: "select",
          required: true,
          half: true,
          placeholder: "Please choose",
          options: [
            "New house",
            "Extension or remodel",
            "Workspace or commercial",
            "Public or community building",
            "Feasibility only",
          ],
        },
        {
          name: "stage",
          label: "Where are you up to",
          type: "select",
          half: true,
          placeholder: "Please choose",
          options: [
            "Thinking about it",
            "Site owned, nothing drawn",
            "Drawings exist, need a second opinion",
            "Planning refused, starting again",
          ],
        },
        {
          name: "notes",
          label: "About the project",
          type: "textarea",
          placeholder: "The site, the constraints you know about, roughly what you are prepared to spend, and when you would want to be in.",
        },
      ],
      submitLabel: "Send an enquiry",
      note: "Enquiries are read by the architect, not by an assistant. Your details are used to answer them and nothing else.",
      aside: {
        title: "Worth knowing",
        items: [
          "There is usually a three to five month wait to start",
          "Feasibility and planning can be taken as fixed-fee packages",
          "We work within about ninety minutes of Bristol",
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
            { label: "Selected works", href: "#works" },
            { label: "The practice", href: "#practice" },
            { label: "The architect", href: "#architect" },
            { label: "Recognition", href: "#recognition" },
          ],
        },
        {
          title: "Contact",
          links: [{ label: "Enquiries", href: "#enquire" }],
        },
      ],
      note: "The studio is on the top floor and there is no lift. If that is a problem, say so and we will meet at the site or somewhere else entirely.",
      legal: [
        "Okonma Architects is a fictional practice created to demonstrate this template.",
        "On a live site this line carries the ARB registration number and the RIBA chartered practice number.",
      ],
    },
  ],
});

/** What the demo bar says. Named separately so the preview route stays generic. */
export const demoLabel = { practice: "Okonma Architects", templateName: "Datum" };
