---
name: find-mobile
description: Looks up a professional mobile number for a B2B contact from a work email or B2B profile URL. Use for authorized business contact research, not blasting or scraping.
---
# Find professional mobile

Front-door skill for **professional mobile lookup**. Prefer MCP `find_mobile_number`. This is licensed B2B contact data for outreach you are authorized to do — not a scrape and not a consumer-spam product.

## Workflow

1. Require a **work email** or **B2B profile URL**. Ask if both are missing. Do not guess numbers.
2. Preview cost when available. Mobile lookup is typically more expensive than email validation; confirm budget if the user has not.
3. Run `find_mobile_number` once with the supported identifier. Deduplicate identical inputs.
4. Report found / not found / entitlement errors honestly. A 402 can mean a separate mobile entitlement, not an empty overall wallet.
5. Treat returned numbers as confidential business data. Do not publish them into git or public docs.

## Example

Request: “Look up a professional mobile for this work email; I am authorized to contact them.”
Route: one `find_mobile_number` call. Return the tool result only.

## Output

Number if returned, status, credits if present, unknowns. No extra email or search work unless requested.
