---
name: validate-work-email
description: Validates an existing work email for deliverability with LeadMagic. Use when the user already has an address from a CRM, list, or signup—not when they asked you to find an email.
---
# Validate work email

Front-door skill for **work email validate**. Prefer MCP `validate_work_email`.

## Workflow

1. Take the work email the user supplied. Do not invent a replacement address.
2. If a **fresh** LeadMagic finder result already includes validation, reuse it. Otherwise run `validate_work_email`.
3. Report the tool's status and any returned company context. Do not infer inbox guarantees beyond the response.
4. If validation is inconclusive, say so. Run `find_work_email` only when the user also asked to discover an email and you have name + company.

## Example

Request: “Is person@example.com a valid work email?”
Route: `validate_work_email`. Do not find a different person.

## Output

Email, stated validation status, relevant unknowns. Credits if returned.
