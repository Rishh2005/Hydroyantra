// Advanced analytics and forecasting utilities
export interface AnalyticsMetric {
  timestamp: number
  value: number
  label: string
}

export interface Forecast {
  timestamp: number
  value: number
  confidence: number
  lower: number
  upper: number
}

export function generateCostBreakdown(): Array<{ name: string; value: number; percentage: number }> {
  const total = 100000
  const breakdown = [
    { name: "Electricity", value: 45000, percentage: 45 },
    { name: "Maintenance", value: 20000, percentage: 20 },
    { name: "Storage", value: 15000, percentage: 15 },
    { name: "Transportation", value: 12000, percentage: 12 },
    { name: "Other", value: 8000, percentage: 8 },
  ]
  return breakdown
}

export function generateEfficiencyHeatmap(): Array<{ hour: number; day: string; efficiency: number }> {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const data: Array<{ hour: number; day: string; efficiency: number }> = []

  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      // Peak efficiency during solar hours (8-16)
      const baseEfficiency = hour >= 8 && hour <= 16 ? 55 : 45
      const efficiency = baseEfficiency + (Math.random() - 0.5) * 10
      data.push({
        hour,
        day: days[day],
        efficiency: Math.max(30, Math.min(70, efficiency)),
      })
    }
  }

  return data
}

export function generateForecast(days = 30): Forecast[] {
  const forecasts: Forecast[] = []
  const now = Date.now()

  for (let i = 0; i < days; i++) {
    const timestamp = now + i * 86400000
    const baseValue = 250 + Math.sin(i / 7) * 30
    const value = baseValue + (Math.random() - 0.5) * 20
    const confidence = 95 - i * 1.5 // Confidence decreases over time

    forecasts.push({
      timestamp,
      value: Math.max(200, value),
      confidence: Math.max(60, confidence),
      lower: Math.max(180, value - 30),
      upper: Math.min(320, value + 30),
    })
  }

  return forecasts
}

export function generateAIInsights(): string[] {
  return [
    "Production efficiency peaked at 58.3% during solar peak hours (12-14:00). Consider scheduling high-demand processes during this window.",
    "Renewable energy contribution reached 78% today, the highest in 30 days. Grid dependency minimized.",
    "Predictive maintenance alert: Electrolyzer stack temperature trending upward. Schedule inspection within 7 days.",
    "Market opportunity: Hydrogen prices up 12% this week. Consider increasing production capacity.",
    "Storage optimization: Current tank levels at 72%. Recommend maintaining 70-80% for optimal efficiency.",
  ]
}
