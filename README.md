# LeadMagic

<img src="https://raw.githubusercontent.com/LeadMagic/leadmagic-cursor-plugin/main/assets/logo.svg" width="64" height="64" alt="LeadMagic" decoding="async">

Official LeadMagic plugin for Cursor and Grok Bot. Search people, companies, and jobs; find and validate work emails; look up professional mobile numbers.

[LeadMagic](https://leadmagic.io?utm_source=github&utm_medium=readme&utm_campaign=leadmagic-cursor-plugin) · [MCP setup](https://leadmagic.io/docs/mcp/setup?utm_source=github&utm_medium=readme&utm_campaign=leadmagic-cursor-plugin) · [Pricing](https://leadmagic.io/pricing?utm_source=github&utm_medium=readme&utm_campaign=leadmagic-cursor-plugin)

Licensed B2B contact and company intelligence — **not** a scraper. Hosted MCP is **OAuth only**. After listing, it works in **Cursor** and **Grok Bot** from the same [Cursor Marketplace](https://cursor.com/marketplace) catalog. Canonical URL: [mcp.leadmagic.io/cursor-plugin](https://mcp.leadmagic.io/cursor-plugin).

## Install

After listing: **Cursor Settings → Plugins** or **Grok Bot Plugins**, search **LeadMagic**, or run `/add-plugin leadmagic`.

Team import today: **Dashboard → Plugins → Team Marketplaces → Import from Repo**, paste `https://github.com/LeadMagic/leadmagic-cursor-plugin`.

Local play: `npm ci && npm run install:local`, then **Developer: Reload Window**. `npm run uninstall:local` removes only this checkout’s link.

## Sign in

The first MCP call opens **one** LeadMagic sign-in page in the browser (Google or email — the same account as [app.leadmagic.io](https://app.leadmagic.io)). Cursor and Grok Bot discover OAuth from `https://mcp.leadmagic.io/mcp` and register as a public client (PKCE). There is nothing to paste: no API key, no client secret, no extra headers.

Finish that page, then return to the client that opened it. Do **not** start a second login tab, a second workspace, or a custom callback. If tools return `401`, reconnect OAuth in Customize.

```json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/mcp.schema.json",
  "mcpServers": {
    "leadmagic": {
      "type": "streamable-http",
      "url": "https://mcp.leadmagic.io/mcp"
    }
  }
}
```

## First run

```text
Check my LeadMagic credit balance, then search 5 companies in B2B software in the US. Do not look up emails yet.
```

**Search first**, then look up work emails or professional mobile only for **selected** people.

## What you can do

Prefer the live schema and `leadmagic://docs`. Check [credits](https://leadmagic.io/docs/v1/credits) before paid work. Search and some contact products can be separate entitlements.

| Feature | When | MCP tools |
| --- | --- | --- |
| Search | People, companies, or jobs | `search_people`, `search_companies`, `find_jobs` / `search_jobs` |
| Work email find | Name + company, or B2B profile URL | `find_work_email`, `b2b_profile_to_work_email` |
| Work email validate | You already have an email | `validate_work_email` |
| Professional mobile | Work email or B2B profile URL | `find_mobile_number` |

Commands: `search`, `find-work-email`, `validate-email`, `find-mobile`. Skills match those four. Agent: `leadmagic-enrichment`. Plugin model: [cursor.com/docs/plugins](https://cursor.com/docs/plugins). Tools: [LeadMagic MCP Tools](https://leadmagic.io/docs/mcp/tools).

## Develop

Node.js **22**. `npm ci && npm run check` (`npm run validate`, `npm test`, `npm run verify:health`, `npm run verify:auth`). Offline: `npm run validate && npm test`. Copy: `SUBMISSION.md`.

Tool calls send emails, names, domains, and B2B profile URLs you provide. Never commit secrets. [Privacy](https://leadmagic.io/privacy) · [Terms](https://leadmagic.io/legal/terms) · [SECURITY.md](SECURITY.md)

| Issue | What to try |
| --- | --- |
| Browser login | Finish the opened LeadMagic sign-in page, then return. |
| MCP `401` | Reconnect OAuth. Do not paste a key. |
| Search or mobile `402` | Separate entitlement vs wallet; check billing in the app. |

MIT. See [LICENSE](LICENSE).
