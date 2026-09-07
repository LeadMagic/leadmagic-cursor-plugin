import { parseDocument } from "yaml";

export function validateFrontmatter(text, { label, kind, expectedName }) {
  const fail = message => { throw new Error(`${label}: ${message}`); };
  const normalized = text.replace(/\r\n/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  if (!match) fail("Missing YAML frontmatter");
  const doc = parseDocument(match[1], { uniqueKeys: true });
  // Do not echo YAML contents: malformed input could contain a pasted credential.
  if (doc.errors.length || doc.warnings.length) fail("Invalid YAML frontmatter");
  let data;
  try { data = doc.toJS({ maxAliasCount: 0 }); }
  catch { fail("YAML aliases are not supported"); }
  if (!data || typeof data !== "object" || Array.isArray(data)) fail("Frontmatter must be a mapping");
  if (typeof data.description !== "string" || !data.description.trim() || data.description.length > 1024) {
    fail("Description must contain 1–1024 characters");
  }
  if (kind !== "rule") {
    if (typeof data.name !== "string" || data.name.length > 64 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.name)) {
      fail("Name must be lowercase kebab-case, at most 64 characters");
    }
    if (data.name !== expectedName) fail("Name must match its skill directory or component filename");
  }
  const booleanKey = kind === "rule" ? "alwaysApply" : "disable-model-invocation";
  if (booleanKey in data && typeof data[booleanKey] !== "boolean") fail(`${booleanKey} must be a boolean`);
  if (kind === "rule" && !("alwaysApply" in data)) fail("Rule must declare alwaysApply explicitly");
  if (kind === "skill") {
    if ("icon" in data && (typeof data.icon !== "string" || !data.icon.trim())) fail("Icon must be a nonempty string");
    if ("color" in data && !["default", "green", "cyan", "blue", "purple", "magenta", "orange", "yellow", "red", "brand"].includes(data.color)) fail("Unsupported skill badge color");
  }
  const body = normalized.slice(match[0].length).trim();
  if (!body) fail("Instructions must not be empty");
  if (kind === "skill" && body.split("\n").length >= 500) fail("Keep skill instructions under 500 lines");
  return data;
}
