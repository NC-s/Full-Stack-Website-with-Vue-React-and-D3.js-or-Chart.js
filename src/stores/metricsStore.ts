import { defineStore } from 'pinia';
import axios from 'axios';
import { MetricPayload, LatencyPoint, SystemHealth, AlertInsight, MetricSummary } from '../types';

interface MetricsState {
  summary: MetricSummary | null;
  latencySeries: LatencyPoint[];
  systems: SystemHealth[];
  alerts: AlertInsight[];
  lastUpdated: string | null;
  loading: boolean;
  error: string | null;
}

export const useMetricsStore = defineStore('metrics', {
  state: (): MetricsState => ({
    summary: null,
    latencySeries: [],
    systems: [],
    alerts: [],
    lastUpdated: null,
    loading: false,
    error: null
  }),
  actions: {
    async hydrate() {
      this.loading = true;
      try {
        const response = await axios.get<MetricPayload>('/api/metrics');
        this.summary = response.data.summary;
        this.latencySeries = response.data.latencySeries;
        this.systems = response.data.systems;
        this.alerts = response.data.alerts;
        this.lastUpdated = response.data.timestamp;
        this.error = null;
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to load metrics';
      } finally {
        this.loading = false;
      }
    }
  }
});
