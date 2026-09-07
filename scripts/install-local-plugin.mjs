#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Inject paths for isolated tests; the CLI always uses Cursor's local plugin directory.
export function installLocalPlugin({ pluginRoot = scriptRoot,
  pluginsDir = path.join(os.homedir(), ".cursor", "plugins", "local"), unlink = false } = {}) {
  const root = path.resolve(pluginRoot);
  const target = path.join(pluginsDir, "leadmagic");
  let stats;
  try { stats = fs.lstatSync(target); }
  catch (error) { if (error.code !== "ENOENT") throw error; }
  if (stats) {
    if (!stats.isSymbolicLink()) throw new Error(`Refusing to replace non-symlink at ${target}`);
    const linkedRoot = path.resolve(path.dirname(target), fs.readlinkSync(target));
    if (linkedRoot !== root) throw new Error(`Another checkout owns ${target}; remove that link explicitly before switching checkouts.`);
  }
  if (unlink) {
    if (stats) fs.unlinkSync(target);
    return stats ? "Removed local Cursor plugin link." : "No local Cursor plugin link to remove.";
  }
  if (!fs.existsSync(path.join(root, ".cursor-plugin", "plugin.json"))) {
    throw new Error("Plugin manifest is missing from this checkout.");
  }
  if (stats) return "This checkout is already linked to Cursor.";
  fs.mkdirSync(pluginsDir, { recursive: true });
  fs.symlinkSync(root, target, "dir");
  return `Linked plugin to ${target}`;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2);
    if (args.some(arg => !["--unlink", "--help"].includes(arg))) throw new Error("Usage: install-local-plugin.mjs [--unlink | --help]");
    if (args.includes("--help")) {
      console.log("Usage: install-local-plugin.mjs [--unlink | --help]\nLinks this checkout into ~/.cursor/plugins/local/leadmagic. Existing files and other checkouts are preserved.");
    } else {
      console.log(installLocalPlugin({ unlink: args.includes("--unlink") }));
      console.log("Reload Cursor with 'Developer: Reload Window', then check Customize.");
      if (!args.includes("--unlink")) console.log("Complete LeadMagic OAuth when prompted. Local imports must be allowed; a marketplace install with the same name takes precedence.");
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
