"""
Fires N concurrent requests at one URL and reports requests/sec.

Point it at a blocking endpoint (e.g. /phase_pdf/{id}) before and after a
Phase 1/2/3 fix from docs/superpowers/plans/2026-09-13-fix-blocking-event-loop-handlers.md:
if the handler still blocks the event loop, requests serialize and
requests/sec stays near 1/request_time no matter how high --concurrent-requests is;
once it's offloaded to a thread, requests/sec scales up with --concurrent-requests.

If the url contains the literal "{phase_id}" placeholder, a phase (with a
canned competition/event/scoresheet/heat, 20 athletes, 30 scored moves per
athlete and 1-3 bonuses per athlete, dev DB only) is reused if one already
exists, or created if not, and its id is substituted in.

Pass --serve to also start `uvicorn main:socket_app` before benchmarking and
stop it afterwards, so you don't need a server already running in another
terminal.

Usage:
  python -m scripts.bench_event_loop "http://localhost:8000/phase_pdf/{phase_id}" --concurrent-requests 10 --serve
  python -m scripts.bench_event_loop http://localhost:8000/getHeatScores/<real-heat-id> --concurrent-requests 10
"""

import argparse
import asyncio
import socket
import subprocess
import time
from collections import Counter
from urllib.parse import urlsplit

import httpx

from db.canned_data import ensure_canned_phase
from db.client import transaction_session_context_manager

SERVER_STARTUP_TIMEOUT_SECONDS = 15


def ensure_canned_phase_id() -> str:
    with transaction_session_context_manager() as db:
        return ensure_canned_phase(db).phase_id


def start_server(port: int) -> subprocess.Popen[bytes]:
    """Start `uvicorn main:socket_app` (logs suppressed) and wait until it accepts connections.

    Refuses to start if the port is already taken. Otherwise the readiness check
    below would be answered by whatever is already listening, and the benchmark
    would silently measure that instead, leaving its own uvicorn dead and the
    foreign server running afterwards.
    """
    with socket.socket() as probe:
        if probe.connect_ex(("localhost", port)) == 0:
            msg = (
                f"Port {port} is already in use. Stop whatever is listening "
                "there, or benchmark it directly without --serve."
            )
            raise RuntimeError(msg)

    process = subprocess.Popen(
        ["uvicorn", "main:socket_app", "--port", str(port)],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    deadline = time.monotonic() + SERVER_STARTUP_TIMEOUT_SECONDS
    with httpx.Client() as client:
        while time.monotonic() < deadline:
            if process.poll() is not None:
                msg = f"uvicorn exited with status {process.returncode} during startup"
                raise RuntimeError(msg)
            try:
                client.get(f"http://localhost:{port}/docs", timeout=1)
            except httpx.TransportError:
                time.sleep(0.5)
            else:
                return process
    process.terminate()
    msg = f"Server did not start listening on port {port} within {SERVER_STARTUP_TIMEOUT_SECONDS}s"
    raise RuntimeError(msg)


async def fire(url: str, concurrent_requests: int) -> None:
    async with httpx.AsyncClient(timeout=60) as client:
        start = time.perf_counter()
        responses = await asyncio.gather(
            *(client.get(url) for _ in range(concurrent_requests))
        )
        elapsed = time.perf_counter() - start

    status_counts = Counter(r.status_code for r in responses)
    status_summary = ", ".join(
        f"{code}x{count}" for code, count in sorted(status_counts.items())
    )
    print()
    print("=" * 44)
    print(
        f"  {concurrent_requests} req in {elapsed:.2f}s  ->  "
        f"{concurrent_requests / elapsed:.1f} req/s"
    )
    print(f"  {status_summary}")
    print("=" * 44)


parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("url")
parser.add_argument("--concurrent-requests", type=int, default=10)
parser.add_argument(
    "--serve",
    action="store_true",
    help="start uvicorn main:socket_app before benchmarking and stop it after",
)
args = parser.parse_args()

target_url = args.url
if "{phase_id}" in target_url:
    target_url = target_url.format(phase_id=ensure_canned_phase_id())

server_process = None
if args.serve:
    # Defaulting to 8000 here would start a healthy server on 8000 while the
    # requests went to the url's scheme default, port 80.
    serve_port = urlsplit(target_url).port
    if serve_port is None:
        msg = (
            "--serve needs an explicit port in the url, "
            "e.g. http://localhost:8000/phase_pdf/{phase_id}"
        )
        raise SystemExit(msg)
    server_process = start_server(serve_port)

try:
    asyncio.run(fire(target_url, args.concurrent_requests))
finally:
    if server_process is not None:
        server_process.terminate()
        server_process.wait()
