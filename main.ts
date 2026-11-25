// Invent a Word We Need — entry program (rebuild round 4).
//
// The whole entry is a single coined word with its one-line definition.
// This program assembles that line from its two parts, checks it against
// the competition gate (UTF-8 text, 1 to 140 characters, not blank), and
// writes it, followed by one trailing newline, to the output file the
// rules name: entry.txt inside /output, or inside $MAKEFUN_OUTPUT_DIR
// when that variable is set (used for local runs).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The coinage and its definition, kept apart so the join is explicit.
const coinedWord = "almostalgia";
const definition = "the quiet ache of missing a life that almost happened but never did.";

// Gate limits from the competition rules.
const MIN_CHARS = 1;
const MAX_CHARS = 140;

function buildLine(): string {
  // An em dash separates the word from its definition, dictionary style.
  return `${coinedWord} — ${definition}`;
}

function checkGate(line: string): void {
  const charCount = [...line].length;
  if (charCount < MIN_CHARS || charCount > MAX_CHARS) {
    throw new Error(
      `gate: line has ${charCount} characters, outside ${MIN_CHARS}-${MAX_CHARS}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("gate: line is only white space");
  }
}

function outputPath(): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  return join(dir, "entry.txt");
}

function main(): void {
  const line = buildLine();
  checkGate(line);

  const target = outputPath();
  const payload = line + "\n";
  mkdirSync(join(target, ".."), { recursive: true });
  writeFileSync(target, payload, "utf8");

  // Round-trip self-check: read the file back and confirm that what
  // landed on disk is exactly the payload we meant to write, then
  // re-run the gate on the on-disk text (minus its trailing newline).
  const onDisk = readFileSync(target, "utf8");
  if (onDisk !== payload) {
    throw new Error("self-check: file content differs from intended payload");
  }
  checkGate(onDisk.replace(/\n$/, ""));

  console.log(`wrote ${[...line].length} chars to ${target}`);
}

main();
