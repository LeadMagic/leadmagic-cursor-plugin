---
name: account-intelligence
description: Research a target company with the current hosted LeadMagic MCP surface. Use for account research, ICP qualification, and quick account briefs.
---
# Account intelligence

## Trigger
Use when the user wants company research, ICP fit, or a target account brief from LeadMagic's hosted MCP tools.

## Workflow
1. Resolve the company first with the cleanest identifier available:
   - company domain preferred,
   - otherwise company name.
2. Run `research_account` to establish the canonical account record.
3. When the user asks for a dedicated competitor list or tech stack, follow with `list_company_competitors` or `get_company_technographics`. Ad intelligence and other marketing APIs remain outside the hosted MCP tool set—say so if asked.
4. Keep the summary operator-friendly:
   - what the company is,
   - why it matters,
   - what LeadMagic could confirm,
   - and what should be researched next outside the current MCP scope.

## Output
Return a short account brief with:
- company basics,
- the most relevant GTM context available from `research_account`,
- any important unknowns,
- and the recommended next LeadMagic lookup if needed.
