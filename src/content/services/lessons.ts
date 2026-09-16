import type { ServicePage } from "./types";

export const lessons = {
  slug: "3d-printing-lessons",
  title: "Private 3D Printing Lessons in Helena, Alabama",
  metaDescription:
    "One-on-one 3D printing lessons in Helena, Alabama. Printers, slicing, materials, Bambu Studio and HueForge — taught on real machines by someone who prints for a living.",
  h1: ["Learn it properly,", "on real machines."],
  eyebrow: "Private lessons",
  intro: [
    "There is a particular kind of frustration that comes with a new 3D printer. The first print works, the next four fail, and the internet gives you forty confident answers that contradict each other. Most people who give up were three settings away from it working.",
    "These are one-on-one sessions in the Helena studio, on machines that run every day. We work on your actual questions — or your actual failing print, if you bring it — rather than a curriculum.",
    "People come for different reasons. Some have just bought a printer. Some have had one in a box for a year. Some want to understand HueForge specifically, which is hard to learn from videos because so much of it is judgement.",
  ],
  covers: [
    {
      name: "Getting a machine printing reliably",
      body: "Bed adhesion, first layers, levelling, and what the failure actually means when it goes wrong at 40%.",
    },
    {
      name: "Slicing properly",
      body: "Bambu Studio in depth — orientation, supports, infill, walls, and why the defaults are often the wrong answer for your part.",
    },
    {
      name: "Materials in practice",
      body: "What PLA, PETG, ASA and TPU are genuinely for, how each behaves on the plate, and how to stop guessing.",
    },
    {
      name: "HueForge",
      body: "The one most people cannot self-teach: reading a photograph for tone, planning filament order, and judging what will actually reproduce.",
    },
  ],
  insight: {
    headline: "Why lessons exist alongside the print work",
    body:
      "Teaching forces a kind of honesty that printing for yourself does not. If you cannot explain why a part is oriented the way it is, you do not really know — you have a habit. Sitting with someone who asks 'but why that way?' every ten minutes is the reason the commission work coming off these machines is as considered as it is. The two halves of the business sharpen each other.",
  },
  pieceIds: ["articulated-figure", "functional-containers"],
  faq: [
    {
      question: "Do I need my own printer?",
      answer:
        "No. Plenty of people take a session before buying one, specifically to find out whether they want the hobby or just want the parts. That is a legitimate answer to arrive at, and I will tell you honestly which one you look like.",
    },
    {
      question: "Can I bring my own machine?",
      answer:
        "Yes, and it is often the most useful version of a session — your machine, your problem, solved in front of you. Message me first so I know what you are bringing.",
    },
    {
      question: "Is this suitable for a complete beginner?",
      answer:
        "Yes. Most people who book have never sliced a model. There is no assumed knowledge and no stupid question — the questions beginners ask are usually the ones that matter.",
    },
    {
      question: "Do you teach groups, schools or clubs?",
      answer:
        "Get in touch. Small groups work well for an introduction; anything hands-on is better one-to-one, because the learning happens at the machine.",
    },
  ],
  ctaLabel: "Ask about a session",
} as const satisfies ServicePage;
