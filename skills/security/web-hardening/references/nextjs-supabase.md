# Next.js / React / Supabase / Vercel hardening reference

## Client exposure
- Anything in `NEXT_PUBLIC_*` (or `VITE_*`) ships to every browser. Only the Supabase **anon** key and other publishable values belong there.
- The Supabase **service_role** key bypasses Row Level Security. It must exist only in server-side code and server env vars, never in client components, never in `NEXT_PUBLIC_*`.
- Search the built output and repo for `service_role` and for secret keys of any payment or email provider.

## Supabase Row Level Security
- RLS enabled on **every** table in an exposed schema. A table without RLS is readable and writable by anyone holding the anon key.
- Policies check `auth.uid()` against an owner column, not just "is authenticated".
- `INSERT`/`UPDATE` policies use `WITH CHECK`, so users cannot write rows owned by others or change the owner column.
- Roles (admin, staff) are stored in a table users cannot write to, or in app metadata, not in user-editable `user_metadata`.
- Storage buckets: private by default, with policies per path (e.g. `uid/filename`). Public buckets only for truly public files.
- Views and `security definer` functions bypass RLS unless handled deliberately; review each.

## Next.js
- Auth checked **on the server** (route handlers, server actions, middleware plus per-route checks). Hiding a button in the UI is not access control.
- Server actions and route handlers validate input (e.g. with Zod) and re-check the caller's permission every time.
- Never pass secrets or full DB rows to client components as props. Select only needed fields.
- `dangerouslySetInnerHTML` only with sanitised HTML (DOMPurify or equivalent).
- Set security headers in `next.config.js` `headers()` (CSP, nosniff, Referrer-Policy, frame-ancestors, HSTS).
- Redirect targets taken from query params must be validated against an allow-list.

## Payments (e.g. PayHere or similar hosted checkouts)
- Never trust the browser's report that a payment succeeded. Confirm via the provider's **server-to-server notification**, and verify its signature or hash with the merchant secret.
- Compare the amount and currency in the notification to your own order record. Make the handler idempotent so replays cannot double-fulfil.
- Keep the merchant secret server-side only.

## Vercel
- Separate env vars per environment (Production / Preview / Development). Preview deployments should not hold production secrets.
- Review who has access to the Vercel project and connected Git repo; enable 2FA on both.
