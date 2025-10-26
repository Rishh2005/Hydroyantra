"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { Sidebar } from "./sidebar"
import { TopNav } from "./top-nav"
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs"

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="min-h-dvh bg-background text-foreground grid grid-rows-[auto_1fr]">
          <TopNav />
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr]">
            <aside className="hidden md:block border-r bg-(--color-sidebar)">
              <Sidebar activePath={pathname} />
            </aside>
            <main className="p-4 md:p-6">{children}</main>
          </div>
        </div>
      </SignedIn>
    </>
  )
}
