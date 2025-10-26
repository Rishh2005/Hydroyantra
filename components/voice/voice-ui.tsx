"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mic, X } from "lucide-react"
import { interpretIntent } from "@/lib/ai"

export function VoiceButton() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button
        variant="default"
        className="relative overflow-hidden"
        onClick={() => setOpen(true)}
        aria-label="Voice command"
      >
        <Mic className="size-4 mr-2" />
        Voice
        <span aria-hidden className="absolute inset-0 pointer-events-none">
          {/* animated waveform idle */}
          <span className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="w-0.5 h-2 bg-primary/60 animate-pulse"
                style={{ animationDelay: `${i * 120}ms` }}
              />
            ))}
          </span>
        </span>
      </Button>
      {open && <VoiceOverlay onClose={() => setOpen(false)} />}
    </>
  )
}

export function VoiceOverlay({ onClose }: { onClose: () => void }) {
  const [listening, setListening] = useState(true)
  const [transcript, setTranscript] = useState("Listening…")
  const [language, setLanguage] = useState("en")
  const [intent, setIntent] = useState("—")
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    if (SpeechRecognition) {
      const rec = new SpeechRecognition()
      recognitionRef.current = rec
      rec.lang = language
      rec.interimResults = true
      rec.continuous = true
      rec.onresult = (e: any) => {
        const text = Array.from(e.results)
          .map((r: any) => r[0].transcript)
          .join(" ")
        setTranscript(text)
      }
      rec.onend = async () => {
        setListening(false)
        const out = await interpretIntent(transcript)
        setIntent(out.intent || "unknown")
      }
      rec.start()
    } else {
      setTranscript("Speech recognition not supported. Using mock input.")
      setTimeout(async () => {
        const out = await interpretIntent("Show last 24 hours production efficiency.")
        setIntent(out.intent || "unknown")
        setListening(false)
      }, 1000)
    }
    return () => {
      recognitionRef.current?.stop?.()
    }
  }, [language])

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-card p-6 shadow-xl relative">
        <button
          aria-label="Close voice overlay"
          className="absolute right-3 top-3 rounded p-1 hover:bg-muted"
          onClick={onClose}
        >
          <X className="size-4" />
        </button>

        <div className="flex items-center justify-center mb-4">
          <div className="relative grid place-items-center">
            <div
              className={`size-20 rounded-full grid place-items-center ${listening ? "animate-ping-slow" : ""}`}
              style={{ backgroundColor: "rgba(16,185,129,0.15)" }}
            />
            <div className="absolute size-16 rounded-full bg-primary/20" />
            <Mic className="relative size-8 text-primary" />
          </div>
        </div>

        <p className="text-center text-xl font-medium leading-relaxed">{transcript}</p>

        <div className="mt-4 flex items-center justify-center gap-2">
          <Badge variant="outline">Detected: {language.toUpperCase()}</Badge>
          <Badge className="bg-primary text-primary-foreground">Intent: {intent}</Badge>
          <Badge variant={listening ? "default" : "secondary"}>{listening ? "Listening" : "Processed"}</Badge>
        </div>
      </div>

      {/* Floating activator in the top-right per spec */}
      <button
        aria-label="Microphone"
        className="fixed right-4 top-4 rounded-full bg-primary text-primary-foreground p-3 shadow-lg hover:scale-105 transition"
        onClick={() => (listening ? recognitionRef.current?.stop?.() : onClose())}
      >
        <Mic className="size-5" />
      </button>
    </div>
  )
}
