#!/usr/bin/env node
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Reviewed official icon from https://leadmagic.io/logo/icon.svg on 2026-09-07.
// A brand change requires reviewing the replacement SVG before updating this pin.
const APPROVED_SHA256 = "a929e011d2ddd74f81a8389627aac25cef2c338d1cfa48df1b849375ee5cce2b";
export function verifyLogo(bytes) {
  if (createHash("sha256").update(bytes).digest("hex") !== APPROVED_SHA256) {
    throw new Error("Logo differs from the reviewed official LeadMagic SVG; inspect the asset before updating its fingerprint.");
  }
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    verifyLogo(fs.readFileSync(new URL("../assets/logo.svg", import.meta.url)));
    console.log("Logo matches the reviewed official LeadMagic icon.");
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
