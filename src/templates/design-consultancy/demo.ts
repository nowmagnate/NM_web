import { defineTemplate } from "../kit/schema";
import { theme } from "./theme";

/**
 * STUDIO, as a working consultancy.
 *
 * FEN & MARLOWE DOES NOT EXIST. Fictional, and labelled as such in a bar above
 * the design that cannot be dismissed.
 *
 * SELECTED WORK IS A LIST, NOT A GRID, and that is the most interesting
 * decision in this template. The catalog blurb for it says "consultancies
 * selling on thinking rather than deliverables", and a grid of screenshots
 * sells deliverables. A ruled list of engagements, each with what the question
 * was and what changed, sells thinking. It is also the only version that
 * survives the very common case where most of a consultancy's best work is
 * under NDA and cannot be shown at all.
 *
 * The client names are invented and the note says so.
 */

const PHONE = "020 7946 0274";

export const config = defineTemplate({
  brand: {
    name: "Fen & Marlowe",
    mark: "Fen & Marlowe",
    tagline: "A two-person design consultancy working on products people have to use.",
    contact: {
      phone: PHONE,
      email: "hello@fenmarlowe.example",
      address: ["Second floor, Ivory Works", "London E2 8HD"],
      hours: "Monday to Thursday",
    },
    social: [],
  },

  theme,

  seo: {
    title: "Fen & Marlowe",
    description:
      "A two-person design consultancy working on products people have to use rather than want to. Engagements, rates and how we work, all published.",
  },

  settings: {},

  sections: [
    {
      type: "nav",
      links: [
        { label: "Work", href: "#work" },
        { label: "Services", href: "#services" },
        { label: "How we engage", href: "#engage" },
        { label: "Who we are", href: "#team" },
      ],
      phone: PHONE,
    },

    {
      type: "heroField",
      tone: "field",
      layout: "editorial",
      ghost: ["Two people"],
      eyebrow: "London",
      headline: { lead: "We work on", main: "the boring half." },
      sub: "Admin screens, internal tools, onboarding, settings, the forms nobody photographs. Two designers, six-week engagements, and a rate card on this page rather than after a discovery call.",
      actions: [{ label: "See the work", href: "#work", style: "secondary" }],
      chips: [],
      subject: {
        src: "/templates/design-consultancy/hero.jpg",
        alt: "A design team working around a table with colour swatches and sketches.",
        width: 1600,
        height: 900,
      },
      facts: [
        { label: "Size", value: "Two designers, no juniors" },
        { label: "Engagement", value: "Six weeks, fixed fee" },
        { label: "Capacity", value: "One client at a time" },
        { label: "Rates", value: "Published, on this page" },
      ],
    },

    {
      type: "assurance",
      tone: "surface",
      title: "How this differs from an agency",
      items: [
        {
          title: "You get the two of us",
          body: "Not a pitch team and then a delivery team. The people in the first meeting are the people doing the work, because there is nobody else.",
        },
        {
          title: "One client at a time",
          body: "Six weeks, undivided. It is why the waiting list exists and why the work is finished when we say it will be.",
        },
        {
          title: "Fixed fee, published rate",
          body: "The number is on this page. Nobody has to sit through a discovery call to find out whether they can afford us.",
        },
        {
          title: "You keep everything",
          body: "Files, components, rationale, and a written handover your own team can build from after we leave.",
        },
      ],
    },

    {
      type: "credits",
      id: "work",
      eyebrow: "Selected work",
      title: "Engagements",
      intro: "What the question was, and what changed. Most of our best work is behind a login and cannot be shown, so this band says what happened instead of showing a screenshot of it.",
      items: [
        {
          name: "A logistics scheduler",
          detail: "Rebuilt the shift-planning screen four dispatchers used all day. Planning time per shift fell from around forty minutes to under ten.",
          year: "2025",
        },
        {
          name: "A clinical intake form",
          detail: "Reduced a fourteen-page paper intake to six screens without losing a single required field. Completion without staff help rose sharply.",
          year: "2024",
        },
        {
          name: "An insurance claims console",
          detail: "Six weeks on the internal tool rather than the customer-facing site, on the argument that the handlers were the bottleneck. They were.",
          year: "2024",
        },
        {
          name: "A university admissions portal",
          detail: "Reworked the applicant status page, which was generating most of the admissions office's inbound calls.",
          year: "2023",
        },
        {
          name: "A rail maintenance app",
          detail: "Designed for gloved hands, poor light and no signal. Three site visits before a single screen was drawn.",
          year: "2023",
        },
      ],
      note: "These engagements are invented for this demo, as are any organisations implied by them. On a live site this band names real clients where the contract permits it and describes the rest anonymously, which is what most consultancies actually have to do.",
    },

    {
      type: "serviceMenu",
      id: "services",
      eyebrow: "Services",
      title: "Three things",
      intro: "We are not a full-service anything. These are the pieces we are good at.",
      layout: "cards",
      groups: [
        {
          items: [
            {
              name: "Interface design",
              body: "The main engagement. Six weeks on one product area, ending in built-ready designs and a written rationale.",
              price: "£24,000",
              meta: "six weeks",
            },
            {
              name: "Design system foundations",
              body: "Tokens, components and the documentation that makes them survive contact with a development team.",
              price: "£18,000",
              meta: "four weeks",
            },
            {
              name: "A second opinion",
              body: "Two weeks reviewing what you already have, ending in a written assessment and a prioritised list. Often the right place to start.",
              price: "£7,500",
              meta: "two weeks",
            },
          ],
        },
      ],
      note: "Every engagement is fixed fee, paid half at the start and half at the end. If we overrun, that is our problem and our cost.",
    },

    {
      type: "steps",
      id: "engage",
      eyebrow: "How we engage",
      title: "Six weeks, in the open",
      intro: "The same shape every time, because a process that changes per client is a process nobody has.",
      steps: [
        {
          title: "Week one, we watch",
          body: "On site if we can, with the people who actually use the thing. No workshops, no post-its, no discovery deck. Just watching somebody do their job.",
        },
        {
          title: "Week two, we tell you what we found",
          body: "Including the times it is not a design problem. Roughly one engagement in five ends here, with a written recommendation and a smaller invoice.",
        },
        {
          title: "Weeks three to five, we design",
          body: "In the open, in a file you have access to from day one. No reveal, no big presentation, and no chance of week five being a surprise.",
        },
        {
          title: "Week six, we hand over",
          body: "Built-ready designs, components, and a written rationale for every significant decision, so the reasoning survives us leaving.",
        },
      ],
      aside: {
        title: "When we say it is not a design problem",
        body: "It happens often enough to be worth stating up front. Sometimes the screen is fine and the process behind it is broken, or the team already knows what to do and has not been allowed to do it. Telling a client that in week two costs us four weeks of fee and is the single most useful thing we have ever done for several of them. It is also why the second-opinion engagement exists at a fifth of the price.",
      },
    },

    {
      type: "people",
      id: "team",
      tone: "surface",
      eyebrow: "Who we are",
      title: "Two of us, and that is the whole studio",
      intro: "No juniors, no contractors, no plans to grow.",
      people: [
        {
          name: "Isolde Marlowe",
          role: "Interface and systems",
          bio: "Twelve years in-house, mostly on internal tools at companies whose customers never saw them. She takes the design system work and most of the second opinions.",
          image: {
            src: "/templates/design-consultancy/person-2.jpg",
            alt: "Portrait of Isolde Marlowe.",
            width: 1000,
            height: 667,
          },
          credentials: ["Twelve years in-house before this", "Writes the handover documents"],
        },
        {
          name: "Tobias Fen",
          role: "Research and interaction",
          bio: "Started as a support engineer, which is where the habit of watching people work rather than asking them about it comes from. He does the first week on every engagement.",
          image: {
            src: "/templates/design-consultancy/person-1.jpg",
            alt: "Portrait of Tobias Fen.",
            width: 1000,
            height: 667,
          },
          credentials: ["Support engineer before design", "Does week one on every project"],
        },
      ],
    },

    {
      type: "feature",
      id: "studio",
      media: "right",
      eyebrow: "The studio",
      title: "Deliberately two people",
      body: [
        "Every consultancy this size is asked when it is going to grow. The honest answer is that growing would break the thing clients are buying: two senior people, undivided, for six weeks. Add a third and somebody has to manage. Add a fifth and somebody has to sell.",
        "So the model is a waiting list rather than a bigger team. It is usually four to eight weeks, it is stated in the first email, and it has cost us work we would have liked.",
        "We work Monday to Thursday. Friday is for the writing, the reading and the things that make the other four days worth paying for.",
      ],
      facts: [
        { label: "Founded", value: "2019" },
        { label: "Engagements", value: "Thirty-one completed" },
        { label: "Waiting list", value: "Four to eight weeks" },
        { label: "Working week", value: "Monday to Thursday" },
      ],
      image: {
        src: "/templates/design-consultancy/studio.jpg",
        alt: "Designers reviewing colour swatches together in a bright studio.",
        width: 1400,
        height: 788,
      },
    },

    {
      type: "faq",
      eyebrow: "Questions",
      title: "Before you write",
      items: [
        {
          q: "Can you start next week?",
          a: "Almost certainly not. There is usually a four to eight week wait, because we take one client at a time. It is stated in the first reply rather than discovered later.",
        },
        {
          q: "Do you do brand or marketing sites?",
          a: "No. There are people much better at that than us and we will happily name three of them.",
        },
        {
          q: "Will you work with our developers?",
          a: "Yes, and we would rather. The handover is written for a development team, not for a design team.",
        },
        {
          q: "What if six weeks is not enough?",
          a: "Then the scope was wrong, and that is on us to spot in week two. We do not extend engagements to fix our own estimating.",
        },
        {
          q: "Do you sign NDAs?",
          a: "Yes, routinely. Most of our work cannot be shown, which is why this page describes engagements rather than displaying them.",
        },
      ],
    },

    {
      type: "booking",
      id: "start",
      tone: "ink",
      ghost: ["Six weeks"],
      eyebrow: "Enquiries",
      title: "Start a project",
      intro: "Tell us what is broken and who has to use it. We reply within two working days, with the wait time in the first line.",
      fields: [
        { name: "name", label: "Your name", type: "text", required: true, half: true },
        { name: "email", label: "Email", type: "email", required: true, half: true },
        { name: "company", label: "Organisation", type: "text", half: true },
        {
          name: "engagement",
          label: "What are you after",
          type: "select",
          required: true,
          half: true,
          placeholder: "Please choose",
          options: [
            "Interface design, six weeks",
            "Design system foundations",
            "A second opinion",
            "Not sure yet",
          ],
        },
        {
          name: "notes",
          label: "What is the problem",
          type: "textarea",
          placeholder: "Who uses the thing, what goes wrong, what you have already tried, and when you would want to start.",
        },
      ],
      submitLabel: "Send an enquiry",
      note: "Read by both of us. Your details are used to answer the enquiry and nothing else.",
      aside: {
        title: "Worth knowing",
        items: [
          "There is usually a four to eight week wait",
          "Rates are on this page rather than after a call",
          "About one engagement in five ends in week two, on purpose",
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
            { label: "Engagements", href: "#work" },
            { label: "Services", href: "#services" },
            { label: "How we engage", href: "#engage" },
            { label: "Who we are", href: "#team" },
          ],
        },
        { title: "Contact", links: [{ label: "Start a project", href: "#start" }] },
      ],
      note: "We work Monday to Thursday. Emails sent on a Friday are answered on the Monday, which is deliberate and not an oversight.",
      legal: [
        "Fen & Marlowe is a fictional consultancy created to demonstrate this template.",
        "On a live site this line carries the company registration and the standard terms of engagement.",
      ],
    },
  ],
});

/** What the demo bar says. Named separately so the preview route stays generic. */
export const demoLabel = { practice: "Fen & Marlowe", templateName: "Studio" };
