---
name: secrets-hygiene
description: Find, prevent, and clean up leaked secrets (API keys, tokens, passwords, private keys, .env files) in a repo and its git history. Use when the user mentions secrets, API keys, .env, credentials in git, a leaked key, or is about to commit config files, push a repo public, or deploy.
---

# Secrets Hygiene

## 1. Scan the working tree

- Search for high-signal patterns: private key headers, `AKIA` style cloud keys, `sk_live_`, `ghp_`, JWT-looking strings, `password =`, connection strings with embedded credentials.
- Check that `.env`, `.env.*`, `*.pem`, `*.key`, service-account JSON, and local DB files are in `.gitignore`.
- Check that a `.env.example` exists with **names only, no values**.
- If `gitleaks` or `trufflehog` is installed, run it. Otherwise use grep and say the scan was manual.

## 2. Scan history

Secrets deleted from the latest commit are still in history. Check with `git log -p -S '<pattern>'` or `gitleaks detect`. Report the commit, file, and kind of secret. **Never print the secret value** in your reply; show only the first 4 characters.

## 3. If a real secret was exposed

Removing it from git is not enough. In this order:

1. **Revoke or rotate it at the provider now.** Assume it is already copied.
2. Create the replacement and put it in the proper store (environment variable, platform secret manager).
3. Only then clean history if the repo is shared (`git filter-repo`, or the provider's tooling), and tell collaborators to re-clone.
4. Review the provider's access logs for use of the old key.
5. Hand off to `/incident-response` if the key had broad access.

## 4. Prevent it

- Suggest a pre-commit secret scanner and enable the host's push protection (GitHub secret scanning).
- Frontend bundles are public. Anything in `NEXT_PUBLIC_*`, `VITE_*`, or `REACT_APP_*` is visible to every visitor. Only publishable keys belong there.
- Prefer scoped, short-lived credentials over one all-powerful key.
