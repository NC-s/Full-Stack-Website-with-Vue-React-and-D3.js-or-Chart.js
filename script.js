const latencyCtx = document.getElementById("latencyChart");
const currentLatencyEl = document.getElementById("currentLatency");
const maxLatencyEl = document.getElementById("maxLatency");
const eventCountEl = document.getElementById("eventCount");

const LATENCY_MIN = 2;
const LATENCY_MAX = 30;
const WINDOW_SIZE = 30;

const latencyData = Array.from({ length: WINDOW_SIZE }, () => 0);
let eventCount = 0;
let maxLatency = 0;

const chart = new Chart(latencyCtx, {
  type: "line",
  data: {
    labels: Array.from({ length: WINDOW_SIZE }, (_, i) => `${i + 1}`),
    datasets: [
      {
        label: "Latency (ms)",
        data: latencyData,
        borderColor: "#5de4c7",
        backgroundColor: "rgba(93, 228, 199, 0.15)",
        borderWidth: 2,
        tension: 0.35,
        pointRadius: 0,
        fill: true,
      },
    ],
  },
  options: {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
      },
      y: {
        min: 0,
        max: 40,
        ticks: {
          color: "#a7b0c3",
          callback: (value) => `${value}ms`,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.08)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  },
});

function simulateLatency() {
  const newLatency = parseFloat(
    (Math.random() * (LATENCY_MAX - LATENCY_MIN) + LATENCY_MIN).toFixed(2)
  );

  latencyData.shift();
  latencyData.push(newLatency);
  chart.update();

  eventCount += Math.floor(Math.random() * 120) + 80;
  maxLatency = Math.max(maxLatency, newLatency);

  currentLatencyEl.textContent = `${newLatency} ms`;
  maxLatencyEl.textContent = `${maxLatency.toFixed(2)} ms`;
  eventCountEl.textContent = eventCount.toLocaleString();
}

setInterval(simulateLatency, 1500);
simulateLatency();
