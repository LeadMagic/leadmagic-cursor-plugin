import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
for (const scenario of ["extra-server", "credential-header", "command", "wrong-endpoint", "version-mismatch", "marketplace-extra-fields", "portable-publisher", "portable-version", "portable-field", "portable-license", "portable-namespace", "legacy-alias", "missing-publication", "missing-supporting-skill", "missing-schema-license"]) {
  test(`validation rejects ${scenario}`, t => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "cursor-validation-"));
    t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
    for (const entry of fs.readdirSync(root)) {
      if ([".git", "node_modules"].includes(entry)) continue;
      fs.cpSync(path.join(root, entry), path.join(dir, entry), { recursive: true });
    }
    const filename = scenario.startsWith("portable-")
      ? "plugin.json"
      : scenario === "legacy-alias"
        ? ".mcp.json"
        :
      scenario === "version-mismatch"
        ? "package.json"
        : scenario === "marketplace-extra-fields"
          ? ".cursor-plugin/marketplace.json"
          : "mcp.json";
    const file = path.join(dir, filename);
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    if (scenario === "extra-server") data.mcpServers.unexpected = { type: "http", url: "https://example.com/mcp" };
    if (scenario === "credential-header") data.mcpServers.leadmagic.headers = { Authorization: "EXAMPLE_ONLY" };
    if (scenario === "command") data.mcpServers.leadmagic.command = "example-command";
    if (scenario === "wrong-endpoint") data.mcpServers.leadmagic.url = "https://example.com/mcp";
    if (scenario === "version-mismatch") data.version = "0.0.0";
    if (scenario === "marketplace-extra-fields") data.plugins[0].logo = "assets/logo.svg";
    if (scenario === "portable-publisher") data.author.name = "Example Publisher";
    if (scenario === "portable-version") data.version = "0.0.0";
    if (scenario === "portable-field") data.mcpServers = { unexpected: {} };
    if (scenario === "portable-license") data.license = "Apache-2.0";
    if (scenario === "portable-namespace") data.name = "other-plugin";
    if (scenario === "legacy-alias") data.mcpServers.leadmagic.url = "https://example.com/mcp";
    fs.writeFileSync(file, JSON.stringify(data));
    if (scenario === "missing-publication") fs.rmSync(path.join(dir, "PUBLICATION.md"));
    if (scenario === "missing-supporting-skill") fs.rmSync(path.join(dir, "skills/account-intelligence"), { recursive: true });
    if (scenario === "missing-schema-license") fs.rmSync(path.join(dir, "schemas/agent-plugins-LICENSE.txt"));
    const result = spawnSync(process.execPath, [path.join(root, "scripts/validate-plugin.mjs")], { cwd: dir, encoding: "utf8" });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Validation failed:/);
    assert.match(result.stderr, /Only the LeadMagic|only type and url|hosted endpoint|versions must match|must not include logo|official marketplace schema|Agent Plugins|LeadMagic Corporation|repository and license|Cursor namespace|must match mcp.json|must be preserved|skills\/ must match/);
  });
}
