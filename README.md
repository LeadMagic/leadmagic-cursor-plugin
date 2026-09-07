# LeadMagic Cursor Plugin: B2B Research and MCP Enrichment

Official LeadMagic plugin for Cursor. Connect Cursor to LeadMagic's hosted MCP for credit-aware B2B enrichment and GTM research: work email validation and discovery, mobile lookup, LinkedIn profile to work email, job-change signals, account research, competitors, technographics, people by role, and credit balance.

[LeadMagic B2B enrichment](https://leadmagic.io?utm_source=github&utm_medium=readme&utm_campaign=leadmagic-cursor-plugin&utm_content=readme-intro) · [MCP setup guide](https://leadmagic.io/docs/mcp/setup?utm_source=github&utm_medium=readme&utm_campaign=leadmagic-cursor-plugin&utm_content=readme-intro) · [Pricing and credits](https://leadmagic.io/pricing?utm_source=github&utm_medium=readme&utm_campaign=leadmagic-cursor-plugin&utm_content=readme-intro)

## Current integration contract

Reviewed against [LeadMagic's public documentation](https://leadmagic.io/docs?utm_source=github&utm_medium=readme&utm_campaign=leadmagic-cursor-plugin&utm_content=readme-current-integration-contract) on 2026-09-06. REST uses `https://api.leadmagic.io` and `X-API-Key`; hosted MCP uses `https://mcp.leadmagic.io/mcp` with OAuth; lm-tui uses `lm login`. Keep credentials and customer data out of committed examples.

Email Finder returns validated work emails. Use Email Validation for externally sourced addresses. Check the [current pricing and credit rules](https://leadmagic.io/docs/v1/credits?utm_source=github&utm_medium=readme&utm_campaign=leadmagic-cursor-plugin&utm_content=readme-current-integration-contract) before paid work; costs are endpoint- and plan-dependent. API-only integrations must not send app-only `preview` options.


## What this plugin gives you

- A hosted LeadMagic MCP endpoint at `https://mcp.leadmagic.io/mcp`
- OAuth sign-in in Cursor by default
- Hosted LeadMagic MCP tools for people/company/jobs search, enrichment, ads research, bulk, and credits
- Cursor-native packaging: rules, skills, commands, and a dedicated enrichment agent
- In-editor docs via `leadmagic://docs`

This repository packages the Cursor plugin. It does not run a local MCP server. The MCP server is hosted by LeadMagic.

> Search access and rate limits depend on your plan. Check [current pricing](https://leadmagic.io/pricing?utm_source=github&utm_medium=readme&utm_campaign=leadmagic-cursor-plugin&utm_content=readme-what-this-plugin-gives-you) before a large run; the `market-search` skill covers pagination and account entitlements.

It follows Cursor's public plugin model documented at [https://cursor.com/docs/plugins](https://cursor.com/docs/plugins).

## Included in the plugin

| Area | Included |
| --- | --- |
| MCP server | Hosted HTTP MCP at `https://mcp.leadmagic.io/mcp` |
| Authentication | OAuth sign-in in Cursor |
| Tools | Search: `search_people`, `search_companies`, `find_jobs` / `search_jobs` · Enrichment: `enrich_contact`, `validate_work_email`, `find_work_email`, `find_mobile_number`, `linkedin_profile_to_work_email`, `find_people_by_role` · Account: `research_account`, `account_intel`, `list_company_competitors`, `get_company_technographics`, `detect_job_change` · Ads, bulk, and free helpers (`check_credit_balance`, `preview_cost`) |
| Cursor docs | Resource `leadmagic://docs`; prompts `account_research` and `contact_lookup` |
| Packaged assets | 1 rule, 5 skills, 1 agent, 3 commands |

## Install in Cursor

Choose the path that fits how you want to use the plugin.

### Option 1: Team marketplace import

In Cursor, go to `Dashboard -> Settings -> Plugins -> Team Marketplaces -> Import` and use:

```text
https://github.com/LeadMagic/leadmagic-cursor-plugin
```

### Option 2: Local install from this repo

From the repo root:

```bash
npm ci
npm run install:local
```

Then reload Cursor with `Developer: Reload Window`.

### Option 3: Cursor marketplace

Install from the Cursor marketplace when the listing is available.

## First run

1. Enable the LeadMagic plugin in Cursor.
2. Complete the OAuth sign-in flow when Cursor prompts you.
3. Ask Cursor something simple, such as:

```text
Check my LeadMagic credit balance.
```

You can also try:

```text
Validate this work email with LeadMagic: person@example.com
Research a company domain I am authorized to enrich with LeadMagic
Find people with the VP Marketing role at my target company
```

## Authentication

### Default: OAuth

The bundled `mcp.json` uses OAuth by default. No API keys are stored in this repository.

Use [the current hosted MCP authentication guide](https://leadmagic.io/docs/mcp/authentication?utm_source=github&utm_medium=readme&utm_campaign=leadmagic-cursor-plugin&utm_content=readme-authentication) if sign-in fails. REST API keys belong to REST integrations and are not required in this plugin configuration.

## MCP configuration

| Setting | Value |
| --- | --- |
| URL | `https://mcp.leadmagic.io/mcp` |
| Transport | `http` |
| Default auth | OAuth in Cursor |

## What you can do with it

### Contact workflows

- Validate an existing work email
- Find a likely work email from a person and company
- Resolve a work email from a LinkedIn profile
- Find a mobile number when supported
- Check for recent job-change signals

### Account workflows

- Research a company from a name or domain
- Pull competitors
- Pull technographics
- Find people by role at a target account

### Cursor-native helpers

- Command: `check-credits`
- Command: `research-company`
- Command: `validate-email`
- Agent: `leadmagic-enrichment`
- Skills for contact enrichment, account intelligence, signal research, and prospect-list QA

## Docs and product references

- In Cursor: `leadmagic://docs`
- Setup guide: [LeadMagic MCP Setup](https://leadmagic.io/docs/mcp/setup?utm_source=github&utm_medium=readme&utm_campaign=leadmagic-cursor-plugin&utm_content=readme-docs-and-product-references)
- Tool reference: [LeadMagic MCP Tools](https://leadmagic.io/docs/mcp/tools?utm_source=github&utm_medium=readme&utm_campaign=leadmagic-cursor-plugin&utm_content=readme-docs-and-product-references)
- Troubleshooting: [LeadMagic MCP Troubleshooting](https://leadmagic.io/docs/mcp/troubleshooting?utm_source=github&utm_medium=readme&utm_campaign=leadmagic-cursor-plugin&utm_content=readme-docs-and-product-references)
- REST and schemas: [LeadMagic OpenAPI](https://github.com/LeadMagic/leadmagic-openapi)

For direct `https://api.leadmagic.io` integration, OpenAPI schemas, or REST smoke tests, use the OpenAPI repository and product docs. The Cursor plugin exposes the hosted MCP surface, which is a subset of the full REST platform.

## Security and privacy

- Tool calls send the inputs you provide, such as emails, names, company domains, or profile URLs, to LeadMagic's hosted service.
- Never commit secrets, API keys, tokens, or `.env` files.
- Review [Privacy](https://leadmagic.io/privacy?utm_source=github&utm_medium=readme&utm_campaign=leadmagic-cursor-plugin&utm_content=readme-security-and-privacy), [Terms](https://leadmagic.io/legal/terms?utm_source=github&utm_medium=readme&utm_campaign=leadmagic-cursor-plugin&utm_content=readme-security-and-privacy), [Support](https://leadmagic.io/docs/support?utm_source=github&utm_medium=readme&utm_campaign=leadmagic-cursor-plugin&utm_content=readme-security-and-privacy), and [SECURITY.md](SECURITY.md).

## Develop this repository

This repo targets **Node.js 22**.

```bash
npm ci
npm run check
```

`npm run check` runs:

- `npm run validate` for schema and package assertions
- `npm run verify:health` for `GET https://mcp.leadmagic.io/health`

If you are offline, run:

```bash
npm run validate
```

Useful local commands:

```bash
npm run install:local
npm run uninstall:local
```

Additional repo docs:

- Marketplace submission copy: `SUBMISSION.md`
- Release notes: `CHANGELOG.md`

## Troubleshooting

| Issue | What to try |
| --- | --- |
| OAuth sign-in does not complete | Confirm the MCP URL is `https://mcp.leadmagic.io/mcp` and remove incorrect header overrides. |
| Health check works but MCP returns `401` | Complete or reconnect OAuth in Cursor. |

## Project layout

```text
.cursor-plugin/plugin.json
agents/*.md
commands/*.md
assets/logo.svg
mcp.json
rules/
skills/
scripts/install-local-plugin.mjs
scripts/validate-plugin.mjs
scripts/verify-mcp-health.mjs
schemas/plugin.schema.json
.github/workflows/validate-plugin.yml
.github/dependabot.yml
.node-version
SECURITY.md
LICENSE
README.md
```

## License

MIT. See [LICENSE](LICENSE).

## Public examples and publication

Examples are fictional unless an explicit public source is cited. See [PUBLICATION.md](PUBLICATION.md) for data, claims, attribution, and disclosure requirements.

## Related LeadMagic projects

- [Claude Code integration](https://github.com/LeadMagic/leadmagic-claude-plugin)
- [LeadMagic API skills](https://github.com/LeadMagic/leadmagic-skills)
