export type TimeseriesPoint = { t: string; production: number; consumption: number; efficiency: number }

export function generate24hSeries(): TimeseriesPoint[] {
  const out: TimeseriesPoint[] = []
  const now = new Date()
  for (let i = 23; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 60 * 60 * 1000)
    const production = 200 + Math.random() * 80
    const consumption = 300 + Math.random() * 120
    const efficiency = 40 + Math.random() * 20
    out.push({ t: d.toLocaleTimeString([], { hour: "2-digit" }), production, consumption, efficiency })
  }
  return out
}

export function kpis() {
  return {
    productionRate: { value: 245.3, delta: 12.3, status: "Stable" },
    energyEfficiency: { value: 52.7, renewablePct: 68, cost: 41250 },
    systemHealth: { operational: 96, storage: 72, maintenanceIn: "04d 11h" },
    carbonImpact: { co2Avoided: 1824, certificates: 128, verified: true },
  }
}

export function agents() {
  return [
    {
      name: "Predictive Maintenance",
      status: "Active",
      confidence: 92,
      banner: "Electrolyzer Cell 4 Degradation - 7 days to failure - 90% confidence",
    },
    { name: "Production Optimizer", status: "Optimizing", savings: 45230 },
    { name: "Market Intelligence", status: "Analyzing", opportunity: 230000 },
  ]
}

export function recentAlerts() {
  const severities = ["info", "warning", "critical"] as const
  const pick = () => severities[Math.floor(Math.random() * severities.length)]
  return Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    ts: new Date(Date.now() - i * 3600_000).toLocaleString(),
    source: ["Electrolyzer", "SCADA", "Optimizer", "Storage"][i % 4],
    severity: pick(),
    message: ["Voltage drift detected", "High tank pressure", "Forecast price spike", "Certificate verified"][i % 4],
  }))
}
