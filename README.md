# LeadMagic Cursor Plugin

Official LeadMagic plugin for Cursor. Connect Cursor to LeadMagic's hosted MCP for credit-aware B2B enrichment and GTM research: work email validation and discovery, mobile lookup, LinkedIn profile to work email, job-change signals, account research, competitors, technographics, people by role, and credit balance.

[GitHub repository](https://github.com/LeadMagic/leadmagic-cursor-plugin) | [LeadMagic docs](https://leadmagic.io/docs/mcp/setup) | [LeadMagic](https://leadmagic.io)

## What this plugin gives you

- A hosted LeadMagic MCP endpoint at `https://mcp.leadmagic.io/mcp`
- OAuth sign-in in Cursor by default
- 10 LeadMagic MCP tools for contact and account workflows
- Cursor-native packaging: rules, skills, commands, and a dedicated enrichment agent
- In-editor docs via `leadmagic://docs`

This repository packages the Cursor plugin. It does not run a local MCP server. The MCP server is hosted by LeadMagic.

It follows Cursor's public plugin model documented at [https://cursor.com/docs/plugins](https://cursor.com/docs/plugins).

## Included in the plugin

| Area | Included |
| --- | --- |
| MCP server | Hosted HTTP MCP at `https://mcp.leadmagic.io/mcp` |
| Authentication | OAuth in Cursor by default; optional API-key mode |
| Tools | `check_credit_balance`, `validate_work_email`, `find_work_email`, `find_mobile_number`, `linkedin_profile_to_work_email`, `detect_job_change`, `research_account`, `list_company_competitors`, `get_company_technographics`, `find_people_by_role` |
| Cursor docs | Resource `leadmagic://docs`; prompts `account_research` and `contact_lookup` |
| Packaged assets | 1 rule, 4 skills, 1 agent, 3 commands |

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
Validate this work email with LeadMagic: jane@company.com
Research the company acme.com with LeadMagic
Find people by role at Stripe: VP Marketing
```

## Authentication

### Default: OAuth

The bundled `mcp.json` uses OAuth by default. No API keys are stored in this repository.

### Optional: API-key mode

If you need header-based authentication instead of OAuth, set `LEADMAGIC_API_KEY` in an environment visible to Cursor and merge this into your MCP config:

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

On macOS, if Cursor cannot see `LEADMAGIC_API_KEY`, launch Cursor from a shell that already has the variable exported.

## MCP configuration

| Setting | Value |
| --- | --- |
| URL | `https://mcp.leadmagic.io/mcp` |
| Transport | `http` |
| Default auth | OAuth in Cursor |
| Optional auth | `x-leadmagic-key: ${LEADMAGIC_API_KEY}` |

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
- Setup guide: [LeadMagic MCP Setup](https://leadmagic.io/docs/mcp/setup)
- Tool reference: [LeadMagic MCP Tools](https://leadmagic.io/docs/mcp/tools)
- Troubleshooting: [LeadMagic MCP Troubleshooting](https://leadmagic.io/docs/mcp/troubleshooting)
- REST and schemas: [LeadMagic OpenAPI](https://github.com/LeadMagic/leadmagic-openapi)

For direct `https://api.leadmagic.io` integration, OpenAPI schemas, or REST smoke tests, use the OpenAPI repository and product docs. The Cursor plugin exposes the hosted MCP surface, which is a subset of the full REST platform.

## Security and privacy

- Tool calls send the inputs you provide, such as emails, names, company domains, or profile URLs, to LeadMagic's hosted service.
- Never commit secrets, API keys, tokens, or `.env` files.
- Review [Privacy](https://leadmagic.io/privacy), [Terms](https://leadmagic.io/legal/terms), [Support](https://leadmagic.io/docs/support), and [SECURITY.md](SECURITY.md).

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
| API-key auth fails | Confirm `x-leadmagic-key` is set from `${LEADMAGIC_API_KEY}` and that Cursor can read the env var. |
| Cursor cannot see `LEADMAGIC_API_KEY` | On macOS, launch Cursor from a shell that already has the variable exported. |
| Health check works but MCP returns `401` | Expected until OAuth completes or a valid API key is provided. |

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
