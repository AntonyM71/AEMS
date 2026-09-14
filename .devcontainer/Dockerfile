FROM mcr.microsoft.com/devcontainers/python:1-3.13-bookworm

# The base image bakes in an apt source for dl.yarnpkg.com whose keyring lacks
# Yarn's current signing key, so any apt-get update (e.g. the docker-in-docker
# feature's install script) fails with NO_PUBKEY. We use npm, not this repo.
RUN rm -f /etc/apt/sources.list.d/yarn.list

ENV PYTHONUNBUFFERED 1
ENV PATH="/workspaces/AEMS/Server/.venv/bin:$PATH"

# SonarQube CLI — backs the Claude Code secret-scanning hooks and the sonarqube
# MCP server (.mcp.json). The upstream installer hardcodes its install dir to
# $HOME/.local/share/sonarqube-cli/bin and puts it on PATH by appending to
# ~/.bashrc, which non-interactive shells (hooks, MCP server spawns) never read.
# Pin HOME for the install and symlink the binary so it is on PATH for every
# user and every kind of shell.
RUN HOME=/opt/sonar bash -c 'curl -fsSL https://raw.githubusercontent.com/SonarSource/sonarqube-cli/refs/heads/master/user-scripts/install.sh | bash' \
	&& ln -s /opt/sonar/.local/share/sonarqube-cli/bin/sonar /usr/local/bin/sonar

# `sonar auth login` defaults to the system keychain, which fails here with
# "libsecret not available". This swaps in the CLI's file-backed keychain, kept
# under the /workspaces bind mount so the login survives container rebuilds.
# The file holds a real token, so it must stay outside the repo.
ENV SONARQUBE_CLI_KEYCHAIN_FILE=/workspaces/.sonar/keychain.json
# [Optional] If your requirements rarely change, uncomment this section to add them to the image.
# COPY requirements.txt /tmp/pip-tmp/
# RUN pip3 --disable-pip-version-check --no-cache-dir install -r /tmp/pip-tmp/requirements.txt \
#    && rm -rf /tmp/pip-tmp
# [Optional] Uncomment this section to install additional OS packages.
# RUN set -e \
# 	&& apt-get update \
# 	&& apt-get install -y --no-install-recommends curl ca-certificates \
# 	&& apt-get clean \
# 	&& rm -rf /var/lib/apt/lists/*
