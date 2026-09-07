#!/usr/bin/env node
import path from "node:path";
import { fileURLToPath } from "node:url";

const MCP = "https://mcp.leadmagic.io/mcp";
const RESOURCE_METADATA = "https://mcp.leadmagic.io/.well-known/oauth-protected-resource/mcp";
const ISSUER = "https://app.leadmagic.io";
const AUTH_METADATA = `${ISSUER}/.well-known/oauth-authorization-server`;
function assert(condition, message) { if (!condition) throw new Error(message); }
function supports(values, value) { return Array.isArray(values) && values.includes(value); }

// Public GETs only: never registers a client, exchanges a token, or calls paid tools.
export async function verifyMcpAuth(fetchImpl = fetch) {
  async function get(url) {
    try {
      return await fetchImpl(url, {
        headers: { Accept: "application/json, text/event-stream" },
        redirect: "error", signal: AbortSignal.timeout(10000),
      });
    } catch {
      throw new Error("OAuth discovery request failed: check network, redirects, or service availability.");
    }
  }
  async function json(url) {
    const res = await get(url);
    assert(res.status === 200, `OAuth metadata returned HTTP ${res.status}; check service or access-policy errors.`);
    assert(/application\/(?:[a-z0-9.+-]+\+)?json\b/i.test(res.headers.get("content-type") || ""), "OAuth metadata must be JSON.");
    let data;
    try { data = await res.json(); } catch { throw new Error("OAuth metadata is not valid JSON."); }
    assert(data && typeof data === "object" && !Array.isArray(data), "OAuth metadata must be an object.");
    return data;
  }
  const challenge = await get(MCP);
  assert(challenge.status === 401, `Unauthenticated MCP returned HTTP ${challenge.status}; expected an OAuth challenge (401).`);
  await challenge.body?.cancel();
  const header = challenge.headers.get("www-authenticate") || "";
  const metadataUrl = header.match(/\bresource_metadata="([^"]+)"/i)?.[1];
  assert(/^Bearer\s/i.test(header) && metadataUrl === RESOURCE_METADATA, "MCP must advertise the expected Bearer resource metadata.");
  // Use fixed reviewed URLs, not arbitrary URLs supplied by network responses.
  const resource = await json(RESOURCE_METADATA);
  assert(["https://mcp.leadmagic.io/", MCP].includes(resource.resource), "OAuth resource does not identify LeadMagic MCP.");
  assert(Array.isArray(resource.authorization_servers) && resource.authorization_servers.length === 1 && resource.authorization_servers[0] === ISSUER, "Unexpected OAuth authorization server.");
  assert(supports(resource.bearer_methods_supported, "header"), "OAuth must support Bearer headers.");
  const auth = await json(AUTH_METADATA);
  assert(auth.issuer === ISSUER, "OAuth issuer does not match the advertised server.");
  assert(supports(auth.response_types_supported, "code"), "OAuth authorization-code flow is missing.");
  assert(supports(auth.grant_types_supported, "authorization_code"), "OAuth authorization-code grant is missing.");
  assert(supports(auth.code_challenge_methods_supported, "S256"), "OAuth must advertise PKCE S256.");
  assert(supports(auth.token_endpoint_auth_methods_supported, "none"), "OAuth must support public clients without a bundled secret.");
  for (const [field, expected] of Object.entries({
    authorization_endpoint: "https://clerk.leadmagic.io/oauth/authorize",
    token_endpoint: "https://mcp.leadmagic.io/oauth/token",
    registration_endpoint: "https://mcp.leadmagic.io/oauth/register",
  })) assert(auth[field] === expected, `Unexpected OAuth ${field}; review the provider configuration.`);
  return "OAuth discovery passed: Bearer challenge, resource, issuer, PKCE S256, and public-client registration metadata. Browser sign-in remains a separate check.";
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { console.log(await verifyMcpAuth()); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
