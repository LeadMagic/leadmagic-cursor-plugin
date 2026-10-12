---
name: account-intelligence
description: Optional company brief after search. Use for firmographics, funding, tech stack, or open jobs at a named domain.
---
# Account intelligence (supporting)

Not a front-door skill. After search, if the user wants company context on **selected** accounts:

- Light brief → `research_account` (firmographics + funding) or `enrich_company`
- Full brief with tech stack and hiring → `account_intel` (preview cost first)
- Open roles only → `find_jobs` / `search_jobs`
- Funding or technographics only → `find_company_funding` / `get_company_technographics`

Prefer `company_domain`. Return tool facts only. Do not invent traffic, competitors, or capabilities LeadMagic does not expose.
