# Cursor marketplace submission copy

Use these values at [cursor.com/marketplace/publish](https://cursor.com/marketplace/publish). Jesse must be signed in; **this repo cannot submit the form**.

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
Official LeadMagic plugin for Cursor. Search people, companies, and jobs; find and validate work emails; look up professional mobile numbers via the hosted MCP surface with OAuth in Cursor.

**GitHub repository**  
https://github.com/LeadMagic/leadmagic-cursor-plugin

**Website URL**  
https://leadmagic.io

**Category**  
integrations

**Install command (once listed)**  
`/add-plugin leadmagic`

## Submission checklist

1. Public repo on `main` at the GitHub URL above.
2. `.cursor-plugin/marketplace.json` `"source": "."`, metadata.version `1.0.4`, **no** `logo`/`category` on the plugin entry.
3. `plugin.json` `1.0.4`, category `integrations`, logo `assets/logo.svg`.
4. `npm ci && npm test && npm run validate`.
5. Local play: `npm run install:local`, Reload Window, LeadMagic OAuth in the browser.
6. Submit at cursor.com/marketplace/publish while logged in as Jesse.

## AE blurb

LeadMagic for Cursor is hosted MCP with OAuth in Cursor — no API keys in the plugin. Four features: people/company/jobs search, work-email find, work-email validate, professional mobile. Same class of B2B contact intelligence as enterprise GTM data platforms, not a scraper. Please list us so `/add-plugin leadmagic` works. Contact plugins@leadmagic.io.

## Reviewer note

This plugin packages `https://mcp.leadmagic.io/mcp` (OAuth, `leadmagic://docs`) with four user-facing skills and commands. Tool calls follow LeadMagic privacy and terms. We do not ship scraper claims.

## Community listing (after Cursor Marketplace)

Do **not** submit to a third-party index until Cursor Marketplace has listed this plugin and `/add-plugin leadmagic` works. A directory page is not a marketplace listing; do not add a badge that implies we are already listed.

When official listing is live:

1. Open [cursor.directory/plugins/new](https://cursor.directory/plugins/new) (Cursor Directory, the current community plugin index; source process: [cursor/community-plugins](https://github.com/cursor/community-plugins)).
2. Sign in with GitHub or Google.
3. Paste `https://github.com/LeadMagic/leadmagic-cursor-plugin`.
4. Confirm auto-detect of Open Plugins components (`.mcp.json`, `skills/*/SKILL.md`, `rules/*.mdc`, `agents/*.md`). Cursor itself still uses `mcp.json`; `.mcp.json` is a byte-identical copy for directory detection.
5. Click **Submit**. Do not open a data PR on `cursor/community-plugins`.
