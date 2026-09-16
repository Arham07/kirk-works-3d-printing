import type { FaqItem } from "./types";

/**
 * The twelve questions people actually ask before commissioning a print,
 * converged from print-service FAQ pages and maker communities.
 *
 * Answers deliberately avoid inventing turnaround times or prices — those are
 * Kirk's to set, and they live in the pricing section once she has confirmed
 * them. An answer that says "ask me" is better than a number that is wrong.
 */
export const faq = [
  {
    question: "Do I need a 3D file?",
    answer:
      "No. Most people don't have one. A photo, a sketch, a rough description, or the broken part itself is enough to start — I'll work out what the file needs to be.",
  },
  {
    question: "What if I only have a photo?",
    answer:
      "That's a normal starting point. For photo art, the photograph is literally the input. For a physical part, a photo next to a ruler or a coin for scale tells me most of what I need.",
  },
  {
    question: "Can you copy or repair a part that broke?",
    answer:
      "Often, yes — this is one of the most common requests. Send photos from a few angles with something for scale, and say what the part does and what it attaches to. Load-bearing parts need a conversation about material and print orientation first.",
  },
  {
    question: "How much does it cost?",
    answer:
      "It depends on four things: time on the machine, how much material, how many colors, and whether a printable file already exists or I model it first. Tell me what you want and you'll get a clear number before anything is committed.",
  },
  {
    question: "How long does it take?",
    answer:
      "Print time itself can be anything from an hour to a couple of days of continuous running. The bigger variable is the queue — I'm one person with three printers, so I'll tell you honestly where your job lands before you commit.",
  },
  {
    question: "How big can you print?",
    answer:
      "Bigger than most people expect. Anything larger than the build volume gets printed in sections and bonded, and I'll show you where the seam falls before you approve it.",
  },
  {
    question: "Which material should I choose?",
    answer:
      "You don't have to choose — tell me where the piece is going to live and I'll recommend one. Indoors and detailed is usually PLA. In a car, outdoors, or anywhere hot is ASA. Anything that needs to flex is TPU.",
  },
  {
    question: "Will it survive outdoors, or in a car?",
    answer:
      "Only in the right material. PLA, the default for most printing, softens around 60°C and degrades in sunlight — a PLA part on a dashboard in an Alabama summer will deform. ASA is the one for outdoors and vehicles.",
  },
  {
    question: "How accurate is it?",
    answer:
      "Accurate enough for parts that have to fit other parts, provided we talk about tolerances first. Shrinkage and layer orientation both matter, and for anything that mates with an existing component I'd rather print a test fit than guess.",
  },
  {
    question: "Can you match a specific color?",
    answer:
      "Close, usually. I print from stocked filament rather than mixing custom colors, so it's a matter of picking the nearest match from a large range. If exact color matters, say so early.",
  },
  {
    question: "Who owns the design?",
    answer:
      "Your call, and it changes the price. Design to Print means I design it, print it, and keep the working file. Design to Keep costs more and you receive a print-ready file you can take anywhere.",
  },
  {
    question: "Can you make more of them later?",
    answer:
      "Yes — repeat runs are straightforward once a design exists, and the second batch is cheaper than the first because the design work is already done.",
  },
] as const satisfies readonly FaqItem[];

/**
 * Publishing what she will NOT print reads as expertise rather than limitation,
 * and it pre-filters the leads that would waste her evening.
 */
export const willNotPrint = {
  headline: "What I don't take on",
  items: [
    "Functional firearm components",
    "Copies of someone else's copyrighted or trademarked product for resale",
    "Parts where failure would put someone in danger — load-bearing vehicle, climbing or medical components",
    "Anything that needs a tolerance tighter than FDM printing can honestly hold; I'll say so rather than take the job",
  ],
} as const;
