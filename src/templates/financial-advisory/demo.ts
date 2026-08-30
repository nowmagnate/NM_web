import { defineTemplate } from "../kit/schema";
import { theme } from "./theme";

/**
 * COMPASS, as a working practice.
 *
 * WESTERGAARD PLANNING DOES NOT EXIST. Fictional, and labelled as such in a
 * bar above the design that cannot be dismissed.
 *
 * THIS TEMPLATE HAS NO PERFORMANCE FIGURES ANYWHERE, and that is the whole
 * design. Investment returns are the single most regulated claim in this
 * catalog: past performance disclaimers are mandatory in every market it sells
 * into, hypothetical or backtested figures carry strict presentation rules,
 * and a demo showing "8.4% average annual return" would be teaching a buyer to
 * publish something a regulator will make them take down.
 *
 * So the argument is made entirely from STRUCTURE rather than from outcomes:
 * how the adviser is paid, what they are not paid for, what they are legally
 * obliged to do, and what it costs. That is also, not coincidentally, the only
 * honest basis on which anybody should choose an adviser.
 *
 * THE FEE STRUCTURE BAND IS THE HERO OF THE PAGE. It is placed above the
 * credentials rather than below, because a fee-only adviser's competitive
 * position is the fee model, not the letters after their name.
 */

const PHONE = "(206) 555 0138";

