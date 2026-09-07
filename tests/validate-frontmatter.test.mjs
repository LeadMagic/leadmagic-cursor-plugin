import test from "node:test";
import assert from "node:assert/strict";
import { validateFrontmatter } from "../scripts/validate-frontmatter.mjs";
const options = { label: "fixture/SKILL.md", kind: "skill", expectedName: "fixture" };
const document = (fields, body = "# Instructions\n\nDo the requested work.") => `---\n${fields}\n---\n${body}`;
const valid = "name: fixture\ndescription: A focused workflow";
test("accepts folded descriptions, CRLF, and typed invocation controls", () => {
  const data = validateFrontmatter(document("name: fixture\ndescription: >-\n  Does a task.\n  Use for a specific request.\ndisable-model-invocation: true\nicon: shield\ncolor: purple").replace(/\n/g, "\r\n"), options);
  assert.equal(data.description, "Does a task. Use for a specific request.");
  assert.equal(data["disable-model-invocation"], true);
});
for (const [name, fields, expected] of [
  ["duplicate keys", `${valid}\nname: fixture`, /Invalid YAML/],
  ["malformed YAML", "name: fixture\ndescription: [", /Invalid YAML/],
  ["nested description", "name: fixture\ndescription:\n  text: hello", /Description/],
  ["empty description", "name: fixture\ndescription: ''", /Description/],
  ["oversized description", `name: fixture\ndescription: ${"x".repeat(1025)}`, /Description/],
  ["folder mismatch", "name: another\ndescription: Does a task", /Name must match/],
  ["invalid name", "name: Invalid_Name\ndescription: Does a task", /kebab-case/],
  ["string boolean", `${valid}\ndisable-model-invocation: 'false'`, /must be a boolean/],
  ["invalid badge", `${valid}\ncolor: invalid`, /badge color/],
  ["alias", "name: &n fixture\ndescription: *n", /aliases/],
]) test(`rejects ${name}`, () => assert.throws(() => validateFrontmatter(document(fields), options), expected));
test("rejects empty body and missing frontmatter", () => {
  assert.throws(() => validateFrontmatter(document(valid, ""), options), /Instructions/);
  assert.throws(() => validateFrontmatter("# No metadata", options), /Missing YAML/);
});
test("rule scope must be an actual boolean", () => {
  const rule = { label: "rule.mdc", kind: "rule" };
  assert.equal(validateFrontmatter(document("description: Scoped rule\nalwaysApply: false"), rule).alwaysApply, false);
  assert.throws(() => validateFrontmatter(document("description: Scoped rule\nalwaysApply: 'false'"), rule), /boolean/);
  assert.throws(() => validateFrontmatter(document("description: Scoped rule"), rule), /explicitly/);
});
test("diagnostics do not echo malformed frontmatter values", () => {
  assert.throws(() => validateFrontmatter(document("name: fixture\ndescription: [EXAMPLE_PRIVATE_VALUE"), options), error => !error.message.includes("EXAMPLE_PRIVATE_VALUE"));
});
