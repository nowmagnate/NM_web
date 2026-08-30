import { defineTemplate } from "../kit/schema";
import { theme } from "./theme";

/**
 * ATELIER, as a working studio.
 *
 * HALVARD & CO DOES NOT EXIST. Fictional, and labelled as such in a bar above
 * the design that cannot be dismissed.
 *
 * THE FIRST PORTFOLIO-LED TEMPLATE, and it is built on a different assumption
 * from the eight booking-led ones. Those pages argue: they answer objections,
 * publish prices and repeat one action until the visitor takes it. This page
 * does almost none of that. The work makes the case, the copy stays out of the
 * way, and there is exactly ONE action, arriving at the very bottom.
 *
 * That restraint is the product. A studio whose own site is pushing a booking
 * button every screen is telling a prospective client what kind of studio it
 * is, and it is not the kind that gets asked to do a whole house.
 *
 * THE NAV CARRIES NO BUTTON, for the same reason. Booking-led templates keep
 * the action in the bar at every width. Here it would be the loudest thing on
 * a page whose argument depends on being quiet.
 *
 * PRESS IS FICTIONAL AND SAYS SO. Naming real magazines on a fictional studio
 * is the same problem as a real practice's logo in the photography, so the
 * titles below are invented and the note underneath states it. On a live site
 * that band names publications the studio has actually appeared in.
 */

const PHONE = "020 7946 0231";

