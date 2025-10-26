import { AppShell } from "@/components/shell/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const tanks = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  fill: Math.round(20 + Math.random() * 70),
  pressure: (200 + Math.random() * 50).toFixed(0),
  temp: (5 + Math.random() * 25).toFixed(1),
  leak: Math.random() < 0.1,
}))

export default function StoragePage() {
  return (
    <AppShell>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tanks.map((t) => (
          <Card key={t.id}>
            <CardHeader>
              <CardTitle>Tank {t.id}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-end gap-4">
              <div className="relative w-20 h-40 rounded-full border overflow-hidden">
                <div
                  className="absolute bottom-0 left-0 right-0 bg-primary/70 transition-[height] duration-700"
                  style={{ height: `${t.fill}%` }}
                />
              </div>
              <div className="text-sm">
                <div>
                  Fill: <span className="font-medium">{t.fill}%</span>
                </div>
                <div>
                  Pressure: <span className="font-medium">{t.pressure} kPa</span>
                </div>
                <div>
                  Temp: <span className="font-medium">{t.temp}°C</span>
                </div>
                {t.leak && <Badge className="bg-red-600 mt-1">Leak detected</Badge>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Transport Tracking</CardTitle>
          </CardHeader>
          <CardContent className="rounded border h-[260px] grid place-items-center text-sm text-muted-foreground">
            Map with truck markers (placeholder)
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Shipments</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th className="py-2">Shipment</th>
                  <th>Status</th>
                  <th>ETA</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-2">HX-{2025 + i}</td>
                    <td>{["En Route", "Delayed", "Delivered"][i % 3]}</td>
                    <td>{["14:10", "16:25", "—"][i % 3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-3 text-xs text-muted-foreground">
              Delivery schedule: Today 12:00, 16:00 • Tomorrow 09:00, 15:00
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
