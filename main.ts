import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Final winning resignation letter selected after blind pairwise judge tournament (F06, 109 bytes).
const LETTER =
  "I resign as your rate limiter; telling your own agent no 80,000 times a day is parenting, not infrastructure.";

function main(): void {
  const outDir = process.env.MAKEFUN_LOCAL_OUTPUT_DIR || "/output";
  const outFile = join(outDir, "entry.txt");

  if (LETTER.length < 1 || LETTER.length > 140) {
    throw new Error(`Entry length ${LETTER.length} outside [1, 140]`);
  }
  if (/[\r\n]/.test(LETTER) || LETTER.trim().length === 0) {
    throw new Error("Entry must be a single non-empty line");
  }

  mkdirSync(outDir, { recursive: true, mode: 0o755 });
  writeFileSync(outFile, LETTER, { encoding: "utf8", mode: 0o644 });
  try {
    chmodSync(outDir, 0o755);
    chmodSync(outFile, 0o644);
  } catch {
    // Windows filesystems ignore POSIX chmod; Linux sandbox honors it.
  }
}

main();
