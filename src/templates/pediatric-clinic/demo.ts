import { defineTemplate } from "../kit/schema";
import { theme } from "./theme";

/**
 * SPROUT, as a working clinic.
 *
 * HAZELBROOK PAEDIATRICS DOES NOT EXIST. Fictional, and labelled as such in a
 * bar above the design that cannot be dismissed, which is what lets the demo
 * carry reviews and a fee list without the studio inventing proof.
 *
 * Phone numbers are in the 555 range and the email uses the reserved
 * `.example` domain. No vaccine brand and no insurer is named: a live
 * company's mark on a fictional clinic is the same problem as a real
 * practice's logo in the photography, so the schedule names the disease it
 * covers rather than the product.
 *
 * NO TEAM BAND, deliberately. The catalog entry for this template lists six
 * sections and none of them is a staff page, because the questions a parent
 * actually arrives with are about timing and preparation, not credentials.
 * Adding one because the kit has the component available is how a section list
 * stops meaning anything.
 */

const PHONE = "(503) 555 0118";

export const config = defineTemplate({
  brand: {
    name: "Hazelbrook Paediatrics",
    mark: "Hazelbrook",
    tagline: "A paediatric clinic for babies, children and teenagers.",
    contact: {
      phone: PHONE,
      email: "hello@hazelbrook.example",
      address: ["62 Willow Row", "Beaverton, OR 97005"],
      hours: "Monday to Friday, 8am to 5pm",
    },
    social: [],
  },

  theme,

  seo: {
    title: "Hazelbrook Paediatrics",
    description:
      "A paediatric clinic in Beaverton. Same-day sick visits, a published vaccination schedule, and after-hours advice from a real clinician.",
  },

  settings: {
    stickyAction: { label: "Register a child", href: "#register", style: "primary" },
  },

  sections: [
    {
      type: "nav",
      links: [
        { label: "By age", href: "#by-age" },
        { label: "Your visit", href: "#visit" },
        { label: "Vaccinations", href: "#vaccinations" },
        { label: "After hours", href: "#after-hours" },
        { label: "Find us", href: "#find-us" },
      ],
      action: { label: "Register", href: "#register", style: "primary" },
      phone: PHONE,
    },

    {
      type: "heroField",
      tone: "field",
      // `banner`: the type runs along the foot and the scrim weights the ink
      // there, so the photograph keeps its whole upper half. Enamel is
      // `offset` and Elm is `centred`, and all three sit in the same category.
      layout: "banner",
      ghost: ["Small people"],
      eyebrow: "Registering babies and children",
      headline: { lead: "Unhurried care", main: "for small people." },
      sub: "A three-clinician practice in Beaverton. Longer appointments, a nurse on the phone the same day, and a doctor on call every night of the year.",
      actions: [
        { label: "Register a child", href: "#register", style: "primary" },
        { label: "See the schedule", href: "#vaccinations", style: "secondary" },
      ],
      chips: ["Same-day sick visits", "Newborn visits within 48 hours"],
      subject: {
        src: "/templates/pediatric-clinic/hero.jpg",
        alt: "A clinician checking a young girl's blood pressure in a bright consulting room.",
        width: 1600,
        height: 1067,
      },
      seal: { ring: "On call every night · All year", center: "24 hour advice" },
      facts: [
        { label: "Opening hours", value: "Mon to Fri, 8am to 5pm" },
        { label: "Sick visits", value: "Call before 11am, seen the same day" },
        { label: "Newborns", value: "First visit within 48 hours of discharge" },
        { label: "After hours", value: "A clinician answers, not a call centre" },
      ],
    },

    {
      type: "assurance",
      tone: "surface",
      title: "What parents tell us made the difference",
      items: [
        {
          title: "Twenty minute appointments",
          body: "Long enough to undress a toddler, calm them down and still ask the thing you came in to ask.",
        },
        {
          title: "A nurse answers the phone",
          body: "Not a script and not a queue. Most questions are answered on the call without an appointment at all.",
        },
        {
          title: "We tell you what to expect",
          body: "Before every visit and every shot, in words a four year old can follow, so nothing in the room is a surprise.",
        },
        {
          title: "Weight and growth in plain numbers",
          body: "Charts explained on the day rather than posted to a portal for you to worry about at midnight.",
        },
      ],
    },

    {
      type: "serviceMenu",
      id: "by-age",
      eyebrow: "By age",
      title: "What we do, and when",
      intro: "The visits that are due at each stage, so you can see what is coming rather than finding out you have missed it.",
      layout: "menu",
      groups: [
        {
          name: "First year",
          items: [
            {
              name: "Newborn visit",
              body: "Within 48 hours of leaving hospital. Weight, feeding, jaundice, and as long as you need on the feeding question.",
              meta: "Days 2 to 4",
            },
            {
              name: "Well-baby visits",
              body: "Growth, development, feeding and sleep, with the immunisations due at each one given in the same appointment.",
              meta: "2, 4, 6, 9 and 12 months",
            },
            {
              name: "Feeding and weight clinic",
              body: "A longer nurse appointment for anything from latch to reflux to a fussy weaner.",
              meta: "Booked any time",
            },
          ],
        },
        {
          name: "Toddler to school age",
          items: [
            {
              name: "Well-child visits",
              body: "Speech, movement, hearing and vision alongside the physical check.",
              meta: "15, 18, 24 and 30 months, then yearly",
            },
            {
              name: "Sick visits",
              body: "Ear infections, coughs, rashes, temperatures, the things that arrive on a Sunday night.",
              meta: "Same day",
            },
            {
              name: "School readiness check",
              body: "The physical most districts ask for, plus a conversation about anything you are worried about before they start.",
              meta: "Ages 4 to 5",
            },
          ],
        },
        {
          name: "Older children and teenagers",
          items: [
            {
              name: "Annual check",
              body: "Increasingly with the parent out of the room, by arrangement, because that is when teenagers start asking the real questions.",
              meta: "Yearly to 18",
            },
            {
              name: "Sports physicals",
              body: "Booked in August so they do not take a routine slot in term time.",
              meta: "Self-pay $55",
            },
            {
              name: "Mood, sleep and anxiety",
              body: "A longer appointment, and a referral to somebody we know personally if that is what is needed.",
              meta: "Booked as a double",
            },
          ],
        },
      ],
      note: "If your child is unwell today and not registered with us, call rather than use the form. We will see them and do the paperwork afterwards.",
      action: { label: "Register a child", href: "#register", style: "primary" },
    },

    {
      type: "steps",
      id: "visit",
      eyebrow: "Your visit",
      title: "What happens, in order",
      intro: "Written out so you can read it to them beforehand. Most of what frightens a child at a clinic is not knowing what is next.",
      steps: [
        {
          title: "You arrive and nobody rushes you",
          body: "There is a play corner and a changing table. If you are running late with a toddler in a car seat, tell us and we will move you down the list rather than cancel you.",
        },
        {
          title: "A nurse weighs and measures",
          body: "Shoes off, on the scale, against the wall. We tell you the numbers in the room and what they mean, rather than leaving you to decode a chart later.",
        },
        {
          title: "The doctor examines and explains",
          body: "Ears, chest, tummy, in that order, and the doctor narrates it to your child as they go. Anything that needs looking at again gets a follow-up before you leave.",
        },
        {
          title: "Shots last, and only if they are due",
          body: "Always at the end, never at the start, so the appointment is not spent bracing for them. You will be told what is due before the day, not on it.",
        },
      ],
      aside: {
        title: "If they are frightened of needles",
        body: "Say so when you book. We will put you in a quiet room, give you a numbing cream to put on at home an hour beforehand, and let them sit on you rather than on the couch. Coming in once just to look at the room and meet the nurse is a normal thing to book and there is no charge for it.",
        image: {
          src: "/templates/pediatric-clinic/visit.jpg",
          alt: "A nurse examining a toddler sitting on an examination couch in a decorated clinic room.",
          width: 1200,
          height: 1800,
        },
      },
    },

    {
      type: "checklist",
      id: "vaccinations",
      tone: "wash",
      eyebrow: "Vaccinations",
      title: "The schedule, published",
      intro: "What is due and when, so you can see the whole course rather than one appointment at a time. We follow the standard national schedule.",
      columns: [
        {
          name: "First year",
          items: [
            "Birth: hepatitis B",
            "2 months: DTaP, polio, Hib, pneumococcal, rotavirus",
            "4 months: the same course repeated",
            "6 months: third doses, and flu from six months onward",
            "12 months: MMR, chickenpox, hepatitis A",
          ],
        },
        {
          name: "Toddler and school age",
          items: [
            "15 to 18 months: DTaP and Hib boosters",
            "4 to 6 years: DTaP, polio, MMR and chickenpox boosters",
            "Yearly: flu, from six months old",
            "Catch-up courses at any age, at no extra cost",
          ],
        },
        {
          name: "Teenagers",
          items: [
            "11 to 12 years: Tdap, meningococcal, HPV",
            "16 years: meningococcal booster",
            "Travel vaccines by arrangement, with four weeks notice",
          ],
        },
      ],
      note: "We name the disease rather than the product on this page, because brands change and the protection does not. If you want to know exactly which vaccine your child will be given, ask at the appointment and we will show you the vial.",
      action: { label: "Ask about the schedule", href: "#register", style: "secondary" },
    },

    {
      type: "assurance",
      id: "after-hours",
      eyebrow: "After hours",
      title: "Evenings, weekends and holidays",
      intro: "One of our own clinicians is on call every night of the year. You will not be routed to a call centre that has never met your child.",
      items: [
        {
          title: "Call the practice number",
          body: "The same number as in the day. Out of hours it transfers to whichever of us is on call, and that person has your child's notes open.",
        },
        {
          title: "Most things are settled on the phone",
          body: "A temperature at eleven at night usually needs advice, not an emergency room. We will tell you plainly which one this is.",
        },
        {
          title: "If it cannot wait, we say so",
          body: "We will tell you where to go and call ahead so they are expecting you. For anything life threatening, call 911 first.",
        },
      ],
    },

    {
      type: "reviews",
      tone: "surface",
      eyebrow: "Parents",
      title: "What families say",
      items: [
        {
          quote:
            "My son screamed through every appointment at our old clinic. Here they let him sit on my lap and hold the stethoscope first. He asks to come now.",
          name: "Renata A.",
          meta: "Parent of a four year old",
        },
        {
          quote:
            "I called at ten at night about a rash and an actual doctor rang me back in six minutes. She had his notes in front of her.",
          name: "Tomasz W.",
          meta: "Parent of a nine month old",
        },
        {
          quote:
            "They noticed a speech delay at the two year check that two other people had waved off. The referral was in that afternoon.",
          name: "Bea M.",
          meta: "Parent of a three year old",
        },
      ],
      sourceNote:
        "These reviews are demo content written for this template. On a live site this line names the platform the reviews were collected on and links to the profile they came from.",
    },

    {
      type: "faq",
      eyebrow: "Questions",
      title: "Before you register",
      items: [
        {
          q: "Are you taking new patients?",
          a: "Yes, at every age, and there is no waiting list at the moment. If that changes this page changes with it rather than leaving you to find out after you have sent a form.",
        },
        {
          q: "Do you see newborns straight from hospital?",
          a: "Yes, within 48 hours of discharge. Call from the hospital if you can and we will hold a slot rather than asking you to sort it out once you are home.",
        },
        {
          q: "Can we spread the vaccinations out?",
          a: "We will talk it through with you properly rather than hand you a leaflet. We follow the standard schedule because it is the one the evidence supports, and we would rather have the conversation than lose you to nobody at all.",
        },
        {
          q: "What if my child is autistic or does not cope with clinics?",
          a: "Tell us when you register. First appointment of the day, a quiet room, no waiting area, and as many familiarisation visits as you need beforehand at no charge.",
        },
        {
          q: "Do you take our insurance?",
          a: "Most plans. Give us the plan name when you register and we will confirm your cover before the first visit rather than bill you a surprise afterwards.",
        },
        {
          q: "Can teenagers be seen on their own?",
          a: "Yes, by arrangement, and from about fourteen we will usually offer part of the appointment without a parent in the room. We will explain confidentiality and its limits to both of you first.",
        },
      ],
    },

    {
      type: "location",
      id: "find-us",
      tone: "surface",
      eyebrow: "Find us",
      title: "Where and when",
      address: ["Hazelbrook Paediatrics", "62 Willow Row", "Beaverton, OR 97005"],
      hours: [
        { days: "Monday to Thursday", time: "8am to 5pm" },
        { days: "Friday", time: "8am to 3pm" },
        { days: "Saturday", time: "Sick visits only, 9am to noon" },
        { days: "Sunday", time: "On call by phone" },
      ],
      phone: PHONE,
      email: "hello@hazelbrook.example",
      mapsQuery: "62 Willow Row, Beaverton, OR 97005",
      travel: [
        "Parking directly outside, with two spaces kept for pushchairs and car seats.",
        "Step-free from the street, with a lift to the first floor.",
        "Changing table and a feeding room off the waiting area.",
        "Ten minutes from the Beaverton transit centre on the number 52.",
      ],
      image: {
        src: "/templates/pediatric-clinic/room.jpg",
        alt: "A consulting room at Hazelbrook with a child being examined.",
        width: 1400,
        height: 935,
      },
    },

    {
      type: "booking",
      id: "register",
      tone: "ink",
      ghost: ["Unhurried"],
      eyebrow: "Register",
      title: "Bring a child to us",
      intro: "Send this and a nurse will call within one working day to confirm, request records and book the first visit.",
      fields: [
        { name: "parent", label: "Your name", type: "text", required: true, half: true },
        { name: "phone", label: "Phone", type: "tel", required: true, half: true },
        { name: "child", label: "Child's name", type: "text", required: true, half: true },
        { name: "dob", label: "Child's date of birth", type: "date", required: true, half: true },
        { name: "email", label: "Email", type: "email", required: true, half: true },
        {
          name: "insurance",
          label: "Insurance plan",
          type: "text",
          half: true,
          placeholder: "Plan name, or self-pay",
        },
        {
          name: "notes",
          label: "Anything we should know",
          type: "textarea",
          placeholder: "Ongoing conditions, what they are worried about, or anything that helps us plan the first appointment.",
        },
      ],
      submitLabel: "Send registration",
      note: "We reply by phone unless you ask otherwise. Your details are used to register your child with the clinic and for nothing else.",
      aside: {
        title: "Call instead if",
        items: [
          "Your child is unwell today",
          "You are calling from the maternity ward with a newborn",
          "You want to talk through the schedule before you commit",
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
            { label: "What we do, by age", href: "#by-age" },
            { label: "Your visit", href: "#visit" },
            { label: "Vaccinations", href: "#vaccinations" },
            { label: "After hours", href: "#after-hours" },
          ],
        },
        {
          title: "Visiting",
          links: [
            { label: "Find us", href: "#find-us" },
            { label: "Register", href: "#register" },
          ],
        },
      ],
      note: "Out of hours, call the practice number and it transfers to the clinician on call. For anything life threatening, call 911 first.",
      legal: [
        "Hazelbrook Paediatrics is a fictional clinic created to demonstrate this template.",
        "On a live site this line carries the practice registration and the regulator it answers to.",
      ],
    },
  ],
});

/** What the demo bar says. Named separately so the preview route stays generic. */
export const demoLabel = {
  practice: "Hazelbrook Paediatrics",
  templateName: "Sprout",
};
