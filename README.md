<p align="center">
  <a href="https://github.com/AmareDev2k">
    <img src="https://wsrv.nl/?url=avatars.githubusercontent.com/u/218460077?v=4&w=200&h=200&mask=circle" alt="Aravinda" width="150">
  </a>
</p>

<h1 align="center">Security Skills</h1>

<p align="center">
  Practical, composable security workflows for coding agents.
</p>

<p align="center">
  Threat modeling, code review, access control, secrets hygiene, dependency
  auditing, web hardening, and incident response.
</p>

<p align="center">
  <a href="https://github.com/AmareDev2k/security-skills">GitHub</a>
  ·
  <a href="https://github.com/AmareDev2k/security-skills/issues">Issues</a>
  ·
  <a href="https://github.com/AmareDev2k/security-skills/blob/master/LICENSE">MIT License</a>
</p>

---

## Why this exists

Security guidance is most useful when it is available at the moment a
developer needs it. This repository packages focused security workflows as
agent skills that can be read, adapted, and run during everyday engineering
work.

The skills are intentionally small and composable. They do not replace a
professional security assessment, but they help an agent ask better questions,
inspect the actual code, identify common weaknesses, and produce an actionable
follow-up.

## Quick start

Install the skills with the Skills CLI:

```bash
npx skills@latest add AmareDev2k/security-skills
```

Select the skills and coding agents you want to use. Include
`setup-security-skills` for a repository that has not been configured yet.

Then run:

```text
/setup-security-skills
```

The setup workflow detects the project stack and available scanners, asks for
the missing project context, and writes `SECURITY-CONTEXT.md`.

Update installed skills later with:

```bash
npx skills update
```

## Claude Code plugin

This repository includes a Claude Code plugin manifest at
`.claude-plugin/plugin.json`.

To load the repository directly during local development:

```bash
claude --plugin-dir .
```

The plugin manifest contains the project identity and metadata. The detailed
skill instructions remain in `skills/security/`.

## Security workflow

Use the workflow that matches the stage of the work:

```text
Design a security-sensitive feature
  → /security-grill
  → /threat-model
  → Build the feature
  → /security-review
  → /auth-access-review when authorization changes
  → /dependency-audit and /web-hardening before release
```

For a suspected compromise:

```text
Incident detected
  → /incident-response
  → /secrets-hygiene for exposed credentials
  → /security-review for the root cause
  → Document the follow-up and preventive actions
```

## Available skills

### Setup

| Skill | Purpose |
| --- | --- |
| `setup-security-skills` | Configure project context, report locations, severity, ownership, and scanners. |

### Design and review

| Skill | Purpose |
| --- | --- |
| `security-grill` | Interview a team about assets, entry points, trust boundaries, identity, failure, abuse, and recovery. |
| `threat-model` | Write a focused threat model using assets, actors, trust boundaries, and STRIDE. |
| `security-review` | Review diffs, branches, pull requests, or files for exploitable vulnerabilities. |
| `auth-access-review` | Check authentication, authorization, object ownership, roles, and tenant isolation. |

### Prevention and response

| Skill | Purpose |
| --- | --- |
| `secrets-hygiene` | Find, rotate, prevent, and clean up exposed credentials in the tree and Git history. |
| `dependency-audit` | Audit dependencies for known vulnerabilities and supply-chain risk. |
| `web-hardening` | Review headers, CORS, CSRF, cookies, CSP, uploads, rate limiting, and production configuration. |
| `incident-response` | Contain, preserve evidence, scope, eradicate, recover, notify, and learn from an incident. |

## What the skills check

Depending on the selected workflow, the skills can examine:

- Injection into SQL, commands, templates, headers, LDAP, and redirects
- Cross-site scripting and unsafe HTML rendering
- Authentication, session handling, password resets, and token lifetime
- Broken object-level authorization and privilege escalation
- Cross-tenant data access through APIs, jobs, exports, caches, and storage
- Secrets in source code, configuration, logs, client bundles, and Git history
- Dependency vulnerabilities, lockfiles, typosquatting, and install scripts
- SSRF, path traversal, unrestricted uploads, and unsafe deserialization
- CORS, CSRF, cookies, CSP, security headers, rate limiting, and debug settings
- Logging, evidence preservation, detection, recovery, and incident ownership

The skills are instructed to inspect real files, confirm reachability, separate
facts from assumptions, and report unverified items clearly.

## Repository layout

```text
.
├── .agents/
│   └── README.md
├── .changeset/
├── .claude-plugin/
│   └── plugin.json
├── .github/
│   └── workflows/
│       └── validate.yml
├── docs/
├── scripts/
│   └── validate.mjs
└── skills/
    └── security/
        ├── auth-access-review/
        ├── dependency-audit/
        ├── incident-response/
        ├── security-grill/
        ├── security-review/
        ├── secrets-hygiene/
        ├── setup-security-skills/
        ├── threat-model/
        └── web-hardening/
```

Every canonical skill contains a `SKILL.md` with frontmatter and instructions.
The web-hardening skill also contains framework-specific references for Django
and Next.js/Supabase projects.

## Validation

Run the repository validation script:

```bash
node scripts/validate.mjs
```

The check validates the JSON metadata and confirms that every canonical
security skill contains the required frontmatter fields.

GitHub Actions runs the same validation on pushes and pull requests.

## Safety and scope

These skills are defensive guidance. Use them only on systems and code you are
authorized to inspect or change.

They are not:

- A guarantee that software is secure
- Legal, regulatory, or compliance advice
- Permission to test systems without authorization
- A replacement for a qualified security assessment
- A substitute for incident command, legal counsel, or law-enforcement advice

During an incident, rotate or revoke credentials at the provider and preserve
evidence before destructive changes. Do not commit real credentials, private
keys, production logs, or unredacted sensitive data.

## Contributing

When adding or changing a skill:

1. Keep the skill focused on one security workflow.
2. Update the frontmatter `name` and `description`.
3. Include clear triggers, examples, exclusions, and actionable steps.
4. Reference real files and functions when reporting findings.
5. Keep sensitive data out of examples and documentation.
6. Run `node scripts/validate.mjs`.
7. Run `git diff --check`.

Canonical skill sources live under `skills/security/`. The `.agents/skills/`
directory is for agent-specific installed or intentionally maintained skills.

## Author

Created and maintained by
<a href="https://github.com/AmareDev2k">AmareDev2k</a>.

## License

MIT. See [`LICENSE`](./LICENSE).
