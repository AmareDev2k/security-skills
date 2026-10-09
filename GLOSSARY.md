# Glossary

- **Access control**: Rules that determine which users or services may perform
  an action or access a resource.
- **Attack surface**: The set of reachable interfaces and dependencies that
  could be used to compromise a system.
- **Authentication**: Verifying the identity of a user, service, or device
  (proving *who* they are).
- **Authorization**: Determining whether an authenticated entity is allowed to
  perform a specific action or access a specific resource (proving *what they
  may do*).
- **CORS**: Cross-Origin Resource Sharing. A browser mechanism that controls
  which origins may read responses from a server. Misconfigured CORS can
  expose APIs to unauthorized origins.
- **CSRF**: Cross-Site Request Forgery. An attack that tricks a user's browser
  into submitting a request to a site where the user is authenticated.
- **CSP**: Content Security Policy. An HTTP header that restricts which sources
  the browser may load scripts, styles, images, and other resources from.
- **CVE**: Common Vulnerabilities and Exposures. A public identifier for a
  known security vulnerability (e.g. CVE-2024-12345).
- **Defense in depth**: Layering multiple security controls so that the failure
  of one does not compromise the system.
- **IDOR**: Insecure Direct Object Reference. An access-control flaw where a
  user can access another user's data by changing an identifier in a request.
- **Injection**: An attack that inserts untrusted data into a command or query
  (SQL, OS command, LDAP, template) to alter its behavior.
- **Least privilege**: Granting only the permissions required for a task.
- **Mass assignment**: An attack where an attacker sets model fields (e.g.
  `is_admin`, `role`) that the application did not intend to be user-writable.
- **MFA**: Multi-Factor Authentication. Requiring two or more independent
  proofs of identity (something you know, have, or are).
- **OWASP**: Open Worldwide Application Security Project. A nonprofit that
  publishes security guidance including the OWASP Top 10.
- **RLS**: Row-Level Security. A database feature that restricts which rows a
  query may access based on the current user or role.
- **Secret**: Sensitive authentication or encryption material such as an API
  key, token, password, or private key.
- **SSRF**: Server-Side Request Forgery. An attack that tricks a server into
  making requests to internal or unintended resources on behalf of the
  attacker.
- **STRIDE**: A threat-modeling framework covering spoofing, tampering,
  repudiation, information disclosure, denial of service, and elevation of
  privilege.
- **Supply-chain attack**: Compromising software by targeting its dependencies,
  build tools, or distribution channels rather than the application itself.
- **Trust boundary**: A point in a system where data or control crosses from
  one trust level to another (e.g. browser to server, server to database).
- **XSS**: Cross-Site Scripting. An attack that injects malicious scripts into
  web pages viewed by other users.
- **Zero trust**: A security model that requires verification for every
  request, regardless of network location or prior authentication.
