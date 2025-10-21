<template>
  <div>
    <h3 class="text-sm font-semibold uppercase tracking-[0.3em] text-sky-100">Latency distribution</h3>
    <div class="mt-4 h-64">
      <Line
        v-if="hasData"
        :data="chartData"
        :options="chartOptions"
        :height="256"
        class="h-full"
      />
      <p v-else class="flex h-full items-center justify-center text-sm text-slate-400">
        Waiting for telemetry feed...
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const props = defineProps<{
  labels: string[];
  values: number[];
}>();

const hasData = computed(() => props.values.length > 0);

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: 'P99 latency (ms)',
      data: props.values,
      borderColor: '#38bdf8',
      backgroundColor: 'rgba(56, 189, 248, 0.15)',
      tension: 0.4,
      fill: true,
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 5
    }
  ]
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: '#bae6fd',
        font: {
          family: 'JetBrains Mono'
        }
      },
      grid: {
        color: 'rgba(56, 189, 248, 0.2)'
      }
    },
    x: {
      ticks: {
        color: '#cbd5f5',
        font: {
          family: 'JetBrains Mono'
        }
      },
      grid: {
        color: 'rgba(56, 189, 248, 0.1)'
      }
    }
  },
  plugins: {
    legend: {
      labels: {
        color: '#e2e8f0'
      }
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      borderColor: '#38bdf8',
      borderWidth: 1,
      titleColor: '#38bdf8',
      bodyColor: '#e2e8f0'
    }
  }
};
</script>
