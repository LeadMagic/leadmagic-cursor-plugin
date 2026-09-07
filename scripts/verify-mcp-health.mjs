#!/usr/bin/env node
// Public liveness only; authenticated MCP access is verified in Cursor via OAuth.
const healthUrl = "https://mcp.leadmagic.io/health";
try {
  const res = await fetch(healthUrl, { redirect: "error", signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  console.log(`OK: ${healthUrl} -> ${res.status}`);
} catch (error) {
  console.error(`Hosted health check failed (${error.name === "TimeoutError" ? "10-second timeout" : error.message}). Check service availability and network access.`);
  process.exitCode = 1;
}
