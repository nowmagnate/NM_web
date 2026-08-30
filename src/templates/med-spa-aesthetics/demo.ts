import { defineTemplate } from "../kit/schema";
import { theme } from "./theme";

/**
 * LUMEN, as a working clinic.
 *
 * HALLOWES SKIN DOES NOT EXIST. Fictional, and labelled as such in a bar above
 * the design that cannot be dismissed.
 *
 * THE RESULTS BAND CARRIES NO BEFORE-AND-AFTER PAIRS, for the same reason
 * Tempo's does not: stock photographs cannot honestly be a matched pair of the
 * same person, so building one here would be fabricating exactly the kind of
 * proof this studio does not ship. The band shows the room and the treatment
 * instead, and the note says plainly what a live clinic should put there and
 * what consent it needs first. On an aesthetics site that note is not a
 * disclaimer, it is a selling point: a clinic that explains its photography
 * policy is a clinic that has one.
 *
 * ONE PRACTITIONER, NOT A TEAM. A single-room clinic where the person who does
 * the consultation also does the treatment is a real and strong position in
 * this market, and it is what the photography honestly supported. Padding a
 * team page is how a demo starts lying about the business it is demonstrating.
 *
 * No product, device or brand name appears anywhere. Aesthetics marketing runs
 * on borrowed brand equity, and a fictional clinic borrowing a real one is the
 * same problem as a real practice's logo in the photography.
 */

const PHONE = "020 7946 0188";

