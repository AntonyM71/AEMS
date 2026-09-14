import os

# socket_manager requires REDIS_URL; the unit suite runs with no services, so
# this names the sentinel explicitly. setdefault lets a real Redis still win.
os.environ.setdefault("REDIS_URL", "memory")
