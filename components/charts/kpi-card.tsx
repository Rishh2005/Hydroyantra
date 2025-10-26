"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2 } from "lucide-react"

export function KpiProduction({ value, delta, status }: { value: number; delta: number; status: string }) {
  return (
    <Card className="transition hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">H₂ Production Rate</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-3xl font-semibold">{value.toFixed(1)} kg/hr</div>
        <div className="flex items-center gap-2">
          <Badge className="bg-primary text-primary-foreground">↑{delta}%</Badge>
          <Badge variant="outline">{status}</Badge>
        </div>
      </CardContent>
    </Card>
  )
}

export function KpiEnergy({ value, renewablePct, cost }: { value: number; renewablePct: number; cost: number }) {
  return (
    <Card className="transition hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">Energy Efficiency</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-3xl font-semibold">{value.toFixed(1)} kWh/kg</div>
        <div className="flex items-center gap-3">
          <MiniCircle percent={renewablePct} />
          <span className="text-sm text-muted-foreground">
            Renewables {renewablePct}% • Cost ₹{cost.toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export function KpiHealth({
  operational,
  storage,
  maintenanceIn,
}: { operational: number; storage: number; maintenanceIn: string }) {
  return (
    <Card className="transition hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">System Health</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-3xl font-semibold">{operational}% Operational</div>
        <div>
          <div className="text-xs mb-1 text-muted-foreground">Storage Capacity</div>
          <Progress value={storage} className="h-2" />
        </div>
        <div className="text-sm text-muted-foreground">Next Maintenance: {maintenanceIn}</div>
      </CardContent>
    </Card>
  )
}

export function KpiCarbon({
  co2Avoided,
  certificates,
  verified,
}: { co2Avoided: number; certificates: number; verified: boolean }) {
  return (
    <Card className="transition hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">Carbon Impact</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-3xl font-semibold">{co2Avoided.toLocaleString()} kg CO₂e avoided</div>
        <div className="flex items-center gap-2 text-sm">
          <Badge variant="outline">{certificates} certificates</Badge>
          {verified && (
            <span className="inline-flex items-center gap-1 text-primary">
              <CheckCircle2 className="size-4" /> blockchain verified
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function MiniCircle({ percent }: { percent: number }) {
  const radius = 18
  const circum = 2 * Math.PI * radius
  const dash = (percent / 100) * circum
  return (
    <svg width="44" height="44" role="img" aria-label={`Renewables ${percent}%`}>
      <circle cx="22" cy="22" r={radius} stroke="var(--color-muted)" strokeWidth="8" fill="none" />
      <circle
        cx="22"
        cy="22"
        r={radius}
        stroke="hsl(var(--color-primary))"
        strokeWidth="8"
        fill="none"
        strokeDasharray={`${dash} ${circum - dash}`}
        strokeLinecap="round"
        transform="rotate(-90 22 22)"
      />
      <text x="22" y="24" textAnchor="middle" className="fill-foreground text-[10px]">
        {percent}%
      </text>
    </svg>
  )
}
