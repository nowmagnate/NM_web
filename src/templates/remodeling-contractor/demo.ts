import { defineTemplate } from "../kit/schema";
import { theme } from "./theme";

/**
 * FRAMEWORK, as a working contractor.
 *
 * BRANNOCK BUILD DOES NOT EXIST. Fictional, and labelled as such in a bar
 * above the design that cannot be dismissed.
 *
 * THE LICENSING BAND IS THE ARGUMENT. The catalog blurb says this template is
 * for "contractors competing against cheaper, less credentialed bids", and
 * that competition is not won on photography. It is won by being the only bid
 * that publishes its licence number, its insurance limits and its lien policy
 * before anybody asks. So the credentials band is a named section with numbers
 * in it, sitting above the enquiry rather than in a footer.
 *
 * Every registration number below is invented and the note says so. A
 * fictional contractor quoting a real licence number would be considerably
 * worse than a logo in the photography.
 */

const PHONE = "(503) 555 0288";

export const config = defineTemplate({
  brand: {
    name: "Brannock Build",
    mark: "Brannock",
    tagline: "Kitchen, bath and whole-home remodeling in Portland.",
    contact: {
      phone: PHONE,
      email: "office@brannockbuild.example",
      address: ["4120 SE Milwaukie Avenue", "Portland, OR 97202"],
      hours: "Monday to Friday, 7am to 4pm",
    },
    social: [],
  },

  theme,

  seo: {
    title: "Brannock Build",
    description:
      "Kitchen, bath and whole-home remodeling in Portland. Fixed-price contracts, a published schedule, licence and insurance details on the page.",
  },

  settings: {
    stickyAction: { label: "Request a quote", href: "#quote", style: "primary" },
  },

  sections: [
    {
      type: "nav",
      links: [
        { label: "Kitchens and baths", href: "#kitchens" },
        { label: "Whole-home", href: "#whole-home" },
        { label: "Process", href: "#process" },
        { label: "Licensing", href: "#licensing" },
      ],
      action: { label: "Get a quote", href: "#quote", style: "primary" },
      phone: PHONE,
    },

    {
      type: "heroField",
      tone: "field",
      layout: "offset",
      ghost: ["Fixed price"],
      eyebrow: "Portland, Oregon",
      headline: { lead: "The lowest bid", main: "is a payment plan." },
      sub: "Kitchen, bath and whole-home remodeling on fixed-price contracts with a published schedule. Licensed, bonded, insured, and every one of those numbers is on this page.",
      actions: [
        { label: "Request a quote", href: "#quote", style: "primary" },
        { label: "See the licensing", href: "#licensing", style: "secondary" },
      ],
      chips: ["Fixed-price contracts", "Same crew, start to finish"],
      subject: {
        src: "/templates/remodeling-contractor/hero.jpg",
        alt: "A finished remodeled kitchen with white cabinetry, granite counters and new flooring.",
        width: 1600,
        height: 1200,
      },
      facts: [
        { label: "Contract", value: "Fixed price, written schedule" },
        { label: "Crew", value: "Employed, not day labour" },
        { label: "Licence", value: "CCB, published below" },
        { label: "Change orders", value: "Signed before work, always" },
      ],
    },

    {
      type: "assurance",
      tone: "surface",
      title: "Why the cheap bid costs more",
      items: [
        {
          title: "It is not the same scope",
          body: "Read the two bids side by side and the difference is almost never the labour rate. It is what is included, and what is written as an allowance.",
        },
        {
          title: "Allowances are not prices",
          body: "A bid with a two thousand dollar tile allowance is a bid with an unfinished number in it. Ours has the actual tile in it.",
        },
        {
          title: "Change orders are where it goes",
          body: "Every change here is quoted and signed before work happens. That is the single clause that decides whether a remodel finishes near its budget.",
        },
        {
          title: "Somebody has to be liable",
          body: "Licensed, bonded and insured, with the numbers published. A cheaper bid from somebody who is not is not cheaper, it is uninsured.",
        },
      ],
    },

    {
      type: "projectIndex",
      id: "kitchens",
      eyebrow: "Kitchens and baths",
      title: "Recent work",
      intro: "Photographed at handover, before the client moved back in.",
      layout: "asymmetric",
      projects: [
        {
          title: "Galley kitchen, Sellwood",
          meta: "1926 bungalow · 7 weeks · $68,000",
          body: "Wall removed to the dining room, full rewire, new plumbing stack. The mosaic backsplash was the only thing the client chose twice.",
          image: {
            src: "/templates/remodeling-contractor/project-1.jpg",
            alt: "A finished galley kitchen with white shaker cabinets, brass hardware and a mosaic backsplash.",
            width: 1400,
            height: 971,
          },
        },
        {
          title: "Primary bath, Laurelhurst",
          meta: "1912 foursquare · 4 weeks · $41,000",
          body: "Original footprint, everything else new. Discovered knob-and-tube in the ceiling on day three, which is exactly why the contingency exists.",
          image: {
            src: "/templates/remodeling-contractor/project-2.jpg",
            alt: "A room mid-renovation with fresh plaster, tiling started and a stepladder in place.",
            width: 1400,
            height: 933,
          },
        },
      ],
    },

    {
      type: "feature",
      id: "whole-home",
      media: "right",
      eyebrow: "Whole-home projects",
      title: "When it is more than one room",
      intro: "Roughly a third of our work, and a different animal from a kitchen.",
      body: [
        "A whole-home remodel is not several small projects run at once. Sequencing decides everything: the rewire has to happen before the plaster, the plaster before the floors, the floors before the cabinetry, and a single slipped delivery moves all of it. That is why these run on a published schedule with named dates rather than a rough duration.",
        "Most whole-home clients move out for part of it. We will tell you honestly at the estimate which weeks are liveable and which are not, rather than discovering it together in week five.",
        "Older Portland housing stock has a fixed set of surprises: knob-and-tube wiring, undersized service panels, cast-iron waste lines, and foundations that have moved. All four are budgeted as contingency rather than found later and billed as a change order.",
      ],
      facts: [
        { label: "Typical duration", value: "12 to 20 weeks" },
        { label: "Typical range", value: "$180,000 to $420,000" },
        { label: "Contingency", value: "8% of contract, itemised" },
        { label: "Site meetings", value: "Weekly, with a written report" },
      ],
      image: {
        src: "/templates/remodeling-contractor/project-2.jpg",
        alt: "A room mid-renovation with fresh plaster and part-tiled walls.",
        width: 1400,
        height: 933,
      },
    },

    {
      type: "steps",
      id: "process",
      eyebrow: "Process and timeline",
      title: "Estimate to final walkthrough",
      steps: [
        {
          title: "Site visit and rough range",
          body: "Ninety minutes, free. You leave with a range rather than a number, because anybody giving you a firm price in the first hour is guessing and will correct it later.",
        },
        {
          title: "Design and fixed-price proposal",
          body: "Two to four weeks. Drawings, a selections list with actual products and actual prices, and a schedule with dates. Charged as a design fee and credited against the contract.",
        },
        {
          title: "Permits and scheduling",
          body: "We pull them, not you. Portland permitting adds three to six weeks on most structural work and that time is in the schedule rather than hidden in it.",
        },
        {
          title: "Build, then a punch list you close",
          body: "Weekly site meetings, a written report each Friday, and a final walkthrough where you write the list. We do not consider the job finished until you say it is.",
        },
      ],
      aside: {
        title: "About change orders",
        body: "Every change is priced and signed before the work happens, without exception, including the ones that seem too small to bother with. That policy is unpopular in week three and is the reason our projects finish within a few per cent of contract. The industry norm is verbal changes reconciled at the end, which is how a remodel becomes a dispute. Ask any contractor you are considering how they handle change orders, and listen carefully to whether the answer contains the word signed.",
      },
    },

    {
      type: "credits",
      id: "licensing",
      tone: "surface",
      eyebrow: "Licensing and insurance",
      title: "Credentials, published",
      intro: "Ask every contractor you are considering for these four things. The ones who hesitate have told you something.",
      items: [
        { name: "Oregon CCB licence", detail: "Construction Contractors Board, active and in good standing", year: "No. 000000" },
        { name: "General liability", detail: "Two million dollars per occurrence", year: "Current" },
        { name: "Workers compensation", detail: "Covering every person on your site, all employed by us", year: "Current" },
        { name: "Surety bond", detail: "Held as required by the CCB for residential work", year: "Current" },
        { name: "Lien releases", detail: "Signed by every supplier and subcontractor before final payment", year: "Every job" },
        { name: "Written warranty", detail: "Two years workmanship, manufacturer terms on materials", year: "2 years" },
      ],
      note: "The licence number shown here is a placeholder of zeros, because this is a fictional company and publishing a plausible-looking registration number would be considerably worse than any logo in the photography. On a live site this band carries the contractor's real CCB number, which a client can and absolutely should verify with the state before signing anything.",
    },

    {
      type: "reviews",
      eyebrow: "Clients",
      title: "What people say afterwards",
      items: [
        {
          quote:
            "Their bid was eleven thousand dollars over the cheapest one. The final invoice was ninety dollars over their bid. I do not know what the other number would have finished at and I am glad I never found out.",
          name: "Rosalind K.",
          meta: "Sellwood kitchen",
        },
        {
          quote:
            "Found knob-and-tube in the ceiling on day three. It came out of the contingency line that was already in the contract, and nobody had a conversation about whose fault it was.",
          name: "Ade O.",
          meta: "Laurelhurst bath",
        },
        {
          quote:
            "A written report every Friday for sixteen weeks. I have worked with contractors for thirty years and never had that.",
          name: "Michael T.",
          meta: "Whole-home, Alberta",
        },
      ],
      sourceNote:
        "These reviews are demo content written for this template. On a live site this line names the platform the reviews were collected on and links to the profile they came from.",
    },

    {
      type: "faq",
      eyebrow: "Questions",
      title: "Before you get bids",
      items: [
        {
          q: "How do I compare your bid to a cheaper one?",
          a: "Put them side by side and look for the word allowance. Then count how many products are named with a price. A bid full of allowances is not a price, it is an opening position.",
        },
        {
          q: "Do you charge for the estimate?",
          a: "The site visit and rough range are free. The design and fixed-price proposal is charged as a design fee and credited in full against the contract if you go ahead.",
        },
        {
          q: "How long is the wait?",
          a: "Usually eight to twelve weeks to start, plus permitting. That is said in the first conversation rather than discovered after you have paid a design fee.",
        },
        {
          q: "Can we live in the house?",
          a: "For a kitchen or a bath, usually yes with a temporary setup. For whole-home work we will tell you which weeks are liveable at the estimate stage.",
        },
        {
          q: "Who is actually on my site?",
          a: "Our own crew. Electrical and plumbing are licensed subcontractors we have used for years, named in your contract, and covered by our insurance while they are there.",
        },
      ],
    },

    {
      type: "booking",
      id: "quote",
      tone: "ink",
      ghost: ["Brannock"],
      eyebrow: "Quote",
      title: "Request a quote",
      intro: "Tell us about the house and the room. The site visit is free and you leave it with a range, not a sales pitch.",
      fields: [
        { name: "name", label: "Your name", type: "text", required: true, half: true },
        { name: "phone", label: "Phone", type: "tel", required: true, half: true },
        { name: "email", label: "Email", type: "email", required: true, half: true },
        {
          name: "neighbourhood",
          label: "Neighbourhood",
          type: "text",
          required: true,
          half: true,
          placeholder: "Sellwood, Laurelhurst, and so on",
        },
        {
          name: "scope",
          label: "What is the project",
          type: "select",
          required: true,
          half: true,
          placeholder: "Please choose",
          options: [
            "Kitchen",
            "Bathroom",
            "Kitchen and bath together",
            "Whole-home remodel",
            "Not sure yet",
          ],
        },
        {
          name: "age",
          label: "Roughly how old is the house",
          type: "text",
          half: true,
          placeholder: "A decade is close enough",
        },
        {
          name: "notes",
          label: "About the project",
          type: "textarea",
          placeholder: "What you want done, whether you have drawings, what your budget range is, and when you would want to start.",
        },
      ],
      submitLabel: "Request a quote",
      note: "We reply within two working days. Your details are used to arrange the site visit and nothing else.",
      aside: {
        title: "Call instead if",
        items: [
          "You already have bids and want to compare scopes",
          "There is a leak, a failure or a deadline",
          "You want to check the licence before you talk to us at all",
        ],
        phone: PHONE,
      },
    },

    {
      type: "footer",
      columns: [
        {
          title: "Work",
          links: [
            { label: "Kitchens and baths", href: "#kitchens" },
            { label: "Whole-home projects", href: "#whole-home" },
            { label: "Process and timeline", href: "#process" },
            { label: "Licensing and insurance", href: "#licensing" },
          ],
        },
        { title: "Getting started", links: [{ label: "Request a quote", href: "#quote" }] },
      ],
      note: "Every change order is priced and signed before the work happens. If a contractor tells you that is unnecessary paperwork, that is the whole answer to the question you were asking.",
      legal: [
        "Brannock Build is a fictional company created to demonstrate this template.",
        "The licence number shown on this page is a placeholder of zeros. On a live site it carries a real CCB registration a client can verify with the state.",
      ],
    },
  ],
});

/** What the demo bar says. Named separately so the preview route stays generic. */
export const demoLabel = { practice: "Brannock Build", templateName: "Framework" };
