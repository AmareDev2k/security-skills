---
name: setup-security-skills
description: Configure the security skills for a repository by recording its stack, authentication, hosting, report location, severity scale, incident owner, and available scanners in SECURITY-CONTEXT.md. Use once before the other security skills, or when the user asks to configure, set up, or reconfigure security skills. Do not use for a one-off security review without repository configuration.
disable-model-invocation: true
---

# Setup Security Skills

Create (or update) `SECURITY-CONTEXT.md` at the repo root. Every other skill in this set reads it if it exists.

## Examples

Use this skill for:

- "Set up the security skills for this repository."
- "Where should our security reports live?"
- "Reconfigure the project's security context."

Do not use this skill for:

- Reviewing a pull request; use `/security-review`.
- Responding to an active incident; use `/incident-response`.
- Updating installed skill files; use `npx skills update`.

## Process

1. Look before you ask. Detect: language/framework (`package.json`, `requirements.txt`, `pyproject.toml`, `pom.xml`), auth approach, deployment target (Vercel, Docker, etc.), and which scanners are already available (`npm audit`, `pip-audit`, `gitleaks`, `semgrep`, `trivy`, GitHub Dependabot).
2. Ask the user **one question at a time**, only for what you could not detect:
   - Where should security reports be saved? Default: `docs/security/`.
   - What is the worst realistic outcome if this app is compromised (customer data, payments, nothing important)? This sets the bar for the severity scale.
   - Who handles incidents (name or role)?
3. Write `SECURITY-CONTEXT.md` using the template below. Keep it under 60 lines.
4. Tell the user which scanners are missing and how to install them. Do not install anything without asking.

## Template

```markdown
# Security Context

## Stack
- Backend: ...
- Frontend: ...
- Auth: ...
- Hosting / secrets store: ...

## What we protect
<one or two lines: the data and actions that matter most>

## Severity scale
- Critical: unauthenticated access to data or code execution
- High: authenticated user can access other users' data or escalate privileges
- Medium: needs unusual conditions, or limited blast radius
- Low: hardening gap, no direct exploit path

## Scanners available
- ...

## Where things live
- Reports: docs/security/
- Threat model: docs/security/threat-model.md
- Incident owner: ...
```
