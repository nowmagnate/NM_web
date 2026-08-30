import { defineTemplate } from "../kit/schema";
import { theme } from "./theme";

/**
 * PASSAGE, as a working practice.
 *
 * NAVARRO IMMIGRATION LAW DOES NOT EXIST. Fictional, and labelled as such in a
 * bar above the design that cannot be dismissed.
 *
 * THE ELIGIBILITY BAND IS A CHECKLIST, NOT A CALCULATOR, and that is a
 * deliberate refusal. The obvious build for "eligibility check" is an
 * interactive quiz that returns a verdict, and it is the wrong thing to ship.
 * An automated answer about somebody's immigration status is legal advice
 * given by a form that has not seen their documents, cannot ask a follow-up
 * question, and is wrong often enough to ruin a life. What the band does
 * instead is tell the reader which facts decide the question, so they arrive
 * at the consultation with the right documents in hand.
 *
 * Every visa category named below is a real, publicly documented category, but
 * no processing time, fee or success rate is quoted, because those change
 * constantly and a demo that hard-codes them teaches the buyer to publish
 * numbers that will be out of date within a year.
 */

const PHONE = "(312) 555 0164";

export const config = defineTemplate({
  brand: {
    name: "Navarro Immigration Law",
    mark: "Navarro",
    tagline: "Family and employment immigration, Chicago.",
    contact: {
      phone: PHONE,
      email: "office@navarroimmigration.example",
      address: ["55 West Monroe Street, Suite 1420", "Chicago, IL 60603"],
      hours: "Monday to Friday, 9am to 6pm",
    },
    social: [],
  },

  theme,

  seo: {
    title: "Navarro Immigration Law",
    description:
      "Family and employment immigration in Chicago. Flat fees published, consultations in English and Spanish, and an honest answer about whether you need a lawyer at all.",
  },

  settings: {},

  sections: [
    {
      type: "nav",
      links: [
        { label: "Visa types", href: "#visa-types" },
        { label: "Eligibility", href: "#eligibility" },
        { label: "Process", href: "#process" },
        { label: "Fees", href: "#fees" },
      ],
      phone: PHONE,
    },

    {
      type: "heroField",
      tone: "field",
      // `centred`. Counsel holds `offset` in this category, Balance `split`
      // and Compass `editorial`.
      layout: "centred",
      ghost: ["Sin prisa"],
      eyebrow: "Chicago · English and Spanish",
      headline: { lead: "One question", main: "at a time." },
      sub: "Family and employment immigration, handled by the attorney you meet. Flat fees for most matters, published below, and a first conversation that will tell you honestly whether you need a lawyer at all.",
      actions: [{ label: "Request a consultation", href: "#consultation", style: "primary" }],
      chips: [],
      subject: {
        src: "/templates/immigration-attorney/hero.jpg",
        alt: "A woman at a desk reading a passport beside a globe and a set of documents.",
        width: 1600,
        height: 1093,
      },
      facts: [
        { label: "Languages", value: "English and Spanish" },
        { label: "Most matters", value: "Flat fee, agreed in writing" },
        { label: "Consultation", value: "Forty-five minutes, $150" },
        { label: "Who handles it", value: "The attorney you meet" },
      ],
    },

    {
      type: "assurance",
      tone: "surface",
      title: "What we will and will not tell you",
      items: [
        {
          title: "Whether you need a lawyer",
          body: "Some applications are genuinely straightforward and you can file them yourself. We will say so, and say which ones are not.",
        },
        {
          title: "What could go wrong",
          body: "Every route has a risk. You will hear about the ones that apply to you at the consultation rather than after you have paid a filing fee.",
        },
        {
          title: "A flat fee, in writing",
          body: "For most matters, agreed before we start, covering everything through to decision. Government filing fees are separate and always itemised.",
        },
        {
          title: "No promises about outcomes",
          body: "Nobody can guarantee a decision, and any lawyer who does is telling you something important about themselves.",
        },
      ],
    },

    {
      type: "serviceMenu",
      id: "visa-types",
      eyebrow: "Visa types",
      title: "Routes we work on",
      intro: "Arranged the way people actually search: by the situation they are in rather than by the statute.",
      layout: "menu",
      groups: [
        {
          name: "Family",
          items: [
            {
              name: "Marriage to a citizen or permanent resident",
              body: "Adjustment of status if you are already here, consular processing if you are not. The two routes are very different and the choice matters.",
            },
            {
              name: "Petitioning for a parent, child or sibling",
              body: "Including the waiting times, which vary enormously by relationship and country and which you should understand before starting.",
            },
            {
              name: "Fiancé visas",
              body: "The K-1 route, and an honest comparison with marrying abroad and petitioning instead.",
            },
          ],
        },
        {
          name: "Employment",
          items: [
            {
              name: "Specialty occupation visas",
              body: "Including the lottery, the exemptions from it, and what happens if your employer changes.",
            },
            {
              name: "Extraordinary ability and national interest",
              body: "The self-petitioning routes. Demanding evidentially, and worth assessing properly before you commit.",
            },
            {
              name: "Employer-sponsored permanent residence",
              body: "Labour certification through to the final application, working alongside your employer's HR team.",
            },
          ],
        },
        {
          name: "Status and citizenship",
          items: [
            {
              name: "Naturalisation",
              body: "Including the cases where a criminal record or a long absence complicates it, which is where advice is actually worth paying for.",
            },
            {
              name: "Green card renewal and removal of conditions",
              body: "Straightforward when nothing has changed, and not when it has.",
            },
            {
              name: "Responding to a request for evidence",
              body: "Often the point at which people call a lawyer for the first time. Bring the notice and the deadline.",
            },
          ],
        },
      ],
      note: "Processing times and government filing fees change frequently and are not published on this page, because a page that quotes them goes out of date silently. We will give you both, current on the day, at your consultation.",
    },

    {
      type: "checklist",
      id: "eligibility",
      tone: "wash",
      eyebrow: "Eligibility",
      title: "What decides your case",
      intro: "Not a quiz. Nothing on this page can tell you whether you qualify, and any website that offers to is guessing with your life. These are the facts that actually determine the answer, so you can arrive with them.",
      columns: [
        {
          name: "Bring these documents",
          items: [
            "Every passport you hold, including expired ones",
            "Your most recent entry record and any visa stamps",
            "Any notice you have received, with its deadline",
            "Marriage, birth and divorce certificates as relevant",
            "Any prior application, approval or denial",
          ],
        },
        {
          name: "Facts that change everything",
          items: [
            "How you last entered, and whether you were inspected",
            "Whether you have ever overstayed, and for how long",
            "Any arrest or conviction, however minor or old",
            "Any previous removal or voluntary departure",
            "Any prior application you filed yourself",
          ],
        },
        {
          name: "Do not do these first",
          items: [
            "Leave the country before checking whether you can return",
            "File anything to beat a deadline without advice",
            "Sign a form you have not read in a language you read",
            "Pay anybody who is not a licensed attorney for legal advice",
            "Assume an old denial means the answer is still no",
          ],
        },
      ],
      note: "The last column matters most. A great deal of the harm done in immigration matters is self-inflicted in the fortnight before somebody calls a lawyer, usually by trying to fix something quickly.",
    },

    {
      type: "steps",
      id: "process",
      eyebrow: "Process and timelines",
      title: "What actually happens",
      intro: "Written out because the waiting is the hardest part and knowing its shape makes it easier.",
      steps: [
        {
          title: "Consultation",
          body: "Forty-five minutes, $150, credited against the fee if you go ahead. You leave with a written summary of your options, the risks in each, and a flat-fee quote where one is possible.",
        },
        {
          title: "Preparation",
          body: "Usually the longest active stage and the one where you do most of the work: gathering documents, translations, and evidence. We give you a checklist and chase it.",
        },
        {
          title: "Filing",
          body: "We file, we keep the receipts, and you get copies of everything submitted on the day it goes. You should never be unsure what was sent on your behalf.",
        },
        {
          title: "Waiting, and responding",
          body: "Processing times are outside anybody's control. What is inside ours is answering a request for evidence properly and on time, which is the single most common point at which cases are lost.",
        },
      ],
      aside: {
        title: "If you have a deadline this week",
        body: "Call rather than use the form. A notice with a response deadline, a hearing date, or a status expiring within thirty days is treated as urgent and we will find time the same week. Do not let a deadline pass because you were waiting for an email reply, and do not file something incomplete to beat one. An extension is often possible and almost nobody asks for it.",
        image: {
          src: "/templates/immigration-attorney/desk.jpg",
          alt: "A desk with a passport, application paperwork and a globe.",
          width: 1400,
          height: 942,
        },
      },
    },

    {
      type: "pricing",
      id: "fees",
      tone: "surface",
      eyebrow: "Fees",
      title: "What we charge",
      intro: "Flat fees for most matters, published. Immigration is a field where unpublished pricing does particular harm, because the people paying it are least placed to compare.",
      nameLabel: "Matter",
      priceLabel: "Attorney fee",
      rows: [
        {
          name: "Consultation",
          detail: "Forty-five minutes, credited in full against any flat fee.",
          price: "$150",
        },
        {
          name: "Adjustment of status, marriage based",
          detail: "Petition, application and interview preparation.",
          price: "$3,400",
        },
        {
          name: "Consular processing, marriage based",
          detail: "Petition through to the interview abroad.",
          price: "$3,100",
        },
        {
          name: "Naturalisation",
          detail: "Straightforward cases. Complicated histories quoted separately.",
          price: "$1,600",
        },
        {
          name: "Response to a request for evidence",
          detail: "Including where we did not file the original application.",
          price: "From $1,200",
        },
        {
          name: "Employment-based petitions",
          detail: "Quoted individually. The range is wide and depends on the evidence.",
          price: "Quoted",
        },
      ],
      note: "Government filing fees are separate, set by the agency, and itemised on every invoice. Payment plans are available on any flat fee at no extra cost, and asking for one does not change the price.",
      action: { label: "Request a consultation", href: "#consultation", style: "primary" },
    },

    {
      type: "faq",
      eyebrow: "Questions",
      title: "Before you call",
      items: [
        {
          q: "Do I actually need a lawyer?",
          a: "Sometimes not, and we will tell you. If your case is straightforward and your history is clean, we will say which forms you need and send you away. That is a normal outcome of a consultation here.",
        },
        {
          q: "Can you guarantee approval?",
          a: "No, and nobody can. Any attorney or consultant who guarantees an outcome is telling you something important about how they work.",
        },
        {
          q: "Is my information safe?",
          a: "Everything you tell us is confidential from the moment it arrives. This page carries no advertising or analytics tracking of any kind, which on an immigration site is not a technical detail.",
        },
        {
          q: "Do you speak Spanish?",
          a: "Yes. Consultations, calls and written summaries are available in English or Spanish. For other languages we will arrange an interpreter and tell you the cost in advance.",
        },
        {
          q: "What if I filed something myself and it went wrong?",
          a: "Bring everything, including the denial. A prior refusal is not the end of a case and it is a very common reason people call us for the first time.",
        },
      ],
    },

    {
      type: "booking",
      id: "consultation",
      tone: "ink",
      ghost: ["Navarro"],
      eyebrow: "Consultation",
      title: "Request a consultation",
      intro: "Forty-five minutes, $150, credited in full against any flat fee. Tell us as little or as much as you want in writing.",
      fields: [
        { name: "name", label: "Your name", type: "text", required: true, half: true },
        { name: "phone", label: "Phone", type: "tel", required: true, half: true },
        { name: "email", label: "Email", type: "email", required: true, half: true },
        {
          name: "language",
          label: "Preferred language",
          type: "select",
          half: true,
          placeholder: "English",
          options: ["English", "Spanish", "Another language"],
        },
        {
          name: "matter",
          label: "What is it about",
          type: "select",
          required: true,
          half: true,
          placeholder: "Please choose",
          options: [
            "Family based",
            "Employment based",
            "Naturalisation",
            "A notice or deadline I have received",
            "I am not sure",
          ],
        },
        {
          name: "deadline",
          label: "Any deadline",
          type: "text",
          half: true,
          placeholder: "A date, or none that you know of",
        },
        {
          name: "notes",
          label: "Anything you want to tell us",
          type: "textarea",
          placeholder: "You do not have to explain your whole situation here. A sentence is enough to get the right person on the call.",
        },
      ],
      submitLabel: "Request a consultation",
      note: "Confidential from the moment it arrives. Your details are used to arrange the consultation and for nothing else, and this page carries no advertising or analytics tracking.",
      aside: {
        title: "Call instead if",
        items: [
          "You have a deadline within thirty days",
          "You have received a notice you do not understand",
          "You would rather not put anything in writing",
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
            { label: "Visa types", href: "#visa-types" },
            { label: "Eligibility", href: "#eligibility" },
            { label: "Process and timelines", href: "#process" },
            { label: "Fees", href: "#fees" },
          ],
        },
        { title: "Contact", links: [{ label: "Request a consultation", href: "#consultation" }] },
      ],
      note: "Nothing on this website is legal advice and no attorney-client relationship arises from reading it or from sending an enquiry. Processing times and government filing fees are set by the agency and change frequently.",
      legal: [
        "Navarro Immigration Law is a fictional practice created to demonstrate this template.",
        "On a live site this line carries the attorney's bar admission and registration number.",
        "Prior results do not guarantee a similar outcome in any matter.",
      ],
    },
  ],
});

/** What the demo bar says. Named separately so the preview route stays generic. */
export const demoLabel = {
  practice: "Navarro Immigration Law",
  templateName: "Passage",
};
