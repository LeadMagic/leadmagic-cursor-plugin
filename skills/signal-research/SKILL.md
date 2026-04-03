---
name: signal-research
description: Use LeadMagic account research to find the strongest currently supported account context and GTM timing clues. Use for account prioritization, market mapping, and outbound angle creation within the hosted MCP surface.
---
# Signal research

## Trigger
Use when the user wants evidence that an account is relevant now and needs a concise LeadMagic-backed research summary.

## Workflow
1. Confirm the company identity first.
2. Use `research_account` to collect the strongest current account context LeadMagic can provide through MCP.
3. Synthesize the results into GTM implications, not just raw data.
4. Highlight uncertainty when signals are partial or the hosted MCP surface does not expose the exact field the user wants.
5. Stay within the hosted MCP tools. Competitors and technographics are available via `list_company_competitors` and `get_company_technographics`. Job postings and ad intelligence are not in MCP—point to the REST docs if the user needs those.

## Output
Return:
- top account signals or context found,
- what they likely mean for GTM timing,
- a recommended outreach angle or research follow-up,
- and any missing data the user may still want.
