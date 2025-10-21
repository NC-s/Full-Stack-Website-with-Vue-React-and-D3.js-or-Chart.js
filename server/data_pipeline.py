import json
import random
import time
from datetime import datetime, timezone, timedelta
from pathlib import Path

DATA_FILE = Path(__file__).parent / 'data' / 'metrics.json'

SYSTEM_TEMPLATES = [
    {
        "name": "Order Gateway",
        "latency_range": (6, 14),
        "throughput_range": (2200, 2800)
    },
    {
        "name": "Market Data",
        "latency_range": (10, 18),
        "throughput_range": (3800, 4800)
    },
    {
        "name": "Risk Engine",
        "latency_range": (14, 26),
        "throughput_range": (1400, 2100)
    },
    {
        "name": "Research API",
        "latency_range": (12, 22),
        "throughput_range": (850, 1200)
    }
]

ALERTS = [
    {
        "title": "Circuit breaker variance detected",
        "severity": "high",
        "action": "Coordinating with ops to pause non-critical orders"
    },
    {
        "title": "Market data burst detected",
        "severity": "medium",
        "action": "Auto-throttling UI updates to 120fps"
    },
    {
        "title": "Risk engine queue depth elevated",
        "severity": "low",
        "action": "Scaling async workers + notifying desk"
    }
]


def generate_payload() -> dict:
    now = datetime.now(timezone.utc)
    series = []
    base = random.uniform(8.0, 16.0)

    for step in range(12):
        variance = random.uniform(-3, 3)
        point = max(5, min(base + variance, 28))
        timestamp = now - timedelta(minutes=(55 - step * 5))
        series.append({
            "time": timestamp.strftime('%H:%M'),
            "value": round(point, 2)
        })

    systems = []
    for template in SYSTEM_TEMPLATES:
        latency = round(random.uniform(*template["latency_range"]), 2)
        throughput = random.randint(*template["throughput_range"])
        status = 'green'
        if latency > template["latency_range"][1] * 0.85:
            status = 'amber'
        if latency > template["latency_range"][1]:
            status = 'red'

        systems.append({
            "name": template["name"],
            "status": status,
            "latencyMs": latency,
            "messagesPerSec": throughput
        })

    payload = {
        "timestamp": now.isoformat(),
        "summary": {
            "uptime": f"{random.uniform(99.9, 99.999):.3f}%",
            "latencyP99": round(series[-1]["value"], 2),
            "ordersPerSecond": sum(system["messagesPerSec"] for system in systems),
            "errorRate": round(random.uniform(0.01, 0.08), 2)
        },
        "latencySeries": series,
        "systems": systems,
        "alerts": random.sample(ALERTS, k=2)
    }
    return payload


def main() -> None:
    print('Streaming synthetic metrics. Ctrl+C to stop.')
    try:
        while True:
            payload = generate_payload()
            DATA_FILE.write_text(json.dumps(payload, indent=2))
            print(f"Updated {DATA_FILE} at {payload['timestamp']}")
            time.sleep(5)
    except KeyboardInterrupt:
        print('\nPipeline stopped.')


if __name__ == '__main__':
    main()
