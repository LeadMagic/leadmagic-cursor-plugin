# Cursor / Grok Bot marketplace submission copy

Use these values at [cursor.com/marketplace/publish](https://cursor.com/marketplace/publish). **Grok Bot Plugins is the same catalog** — one listing covers Cursor and Grok Bot. Jesse must be signed in; **this repo cannot submit the form**.

Cursor Marketplace does **not** index a plugin from a Gmail to `marketplace-publishing@cursor.com`. That April 2026 email was outreach only. Registration is the publish form + a public GitHub repo whose `.cursor-plugin/marketplace.json` passes [Cursor’s marketplace schema](https://github.com/cursor/plugins/blob/main/schemas/marketplace.schema.json). Plugin entries may only have `name`, `source`, `description`, and `minClientVersions`. `logo` and `category` belong on `.cursor-plugin/plugin.json` only — extra entry fields fail import with `additionalProperties`.

## Form fields

**Organization name**  
LeadMagic

**Organization handle**  
leadmagic

**Unique namespace**  
@leadmagic

**Contact email**  
plugins@leadmagic.io

**Logotype URL**  
https://raw.githubusercontent.com/LeadMagic/leadmagic-cursor-plugin/main/assets/logo.svg

Logo path in-repo: `assets/logo.svg` (canonical, 256×256 SVG from https://leadmagic.io/logo/icon.svg). Raster fallback for forms that require PNG: `assets/logo.png` (256×256).

**Description**  
Official LeadMagic plugin for Cursor and Grok Bot. Search people, companies, and jobs; find and validate work emails; look up professional mobile numbers via the hosted MCP surface with OAuth in Cursor and Grok Bot.

**GitHub repository**  
https://github.com/LeadMagic/leadmagic-cursor-plugin

**Website URL**  
https://leadmagic.io

**Category**  
integrations

**Install command (once listed)**  
`/add-plugin leadmagic`

**Clients**  
Cursor `3.13.0` and Grok Bot `0.49.0` (`minClientVersions`). Same OAuth MCP: `https://mcp.leadmagic.io/mcp`. No second login page.

## Submission checklist

1. Public repo on `main` at the GitHub URL above.
2. `.cursor-plugin/marketplace.json` `"source": "."`, metadata.version `1.0.5`, **no** `logo`/`category` on the plugin entry; `minClientVersions.cursor` `3.13.0` and `minClientVersions.grokbot` `0.49.0`.
3. `.cursor-plugin/plugin.json` `1.0.5`, category `integrations`, logo `assets/logo.svg`. Root `plugin.json` is Agent Plugins 1.0.0 (cursor.directory Auto).
4. `npm ci && npm test && npm run validate`.
5. Local play: `npm run install:local`, Reload Window, LeadMagic OAuth in the browser (returns to Cursor or Grok Bot).
6. Submit at cursor.com/marketplace/publish while logged in as Jesse.

## AE blurb

LeadMagic for Cursor and Grok Bot is hosted MCP with OAuth — no API keys in the plugin. Four features: people/company/jobs search, work-email find, work-email validate, professional mobile. Same class of B2B contact intelligence as enterprise GTM data platforms, not a scraper. Please list us so `/add-plugin leadmagic` works in Cursor and Grok Bot (same marketplace). Contact plugins@leadmagic.io.

## Reviewer note

This plugin packages `https://mcp.leadmagic.io/mcp` (OAuth, `leadmagic://docs`) with four user-facing skills and commands. First run is the same LeadMagic browser sign-in for Cursor and Grok Bot; there is no second login page. Tool calls follow LeadMagic privacy and terms. We do not ship scraper claims.

## Community listing (cursor.directory Auto)

Cursor Marketplace (`/add-plugin leadmagic`, including Grok Bot Plugins) is separate from [cursor.directory](https://cursor.directory/plugins/new). Directory Auto GitHub scan follows [Agent Plugins 1.0.0](https://agent-plugins.org/schemas/1.0.0/plugin.schema.json): root `plugin.json`, `mcp.json`, `skills/`. This repo dual-publishes: Cursor Plugin files stay under `.cursor-plugin/`.

1. Open [cursor.directory/plugins/new](https://cursor.directory/plugins/new).
2. Sign in with GitHub or Google.
3. Paste `https://github.com/LeadMagic/leadmagic-cursor-plugin`.
4. Confirm auto-detect of Open Plugins components (root `plugin.json`, `mcp.json` / `.mcp.json`, `skills/*/SKILL.md`, `rules/*.mdc`, `agents/*.md`).
5. Click **Submit**. Do not open a data PR on `cursor/community-plugins`. A directory page is not Cursor Marketplace; do not add a badge that implies `/add-plugin leadmagic` already works.
