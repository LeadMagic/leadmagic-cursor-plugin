---
name: market-search
description: Searches LeadMagic people, companies, and jobs. Use for audience lists, then optionally enrich only selected rows with work email or professional mobile.
---
# Search people, companies, and jobs

Front-door skill for **search**. Prefer hosted MCP. Licensed B2B coverage, not scraping. Search first; contact unlock is a second, explicit step on **selected** rows only.

## Workflow

1. Confirm entity (people, companies, or jobs), filters, row limit, and credit authorization. Prefer `company_domain` when you have it.
2. Call `check_credit_balance` and `preview_cost` when available. Search and enrichment can be **separate entitlements**; report a 402 honestly.
3. Route from the live schema:
   - People at a company → `search_people`
   - Companies → `search_companies`
   - Open roles → `find_jobs` or `search_jobs`
4. Page with cursor fields. Do not mix a cursor with a nonzero offset. Stop at the requested count, exhausted results, or budget.
5. If the user then wants work emails or professional mobile, enrich **only the rows they named** (or a small agreed subset). Use `find_work_email` / `b2b_profile_to_work_email` and `find_mobile_number`. Do not unlock every search hit. Results stay in chat as markdown.

## Example

Request: “Find up to 20 companies like example.com in the US.”
Route: `search_companies`. Return rows. If they then say “work emails for the first three,” run finder three times only.

## Output

Rows (or a short markdown table), unique count, filters, and whether search completed. Contact fields only when requested and actually looked up.
