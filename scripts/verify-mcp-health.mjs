#!/usr/bin/env node
/**
 * Optional smoke check: hosted LeadMagic MCP load balancer / health.
 * Does not authenticate to /mcp (OAuth or API key happens in Cursor).
 */
const healthUrl = "https://mcp.leadmagic.io/health";

const res = await fetch(healthUrl, { redirect: "follow" });
if (!res.ok) {
	console.error(`Expected 2xx from ${healthUrl}, got ${res.status}`);
	process.exit(1);
}
console.log(`OK: ${healthUrl} -> ${res.status}`);
