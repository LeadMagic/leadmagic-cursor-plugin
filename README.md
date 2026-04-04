# LeadMagic Cursor Plugin

Official LeadMagic plugin for Cursor: connect the editor to LeadMagic’s **hosted MCP** for credit-aware B2B enrichment—work emails, mobile, profile-to-email, job-change signals, account research, competitors, technographics, people-by-role, and credits.

**Repository:** [github.com/LeadMagic/leadmagic-cursor-plugin](https://github.com/LeadMagic/leadmagic-cursor-plugin)

## Security and privacy

- **Default auth:** **OAuth** in Cursor (browser sign-in). No API keys are stored in this repo’s `mcp.json`.
- **Optional API-key mode:** Use environment variable `LEADMAGIC_API_KEY` and the header pattern in [MCP configuration](#mcp-configuration). Never commit keys, tokens, or `.env` files—see [SECURITY.md](SECURITY.md) for reporting issues and hardening notes.
- **Data:** Tool calls send the inputs you or the agent provide (e.g. emails, names, company names or domains, profile URLs) to LeadMagic’s hosted service. Read [Privacy](https://leadmagic.io/privacy), [Terms](https://leadmagic.io/legal/terms), and [Support](https://leadmagic.io/docs/support).

## What’s included

| Area | Details |
| --- | --- |
| **MCP** | Hosted endpoint `https://mcp.leadmagic.io/mcp` (HTTP), **OAuth** by default |
| **Tools** | 10 tools: credits, validate/find work email, mobile, LinkedIn-to-email, job change, account research, competitors, technographics, people-by-role |
| **Docs in Cursor** | Resource `leadmagic://docs`; prompts `account_research`, `contact_lookup` |
| **Rules / skills / agent / commands** | One rule, four skills, agent `leadmagic-enrichment`, commands (`check-credits`, `research-company`, `validate-email`) |

**MCP vs REST:** For direct `https://api.leadmagic.io` integration, schemas, and smoke tests, use [LeadMagic OpenAPI](https://github.com/LeadMagic/leadmagic-openapi) and [product docs](https://leadmagic.io/docs). MCP tools cover a **subset** of the REST surface (e.g. jobs/ads are not MCP tools today).

**Same plugin model as other Cursor plugins:** [Cursor Plugins](https://cursor.com/docs/plugins), [plugin-template](https://github.com/cursor/plugin-template). Similar bundle to [Encore’s Cursor plugin](https://github.com/encoredev/cursor-plugin) (rules, skills, MCP, agent, commands); LeadMagic uses **remote HTTP MCP** instead of a local stdio server.

## Quick start

1. **Marketplace** — Install from the Cursor marketplace when available.
2. **Team marketplace** — `Dashboard → Settings → Plugins → Team Marketplaces → Import` → `https://github.com/LeadMagic/leadmagic-cursor-plugin`.
3. **Local symlink** — From the repo root:

```bash
npm ci
npm run install:local
```

Reload Cursor (`Developer: Reload Window`), complete **OAuth** when the LeadMagic MCP server connects, then try: *“Check my LeadMagic credit balance.”*

For API-key mode (no OAuth), set `LEADMAGIC_API_KEY` where Cursor can read it and apply the JSON block below.

## MCP configuration

| Setting | Value |
| --- | --- |
| URL | `https://mcp.leadmagic.io/mcp` |
| Transport | `http` |
| Auth (default) | OAuth in Cursor (no `headers` in bundled `mcp.json`) |

**Optional API-key header** (merge into your MCP config; env var must be visible to Cursor):

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

## Tools and documentation

**MCP tools:** `check_credit_balance`, `validate_work_email`, `find_work_email`, `find_mobile_number`, `linkedin_profile_to_work_email`, `detect_job_change`, `research_account`, `list_company_competitors`, `get_company_technographics`, `find_people_by_role`.

- In Cursor: `leadmagic://docs`
- Product: [LeadMagic MCP Setup](https://leadmagic.io/docs/mcp/setup), [LeadMagic MCP Tools](https://leadmagic.io/docs/mcp/tools), [LeadMagic MCP Troubleshooting](https://leadmagic.io/docs/mcp/troubleshooting)

## Developing this repository

CI and local tooling target **Node.js 22** (see `.node-version` and `package.json` `engines`).

```bash
npm ci
npm run check
```

`npm run check` runs `npm run validate` (schema + package assertions) and `npm run verify:health` (GET `https://mcp.leadmagic.io/health`). **Offline:** use `npm run validate` only.

```bash
npm run install:local    # symlink into ~/.cursor/plugins/local/leadmagic
npm run uninstall:local # remove symlink
```

Marketplace copy and checklist: `SUBMISSION.md`. Changelog: `CHANGELOG.md`.

## Troubleshooting

| Issue | What to try |
| --- | --- |
| OAuth / sign-in | Retry MCP settings; URL must be `https://mcp.leadmagic.io/mcp`; remove bad header overrides. |
| `LEADMAGIC_API_KEY` not seen (API-key mode) | On macOS, launch Cursor from a shell that has the var, or fix GUI env inheritance. |
| API-key auth fails | Confirm `x-leadmagic-key` + `${LEADMAGIC_API_KEY}` and endpoint URL. |
| Reachability | `GET https://mcp.leadmagic.io/health` → 200; `/mcp` may return **401** until OAuth or a valid key—expected. |

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

## Resources

- [LeadMagic OpenAPI](https://github.com/LeadMagic/leadmagic-openapi) — REST snapshot, `llms.txt`, optional `npm run test:api`
- [LeadMagic docs (LLM index)](https://leadmagic.io/docs/llms.txt)
- [leadmagic.io](https://leadmagic.io)
- [Security policy](SECURITY.md)

## License

MIT — see [LICENSE](LICENSE).
