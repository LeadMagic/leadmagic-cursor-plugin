---
name: contact-enrichment
description: Find or verify the best work email for a B2B prospect using the current hosted LeadMagic MCP surface. Use when the user has a person plus company or an existing email and wants validated outreach data.
---
# Contact enrichment

## Trigger
Use when the user needs a validated work email or wants LeadMagic to find the likely work email for a specific person.

## Workflow
1. Start from the strongest identifier the user already has.
   - Existing work email: validate it first with `validate_work_email`.
   - B2B profile URL (e.g. LinkedIn): use `linkedin_profile_to_work_email`; then validate if needed.
   - Work email or profile URL + wants phone: `find_mobile_number`.
   - Full name + company or domain: use `find_work_email`.
2. Prefer the cheapest path that can answer the question.
3. If the user already has an email, do not jump straight to finding another one.
4. Avoid duplicate requests for the same person and company combination.
5. Report both the result and what was not found.

## Recommended tool chains
- Existing email -> `validate_work_email`
- Existing email fails validation or no email exists -> `find_work_email`
- Name + company + wants work email -> `find_work_email`
- Person + company + wants confidence before spending more credits -> `check_credit_balance` -> `find_work_email`
- Recent role change signal -> `detect_job_change` (email, profile URL, or name + company)

## Output
Return:
- best contact field found,
- validation status when available,
- the exact input used,
- and a concise next action.
