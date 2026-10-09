# Add Claude Code plugin manifest

## Summary

Add Claude Code plugin metadata so this repository can be loaded as a local Claude Code plugin.

## Changes

- Add `.claude-plugin/plugin.json` with plugin identity, version, author, repository, license, and keywords.
- Document local plugin loading in `README.md` with `claude --plugin-dir .`.

## Validation

- Confirmed `plugin.json` is valid JSON.
- Confirmed required plugin identity fields are present.
- Ran `git diff --check` successfully.
