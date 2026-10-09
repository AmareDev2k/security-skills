---
name: incident-response
description: Guide the first hour of a security incident such as a leaked key, compromised account, suspicious access, or defaced site. Contain, preserve evidence, rotate, investigate, and write the follow-up. Use when the user says they were hacked, a secret was exposed, an account was taken over, or something looks compromised.
---

# Incident Response

Be calm and ordered. In an incident, people skip steps and destroy evidence. Work through these phases and tell the user which one they are in.

## 1. Contain (minutes)

Stop the bleeding without destroying evidence.
- Revoke or rotate exposed credentials at the **provider**, not just in code.
- Force logout / invalidate sessions and tokens if accounts may be affected.
- If a host is compromised, isolate it (network rules, disable deploy keys) rather than wiping it.
- Turn on or raise logging if it was off.

## 2. Preserve

- Export relevant logs, access records, and the current state of anything suspicious *before* changing it.
- Note a timeline as you go: what was seen, when, by whom, what was done.

## 3. Scope

Ask and answer, using the logs:
- What was the entry point?
- What could that access reach (data, other systems, other keys)?
- Was anything read, changed, or exfiltrated? Over what time window?
- Are there persistence mechanisms (new users, new keys, new deploy hooks, scheduled jobs, modified code)?

## 4. Eradicate and recover

- Rotate everything the attacker could have touched, including secondary credentials.
- Remove persistence. Patch the root cause.
- Restore from known-good state if integrity is in doubt.
- Re-enable services gradually and watch the logs.

## 5. Tell the right people

Identify who must be told: users, customers, a platform provider, a regulator or contract counterparty. Notification duties depend on jurisdiction and contract, so say clearly that the user should confirm obligations with the responsible person or a lawyer. Do not draft public statements that speculate beyond known facts.

## 6. Learn

Write a blameless post-incident note: timeline, root cause, what worked, what did not, and 3 concrete preventive actions with owners. Save it under the reports path in `SECURITY-CONTEXT.md`.
