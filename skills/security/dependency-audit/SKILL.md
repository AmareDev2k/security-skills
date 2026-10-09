---
name: dependency-audit
description: Audit project dependencies for known vulnerabilities, abandoned packages, and supply-chain risk, then propose safe upgrades. Use when the user asks about vulnerable packages, npm audit, pip-audit, Dependabot alerts, outdated libraries, or before a release or deploy.
---

# Dependency Audit

## Process

1. Detect ecosystems from lockfiles and manifests (`package-lock.json`, `pnpm-lock.yaml`, `requirements.txt`, `poetry.lock`, `pom.xml`, `go.sum`).
2. Run the native auditor for each, if available: `npm audit` / `pnpm audit`, `pip-audit`, `mvn org.owasp:dependency-check-maven:check`. If none is available, say so and read the manifests manually.
3. **Triage, don't dump.** For each advisory ask:
   - Is the vulnerable code path actually used by this project?
   - Is it a runtime dependency or dev-only?
   - Is a fixed version available, and is the upgrade a major bump?
4. Group results: **fix now** (reachable, high impact), **fix soon**, **accept with reason** (dev-only or unreachable), **no fix exists** (suggest a mitigation or replacement).
5. For upgrades, change one group at a time, run the tests, and note any breaking changes from the changelog.

## Supply-chain checks

- Lockfile committed, and CI installs with the locked variant (`npm ci`, `pip install --require-hashes` where practical).
- Packages with one maintainer, no releases in 2+ years, or names close to popular ones (typosquats).
- `postinstall` scripts in new dependencies.
- Unpinned `latest` or `*` ranges.

## Report

A short table: package, current to fixed version, severity, reachable (yes/no/unknown), action. Then the commands to apply the upgrades. Do not run upgrades that cross a major version without asking.
