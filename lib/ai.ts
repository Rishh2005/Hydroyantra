"use server"

import { generateText } from "ai"

// Simple server helper using the AI SDK with a Groq model via AI Gateway.
// Falls back to a mock intent when no key is configured.
export async function interpretIntent(text: string): Promise<{ intent: string }> {
  try {
    // If gateway + GROQ_API_KEY are configured, this will route automatically.
    const { text: out } = await generateText({
      model: "groq/llama-3.1-70b-versatile",
      prompt: `Extract a concise dashboard intent from the user voice command.\nCommand: "${text}"\nReturn only a short label like: "show_production_24h", "open_agents", "optimize_energy", "create_certificate".`,
    })
    return { intent: out.trim().slice(0, 64) }
  } catch {
    return { intent: "show_production_24h" }
  }
}
