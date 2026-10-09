---
name: threat-model
description: Produce a lightweight, written threat model for a system or feature using assets, trust boundaries, and STRIDE. Use when the user asks for a threat model, security design review, or attack surface analysis, or after a security-grill session.
disable-model-invocation: true
---

# Threat Model

Write a threat model the team will actually read: short, specific, and tied to the real code.

## Process

1. Read `SECURITY-CONTEXT.md` if present. Explore the code for the feature or system in scope: routes, models, auth, external calls, config.
2. Draw the system as a list of **components**, **data stores**, and **trust boundaries** (browser → API, API → DB, API → third party). A Mermaid diagram is welcome if it stays small.
3. List **assets** (what matters) and **actors** (anonymous, user, admin, third-party service, insider).
4. For each trust boundary, walk STRIDE:
   - **S**poofing: can someone pretend to be someone else?
   - **T**ampering: can data be changed in transit or at rest?
   - **R**epudiation: can someone deny an action? Is there an audit trail?
   - **I**nformation disclosure: can data leak (logs, errors, IDOR, verbose APIs)?
   - **D**enial of service: unbounded loops, uploads, queries, or rate?
   - **E**levation of privilege: can a low-privilege actor reach admin functions?
5. Record each credible threat as: *threat, where in the code, likelihood, impact, mitigation, status* (mitigated / open / accepted).
6. Save to the path in `SECURITY-CONTEXT.md` (default `docs/security/threat-model.md`).

## Output rules

- Reference real files and functions, not generic advice.
- Skip threats that are not credible for this system. A short, true model beats a long, generic one.
- End with the top 3 open items in priority order.
