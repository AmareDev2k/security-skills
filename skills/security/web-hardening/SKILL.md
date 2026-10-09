---
name: web-hardening
description: Harden a web application's configuration, covering security headers, CORS, CSRF, cookies, rate limiting, CSP, file uploads, error handling, and production settings. Use when the user is preparing to deploy, asks about headers, CORS errors, cookies, CSRF, "is my site secure", or works in Django/DRF, Next.js, React, or Supabase.
---

# Web Hardening

## Process

1. Identify the stack, then read the matching reference **before** reviewing config:
   - Django / Django REST Framework: `references/django.md`
   - Next.js, React, Supabase, Vercel: `references/nextjs-supabase.md`
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
