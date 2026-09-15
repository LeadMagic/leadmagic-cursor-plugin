---
name: validate-email
description: Validate an existing work email with LeadMagic MCP in Cursor or Grok Bot.
---

# Validate a work email

Hosted MCP is OAuth at `https://mcp.leadmagic.io/mcp` in Cursor and Grok Bot. Same first-run browser sign-in; no API key and no second login page.

1. Take the **work email** the user already has.
2. Run `validate_work_email` unless a fresh LeadMagic finder result already includes validation.
3. Report the tool’s status only. Do not find a different email unless the user asked.
