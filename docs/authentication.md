# Cursor OAuth setup and troubleshooting

Enable the LeadMagic plugin in Customize. On first MCP use, **Cursor** prompts OAuth (DCR + PKCE). Complete **Clerk** in the browser — same LeadMagic Clerk application as [app.leadmagic.io](https://app.leadmagic.io) (Google or email). After you finish, return to Cursor. Use a simple search or `validate-email` prompt to confirm the connection.

The bundled `mcp.json` contains only HTTP transport and `https://mcp.leadmagic.io/mcp`. Do not add REST API keys, `X-API-Key`, static Authorization headers, client secrets, or tokens. Cursor discovers RFC 9728 protected-resource metadata, then RFC 8414 authorization-server metadata (`issuer` `https://app.leadmagic.io`; login UI is Clerk Hosted Pages / Account Portal). Opening `https://mcp.leadmagic.io/` in a browser redirects to [app.leadmagic.io/sign-in](https://app.leadmagic.io/sign-in) (same Clerk app) — not an MCP marketing page. See [LeadMagic authentication](https://leadmagic.io/docs/mcp/authentication) and [Cursor MCP documentation](https://cursor.com/docs/mcp).

## Diagnose the stage that failed

| Observation | Next step |
| --- | --- |
| Plugin is missing | Reload Window; allow local imports; a marketplace copy with the same name wins. |
| Browser shows Clerk / LeadMagic sign-in | Expected (same Clerk app as the product). Complete it, then return to Cursor. |
| Tools are missing | Enable LeadMagic MCP in Customize and finish browser sign-in. |
| `401` before sign-in | Expected OAuth challenge. Sign in through Cursor. |
| `401` after sign-in | Reconnect LeadMagic OAuth. Do not paste an API key. |
| `402` on search or mobile | Separate product entitlement vs wallet; check billing in the app. |
| `403` with an account message | Read that message; do not retry indefinitely. |
| Browser callback fails | Record the Cursor surface and sanitized error. Never share the callback query string. |

## Automated verification

`npm run verify:auth` uses three public GET requests: unauthenticated MCP, protected-resource metadata, and authorization-server metadata. It checks Bearer challenge, resource, issuer (`https://app.leadmagic.io`), Clerk `authorization_endpoint`, authorization-code, PKCE S256, and public-client support. It does **not** complete Clerk login or call paid tools.

A passing probe is not an end-to-end login. Complete [manual smoke tests](cursor-smoke-tests.md) after you sign in.

Keep tokens, codes, and customer records out of git. See [SECURITY.md](../SECURITY.md).
