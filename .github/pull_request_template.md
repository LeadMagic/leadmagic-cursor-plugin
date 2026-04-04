# Pull Request

## Summary

<!-- What changed and why? -->

## Type Of Change

- [ ] Documentation
- [ ] Skills or rules
- [ ] MCP config or metadata
- [ ] Validation or GitHub automation
- [ ] Other maintenance

## Validation

- [ ] Ran `npm run validate` (or `npm run check` to include hosted health)
- [ ] Checked that copy matches the current hosted MCP surface
- [ ] Verified no secrets or hardcoded API keys were added (no `.env` with real keys; see [SECURITY.md](../SECURITY.md))

## Alignment Checklist

- [ ] `mcp.json` still points to `https://mcp.leadmagic.io/mcp`
- [ ] Default `mcp.json` stays OAuth-only (no headers); API-key fallback documented in README if needed
- [ ] New or edited `agents/*.md` and `commands/*.md` include YAML frontmatter (`name`, `description`)
- [ ] Repo copy does not imply MCP support for tools outside the current MCP surface
- [ ] README and submission copy stay consistent

## Notes For Reviewers

<!-- Anything reviewers should pay extra attention to? -->
