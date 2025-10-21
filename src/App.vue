<template>
  <main class="mx-auto max-w-6xl space-y-12 px-6 py-12">
    <HeroSection />

    <section class="grid gap-8 lg:grid-cols-[minmax(0,3fr),minmax(0,2fr)]">
      <article class="rounded-3xl border border-sky-400/20 bg-night/70 p-8 shadow-xl">
        <h2 class="text-2xl font-semibold text-white">Core capabilities</h2>
        <p class="mt-2 text-sm text-slate-300">
          The interfaces I deliver are built for decision velocity: observable, accessible, and fuelled by resilient data flows. Here’s how I combine engineering and design rigour.
        </p>
        <div class="mt-6 grid gap-4 sm:grid-cols-2">
          <div v-for="capability in capabilities" :key="capability.title" class="rounded-2xl border border-sky-400/20 bg-sky-400/5 p-5">
            <h3 class="text-lg font-semibold text-sky-100">{{ capability.title }}</h3>
            <p class="mt-2 text-sm text-slate-200/90">{{ capability.description }}</p>
            <ul class="mt-4 space-y-1 text-xs text-slate-400">
              <li v-for="item in capability.highlights" :key="item" class="flex items-start gap-2">
                <span class="mt-1 h-2 w-2 rounded-full bg-sky-300"></span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </article>
      <aside class="space-y-6">
        <article class="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
          <h3 class="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200">Collaboration flywheel</h3>
          <ol class="mt-4 space-y-4 text-sm text-slate-100">
            <li v-for="(stage, index) in collaboration" :key="stage.title" class="rounded-2xl border border-emerald-400/30 bg-night/80 p-4">
              <div class="flex items-center gap-3">
                <span class="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 font-semibold text-emerald-200">{{ index + 1 }}</span>
                <p class="font-semibold">{{ stage.title }}</p>
              </div>
              <p class="mt-2 text-xs text-slate-300">{{ stage.summary }}</p>
            </li>
          </ol>
        </article>
        <article class="rounded-3xl border border-sky-400/20 bg-sky-500/10 p-6">
          <h3 class="text-sm font-semibold uppercase tracking-[0.3em] text-sky-200">Tooling accelerators</h3>
          <ul class="mt-4 space-y-3 text-sm text-slate-100">
            <li v-for="tool in tooling" :key="tool" class="flex items-center gap-3">
              <span class="h-1.5 w-8 rounded-full bg-sky-400"></span>
              <span>{{ tool }}</span>
            </li>
          </ul>
        </article>
      </aside>
    </section>

    <MetricsDashboard />

    <section class="rounded-3xl border border-slate-500/30 bg-slate-500/10 p-10">
      <h2 class="text-2xl font-semibold text-white">Delivery signals</h2>
      <div class="mt-6 grid gap-6 lg:grid-cols-3">
        <div v-for="signal in deliverySignals" :key="signal.title" class="rounded-2xl border border-slate-400/20 bg-night/70 p-6">
          <p class="text-xs uppercase tracking-[0.3em] text-slate-400">{{ signal.category }}</p>
          <h3 class="mt-2 text-lg font-semibold text-sky-100">{{ signal.title }}</h3>
          <p class="mt-3 text-sm text-slate-300">{{ signal.description }}</p>
          <ul class="mt-4 space-y-1 text-xs text-slate-400">
            <li v-for="point in signal.points" :key="point">{{ point }}</li>
          </ul>
        </div>
      </div>
    </section>

    <footer class="rounded-3xl border border-sky-400/20 bg-night/70 p-8 text-sm text-slate-400">
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="text-xs uppercase tracking-[0.4em] text-sky-200">Let’s build decisive interfaces</p>
          <p class="mt-2 text-base text-slate-200">
            Ready to collaborate on resilient, high-performance trading tools. I adapt quickly to new venues, data feeds, and research-driven requirements.
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-4 text-slate-300">
          <a href="mailto:quant-ui@fastmail.com" class="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/10 px-4 py-2 font-medium text-sky-100 transition hover:border-sky-300">
            Email
          </a>
          <a href="https://github.com/quant-ui" class="inline-flex items-center gap-2 rounded-full border border-slate-400/40 bg-slate-400/10 px-4 py-2 font-medium text-slate-100 transition hover:border-slate-200">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/quant-ui" class="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 font-medium text-emerald-100 transition hover:border-emerald-300">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  </main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import HeroSection from './components/HeroSection.vue';
