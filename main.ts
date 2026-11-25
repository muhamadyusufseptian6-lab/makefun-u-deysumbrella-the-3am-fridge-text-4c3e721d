// The 3AM Fridge Text — make.fun bounty u-deysumbrella-the-3am-fridge-text-4c3e721d
//
// Writes one line to $MAKEFUN_OUTPUT_DIR/entry.txt: the text message a smart
// fridge sends its owner at 3am. Deterministic, stdlib-only, no network,
// no input files. The line is a fixed string: the joke is authored, not
// generated, so every run produces the same byte-identical entry.
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// The entry, invented from the judge brief: a fridge with a small voice,
// an opinion, and no shame about sharing it at 3am. Fresh angle — not milk,
// not ice, not a door left open: the fridge counts tonight's visits like a
// machine (4th visit, timestamps logged) and is about to snitch to the
// owner's doctor. 97 characters, one line.
const ENTRY =
  "3am. 4th visit tonight. I've logged them all and emailed your doctor the timestamps. Sleep tight.";

const repoDir = dirname(fileURLToPath(import.meta.url));
void repoDir; // resolved from the script location, never process.cwd()

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
