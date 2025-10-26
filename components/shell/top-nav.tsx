"use client"

import Image from "next/image"
import Link from "next/link"
import { UserButton, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Languages, Moon, Sun } from "lucide-react"
import { VoiceButton } from "../voice/voice-ui"
import { useEffect, useState } from "react"

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "ta", label: "Tamil" },
  { code: "te", label: "Telugu" },
  { code: "bn", label: "Bengali" },
]

export function TopNav() {
  const { user } = useUser()
  const [theme, setTheme] = useState<string>(() =>
    typeof window !== "undefined" ? localStorage.getItem("theme") || "light" : "light",
  )
  useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") root.classList.add("dark")
    else root.classList.remove("dark")
    if (typeof window !== "undefined") localStorage.setItem("theme", theme)
  }, [theme])

  const currentLang =
    (user?.publicMetadata?.language as string) ||
    (typeof window !== "undefined" ? localStorage.getItem("lang") || "en" : "en")
  async function changeLang(code: string) {
    localStorage.setItem("lang", code)
    try {
      await user?.update({ publicMetadata: { ...user.publicMetadata, language: code } })
    } catch {}
  }

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="mx-auto flex items-center justify-between px-4 py-3 gap-3">
        <Link href="/dashboard" className="flex items-center gap-3">
          <Image
            src="/images/hydroyantra-logo-2.png"
            alt="Hydroyantra logo"
            width={36}
            height={36}
            className="rounded-sm"
            priority
          />
          <span className="text-xl font-semibold text-balance">Hydroyantra</span>
        </Link>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent" aria-label="Language selector">
                <Languages className="size-4" />
                <span className="hidden sm:inline">Language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((l) => (
                <DropdownMenuItem key={l.code} onClick={() => changeLang(l.code)}>
                  <span className="mr-2 size-2 rounded-full bg-primary" aria-hidden />
                  {l.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <VoiceButton />

          <Button
            variant="ghost"
            className="gap-2"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>

          <UserButton appearance={{ elements: { userButtonAvatarBox: "ring-1 ring-primary/30" } }} />
        </div>
      </div>
    </header>
  )
}
