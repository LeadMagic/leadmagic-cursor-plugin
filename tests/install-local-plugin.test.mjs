import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { installLocalPlugin } from "../scripts/install-local-plugin.mjs";

function fixture(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "cursor-plugin-"));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const pluginRoot = path.join(dir, "checkout");
  const pluginsDir = path.join(dir, "local");
  fs.mkdirSync(path.join(pluginRoot, ".cursor-plugin"), { recursive: true });
  fs.writeFileSync(path.join(pluginRoot, ".cursor-plugin/plugin.json"), "{}");
  return { pluginRoot, pluginsDir, target: path.join(pluginsDir, "leadmagic") };
}
test("install, repeat install, and uninstall are idempotent", t => {
  const f = fixture(t);
  installLocalPlugin(f);
  assert.equal(fs.readlinkSync(f.target), f.pluginRoot);
  installLocalPlugin(f);
  installLocalPlugin({ ...f, unlink: true });
  installLocalPlugin({ ...f, unlink: true });
  assert.equal(fs.existsSync(f.target), false);
});
test("uninstall does not create directories", t => {
  const f = fixture(t);
  installLocalPlugin({ ...f, unlink: true });
  assert.equal(fs.existsSync(f.pluginsDir), false);
});
test("uninstall can remove this checkout's dangling link", t => {
  const f = fixture(t);
  installLocalPlugin(f);
  fs.rmSync(f.pluginRoot, { recursive: true });
  installLocalPlugin({ ...f, unlink: true });
  assert.deepEqual(fs.readdirSync(f.pluginsDir), []);
});
for (const kind of ["directory", "file", "other-link", "broken-other-link"]) {
  test(`preserves existing ${kind} on install and uninstall`, t => {
    const f = fixture(t);
    fs.mkdirSync(f.pluginsDir);
    if (kind === "directory") fs.mkdirSync(f.target);
    else if (kind === "file") fs.writeFileSync(f.target, "preserve");
    else fs.symlinkSync(kind === "other-link" ? f.pluginsDir : path.join(f.pluginsDir, "missing"), f.target);
    for (const unlink of [false, true]) assert.throws(() => installLocalPlugin({ ...f, unlink }), /Refusing|Another checkout/);
    assert.ok(fs.lstatSync(f.target));
  });
}
test("missing manifest does not create an installation", t => {
  const f = fixture(t);
  fs.rmSync(path.join(f.pluginRoot, ".cursor-plugin"), { recursive: true });
  assert.throws(() => installLocalPlugin(f), /manifest/);
  assert.equal(fs.existsSync(f.pluginsDir), false);
});
test("CLI help works from another directory without installing", t => {
  const f = fixture(t);
  const script = fileURLToPath(new URL("../scripts/install-local-plugin.mjs", import.meta.url));
  const result = spawnSync(process.execPath, [script, "--help"], { cwd: f.pluginRoot, encoding: "utf8" });
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
  const invalid = spawnSync(process.execPath, [script, "--unknown"], { cwd: f.pluginRoot, encoding: "utf8" });
  assert.equal(invalid.status, 1);
});
