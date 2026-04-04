# Cursor marketplace submission copy

Use the following values in the Cursor marketplace publisher form.

## Form fields

**Organization name**
LeadMagic

**Organization handle**
leadmagic

**Unique namespace**
@leadmagic

**Contact email**
plugins@leadmagic.io

**Logotype URL**
https://raw.githubusercontent.com/LeadMagic/leadmagic-cursor-plugin/main/assets/logo.svg

**Description**
Official LeadMagic plugin for Cursor. Gives agents direct access to LeadMagic's hosted MCP surface for work email validation and discovery, mobile lookup, LinkedIn profile to work email, job-change detection, account research, competitor and technographics lists, people-by-role search, and credit balance—authenticated by default with OAuth in Cursor, with an optional API-key path for advanced setups. Includes skills, rules, a dedicated enrichment agent, and command playbooks aligned with Cursor's plugin model.

**GitHub repository**
https://github.com/LeadMagic/leadmagic-cursor-plugin

**Website URL**
https://leadmagic.io

## Submission checklist

Before submitting:

1. Make sure the repository is public at `https://github.com/LeadMagic/leadmagic-cursor-plugin`.
2. Make sure `assets/logo.svg` is committed on `main`.
3. Confirm the public logo URL resolves:
   `https://raw.githubusercontent.com/LeadMagic/leadmagic-cursor-plugin/main/assets/logo.svg`
4. Run `npm ci`.
5. Run `npm run check` (or `npm run validate` if you are offline).
6. If you want to test the package in Cursor first, run `npm run install:local` and reload Cursor with `Developer: Reload Window`.

## Suggested reviewer note

LeadMagic is an API-first B2B enrichment platform for AI agents and GTM engineers. This plugin packages our hosted MCP integration (10 tools, `leadmagic://docs`, two prompts) into a Cursor-native repo with focused skills, a dedicated enrichment agent, command playbooks, safe default guidance, and OAuth-first MCP auth (optional `LEADMAGIC_API_KEY` header for environments that need it). Tool calls are processed per LeadMagic privacy and terms at leadmagic.io.

## Short marketplace blurb alternatives

### Option A
Official LeadMagic plugin for Cursor. Validate and find work emails, look up mobile numbers, resolve emails from B2B profiles, detect job changes, research accounts, list competitors and tech stack signals, find people by role, and check credits—inside Cursor.

### Option B
B2B enrichment for Cursor agents via LeadMagic's hosted MCP: emails, mobile, profiles, job changes, account intel, competitors, technographics, role search, and credit-aware usage.

### Option C
Connect Cursor to LeadMagic for agent-native contact and account workflows backed by LeadMagic's hosted MCP and OAuth sign-in (API key optional).
