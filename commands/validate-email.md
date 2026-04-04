---
name: validate-email
description: Validate a work email with LeadMagic MCP before sending or storing it as verified.
---

# Validate a work email

1. Obtain the **work email** the user wants checked.
2. Run `validate_work_email` via MCP with that email.
3. Report the tool’s stated result and any fields returned (do not infer beyond the response).
4. If validation is inconclusive or the user still needs an address, consider `find_work_email` only when they provide person + company context.
