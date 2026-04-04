# Changelog

All notable changes to the LeadMagic Cursor plugin package are documented here.

## 0.1.6

- **Cursor plugin model:** Add `agents/leadmagic-enrichment.md` and `commands/` (`check-credits`, `research-company`, `validate-email`); wire `agents` and `commands` in `plugin.json` to match patterns used by plugins such as [encoredev/cursor-plugin](https://github.com/encoredev/cursor-plugin).
- **Validation:** Assert agent/command markdown frontmatter; README links to [Cursor Plugins docs](https://cursor.com/docs/plugins).

## 0.1.5

- **Docs:** README clarifies MCP (Cursor) vs REST (OpenAPI), links [leadmagic-openapi](https://github.com/LeadMagic/leadmagic-openapi) and product docs; validator and CI require the OpenAPI repo URL in README.

## 0.1.4

- **Auth:** Default `mcp.json` uses OAuth only (no headers); Cursor signs in with LeadMagic. README documents optional `x-leadmagic-key` + `${LEADMAGIC_API_KEY}` for API-key mode.
- **CI:** `npm run check` runs validate plus `verify:health` against `https://mcp.leadmagic.io/health`; redundant `mcp.json` inline checks removed (covered by validate).

## 0.1.3

- **MCP:** Hosted server at `https://mcp.leadmagic.io/mcp` — 10 tools, shared docs resource `leadmagic://docs`, prompts `account_research` and `contact_lookup`.
- **Auth:** `mcp.json` uses header `x-leadmagic-key` with `${LEADMAGIC_API_KEY}`.
- **Bundle:** Default rule, four skills (contact enrichment, account intelligence, prospect list QA, signal research), validation script, and GitHub Actions CI.
- **Docs:** README includes data handling and links to privacy, terms, and support; `SUBMISSION.md` marketplace copy matches the MCP tool surface.
