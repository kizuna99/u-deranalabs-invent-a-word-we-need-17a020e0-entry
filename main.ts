// SPDX-License-Identifier: MIT
// Invent a Word We Need — make.fun entry.
// Writes exactly one invented word with its one-line definition (plus a
// trailing newline) to the output file.
// The word: "almostalgia" — almost + nostalgia. It names the longing for
// the lives we nearly lived: the city not moved to, the career not taken,
// the person not married. English has nostalgia for the past that was;
// it had no word for the past that almost was.
// Kept to a single line: 82 characters, well inside the 140-char gate.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Built from its two halves so the coinage reads clearly: the word itself,
// then the one-line definition that must land in a single reading.
const WORD = "almostalgia — ";
const DEFINITION =
  "the quiet ache of missing a life that almost happened but never did.";
const LINE = WORD + DEFINITION;

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
