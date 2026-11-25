// test-entry.mjs — TDD-lite checks for the 3AM Fridge Text entry.
// Run: node test-entry.mjs
// Checks, per the kit gate + judge brief:
//  1. main.ts runs and writes entry.txt to $MAKEFUN_OUTPUT_DIR.
//  2. entry.txt is UTF-8 text, 1-140 characters, not only whitespace.
//  3. Entry is a single line (one text message, lock-screen readable).
//  4. Deterministic: two runs produce byte-identical output.
//  5. main.ts imports only node: builtins (stdlib-only).
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
let failures = 0;
function check(name, ok, extra = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${extra ? " — " + extra : ""}`);
  if (!ok) failures++;
}

function runOnce() {
  const outDir = mkdtempSync(join(tmpdir(), "fridge-out-"));
  const r = spawnSync(process.execPath, [join(dir, "main.ts")], {
    env: { ...process.env, MAKEFUN_OUTPUT_DIR: outDir, MAKEFUN_INPUT_DIR: "/input" },
    encoding: "utf8",
  });
  if (r.status !== 0) {
    return { outDir, error: `exit ${r.status}: ${(r.stderr || "").trim()}` };
  }
  return { outDir, text: readFileSync(join(outDir, "entry.txt"), "utf8") };
}

// 5. stdlib-only imports.
const mainSrc = readFileSync(join(dir, "main.ts"), "utf8");
const imports = [...mainSrc.matchAll(/from\s+["']([^"']+)["']/g)].map((m) => m[1]);
check("stdlib-only imports", imports.every((i) => i.startsWith("node:")), imports.join(", "));

// 1-4. Run twice and compare.
const a = runOnce();
const b = runOnce();
check("main.ts exits 0 (run 1)", !a.error, a.error ?? "");
check("main.ts exits 0 (run 2)", !b.error, b.error ?? "");
if (!a.error && !b.error) {
  const len = [...a.text].length;
  check("entry is 1-140 characters", len >= 1 && len <= 140, `${len} chars`);
  check("entry is not only whitespace", a.text.trim().length > 0);
  check("entry is a single line", !a.text.trim().includes("\n"));
  check("deterministic across runs", a.text === b.text);
  console.log(`ENTRY (${len} chars): ${JSON.stringify(a.text)}`);
}
rmSync(a.outDir, { recursive: true, force: true });
rmSync(b.outDir, { recursive: true, force: true });

if (failures > 0) {
  console.log(`${failures} check(s) failed`);
  process.exit(1);
}
console.log("All checks passed.");
