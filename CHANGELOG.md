# Changelog

All notable changes to the LeadMagic Cursor plugin will be documented in this file.

## [Unreleased]

### Changed
- SUBMISSION.md and README aligned with the full 10-tool MCP surface; added data/privacy/terms disclosure for marketplace review.
- Quick Start: fixed heading levels under local install steps.
- Plugin version 0.1.3.
- README, rules, and skills describe the expanded hosted MCP tool set (mobile, LinkedIn-to-email, job change, competitors, technographics, people-by-role).
- Rules: avoid speculative deliverability or catch-all commentary; stick to tool output for validation.
- Aligns with hosted MCP email-validation summaries that surface `email_status` correctly.

### Added
- Initial public Cursor plugin package structure
- Hosted MCP configuration for `https://mcp.leadmagic.io/mcp`
- Skills, rules, validation script, and marketplace submission copy

### Changed
- Synced repository copy to the current LeadMagic MCP surface: 10 tools, 1 docs resource (`leadmagic://docs`), and 2 built-in prompts
- Removed wording that implied MCP support for ad-search endpoints that are part of the REST API but not the current MCP tool surface
- Tightened skills and default guidance around company research, job-change checks, hiring signals, and credit-aware workflows
- Added GitHub pull request and validation scaffolding so the plugin repo matches the OpenAPI repo's baseline maintenance hygiene
- Expanded README and submission docs with clearer install, validation, troubleshooting, and marketplace submission steps
- Tightened plugin metadata and marketplace submission copy around the current hosted MCP surface: work email validation, work email finding, account research, and credit-aware enrichment
- Added the shared plugin contact email to `plugin.json` and `SUBMISSION.md` for a cleaner publisher-facing package
- Corrected rules and skill guidance so they reference only the currently supported hosted MCP tools instead of older or broader API-only tool names
