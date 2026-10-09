---
name: cicd-security
description: Review CI/CD pipelines for security issues including secrets exposure in logs or environment, untrusted code execution in pull requests, missing artifact integrity checks, over-permissive workflow permissions, and supply-chain attacks through actions or plugins. Use when the user mentions CI/CD security, GitHub Actions hardening, pipeline secrets, build security, artifact signing, or asks whether their deployment pipeline is safe. Do not use for application-code vulnerabilities; use `/security-review`.
---

# CI/CD Security

The pipeline that builds and deploys your code is a high-value target. A compromised pipeline means compromised production.

## Examples

Use this skill for:

- "Review our GitHub Actions workflows for security issues."
- "Are our CI secrets properly scoped?"
- "Is our deployment pipeline safe from supply-chain attacks?"

Do not use this skill for:

- Application bugs in the deployed code; use `/security-review`.
- Leaked secrets in source code; use `/secrets-hygiene`.
- Container image issues; use `/container-security`.

## Process

### Secrets management

1. **No secrets in code or logs.** Secrets are stored in the CI platform's secret manager, not in workflow files, environment variables visible in logs, or committed config.
2. **Scoped secrets.** Secrets available only to the environments and branches that need them. Production secrets not available in PR builds.
3. **Masked in output.** CI platform masks secrets in logs. Check that secrets are not printed by debug flags, error messages, or verbose build tools.
4. **Rotation plan.** Secrets used in CI (deploy keys, API tokens, registry credentials) have a rotation schedule and process.

### Workflow permissions

1. **Least privilege.** GitHub Actions: use `permissions:` at the workflow and job level. Never use `permissions: write-all`. Default to `contents: read` and add only what is needed.
2. **PR workflows.** Workflows triggered by `pull_request_target` run with the base branch's secrets and permissions — never check out and execute untrusted PR code in that context. Prefer `pull_request` trigger for untrusted code.
3. **Fork restrictions.** If the repo accepts PRs from forks, secrets are not available to fork PRs by default. Do not work around this without understanding the risk.
4. **Approval gates.** Deployments to production require manual approval or a protected environment rule.

### Supply chain

1. **Pin dependencies.** Actions, plugins, and build tools pinned by SHA or exact version, not `@latest` or `@main`. Example: `uses: actions/checkout@v4.1.0` not `uses: actions/checkout@main`.
2. **Lockfiles in CI.** Use `npm ci`, `pip install --require-hashes`, or equivalent locked installs. Never `npm install` in CI.
3. **Artifact integrity.** Build artifacts (binaries, images, packages) are signed or checksummed. Consumers verify before deploying.
4. **Dependency review.** New dependency additions trigger a review check (GitHub dependency review action, Renovate, Dependabot).

### Build isolation

1. **Ephemeral runners.** Self-hosted runners are ephemeral or hardened. Persistent runners accumulate state and cached credentials.
2. **No credential caching.** Build steps do not cache credentials in the workspace, Docker config, or npm rc files beyond the current run.
3. **Network restrictions.** Build environments connect only to required registries and services, not the open internet.

## Report

Use the format from `/security-review`. Group findings by: **secrets**, **permissions**, **supply chain**, **build isolation**. End with a verdict.
