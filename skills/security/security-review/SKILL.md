---
name: security-review
description: Review a diff, branch, PR, or set of files for security vulnerabilities, checking injection, auth, data exposure, unsafe deserialization, SSRF, and misconfiguration. Use whenever the user asks for a security review, audit, or "is this safe", before merging code that touches auth, user input, file handling, or external requests, and as a final pass when implementing features.
---

# Security Review

Review code the way an attacker would read it, then report like an engineer.

## Process

1. Establish scope: the diff since a fixed point (`git diff main...HEAD`), or the files named. Read `SECURITY-CONTEXT.md` if present.
2. For each changed entry point, trace untrusted input to every **sink** (database query, shell, file path, HTML output, redirect, outbound request, deserializer, template). Read the actual code at each hop; do not assume a framework protects you.
3. Check these classes, skipping those that do not apply:
   - **Injection**: SQL/NoSQL, command, template, LDAP, header. Parameterised queries and ORM APIs are fine; raw string building is not.
   - **XSS**: unescaped output, `dangerouslySetInnerHTML`, `|safe`, `mark_safe`, `innerHTML`.
   - **Authentication and sessions**: weak password handling, missing rate limits, predictable tokens, session fixation, JWT misuse (`none` alg, no expiry, secret in client).
   - **Authorisation**: see `/auth-access-review`. Every object lookup must be scoped to the caller.
   - **Data exposure**: secrets or PII in logs, errors, API responses, or client bundles. Serializers returning every field.
   - **SSRF and open redirects**: user-controlled URLs fetched or redirected to.
   - **File handling**: path traversal, unrestricted upload type or size, serving uploads from the app origin.
   - **Deserialization and eval**: `pickle`, `yaml.load`, `eval`, `exec`.
   - **Crypto**: home-made crypto, MD5/SHA1 for passwords, hard-coded keys or IVs, `Math.random` for tokens.
   - **Config**: debug mode, permissive CORS, missing CSRF protection, default credentials.
4. For each finding, **confirm it is reachable** before reporting. If you cannot confirm, mark it "unconfirmed" and say what would confirm it.

## Report format

For each finding:

```
[Severity] Short title
File: path/to/file.py:42
Problem: what is wrong and how it could be exploited, in 2 to 3 sentences
Fix: the smallest change that closes it (code snippet if short)
```

Order by severity (use the scale in `SECURITY-CONTEXT.md`, else Critical/High/Medium/Low). End with a one-line verdict: **block**, **fix before merge**, or **ok to merge**. Do not pad with style nits or generic advice. If nothing is wrong, say so plainly and list what you checked.
