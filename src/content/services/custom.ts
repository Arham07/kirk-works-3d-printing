import type { ServicePage } from "./types";

export const custom = {
  slug: "custom-3d-printing",
  title: "Custom 3D Printing in Helena, Alabama",
  metaDescription:
    "One-off custom 3D printing in Helena, Alabama — replacement parts, personalised gifts, displays and prototypes. No 3D file needed; a photo is enough. Ships nationwide.",
  h1: ["If you can describe it,", "it can probably be made."],
  eyebrow: "Custom 3D printing",
  intro: [
    "Most of what comes through here starts as a photograph and a sentence. A bracket snapped and the part is discontinued. Someone wants a thing that does not exist as a product. A shelf needs a piece that nobody sells in that size.",
    "You do not need a 3D file, and you do not need to know what material it should be. That is the part I do. Tell me what the thing needs to do and where it is going to live, and I will work out the rest before quoting you.",
  ],
  covers: [
    {
      name: "Replacement and repair parts",
      body: "Discontinued clips, knobs, brackets, housings, adapters. Send photos with something for scale — a coin or a ruler in frame tells me most of what I need.",
    },
    {
      name: "Personalised pieces",
      body: "Gifts made for one person, in their colours, with their name or their thing on it. Nobody else can buy it.",
    },
    {
      name: "Displays and stands",
      body: "Holders, plinths, wall mounts and organisers built around the object you actually own rather than an average of everyone's.",
    },
    {
      name: "Printing your own file",
      body: "Already have an STL or 3MF? Send it over. I will flag anything in the geometry that will cause trouble before it goes on the plate.",
    },
  ],
  insight: {
    headline: "The question I ask before anything else",
    body:
      "Where is this going to live, and what has to happen to it? A decorative piece on a shelf and a functional part in a hot car are the same shape and completely different jobs. The second one dictates material, wall thickness, infill and — most importantly — which way up it gets printed, because a printed part is strong along its layers and weak across them. Getting that decision right is most of the work, and it happens before the machine is switched on.",
  },
  pieceIds: ["functional-containers", "articulated-figure", "helmet"],
  faq: [
    {
      question: "I only have the broken part. Is that enough?",
      answer:
        "Usually yes. Photograph it from several angles against a plain background with a ruler or coin for scale, and include a shot of where it fits. If the part is snapped, photograph both halves.",
    },
    {
      question: "Can you make something bigger than the printer?",
      answer:
        "Yes — it gets printed in sections and bonded. I will show you where the seam falls before you approve it, because on some pieces the seam placement matters more than the size.",
    },
    {
      question: "Can you copy a part exactly?",
      answer:
        "I can reproduce shape and fit closely. What I will not do is reproduce someone else's branded, copyrighted product for resale. A replacement for your own broken item is a different matter entirely.",
    },
    {
      question: "Do I get the design file?",
      answer:
        "If you want it. Design to Print keeps the file with me and costs less; Design to Keep hands you a print-ready file you can take anywhere. Decide up front, because it changes the price.",
    },
  ],
  ctaLabel: "Describe your project",
} as const satisfies ServicePage;
