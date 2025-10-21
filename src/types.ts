export interface MetricSummary {
  uptime: string;
  latencyP99: number;
  ordersPerSecond: number;
  errorRate: number;
}

export interface SystemHealth {
  name: string;
  status: 'green' | 'amber' | 'red';
  latencyMs: number;
  messagesPerSec: number;
}

export interface AlertInsight {
  title: string;
  severity: 'low' | 'medium' | 'high';
  action: string;
}

export interface LatencyPoint {
  time: string;
  value: number;
}

export interface MetricPayload {
  timestamp: string;
  summary: MetricSummary;
  systems: SystemHealth[];
  latencySeries: LatencyPoint[];
  alerts: AlertInsight[];
}
