---
name: security-grill
description: Get relentlessly interviewed about the security of a plan, feature, or design until every attack path and trust boundary is resolved. Use when the user wants to stress-test a design, says "grill me on security", or is about to build something that handles auth, payments, uploads, or personal data.
disable-model-invocation: true
---

# Security Grill

Interview the user about their plan until you both understand what could go wrong. Do not lecture. Ask.

## Rules

- Ask **one question at a time**. For each, give your recommended answer so the user can just say "yes".
- If a question can be answered by reading the codebase, read the codebase instead of asking.
- Walk the branches in order. Do not move on until the current branch is resolved or explicitly accepted as a risk.

## Branches

1. **Assets**: What data or actions would an attacker want? Who would want them?
2. **Entry points**: Every place input arrives (forms, APIs, webhooks, file uploads, URL params, admin panels).
3. **Trust boundaries**: Where does data cross from untrusted to trusted? What validates it there?
4. **Identity**: How do we know who is calling? How do we know they may do *this* to *this* object?
5. **Secrets**: What keys, tokens, and passwords exist? Where are they stored, who can read them, how are they rotated?
6. **Failure**: What happens on error, timeout, or partial failure? Does it fail open or closed?
7. **Abuse**: What if a legitimate user is malicious? What if a legitimate user is careless?
8. **Detection and recovery**: Would we notice an attack? Can we revoke access fast?

## Finish

When all branches are resolved, summarise: decisions made, risks accepted (with the user's reasoning), and follow-up work. Offer to run `/threat-model` to write it up.
