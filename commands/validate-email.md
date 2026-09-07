---
name: validate-email
description: Validate a work email with LeadMagic MCP before sending or storing it as verified.
---

# Validate a work email

1. Obtain the **work email** the user wants checked.
2. Reuse a fresh LeadMagic finder validation result if already available. Otherwise run `validate_work_email` via MCP with that email.
3. Report the tool’s stated result and any fields returned (do not infer beyond the response).
4. If validation is inconclusive, report that outcome. Run `find_work_email` only if discovery is also requested and the required person and company inputs are available.
