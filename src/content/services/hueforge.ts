import type { ServicePage } from "./types";

export const hueforge = {
  slug: "hueforge-photo-art",
  title: "HueForge Photo Art — Your Photograph, Printed in Layers",
  metaDescription:
    "Turn a photograph into a physical layered artwork in coloured filament. HueForge photo art made to order in Helena, Alabama. Send a photo — no 3D file needed.",
  h1: ["Your photograph,", "printed in layers."],
  eyebrow: "HueForge photo art",
  intro: [
    "A HueForge is not a picture of a thing. It is the thing — a photograph rebuilt as a physical object, printed one thin layer of coloured plastic at a time until the image appears in relief you can run your thumb across.",
    "The colour is the surprising part. Nothing is painted or printed on top. Each filament is slightly translucent, so what you see is light passing down through the stack and back out again, blending the way a painter builds a tone in glazes rather than by mixing pigment.",
    "People usually commission these for the photographs that already matter — a truck someone restored, a dog that is no longer around, a building that meant something. It works best when the picture already has a story attached.",
  ],
  covers: [
    {
      name: "From your photograph",
      body: "Send the picture you already have. Phone photos are fine. I will tell you honestly whether it will work before you commit to anything.",
    },
    {
      name: "Sizing and framing",
      body: "Most pieces land somewhere between a paperback and a small poster. I can print to fit a frame you already own.",
    },
    {
      name: "Colour selection",
      body: "I choose the filament set that reproduces your image best, and show you the plan before it goes on the machine.",
    },
    {
      name: "Gifts and memorials",
      body: "These make unusually good gifts, precisely because nobody can buy one. Allow extra time around holidays.",
    },
  ],
  insight: {
    headline: "Not every photograph makes a good HueForge",
    body:
      "The technique reproduces tone and contrast far better than fine detail. A strong subject against a clean background, with real difference between its light and dark areas, comes out beautifully. A busy group photo taken in flat light usually does not — the detail that makes it recognisable lives in exactly the subtleties the layers cannot hold. Send me the picture and I will tell you which one you have before you spend anything.",
    quote:
      "I would rather talk you out of the wrong photo than take your money and hand you something that disappoints you.",
  },
  pieceIds: ["low-n-slow", "f1-calendar"],
  faq: [
    {
      question: "What resolution does my photo need to be?",
      answer:
        "Less than people expect. A normal phone photo is usually plenty. What matters far more than pixel count is lighting and contrast — a sharp, well-lit picture at modest resolution beats a large, flat, murky one every time.",
    },
    {
      question: "Can you do it from an old or damaged print?",
      answer:
        "Often, yes. Photograph it as squarely as you can in indirect daylight and send that. Old prints with faded contrast sometimes need a conversation first, because fading removes exactly what the technique relies on.",
    },
    {
      question: "How thick is the finished piece?",
      answer:
        "Only a couple of millimetres of actual printed material — which is why people are usually surprised when they pick one up. It is mounted or framed to give it presence.",
    },
    {
      question: "Will the colours fade?",
      answer:
        "Indoors and out of direct sun, they hold up well. Like anything printed in plastic, a piece hung in a window that gets hard afternoon sun will shift over years. Tell me where it is going and I will pick materials accordingly.",
    },
  ],
  ctaLabel: "Send Kirk a photo",
} as const satisfies ServicePage;
