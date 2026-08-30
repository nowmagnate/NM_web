import { defineTemplate } from "../kit/schema";
import { theme } from "./theme";

/**
 * CORNERSTONE, as a working builder.
 *
 * HOLLOWAY & SON DOES NOT EXIST. Fictional, and labelled as such in a bar
 * above the design that cannot be dismissed.
 *
 * THE WARRANTY BAND IS THE POINT OF THIS TEMPLATE. A custom home is the
 * largest purchase most people ever make from a small business, and the thing
 * a buyer is actually frightened of is not the design, it is what happens two
 * winters later when something moves. So the warranty is a named section with
 * dates and durations in it, sitting on the page rather than in a PDF nobody
 * reads before signing.
 */

const PHONE = "01423 496 018";

export const config = defineTemplate({
  brand: {
    name: "Holloway & Son",
    mark: "Holloway",
    tagline: "Custom homes in North Yorkshire, four a year.",
    contact: {
      phone: PHONE,
      email: "office@hollowayandson.example",
      address: ["Kirkby Yard, Ripon Road", "Harrogate HG3 2AY"],
      hours: "Monday to Friday, 7.30am to 5pm",
    },
    social: [],
  },

  theme,

  seo: {
    title: "Holloway & Son",
    description:
      "Custom home builders in North Yorkshire. Four houses a year, a published build process, and a ten-year structural warranty explained in plain terms.",
  },

  settings: {},

  sections: [
    {
      type: "nav",
      links: [
        { label: "Completed builds", href: "#builds" },
        { label: "Specifications", href: "#specification" },
        { label: "Build process", href: "#process" },
        { label: "Warranty", href: "#warranty" },
      ],
      phone: PHONE,
    },

    {
      type: "heroField",
      tone: "field",
      layout: "banner",
      ghost: ["Four a year"],
      eyebrow: "North Yorkshire",
      headline: { lead: "A house takes", main: "as long as it takes." },
      sub: "Four custom homes a year, built by the same eleven people. The programme is published before you sign, the specification is written down to the socket, and the warranty is on this page rather than in an envelope.",
      actions: [{ label: "See completed builds", href: "#builds", style: "secondary" }],
      chips: ["Fixed-price contracts", "Same crew, every house"],
      subject: {
        src: "/templates/custom-home-builder/hero.jpg",
        alt: "A newly completed rendered house with a slate roof, photographed in black and white.",
        width: 1600,
        height: 1067,
      },
      facts: [
        { label: "Capacity", value: "Four houses a year" },
        { label: "Typical programme", value: "14 to 20 months" },
        { label: "Crew", value: "Eleven, employed not subcontracted" },
        { label: "Warranty", value: "Ten years structural" },
      ],
    },

    {
      type: "projectIndex",
      id: "builds",
      eyebrow: "Completed builds",
      title: "Houses we have finished",
      intro: "Photographed on handover day. Every one of them is somebody's home now, so there are no interiors here.",
      layout: "asymmetric",
      projects: [
        {
          title: "Grewelthorpe",
          meta: "Five bedroom · Completed 2024 · 19 months",
          body: "Local sandstone under a slate roof, to a planning condition that specified both. Air source heating, mechanical ventilation, and an airtightness result the client asked us to publish.",
          image: {
            src: "/templates/custom-home-builder/build-1.jpg",
            alt: "A newly built stone house with grey window frames and bifold doors.",
            width: 1400,
            height: 788,
          },
        },
        {
          title: "Beckwithshaw",
          meta: "Four bedroom · Completed 2023 · 16 months",
          body: "A steeper site than anybody wanted. Two storeys at the front and three at the back, which added four months and was worth it.",
          image: {
            src: "/templates/custom-home-builder/build-2.jpg",
            alt: "A modern gabled house with dark cladding and a covered entrance.",
            width: 1200,
            height: 1800,
          },
        },
      ],
    },

    {
      type: "checklist",
      id: "specification",
      tone: "surface",
      eyebrow: "Plans and specifications",
      title: "What is in a Holloway house as standard",
      intro: "Written out, because the gap between builders is almost never the headline price. It is what the price includes.",
      columns: [
        {
          name: "Structure and fabric",
          items: [
            "Timber frame, factory built to our drawings",
            "Airtightness tested and the result given to you",
            "Mechanical ventilation with heat recovery throughout",
            "Triple glazing as standard, not as an upgrade",
            "Slate or clay roof, never concrete tile",
          ],
        },
        {
          name: "Services and heating",
          items: [
            "Air source heat pump, sized by a heat loss calculation",
            "Underfloor heating on the ground floor",
            "First-fix data cabling to every bedroom",
            "Solar array and battery where the roof suits it",
            "Every circuit labelled, and a drawing of them handed over",
          ],
        },
        {
          name: "Second fix",
          items: [
            "Solid internal doors on concealed hinges",
            "Kitchen budget stated in the contract, not allowed for",
            "Sanitaryware chosen by you within a stated figure",
            "Painted, not sprayed, in two coats over primer",
            "Landscaping to the boundary, including drainage",
          ],
        },
      ],
      note: "Anything not on this list is either a variation or was never included, and both are written down before work starts. The single most common reason a build goes over budget is a specification that said allowance where it should have said a number.",
    },

    {
      type: "steps",
      id: "process",
      eyebrow: "Build process",
      title: "From plot to handover",
      steps: [
        {
          title: "Site and feasibility",
          body: "Before anything is drawn. Ground conditions, access, services, and an honest view on whether the plot suits what you want. Charged as a fixed fee and credited if you go ahead.",
        },
        {
          title: "Design and planning",
          body: "With your architect or ours. We price the drawings as they develop rather than at the end, so nobody discovers the number after planning has been granted.",
        },
        {
          title: "Fixed-price contract",
          body: "A programme with dates, a specification down to the socket, and a fixed price. Variations are quoted in writing and signed before they happen, without exception.",
        },
        {
          title: "Build and handover",
          body: "Fortnightly site meetings you are welcome at, a written report after each, and a snagging period that ends when you say it does rather than when the calendar does.",
        },
      ],
      aside: {
        title: "Why four a year",
        body: "Eleven people, employed rather than subcontracted, can build four houses properly in a year. They could start six. The difference shows up eighteen months later in the things nobody photographs: whether the airtightness result was achieved or approximated, whether the loft insulation was laid properly around the eaves, whether the drainage falls were set or guessed. We would rather turn work away than find out which.",
      },
    },

    {
      type: "credits",
      id: "warranty",
      eyebrow: "Warranty",
      title: "What is covered, and for how long",
      intro: "On the page rather than in an envelope handed over on the day you move in.",
      items: [
        { name: "Structure", detail: "Foundations, frame, roof structure and external envelope", year: "10 years" },
        { name: "Roof coverings and rainwater goods", detail: "Including flashings and gutters", year: "10 years" },
        { name: "Windows, doors and seals", detail: "Manufacturer-backed and administered by us", year: "10 years" },
        { name: "Services", detail: "Heating, ventilation, electrical and plumbing installation", year: "2 years" },
        { name: "Finishes and second fix", detail: "Joinery, decoration, tiling and sanitaryware", year: "2 years" },
        { name: "Snagging", detail: "Open until you close it, not until a date passes", year: "No limit" },
      ],
      note: "Warranty work is done by the same crew that built the house. We do not use a claims administrator, and there is no excess to pay. The warranty is backed by structural insurance from an independent provider whose name and policy number are in your contract.",
    },

    {
      type: "reviews",
      tone: "surface",
      eyebrow: "Clients",
      title: "What people say afterwards",
      items: [
        {
          quote:
            "Two winters in, a section of gutter came away in a storm. I phoned on the Sunday and the same joiner who fitted it was on the roof on the Tuesday. No form, no excess, no argument.",
          name: "Hannah W.",
          meta: "Grewelthorpe, 2024",
        },
        {
          quote:
            "They quoted a fixed price with the kitchen figure written into the contract. Two other builders wanted to put an allowance in and I now understand why.",
          name: "David and Ruth O.",
          meta: "Beckwithshaw, 2023",
        },
        {
          quote:
            "Sixteen months, and it finished within two weeks of the programme they gave us at the start. I did not believe that was possible.",
          name: "Priya M.",
          meta: "Pateley Bridge, 2022",
        },
      ],
      sourceNote:
        "These reviews are demo content written for this template. On a live site this line names the platform the reviews were collected on and links to the profile they came from.",
    },

    {
      type: "faq",
      eyebrow: "Questions",
      title: "Before you enquire",
      items: [
        {
          q: "Do we need a plot already?",
          a: "No, but it helps. We will look at a plot you are considering before you buy it, and we have talked people out of two this year.",
        },
        {
          q: "Can we use our own architect?",
          a: "Yes, and most people do. We price the drawings as they develop rather than waiting until planning is granted and delivering a shock.",
        },
        {
          q: "How firm is the fixed price?",
          a: "Firm. Variations are quoted in writing and signed before the work happens. If we have got our own estimate wrong, that is our cost, not yours.",
        },
        {
          q: "How long is the wait?",
          a: "We take four houses a year and are usually booking nine to twelve months ahead. That is said in the first conversation.",
        },
        {
          q: "Do you build extensions?",
          a: "No. It is a different business with a different rhythm and we would do it badly.",
        },
      ],
    },

    {
      type: "location",
      id: "visit",
      eyebrow: "Find us",
      title: "The yard",
      address: ["Holloway & Son", "Kirkby Yard, Ripon Road", "Harrogate HG3 2AY"],
      hours: [
        { days: "Monday to Thursday", time: "7.30am to 5pm" },
        { days: "Friday", time: "7.30am to 3pm" },
        { days: "Saturday and Sunday", time: "Closed" },
        { days: "Site meetings", time: "Fortnightly, by arrangement" },
      ],
      phone: PHONE,
      email: "office@hollowayandson.example",
      mapsQuery: "Ripon Road, Harrogate HG3",
      travel: [
        "The office is in the yard behind the timber store, not on the main road.",
        "Please call before coming. Both of us are usually on site.",
        "Completed houses can sometimes be visited, with the owners' permission and never without it.",
      ],
    },

    {
      type: "booking",
      id: "enquire",
      tone: "ink",
      ghost: ["Holloway"],
      eyebrow: "Enquiries",
      title: "Talk to us about a build",
      intro: "Tell us about the plot and roughly what you have in mind. We reply within three working days, including the ones we cannot take on.",
      fields: [
        { name: "name", label: "Your name", type: "text", required: true, half: true },
        { name: "phone", label: "Phone", type: "tel", required: true, half: true },
        { name: "email", label: "Email", type: "email", required: true, half: true },
        {
          name: "plot",
          label: "Do you have a plot",
          type: "select",
          required: true,
          half: true,
          placeholder: "Please choose",
          options: [
            "Yes, we own it",
            "Under offer",
            "Looking at one",
            "Not yet",
          ],
        },
        {
          name: "stage",
          label: "Where are you up to",
          type: "select",
          half: true,
          placeholder: "Please choose",
          options: [
            "Nothing drawn yet",
            "Architect appointed",
            "Planning submitted",
            "Planning granted",
          ],
        },
        {
          name: "when",
          label: "When would you want to start",
          type: "text",
          half: true,
          placeholder: "A season and a year is plenty",
        },
        {
          name: "notes",
          label: "About the project",
          type: "textarea",
          placeholder: "Where the plot is, roughly what size of house, and what your budget is if you know it.",
        },
      ],
      submitLabel: "Send an enquiry",
      note: "Enquiries are read by one of the two directors. Your details are used to answer them and nothing else.",
      aside: {
        title: "Worth knowing",
        items: [
          "We are usually booking nine to twelve months ahead",
          "Feasibility on a plot you do not own yet is a fixed fee, credited later",
          "We will tell you if we think the plot is wrong before you buy it",
        ],
        phone: PHONE,
      },
    },

    {
      type: "footer",
      columns: [
        {
          title: "Building",
          links: [
            { label: "Completed builds", href: "#builds" },
            { label: "Specifications", href: "#specification" },
            { label: "Build process", href: "#process" },
            { label: "Warranty", href: "#warranty" },
          ],
        },
        {
          title: "Contact",
          links: [
            { label: "The yard", href: "#visit" },
            { label: "Enquiries", href: "#enquire" },
          ],
        },
      ],
      note: "Our crew is employed rather than subcontracted. That is why the same joiner who fitted something is the one who comes back to it two winters later.",
      legal: [
        "Holloway & Son is a fictional company created to demonstrate this template.",
        "On a live site this line carries the company registration, the structural warranty provider and the policy number.",
      ],
    },
  ],
});

/** What the demo bar says. Named separately so the preview route stays generic. */
export const demoLabel = { practice: "Holloway & Son", templateName: "Cornerstone" };
