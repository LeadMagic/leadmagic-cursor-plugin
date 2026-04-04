---
name: check-credits
description: Verify LeadMagic MCP is connected and show remaining credits using the hosted MCP tool.
---

# Check LeadMagic credits

1. Confirm the LeadMagic MCP server is enabled in Cursor and you are signed in (OAuth) or using API-key mode per the plugin README.
2. Ask the agent to run the MCP tool `check_credit_balance` and report the balance and any message returned.
3. If the tool errors, check MCP settings, `https://mcp.leadmagic.io/health`, and the troubleshooting section in the plugin README.
