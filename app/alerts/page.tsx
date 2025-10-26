import { AppShell } from "@/components/shell/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const stream = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  ts: new Date(Date.now() - i * 300_000).toLocaleTimeString(),
  src: ["Electrolyzer", "Tank", "Optimizer", "Blockchain"][i % 4],
  sev: (["info", "warning", "critical"] as const)[i % 3],
  msg: ["Setpoint updated", "Pressure high", "Price spike incoming", "Certificate verified"][i % 4],
}))

export default function AlertsPage() {
  return (
    <AppShell>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Real-time Alerts</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {stream.map((a) => (
              <div key={a.id} className="rounded-md border p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge
                    className={
                      a.sev === "critical" ? "bg-red-600" : a.sev === "warning" ? "bg-amber-500" : "bg-primary"
                    }
                  >
                    {a.sev}
                  </Badge>
                  <div>
                    <div className="font-medium">{a.msg}</div>
                    <div className="text-xs text-muted-foreground">
                      {a.ts} • {a.src}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    View Details
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

        <Card>
          <CardHeader>
            <CardTitle>Alert Configuration</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <div className="mb-3 font-medium">Rule Builder</div>
            <div className="grid gap-2">
              <div>
                IF <code>pressure</code> &gt; <code>220</code> THEN <code>critical</code>
              </div>
              <div>
                IF <code>price</code> ↑ 20% THEN <code>warning</code>
              </div>
              <div>
                IF <code>certificate.status</code> == verified THEN <code>info</code>
              </div>
            </div>
            <div className="mt-4 font-medium">Channels</div>
            <div className="flex gap-2 mt-1">
              <Badge variant="outline">Email</Badge>
              <Badge variant="outline">SMS</Badge>
              <Badge variant="outline">Slack</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
