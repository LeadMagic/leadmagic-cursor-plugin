# LeadMagic Cursor Plugin

Official LeadMagic plugin for Cursor. It connects Cursor to LeadMagic's hosted MCP server so agents can run credit-aware enrichment—work emails, mobile, B2B profile-to-email, job-change signals, account research, competitors, technographics, people-by-role, and credits—without leaving the editor.

## Overview

This repository packages LeadMagic's hosted MCP integration in a Cursor-native format for marketplace distribution, local installation, and team use. The goal is straightforward: make LeadMagic's enrichment and research workflows available to Cursor agents with minimal setup and clear operational guidance.

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

## Why Use It

Use this plugin when you want Cursor to help with:

- validating or finding work emails, or resolving email from a B2B profile URL
- mobile lookup, job-change checks, and role-based people search at a company
- researching account fit, funding context, competitors, and technology signals
- keeping enrichment workflows credit-aware and repeatable

## Data and privacy

MCP tool calls send the parameters you or the agent provide (for example emails, names, company names or domains, profile URLs) to LeadMagic's hosted service using your `LEADMAGIC_API_KEY`. See [Privacy](https://leadmagic.io/privacy) and [Terms](https://leadmagic.io/legal/terms). Support: [leadmagic.io/docs/support](https://leadmagic.io/docs/support).

## Hosted MCP Configuration

The plugin points Cursor at LeadMagic's hosted MCP endpoint:

- MCP endpoint: `https://mcp.leadmagic.io/mcp`
- MCP transport: `http`
- Auth header: `x-leadmagic-key`

Users provide their API key through the `LEADMAGIC_API_KEY` environment variable. The plugin forwards that key to the hosted MCP server at runtime.

## What The MCP Supports Today

The hosted MCP surface supports:

- `check_credit_balance`, `validate_work_email`, `find_work_email`
- `find_mobile_number`, `linkedin_profile_to_work_email`, `detect_job_change`
- `research_account`, `list_company_competitors`, `get_company_technographics`, `find_people_by_role`

The broader REST API includes more endpoints (jobs, ads, analytics, etc.); this plugin tracks the hosted MCP tool list above. See `leadmagic://docs` in Cursor for the live tool reference.

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

#### 1. Set your API key

```bash
export LEADMAGIC_API_KEY="your_api_key_here"
```

#### 2. Link the repository into Cursor

If you are using this repository locally:

```bash
npm ci
npm run install:local
```

This creates a symlink at `~/.cursor/plugins/local/leadmagic` pointing to this repository.

Then reload Cursor with `Developer: Reload Window`.

#### 3. Verify the connection

Ask Cursor one of these:

- `Check my LeadMagic credit balance.`
- `Validate this email with LeadMagic: jane@company.com`
- `Research Ramp as an account and summarize the best buying signals.`

## Local Development

From the repository root, install dependencies and validate the package:

```bash
npm ci
npm run validate
```

To link the plugin into Cursor locally:

```bash
npm run install:local
```

To remove the local symlink later:

```bash
npm run uninstall:local
```

## Troubleshooting

### Cursor cannot see `LEADMAGIC_API_KEY`

On macOS, if Cursor was launched from the dock or Finder, it may not inherit your shell environment. If `LEADMAGIC_API_KEY` is set in your terminal but LeadMagic still fails inside Cursor, launch Cursor from the same shell session or reload it after exporting the variable in an environment Cursor can see.

### Authentication fails

Confirm that:

- `LEADMAGIC_API_KEY` is set in the environment visible to Cursor
- the plugin is using `https://mcp.leadmagic.io/mcp`
- the request header is `x-leadmagic-key`

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
assets/logo.svg
mcp.json
package-lock.json
schemas/plugin.schema.json
rules/leadmagic-usage.mdc
skills/*/SKILL.md
scripts/install-local-plugin.mjs
scripts/validate-plugin.mjs
README.md
SUBMISSION.md
CHANGELOG.md
```

## Validation

```bash
npm run validate
```

The validator checks this package against a vendored snapshot of Cursor's official `plugin.schema.json` and then applies LeadMagic-specific assertions for:

- the hosted MCP endpoint
- `LEADMAGIC_API_KEY` interpolation
- the canonical logo asset and submission logo URL
- skills and rules metadata
- repository and submission copy consistency

## Marketplace Submission

Use `SUBMISSION.md` for ready-to-paste marketplace form values, reviewer notes, and a final pre-submit checklist.

## Companion Resources

- OpenAPI snapshot and schema docs: [LeadMagic OpenAPI](https://github.com/LeadMagic/leadmagic-openapi)
- Product docs index: [leadmagic.io/docs/llms.txt](https://leadmagic.io/docs/llms.txt)
- Website: [leadmagic.io](https://leadmagic.io)
- Privacy: [leadmagic.io/privacy](https://leadmagic.io/privacy)
- Terms: [leadmagic.io/legal/terms](https://leadmagic.io/legal/terms)
