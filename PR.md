# Add Claude Code project structure

## Summary

Add Claude Code project guidance and supporting repository structure for the
security skills collection.

## Changes

- Add `AGENTS.md` with contribution and validation guidance.
- Add `CLAUDE.md` with Claude Code usage guidance.
- Add `CHANGELOG.md`, `GLOSSARY.md`, and `SCOPE.md`.
- Add `package.json` and `package-lock.json` with project metadata.
- Add tracked directory scaffolds for:
  - `.agents/`
  - `.changeset/`
  - `.github/`
  - `.out-of-scope/`
  - `docs/`
  - `scripts/`
- Preserve the existing `.claude-plugin/plugin.json` manifest and README
  instructions.

## Validation

- JSON validation passed.
- `git diff --check` passed.
- Changes were committed individually and pushed on `add-ai-models`.

## Branch

```text
add-ai-models
```

## Base branch

```text
master
```
