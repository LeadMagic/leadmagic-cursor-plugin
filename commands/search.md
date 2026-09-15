---
name: search
description: Search LeadMagic people, companies, or jobs in Cursor or Grok Bot, then enrich only selected rows if asked.
---

# Search

OAuth MCP `https://mcp.leadmagic.io/mcp` — one browser sign-in, no keys.

1. Confirm **people**, **companies**, or **jobs**, plus filters and a row limit. Prefer company domain. Optionally run `check_credit_balance` first.
2. Use MCP `search_people`, `search_companies`, or `find_jobs` / `search_jobs`. Preview cost when available.
3. Return the rows. If the user wants work emails or professional mobile, look those up only for **named or agreed rows** — not the whole result set.
