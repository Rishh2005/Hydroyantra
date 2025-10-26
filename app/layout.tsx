import type React from "react"
import type { Metadata } from "next"

import { ClerkProvider } from "@clerk/nextjs"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

import { Inter, Geist as V0_Font_Geist, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _geist = V0_Font_Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Hydroyantra — Green Hydrogen Smart Process System",
  description: "Modern dashboard for Green Hydrogen operations.",
  creator: "Hydroyantra",
    generator: 'v0.app'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Read Clerk key from either NEXT_PUBLIC_* or VITE_* to support both conventions
  const clerkPublishableKey =
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || process.env.VITE_CLERK_PUBLISHABLE_KEY || ""

  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <html lang="en" suppressHydrationWarning className="dark">
        <body className={`${inter.variable} font-sans min-h-dvh antialiased`}>
          {!clerkPublishableKey ? (
            <div role="alert" className="bg-destructive text-destructive-foreground px-4 py-2 text-sm">
              Clerk publishable key is missing. Set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY (or VITE_CLERK_PUBLISHABLE_KEY) in
              Vars.
            </div>
          ) : null}

          <Suspense fallback={null}>{children}</Suspense>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}
