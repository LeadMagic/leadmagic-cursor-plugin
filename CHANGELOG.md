# Changelog

## 1.0.5

- Dual-publish for cursor.directory Auto GitHub scan: keep `.cursor-plugin/` (Cursor Plugin 3.13 marketplace schema) and add root `plugin.json` (Agent Plugins 1.0.0).
- `mcp.json` and `.mcp.json` are identical OAuth HTTP config: `streamable-http` to `https://mcp.leadmagic.io/mcp`, no keys or extra servers.
- List for Cursor and Grok Bot (same marketplace): `minClientVersions.grokbot` `0.49.0`. First-run copy is the same OAuth MCP; no second login page.

## 1.0.4

- First-run copy: Cursor prompts OAuth; sign in with your LeadMagic account in the browser.
- Align `.cursor-plugin/marketplace.json` with Cursor’s official schema: plugin entries may only include `name`, `source`, `description`, and `minClientVersions`. Extra `logo` / `category` fields fail marketplace import (`additionalProperties: false`).
- Vendor `schemas/marketplace.schema.json` and validate it in `npm run validate`.
- Point install docs at Team Marketplace import and `https://mcp.leadmagic.io/cursor-plugin`.

## 1.0.3

- Pin the official LeadMagic icon (`https://leadmagic.io/logo/icon.svg`, 256×256 SVG) and add a 256×256 PNG raster for listings that need it.
- Align marketplace entry (`logo`, `category`) and add `.mcp.json` for cursor.directory auto-detect after official marketplace listing.
- Skill frontmatter matches the official plugin template (`name`, `description` only).

## 1.0.2

- Search-then-enrich-selected playbook: look up work email or professional mobile only for named rows after search.
- First-run prompt: credits, then a bounded company search without unlocking emails.

## 1.0.1

- Front door is four features: people/company/jobs search, work-email find, work-email validate, professional mobile.
- OAuth first-run copy matches app.leadmagic.io sign-in. Marketplace tone is licensed B2B contact data, not scraping.
- Trim GTM extras from README, agent, and commands; keep thin supporting skills only.

## 1.0.0

- Marketplace-ready packaging: category `integrations`, `minClientVersions.cursor` `3.13.0`, short GTM-outcome description, `/add-plugin leadmagic`.
- Add ICP, buying-committee, and markdown table skills wrapping hosted MCP.
- User-facing copy uses B2B profile / B2B profile URL; drop marketplace emphasis on phone lookup.

## 0.1.13

- Align plugin copy and agent routing with the public docs/MCP surface: people/company/jobs search, ads, B2B profile tools, bulk, hiring signals, lookalikes, and REST fallbacks when MCP has no tool.
- Marketplace and README wording uses B2B profile data / B2B profile URL.

## 0.1.12

- Add `.cursor-plugin/marketplace.json` with `source: "."` so Cursor GitHub clone / Import from Repo detects the plugin.

## 0.1.11

- Verify the public OAuth challenge and discovery metadata, including PKCE and public-client support.
- Pin the reviewed official logo and reject asset changes or symlink substitution during validation.
- Document authentication recovery without static API keys; extend public-file detection to npm tokens.
- Add regression tests for auth discovery failures and logo replacement.

## 0.1.10

- Refine all five skills using Cursor skill-authoring guidance: focused triggers, concrete examples, and Custom Mode badges.
- Align the enrichment agent and validation command with those workflows, including bulk recovery and evidence handling.
- Validate YAML frontmatter, metadata types, and skill directory identity; add regression tests and a manual Cursor acceptance checklist.

## 0.1.9

- Make local installation idempotent and preserve existing files and other checkouts, including broken links.
- Add isolated installer regression tests to CI and enforce version and hosted MCP configuration consistency.
- Align setup and OAuth guidance with current Cursor docs; correct ads coverage and bound market searches to the requested scope.
- Reuse validated finder results and treat imported content as untrusted data.

## Public-content privacy review — 2026-09-06

Use synthetic contact examples, remove unnecessary identity and credential-like samples, and clarify publication, attribution, and claims requirements.


## Unreleased — 2026-09-06

Document the current public integration contract, remove obsolete API-key fallback guidance from current setup instructions, and add a timeout to hosted MCP health verification.


All notable changes to the LeadMagic Cursor plugin package are documented here.

## 0.1.8

- **CI/CD:** Concurrency to cancel superseded runs; job `timeout-minutes`; `workflow_dispatch`; npm cache via `actions/setup-node`; pin `actions/checkout` and `actions/setup-node` to full SHAs (`v5` tags); drop duplicate README string check (already enforced by `npm run validate`). Dependabot weekly updates for **GitHub Actions** plus npm commit-message prefixes.
- **Tooling:** `.node-version` and `package.json` `engines` for Node 22+.

## 0.1.7

- **Security:** Add [SECURITY.md](SECURITY.md); expand `.gitignore` for `.env*`; CI `permissions: contents: read`, `npm audit --audit-level=high`, and [Dependabot](.github/dependabot.yml) for npm.
- **Docs:** README restructured (security first, tables, shorter flow); link `LICENSE` and security policy.

## 0.1.6

- **Cursor plugin model:** Add `agents/leadmagic-enrichment.md` and `commands/` (`check-credits`, `research-company`, `validate-email`); wire `agents` and `commands` in `plugin.json` to match patterns used by plugins such as [encoredev/cursor-plugin](https://github.com/encoredev/cursor-plugin).
- **Validation:** Assert agent/command markdown frontmatter; README links to [Cursor Plugins docs](https://cursor.com/docs/plugins).

## 0.1.5

- **Docs:** README clarifies MCP (Cursor) vs REST (OpenAPI), links [leadmagic-openapi](https://github.com/LeadMagic/leadmagic-openapi) and product docs; validator and CI require the OpenAPI repo URL in README.

## 0.1.4

- **Auth:** Default `mcp.json` uses OAuth only (no headers); Cursor signs in with LeadMagic.
- **CI:** `npm run check` runs validate plus `verify:health` against `https://mcp.leadmagic.io/health`; redundant `mcp.json` inline checks removed (covered by validate).

## 0.1.3

- **MCP:** Hosted server at `https://mcp.leadmagic.io/mcp` — 10 tools, shared docs resource `leadmagic://docs`, prompts `account_research` and `contact_lookup`.
- **Auth:** Hosted MCP later moved to OAuth-only; this release still documented a header placeholder.
- **Bundle:** Default rule, skills, validation script, and GitHub Actions CI.
- **Docs:** README includes data handling and links to privacy, terms, and support; `SUBMISSION.md` marketplace copy matches the MCP tool surface.
