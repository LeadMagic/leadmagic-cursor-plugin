# LeadMagic Cursor Plugin

Official LeadMagic plugin for Cursor. It connects Cursor to LeadMagic's hosted MCP server so agents can run credit-aware enrichment—work emails, mobile, B2B profile-to-email, job-change signals, account research, competitors, technographics, people-by-role, and credits—without leaving the editor.

**Repository:** [github.com/LeadMagic/leadmagic-cursor-plugin](https://github.com/LeadMagic/leadmagic-cursor-plugin)

## Overview

This repository packages LeadMagic's hosted MCP integration in a Cursor-native format for marketplace distribution, local installation, and team use. The goal is straightforward: make LeadMagic's enrichment and research workflows available to Cursor agents with minimal setup and clear operational guidance.

### MCP in Cursor vs REST / OpenAPI

| You are building… | Start here |
| --- | --- |
| Cursor agents, chat, or IDE automation over LeadMagic | This plugin + hosted MCP at `https://mcp.leadmagic.io/mcp` (default **OAuth** in Cursor) |
| Your own services, scripts, or non-MCP clients calling `https://api.leadmagic.io` | [LeadMagic OpenAPI](https://github.com/LeadMagic/leadmagic-openapi) (YAML/JSON snapshot, `llms.txt`, and `test-api` smoke tests) + [product API docs](https://leadmagic.io/docs) |

The OpenAPI repository is the best place for **schema-level** detail and **direct HTTP** examples. This plugin repo is the source for **Cursor packaging** (skills, rules, agents, commands, `mcp.json`, validation). Keep terminology aligned: MCP tools wrap a **subset** of the broader REST surface (for example jobs and ads APIs are not exposed as MCP tools today).

The package includes:

- Hosted LeadMagic MCP connectivity for Cursor
- The current LeadMagic MCP surface:
  - 10 tools: credits, work email validate/find, mobile, LinkedIn-to-email, job-change detection, account research, competitors, technographics, people-by-role
  - 1 shared docs resource: `leadmagic://docs`
  - 2 built-in prompts: `account_research` and `contact_lookup`
- Four focused Cursor skills aligned to the current hosted MCP surface:
  - contact enrichment
  - account intelligence
  - prospect list QA
  - signal research
- One default rule that nudges Cursor toward efficient, low-duplication LeadMagic usage
- One **agent** (`leadmagic-enrichment`): a dedicated enrichment/research persona wired to MCP best practices
- **Commands** (playbooks): check credits, research a company, validate an email—usable from the Cursor commands palette like other marketplace plugins

### How this compares to other Cursor plugins

Well-structured plugins (for example [Encore’s Cursor plugin](https://github.com/encoredev/cursor-plugin), which bundles rules, skills, MCP, an agent, and commands) follow the same **Cursor plugin model** described in the official docs: [Plugins](https://cursor.com/docs/plugins) and the [plugin-template](https://github.com/cursor/plugin-template) monorepo. LeadMagic matches that shape where it makes sense for **hosted SaaS enrichment**: we ship **HTTP/streamable MCP** to `https://mcp.leadmagic.io/mcp` (OAuth by default) instead of launching a **local stdio** MCP process—appropriate because LeadMagic runs as a hosted API. Optional **hooks** or local scripts are not included until there is a clear, supportable automation story for all users.

## Why Use It

Use this plugin when you want Cursor to help with:

- validating or finding work emails, or resolving email from a B2B profile URL
- mobile lookup, job-change checks, and role-based people search at a company
- researching account fit, funding context, competitors, and technology signals
- keeping enrichment workflows credit-aware and repeatable

## Data and privacy

MCP tool calls send the parameters you or the agent provide (for example emails, names, company names or domains, profile URLs) to LeadMagic's hosted service. By default Cursor authenticates with LeadMagic using **OAuth** (browser sign-in) tied to your account. If you use the optional API-key setup, requests include your key from `LEADMAGIC_API_KEY`. See [Privacy](https://leadmagic.io/privacy) and [Terms](https://leadmagic.io/legal/terms). Support: [leadmagic.io/docs/support](https://leadmagic.io/docs/support).

## Hosted MCP Configuration

The plugin points Cursor at LeadMagic's hosted MCP endpoint:

- MCP endpoint: `https://mcp.leadmagic.io/mcp`
- MCP transport: `http`
- **Default auth:** OAuth sign-in in Cursor when you enable or first use the LeadMagic MCP server (no API key in `mcp.json`)

**Optional API-key auth:** Advanced setups can add a static header so Cursor sends your key instead of OAuth. Merge or replace the server entry like this (environment variable must be visible to Cursor):

```json
{
  "mcpServers": {
    "leadmagic": {
      "type": "http",
      "url": "https://mcp.leadmagic.io/mcp",
      "headers": {
        "x-leadmagic-key": "${LEADMAGIC_API_KEY}"
      }
    }
  }
}
```

## What The MCP Supports Today

The hosted MCP surface supports:

- `check_credit_balance`, `validate_work_email`, `find_work_email`
- `find_mobile_number`, `linkedin_profile_to_work_email`, `detect_job_change`
- `research_account`, `list_company_competitors`, `get_company_technographics`, `find_people_by_role`

The broader REST API includes more endpoints (jobs, ads, analytics, etc.); this plugin tracks the hosted MCP tool list above. For route names, request shapes, and credit tables against `https://api.leadmagic.io`, use the [OpenAPI snapshot](https://github.com/LeadMagic/leadmagic-openapi) and [leadmagic.io/docs](https://leadmagic.io/docs). Inside Cursor, `leadmagic://docs` is the live MCP tool reference.

## Quick Start

You can use this plugin in three ways:

- install it from the Cursor marketplace after approval
- import the repository into a Cursor team marketplace for internal distribution
- symlink it locally for development and pre-submission testing

### Install from the marketplace

After approval, install the plugin from the marketplace panel in Cursor.

### Import as a team marketplace

For private team distribution in Cursor:

1. Open `Dashboard -> Settings -> Plugins`.
2. In `Team Marketplaces`, click `Import`.
3. Paste `https://github.com/LeadMagic/leadmagic-cursor-plugin`.
4. Review the parsed plugin and save the marketplace.

### Install locally for testing

#### 1. Link the repository into Cursor

If you are using this repository locally:

```bash
npm ci
npm run install:local
```

This creates a symlink at `~/.cursor/plugins/local/leadmagic` pointing to this repository.

Then reload Cursor with `Developer: Reload Window`.

#### 2. Sign in with LeadMagic (OAuth)

When Cursor connects to the LeadMagic MCP server, complete the browser OAuth flow if prompted. You do not need `LEADMAGIC_API_KEY` for the default configuration.

#### 3. Optional: use an API key instead of OAuth

If you cannot use OAuth, set `LEADMAGIC_API_KEY` in an environment Cursor inherits and add the `headers` block shown under [Hosted MCP Configuration](#hosted-mcp-configuration).

#### 4. Verify the connection

Ask Cursor one of these:

- `Check my LeadMagic credit balance.`
- `Validate this email with LeadMagic: jane@company.com`
- `Research Ramp as an account and summarize the best buying signals.`

## Local Development

From the repository root, install dependencies and run the full check:

```bash
npm ci
npm run check
```

If you cannot reach the network, use `npm run validate` instead of `check`.

To link the plugin into Cursor locally:

```bash
npm run install:local
```

To remove the local symlink later:

```bash
npm run uninstall:local
```

## Troubleshooting

### OAuth or MCP sign-in fails

Retry the LeadMagic sign-in flow from Cursor's MCP settings. Confirm the server URL is `https://mcp.leadmagic.io/mcp` and that no stale custom `mcp.json` override is forcing invalid headers. If OAuth is blocked in your environment, switch to the API-key configuration in [Hosted MCP Configuration](#hosted-mcp-configuration).

### Cursor cannot see `LEADMAGIC_API_KEY` (API-key mode only)

On macOS, if Cursor was launched from the dock or Finder, it may not inherit your shell environment. If you use the API-key header and `LEADMAGIC_API_KEY` is set in your terminal but LeadMagic still fails inside Cursor, launch Cursor from the same shell session or reload it after exporting the variable in an environment Cursor can see.

### Authentication fails (API-key mode)

Confirm that:

- `LEADMAGIC_API_KEY` is set in the environment visible to Cursor
- your merged MCP config includes `x-leadmagic-key` with `${LEADMAGIC_API_KEY}`
- the plugin is using `https://mcp.leadmagic.io/mcp`

### Hosted MCP reachability

`GET https://mcp.leadmagic.io/health` should return **200** when the service is up. Unauthenticated requests to `/mcp` may return **401** until OAuth completes or a valid API key is sent—that is expected.

### You need exact tool details

Use the shared docs resource `leadmagic://docs` or review:

- [LeadMagic MCP Setup](https://leadmagic.io/docs/mcp/setup)
- [LeadMagic MCP Tools](https://leadmagic.io/docs/mcp/tools)
- [LeadMagic MCP Troubleshooting](https://leadmagic.io/docs/mcp/troubleshooting)

## Example Prompts

- `Check my LeadMagic credit balance.`
- `Validate these prospect emails and tell me which are safe to use.`
- `Find the best work email for Jane Doe at Snowflake.`
- `Research Ramp as an account and tell me the best buying signals.`
- `Use contact_lookup to validate jane@company.com and summarize the result.`
- `Use account_research for Stripe and summarize the strongest GTM angle.`

## Repository Layout

```text
.cursor-plugin/plugin.json
.github/pull_request_template.md
.github/workflows/validate-plugin.yml
agents/*.md
commands/*.md
assets/logo.svg
mcp.json
package-lock.json
schemas/plugin.schema.json
rules/leadmagic-usage.mdc
skills/*/SKILL.md
scripts/install-local-plugin.mjs
scripts/validate-plugin.mjs
scripts/verify-mcp-health.mjs
README.md
SUBMISSION.md
CHANGELOG.md
```

## Validation

```bash
npm run check
```

That runs `npm run validate` plus `npm run verify:health` (hosted `/health` smoke check—same idea as CI). Use `npm run validate` alone when you are offline.

The validator checks this package against a vendored snapshot of Cursor's official `plugin.schema.json` and then applies LeadMagic-specific assertions for:

- the hosted MCP endpoint and OAuth-default `mcp.json` (no auth headers)
- the canonical logo asset and submission logo URL
- skills and rules metadata
- repository and submission copy consistency

## Marketplace Submission

Use `SUBMISSION.md` for ready-to-paste marketplace form values, reviewer notes, and a final pre-submit checklist.

## Related repositories and docs

- **OpenAPI snapshot (REST):** [github.com/LeadMagic/leadmagic-openapi](https://github.com/LeadMagic/leadmagic-openapi) — OpenAPI 3.1 YAML/JSON, LLM-oriented `llms.txt` / `llms-full.txt`, Spectral lint, and optional live `npm run test:api` smoke tests against `/v1/...`. Use it when integrating LeadMagic outside Cursor or when you need the full route map and field shapes.
- **This plugin (MCP + Cursor):** [github.com/LeadMagic/leadmagic-cursor-plugin](https://github.com/LeadMagic/leadmagic-cursor-plugin) — marketplace-ready Cursor bundle; OAuth-default MCP config; skills and rules for agent behavior.
- **Product docs:** [leadmagic.io/docs](https://leadmagic.io/docs) — authoritative API and MCP documentation.
- **Docs index for LLMs:** [leadmagic.io/docs/llms.txt](https://leadmagic.io/docs/llms.txt)
- **Website:** [leadmagic.io](https://leadmagic.io)
- **Privacy:** [leadmagic.io/privacy](https://leadmagic.io/privacy)
- **Terms:** [leadmagic.io/legal/terms](https://leadmagic.io/legal/terms)
