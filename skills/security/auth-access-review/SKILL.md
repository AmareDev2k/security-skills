---
name: auth-access-review
description: Review authentication, authorization, and multi-tenant isolation for broken access control such as IDOR, missing permission checks, privilege escalation, mass assignment, and cross-tenant data leaks. Use when the user mentions roles, permissions, login, JWT, sessions, tenant isolation, admin panels, object ownership, or asks whether user A can see or change user B's data. Use when a route, endpoint, view, background job, export, or policy changes authorization. Do not use for a general security review when no access-control behavior is in scope.
---

# Auth and Access Review

Broken access control is the most common serious web vulnerability. Check it directly, endpoint by endpoint.

## Examples

Use this skill for:

- "Can a normal user read another user's invoice?"
- "Review this admin endpoint for privilege escalation."
- "Does this API enforce tenant isolation in background jobs?"

Do not use this skill for:

- Password or token leaks; use `/secrets-hygiene`.
- Headers, CORS, or cookie hardening without an authorization issue; use `/web-hardening`.
- An active account takeover; use `/incident-response`.

## Process

1. **Inventory every route / view / API handler.** Build a table: route, HTTP methods, who is *supposed* to call it, and what the code actually enforces.
2. For each one, answer all four questions:
   - **Authenticated?** Is login required, or is it open by accident?
   - **Authorised for this action?** Role or permission check present and server-side?
   - **Authorised for this object?** Is the record fetched with the caller's ownership or tenant in the filter, or is it `get(id=...)` from the URL?
   - **Authorised for these fields?** Can the caller set fields they should not (`is_admin`, `role`, `owner`, `tenant`) via mass assignment?
3. Flag **defaults that fail open**: a new view with no permission class, a queryset not filtered by tenant, a middleware that skips paths by prefix.
4. Check the auth mechanism itself: password hashing, token lifetime and rotation, logout actually invalidating, rate limiting on login and reset, reset tokens single-use and expiring, account enumeration through error messages.
5. For multi-tenant systems, find the **single choke point** where the tenant is applied (manager, middleware, row-level security). Every query path should go through it. List any that bypass it (raw SQL, background jobs, admin, exports, caches, file storage paths).

## Test, don't guess

Where the project has tests, write or suggest one per finding that proves the hole (user A requests user B's object, expects 403/404). A failing test is the best bug report.

## Report

Use the format from `/security-review`. Lead with anything where one user can read or change another user's data.
