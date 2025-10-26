"use client"

import { AppShell } from "@/components/shell/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { useState, useEffect } from "react"
import { DigitalTwinSimulator } from "@/lib/simulation"

export default function ProductionPage() {
  const [simulator] = useState(() => new DigitalTwinSimulator())
  const [state, setState] = useState(simulator.getState())
  const [isRunning, setIsRunning] = useState(false)
  const [history, setHistory] = useState<any[]>([])

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      const newState = simulator.step(1)
      setState({ ...newState })
      setHistory((prev) => [...prev.slice(-71), { t: newState.time, ...newState }])
    }, 100)

    return () => clearInterval(interval)
  }, [isRunning, simulator])

  const energyArea = Array.from({ length: 24 }).map((_, i) => ({
    h: i,
    solar: Math.max(0, Math.sin((i - 6) / 3) * 40),
    wind: 30 + Math.sin(i / 2) * 10,
    hydro: 20,
    grid: 10,
  }))

  return (
    <AppShell>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Electrolyzer Status</CardTitle>
          </CardHeader>
          <CardContent className="grid place-items-center">
            <Gauge value={state.production} max={300} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Energy Sources</CardTitle>
          </CardHeader>
          <CardContent className="h-[220px]">
            <ResponsiveContainer>
              <AreaChart data={energyArea}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="h" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area dataKey="solar" stackId="1" stroke="var(--chart-1)" fill="var(--chart-1)" />
                <Area dataKey="wind" stackId="1" stroke="var(--chart-2)" fill="var(--chart-2)" />
                <Area dataKey="hydro" stackId="1" stroke="var(--chart-3)" fill="var(--chart-3)" />
                <Area dataKey="grid" stackId="1" stroke="var(--chart-4)" fill="var(--chart-4)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Digital Twin Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Temperature</div>
              <div className="font-medium">{state.temperature.toFixed(1)}°C</div>
              <div className="text-muted-foreground">Pressure</div>
              <div className="font-medium">{state.pressure.toFixed(1)} bar</div>
              <div className="text-muted-foreground">Voltage</div>
              <div className="font-medium">{state.voltage.toFixed(1)}V</div>
              <div className="text-muted-foreground">Storage</div>
              <div className="font-medium">{state.storageLevel.toFixed(1)}%</div>
            </div>
            <Button onClick={() => setIsRunning(!isRunning)} className="w-full">
              {isRunning ? "Stop Simulation" : "Start Simulation"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Time Series Analysis</span>
              <span className="flex items-center gap-2 text-xs">
                {isRunning && <span className="inline-block size-2 rounded-full bg-primary animate-pulse" />}
                <span className="text-muted-foreground">{isRunning ? "Live" : "Paused"}</span>
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer>
              <LineChart
                data={
                  history.length > 0
                    ? history
                    : Array.from({ length: 72 }).map((_, i) => ({
                        t: i,
                        production: 200 + Math.random() * 80,
                        consumption: 320 + Math.random() * 120,
                        efficiency: 40 + Math.random() * 20,
                      }))
                }
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="t" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line dataKey="production" stroke="var(--chart-1)" dot={false} />
                <Line dataKey="consumption" stroke="var(--chart-2)" dot={false} />
                <Line dataKey="efficiency" stroke="var(--chart-3)" dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-block size-2 rounded-full bg-primary animate-pulse" />{" "}
              {isRunning ? "Real-time" : "Mock"} updating
              <span className="ml-auto">
                Zoom: <button className="underline">24h</button> · <button className="underline">7d</button> ·{" "}
                <button className="underline">30d</button>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}

function Gauge({ value, max }: { value: number; max: number }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const r = 60
  const c = 2 * Math.PI * r
  const dash = (pct / 100) * c
  const color = pct < 60 ? "#10B981" : pct < 85 ? "#F59E0B" : "#EF4444"
  return (
    <svg width="180" height="120" role="img" aria-label={`Rate ${value.toFixed(1)} of ${max} kg/hr`}>
      <g transform="translate(90,100)">
        <path d={`M ${-r} 0 A ${r} ${r} 0 0 1 ${r} 0`} fill="none" stroke="#e5e7eb" strokeWidth="12" />
        <path
          d={`M ${-r} 0 A ${r} ${r} 0 0 1 ${-r} 0`}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeDasharray={`${dash} ${c - dash}`}
        />
        <text x="0" y="-10" textAnchor="middle" className="fill-foreground text-xl font-semibold">
          {value.toFixed(1)}
        </text>
        <text x="0" y="10" textAnchor="middle" className="fill-muted-foreground text-xs">
          kg/hr
        </text>
      </g>
    </svg>
  )
}
