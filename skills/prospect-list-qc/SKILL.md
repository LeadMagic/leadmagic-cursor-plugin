---
name: prospect-list-qc
description: Clean and enrich prospect lists with a credit-aware workflow using the current LeadMagic MCP tools. Use when the user is preparing outbound lists, CRM imports, or enrichment jobs and wants the best validation-first sequence.
---
# Prospect list QA and enrichment

## Trigger
Use when the user has many prospects and wants the highest-confidence sequence for work email validation, work email discovery, or company research.

## Workflow
1. For large or credit-sensitive lists, start with `check_credit_balance` so the user knows the budget envelope.
2. Prioritize validation before expensive enrichment whenever emails already exist.
3. Separate records into buckets:
   - already have work email -> `validate_work_email`,
   - have B2B profile URL -> `linkedin_profile_to_work_email` then validate if needed,
   - have email or profile + need phone -> `find_mobile_number`,
   - have name + company only -> `find_work_email`,
   - company-only records -> `research_account`; add `list_company_competitors` or `get_company_technographics` when the list needs those angles.
4. Remove duplicates before enrichment.
5. Preserve null and unknown outcomes instead of forcing guesses.
6. Recommend the cheapest sensible order of operations before bulk runs.

## Default order
1. `check_credit_balance`
2. `validate_work_email`
3. `find_work_email`
4. `research_account` only for priority accounts that also need account context

## Output
Provide:
- a suggested enrichment pipeline,
- likely credit-sensitive decision points,
- and an example record flow from raw input to final output using only the currently supported MCP tools.
