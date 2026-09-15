---
name: find-work-email
description: Finds a validated B2B work email from a person's name and company, or from a B2B profile URL. Use when the user needs a work email, not validation of an address they already have.
---
# Find work email

Front-door skill for **work email find**. Prefer MCP `find_work_email`. A finder result is already validated — do not chain `validate_work_email` on it.

## Workflow

1. Collect the strongest identifiers: first and last name plus company domain, or a **B2B profile URL**.
2. Preview cost when available. Run one lookup. Deduplicate identical inputs.
3. Name + company/domain → `find_work_email`. B2B profile URL → `b2b_profile_to_work_email` if advertised, else the same finder if the schema accepts `profile_url`.
4. Report the tool status (found / not found / inconclusive). Never invent an address.
5. Do not add professional mobile or extra profile enrichment unless the user asked.

## Example

Request: “Find Alex Example's work email at example.com.”
Route: `find_work_email` with name and domain. Return the result or not-found status.

## Output

Requested work email, stated status, credits if returned, unknowns.
