<template>
  <section class="rounded-3xl border border-sky-400/30 bg-night/70 p-10 shadow-xl">
    <div class="flex flex-wrap items-center justify-between gap-6">
      <div>
        <h2 class="text-2xl font-semibold text-white">Realtime Operations Telemetry</h2>
        <p class="mt-2 max-w-2xl text-sm text-slate-300">
          Streaming metrics sourced from a Python normalisation job and served through a Node.js API. The dashboard aggregates telemetry across execution venues to provide latency-aware decision support.
        </p>
      </div>
      <div class="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.4em] text-emerald-200">
        {{ lastUpdatedLabel }}
      </div>
    </div>

    <div v-if="error" class="mt-8 rounded-2xl border border-rose-500/40 bg-rose-500/10 p-5 text-sm text-rose-100">
      <p class="font-semibold">Unable to reach telemetry API</p>
      <p class="mt-1 text-rose-200/80">{{ error }}</p>
    </div>

    <div v-else class="mt-8 grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
      <div class="rounded-2xl border border-sky-500/40 bg-sky-500/10 p-6">
        <LatencyChart :labels="chartLabels" :values="chartValues" />
      </div>
      <div class="space-y-4">
        <article class="rounded-2xl border border-slate-500/40 bg-slate-500/10 p-5" aria-labelledby="summary-heading">
          <h3 id="summary-heading" class="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Current posture</h3>
          <div v-if="loading" class="mt-4 text-sm text-slate-400">Synchronising metrics…</div>
          <dl v-else class="mt-4 grid grid-cols-2 gap-4 text-slate-100">
            <div v-for="item in summaryMetrics" :key="item.label" class="rounded-xl bg-night/80 p-4">
              <dt class="text-xs uppercase tracking-wide text-slate-400">{{ item.label }}</dt>
              <dd class="mt-2 text-xl font-semibold" :class="item.emphasis">{{ item.value }}</dd>
            </div>
          </dl>
        </article>
        <article class="rounded-2xl border border-slate-500/40 bg-slate-500/10 p-5" aria-labelledby="alerts-heading">
          <div class="flex items-center justify-between gap-3">
            <h3 id="alerts-heading" class="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Active responses</h3>
            <span class="rounded-full bg-amber-400/15 px-3 py-1 text-xs font-medium text-amber-200">{{ alerts.length }} alerts</span>
          </div>
          <ul class="mt-4 space-y-3">
            <li v-for="alert in alerts" :key="alert.title" class="rounded-xl border border-slate-400/20 bg-night/80 px-4 py-3">
              <p class="text-sm font-semibold text-slate-100">{{ alert.title }}</p>
              <p class="text-xs text-slate-400">{{ alert.action }}</p>
              <span class="mt-2 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide"
                :class="severityClass(alert.severity)">
                {{ alert.severity }}
              </span>
            </li>
          </ul>
        </article>
      </div>
    </div>

    <div class="mt-10">
      <h3 class="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">System Health Snapshots</h3>
      <div class="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article v-for="system in systems" :key="system.name" class="rounded-2xl border border-slate-500/40 bg-slate-500/10 p-5">
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-semibold text-slate-100">{{ system.name }}</h4>
            <span class="h-2 w-2 rounded-full" :class="statusColor(system.status)"></span>
          </div>
          <dl class="mt-4 space-y-2 text-sm text-slate-300">
            <div class="flex items-center justify-between">
              <dt>P99 latency</dt>
              <dd class="font-mono text-base text-sky-200">{{ system.latencyMs }} ms</dd>
            </div>
            <div class="flex items-center justify-between">
              <dt>Throughput</dt>
              <dd class="font-mono text-base text-lime-200">{{ system.messagesPerSec.toLocaleString() }} msg/s</dd>
            </div>
          </dl>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import LatencyChart from './charts/LatencyChart.vue';
import { useMetricsStore } from '../stores/metricsStore';

const store = useMetricsStore();

const { summary, alerts, systems, latencySeries, lastUpdated, loading, error } = storeToRefs(store);

const chartLabels = computed(() => latencySeries.value.map((point) => point.time));
const chartValues = computed(() => latencySeries.value.map((point) => point.value));

const summaryMetrics = computed(() => [
  {
    label: 'Platform uptime',
    value: summary.value?.uptime ?? '—',
    emphasis: 'text-emerald-200'
  },
  {
    label: 'P99 latency',
    value: summary.value ? `${summary.value.latencyP99} ms` : '—',
    emphasis: summary.value && summary.value.latencyP99 < 15 ? 'text-sky-200' : 'text-amber-200'
  },
  {
    label: 'Orders / second',
    value: summary.value ? summary.value.ordersPerSecond.toLocaleString() : '—',
    emphasis: 'text-lime-200'
  },
  {
    label: 'Error budget used',
    value: summary.value ? `${summary.value.errorRate.toFixed(2)} %` : '—',
    emphasis: 'text-rose-200'
  }
]);

const lastUpdatedLabel = computed(() => {
  if (!lastUpdated.value) return 'Awaiting feed';
  return `Updated ${lastUpdated.value}`;
});

function severityClass(severity: 'low' | 'medium' | 'high') {
  switch (severity) {
    case 'high':
      return 'bg-rose-500/15 text-rose-200 border border-rose-400/30';
    case 'medium':
      return 'bg-amber-500/15 text-amber-200 border border-amber-400/30';
    default:
      return 'bg-emerald-500/15 text-emerald-200 border border-emerald-400/30';
  }
}

function statusColor(status: 'green' | 'amber' | 'red') {
  if (status === 'green') return 'bg-emerald-400';
  if (status === 'amber') return 'bg-amber-400';
  return 'bg-rose-400';
}
</script>
