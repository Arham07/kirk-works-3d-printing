/**
 * The credibility gate, as a mechanism rather than a comment.
 *
 * The site's argument is that Kirk's work is measurable and that every number
 * on the page is hers. A single invented figure discredits all of them, so an
 * unconfirmed value must never ship silently.
 *
 * Since the placeholders stopped rendering on the page, this report is the
 * ONLY channel that says what is still missing. Nothing is invented either
 * way; the difference is that a customer no longer reads the gaps.
 *
 *   npm run check:tbd             report and exit 0 (the normal dev signal)
 *   npm run check:tbd -- --strict exit 1 if any remain (use before deploying)
 *   npm run check:tbd -- --client a plain-English list to send Kirk
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const CONTENT_DIR = path.resolve(import.meta.dirname, "../src/content");
const strict = process.argv.includes("--strict");
const client = process.argv.includes("--client");

/*
  What each content file is actually asking Kirk for, in her words rather than
  in ours. Keyed by file, because that is the unit she can answer in one go —
  one trip to the machines, one look at a project file, one decision on price.
*/
const ASKS = {
  "src/content/machines.ts":
    "Read off each printer, or copy from its spec sheet: build volume, how many nozzles, how many AMS slots, the layer-height range it will run, and which materials you actually print on it.",
  "src/content/pieces.ts":
    "For each of the six pieces photographed: how many colours, how long it took to print, the layer height, and which filament.",
  "src/content/home.ts":
    "A starting price for each of the four bands; how long each step of the process usually takes; and for the Low N Slow HueForge, the layer count, total thickness, number of filaments, colour swaps and print time.",
  "src/content/business.ts":
    "Opening hours, the service radius you will travel, and anything else the footer currently leaves blank.",
};

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return walk(full);
      return entry.name.endsWith(".ts") ? [full] : [];
    }),
  );
  return files.flat();
}

const files = await walk(CONTENT_DIR);
const findings = [];

for (const file of files) {
  // types.ts defines the sentinel; it is not a usage of one.
  if (path.basename(file) === "types.ts") continue;
  const lines = (await readFile(file, "utf8")).split("\n");
  lines.forEach((line, index) => {
    if (/(^|[^A-Za-z])TBD([^A-Za-z]|$)/.test(line) && !line.trim().startsWith("*")) {
      findings.push({
        file: path.relative(path.resolve(import.meta.dirname, ".."), file),
        line: index + 1,
        text: line.trim().slice(0, 78),
      });
    }
  });
}

if (!findings.length) {
  console.log("check:tbd — no unconfirmed values. Every published number is Kirk's.");
  process.exit(0);
}

const byFile = new Map();
for (const f of findings) byFile.set(f.file, (byFile.get(f.file) ?? 0) + 1);

console.log(`\ncheck:tbd — ${findings.length} unconfirmed values awaiting Kirk:\n`);
for (const [file, count] of [...byFile].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(count).padStart(3)}  ${file}`);
}
if (client) {
  console.log("\nWhat is still needed, grouped by what it takes to answer:\n");
  for (const [file, count] of [...byFile].sort((a, b) => b[1] - a[1])) {
    const ask = ASKS[file];
    if (!ask) continue;
    console.log(`  ${count} value${count === 1 ? "" : "s"}`);
    console.log(`  ${ask}\n`);
  }
  console.log(
    "Nothing on the site shows a guess or a blank in the meantime — each of\n" +
      "these reads as a policy rather than a missing number until it is set.\n",
  );
} else {
  console.log(
    "\nNone of these render on the page any more — they are simply absent, and\n" +
      "this report is the only place they surface. Run with --client for a list\n" +
      "to send Kirk, or --strict before deploying to production.\n",
  );
}

process.exit(strict ? 1 : 0);
