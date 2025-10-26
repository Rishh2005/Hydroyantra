"use client"

import { AppShell } from "@/components/shell/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"

export default function SettingsPage() {
  const { user } = useUser()
  return (
    <AppShell>
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="grid gap-1">
            <label className="text-sm text-muted-foreground">Name</label>
            <Input value={user?.fullName || ""} readOnly />
          </div>
          <div className="grid gap-1">
            <label className="text-sm text-muted-foreground">Role</label>
            <Input value={(user?.publicMetadata?.role as string) || "engineer"} readOnly />
          </div>
          <div className="grid gap-1">
            <label className="text-sm text-muted-foreground">Language</label>
            <Input value={(user?.publicMetadata?.language as string) || "en"} readOnly />
          </div>
          <Button className="w-fit" onClick={() => location.assign("/dashboard")}>
            Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    </AppShell>
  )
}
