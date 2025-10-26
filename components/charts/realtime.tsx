"use client"

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Legend, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generate24hSeries } from "@/lib/mock"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = generate24hSeries()

export function RealTimeChart() {
  return (
    <Card className="transition hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">24h Performance</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ChartContainer
          config={{
            production: { label: "H₂ Output", color: "hsl(var(--chart-1))" },
            consumption: { label: "Energy", color: "hsl(var(--chart-2))" },
            efficiency: { label: "Efficiency", color: "hsl(var(--chart-3))" },
          }}
          className="h-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ left: 10, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="t" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line type="monotone" dataKey="production" stroke="var(--color-production)" dot={false} />
              <Line type="monotone" dataKey="consumption" stroke="var(--color-consumption)" dot={false} />
              <Line type="monotone" dataKey="efficiency" stroke="var(--color-efficiency)" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
