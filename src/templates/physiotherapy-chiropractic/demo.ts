import { defineTemplate } from "../kit/schema";
import { theme } from "./theme";

/**
 * FULCRUM, as a working clinic.
 *
 * LODESTONE PHYSIOTHERAPY DOES NOT EXIST. Fictional, and labelled as such in a
 * bar above the design that cannot be dismissed.
 *
 * SET IN THE UK, on purpose. Enamel, Elm and Sprout are all United States
 * practices, and the catalog sells into the US, Canada and Europe. A demo
 * priced in pounds with a UK address and a UK regulator proves the template
 * handles a market where the insurance conversation is completely different,
 * rather than assuming every buyer is American. Numbers are in the Ofcom drama
 * range and the email uses the reserved `.example` domain.
 *
 * TWO PRACTITIONERS, NOT THREE. That is what the photography honestly
 * supported: a third portrait would have had to come from a different shoot
 * with a different background, and a team row assembled out of mismatched
 * studio shots is the exact tell this catalog is trying to avoid. Two named
 * physiotherapists is a completely normal size for a clinic like this.
 */

const PHONE = "0161 496 0142";

export const config = defineTemplate({
  brand: {
    name: "Lodestone Physiotherapy",
    mark: "Lodestone",
    tagline: "Musculoskeletal physiotherapy in Manchester. No referral needed.",
    contact: {
      phone: PHONE,
      email: "hello@lodestonephysio.example",
      address: ["Unit 4, Bramall Works", "Ancoats, Manchester M4 6DE"],
      hours: "Monday to Saturday",
    },
    social: [],
  },

  theme,

  seo: {
    title: "Lodestone Physiotherapy",
    description:
      "Musculoskeletal physiotherapy in Ancoats, Manchester. Find your own symptom, see the fee before you book, and get an appointment this week.",
  },

  settings: {
    stickyAction: { label: "Book an assessment", href: "#book", style: "primary" },
  },

  sections: [
    {
      type: "nav",
      links: [
        { label: "Conditions", href: "#conditions" },
        { label: "How we treat", href: "#approach" },
        { label: "Physiotherapists", href: "#team" },
        { label: "Fees", href: "#fees" },
        { label: "Find us", href: "#visit" },
      ],
      action: { label: "Book", href: "#book", style: "primary" },
      phone: PHONE,
    },

    {
      type: "heroField",
      tone: "field",
      // `split`: the type occupies the right half and the scrim weights the
      // ink there, so the photograph keeps the left. Enamel is offset, Elm
      // centred, Sprout banner, Lumen editorial. Five in one category, five
      // compositions.
      layout: "split",
      ghost: ["Move better"],
      eyebrow: "No referral needed",
      headline: { lead: "Find the cause,", main: "not just the ache." },
      sub: "A musculoskeletal clinic in Ancoats. Sixty minute first assessments, a written plan you take away, and an appointment this week rather than next month.",
      actions: [
        { label: "Book an assessment", href: "#book", style: "primary" },
        { label: "See the fees", href: "#fees", style: "secondary" },
      ],
      chips: ["Self-refer directly", "Saturday appointments"],
      subject: {
        src: "/templates/physiotherapy-chiropractic/hero.jpg",
        alt: "A physiotherapist talking a patient through a shoulder movement in the clinic.",
        width: 1200,
        height: 1800,
      },
      facts: [
        { label: "First assessment", value: "60 minutes, from £68" },
        { label: "Waiting time", value: "Usually within 5 working days" },
        { label: "Saturdays", value: "9am to 1pm, by arrangement" },
        { label: "Getting here", value: "8 minutes from New Islington tram" },
      ],
    },

    {
      type: "assurance",
      tone: "surface",
      title: "How this differs from the last place you tried",
      items: [
        {
          title: "The first appointment is a full hour",
          body: "Long enough to take a history, examine properly and still treat you on the day rather than booking you back to start.",
        },
        {
          title: "You get the plan in writing",
          body: "What we think is wrong, what we are going to do, roughly how many sessions, and what you do between them.",
        },
        {
          title: "We tell you when to stop",
          body: "Nobody here is on a course of ten. If three sessions have done it, we discharge you and say so.",
        },
        {
          title: "We refer on when it is not us",
          body: "Some of what walks in needs a scan or a surgeon. You will be told that on day one, not on session six.",
        },
      ],
    },

    {
      type: "serviceMenu",
      id: "conditions",
      eyebrow: "Conditions",
      title: "Find yours",
      intro: "Most people arrive searching for a symptom rather than a service, so this is arranged the way you would look for it.",
      layout: "menu",
      groups: [
        {
          name: "Back and neck",
          items: [
            {
              name: "Lower back pain",
              body: "Including sciatica, disc-related pain and the back that goes every few months.",
            },
            {
              name: "Neck pain and headaches",
              body: "Desk-related stiffness, wry neck, and headaches that start at the base of the skull.",
            },
            {
              name: "Whiplash and post-collision pain",
              body: "Assessment, treatment, and the report your insurer will ask for.",
            },
          ],
        },
        {
          name: "Shoulder, arm and hand",
          items: [
            {
              name: "Frozen shoulder and impingement",
              body: "The two most commonly confused shoulder problems, treated very differently.",
            },
            {
              name: "Tennis and golfer's elbow",
              body: "Loading programmes rather than rest, which is what the evidence now supports.",
            },
            {
              name: "Wrist, thumb and hand pain",
              body: "Including carpal tunnel, de Quervain's and base-of-thumb arthritis.",
            },
          ],
        },
        {
          name: "Hip, knee, ankle and foot",
          items: [
            {
              name: "Knee pain",
              body: "Runner's knee, cartilage problems, and knees that have been getting worse for years.",
            },
            {
              name: "Hip and groin pain",
              body: "Including impingement, gluteal tendinopathy and post-replacement rehabilitation.",
            },
            {
              name: "Achilles and plantar heel pain",
              body: "The two slowest things we treat, and the two most improved by getting the loading right early.",
            },
          ],
        },
        {
          name: "After an operation",
          items: [
            {
              name: "Post-surgical rehabilitation",
              body: "Knee and hip replacements, shoulder repairs, ligament reconstructions. We work to your surgeon's protocol and write back to them.",
            },
            {
              name: "Return to sport",
              body: "Testing against the other side before you are cleared, rather than clearing you by the calendar.",
            },
          ],
        },
      ],
      note: "If your symptom is not on this list it does not mean we cannot help. Call and describe it, and we will tell you honestly whether this is a physiotherapy problem.",
      action: { label: "Book an assessment", href: "#book", style: "primary" },
    },

    {
      type: "steps",
      id: "approach",
      eyebrow: "How we treat",
      title: "What the first hour looks like",
      intro: "Hands-on treatment and a loading programme, in that order. Neither works as well on its own.",
      steps: [
        {
          title: "History, properly",
          body: "Twenty minutes of questions before anybody touches you. What you do all day, what you have already tried, and what you actually want to get back to.",
        },
        {
          title: "Examination and explanation",
          body: "We test it, then we show you on your own body what is happening and why. If we are not certain, we say we are not certain.",
        },
        {
          title: "Treatment on the day",
          body: "Manual therapy, needling or taping where they help. You are not sent away with a leaflet and a follow-up in a fortnight.",
        },
        {
          title: "A programme you will actually do",
          body: "Three or four exercises, not fifteen. Filmed on your own phone in the room so you can see how they are meant to look.",
        },
      ],
      aside: {
        title: "What we do not do",
        body: "No packages of ten paid up front, no adjustments sold as maintenance, and no promises about discs realigning. If a course of treatment is not making a measurable difference by the third session, we will tell you and either change the approach or send you to somebody better placed. That is not a policy we advertise for effect, it is how the fees below are structured.",
        image: {
          src: "/templates/physiotherapy-chiropractic/approach.jpg",
          alt: "A physiotherapist correcting a patient's position during a floor exercise.",
          width: 1400,
          height: 933,
        },
      },
    },

    {
      type: "people",
      id: "team",
      tone: "surface",
      eyebrow: "Physiotherapists",
      title: "Two of us, and you keep the same one",
      intro: "Your assessment and your rehabilitation are done by the same person, which matters more here than in most clinics because progress is judged by comparison.",
      people: [
        {
          name: "Nadia Brannigan",
          role: "Clinical lead",
          bio: "Nadia opened Lodestone in 2016 after nine years in NHS musculoskeletal outpatients. She takes most of the post-surgical work and all of the complex shoulders.",
          image: {
            src: "/templates/physiotherapy-chiropractic/physio-1.jpg",
            alt: "Portrait of Nadia Brannigan holding kinesiology tape.",
            width: 900,
            height: 1350,
          },
          credentials: [
            "BSc Physiotherapy, University of Manchester",
            "MSc Advanced Musculoskeletal Practice",
            "HCPC registered",
          ],
        },
        {
          name: "Elias Marchetti",
          role: "Physiotherapist",
          bio: "Elias runs the running and lower limb caseload and the return-to-sport testing. He is the one to ask for if your problem only appears at a certain distance or pace.",
          image: {
            src: "/templates/physiotherapy-chiropractic/physio-2.jpg",
            alt: "Portrait of Elias Marchetti in a white clinic coat.",
            width: 900,
            height: 1350,
          },
          credentials: [
            "BSc Physiotherapy, Sheffield Hallam University",
            "Certificate in Sports Rehabilitation",
            "HCPC registered",
          ],
        },
      ],
    },

    {
      type: "pricing",
      id: "fees",
      eyebrow: "Fees",
      title: "What it costs, before you book",
      intro: "Published rather than quoted. There is no package, no minimum course and nothing to pay up front.",
      nameLabel: "Appointment",
      priceLabel: "Fee",
      rows: [
        {
          name: "Initial assessment",
          detail: "Sixty minutes. History, examination, treatment on the day and a written plan.",
          price: "£68",
        },
        {
          name: "Follow-up treatment",
          detail: "Thirty minutes.",
          price: "£46",
        },
        {
          name: "Extended follow-up",
          detail: "Forty-five minutes, for complex or post-surgical cases.",
          price: "£62",
        },
        {
          name: "Return-to-sport testing",
          detail: "Ninety minutes, with a written report for your club or coach.",
          price: "£95",
        },
        {
          name: "Post-collision assessment and report",
          detail: "Assessment plus the medico-legal report your insurer requires.",
          price: "£140",
        },
      ],
      note: "We are recognised by the main UK health insurers. Bring your policy number and authorisation code to the first appointment and we will invoice them directly where your policy allows it. We do not name individual insurers on this page because recognition lists change; call with yours and we will confirm the same day.",
      action: { label: "Ask about your insurer", href: "#book", style: "secondary" },
    },

    {
      type: "reviews",
      eyebrow: "Patients",
      title: "What people say afterwards",
      items: [
        {
          quote:
            "Third physio for the same shoulder. First one who examined my neck as well, which turned out to be where it was actually coming from.",
          name: "Owen D.",
          meta: "Shoulder pain",
        },
        {
          quote:
            "She discharged me after four sessions and told me I did not need to come back. I have never had a clinic turn down money before.",
          name: "Priya S.",
          meta: "Lower back pain",
        },
        {
          quote:
            "Filmed the exercises on my own phone so I could see what they were supposed to look like. Obvious in hindsight, nobody else has done it.",
          name: "Marcus L.",
          meta: "Achilles rehabilitation",
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
          q: "Do I need a referral from my GP?",
          a: "No. You can book directly. If you are claiming on private insurance your policy may require a GP referral, so check with them first rather than with us.",
        },
        {
          q: "How soon can I be seen?",
          a: "Usually within five working days, and often sooner for a cancellation. Say on the form if you are in acute pain and we will put you on the standby list.",
        },
        {
          q: "How many sessions will I need?",
          a: "Most musculoskeletal problems settle in three to six. We give you an estimate at the end of the first appointment and revise it out loud if it turns out to be wrong.",
        },
        {
          q: "Is it going to hurt?",
          a: "Some techniques are uncomfortable while they are happening. Nothing is done without telling you first, and stop means stop with no discussion required.",
        },
        {
          q: "What should I wear?",
          a: "Something you can move in and that lets us see the area. Shorts for anything below the waist. We have a private changing space if you would rather change here.",
        },
        {
          q: "Do you do dry needling and acupuncture?",
          a: "Yes, where it is likely to help, and never as a treatment in its own right. It is included in the appointment fee rather than charged as an extra.",
        },
      ],
    },

    {
      type: "location",
      id: "visit",
      eyebrow: "Find us",
      title: "Where and when",
      address: ["Lodestone Physiotherapy", "Unit 4, Bramall Works", "Ancoats, Manchester M4 6DE"],
      hours: [
        { days: "Monday and Wednesday", time: "7.30am to 7pm" },
        { days: "Tuesday and Thursday", time: "8am to 6pm" },
        { days: "Friday", time: "8am to 4pm" },
        { days: "Saturday", time: "9am to 1pm" },
      ],
      phone: PHONE,
      email: "hello@lodestonephysio.example",
      mapsQuery: "Bramall Works, Ancoats, Manchester M4 6DE",
      travel: [
        "Eight minutes on foot from New Islington tram stop.",
        "Pay and display on Bengal Street, free after 6pm.",
        "Step-free entrance from the courtyard, no stairs anywhere in the clinic.",
        "Secure bike parking inside the building, ask at the door.",
      ],
    },

    {
      type: "booking",
      id: "book",
      tone: "ink",
      ghost: ["This week"],
      eyebrow: "Book",
      title: "Get an assessment",
      intro: "Tell us where it hurts and when suits. We come back the same working day with two or three times to choose from.",
      fields: [
        { name: "name", label: "Your name", type: "text", required: true, half: true },
        { name: "phone", label: "Phone", type: "tel", required: true, half: true },
        { name: "email", label: "Email", type: "email", required: true, half: true },
        {
          name: "area",
          label: "Where is the problem",
          type: "select",
          required: true,
          half: true,
          placeholder: "Please choose",
          options: [
            "Back or neck",
            "Shoulder, arm or hand",
            "Hip, knee, ankle or foot",
            "After an operation",
            "Somewhere else",
          ],
        },
        {
          name: "notes",
          label: "What is going on",
          type: "textarea",
          placeholder: "How long it has been there, what makes it worse, what you have already tried, and whether you are claiming on insurance.",
        },
      ],
      submitLabel: "Request an assessment",
      note: "We reply by phone unless you ask otherwise. Your details are used to arrange the appointment and for nothing else.",
      aside: {
        title: "Call instead if",
        items: [
          "You are in acute pain and want the standby list",
          "You need to check whether your insurer recognises us",
          "You are not sure this is a physiotherapy problem at all",
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
            { label: "Conditions we treat", href: "#conditions" },
            { label: "How we treat", href: "#approach" },
            { label: "Physiotherapists", href: "#team" },
            { label: "Fees", href: "#fees" },
          ],
        },
        {
          title: "Visiting",
          links: [
            { label: "Find us", href: "#visit" },
            { label: "Book", href: "#book" },
          ],
        },
      ],
      note: "If you have sudden severe pain, loss of bladder or bowel control, or numbness around the saddle area, do not wait for an appointment. Go to an emergency department.",
      legal: [
        "Lodestone Physiotherapy is a fictional clinic created to demonstrate this template.",
        "On a live site this line carries the HCPC registration numbers of the practitioners and the clinic's insurer.",
      ],
    },
  ],
});

/** What the demo bar says. Named separately so the preview route stays generic. */
export const demoLabel = {
  practice: "Lodestone Physiotherapy",
  templateName: "Fulcrum",
};
