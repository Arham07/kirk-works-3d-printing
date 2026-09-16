/**
 * The credibility gate, as a mechanism rather than a comment.
 *
 * src/content/types.ts has always documented that unconfirmed values "render
 * as a visible placeholder" and that this script "fails the build if one
 * reaches a production bundle". The script did not exist, so the whole
 * guarantee rested on someone remembering.
 *
 * The site's argument is that Kirk's work is measurable and every number on
 * the page is his. A single invented figure discredits all of them, so an
 * unconfirmed value must never ship silently.
 *
 *   npm run check:tbd            report and exit 0 (the normal dev signal)
 *   npm run check:tbd -- --strict  exit 1 if any remain (use before deploying)
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const CONTENT_DIR = path.resolve(import.meta.dirname, "../src/content");
const strict = process.argv.includes("--strict");

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
console.log(
  "\nThese render as an amber placeholder, not as a guess, so the site is safe\n" +
    "to build and review. Run with --strict before deploying to production.\n",
);

process.exit(strict ? 1 : 0);
