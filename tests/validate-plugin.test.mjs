import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
for (const scenario of ["extra-server", "credential-header", "command", "wrong-endpoint", "version-mismatch"]) {
  test(`validation rejects ${scenario}`, t => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "cursor-validation-"));
    t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
    for (const entry of fs.readdirSync(root)) {
      if ([".git", "node_modules"].includes(entry)) continue;
      fs.cpSync(path.join(root, entry), path.join(dir, entry), { recursive: true });
    }
    const filename = scenario === "version-mismatch" ? "package.json" : "mcp.json";
    const file = path.join(dir, filename);
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    if (scenario === "extra-server") data.mcpServers.unexpected = { type: "http", url: "https://example.com/mcp" };
    if (scenario === "credential-header") data.mcpServers.leadmagic.headers = { Authorization: "EXAMPLE_ONLY" };
    if (scenario === "command") data.mcpServers.leadmagic.command = "example-command";
    if (scenario === "wrong-endpoint") data.mcpServers.leadmagic.url = "https://example.com/mcp";
    if (scenario === "version-mismatch") data.version = "0.0.0";
    fs.writeFileSync(file, JSON.stringify(data));
    const result = spawnSync(process.execPath, [path.join(root, "scripts/validate-plugin.mjs")], { cwd: dir, encoding: "utf8" });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Validation failed:/);
    assert.match(result.stderr, /Only the LeadMagic|only type and url|hosted endpoint|versions must match/);
  });
}
