#!/usr/bin/env node
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Reviewed official icon from https://leadmagic.io/logo/icon.svg on 2026-09-15.
// Raster PNG is generated from that SVG at 256×256 (the SVG's declared size).
// A brand change requires reviewing the replacement before updating these pins.
export const APPROVED_SHA256 = {
	svg: "a929e011d2ddd74f81a8389627aac25cef2c338d1cfa48df1b849375ee5cce2b",
	png: "ed6c99d2429afa831063dcbf3785bf59d918b83dba926d89eccbfbd152c20073",
};

export function verifyLogo(bytes) {
	if (createHash("sha256").update(bytes).digest("hex") !== APPROVED_SHA256.svg) {
		throw new Error("Logo differs from the reviewed official LeadMagic SVG; inspect the asset before updating its fingerprint.");
	}
}

export function verifyRasterLogo(bytes) {
	if (createHash("sha256").update(bytes).digest("hex") !== APPROVED_SHA256.png) {
		throw new Error("Raster logo differs from the reviewed 256×256 PNG of the official LeadMagic icon; inspect the asset before updating its fingerprint.");
	}
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
	try {
		verifyLogo(fs.readFileSync(new URL("../assets/logo.svg", import.meta.url)));
		verifyRasterLogo(fs.readFileSync(new URL("../assets/logo.png", import.meta.url)));
		console.log("Logo matches the reviewed official LeadMagic icon (SVG + 256 PNG).");
	} catch (error) {
		console.error(error.message);
		process.exitCode = 1;
	}
}
