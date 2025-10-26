"use client"

import { AppShell } from "@/components/shell/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts"
import { useState, useEffect } from "react"
import { generateCostBreakdown, generateEfficiencyHeatmap, generateForecast, generateAIInsights } from "@/lib/analytics"

export default function AnalyticsPage() {
  const [costData, setCostData] = useState<any[]>([])
  const [heatmapData, setHeatmapData] = useState<any[]>([])
  const [forecastData, setForecastData] = useState<any[]>([])
  const [insights, setInsights] = useState<string[]>([])

  useEffect(() => {
    setCostData(generateCostBreakdown())
    setHeatmapData(generateEfficiencyHeatmap())
    setForecastData(generateForecast(30))
    setInsights(generateAIInsights())
  }, [])

  const heatmap = Array.from({ length: 7 }).map((_, d) =>
    Array.from({ length: 24 }).map((_, h) => {
      const found = heatmapData.find(
        (x) => x.day === ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][d] && x.hour === h,
      )
      return { d, h, v: found ? found.efficiency / 70 : Math.max(0, Math.sin(h / 3) + Math.cos(d) * 0.5) }
    }),
  )

  return (
    <AppShell>
      <div className="flex flex-wrap gap-3 items-end">
        <div className="grid gap-1">
          <label className="text-sm text-muted-foreground">Date range</label>
          <Input placeholder="2025-09-12 to 2025-10-11" className="w-64" />
        </div>
        <div className="grid gap-1">
          <label className="text-sm text-muted-foreground">Metrics</label>
          <Select defaultValue="production">
            <SelectTrigger className="w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="production">Production</SelectItem>
              <SelectItem value="consumption">Consumption</SelectItem>
              <SelectItem value="efficiency">Efficiency</SelectItem>
              <SelectItem value="cost">Cost</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>Generate Report</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Cost Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-[220px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={costData} dataKey="value" nameKey="name" outerRadius={80} label>
                  {costData.map((_, i) => (
                    <Cell key={i} fill={`hsl(var(--chart-${(i % 4) + 1}))`} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Efficiency Heatmap</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-rows-7 gap-1">
            {heatmap.map((row, r) => (
              <div key={r} className="grid grid-cols-24 gap-1">
                {row.map((cell, c) => (
                  <div
                    key={c}
                    className="h-5 rounded"
                    style={{ backgroundColor: `rgba(16,185,129,${0.15 + cell.v * 0.6})` }}
                  />
                ))}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>30-day Forecast</CardTitle>
          </CardHeader>
          <CardContent className="h-[220px]">
            <ResponsiveContainer>
              <AreaChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="d" />
                <YAxis />
                <Tooltip />
                <Area dataKey="upper" stroke="transparent" fill="hsl(var(--chart-1)/.2)" />
                <Area dataKey="lower" stroke="transparent" fill="hsl(var(--chart-1)/.2)" />
                <Line dataKey="value" stroke="var(--chart-1)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>AI Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {insights.map((insight, i) => (
              <div key={i} className="text-sm text-muted-foreground flex gap-2">
                <span className="text-primary">•</span>
                <span>{insight}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
