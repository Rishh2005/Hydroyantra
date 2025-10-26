"use client"

import { AppShell } from "@/components/shell/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { createCertificate } from "@/lib/blockchain"

type Row = { id: string; volume: number; date: string; source: string; carbon: number; hash: string; status: string }

export default function BlockchainPage() {
  const [batchId, setBatchId] = useState("")
  const [volume, setVolume] = useState<number>(100)
  const [dateRange, setDateRange] = useState("2025-10-01 to 2025-10-11")
  const [source, setSource] = useState("Solar")
  const [rows, setRows] = useState<Row[]>([])
  const [currentCert, setCurrentCert] = useState<any>(null)

  async function generate() {
    const cert = createCertificate(batchId || `B-${rows.length + 1}`, volume, source, 75)
    setCurrentCert(cert)

    const row: Row = {
      id: cert.id,
      volume: cert.volume,
      date: dateRange,
      source: cert.energySource,
      carbon: cert.carbonIntensity,
      hash: cert.blockchainHash,
      status: "Verified",
    }
    setRows([row, ...rows])
  }

  return (
    <AppShell>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Certificate Generator</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label>Batch ID</Label>
              <Input value={batchId} onChange={(e) => setBatchId(e.target.value)} placeholder="e.g., HYD-2025-001" />
            </div>
            <div className="grid gap-2">
              <Label>Volume (kg)</Label>
              <Input type="number" value={volume} onChange={(e) => setVolume(+e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Date range</Label>
              <Input value={dateRange} onChange={(e) => setDateRange(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Energy source</Label>
              <Select value={source} onValueChange={setSource}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {["Solar", "Wind", "Hydro", "Grid"].map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={generate}>Generate Certificate</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Certificate Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border p-4 space-y-3">
              <div className="text-lg font-semibold">Hydroyantra Green Certificate</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">ID</div>
                <div className="font-medium font-mono text-xs">{currentCert?.id || "—"}</div>
                <div className="text-muted-foreground">Volume</div>
                <div className="font-medium">{currentCert?.volume || volume} kg</div>
                <div className="text-muted-foreground">Carbon Intensity</div>
                <div className="font-medium">{currentCert?.carbonIntensity.toFixed(2) || "—"} kg CO₂e/kg</div>
                <div className="text-muted-foreground">Energy Source</div>
                <div className="font-medium">{currentCert?.energySource || source}</div>
              </div>
              <div className="mt-4 grid grid-cols-[120px_1fr] gap-4 items-center">
                <div className="rounded bg-muted grid place-items-center h-[120px] text-xs text-muted-foreground">
                  QR Code
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Blockchain Hash</div>
                  <div className="font-mono text-xs break-all">{currentCert?.blockchainHash || "—"}</div>
                  <div className="mt-2">
                    <Badge className="bg-primary">{currentCert?.verified ? "Verified" : "Pending"}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Certificates</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th className="py-2">ID</th>
                  <th>Volume</th>
                  <th>Date</th>
                  <th>Energy</th>
                  <th>Carbon</th>
                  <th>Hash</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-2 font-mono text-xs">{r.id.slice(0, 12)}...</td>
                    <td>{r.volume}</td>
                    <td>{r.date}</td>
                    <td>{r.source}</td>
                    <td>{r.carbon.toFixed(2)}</td>
                    <td className="font-mono truncate max-w-[260px] text-xs">{r.hash}</td>
                    <td>
                      <Badge className="bg-primary">{r.status}</Badge>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-muted-foreground">
                      No certificates yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="mt-3">
              <Button
                variant="outline"
                onClick={() => {
                  const header = "ID,Volume,Date,Energy,Carbon,Hash,Status"
                  const lines = rows.map((r) =>
                    [r.id, r.volume, r.date, r.source, r.carbon.toFixed(2), r.hash, r.status].join(","),
                  )
                  const blob = new Blob([header + "\n" + lines.join("\n")], { type: "text/csv" })
                  const a = document.createElement("a")
                  a.href = URL.createObjectURL(blob)
                  a.download = "certificates.csv"
                  a.click()
                }}
              >
                Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
