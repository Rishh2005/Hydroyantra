"use client"
import { SignUp } from "@clerk/nextjs"

export default function Page() {
  return (
    <main className="min-h-dvh grid place-items-center p-6">
      <SignUp appearance={{ variables: { colorPrimary: "hsl(var(--color-primary))" } }} />
    </main>
  )
}
