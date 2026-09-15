# OAuth setup and troubleshooting (Cursor and Grok Bot)

Enable the LeadMagic plugin. On first MCP use, **Cursor or Grok Bot** prompts OAuth against `https://mcp.leadmagic.io/mcp`. Sign in with your LeadMagic account in the browser (Google or email — the same account as [app.leadmagic.io](https://app.leadmagic.io)). There is **no second login page**. After you finish, return to the client that prompted you. Use a simple search or `validate-email` prompt to confirm the connection.

The bundled `mcp.json` and `.mcp.json` are byte-identical: Agent Plugins 1.0.0 `streamable-http` to `https://mcp.leadmagic.io/mcp`, with no headers, keys, commands, or extra servers. Cursor and Grok Bot discover OAuth from that URL and open the browser. LeadMagic MCP already returns the session to Cursor and Grok Bot; do not paste keys or add a custom callback. See [LeadMagic authentication](https://leadmagic.io/docs/mcp/authentication) and [Cursor MCP documentation](https://cursor.com/docs/mcp).

## Diagnose the stage that failed

| Observation | Next step |
| --- | --- |
| Plugin is missing | Reload; allow local imports; a marketplace copy with the same name wins. After listing, search LeadMagic in Cursor Plugins or Grok Bot Plugins (same catalog). |
| Browser shows LeadMagic sign-in | Expected. Complete it, then return to Cursor or Grok Bot. No second page. |
| Tools are missing | Enable LeadMagic MCP and finish browser sign-in. |
| `401` before sign-in | Expected OAuth challenge. Sign in through Cursor or Grok Bot. |
| `401` after sign-in | Reconnect LeadMagic OAuth. Do not paste an API key. |
| `402` on search or mobile | Separate product entitlement vs wallet; check billing in the app. |
| `403` with an account message | Read that message; do not retry indefinitely. |
| Browser callback fails | Record the Cursor or Grok Bot surface and sanitized error. Never share the callback query string. |

## Automated verification

`npm run verify:auth` uses three public GET requests: unauthenticated MCP, protected-resource metadata, and authorization-server metadata. It checks the Bearer challenge, resource, issuer, authorization-code, PKCE S256, and public-client support. It does **not** complete browser login or call paid tools.

A passing probe is not an end-to-end login. Complete [manual smoke tests](cursor-smoke-tests.md) after you sign in.

Keep tokens, codes, and customer records out of git. See [SECURITY.md](../SECURITY.md).
