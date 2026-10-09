# Express / Fastify hardening reference

## Transport and headers

- Use `helmet` (Express) or `@fastify/helmet` for security headers out of the box: CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, HSTS.
- Customise the CSP for your app. The `helmet` defaults are strict; adjust `script-src` and `style-src` as needed but avoid `unsafe-inline` for scripts.
- Enable HSTS in production with a long `maxAge` and `includeSubDomains`.
- Set `app.set('trust proxy', 1)` (or the specific proxy count) if behind a reverse proxy, so `req.ip` and `req.protocol` are correct. Never set it to `true` in production without understanding the risk.

## CORS

- Use `cors` (Express) or `@fastify/cors` with an explicit `origin` allow-list. Never `origin: true` or `origin: '*'` with `credentials: true`.
- Set `methods` and `allowedHeaders` to only what the API needs.

## CSRF

- If the API uses cookie-based auth (sessions), enable CSRF protection with `csurf` (Express, deprecated but common) or `@fastify/csrf-protection`. Token-based auth (Bearer JWT) does not need CSRF protection.
- SameSite cookies (`Lax` or `Strict`) reduce but do not eliminate CSRF risk.

## Session and cookies

- Use `express-session` or `@fastify/session` with a secure store (Redis, PostgreSQL), not the default in-memory store.
- Set `cookie.secure = true`, `cookie.httpOnly = true`, `cookie.sameSite = 'lax'` (or `'strict'`).
- Generate a strong, random `secret` from the environment. Rotate it with a `secret` array.
- Set `cookie.maxAge` to a reasonable session lifetime.

## Rate limiting

- Use `express-rate-limit` or `@fastify/rate-limit`. Apply globally with a generous limit, and stricter limits on auth endpoints (login, signup, password reset, OTP).
- Use a shared store (Redis) if running multiple instances, otherwise rate limits reset per process.
- Return `Retry-After` header on 429 responses.

## Input validation

- Validate every request body, query, and params with a schema validator: `zod`, `joi`, `ajv`, or Fastify's built-in JSON Schema validation.
- Set `express.json({ limit: '100kb' })` or equivalent body size limits. Default is too generous for most APIs.
- Reject unexpected fields. In Fastify, set `additionalProperties: false` in schemas.

## SQL and NoSQL injection

- Use parameterised queries with your ORM or query builder (`knex`, `prisma`, `sequelize`, `mongoose`). Never concatenate user input into queries.
- Raw query escaping (`${}` template literals in SQL strings) is not parameterisation and is an injection risk.
- With MongoDB/Mongoose, validate that query parameters are strings, not objects. `req.query.id = { $gt: '' }` bypasses `findOne({ id: req.query.id })`.

## File uploads

- Use `multer` (Express) or `@fastify/multipart` with `limits` for file size and count.
- Validate file type by content (magic bytes), not just `mimetype` or extension.
- Store uploads outside the public directory or on a separate origin (S3, Cloud Storage). Randomise filenames.
- Serve user-uploaded files with `Content-Disposition: attachment` and `Content-Type: application/octet-stream` unless you explicitly need inline display.

## Error handling

- Use a central error handler that does not leak stack traces, file paths, or SQL in responses. In Express: `app.use((err, req, res, next) => { ... })`.
- Set `NODE_ENV=production` in production. Express and many libraries change error detail based on this.
- Log errors server-side (with request ID for correlation) but return only a generic message and status code to the client.

## Dependencies

- Keep `express`, `fastify`, and middleware up to date. Run `npm audit` regularly.
- Avoid deprecated middleware (`body-parser` is built into Express 4.16+, `csurf` is unmaintained).
- Review `postinstall` scripts in new dependencies.
