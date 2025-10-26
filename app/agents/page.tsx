"use client"

import { AppShell } from "@/components/shell/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Wrench, LineChart, TrendingUp } from "lucide-react"
import {
  ResponsiveContainer,
  LineChart as LChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  Tooltip,
  Legend,
} from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { useState, useEffect } from "react"
import { predictMaintenanceIssue, optimizeProductionStrategy, analyzeMarketOpportunity } from "@/lib/ai-advanced"

const tempTrend = Array.from({ length: 12 }).map((_, i) => ({ x: i, temp: 60 + Math.sin(i / 2) * 8 }))
const voltDeg = Array.from({ length: 12 }).map((_, i) => ({ x: i, v: 2.1 - i * 0.02 }))
const energyPrice = Array.from({ length: 24 }).map((_, i) => ({ h: i, price: 6 + Math.sin(i / 3) }))
const renewMix = Array.from({ length: 24 }).map((_, i) => ({
  h: i,
  solar: Math.max(0, Math.sin((i - 6) / 3) * 40),
  wind: 30 + Math.sin(i / 2) * 10,
  hydro: 20,
}))

export default function AgentsPage() {
  const [maintenanceData, setMaintenanceData] = useState({
    issue: "Cell degradation detected",
    confidence: 92,
    daysToFailure: 7,
  })
  const [strategyData, setStrategyData] = useState({
    strategy: "Shift load to solar peak (11:00–15:00)",
    expectedSavings: 45230,
  })
  const [marketData, setMarketData] = useState({
    opportunity: "Strong demand in industrial sector",
    margin: 35,
    recommendation: "Increase production",
  })
  const [loading, setLoading] = useState({ maintenance: false, strategy: false, market: false })

  useEffect(() => {
    // Load AI insights on mount
    const loadInsights = async () => {
      setLoading({ maintenance: true, strategy: true, market: true })
      try {
        const [maint, strat, market] = await Promise.all([
          predictMaintenanceIssue({ temperature: 65, voltage: 48, pressure: 25 }),
          optimizeProductionStrategy({ solar: 65, wind: 45, hydro: 30 }, 6.5),
          analyzeMarketOpportunity(450, 350),
        ])
        setMaintenanceData(maint)
        setStrategyData(strat)
        setMarketData(market)
      } catch (error) {
        console.error("[v0] Failed to load AI insights:", error)
      } finally {
        setLoading({ maintenance: false, strategy: false, market: false })
      }
    }
    loadInsights()
  }, [])

  return (
    <AppShell>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Predictive Maintenance */}
        <Card className="xl:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Wrench className="size-4 text-primary" /> Predictive Maintenance
              </span>
              <Badge className="bg-primary">Active</Badge>
            </CardTitle>
            <div className="text-sm text-muted-foreground">Confidence: {maintenanceData.confidence}%</div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded border border-amber-200 bg-amber-50 dark:bg-amber-950/30 p-3 text-amber-700 dark:text-amber-300 text-sm">
              {maintenanceData.issue} - {maintenanceData.daysToFailure} days to failure
            </div>
            <div className="grid grid-cols-2 gap-3">
              <MiniLine title="Stack Temp" dataKey="temp" data={tempTrend} />
              <MiniLine title="Voltage" dataKey="v" data={voltDeg} />
            </div>
            <div className="flex gap-2">
              <Button size="sm">Schedule Maintenance</Button>
              <Button size="sm" variant="outline">
                Run Diagnostics
              </Button>
              <Button size="sm" variant="secondary">
                Export Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Dynamic Production Optimizer */}
        <Card className="xl:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <LineChart className="size-4 text-primary" /> Dynamic Production Optimizer
              </span>
              <Badge className="bg-primary">Optimizing</Badge>
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              Savings: ₹{strategyData.expectedSavings.toLocaleString()}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border bg-muted/50 p-3">
              <span className="font-medium text-primary">Current strategy:</span> {strategyData.strategy}
            </div>
            <div className="h-[140px]">
              <ChartContainer config={{ price: { label: "₹/kWh", color: "hsl(var(--chart-1))" } }} className="h-full">
                <ResponsiveContainer>
                  <LChart data={energyPrice}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="h" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line dataKey="price" stroke="var(--color-price)" dot={false} />
                  </LChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="h-[140px]">
              <ResponsiveContainer>
                <AreaChart data={renewMix}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="h" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area dataKey="solar" stackId="1" stroke="var(--chart-1)" fill="var(--chart-1)" />
                  <Area dataKey="wind" stackId="1" stroke="var(--chart-2)" fill="var(--chart-2)" />
                  <Area dataKey="hydro" stackId="1" stroke="var(--chart-3)" fill="var(--chart-3)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="auto-mode" defaultChecked />
              <label htmlFor="auto-mode" className="text-sm">
                Auto Mode ON
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Market Intelligence */}
        <Card className="xl:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <TrendingUp className="size-4 text-primary" /> Market Intelligence
              </span>
              <Badge className="bg-primary">Analyzing</Badge>
            </CardTitle>
            <div className="text-sm text-muted-foreground">Opportunity: ₹2.3L</div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border p-3">
              <div className="font-medium">Recommendation</div>
              <div className="text-sm text-muted-foreground">
                {marketData.opportunity} • Margin: {marketData.margin}% • {marketData.recommendation}
              </div>
              <div className="mt-2 flex gap-2">
                <Button size="sm">Accept Contract</Button>
                <Button size="sm" variant="secondary">
                  Negotiate
                </Button>
                <Button size="sm" variant="outline">
                  View Blockchain
                </Button>
              </div>
            </div>
            <div className="rounded-md border p-3 h-[180px] grid place-items-center text-sm text-muted-foreground">
              Interactive supply chain map placeholder
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}

function MiniLine({ title, dataKey, data }: { title: string; dataKey: string; data: any[] }) {
  return (
    <div className="h-[120px]">
      <ChartContainer config={{ [dataKey]: { label: title, color: "hsl(var(--chart-1))" } }} className="h-full">
        <ResponsiveContainer>
          <LChart data={data}>
            <XAxis dataKey="x" hide />
            <YAxis hide />
            <Tooltip />
            <Line dataKey={dataKey} stroke="var(--color-price)" dot={false} />
          </LChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
