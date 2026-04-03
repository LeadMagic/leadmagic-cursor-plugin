#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const pluginRoot = process.cwd();
const manifestPath = path.join(pluginRoot, ".cursor-plugin", "plugin.json");
const localPluginsDir = path.join(os.homedir(), ".cursor", "plugins", "local");
const linkPath = path.join(localPluginsDir, "leadmagic");
const unlinkOnly = process.argv.includes("--unlink");

function assert(condition, message) {
	if (!condition) {
		throw new Error(message);
	}
}

function removeExistingTarget(targetPath) {
	if (!fs.existsSync(targetPath)) {
		return;
	}

	const stats = fs.lstatSync(targetPath);
	if (!stats.isSymbolicLink()) {
		throw new Error(
			`Refusing to replace non-symlink target at ${targetPath}. Remove it manually if this is intentional.`,
		);
	}

	fs.unlinkSync(targetPath);
}

try {
	assert(
		fs.existsSync(manifestPath),
		"Run this script from the plugin repository root so .cursor-plugin/plugin.json is available.",
	);

	fs.mkdirSync(localPluginsDir, { recursive: true });
	removeExistingTarget(linkPath);

	if (unlinkOnly) {
		console.log(`Removed local Cursor plugin link at ${linkPath}`);
		process.exit(0);
	}

	fs.symlinkSync(pluginRoot, linkPath, "dir");
	console.log(`Linked plugin to ${linkPath}`);
	console.log("Next step: reload Cursor with 'Developer: Reload Window'.");
	console.log(
		"Important: make sure LEADMAGIC_API_KEY is available to the Cursor process before reloading.",
	);
} catch (error) {
	console.error(error instanceof Error ? error.message : String(error));
	process.exit(1);
}
