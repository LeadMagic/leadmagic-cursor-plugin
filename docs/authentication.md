# Cursor OAuth setup and troubleshooting

Enable the LeadMagic plugin in Customize and complete the browser sign-in prompt for `https://mcp.leadmagic.io/mcp`. Use the free `check-credits` command to verify the account connection. Tool access is established only after successful OAuth sign-in.

The bundled configuration intentionally contains only the HTTP transport and hosted URL. Do not add REST API keys, static Authorization headers, client secrets, or tokens. Cursor handles OAuth discovery and the browser flow. See [LeadMagic authentication](https://leadmagic.io/docs/mcp/authentication) and [Cursor MCP documentation](https://cursor.com/docs/mcp).

## Diagnose the stage that failed

| Observation | Next step |
| --- | --- |
| Plugin is missing | Reload Cursor; check that local imports are allowed and a marketplace copy is not taking precedence. |
| Tools are missing | Enable the LeadMagic MCP connection in Customize and complete browser sign-in. Check for duplicate project/global LeadMagic definitions before editing configuration. |
| `401` before sign-in | Expected OAuth challenge. Sign in through Cursor. |
| `401` after sign-in | Reconnect the LeadMagic OAuth session. Do not replace it with a static key. |
| `403` with an account or balance message | Review that specific account message and the account's balance or permissions. |
| `403` with an edge/access-policy error | Report the status and sanitized request identifier to support; it does not necessarily mean insufficient credits. Do not retry indefinitely. |
| Browser callback fails | Record the Cursor surface and sanitized error. Never share the callback query string, which may contain a code or state value. |
| Health succeeds but auth discovery fails | Service liveness is not proof that OAuth is configured correctly. Run the auth probe and report its stage. |

## Automated verification

`npm run verify:auth` uses only three public GET requests: the unauthenticated MCP endpoint, its advertised protected-resource metadata, and the reviewed authorization-server metadata. It validates the Bearer challenge, resource identity, issuer, authorization-code support, PKCE S256, public-client support, and expected discovery endpoints. It does not follow arbitrary response URLs or print response bodies.

A passing probe does not verify client registration, browser consent, refresh tokens, revocation, or an authenticated tool call. Complete the [manual Cursor smoke tests](cursor-smoke-tests.md) for an end-to-end check. A provider endpoint change requires review before updating the expected discovery contract.

## Provider-side callback review

Cursor documents `http://localhost:8787/callback` for desktop and `https://www.cursor.com/agents/mcp/oauth/callback` for web/Agents. When diagnosing callback failures, verify the relevant surface's redirect handling with the provider. These are documented client callback URLs, not values to add to the plugin's MCP configuration. Do not weaken redirect validation or use wildcard callbacks to work around a failure.

Keep tokens, authorization codes, customer records, and unsanitized logs out of public issues and Git history. Send sanitized reports through the contact in [SECURITY.md](../SECURITY.md).
