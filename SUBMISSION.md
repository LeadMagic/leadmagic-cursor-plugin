# Cursor / Grok Bot marketplace submission copy

Use these values at [cursor.com/marketplace/publish](https://cursor.com/marketplace/publish). **Grok Bot Plugins is the same catalog.** Jesse must be signed in; **this repo cannot submit the form**.

Plugin entries in `.cursor-plugin/marketplace.json` may only have `name`, `source`, `description`, and `minClientVersions`. `logo` and `category` belong on `.cursor-plugin/plugin.json`.

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
Cursor `3.13.0` and Grok Bot `0.49.0`. Same OAuth MCP: `https://mcp.leadmagic.io/mcp`. Public-client DCR + PKCE. One Hosted sign-in page; no second login.

## Checklist

1. Public `main` at the GitHub URL above.
2. Marketplace `"source": "."`, version `1.0.5`, `minClientVersions` cursor `3.13.0` / grokbot `0.49.0`.
3. `.cursor-plugin/plugin.json` plus root `plugin.json` (Agent Plugins 1.0.0).
4. `npm ci && npm test && npm run validate`.
5. Submit at cursor.com/marketplace/publish as Jesse.

## AE blurb

LeadMagic for Cursor and Grok Bot is hosted MCP with OAuth — no API keys. Four features: search, work-email find, work-email validate, professional mobile. Please list us so `/add-plugin leadmagic` works. Contact plugins@leadmagic.io.

## Reviewer note

Packages `https://mcp.leadmagic.io/mcp` (OAuth, `leadmagic://docs`) with four skills and commands. First run is one LeadMagic browser sign-in for Cursor and Grok Bot.

## Community listing (cursor.directory Auto)

Directory Auto GitHub scan follows [Agent Plugins 1.0.0](https://agent-plugins.org/schemas/1.0.0/plugin.schema.json): root `plugin.json`, `mcp.json`, `skills/`. Cursor Plugin files stay under `.cursor-plugin/`.

1. Open [cursor.directory/plugins/new](https://cursor.directory/plugins/new).
2. Sign in with GitHub or Google.
3. Paste `https://github.com/LeadMagic/leadmagic-cursor-plugin`.
4. Confirm auto-detect (root `plugin.json`, `mcp.json`, `skills/*/SKILL.md`, `rules/*.mdc`, `agents/*.md`).
5. Submit. A directory page is not Cursor Marketplace.
