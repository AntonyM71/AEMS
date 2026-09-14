import os

# socket_manager requires REDIS_URL. The unit suite runs with no services, so it
# names the in-memory manager rather than relying on the variable being absent.
# setdefault so a caller that does supply a real Redis still wins.
os.environ.setdefault("REDIS_URL", "memory")
