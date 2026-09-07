#!/usr/bin/env node
import Ajv from "ajv";
import addFormats from "ajv-formats";
import fs from "node:fs";
import path from "node:path";
import { verifyLogo } from "./verify-logo.mjs";
import { validateFrontmatter } from "./validate-frontmatter.mjs";

const root = process.cwd();
const expectedSubmissionLogoUrl =
	"https://raw.githubusercontent.com/LeadMagic/leadmagic-cursor-plugin/main/assets/logo.svg";

function readJson(relPath) {
	return JSON.parse(fs.readFileSync(path.join(root, relPath), "utf8"));
}

function exists(relPath) {
	return fs.existsSync(path.join(root, relPath));
}

function assert(condition, message) {
	if (!condition) throw new Error(message);
}

function formatAjvErrors(errors) {
	if (!errors?.length) {
		return "unknown schema validation error";
	}

	return errors
		.map((error) => {
			if (error.keyword === "additionalProperties") {
				return `${error.instancePath || "/"}: ${error.message} (${error.params.additionalProperty})`;
			}

			return `${error.instancePath || "/"}: ${error.message}`;
		})
		.join("; ");
}

try {
	const pluginSchema = readJson("schemas/plugin.schema.json");
	const ajv = new Ajv({ allErrors: true });
	addFormats(ajv);
	const validatePlugin = ajv.compile(pluginSchema);

	assert(
		exists(".cursor-plugin/plugin.json"),
		"Missing .cursor-plugin/plugin.json",
	);
	const plugin = readJson(".cursor-plugin/plugin.json");
	const pkg = readJson("package.json");
	const lock = readJson("package-lock.json");
	assert(plugin.version === pkg.version && pkg.version === lock.version && pkg.version === lock.packages[""].version, "Plugin, package and lockfile versions must match");
	assert(plugin.logo === "assets/logo.svg", "Plugin must use the bundled LeadMagic logo");
	assert(
		validatePlugin(plugin),
		`plugin.json must satisfy Cursor's official plugin schema: ${formatAjvErrors(validatePlugin.errors)}`,
	);

	assert(
		/^[a-z0-9-]+$/.test(plugin.name),
		"Plugin name must be lowercase kebab-case",
	);
	assert(
		plugin.name === "leadmagic",
		"Plugin name must stay aligned to the LeadMagic namespace",
	);
	assert(
		typeof plugin.description === "string" && plugin.description.length > 0,
		"Plugin description is required",
	);
	assert(
		typeof plugin.version === "string" && plugin.version.length > 0,
		"Plugin version is required",
	);
	assert(
		typeof plugin.logo === "string" && plugin.logo.length > 0,
		"Plugin logo is required",
	);
	assert(
		plugin.mcpServers === "./mcp.json",
		"Plugin must reference mcp.json for hosted MCP configuration",
	);
	assert(
		plugin.skills === "./skills/",
		"Plugin must expose the skills directory with an explicit relative path",
	);
	assert(
		plugin.rules === "./rules/",
		"Plugin must expose the rules directory with an explicit relative path",
	);
	assert(
		plugin.agents === "./agents/",
		"Plugin must expose the agents directory with an explicit relative path",
	);
	assert(
		plugin.commands === "./commands/",
		"Plugin must expose the commands directory with an explicit relative path",
	);
	assert(
		exists("schemas/plugin.schema.json"),
		"Missing vendored Cursor plugin schema at schemas/plugin.schema.json",
	);
	assert(exists(plugin.logo), `Missing logo file: ${plugin.logo}`);
	assert(!fs.lstatSync(path.join(root, plugin.logo)).isSymbolicLink(), "Logo must be a committed file, not a symlink");
	verifyLogo(fs.readFileSync(path.join(root, plugin.logo)));

	assert(
		!exists(".cursor-plugin/marketplace.json"),
		"Single-plugin repositories should not include .cursor-plugin/marketplace.json; reserve it for multi-plugin marketplace repos.",
	);

	assert(
		exists("SECURITY.md"),
		"Missing SECURITY.md (vulnerability disclosure and hardening)",
	);
	assert(exists("LICENSE"), "Missing LICENSE");
	assert(
		exists(".node-version"),
		"Missing .node-version (CI / local Node alignment)",
	);

	assert(exists("mcp.json"), "Missing mcp.json");
	const mcp = readJson("mcp.json");
	assert(JSON.stringify(Object.keys(mcp)) === '["mcpServers"]', "Unexpected MCP configuration fields");
	assert(mcp.mcpServers && JSON.stringify(Object.keys(mcp.mcpServers)) === '["leadmagic"]', "Only the LeadMagic server may be bundled");
	assert(mcp.mcpServers.leadmagic && Object.keys(mcp.mcpServers.leadmagic).sort().join(",") === "type,url", "Hosted MCP config must contain only type and url; no credentials or commands");
	assert(
		typeof mcp.mcpServers === "object" &&
			Object.keys(mcp.mcpServers).length > 0,
		"mcp.json must include mcpServers",
	);
	assert(
		typeof mcp.mcpServers.leadmagic === "object",
		"mcp.json must define the leadmagic server",
	);
	assert(
		mcp.mcpServers.leadmagic.type === "http",
		"leadmagic MCP server must declare HTTP transport explicitly",
	);
	assert(
		mcp.mcpServers.leadmagic.url === "https://mcp.leadmagic.io/mcp",
		"leadmagic MCP URL must point to the hosted endpoint",
	);
	const lmServer = mcp.mcpServers.leadmagic;
	const headerKeys =
		lmServer.headers && typeof lmServer.headers === "object"
			? Object.keys(lmServer.headers)
			: [];
	assert(
		headerKeys.length === 0,
		"leadmagic MCP default must omit headers so Cursor uses OAuth sign-in with LeadMagic",
	);

	const skillsRoot = path.join(root, "skills");
	assert(fs.existsSync(skillsRoot), "Missing skills directory");
	for (const entry of fs.readdirSync(skillsRoot, { withFileTypes: true })) {
		if (!entry.isDirectory()) continue;
		const skillPath = path.join(skillsRoot, entry.name, "SKILL.md");
		assert(
			fs.existsSync(skillPath),
			`Missing ${path.relative(root, skillPath)}`,
		);
		validateFrontmatter(fs.readFileSync(skillPath, "utf8"), {
			label: path.relative(root, skillPath), kind: "skill", expectedName: entry.name,
		});
	}

	const rulesRoot = path.join(root, "rules");
	assert(fs.existsSync(rulesRoot), "Missing rules directory");
	for (const name of fs.readdirSync(rulesRoot)) {
		const file = path.join(rulesRoot, name);
		if (fs.statSync(file).isDirectory()) continue;
		validateFrontmatter(fs.readFileSync(file, "utf8"), {
			label: path.relative(root, file), kind: "rule",
		});
	}

	function assertMarkdownBundle(dirName, label) {
		const dir = path.join(root, dirName);
		assert(fs.existsSync(dir), `Missing ${dirName} directory`);
		const mdFiles = fs
			.readdirSync(dir)
			.filter((n) => n.endsWith(".md"))
			.map((n) => path.join(dir, n));
		assert(mdFiles.length > 0, `${dirName} must include at least one .md file`);
		for (const file of mdFiles) {
			validateFrontmatter(fs.readFileSync(file, "utf8"), {
				label: path.relative(root, file), kind: label, expectedName: path.basename(file, ".md"),
			});
		}
	}

	assertMarkdownBundle("agents", "agent");
	assertMarkdownBundle("commands", "command");

	const readmePath = path.join(root, "README.md");
	assert(fs.existsSync(readmePath), "Missing README.md");
	const readme = fs.readFileSync(readmePath, "utf8");
	for (const expectedText of [
		"https://mcp.leadmagic.io/mcp",
		"https://github.com/LeadMagic/leadmagic-openapi",
		"https://cursor.com/docs/plugins",
		"[SECURITY.md](SECURITY.md)",
		"leadmagic://docs",
		"LeadMagic MCP Tools",
		"OAuth",
		"[LICENSE](LICENSE)",
	]) {
		assert(
			readme.includes(expectedText),
			`README.md must mention ${expectedText}`,
		);
	}

	const submissionPath = path.join(root, "SUBMISSION.md");
	assert(fs.existsSync(submissionPath), "Missing SUBMISSION.md");
	const submission = fs.readFileSync(submissionPath, "utf8");
	assert(
		submission.includes("https://github.com/LeadMagic/leadmagic-cursor-plugin"),
		"SUBMISSION.md must include the GitHub repository",
	);
	assert(
		submission.includes("Official LeadMagic plugin for Cursor."),
		"SUBMISSION.md must keep the primary marketplace description",
	);
	assert(
		submission.includes("hosted MCP surface"),
		"SUBMISSION.md description must mention the hosted MCP surface",
	);
	assert(
		submission.includes(expectedSubmissionLogoUrl),
		"SUBMISSION.md must use the repo-hosted canonical logo URL",
	);
	assert(
		plugin.repository ===
			"https://github.com/LeadMagic/leadmagic-cursor-plugin",
		"plugin.json repository must match the public GitHub repo",
	);
	assert(
		plugin.homepage === "https://leadmagic.io",
		"plugin.json homepage must match the LeadMagic site",
	);
	assert(
		plugin.author?.name === "LeadMagic",
		"plugin.json author name must stay aligned",
	);
	assert(
		plugin.description.includes("Official LeadMagic plugin for Cursor"),
		"plugin.json description must preserve the canonical plugin positioning",
	);
	assert(
		exists("scripts/install-local-plugin.mjs"),
		"Missing scripts/install-local-plugin.mjs",
	);
	assert(
		exists("scripts/verify-mcp-health.mjs"),
		"Missing scripts/verify-mcp-health.mjs",
	);
	assert(
		readme.includes("npm run install:local"),
		"README.md must document local plugin installation",
	);
	assert(
		readme.includes("npm run check"),
		"README.md must document npm run check (validate + hosted health)",
	);
	assert(
		readme.includes("npm run verify:health"),
		"README.md must mention verify:health (used by check and CI)",
	);

	console.log("LeadMagic Cursor plugin validation passed.");
} catch (error) {
	console.error(`Validation failed: ${error.message}`);
	process.exit(1);
}
