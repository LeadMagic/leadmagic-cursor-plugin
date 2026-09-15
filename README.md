# LeadMagic

<img src="https://raw.githubusercontent.com/LeadMagic/leadmagic-cursor-plugin/main/assets/logo.svg" width="64" height="64" alt="LeadMagic logo">

Official LeadMagic plugin for Cursor. Connect your agent to LeadMagic’s hosted MCP for B2B research: **search** people, companies, and jobs; **find** and **validate** work emails; look up **professional mobile** numbers.

[LeadMagic](https://leadmagic.io?utm_source=github&utm_medium=readme&utm_campaign=leadmagic-cursor-plugin) · [MCP setup](https://leadmagic.io/docs/mcp/setup?utm_source=github&utm_medium=readme&utm_campaign=leadmagic-cursor-plugin) · [Pricing](https://leadmagic.io/pricing?utm_source=github&utm_medium=readme&utm_campaign=leadmagic-cursor-plugin)

This is licensed contact and company intelligence — the same class of product as enterprise GTM data platforms. It is **not** a scraper. Hosted MCP is OAuth only (no API key in this plugin).

Install today via **Team Marketplace import** of this repo. `/add-plugin leadmagic` works after Cursor lists the plugin on [cursor.com/marketplace](https://cursor.com/marketplace). Canonical plugin URL: [mcp.leadmagic.io/cursor-plugin](https://mcp.leadmagic.io/cursor-plugin) (redirects here).

## Install

1. Open **Cursor Dashboard → Plugins → Team Marketplaces → Import from Repo**.
2. Paste `https://github.com/LeadMagic/leadmagic-cursor-plugin` (same target as `https://mcp.leadmagic.io/cursor-plugin`).
3. Enable **LeadMagic**. The first time any tool hits MCP, **Cursor** prompts OAuth. Complete **Clerk** in the browser (same LeadMagic account as [app.leadmagic.io](https://app.leadmagic.io) — Google or email). There is no API key to paste.

After official marketplace listing, you can also search **LeadMagic** in **Cursor Settings → Plugins** or run `/add-plugin leadmagic`.

### This checkout (local play)

```bash
npm ci
npm run install:local
```

Then **Developer: Reload Window**. Open **Customize** and confirm LeadMagic. Complete the Clerk browser prompt when Cursor asks. Local imports must be allowed. A marketplace install with the same name takes precedence.

The installer links this repo at `~/.cursor/plugins/local/leadmagic`. `npm run uninstall:local` removes only this checkout’s link.

### Team marketplace import

`Dashboard → Plugins → Team Marketplaces → Import from Repo`:

```text
https://github.com/LeadMagic/leadmagic-cursor-plugin
```

Uses `.cursor-plugin/marketplace.json` with `"source": "."`.

## Sign in (Clerk)

Hosted MCP is `https://mcp.leadmagic.io/mcp`. Cursor discovers OAuth (`issuer` `https://app.leadmagic.io`, authorize at Clerk) and opens the browser. Sign in with the LeadMagic workspace you already use. Do not add `X-API-Key` or other headers to `mcp.json`. A browser visit to `https://mcp.leadmagic.io/` goes to [app.leadmagic.io/sign-in](https://app.leadmagic.io/sign-in), not a catalog page.

If the browser stops on Clerk / LeadMagic sign-in, finish it, then return to Cursor. Reconnect from MCP settings if tools still return `401`.

Details: [docs/authentication.md](docs/authentication.md) · [LeadMagic MCP authentication](https://leadmagic.io/docs/mcp/authentication).

```json
{
  "mcpServers": {
    "leadmagic": {
      "type": "http",
      "url": "https://mcp.leadmagic.io/mcp"
    }
  }
}
```

## First run

After install and Clerk sign-in, ask:

```text
Check my LeadMagic credit balance, then search 5 companies in B2B software in the US. Do not look up emails yet.
```

That is **search first**, then look up work emails or professional mobile only for **selected** people. Results stay in the agent as markdown rows.

## What you can do

Four product features. Prefer the live schema and `leadmagic://docs`. Email Finder returns validated work emails; use validation for addresses you already have. Check [credits](https://leadmagic.io/docs/v1/credits) before paid work. Search and some contact products can be **separate entitlements** from the main credit wallet.

| Feature | When | MCP tools |
| --- | --- | --- |
| Search | People, companies, or jobs | `search_people`, `search_companies`, `find_jobs` / `search_jobs` |
| Work email find | Name + company, or B2B profile URL | `find_work_email`, `b2b_profile_to_work_email` |
| Work email validate | You already have an email | `validate_work_email` |
| Professional mobile | Work email or B2B profile URL | `find_mobile_number` |

Commands match those four: `search`, `find-work-email`, `validate-email`, `find-mobile`. Agent: `leadmagic-enrichment`.

### Demo prompts

```text
Search companies matching my ICP; 15 rows.
```

```text
Find the work email for Alex Example at example.com.
```

```text
Validate this work email: person@example.com
```

```text
Look up a professional mobile number for this work email. I am authorized to contact them.
```

```text
Search open backend roles at stripe.com; 5 rows.
```

## Skills

Front door (Agent Decides, or invoke with `/name`):

| Request | Skill |
| --- | --- |
| People / company / jobs search | `market-search` |
| Find a work email | `find-work-email` |
| Validate an existing work email | `validate-work-email` |
| Professional mobile | `find-mobile` |

Supporting (not pushed in marketplace copy): `account-intelligence`, `prospect-list-qc`.

Authoring: [Cursor Agent Skills](https://cursor.com/docs/skills). Plugin model: [https://cursor.com/docs/plugins](https://cursor.com/docs/plugins). Smoke tests: [docs/cursor-smoke-tests.md](docs/cursor-smoke-tests.md).

## Docs

- In Cursor: `leadmagic://docs`
- [LeadMagic MCP Tools](https://leadmagic.io/docs/mcp/tools)
- [LeadMagic MCP Setup](https://leadmagic.io/docs/mcp/setup)
- REST schemas: [LeadMagic OpenAPI](https://github.com/LeadMagic/leadmagic-openapi)

REST (`https://api.leadmagic.io`, `X-API-Key`) is for your own integrations — never commit keys here. Prefer MCP in Cursor.

## Security

Tool calls send emails, names, domains, and B2B profile URLs you provide to LeadMagic. Never commit secrets. [Privacy](https://leadmagic.io/privacy) · [Terms](https://leadmagic.io/legal/terms) · [SECURITY.md](SECURITY.md)

Logo: `assets/logo.svg` (256×256 official icon). Raster copy: `assets/logo.png`.

## Develop

Node.js **22**. `npm ci && npm run check` (`npm run validate`, `npm test`, `npm run verify:health`, `npm run verify:auth`). Offline: `npm run validate && npm test`. Copy: `SUBMISSION.md`. Notes: `CHANGELOG.md`.

## Troubleshooting

| Issue | What to try |
| --- | --- |
| Browser login | Finish Clerk (same app as LeadMagic), then return to Cursor. |
| MCP `401` | Reconnect OAuth in Customize. Do not paste an API key. |
| Search or mobile `402` | Separate product entitlement vs wallet; check the app billing page. |

MIT. See [LICENSE](LICENSE).
