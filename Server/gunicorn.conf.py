import os

from gunicorn.arbiter import Arbiter
from gunicorn.workers.base import Worker


def pre_fork(server: Arbiter, worker: Worker) -> None:
    """Give the new worker the lowest index no live worker holds.

    A replacement worker takes over its predecessor's index, so per-worker log
    files keep the same names across worker restarts.
    """
    taken = {getattr(w, "index", None) for w in server.WORKERS.values()}
    worker.index = next(i for i in range(len(taken) + 1) if i not in taken)


def post_fork(server: Arbiter, worker: Worker) -> None:
    os.environ["WORKER_INDEX"] = str(worker.index)