export const config = defineTemplate({
  brand: {
    name: "Hallowes Skin",
    mark: "Hallowes",
    tagline: "A one-room aesthetics clinic in Marylebone.",
    contact: {
      phone: PHONE,
      email: "hello@hallowesskin.example",
      address: ["14 Wrenfield Mews", "London W1U 5QP"],
      hours: "Tuesday to Saturday, by appointment",
    },
    social: [{ label: "Instagram", href: "https://instagram.com" }],
  },

  theme,

  seo: {
    title: "Hallowes Skin",
    description:
      "A one-room aesthetics clinic in Marylebone. One practitioner, published prices, and a consultation that will tell you when the answer is to do nothing.",
  },

  settings: {
    stickyAction: { label: "Book a consultation", href: "#book", style: "primary" },
  },

  sections: [
    {
      type: "nav",
      links: [
        { label: "Treatments", href: "#treatments" },
        { label: "The clinic", href: "#clinic" },
        { label: "Practitioner", href: "#practitioner" },
        { label: "Payment", href: "#payment" },
        { label: "Find us", href: "#visit" },
      ],
      action: { label: "Consultation", href: "#book", style: "primary" },
      phone: PHONE,
    },

    {
      type: "heroField",
      tone: "field",
      // `editorial`: the headline splits around the measure and sits high on
      // the photograph, where this composition's scrim is heaviest. The fifth
      // composition, and the last slot in Medical & Dental.
      layout: "editorial",
      ghost: ["Considered"],
      eyebrow: "One room, one practitioner",
      headline: { lead: "Skin treated", main: "slowly." },
      sub: "A single-room clinic in Marylebone. The person who does your consultation does your treatment, prices are on this page, and you will be told when the honest answer is to do nothing at all.",
      actions: [
        { label: "Book a consultation", href: "#book", style: "primary" },
        { label: "See treatments", href: "#treatments", style: "secondary" },
      ],
      chips: ["Consultation before any treatment", "No packages sold on the day"],
      subject: {
        src: "/templates/med-spa-aesthetics/hero.jpg",
        alt: "A practitioner performing a facial treatment in a warmly lit treatment room.",
        width: 1200,
        height: 1800,
      },
      facts: [
        { label: "Consultation", value: "45 minutes, £40, redeemable" },
        { label: "Availability", value: "Usually within two weeks" },
        { label: "Appointments", value: "Tuesday to Saturday, one at a time" },
        { label: "Cooling-off", value: "Two weeks between consult and treatment" },
      ],
    },

    {
      type: "assurance",
      tone: "surface",
      title: "How this clinic is run",
      items: [
        {
          title: "Nothing is sold on the day",
          body: "There is a fortnight between your consultation and any treatment. Aesthetics decisions made in the room, on the spot, are the ones people regret.",
        },
        {
          title: "One practitioner throughout",
          body: "The person who assesses you is the person who treats you and the person you call afterwards if you are worried.",
        },
        {
          title: "Prices are published",
          body: "Per treatment, on this page, including the follow-up. No consultation is needed to find out what something costs.",
        },
        {
          title: "We say no",
          body: "Some of what walks in should not be treated, or not yet, or not here. You will hear that at the consultation and still get the written assessment.",
        },
      ],
    },

    {
      type: "serviceMenu",
      id: "treatments",
      eyebrow: "Treatments",
      title: "What we do",
      intro: "A short list, done often. A clinic offering forty treatments is a clinic that is not especially good at any of them.",
      layout: "menu",
      groups: [
        {
          name: "Skin health",
          items: [
            {
              name: "Medical-grade facial",
              body: "Cleanse, exfoliation, extraction and a treatment mask chosen at the appointment rather than booked in advance.",
              price: "£110",
              meta: "60 minutes",
            },
            {
              name: "Chemical peel",
              body: "Superficial to medium depth. Usually a course of three at four-week intervals, and we will say if one is enough.",
              price: "£145",
              meta: "per treatment",
            },
            {
              name: "Microneedling",
              body: "For texture, scarring and fine lines. Numbing included, and a follow-up at two weeks included in the price.",
              price: "£210",
              meta: "per treatment",
            },
          ],
        },
        {
          name: "Injectables",
          items: [
            {
              name: "Anti-wrinkle treatment, one area",
              body: "Assessed and treated by the same practitioner. Review at two weeks is included and is not optional.",
              price: "£190",
            },
            {
              name: "Anti-wrinkle treatment, three areas",
              body: "The most commonly requested combination. Priced as a whole rather than per unit.",
              price: "£340",
            },
            {
              name: "Dermal filler",
              body: "Consultation and a fortnight's reflection required before booking, without exception.",
              price: "From £320",
              meta: "per syringe",
            },
          ],
        },
        {
          name: "Ongoing",
          items: [
            {
              name: "Skin review",
              body: "Twenty minutes, for existing patients between courses. Photography, comparison and a decision about what happens next.",
              price: "£35",
            },
            {
              name: "Prescription skincare review",
              body: "For patients on a prescribed routine. Includes the adjustment, not just the appointment.",
              price: "£45",
            },
          ],
        },
      ],
      note: "Every price above includes the follow-up appointment. If a treatment needs a second visit to be done properly, that visit is part of the price rather than an upsell.",
      action: { label: "Book a consultation", href: "#book", style: "primary" },
    },

    {
      type: "gallery",
      id: "clinic",
      eyebrow: "The clinic",
      title: "One room, and what happens in it",
      intro: "The treatment room, the equipment and the way an appointment actually runs.",
      layout: "grid",
      items: [
        {
          image: {
            src: "/templates/med-spa-aesthetics/room.jpg",
            alt: "The treatment room at Hallowes, with a magnifying lamp and a covered couch.",
            width: 1400,
            height: 933,
          },
          caption: "The treatment room. One appointment at a time, so nobody passes anybody in the corridor.",
        },
        {
          image: {
            src: "/templates/med-spa-aesthetics/treatment.jpg",
            alt: "A practitioner applying product during a facial treatment.",
            width: 1400,
            height: 933,
          },
          caption: "Every treatment starts with the skin cleansed and assessed under light, including the ones you have had before.",
        },
      ],
      note: "This band carries no before-and-after pairs, deliberately. A live clinic should put its own photography here, taken in fixed lighting at a fixed distance, with written consent recorded separately from the treatment consent. Anything else is unverifiable, and a reader who has seen a hundred aesthetics sites knows it.",
    },

    {
      type: "people",
      id: "practitioner",
      tone: "surface",
      eyebrow: "Practitioner",
      title: "The person who will treat you",
      intro: "There is one. That is the clinic's whole structure rather than a stage it is going to grow out of.",
      people: [
        {
          name: "Iris Hallowes",
          role: "Founder, aesthetic practitioner",
          bio: "Iris trained as a nurse and spent nine years in dermatology before opening this room in 2019. She takes every consultation and performs every treatment, which is why the diary is small and the waiting time is honest.",
          image: {
            src: "/templates/med-spa-aesthetics/practitioner.jpg",
            alt: "Portrait of Iris Hallowes in the clinic.",
            width: 900,
            height: 1348,
          },
          credentials: [
            "Registered Nurse, NMC registered",
            "Level 7 Diploma in Injectables",
            "Nine years in NHS dermatology",
          ],
        },
      ],
    },

    {
      type: "checklist",
      id: "payment",
      tone: "wash",
      eyebrow: "Payment",
      title: "Paying, and what we will not do",
      intro: "Aesthetics finance is where this industry behaves worst. Here is exactly what is on offer and what is not.",
      columns: [
        {
          name: "Ways to pay",
          items: [
            "Card or bank transfer at the appointment",
            "Three monthly instalments, interest free, on anything over £300",
            "Consultation fee deducted from your first treatment",
            "Courses paid per treatment, never up front",
          ],
        },
        {
          name: "Included in every price",
          items: [
            "The follow-up appointment",
            "Any adjustment needed at that follow-up",
            "Aftercare products where a treatment requires them",
            "A written record of exactly what was used",
          ],
        },
        {
          name: "What we do not offer",
          items: [
            "Third-party credit or buy-now-pay-later",
            "Packages bought before a consultation",
            "Discounts for booking on the day",
            "Loyalty schemes that reward more treatment",
          ],
        },
      ],
      note: "The last column is the important one. A clinic that discounts for same-day booking is a clinic optimising against your fortnight of reflection, and this one is built the other way round.",
      action: { label: "Ask about a treatment", href: "#book", style: "secondary" },
    },

    {
      type: "reviews",
      eyebrow: "Patients",
      title: "What people say afterwards",
      items: [
        {
          quote:
            "She talked me out of filler at the consultation and put me on a prescription routine instead. Six months later my skin is better and I have spent a quarter of what I expected.",
          name: "Camille F.",
          meta: "Skin health",
        },
        {
          quote:
            "The two week gap between consultation and treatment annoyed me at the time. By the end of it I had changed my mind about one of the three areas, which is presumably the point.",
          name: "Adeola B.",
          meta: "Injectables",
        },
        {
          quote:
            "Same person every visit, and she answered her own phone when I panicked about swelling on day two. That is worth more than any of the marketing.",
          name: "Ruth M.",
          meta: "Microneedling course",
        },
      ],
      sourceNote:
        "These reviews are demo content written for this template. On a live site this line names the platform the reviews were collected on and links to the profile they came from.",
    },

    {
      type: "faq",
      tone: "surface",
      eyebrow: "Questions",
      title: "Before you book",
      items: [
        {
          q: "Do I have to have a consultation first?",
          a: "For injectables and microneedling, yes, without exception, and there is a fortnight between it and any treatment. Facials and peels can be booked directly.",
        },
        {
          q: "Is the consultation fee wasted if I decide against it?",
          a: "You still get the written assessment and a skincare recommendation you can take anywhere. It is deducted from treatment if you go ahead.",
        },
        {
          q: "Will it be obvious?",
          a: "That is the most common question and the honest answer is that it depends entirely on the dose, which is what the consultation is for. If you want a result nobody notices, say so and it is straightforward to plan for.",
        },
        {
          q: "What if something goes wrong?",
          a: "You call the number on this page and speak to the person who treated you, not a reception line. Complications are managed here, and the review at two weeks exists to catch them early.",
        },
        {
          q: "How old do I have to be?",
          a: "Eighteen for any treatment, and we will decline anyone under twenty-five for filler unless there is a clear clinical reason. That is a policy, not a case-by-case judgement.",
        },
        {
          q: "Do you treat skin of colour?",
          a: "Yes. Peel depths and device settings are chosen for your skin type rather than from a default, and the practitioner spent nine years in a dermatology department seeing every type there is.",
        },
      ],
    },

    {
      type: "location",
      id: "visit",
      eyebrow: "Find us",
      title: "Where and when",
      address: ["Hallowes Skin", "14 Wrenfield Mews", "London W1U 5QP"],
      hours: [
        { days: "Tuesday and Wednesday", time: "10am to 7pm" },
        { days: "Thursday and Friday", time: "9am to 6pm" },
        { days: "Saturday", time: "9am to 2pm" },
        { days: "Sunday and Monday", time: "Closed" },
      ],
      phone: PHONE,
      email: "hello@hallowesskin.example",
      mapsQuery: "Wrenfield Mews, Marylebone, London W1U",
      travel: [
        "Six minutes on foot from Bond Street, eight from Baker Street.",
        "The mews entrance is between the two shopfronts. Ring the bell marked 14.",
        "One appointment at a time, so please arrive at your time rather than early.",
        "Step-free entrance, and the treatment room is on the ground floor.",
      ],
    },

    {
      type: "booking",
      id: "book",
      tone: "ink",
      ghost: ["Take your time"],
      eyebrow: "Consultation",
      title: "Book a consultation",
      intro: "Forty-five minutes, £40, deducted from any treatment you go on to have. Nothing is booked or sold at that appointment.",
      fields: [
        { name: "name", label: "Your name", type: "text", required: true, half: true },
        { name: "phone", label: "Phone", type: "tel", required: true, half: true },
        { name: "email", label: "Email", type: "email", required: true, half: true },
        {
          name: "interest",
          label: "What are you thinking about",
          type: "select",
          required: true,
          half: true,
          placeholder: "Please choose",
          options: [
            "Skin health and texture",
            "Fine lines and wrinkles",
            "Acne or scarring",
            "Pigmentation",
            "Not sure, I want an assessment",
          ],
        },
        {
          name: "notes",
          label: "Anything we should know",
          type: "textarea",
          placeholder: "Previous treatments, medication, allergies, or what you have been told elsewhere.",
        },
      ],
      submitLabel: "Request a consultation",
      note: "We reply by phone or email within one working day. Your details are used to arrange the consultation and are never used for marketing.",
      aside: {
        title: "Worth knowing",
        items: [
          "Injectables need a consultation and a fortnight before treatment",
          "Facials and peels can be booked without one",
          "If you are pregnant or breastfeeding, say so and we will advise honestly",
        ],
        phone: PHONE,
      },
    },

    {
      type: "footer",
      columns: [
        {
          title: "Clinic",
          links: [
            { label: "Treatments", href: "#treatments" },
            { label: "The clinic", href: "#clinic" },
            { label: "Practitioner", href: "#practitioner" },
            { label: "Payment", href: "#payment" },
          ],
        },
        {
          title: "Visiting",
          links: [
            { label: "Find us", href: "#visit" },
            { label: "Book a consultation", href: "#book" },
          ],
        },
      ],
      note: "Aesthetic treatments carry risks and none of them suit everybody. Nothing on this page is a recommendation for you personally, and the consultation exists to establish whether any of it is.",
      legal: [
        "Hallowes Skin is a fictional clinic created to demonstrate this template.",
        "On a live site this line carries the practitioner's professional registration, the prescriber's details and the clinic's insurer.",
      ],
    },
  ],
});

/** What the demo bar says. Named separately so the preview route stays generic. */
export const demoLabel = { practice: "Hallowes Skin", templateName: "Lumen" };