export const config = defineTemplate({
  brand: {
    name: "Halvard & Co",
    mark: "Halvard",
    tagline: "An interior design studio working on whole houses in London and Sussex.",
    contact: {
      phone: PHONE,
      email: "studio@halvardandco.example",
      address: ["Unit 9, Chalkwell Yard", "London SE1 3TR"],
      hours: "Studio visits by appointment",
    },
    social: [{ label: "Instagram", href: "https://instagram.com" }],
  },

  theme,

  seo: {
    title: "Halvard & Co",
    description:
      "An interior design studio working on whole houses in London and Sussex. Selected projects, how we work, and what a full scheme costs.",
  },

  // No sticky action. The portfolio-led archetype earns its one enquiry at the
  // foot of the page rather than following the reader down it.
  settings: {},

  sections: [
    {
      type: "nav",
      links: [
        { label: "Work", href: "#work" },
        { label: "Studio", href: "#studio" },
        { label: "Process", href: "#process" },
        { label: "Services", href: "#services" },
        { label: "Press", href: "#press" },
      ],
      phone: PHONE,
    },

    {
      type: "heroField",
      tone: "field",
      // `editorial`. Property & Design holds five templates, so it needs all
      // five compositions; this one takes the masthead.
      layout: "editorial",
      ghost: ["Whole houses"],
      eyebrow: "Interior design, London and Sussex",
      headline: { lead: "Rooms that were", main: "already there." },
      sub: "We work on whole houses rather than single rooms, usually over eighteen months, usually with an architect already appointed. Six projects a year, which is as many as two people can do properly.",
      actions: [{ label: "See the work", href: "#work", style: "secondary" }],
      chips: [],
      subject: {
        src: "/templates/interior-designer/hero.jpg",
        alt: "A drawing room with layered neutral upholstery and full-height curtains.",
        width: 1400,
        height: 1867,
      },
      facts: [
        { label: "Founded", value: "2014" },
        { label: "Projects a year", value: "Six, by two designers" },
        { label: "Typical scheme", value: "Whole house, 12 to 24 months" },
        { label: "Where", value: "London, Sussex, occasionally further" },
      ],
    },

    {
      type: "projectIndex",
      id: "work",
      eyebrow: "Selected work",
      title: "Recent projects",
      layout: "asymmetric",
      projects: [
        {
          title: "Chalcot Crescent",
          meta: "Primrose Hill · 2024",
          body: "A five-bedroom terrace stripped back to the structure. The brief was to make it feel like nothing had been done, which took eighteen months and a great deal of joinery.",
          image: {
            src: "/templates/interior-designer/project-1.jpg",
            alt: "A pale living and dining room with fluted timber panelling and marble.",
            width: 1400,
            height: 800,
          },
        },
        {
          title: "The Old Rectory",
          meta: "West Sussex · 2023",
          body: "Georgian, listed, and cold. Underfloor heating throughout without lifting a single original board.",
          image: {
            src: "/templates/interior-designer/project-2.jpg",
            alt: "A bright sitting room in cream and stone with full-height sheer curtains.",
            width: 1400,
            height: 1376,
          },
        },
        {
          title: "Fernhead Road",
          meta: "Queens Park · 2023",
          body: "A rear extension and a complete replan of the ground floor for a family of five.",
          image: {
            src: "/templates/interior-designer/project-3.jpg",
            alt: "An open-plan living room opening onto a garden through folding doors.",
            width: 1400,
            height: 930,
          },
        },
        {
          title: "Cadogan Mews",
          meta: "Chelsea · 2022",
          body: "Nine hundred square feet on three floors. Everything is either built in or on castors.",
          image: {
            src: "/templates/interior-designer/project-4.jpg",
            alt: "A compact open-plan kitchen and living space in warm timber and stone.",
            width: 1400,
            height: 934,
          },
        },
      ],
    },

    {
      type: "feature",
      id: "studio",
      tone: "surface",
      media: "right",
      eyebrow: "The studio",
      title: "Two people, six projects, no juniors",
      intro: "Halvard is deliberately small and intends to stay that way.",
      body: [
        "Every project is run by one of the two of us from first survey to final snag, which is unusual at this scale and is the reason the list of completed work is short. We are not building a studio that can take on twenty schemes a year. We are building one where the person you met at the beginning is still the person answering the phone in month fourteen.",
        "In practice that means we turn down more work than we accept, and it means we will tell you early if we think somebody else is a better fit. It also means the drawings are done by the person who will be standing on site when they are read.",
        "We work almost entirely on whole houses. Single rooms rarely justify the process we use, and we would rather say that than take the fee.",
      ],
      facts: [
        { label: "Founded", value: "2014, in Bermondsey" },
        { label: "Studio size", value: "Two designers, one maker" },
        { label: "Completed", value: "Forty-one whole-house schemes" },
        { label: "Repeat clients", value: "Roughly a third" },
      ],
      image: {
        src: "/templates/interior-designer/feature.jpg",
        alt: "A sculptural fireplace wall in a minimal room with a black marble table.",
        width: 1200,
        height: 1800,
      },
    },

    {
      type: "steps",
      id: "process",
      eyebrow: "Process",
      title: "How a scheme runs",
      intro: "Four stages, and you can stop at the end of any of them.",
      steps: [
        {
          title: "Survey and concept",
          body: "Six to eight weeks. We measure everything, photograph everything, and come back with a direction rather than a scheme. This stage is charged as a fixed fee and is the only one you have to commit to before you have seen anything.",
        },
        {
          title: "Developed design",
          body: "Twelve weeks or so. Plans, elevations, joinery drawings, finishes, and a costed schedule. By the end of it you know exactly what the house will look like and roughly what it will cost.",
        },
        {
          title: "Tender and appointment",
          body: "We put the package out to three contractors we have worked with, read the returns with you, and tell you which one we would choose and why.",
        },
        {
          title: "On site",
          body: "Fortnightly visits, a written report after each one, and the same designer throughout. Snagging is included and is not considered finished until you say it is.",
        },
      ],
      aside: {
        title: "What we do not do",
        body: "We do not sell furniture at a markup, we do not take commission from suppliers, and we do not work on a percentage of construction cost, because all three of those reward us for spending more of your money. Fees are fixed at the end of developed design, when there is enough information for the number to mean something. Anything we buy on your behalf is invoiced at what we paid for it, with the receipts attached.",
      },
    },

    {
      type: "serviceMenu",
      id: "services",
      tone: "surface",
      eyebrow: "Services and rates",
      title: "What it costs",
      intro: "Published, because the alternative is a conversation where nobody says a number for three weeks.",
      layout: "menu",
      groups: [
        {
          items: [
            {
              name: "Initial visit",
              body: "Two hours at the house, and a written note afterwards with our honest view on whether the project suits us.",
              price: "£450",
            },
            {
              name: "Survey and concept",
              body: "Fixed fee. Measured survey, direction, and enough drawing to see the idea.",
              price: "From £6,500",
            },
            {
              name: "Full scheme",
              body: "Concept through to completion on a whole house. Fixed at the end of developed design.",
              price: "From £48,000",
            },
            {
              name: "Furnishing only",
              body: "For houses where the building work is already done or already someone else's.",
              price: "From £14,000",
            },
          ],
        },
      ],
      note: "Rates are for a typical four to five bedroom house and are indicative until we have seen it. Listed buildings and anything requiring structural intervention sit at the upper end.",
    },

    {
      type: "credits",
      id: "press",
      eyebrow: "Press",
      title: "Written about",
      items: [
        { name: "Interiors Quarterly", detail: "The Old Rectory, eight pages", year: "2024" },
        { name: "The Long Room", detail: "Studio profile", year: "2024" },
        { name: "Northern Homes Annual", detail: "Chalcot Crescent, cover", year: "2023" },
        { name: "Fabric and Stone", detail: "On working without supplier commission", year: "2023" },
        { name: "The Sussex Review", detail: "Ten houses worth the detour", year: "2022" },
      ],
      note: "These publications are invented for this demo. Naming real magazines on a fictional studio would be the same problem as putting a real company's logo in the photography, so the titles are fictional and this line says so. On a live site this band names publications the studio has actually appeared in, with the issue and the date.",
    },

    {
      type: "faq",
      eyebrow: "Questions",
      title: "Before you write",
      items: [
        {
          q: "Do you take on single rooms?",
          a: "Rarely. Our process is built around whole houses and costs more than a single room usually justifies. If that is what you need we will say so and suggest somebody better suited.",
        },
        {
          q: "Do we need an architect as well?",
          a: "For anything structural, yes, and we will happily work alongside one you have already appointed. We are not architects and do not pretend to be.",
        },
        {
          q: "How far ahead are you booking?",
          a: "Usually four to six months for a start on survey. We take six projects a year and do not overlap the on-site stages.",
        },
        {
          q: "Will you buy the furniture for us?",
          a: "Yes, at cost with the receipts attached. We take no commission from any supplier, which is why the fee looks higher than some and the total usually is not.",
        },
        {
          q: "What if we hate the concept?",
          a: "Then we stop at the end of that stage and you have paid a fixed fee for a set of drawings and an honest opinion. That has happened twice and neither time was a disaster.",
        },
      ],
    },

    {
      type: "booking",
      id: "enquire",
      tone: "ink",
      ghost: ["Halvard"],
      eyebrow: "Enquiries",
      title: "Write to the studio",
      intro: "Tell us about the house. We reply to everything, usually within a week, including the ones we cannot take.",
      fields: [
        { name: "name", label: "Your name", type: "text", required: true, half: true },
        { name: "email", label: "Email", type: "email", required: true, half: true },
        { name: "phone", label: "Phone", type: "tel", half: true },
        {
          name: "location",
          label: "Where is the house",
          type: "text",
          half: true,
          placeholder: "Town or postcode",
        },
        {
          name: "scope",
          label: "What are you thinking of",
          type: "select",
          required: true,
          half: true,
          placeholder: "Please choose",
          options: [
            "Whole house",
            "Ground floor and extension",
            "Furnishing an existing house",
            "Not sure yet",
          ],
        },
        {
          name: "timing",
          label: "When would you want to start",
          type: "text",
          half: true,
          placeholder: "A season and a year is plenty",
        },
        {
          name: "notes",
          label: "About the house",
          type: "textarea",
          placeholder: "Age, size, what has already been done, whether an architect is appointed, and what is bothering you about it now.",
        },
      ],
      submitLabel: "Send an enquiry",
      note: "We read everything ourselves. Your details are used to answer the enquiry and are never added to a mailing list.",
      aside: {
        title: "Worth knowing",
        items: [
          "We take six projects a year and book four to six months ahead",
          "The initial visit is chargeable and everything before it is not",
          "We will tell you early if we are the wrong studio for the house",
        ],
        phone: PHONE,
      },
    },

    {
      type: "footer",
      columns: [
        {
          title: "Studio",
          links: [
            { label: "Selected work", href: "#work" },
            { label: "The studio", href: "#studio" },
            { label: "Process", href: "#process" },
            { label: "Services and rates", href: "#services" },
          ],
        },
        {
          title: "Contact",
          links: [
            { label: "Press", href: "#press" },
            { label: "Enquiries", href: "#enquire" },
          ],
        },
      ],
      note: "Studio visits are by appointment. The yard entrance is on Chalkwell Street, not on the main road.",
      legal: [
        "Halvard & Co is a fictional studio created to demonstrate this template.",
        "On a live site this line carries the company registration and the professional body the practice belongs to.",
      ],
    },
  ],
});

/** What the demo bar says. Named separately so the preview route stays generic. */
export const demoLabel = { practice: "Halvard & Co", templateName: "Atelier" };
