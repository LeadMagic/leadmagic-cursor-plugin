---
name: find-work-email
description: Find a validated work email from a person and company, or from a B2B profile URL, via LeadMagic MCP in Cursor or Grok Bot.
---

# Find a work email

Hosted MCP is OAuth at `https://mcp.leadmagic.io/mcp` in Cursor and Grok Bot. Same first-run browser sign-in; no API key and no second login page.

1. Collect **name + company domain**, or a **B2B profile URL**.
2. Run MCP `find_work_email` (or `b2b_profile_to_work_email` when the input is a B2B profile URL).
3. Report found / not found from the tool. Do not validate a fresh finder result again. Do not invent an address.
