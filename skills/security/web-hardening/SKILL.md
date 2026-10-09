---
name: web-hardening
description: Harden a web application's configuration, covering HTTPS, security headers, CORS, CSRF, cookies, CSP, rate limiting, file uploads, error handling, and production settings. Use when the user is preparing to deploy, asks about headers, CORS errors, cookies, CSRF, CSP, uploads, rate limits, "is my site secure", or works in Django/DRF, Next.js, React, or Supabase. Do not use for object-level authorization or tenant-isolation reviews; use `/auth-access-review`.
---

# Web Hardening

## Examples

Use this skill for:

- "Are my CORS and cookie settings safe?"
- "Add security headers before production deployment."
- "Review this Django file-upload configuration."

Do not use this skill for:

- Whether one user can access another user's records; use `/auth-access-review`.
- A leaked API key or password; use `/secrets-hygiene`.
- A broad code-diff audit; use `/security-review`.

## Process

1. Identify the stack, then read the matching reference **before** reviewing config:
   - Django / Django REST Framework: `references/django.md`
   - Next.js, React, Supabase, Vercel: `references/nextjs-supabase.md`
   - Express, Fastify, Node.js backends: `references/express-fastify.md`
   - Other stacks: apply the universal checklist below.
2. Check each item. Verify against the real config files, not from memory of defaults.
3. Report only failures and unverified items. Do not list things that pass.

## Universal checklist

**Transport**
- HTTPS everywhere; HSTS enabled in production.
- Cookies: `Secure`, `HttpOnly`, and an explicit `SameSite` (Lax or Strict unless cross-site is required).

**Headers**
- `Content-Security-Policy` that does not rely on `unsafe-inline` for scripts where avoidable.
- `X-Content-Type-Options: nosniff`, a `Referrer-Policy`, `frame-ancestors` (or `X-Frame-Options`) set.

**Cross-origin**
- CORS allow-list is explicit. Never `*` together with credentials. Never reflect the request `Origin` blindly.
- CSRF protection on every state-changing route that uses cookie auth.

**Abuse**
- Rate limits on login, signup, password reset, OTP, and any expensive endpoint.
- Request body size limits. Pagination limits on list endpoints.

**Uploads**
- Validate type by content, not extension. Cap size. Store outside the app origin or with a restricted content type. Randomise stored filenames.

**Errors and logging**
- Debug mode off in production. No stack traces, SQL, or internal paths in responses.
- Logs exclude passwords, tokens, and full card or ID numbers.

**Operations**
- Separate dev, staging, and production secrets and databases.
- Admin interfaces not on a guessable public path without extra protection (IP allow-list, MFA).
- Backups exist, are encrypted, and restoring has been tested.
