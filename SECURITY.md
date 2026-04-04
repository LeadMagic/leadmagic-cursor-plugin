# Security

## Scope

This repository is the **Cursor plugin package** for LeadMagic (rules, skills, agents, commands, and `mcp.json`). It does **not** ship application secrets: authentication is **OAuth in Cursor** by default, or an optional **API key** you supply via environment variables—never committed to git.

## Supported versions

Security-sensitive fixes apply to the latest release on the `main` branch of [LeadMagic/leadmagic-cursor-plugin](https://github.com/LeadMagic/leadmagic-cursor-plugin).

## Reporting a vulnerability

Email **plugins@leadmagic.io** with:

- A short description of the issue and its impact
- Steps to reproduce (if applicable)
- Whether you believe it affects the plugin repo, the hosted MCP endpoint, or LeadMagic’s API

Please do **not** open a public issue for undisclosed security vulnerabilities.

We will acknowledge receipt and coordinate disclosure. For general product security questions, see [leadmagic.io](https://leadmagic.io) and [Support](https://leadmagic.io/docs/support).

## Hardening checklist for users and contributors

- **Never** commit API keys, OAuth tokens, or `.env` files with secrets.
- Prefer **OAuth** for MCP; use `LEADMAGIC_API_KEY` only in an environment Cursor can read, not in tracked config (except the documented `${LEADMAGIC_API_KEY}` placeholder in optional user overrides).
- Treat enrichment inputs (emails, names, domains, profile URLs) as **sensitive data**; follow your org’s data-handling policy. See [Privacy](https://leadmagic.io/privacy) and [Terms](https://leadmagic.io/legal/terms).
- Run **`npm ci`** (not plain `npm install`) in CI and for reproducible installs; review `npm audit` after dependency changes.

## Dependency hygiene

Dev dependencies (`ajv`, `ajv-formats`) are used only for **offline validation** of `plugin.json` against the vendored Cursor schema. Production risk from this repo is minimal; we still use lockfiles and automated dependency updates where possible.
