"use client"

import type React from "react"

import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Activity, Bot, Boxes, BarChart3, ShieldCheck, Bell, Settings } from "lucide-react"

type Item = { href: string; label: string; icon: React.ComponentType<any>; roles?: string[] }

const items: Item[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/production", label: "Production Monitoring", icon: Activity },
  { href: "/agents", label: "AI Agents Hub", icon: Bot },
  { href: "/storage", label: "Storage & Distribution", icon: Boxes },
  { href: "/analytics", label: "Analytics & Reports", icon: BarChart3 },
  { href: "/blockchain", label: "Blockchain Certificates", icon: ShieldCheck, roles: ["admin", "manager"] },
  { href: "/alerts", label: "Alerts & Notifications", icon: Bell },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function Sidebar({ activePath }: { activePath: string }) {
  const { user } = useUser()
  const role = (user?.publicMetadata?.role as string) || "engineer"

  const allowed = items.filter((i) => !i.roles || i.roles.includes(role))

  return (
    <nav className="p-3">
      <ul className="flex flex-col gap-1">
        {allowed.map((item) => {
          const Icon = item.icon
          const active = activePath === item.href
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active && "bg-muted font-medium",
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="size-4 text-primary" />
                <span>{item.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