import MetricsDashboard from './components/MetricsDashboard.vue';
import { useMetricsStore } from './stores/metricsStore';

interface Capability {
  title: string;
  description: string;
  highlights: string[];
}

interface Stage {
  title: string;
  summary: string;
}

interface DeliverySignal {
  category: string;
  title: string;
  description: string;
  points: string[];
}

const store = useMetricsStore();

const capabilities: Capability[] = [
  {
    title: 'Real-time data orchestration',
    description: 'Design web sockets, SSE and polling strategies that surface low-latency metrics without overloading client or network resources.',
    highlights: ['Event-driven stores with Pinia', 'Back-pressure aware fetch cadence', 'Optimised bundling with Vite']
  },
  {
    title: 'Quant visualization systems',
    description: 'Craft dashboards with Chart.js and D3 that respect market semantics and highlight actionable anomalies.',
    highlights: ['Accessible colour palettes', 'Latency quantiles & VWAP overlays', 'Time-travel debugging tooling']
  },
  {
    title: 'API collaboration',
    description: 'Partner with Node and Python teams to define schemas, ensure observability, and deliver reliable integration test suites.',
    highlights: ['Contract tests with Playwright', 'AsyncAPI / OpenAPI governance', 'Telemetry driven acceptance criteria']
  },
  {
    title: 'Operational excellence',
    description: 'Automate QA signals across performance, accessibility, and error budgets to shorten the feedback loop.',
    highlights: ['k6 & Lighthouse automation', 'GitHub Actions pipelines', 'A11y-first design reviews']
  }
];

const collaboration: Stage[] = [
  {
    title: 'Discover & align',
    summary: 'Pair with researchers and traders to define use cases, metrics and success signals.'
  },
  {
    title: 'Prototype & validate',
    summary: 'Build interactive proofs-of-concept in Vue to de-risk ideas with real data feeds.'
  },
  {
    title: 'Productise & scale',
    summary: 'Harden the UX with typed stores, test coverage and observability hooks.'
  },
  {
    title: 'Measure & iterate',
    summary: 'Use live telemetry to focus improvements and keep the interface aligned with desk needs.'
  }
];

const tooling = [
  'Vite + Vitest + Playwright for rapid feedback',
  'Storybook-driven component collaboration',
  'Grafana / Prometheus dashboards for production insight',
  'Feature flag frameworks (Unleash, LaunchDarkly)'
];

const deliverySignals: DeliverySignal[] = [
  {
    category: 'Impact',
    title: 'Reduced desk triage time by 35%',
    description: 'Live operations console replaced manual log parsing with anomaly-driven insights.',
    points: ['Contextual alert overlays', 'Two-click remediation playbooks', 'Latency SLO tracking']
  },
  {
    category: 'Velocity',
    title: 'Delivered seven iterations in six weeks',
    description: 'Paired weekly with quants to refine and ship monitoring features.',
    points: ['Continuous deployment gating', 'Shadow prod verification', 'Stakeholder playback demos']
  },
  {
    category: 'Quality',
    title: 'Sustained <0.1% regression rate',
    description: 'Proactive instrumentation fed into automated quality checks and service-level alerts.',
    points: ['Synthetic monitoring harness', 'Alert fatigue prevention playbooks', 'Structured post-mortems']
  }
];

let interval: number | undefined;

onMounted(() => {
  store.hydrate();
  interval = window.setInterval(() => {
    store.hydrate();
  }, 8000);
});

onUnmounted(() => {
  if (interval) {
    window.clearInterval(interval);
  }
});
</script>
