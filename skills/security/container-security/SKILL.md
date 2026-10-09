---
name: container-security
description: Review Docker, OCI, and Kubernetes configurations for security issues including privileged containers, root users, exposed secrets, unscanned images, missing network policies, and insecure defaults. Use when the user mentions Docker security, Dockerfile review, container hardening, Kubernetes RBAC, pod security, image scanning, or asks whether a container deployment is safe. Do not use for application-code vulnerabilities inside the container; use `/security-review`.
---

# Container Security

Containers isolate workloads, but only when configured correctly. A misconfigured container is worse than no container — it gives a false sense of security.

## Examples

Use this skill for:

- "Review this Dockerfile for security issues."
- "Are our Kubernetes pods running as root?"
- "Check our container image for vulnerabilities."

Do not use this skill for:

- Application code bugs inside the container; use `/security-review`.
- Leaked secrets in source code; use `/secrets-hygiene`.
- CI/CD pipeline issues; use `/cicd-security`.

## Process

### Docker / OCI images

1. **Base image.** Is it pinned to a digest or specific version (not `latest`)? Is it a minimal image (`alpine`, `distroless`, `scratch`) or a full OS with unnecessary packages?
2. **Build user.** Does the Dockerfile set `USER` to a non-root user before `CMD`/`ENTRYPOINT`? Never run application processes as root.
3. **Secrets in build.** Are secrets passed via `ARG` or `COPY`-ed into the image? They persist in image layers. Use multi-stage builds or BuildKit secrets mounts instead.
4. **Installed packages.** Are only required packages installed? No `curl`, `wget`, `netcat`, or shell in production images unless needed.
5. **File permissions.** Application files owned by the non-root user. No world-writable directories.
6. **Image scanning.** Run `trivy image`, `grype`, or `docker scout cves` on the built image. Triage by reachability, not just CVSS score.

### Docker runtime

1. **Privileges.** No `--privileged` flag. Drop all capabilities and add back only what is needed (`--cap-drop ALL --cap-add NET_BIND_SERVICE`).
2. **Read-only filesystem.** Use `--read-only` where possible. Mount writable volumes only for data directories.
3. **Network.** No `--network host`. Use user-defined bridge networks. Expose only required ports.
4. **Secrets.** Use Docker secrets or mount from a secret manager. Never pass secrets as environment variables visible in `docker inspect`.
5. **Resource limits.** Set `--memory` and `--cpus` to prevent resource exhaustion.

### Kubernetes

1. **Pod Security Standards.** Enforce `restricted` or `baseline` Pod Security Standards (or the legacy PodSecurityPolicy). No `privileged: true`, no `hostNetwork`, no `hostPID`.
2. **RBAC.** Service accounts have minimal permissions. No `cluster-admin` bound to application workloads. Review `ClusterRoleBinding` for over-broad access.
3. **Network policies.** Default-deny ingress and egress. Allow only required communication between namespaces and pods.
4. **Secrets.** Kubernetes secrets are base64-encoded, not encrypted at rest by default. Use sealed-secrets, external-secrets-operator, or a CSI secrets driver. Never commit manifests containing secret values.
5. **Image policy.** Pull from private registries with authentication. Enable image signature verification or admission control to block unsigned images.
6. **Resource quotas.** Set `requests` and `limits` on CPU and memory for every container. Set `LimitRange` and `ResourceQuota` per namespace.

## Report

Use the format from `/security-review`. Group findings by: **image build**, **runtime config**, **orchestration**, **secrets**. End with a verdict.
