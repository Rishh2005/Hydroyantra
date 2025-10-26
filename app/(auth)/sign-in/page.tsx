"use client"
import { SignIn } from "@clerk/nextjs"

export default function Page() {
  return (
    <main className="min-h-dvh grid place-items-center p-6">
      <SignIn appearance={{ variables: { colorPrimary: "hsl(var(--color-primary))" } }} />
    </main>
  )
}
