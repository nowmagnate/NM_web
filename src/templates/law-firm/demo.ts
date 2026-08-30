import { defineTemplate } from "../kit/schema";
import { theme } from "./theme";

/**
 * COUNSEL, as a working firm.
 *
 * ASHGROVE LEGAL DOES NOT EXIST. Fictional, and labelled as such in a bar
 * above the design that cannot be dismissed.
 *
 * THE RESULTS BAND IS THE HARDEST HONESTY PROBLEM IN THE CATALOG, and it is
 * worth being explicit about why. A law firm's results are the single most
 * regulated claim on any page in this catalog: in most jurisdictions past
 * results must not imply future ones, settlement figures may be restricted,
 * and named-client outcomes usually require written consent. A demo that
 * invents "£2.4m settlement" figures teaches the buyer exactly the wrong
 * habit.
 *
 * So the results band here carries OUTCOME TYPES rather than numbers, the note
 * states the regulatory position plainly, and the disclaimer is in the footer
 * where a regulator would expect it. That is a more useful demonstration than
 * an impressive-looking table, because it is the shape a real firm can
 * actually ship.
 */

const PHONE = "020 7946 0459";

export const config = defineTemplate({
  brand: {
    name: "Ashgrove Legal",
    mark: "Ashgrove",
    tagline: "A four-partner firm handling employment, family and private client matters.",
    contact: {
      phone: PHONE,
      email: "enquiries@ashgrovelegal.example",
      address: ["18 Bedford Row", "London WC1R 4EH"],
      hours: "Monday to Friday, 9am to 6pm",
    },
    social: [],
  },

  theme,

  seo: {
    title: "Ashgrove Legal",
    description:
      "A four-partner London firm handling employment, family and private client matters. Fees published, first conversation free, and every enquiry read by a partner.",
  },

  settings: {},

  sections: [
    {
      type: "nav",
      links: [
        { label: "Practice areas", href: "#practice-areas" },
        { label: "The firm", href: "#firm" },
        { label: "Solicitors", href: "#solicitors" },
        { label: "Insights", href: "#insights" },
      ],
      phone: PHONE,
    },

    {
      type: "heroField",
      tone: "field",
      // `offset`. Legal & Financial holds four templates and needs four
      // compositions; Passage takes `centred`, Balance `split`, Compass
      // `editorial`.
      layout: "offset",
      ghost: ["Bedford Row"],
      eyebrow: "London, since 1998",
      headline: { lead: "The first call", main: "costs nothing." },
      sub: "A four-partner firm on Bedford Row handling employment, family and private client matters. Every enquiry is read by a partner, hourly rates are published, and we will tell you when you do not need a solicitor.",
      actions: [{ label: "Make a confidential enquiry", href: "#enquiry", style: "primary" }],
      chips: [],
      subject: {
        src: "/templates/law-firm/hero.jpg",
        alt: "A panelled library with shelves of bound volumes, a leather chesterfield and a green baize table.",
        width: 1600,
        height: 900,
      },
      facts: [
        { label: "Established", value: "1998" },
        { label: "Partners", value: "Four, plus three associates" },
        { label: "First conversation", value: "Thirty minutes, no charge" },
        { label: "Rates", value: "Published, on this page" },
      ],
    },

    {
      type: "assurance",
      tone: "surface",
      title: "What to expect from us",
      items: [
        {
          title: "A partner reads your enquiry",
          body: "Not a form-handling service and not a paralegal triaging by keyword. One of the four of us reads it and decides who should answer.",
        },
        {
          title: "Rates are published",
          body: "Hourly rates and fixed-fee work are both on this page. Nobody should have to sit through a meeting to find out what a solicitor costs.",
        },
        {
          title: "We will say when you do not need us",
          body: "A great many enquiries are answered in one call, at no charge, and that is the end of it. It is not charity, it is how a firm gets recommended.",
        },
        {
          title: "You are told the range early",
          body: "An estimate of total cost, in writing, before you instruct. Revised in writing if the matter changes shape.",
        },
      ],
    },

    {
      type: "serviceMenu",
      id: "practice-areas",
      eyebrow: "Practice areas",
      title: "What we do",
      intro: "Three areas, done properly. A firm this size claiming eleven specialisms is claiming something else.",
      layout: "menu",
      groups: [
        {
          name: "Employment",
          items: [
            {
              name: "Settlement agreements",
              body: "Review, advice and negotiation. Usually completed within a week, and the employer normally contributes to the fee.",
              price: "From £750",
              meta: "fixed fee",
            },
            {
              name: "Unfair and constructive dismissal",
              body: "Advice, tribunal claims and negotiated exits. We will tell you honestly at the outset whether a claim is worth bringing.",
              price: "£320 an hour",
            },
            {
              name: "Discrimination and whistleblowing",
              body: "Including the pre-claim stages, which is where most of these are actually resolved.",
              price: "£320 an hour",
            },
          ],
        },
        {
          name: "Family",
          items: [
            {
              name: "Divorce and separation",
              body: "Including the financial settlement, which is the part that takes the time and matters most.",
              price: "£310 an hour",
            },
            {
              name: "Children arrangements",
              body: "Agreements, court applications, and mediation referrals where that is the better route.",
              price: "£310 an hour",
            },
            {
              name: "Prenuptial and cohabitation agreements",
              body: "Fixed fee, both parties separately advised.",
              price: "From £1,800",
              meta: "fixed fee",
            },
          ],
        },
        {
          name: "Private client",
          items: [
            {
              name: "Wills",
              body: "Single or mirror wills, drafted and executed. Storage included at no charge.",
              price: "From £450",
              meta: "fixed fee",
            },
            {
              name: "Lasting powers of attorney",
              body: "Both types, drafted and registered.",
              price: "From £600",
              meta: "fixed fee",
            },
            {
              name: "Probate and estate administration",
              body: "Priced by the estate rather than as a percentage of it, which is unusual and deliberate.",
              price: "From £2,400",
            },
          ],
        },
      ],
      note: "Hourly rates are exclusive of VAT and disbursements, both of which are itemised on every bill. Fixed-fee work is fixed: if the matter turns out to be more complicated we will tell you before doing the work, not after.",
    },

    {
      type: "feature",
      id: "firm",
      media: "right",
      eyebrow: "The firm",
      title: "Four partners, and no plans to be forty",
      intro: "On Bedford Row since 1998, deliberately the same size for the last decade.",
      body: [
        "A firm of this size can do something a large one structurally cannot: the partner you meet is the partner who does the work. There is no pitch team, no handover to an associate in month two, and no file that nobody has read in six weeks.",
        "It also means we turn work away. Anything requiring specialist counsel we do not have, or a team we cannot field, goes to somebody better placed, and we will make the introduction rather than take the instruction and subcontract it.",
        "Three associates and two paralegals work alongside the partners. Everybody's hourly rate is on this page, including theirs.",
      ],
      facts: [
        { label: "Established", value: "1998" },
        { label: "Partners", value: "Four" },
        { label: "Other fee earners", value: "Three associates, two paralegals" },
        { label: "Regulated by", value: "The relevant national body" },
      ],
      image: {
        src: "/templates/law-firm/firm.jpg",
        alt: "Three solicitors in discussion across a desk in a traditional office.",
        width: 1400,
        height: 933,
      },
    },

    {
      type: "people",
      id: "solicitors",
      tone: "surface",
      eyebrow: "Solicitors",
      title: "Who would handle your matter",
      intro: "Named, with the areas each of us actually practises in rather than the ones the firm advertises.",
      people: [
        {
          name: "Idris Ashgrove",
          role: "Senior partner, employment",
          bio: "Founded the firm in 1998 after eleven years at a City practice. Takes most of the settlement agreements and all of the tribunal advocacy, and is the partner who reads the enquiries that arrive overnight.",
          image: {
            src: "/templates/law-firm/attorney.jpg",
            alt: "Idris Ashgrove working at his desk.",
            width: 1200,
            height: 800,
          },
          credentials: [
            "Admitted 1990",
            "Employment Lawyers Association",
            "Higher rights of audience",
          ],
        },
      ],
    },

    {
      type: "credits",
      id: "results",
      eyebrow: "Results",
      title: "The kinds of outcome we obtain",
      intro: "Described by type rather than by figure, and the reason is in the note below rather than buried in a footer.",
      items: [
        { name: "Negotiated exit before proceedings", detail: "Employment. The most common outcome, and the cheapest for the client." },
        { name: "Settlement agreement improved on the offer made", detail: "Employment. Usually resolved within a week of instruction." },
        { name: "Financial settlement agreed without a final hearing", detail: "Family. Reached through negotiation or mediation." },
        { name: "Children arrangements order by consent", detail: "Family. Agreed between the parties and approved by the court." },
        { name: "Estate administered within the statutory year", detail: "Private client. Including estates with property in more than one jurisdiction." },
      ],
      note: "No figures, no client names and no case studies appear here, and that is deliberate rather than modest. Past results do not indicate future ones, settlement terms are usually confidential, and identifying a client requires their written consent. A firm publishing a table of settlement figures is either doing so with consent it can evidence, or is creating a regulatory problem for itself. This band is the shape a real firm can actually ship.",
    },

    {
      type: "credits",
      id: "insights",
      eyebrow: "Insights",
      title: "Written by the partners",
      items: [
        { name: "What a settlement agreement actually says", detail: "And which three clauses are worth negotiating", year: "August 2026" },
        { name: "Mediation before proceedings, honestly assessed", detail: "When it works, and when it wastes a year", year: "June 2026" },
        { name: "Making a will when you own property abroad", detail: "The question that generates most of our private client calls", year: "April 2026" },
        { name: "Constructive dismissal is harder than you think", detail: "Why we talk more people out of these than into them", year: "February 2026" },
      ],
      note: "These articles are invented for this demo. On a live site this band links to writing the firm has actually published, which is one of the few forms of proof a regulated practice can offer freely.",
    },

    {
      type: "faq",
      eyebrow: "Questions",
      title: "Before you get in touch",
      items: [
        {
          q: "Is the first conversation really free?",
          a: "Thirty minutes, no charge, no obligation. A good proportion of them end with us saying you do not need a solicitor, which is the answer we would want if it were us.",
        },
        {
          q: "What will it cost in total?",
          a: "You get an estimate of the total in writing before you instruct us, and a revised one in writing if the matter changes shape. Hourly rates are on this page so you can do the arithmetic yourself first.",
        },
        {
          q: "Is my enquiry confidential?",
          a: "Yes, from the moment it arrives, whether or not you go on to instruct us. The enquiry form on this page is not connected to any advertising or analytics tool.",
        },
        {
          q: "Do you offer legal aid?",
          a: "No. Where legal aid may be available we will say so and point you to a firm that holds a contract, rather than quietly taking the matter privately.",
        },
        {
          q: "Can you act if the other side has already instructed solicitors?",
          a: "Yes, and it is usually better to have somebody once that has happened. We can also act where you have already started and want to change firms.",
        },
      ],
    },

    {
      type: "booking",
      id: "enquiry",
      tone: "ink",
      ghost: ["In confidence"],
      eyebrow: "Confidential enquiry",
      title: "Tell us what has happened",
      intro: "Read by a partner, usually the same day. Confidential from the moment it arrives, whether or not you go on to instruct us.",
      fields: [
        { name: "name", label: "Your name", type: "text", required: true, half: true },
        { name: "phone", label: "Phone", type: "tel", half: true },
        { name: "email", label: "Email", type: "email", required: true, half: true },
        {
          name: "area",
          label: "What is it about",
          type: "select",
          required: true,
          half: true,
          placeholder: "Please choose",
          options: [
            "Employment",
            "Family",
            "Wills, probate or powers of attorney",
            "Something else",
            "I would rather not say here",
          ],
        },
        {
          name: "urgency",
          label: "Is there a deadline",
          type: "text",
          half: true,
          placeholder: "A tribunal date, an offer expiring, or none",
        },
        {
          name: "conflict",
          label: "Who is the other side",
          type: "text",
          half: true,
          placeholder: "A name, so we can check for a conflict",
        },
        {
          name: "notes",
          label: "What has happened",
          type: "textarea",
          placeholder: "As much or as little as you want to put in writing. You can tell us the rest on the call.",
        },
      ],
      submitLabel: "Send a confidential enquiry",
      note: "We ask for the other side's name only to check for a conflict of interest, which we are required to do before advising you. Nothing you send is used for marketing and this form carries no advertising or analytics tracking.",
      aside: {
        title: "Call instead if",
        items: [
          "There is a deadline this week",
          "You would rather not put it in writing at all",
          "You are not sure whether this is even a legal matter",
        ],
        phone: PHONE,
      },
    },

    {
      type: "footer",
      columns: [
        {
          title: "The firm",
          links: [
            { label: "Practice areas", href: "#practice-areas" },
            { label: "About the firm", href: "#firm" },
            { label: "Solicitors", href: "#solicitors" },
            { label: "Insights", href: "#insights" },
          ],
        },
        { title: "Contact", links: [{ label: "Confidential enquiry", href: "#enquiry" }] },
      ],
      note: "Nothing on this website is legal advice and no solicitor-client relationship arises from reading it or from sending an enquiry. Advice is given only once we have checked for conflicts and you have instructed us in writing.",
      legal: [
        "Ashgrove Legal is a fictional firm created to demonstrate this template.",
        "On a live site this line carries the firm's regulatory authorisation number, its VAT number, and the complaints route to the relevant ombudsman.",
        "Past results do not indicate or guarantee future outcomes in any matter.",
      ],
    },
  ],
});

/** What the demo bar says. Named separately so the preview route stays generic. */
export const demoLabel = { practice: "Ashgrove Legal", templateName: "Counsel" };
