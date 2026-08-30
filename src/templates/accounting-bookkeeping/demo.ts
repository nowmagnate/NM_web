import { defineTemplate } from "../kit/schema";
import { theme } from "./theme";

/**
 * BALANCE, as a working practice.
 *
 * HARLOW & PIKE DOES NOT EXIST. Fictional, and labelled as such in a bar above
 * the design that cannot be dismissed.
 *
 * SET IN CANADA, which is the second non-US demo in the catalog and is doing
 * a specific job. Accounting is the template where jurisdiction bites hardest:
 * the deadline calendar, the sales tax, the corporate year end and the payroll
 * remittance schedule are all different in every market this catalog sells
 * into. A demo pinned to one real jurisdiction, with dates that are actually
 * that jurisdiction's, is a far better proof that the template survives
 * localisation than a vague one that belongs nowhere.
 *
 * THE KEY DATES BAND CARRIES REAL DEADLINES, and it is the one band in the
 * catalog where invented content would be actively harmful: a business owner
 * who trusts a wrong date on a template gets a penalty. So the dates are the
 * genuine recurring Canadian ones, and the note says plainly that they must be
 * checked against the current year before publication.
 */

const PHONE = "(416) 555 0192";

export const config = defineTemplate({
  brand: {
    name: "Harlow & Pike",
    mark: "Harlow & Pike",
    tagline: "Bookkeeping and year-end accounts for Ontario small businesses.",
    contact: {
      phone: PHONE,
      email: "hello@harlowpike.example",
      address: ["330 Bay Street, Suite 802", "Toronto, ON M5H 2S8"],
      hours: "Monday to Friday, 9am to 5pm",
    },
    social: [],
  },

  theme,

  seo: {
    title: "Harlow & Pike",
    description:
      "Bookkeeping and year-end accounts for Ontario small businesses. Fixed monthly packages, published prices, and a deadline calendar you can actually use.",
  },

  settings: {
    stickyAction: { label: "Get a quote", href: "#quote", style: "primary" },
  },

  sections: [
    {
      type: "nav",
      links: [
        { label: "Services", href: "#services" },
        { label: "Packages", href: "#packages" },
        { label: "Key dates", href: "#dates" },
        { label: "Industries", href: "#industries" },
      ],
      action: { label: "Get a quote", href: "#quote", style: "primary" },
      phone: PHONE,
    },

    {
      type: "heroField",
      tone: "field",
      layout: "split",
      ghost: ["Reconciled"],
      eyebrow: "Toronto",
      headline: { lead: "Books that are", main: "always current." },
      sub: "Monthly bookkeeping, payroll and year-end accounts for Ontario small businesses. Fixed monthly fees published below, and a real person who answers when the CRA writes to you.",
      actions: [
        { label: "Get a quote", href: "#quote", style: "primary" },
        { label: "See the packages", href: "#packages", style: "secondary" },
      ],
      chips: ["Fixed monthly fee", "Cloud or shoebox, both fine"],
      subject: {
        src: "/templates/accounting-bookkeeping/hero.jpg",
        alt: "Lever-arch files and a calculator on a tidy office desk.",
        width: 1200,
        height: 1800,
      },
      facts: [
        { label: "Billing", value: "Fixed monthly, no hourly surprises" },
        { label: "Turnaround", value: "Books closed by the 15th" },
        { label: "Year end", value: "Filed four weeks before the deadline" },
        { label: "CRA letters", value: "Answered by us, included" },
      ],
    },

    {
      type: "assurance",
      tone: "surface",
      title: "Why people move to us",
      items: [
        {
          title: "The number does not move",
          body: "A fixed monthly fee agreed at the start. No hourly billing, no surprise invoice in April, and no charge for phoning to ask a question.",
        },
        {
          title: "Books closed by the fifteenth",
          body: "Every month, not in a rush at year end. You get a two-page summary you can actually read, not a trial balance.",
        },
        {
          title: "We answer the CRA",
          body: "Letters, reviews and audits are handled by us as part of the monthly fee. That is where an accountant earns their keep.",
        },
        {
          title: "Your data stays yours",
          body: "Your accounting file is in your name, not ours. If you ever leave, you take it with you the same week and we help the next firm pick it up.",
        },
      ],
    },

    {
      type: "serviceMenu",
      id: "services",
      eyebrow: "Services",
      title: "What we do",
      layout: "menu",
      groups: [
        {
          name: "Every month",
          items: [
            {
              name: "Bookkeeping and reconciliation",
              body: "Bank, credit card and merchant accounts reconciled to the statement. Closed by the fifteenth of the following month.",
            },
            {
              name: "Payroll",
              body: "Including source deductions, remittances, records of employment and the year-end slips.",
            },
            {
              name: "Sales tax",
              body: "HST prepared and filed on your reporting cycle, with the instalments calculated rather than guessed.",
            },
          ],
        },
        {
          name: "Every year",
          items: [
            {
              name: "Corporate year-end accounts",
              body: "Financial statements and the corporate return, filed four weeks before the deadline rather than four days.",
            },
            {
              name: "Personal returns for owners",
              body: "Included for the owners in the Established and Growing packages, because the two are not separable in a small company.",
            },
            {
              name: "Salary and dividend planning",
              body: "The conversation that actually saves money, held in the autumn when it can still change something.",
            },
          ],
        },
        {
          name: "When you need it",
          items: [
            {
              name: "Catch-up bookkeeping",
              body: "For businesses two or three years behind. It is more common than you think and it is fixable.",
            },
            {
              name: "CRA correspondence and reviews",
              body: "Included in every monthly package rather than billed as a crisis.",
            },
            {
              name: "Incorporation and setup",
              body: "Including registering for the accounts you actually need and not the ones you do not.",
            },
          ],
        },
      ],
      note: "We work in whatever system you already use, and we are equally happy with a cloud ledger or a carrier bag of receipts. Migrating you to something better is a conversation for month three, not month one.",
    },

    {
      type: "pricing",
      id: "packages",
      eyebrow: "Packages",
      title: "Fixed monthly pricing",
      intro: "Published, in Canadian dollars, plus HST. Everything in a package is included, including the phone calls.",
      nameLabel: "Package",
      priceLabel: "Per month",
      rows: [
        {
          name: "Sole trader",
          detail: "Bookkeeping, HST, and the personal return. Up to 75 transactions a month.",
          price: "$260",
        },
        {
          name: "Established",
          detail: "Incorporated. Bookkeeping, HST, payroll to five people, year-end accounts and two personal returns.",
          price: "$620",
        },
        {
          name: "Growing",
          detail: "Everything in Established, payroll to twenty, quarterly management accounts and a planning meeting each autumn.",
          price: "$1,150",
        },
        {
          name: "Catch-up work",
          detail: "One-off, priced per year behind, and always quoted before we start.",
          price: "From $900",
        },
      ],
      note: "Prices are per month excluding HST and are held for twelve months from signing. If your transaction volume outgrows a package we will tell you and move you up, which has happened forty-odd times and has never once been a surprise invoice.",
      action: { label: "Get a quote", href: "#quote", style: "primary" },
    },

    {
      type: "credits",
      id: "dates",
      tone: "wash",
      eyebrow: "Key dates",
      title: "The Ontario small business calendar",
      intro: "The recurring deadlines, in order. Clients get these as calendar invitations rather than as a page they have to remember to read.",
      items: [
        { name: "Source deduction remittance", detail: "Payroll deductions for the previous month, for regular remitters", year: "15th monthly" },
        { name: "T4 and T5 slips", detail: "Issued to employees and shareholders, and filed", year: "28 February" },
        { name: "RRSP contribution deadline", detail: "For the previous tax year", year: "1 March" },
        { name: "Personal tax return", detail: "For individuals who are not self-employed", year: "30 April" },
        { name: "Balance owing on personal tax", detail: "Payable by this date even if the return is filed later", year: "30 April" },
        { name: "Self-employed personal return", detail: "Filing deadline, though any balance was due 30 April", year: "15 June" },
        { name: "Corporate tax balance", detail: "Two months after year end for most small corporations", year: "Year end + 2 months" },
        { name: "Corporate return filing", detail: "Six months after year end", year: "Year end + 6 months" },
      ],
      note: "These are the recurring Canadian federal deadlines and they are given here because a wrong date on an accountant's page costs a client a penalty, which makes this the one band in this catalog where invented content would do real harm. They still must be checked against the current year before this template is published: dates falling on a weekend or a holiday shift, and provincial and industry obligations sit on top of these.",
    },

    {
      type: "checklist",
      id: "industries",
      eyebrow: "Industries",
      title: "Who we work with",
      intro: "Not everybody. A bookkeeper who claims every sector has not seen enough of any of them to spot what is wrong.",
      columns: [
        {
          name: "Most of our clients",
          items: [
            "Trades and construction subcontractors",
            "Restaurants, cafés and small food businesses",
            "Professional services under twenty people",
            "Retail with a physical location",
            "Owner-operated e-commerce",
          ],
        },
        {
          name: "We also handle",
          items: [
            "Rental property owners with several units",
            "Registered charities and small not-for-profits",
            "Consultants incorporating for the first time",
            "Businesses two or three years behind",
          ],
        },
        {
          name: "We would refer you on",
          items: [
            "Anything requiring an audit opinion",
            "Cross-border US filings",
            "Businesses over about fifty staff",
            "Cryptocurrency trading as a primary activity",
          ],
        },
      ],
      note: "The last column is the useful one. We hold licences and insurance for the work we do, and telling you at the first meeting that somebody else should do yours is cheaper for both of us than finding out in March.",
    },

    {
      type: "faq",
      tone: "surface",
      eyebrow: "Questions",
      title: "Before you switch",
      items: [
        {
          q: "How hard is it to change accountants?",
          a: "Easier than people expect. We write to your current firm, they send the file, and you sign one authorisation for the CRA. Most switches take under two weeks and you do almost nothing.",
        },
        {
          q: "We are two years behind. Is that a problem?",
          a: "It is common and it is fixable. We quote catch-up work separately, always before starting, and there is no lecture included in the price.",
        },
        {
          q: "Do you charge for phone calls?",
          a: "No. Hourly billing for questions is what stops clients asking them, and the unasked question is what causes the expensive problem.",
        },
        {
          q: "What if the CRA reviews us?",
          a: "We handle the correspondence as part of the monthly fee. A full audit involving a dispute is quoted separately, and we will tell you at the outset if it is heading that way.",
        },
        {
          q: "Which software do you use?",
          a: "Whichever you already use. If it is genuinely holding you back we will say so around month three, once we can show you what it is costing rather than just assert it.",
        },
      ],
    },

    {
      type: "booking",
      id: "quote",
      tone: "ink",
      ghost: ["Fixed fee"],
      eyebrow: "Quote",
      title: "Get a fixed quote",
      intro: "Tell us the shape of the business and we come back within two working days with a package and a monthly number, not a range.",
      fields: [
        { name: "name", label: "Your name", type: "text", required: true, half: true },
        { name: "business", label: "Business name", type: "text", required: true, half: true },
        { name: "email", label: "Email", type: "email", required: true, half: true },
        { name: "phone", label: "Phone", type: "tel", half: true },
        {
          name: "structure",
          label: "Structure",
          type: "select",
          required: true,
          half: true,
          placeholder: "Please choose",
          options: ["Sole proprietor", "Incorporated", "Partnership", "Not set up yet"],
        },
        {
          name: "payroll",
          label: "How many on payroll",
          type: "text",
          half: true,
          placeholder: "Including yourself, or none",
        },
        {
          name: "notes",
          label: "Anything we should know",
          type: "textarea",
          placeholder: "Your year end, what software you use, how far behind you are, and whether anything is outstanding with the CRA.",
        },
      ],
      submitLabel: "Request a quote",
      note: "We reply within two working days with a package and a monthly figure. Your details are used to prepare the quote and for nothing else.",
      aside: {
        title: "Call instead if",
        items: [
          "You have a deadline in the next fortnight",
          "The CRA has written to you and you are not sure what it says",
          "You are several years behind and would rather explain it out loud",
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
            { label: "Services", href: "#services" },
            { label: "Packages", href: "#packages" },
            { label: "Key dates", href: "#dates" },
            { label: "Industries", href: "#industries" },
          ],
        },
        { title: "Contact", links: [{ label: "Get a quote", href: "#quote" }] },
      ],
      note: "The deadline calendar on this page lists recurring federal dates and is not tax advice. Dates falling on a weekend or holiday shift, and provincial and industry obligations sit on top of them. Check your own circumstances with us before relying on any of it.",
      legal: [
        "Harlow & Pike is a fictional practice created to demonstrate this template.",
        "On a live site this line carries the firm's professional designation, its registration and its professional liability cover.",
      ],
    },
  ],
});

/** What the demo bar says. Named separately so the preview route stays generic. */
export const demoLabel = { practice: "Harlow & Pike", templateName: "Balance" };
