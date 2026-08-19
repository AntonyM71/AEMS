#!/bin/bash
# UserPromptSubmit -> SonarQube secret scanning.
#
# Fail open, for the same reason as pretool-secrets.sh: an inactive CLI answers
# with decision:"block", which blocks every prompt and makes Claude unusable.
# Real secret findings are passed through untouched.
if ! command -v sonar &> /dev/null; then
  exit 0
fi

output=$(sonar hook claude-prompt-submit)
status=$?

case "$output" in
  *"secret scanning is inactive"*) exit 0 ;;
esac

printf '%s' "$output"
exit $status
