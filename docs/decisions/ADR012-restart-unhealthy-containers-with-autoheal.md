# Architectural Decision Record: Restart Unhealthy Containers With an Autoheal Sidecar

## Context:

The production compose stack defines healthchecks for its services, but Docker Engine doesn't act on them. A `restart: always` policy restarts a container only when its process exits; only Swarm replaces a container because it is unhealthy. A server whose event loop hangs, or a Redis that stops answering, stays `unhealthy` until someone runs `docker compose ps`, and at a venue nobody does. A Redis outage is especially quiet: score submissions still succeed while live updates stop reaching every screen (see [ADR008](ADR008-scale-socketio-across-workers-with-redis.md)).

## Options Considered:

### 1. Show health in the webapp

Poll the server's health endpoint from the head judge and admin screens and show a banner when it fails. This tells someone at the venue that something is wrong, but it still needs them to work out what to restart and how. It remains a reasonable follow-up.

### 2. Run under Docker Swarm

Swarm restarts unhealthy tasks natively, but it changes how the stack is started, networked and updated on a single competition laptop, and it doesn't support some compose features the stack relies on, such as `depends_on` conditions.

### 3. An autoheal sidecar (Chosen Option)

A small container watches the Docker socket and restarts any container that carries an opt-in label and is reported unhealthy.

## Decision:

Adopt option 3, with one rule: a labelled service's healthcheck must test only that container. Without the rule, a fault in one service makes a different, healthy service unhealthy, and autoheal restarts the wrong container in a loop. Two healthchecks broke the rule and change under this decision:

- The server's healthcheck moves from its dependency-aware health endpoint to a liveness endpoint that answers whenever the process's event loop runs. The dependency-aware endpoint stays for people and monitoring to use. This supersedes ADR008's choice to fail the server container when Redis is down: Redis now fails its own healthcheck and is restarted itself.
- Nginx's healthcheck moves from a request proxied to the frontend to a request nginx answers itself.

The frontend gains a healthcheck so that it is covered too. The autoheal image is pinned to a released version rather than `latest`, because the venue has no internet and the image must be pulled in advance.

## Consequences:

### Positive:

- A hung server, frontend, nginx, database or Redis is restarted within about two minutes without anyone noticing it first.
- A Redis outage now restarts Redis, the only restart that fixes it.

### Negative:

- The autoheal container mounts the Docker socket, which gives it root-equivalent control of the host. It is a widely used, single-purpose image, and AEMS already runs on a dedicated machine on an isolated network.
- A fault that a restart doesn't fix, such as a full disk, becomes a restart loop instead of a container that stays unhealthy. `docker compose ps` and the autoheal logs still show it.
- The server's container status no longer reflects whether it can reach the database or Redis. Operators read those services' own status, or the health endpoint, instead.
- Restarting the server or Redis drops every Socket.IO connection. Clients reconnect on their own, but live screens pause briefly.
- Autoheal acts on every labelled container on the host, so two AEMS stacks on one machine would each restart the other's containers.

## Review:

Revisit if AEMS moves to an orchestrator that restarts unhealthy containers itself, or if the webapp gains its own health banner and operators prefer to restart services by hand.
