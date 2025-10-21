<template>
  <section class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-lagoon to-night p-10 shadow-2xl">
    <div class="absolute inset-0 opacity-40">
      <svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 600 600">
        <defs>
          <linearGradient id="grid" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.15" />
            <stop offset="100%" stop-color="#a3e635" stop-opacity="0.1" />
          </linearGradient>
        </defs>
        <path
          v-for="line in 25"
          :key="line"
          :d="`M ${line * 24} 0 L 0 ${line * 24}`"
          stroke="url(#grid)"
          stroke-width="0.6"
        />
      </svg>
    </div>
    <div class="relative z-10 grid gap-8 md:grid-cols-[minmax(0,3fr),minmax(0,2fr)] items-center">
      <div class="space-y-6">
        <p class="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-sky-200">
          Front-End Engineer · Quantitative Systems
        </p>
        <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Turning high-velocity data into decisive interfaces
        </h1>
        <p class="max-w-xl text-lg text-slate-200/90">
          I architect Vue + TypeScript experiences that translate complex market telemetry into actionable intelligence for trading teams. My toolset spans real-time visualization, resilient data pipelines, and collaborative delivery.
        </p>
        <dl class="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div v-for="metric in headlineMetrics" :key="metric.label" class="rounded-xl bg-night/70 p-4 text-slate-100">
            <dt class="text-xs uppercase tracking-wide text-slate-400">{{ metric.label }}</dt>
            <dd class="mt-2 text-2xl font-semibold text-sky-200">{{ metric.value }}</dd>
          </div>
        </dl>
      </div>
      <div class="rounded-3xl border border-sky-500/40 bg-night/80 p-6 shadow-xl">
        <p class="text-sm uppercase tracking-[0.3em] text-slate-400">Stack Snapshot</p>
        <ul class="mt-4 space-y-3 text-sm text-slate-200">
          <li v-for="item in stack" :key="item.label" class="flex items-center justify-between gap-4 rounded-xl border border-sky-400/20 bg-sky-400/5 px-4 py-3">
            <div>
              <p class="font-semibold text-sky-100">{{ item.label }}</p>
              <p class="text-xs text-slate-400">{{ item.description }}</p>
            </div>
            <span class="rounded-full bg-sky-400/15 px-3 py-1 text-xs font-medium text-sky-200">{{ item.level }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface MetricCard {
  label: string;
  value: string;
}

interface StackItem {
  label: string;
  description: string;
  level: string;
}

const headlineMetrics: MetricCard[] = [
  { label: 'Production UIs shipped', value: '40+' },
  { label: 'Realtime dashboards', value: '12' },
  { label: 'Latency optimized', value: '<10ms' },
  { label: 'Stakeholder teams', value: '8 cross-functional' }
];

const stack: StackItem[] = [
  {
    label: 'Vue 3 + TypeScript',
    description: 'Composition API, strongly-typed stores, component systems',
    level: 'Expert'
  },
  {
    label: 'D3 & Chart.js',
    description: 'Streaming telemetry, quantitative visual design',
    level: 'Advanced'
  },
  {
    label: 'Node & Python APIs',
    description: 'Event brokers, data normalisation, low-latency pipelines',
    level: 'Advanced'
  },
  {
    label: 'DevOps & Observability',
    description: 'Grafana, k6, CI/CD, Lighthouse automation',
    level: 'Proficient'
  }
];
</script>
