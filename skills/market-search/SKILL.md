---
name: market-search
description: Build bounded people, company, and jobs audiences with LeadMagic MCP, account-aware pricing, and cursor pagination.
---
# Market search

Use for audience building, account lists, and job searches. Read the connected tool schema and `leadmagic://docs` before choosing filters.

## Workflow

1. Define the audience, requested row count, and budget from the user's brief. Clarify missing scope before a large run; preserve authorization already given.
2. Check current account entitlements and use `preview_cost` and `check_credit_balance` when available. Do not assume probe searches are free or hard-code plan prices. Included search access still has usage and rate limits; enrichment, exports, and lookalikes can have separate charges.
3. Use available catalog tools to resolve filters. Select `search_people`, `search_companies`, or the appropriate jobs tool from the live tool list. Do not send app-only preview options to REST endpoints.
4. Page within the requested row and budget limits, keeping the same filters. Use the cursor fields and page-size limits supported by that tool; do not mix cursor pagination with a nonzero offset.
5. Stop at the requested count, exhausted results, missing or repeated next cursor, cancellation, or budget limit. Respect Retry-After on rate limits and bound retries. Deduplicate by stable identifiers.
6. Enrich only selected contacts and channels requested by the user. Reuse freshly validated finder emails without another validation call.

## Output

Return results or the requested output file, unique row count, filters, pages fetched, and whether the search completed or stopped early. Explain important unknowns. Recommend further enrichment separately; do not run it merely because a search returned contacts.
