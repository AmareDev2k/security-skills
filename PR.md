# Improve security skill routing

## Summary

Improve `/ask-matt` routing so security requests are directed to the narrowest
matching skill, with clearer precedence rules and better skill descriptions.

## Changes

- Add a security routing table to `.agents/skills/ask-matt/SKILL.md`.
- Add routing precedence for incidents, secrets, authorization, reviews, and
  web hardening.
- Add explicit triggers and exclusions to all nine security skills.
- Add practical examples to each security skill so users can identify the
  correct workflow quickly.
- Preserve the existing Claude Code plugin and repository structure.

## Validation

- `git diff --check` passed after every commit.
- Each skill improvement was committed separately with a `feat:` prefix.
- Existing `.gitignore` changes were left untouched.

## Commits

```text
adc1a04 feat: improve security skill routing
b9162c2 feat: sharpen security review routing
85efff1 feat: sharpen access review routing
4eb77fe feat: sharpen secrets hygiene routing
2ac706d feat: sharpen dependency audit routing
b7aef5d feat: sharpen web hardening routing
7496e14 feat: sharpen incident response routing
c9c606a feat: sharpen threat model routing
95bf2bd feat: sharpen security grill routing
055fde3 feat: sharpen security setup routing
```

## Branch

```text
add-ai-models
```

## Base branch

```text
master
```
