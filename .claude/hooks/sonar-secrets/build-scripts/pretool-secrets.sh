#!/bin/bash
# PreToolUse(Read) -> SonarQube secret scanning.
#
# Fail open. When the CLI is on PATH but inactive (not authenticated, signatures
# missing, ...) it answers with a hard permissionDecision:"deny", which blocks
# every Read. A scanner that cannot run must degrade to "no scanning", never to
# "no Claude". Real secret findings are passed through untouched.
if ! command -v sonar &> /dev/null; then
  exit 0
fi

output=$(sonar hook claude-pre-tool-use)
status=$?

case "$output" in
  *"secret scanning is inactive"*) exit 0 ;;
esac

printf '%s' "$output"
exit $status
