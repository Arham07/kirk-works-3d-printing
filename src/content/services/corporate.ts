import type { ServicePage } from "./types";

export const corporate = {
  slug: "corporate-3d-printing",
  title: "Corporate & Business 3D Printing — Birmingham, Alabama Area",
  metaDescription:
    "Branded products, awards, prototypes and presentation models printed to order for businesses and organisations around Birmingham and Helena, Alabama.",
  h1: ["Small runs, real", "attention, one contact."],
  eyebrow: "Corporate & custom projects",
  intro: [
    "Large print bureaus are built for volume and configured through a web form. That works well at a thousand units and badly at thirty, where the thing you actually need is somebody who will look at your part and tell you what is wrong with it.",
    "This is the other end of that market. Short runs, prototypes, branded pieces and presentation models, quoted and made by the person you spoke to. If something needs a judgement call mid-run, you get a message about it rather than a box of parts that technically match the file.",
  ],
  covers: [
    {
      name: "Prototypes and proof-of-concept",
      body: "Something a board, a buyer or an investor can pick up and turn over, instead of a render on a slide. Iterations turned around quickly.",
    },
    {
      name: "Branded pieces and awards",
      body: "Recognition awards, desk pieces and giveaways in your colours, produced in the quantity you actually need.",
    },
    {
      name: "Presentation and display models",
      body: "Scale models, cutaways and trade-show pieces built to be handled rather than just looked at.",
    },
    {
      name: "Short production runs",
      body: "Fixtures, jigs, housings and spares in the tens or low hundreds, where injection moulding makes no economic sense.",
    },
  ],
  insight: {
    headline: "What a one-person shop is genuinely better at",
    body:
      "Not volume — a bureau will beat me on a run of five thousand and I will say so. What this setup is better at is the awkward middle: the job where the file is not quite right, the quantity is uneconomic for tooling, the deadline is real, and somebody needs to make a sensible decision without escalating it through three departments. You approve photographs of the actual parts before the balance is due, which is not something a warehouse offers.",
  },
  pieceIds: ["red-bull-wheel", "helmet", "functional-containers"],
  faq: [
    {
      question: "Can you invoice a business and handle a PO?",
      answer:
        "Yes. Send whatever your purchasing process needs and I will work with it.",
    },
    {
      question: "What quantities make sense?",
      answer:
        "Anywhere from one to a few hundred, depending on size. Past that the economics usually favour a bureau or moulding, and I will tell you when you have crossed that line rather than quoting you anyway.",
    },
    {
      question: "Can you sign an NDA?",
      answer:
        "Yes, and prototype work is treated as confidential by default — nothing appears in the portfolio without written permission.",
    },
    {
      question: "How fast can you turn a prototype around?",
      answer:
        "It depends on the queue and the part, and I will give you a real date rather than an optimistic one. If a deadline is genuinely fixed, say so up front and I will tell you honestly whether I can meet it.",
    },
  ],
  ctaLabel: "Discuss a project",
} as const satisfies ServicePage;
