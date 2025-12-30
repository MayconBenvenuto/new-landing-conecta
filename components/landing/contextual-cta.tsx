"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useAnalytics } from "@/hooks/use-analytics"

interface ContextualCTAProps {
  headline: string
  description?: string
  buttonText?: string
  variant?: "default" | "subtle"
  location: string
}

export function ContextualCTA({
  headline,
  description,
  buttonText = "Agendar Diagnóstico",
  variant = "default",
  location,
}: ContextualCTAProps) {
  const { trackCTAClick } = useAnalytics()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    trackCTAClick(buttonText, location)
    const element = document.getElementById("diagnostico")
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({ top: offsetTop, behavior: "smooth" })
    }
  }

  if (variant === "subtle") {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-8">
        <p className="text-foreground/80">{headline}</p>
        <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/5 bg-transparent">
          <a href="#diagnostico" onClick={handleClick} className="inline-flex items-center gap-2">
            {buttonText}
            <ArrowRight className="w-4 h-4" />
          </a>
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10 rounded-2xl p-8 md:p-10 text-center">
      <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-3">{headline}</h3>
      {description && <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">{description}</p>}
      <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
        <a href="#diagnostico" onClick={handleClick} className="inline-flex items-center gap-2">
          {buttonText}
          <ArrowRight className="w-4 h-4" />
        </a>
      </Button>
    </div>
  )
}
