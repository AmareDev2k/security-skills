# Security Skills

Agent skills for building secure software: threat modelling, security review, secrets, dependencies, access control, and incident response. Small, composable, and editable. They work with any coding agent that supports `SKILL.md` skills (Claude Code, Codex, Cursor, and others).

## Installation

```bash
npx skills@latest add <your-github-username>/security-skills
```

Pick the skills you want and the agents to install them on. Make sure `setup-security-skills` is one of them, then run it once per repo:

```
/setup-security-skills
```

It detects your stack and scanners, asks a few questions, and writes `SECURITY-CONTEXT.md`, which the other skills read.

Update later with:

```bash
npx skills update
```

## Reference

**User-invoked** skills run only when you type them. They orchestrate.

- **setup-security-skills**: One-time repo configuration (stack, severity scale, report location).
- **security-grill**: Get interviewed about a design until every attack path is resolved.
- **threat-model**: Write a short STRIDE threat model tied to the real code.

**Model-invoked** skills can be used by you or picked up automatically when the task fits.

- **security-review**: Review a diff or files for vulnerabilities, with confirmed findings and fixes.
- **auth-access-review**: Hunt for broken access control, IDOR, and cross-tenant leaks.
- **secrets-hygiene**: Find, rotate, and prevent leaked keys, in the tree and in git history.
- **dependency-audit**: Triage vulnerable and risky dependencies and plan safe upgrades.
- **web-hardening**: Headers, CORS, CSRF, cookies, uploads, with Django/DRF and Next.js/Supabase references.
- **incident-response**: Contain, preserve, scope, recover, and learn from an incident.

## Typical flow

1. `/security-grill` while designing a feature
2. `/threat-model` to write it down
3. Build it
4. `security-review` and `auth-access-review` before merging
5. `dependency-audit` and `web-hardening` before deploying

## Layout

```
skills/
└── security/
    ├── <skill-name>/
    │   ├── SKILL.md          # required: frontmatter (name, description) + instructions
    │   └── references/       # optional: loaded only when needed
```

## Disclaimer

These skills help an agent find and fix common weaknesses. They are not a substitute for a professional security audit, and findings should be verified before acting on them.

## License

MIT
