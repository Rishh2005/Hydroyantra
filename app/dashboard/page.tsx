import { AppShell } from "@/components/shell/app-shell"
import { KpiProduction, KpiEnergy, KpiHealth, KpiCarbon } from "@/components/charts/kpi-card"
import { RealTimeChart } from "@/components/charts/realtime"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { kpis, agents, recentAlerts } from "@/lib/mock"
import { Wrench, Bot, Grape as GraphUp } from "lucide-react"

export default function DashboardPage() {
  const k = kpis()
  const a = agents()
  const alerts = recentAlerts()
  return (
    <AppShell>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <KpiProduction value={k.productionRate.value} delta={k.productionRate.delta} status={k.productionRate.status} />
        <KpiEnergy
          value={k.energyEfficiency.value}
          renewablePct={k.energyEfficiency.renewablePct}
          cost={k.energyEfficiency.cost}
        />
        <KpiHealth
          operational={k.systemHealth.operational}
          storage={k.systemHealth.storage}
          maintenanceIn={k.systemHealth.maintenanceIn}
        />
        <KpiCarbon
          co2Avoided={k.carbonImpact.co2Avoided}
          certificates={k.carbonImpact.certificates}
          verified={k.carbonImpact.verified}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <div className="lg:col-span-2">
          <RealTimeChart />
        </div>

        <div className="grid gap-4">
          {a.map((x, idx) => (
            <Card key={idx} className="transition hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    {idx === 0 ? (
                      <Wrench className="size-4 text-primary" />
                    ) : idx === 1 ? (
                      <GraphUp className="size-4 text-primary" />
                    ) : (
                      <Bot className="size-4 text-primary" />
                    )}
                    {x.name}
                  </span>
                  <Badge className="bg-primary text-primary-foreground">{x.status}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {idx === 0 && (
                  <div className="mb-2 rounded border border-amber-200 bg-amber-50 dark:bg-amber-950/30 p-2 text-amber-700 dark:text-amber-300">
                    {a[0].banner}
                  </div>
                )}
                {idx === 1 && <div>Savings this month: ₹{x.savings?.toLocaleString()}</div>}
                {idx === 2 && <div>Opportunity value: ₹{x.opportunity?.toLocaleString()}</div>}
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="default">
                    Open
                  </Button>
                  <Button size="sm" variant="outline">
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {alerts.map((al) => (
              <div key={al.id} className="flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center gap-3">
                  <Badge
                    className={
                      al.severity === "critical"
                        ? "bg-red-600"
                        : al.severity === "warning"
                          ? "bg-amber-500"
                          : "bg-primary"
                    }
                  >
                    {al.severity}
                  </Badge>
                  <div>
                    <div className="font-medium">{al.message}</div>
                    <div className="text-xs text-muted-foreground">
                      {al.ts} • {al.source}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                  <Button size="sm" variant="secondary">
                    Acknowledge
                  </Button>
                  <Button size="sm" variant="ghost">
                    Dismiss
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
