import test from "node:test";
import assert from "node:assert/strict";
import { verifyMcpAuth } from "../scripts/verify-mcp-auth.mjs";
const mcp = "https://mcp.leadmagic.io/mcp";
const resourceUrl = "https://mcp.leadmagic.io/.well-known/oauth-protected-resource/mcp";
const issuer = "https://app.leadmagic.io";
function fixture() {
  return {
    challenge: { status: 401, headers: { "www-authenticate": `Bearer resource_metadata="${resourceUrl}"` } },
    resource: { resource: mcp, authorization_servers: [issuer], bearer_methods_supported: ["header"] },
    auth: {
      issuer, response_types_supported: ["code"], grant_types_supported: ["authorization_code"],
      code_challenge_methods_supported: ["S256"], token_endpoint_auth_methods_supported: ["none"],
      authorization_endpoint: "https://clerk.leadmagic.io/oauth/authorize",
      token_endpoint: "https://mcp.leadmagic.io/oauth/token", registration_endpoint: "https://mcp.leadmagic.io/oauth/register",
    },
  };
}
function mock(f, calls = []) {
  return async (url, options) => {
    calls.push(url);
    assert.equal(options.redirect, "error");
    assert.equal(options.method, undefined);
    assert.equal(options.body, undefined);
    assert.equal(options.headers.Authorization, undefined);
    assert.ok(options.signal);
    if (url === mcp) return new Response(null, f.challenge);
    if (url === resourceUrl) return Response.json(f.resource);
    if (url === `${issuer}/.well-known/oauth-authorization-server`) return Response.json(f.auth);
    assert.fail("Unreviewed request destination");
  };
}
test("verifies public discovery with exactly three credential-free GETs", async () => {
  const calls = [];
  assert.match(await verifyMcpAuth(mock(fixture(), calls)), /OAuth discovery passed/);
  assert.equal(calls.length, 3);
});
for (const [name, mutate, expected] of [
  ["unprotected MCP", f => { f.challenge.status = 200; }, /expected an OAuth challenge/],
  ["edge denial", f => { f.challenge.status = 403; }, /HTTP 403/],
  ["foreign metadata URL", f => { f.challenge.headers["www-authenticate"] = 'Bearer resource_metadata="https://example.com/private"'; }, /expected Bearer/],
  ["wrong resource", f => { f.resource.resource = "https://example.com"; }, /resource/],
  ["foreign issuer", f => { f.resource.authorization_servers = ["https://example.com"]; }, /authorization server/],
  ["issuer mismatch", f => { f.auth.issuer = "https://example.com"; }, /issuer/],
  ["malformed PKCE metadata", f => { f.auth.code_challenge_methods_supported = "S256"; }, /S256/],
  ["missing PKCE", f => { f.auth.code_challenge_methods_supported = ["plain"]; }, /S256/],
  ["required client secret", f => { f.auth.token_endpoint_auth_methods_supported = ["client_secret_basic"]; }, /public clients/],
  ["unexpected token endpoint", f => { f.auth.token_endpoint = "http://example.com/token"; }, /token_endpoint/],
]) test(`rejects ${name}`, async () => {
  const f = fixture(); mutate(f);
  await assert.rejects(verifyMcpAuth(mock(f)), expected);
});
test("network errors do not echo response details or credentials", async () => {
  await assert.rejects(verifyMcpAuth(async () => { throw new Error("EXAMPLE_PRIVATE_VALUE"); }), error => /request failed/.test(error.message) && !error.message.includes("EXAMPLE_PRIVATE_VALUE"));
});
test("rejects HTML returned as successful discovery metadata", async () => {
  let count = 0;
  await assert.rejects(verifyMcpAuth(async () => ++count === 1 ? new Response(null, fixture().challenge) : new Response("<html>Sign in</html>", { headers: { "content-type": "text/html" } })), /must be JSON/);
});
