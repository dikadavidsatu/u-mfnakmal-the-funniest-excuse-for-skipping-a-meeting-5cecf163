// The Funniest Excuse for Skipping a Meeting
// make.fun competition: u-mfnakmal-the-funniest-excuse-for-skipping-a-meeting-5cecf163
//
// The task: write a single line, at most 200 characters, that is the funniest
// excuse for skipping a pointless work meeting or Zoom call. An AI judge
// pairs entries head to head and keeps the sharper, more relatable laugh.
// The judge weighs, in order: on-topic funniness, a sharp surprising turn,
// truth to office life, one tight line with no wasted words, and a fresh
// angle rather than a stock excuse about bad wifi, a cat or a dentist.
//
// Brainstormed candidates and why the losers were cut:
//   1. "Sorry, my wifi dropped right before the meeting started."
//      CUT: the judge explicitly demotes stock wifi excuses.
//   2. "My cat walked across my keyboard and declined the invite for me."
//      CUT: stock cat excuse, explicitly penalised; also overused.
//   3. "I have a dentist appointment I forgot to tell anyone about."
//      CUT: stock dentist excuse, explicitly penalised, and not funny.
//   4. "I can't make it — my calendar auto-declined after reading the agenda."
//      CUT: decent, but the joke lands on the calendar, not on the meeting
//      itself; weaker recognition laugh than the winner.
//   5. "Sorry, I have a prior engagement with the mute button."
//      CUT: too cryptic; an excuse that needs explaining has lost the laugh.
//   6. WINNER: "Sorry, I can't join — I'm already stuck in another meeting
//      about whether this meeting should exist, and so far the verdict is no."
//      KEPT: on-topic, instantly relatable (everyone has sat in a meeting
//      that should have been an email), the turn is recursive and surprising
//      (a meeting about the meeting), and it ends on a punchline verdict
//      ("the verdict is no") with no wasted words. 129 characters.
//
// This program holds the chosen line as a constant, validates it against
// the competition gate (1-200 characters counted per code point, exactly one
// line, not only whitespace, no leading/trailing spaces, valid UTF-8), and
// writes it to entry.txt in the directory from MAKEFUN_OUTPUT_DIR, or
// /output when that variable is not set.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EXCUSE =
  "Sorry, I can't join — I'm already stuck in another meeting about " +
  "whether this meeting should exist, and so far the verdict is no.";

// Gate validation, mirroring the sealed scorer exactly:
// entry.txt must be UTF-8 text of 1 to 200 characters, not only whitespace.
function validateExcuse(text: string): void {
  // Count per code point, so an astral character (emoji, etc.) counts as 1.
  const length = [...text].length;
  if (length < 1 || length > 200) {
    throw new Error(`excuse is ${length} characters, must be 1-200`);
  }
  if (text.trim().length === 0) {
    throw new Error("excuse must not be only whitespace");
  }
  if (text !== text.trim()) {
    throw new Error("excuse must not have leading or trailing spaces");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("excuse must be a single line");
  }
  // Round-tripping through UTF-8 must be lossless; a lone surrogate would
  // break it, so reject anything that does not survive the encode/decode.
  if (Buffer.from(text, "utf8").toString("utf8") !== text) {
    throw new Error("excuse is not valid UTF-8 text");
  }
}

function main(): void {
  validateExcuse(EXCUSE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), EXCUSE, "utf8");
  console.log(`Wrote ${[...EXCUSE].length}-character excuse to ${join(outDir, "entry.txt")}`);
}

main();
