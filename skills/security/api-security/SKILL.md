---
name: api-security
description: Review REST, GraphQL, and gRPC APIs for security issues including broken authentication, excessive data exposure, lack of rate limiting, mass assignment, injection through query parameters or request bodies, improper input validation, and insecure API versioning. Use when the user mentions API security, REST hardening, GraphQL introspection, API gateway, API keys, OAuth scopes, or asks whether an API endpoint is safe. Do not use for web-page hardening without an API concern; use `/web-hardening`.
---

# API Security

Secure the interface that other software talks to. APIs are the most common attack surface in modern applications.

## Examples

Use this skill for:

- "Is this REST API properly authenticated and rate-limited?"
- "Review our GraphQL schema for data exposure."
- "Are our API keys scoped correctly?"

Do not use this skill for:

- Browser-facing cookie, CORS, or CSP issues without an API concern; use `/web-hardening`.
- Object-level authorization deep-dive; use `/auth-access-review`.
- An active compromise through an API; use `/incident-response` first.

## Process

1. **Inventory endpoints.** List every route, HTTP method, and whether it is public, authenticated, or admin-only. For GraphQL, list queries, mutations, and subscriptions.
2. **Authentication check.** For each endpoint:
   - Is authentication enforced server-side (not just client-side header checks)?
   - Are API keys, JWTs, or OAuth tokens validated on every request?
   - Is the `Authorization` header the only trusted source (not query params or cookies leaking tokens in logs)?
3. **Input validation.** For each endpoint accepting input:
   - Is every field validated for type, length, range, and format?
   - Are unknown fields rejected or silently ignored (mass-assignment risk)?
   - Are nested objects and arrays bounded in depth and size?
   - Is file content validated, not just the extension?
4. **Output filtering.** For each response:
   - Are only the required fields returned? No internal IDs, timestamps, or metadata leaking.
   - Are error responses generic to the client (no stack traces, SQL errors, or internal paths)?
   - Is pagination enforced with a max page size?
5. **Rate limiting and abuse.**
   - Per-user and per-IP rate limits on all endpoints, stricter on auth and write endpoints.
   - Request body size limits enforced.
   - Expensive operations (search, export, report generation) have queue or concurrency limits.
6. **GraphQL-specific checks.**
   - Introspection disabled in production.
   - Query depth and complexity limits enforced.
   - No unrestricted batching of mutations.
   - Field-level authorization, not just type-level.
7. **API versioning and deprecation.**
   - Old API versions still receive security patches.
   - Deprecated endpoints have a sunset date and are not silently kept alive.

## Transport and tokens

- All API traffic over HTTPS. HSTS enabled.
- JWTs: short expiry, `aud` and `iss` validated, signing algorithm pinned (never `none`), refresh tokens rotated.
- API keys: scoped to minimum permissions, rotatable without downtime, never logged or returned in responses.
- OAuth: redirect URIs validated exactly, `state` parameter used, scopes are minimal.

## Report

Use the format from `/security-review`. Group findings by: **authentication**, **authorization**, **input/output**, **rate limiting**, **configuration**. End with a verdict.
