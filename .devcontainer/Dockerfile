FROM mcr.microsoft.com/devcontainers/python:1-3.13-bookworm

# The base image bakes in an apt source for dl.yarnpkg.com whose keyring lacks
# Yarn's current signing key, so any apt-get update (e.g. the docker-in-docker
# feature's install script) fails with NO_PUBKEY. We use npm, not this repo.
RUN rm -f /etc/apt/sources.list.d/yarn.list

ENV PYTHONUNBUFFERED 1
ENV PATH="/workspaces/AEMS/Server/.venv/bin:$PATH"
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
