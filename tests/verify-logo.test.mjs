import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { verifyLogo, verifyRasterLogo } from "../scripts/verify-logo.mjs";
const logo = fs.readFileSync(new URL("../assets/logo.svg", import.meta.url));
const png = fs.readFileSync(new URL("../assets/logo.png", import.meta.url));
test("official bundled logo passes", () => assert.doesNotThrow(() => verifyLogo(logo)));
test("official bundled raster logo passes", () => assert.doesNotThrow(() => verifyRasterLogo(png)));
test("rejects a replaced or truncated logo", () => assert.throws(() => verifyLogo(logo.subarray(0, 100)), /differs/));
test("rejects a replaced or truncated raster logo", () => assert.throws(() => verifyRasterLogo(png.subarray(0, 100)), /differs/));
test("rejects added SVG scripts and remote resources", () => {
  for (const addition of ['<script>example()</script>', '<image href="https://example.com/image.svg"/>']) {
    assert.throws(() => verifyLogo(logo.toString().replace('</svg>', `${addition}</svg>`)), /differs/);
  }
});