export const config = defineTemplate({
  brand: {
    name: "Westergaard Planning",
    mark: "Westergaard",
    tagline: "Fee-only financial planning in Seattle. No commissions, no products sold.",
    contact: {
      phone: PHONE,
      email: "office@westergaardplanning.example",
      address: ["1420 Fifth Avenue, Suite 2200", "Seattle, WA 98101"],
      hours: "Monday to Thursday",
    },
    social: [],
  },

  theme,

  seo: {
    title: "Westergaard Planning",
    description:
      "Fee-only financial planning in Seattle. Flat annual fee, no commissions, no products sold, and a first meeting that costs nothing.",
  },

  settings: {},

  sections: [
    {
      type: "nav",
      links: [
        { label: "Who we help", href: "#who" },
        { label: "Our approach", href: "#approach" },
        { label: "Fees", href: "#fees" },
        { label: "Credentials", href: "#credentials" },
      ],
      phone: PHONE,
    },

    {
      type: "heroField",
      tone: "field",
      // `editorial`. The fourth and last composition in Legal & Financial:
      // Counsel offset, Passage centred, Balance split.
      layout: "editorial",
      ghost: ["Fee-only"],
      eyebrow: "Seattle",
      headline: { lead: "We are paid by you,", main: "and by nobody else." },
      sub: "Fee-only financial planning for households approaching or in retirement. A flat annual fee, published below. No commissions, no products sold, and no third party paying us for your business.",
      actions: [{ label: "Book a first meeting", href: "#meeting", style: "primary" }],
      chips: [],
      subject: {
        src: "/templates/financial-advisory/hero.jpg",
        alt: "An adviser talking with an older couple across a table.",
        width: 1600,
        height: 1068,
      },
      facts: [
        { label: "How we are paid", value: "Flat annual fee, by you" },
        { label: "Commissions", value: "None, from anybody" },
        { label: "First meeting", value: "Ninety minutes, no charge" },
        { label: "Standard", value: "Fiduciary, at all times" },
      ],
    },

    {
      type: "checklist",
      id: "who",
      tone: "surface",
      eyebrow: "Who we help",
      title: "Whether this is for you",
      intro: "Stated at the top rather than discovered after a meeting. We are a good fit for a narrow group and a poor one for everybody else.",
      columns: [
        {
          name: "A good fit",
          items: [
            "Ten years from retirement, or newly in it",
            "Several accounts nobody has looked at together",
            "A pension or equity package you do not fully understand",
            "Recently widowed, divorced, or newly responsible for the money",
            "Wanting a plan rather than a product",
          ],
        },
        {
          name: "Also works well",
          items: [
            "Business owners approaching a sale",
            "Households with one saver and one spender",
            "Adult children helping a parent get organised",
            "Anyone who has been sold something and is unsure why",
          ],
        },
        {
          name: "We are the wrong firm if",
          items: [
            "You want somebody to pick individual stocks",
            "You are looking to beat the market",
            "You want day-to-day trading or market timing",
            "You are looking for the cheapest possible option",
            "Your affairs need a full-time family office",
          ],
        },
      ],
      note: "The third column is the honest one. We are not the cheapest and we are not trying to be exciting. If either of those is what you are shopping for, we will say so in the first ten minutes rather than the ninetieth.",
    },

    {
      type: "feature",
      id: "approach",
      media: "right",
      eyebrow: "Our approach",
      title: "A plan first, and only then a portfolio",
      intro: "Most of the value is in the decisions, not the investments.",
      body: [
        "Almost every household that arrives here has the same problem, and it is not their asset allocation. It is that nobody has ever laid the whole thing out on one page: the accounts, the pension, the mortgage, the tax position, what happens if one of you dies, and when you can actually stop working. The plan is that page, and the first year is mostly spent building it properly.",
        "Investments follow from the plan rather than the other way round, and they are deliberately dull: broadly diversified, low cost, rebalanced on a schedule rather than on a hunch. We do not pick stocks, we do not time markets, and we will not pretend either is where your money comes from.",
        "The recurring work is the review. Twice a year, in person, going through what has changed in your life rather than what has changed in the market. Roughly half of what we do in those meetings is tax and timing, and none of it involves buying anything from us.",
      ],
      facts: [
        { label: "Planning first", value: "Year one is mostly the plan" },
        { label: "Reviews", value: "Twice a year, in person" },
        { label: "Investments", value: "Low cost, diversified, rebalanced" },
        { label: "Products sold", value: "None, ever" },
      ],
      image: {
        src: "/templates/financial-advisory/meeting.jpg",
        alt: "An adviser and a client reviewing documents across a desk.",
        width: 1400,
        height: 933,
      },
    },

    {
      type: "pricing",
      id: "fees",
      eyebrow: "Fee structure",
      title: "Exactly what we are paid",
      intro: "A flat annual fee, in dollars, not a percentage of your assets. Published because the fee model is the most important thing about an adviser and the hardest thing to find out.",
      nameLabel: "Service",
      priceLabel: "Fee",
      rows: [
        {
          name: "First meeting",
          detail: "Ninety minutes. A look at everything you have, and an honest view on whether you need us.",
          price: "No charge",
        },
        {
          name: "Financial plan",
          detail: "One-off. The whole picture on one page, with the decisions and the order to take them in. Yours to keep whether or not you continue.",
          price: "$4,500",
        },
        {
          name: "Ongoing planning and advice",
          detail: "Flat annual fee, billed quarterly. Two reviews a year, unlimited questions between them, and tax coordination with your accountant.",
          price: "$7,200 a year",
        },
        {
          name: "Ongoing, complex households",
          detail: "Business interests, trusts, equity compensation or property in more than one state.",
          price: "From $11,000 a year",
        },
        {
          name: "Hourly advice",
          detail: "For people who want a specific question answered and nothing more.",
          price: "$350 an hour",
        },
      ],
      note: "The fee does not rise because your portfolio does. A percentage-of-assets fee means your adviser is paid more for holding more, which is a poor incentive when the right advice is to pay off a mortgage, delay a pension, or give money away. Third-party custody and fund costs are charged by those providers, are disclosed in full before you commit, and none of them is paid to us.",
      action: { label: "Book a first meeting", href: "#meeting", style: "primary" },
    },

    {
      type: "credits",
      id: "credentials",
      tone: "surface",
      eyebrow: "Credentials",
      title: "What we are, and what we are obliged to do",
      intro: "The four things worth checking about any adviser, and where to check them independently.",
      items: [
        { name: "Registered investment adviser", detail: "Registered with the state securities regulator. The registration number is on our disclosure brochure." },
        { name: "Fiduciary at all times", detail: "Legally obliged to act in your interest, on every recommendation, not only on some of them." },
        { name: "Fee-only", detail: "Compensated solely by client fees. No commissions, referral fees, revenue sharing or third-party payments of any kind." },
        { name: "Certified Financial Planner", detail: "Both advisers hold the certification and complete the required continuing education." },
        { name: "Disclosure brochure", detail: "The regulatory filing describing our fees, conflicts and disciplinary history. Sent before any engagement and available on request at any time." },
        { name: "No disciplinary history", detail: "Verifiable independently through the public regulatory database rather than by taking our word for it." },
      ],
      note: "Every claim in this band is checkable by you, independently, without asking us. That is deliberate: an adviser asking you to trust their credentials rather than verify them is an adviser you should verify. On a live site this band carries the real registration numbers and links to the public database.",
    },

    {
      type: "faq",
      eyebrow: "Questions",
      title: "The ones worth asking any adviser",
      items: [
        {
          q: "How are you paid, exactly?",
          a: "A flat annual fee, paid by you, billed quarterly. We receive nothing from any product provider, custodian, insurer or referral arrangement. Ask every adviser you meet this question and listen for whether the answer contains the word commission.",
        },
        {
          q: "Are you a fiduciary all of the time?",
          a: "Yes, on every recommendation. Some advisers are fiduciaries for part of their advice and salespeople for the rest, which is legal and worth knowing about before you sign anything.",
        },
        {
          q: "Do you hold my money?",
          a: "No. Your accounts are held at an independent custodian in your name. We have authority to advise and to rebalance, and no authority to move money to ourselves.",
        },
        {
          q: "What returns should I expect?",
          a: "We will not answer that, and neither should anybody else. Nobody knows what markets will do. What we will show you at the first meeting is a range of outcomes and what each one would mean for your plan.",
        },
        {
          q: "What if I only want the plan?",
          a: "That is a listed service and a completely reasonable thing to want. You get the plan, it is yours, and there is no obligation to continue.",
        },
        {
          q: "What if I want to leave?",
          a: "Thirty days notice, no exit fee, and we will transfer everything and speak to whoever you move to. Your accounts were never held by us in the first place.",
        },
      ],
    },

    {
      type: "booking",
      id: "meeting",
      tone: "ink",
      ghost: ["Paid by you"],
      eyebrow: "First meeting",
      title: "Book a first meeting",
      intro: "Ninety minutes, no charge and no obligation. Bring whatever statements you have, or none. You will get a straight answer about whether we can help.",
      fields: [
        { name: "name", label: "Your name", type: "text", required: true, half: true },
        { name: "phone", label: "Phone", type: "tel", required: true, half: true },
        { name: "email", label: "Email", type: "email", required: true, half: true },
        {
          name: "stage",
          label: "Where are you",
          type: "select",
          required: true,
          half: true,
          placeholder: "Please choose",
          options: [
            "Ten or more years from retiring",
            "Within ten years of retiring",
            "Recently retired",
            "A specific decision to make",
            "Helping a family member",
          ],
        },
        {
          name: "adviser",
          label: "Do you have an adviser now",
          type: "select",
          half: true,
          placeholder: "Please choose",
          options: ["No", "Yes, and reviewing", "Yes, and leaving", "Not sure what they are"],
        },
        {
          name: "notes",
          label: "What is on your mind",
          type: "textarea",
          placeholder: "The decision you are facing, what you are unsure about, or what prompted you to look.",
        },
      ],
      submitLabel: "Request a first meeting",
      note: "The first meeting is free and nothing is sold in it. Your details are used to arrange it and for nothing else, and you will not be added to any mailing list.",
      aside: {
        title: "Worth bringing",
        items: [
          "Recent statements for anything you hold, if you have them",
          "Any pension or equity compensation paperwork",
          "A rough idea of what you spend in a year",
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
            { label: "Who we help", href: "#who" },
            { label: "Our approach", href: "#approach" },
            { label: "Fee structure", href: "#fees" },
            { label: "Credentials", href: "#credentials" },
          ],
        },
        { title: "Contact", links: [{ label: "Book a first meeting", href: "#meeting" }] },
      ],
      note: "Nothing on this website is personal financial advice or a recommendation to buy or sell any investment. Advice is given only under a written agreement, after we have understood your circumstances. Investments can fall as well as rise and you may get back less than you put in.",
      legal: [
        "Westergaard Planning is a fictional practice created to demonstrate this template.",
        "This template deliberately shows no performance figures anywhere. Past performance does not indicate future results, and presenting hypothetical or backtested returns is tightly regulated in every market this catalog sells into.",
        "On a live site this line carries the adviser registration number and a link to the public regulatory database.",
      ],
    },
  ],
});

/** What the demo bar says. Named separately so the preview route stays generic. */
export const demoLabel = {
  practice: "Westergaard Planning",
  templateName: "Compass",
};
