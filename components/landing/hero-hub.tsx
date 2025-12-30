"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Users, Scale, HardHat, BarChart3, HeartPulse, Shield } from "lucide-react"
import { useAnalytics } from "@/hooks/use-analytics"
import { getLandingContent, type LandingVersion } from "@/lib/adaptive-cta"

const HUB_NODES = [
  {
    icon: Users,
    label: "RH",
    position: "top",
    description: "Gestão de pessoas, clima organizacional e desenvolvimento humano",
  },
  {
    icon: Scale,
    label: "Jurídico",
    position: "top-right",
    description: "Compliance trabalhista, gestão de passivos e prevenção de litígios",
  },
  {
    icon: Shield,
    label: "Compliance",
    position: "bottom-right",
    description: "Governança corporativa, normas regulatórias e auditoria",
  },
  {
    icon: HardHat,
    label: "SST",
    position: "bottom",
    description: "Saúde e Segurança do Trabalho, PGR e gestão de riscos ocupacionais",
  },
  {
    icon: HeartPulse,
    label: "Saúde",
    position: "bottom-left",
    description: "Saúde ocupacional, bem-estar e prevenção de riscos psicossociais",
  },
  {
    icon: BarChart3,
    label: "Gestão",
    position: "top-left",
    description: "Inteligência de dados, indicadores e tomada de decisão baseada em evidências",
  },
]

export function HeroHub({ version = "default" }: { version?: string }) {
  const { trackCTAClick } = useAnalytics()

  const landingContent = getLandingContent(version as LandingVersion)

  const handleCTAClick = (ctaName: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    trackCTAClick(ctaName, "hero")
    const element = document.getElementById("diagnostico")
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({ top: offsetTop, behavior: "smooth" })
    }
  }

  const handleSecondaryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    trackCTAClick("Entenda como funciona", "hero")
    const element = document.getElementById("como-funciona")
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({ top: offsetTop, behavior: "smooth" })
    }
  }

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6 md:space-y-8"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance text-secondary"
            >
              {landingContent.headline}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl leading-relaxed text-foreground/90"
            >
              Um HUB de Gestão de Riscos estruturado para integrar Recursos Humanos, Jurídico e Saúde e Segurança do
              Trabalho em uma única inteligência de dados, orientado para conformidade com a NR-1 e capaz de preservar a
              integridade das pessoas.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base text-muted-foreground leading-relaxed"
            >
              Decisões baseadas em evidências, estruturadas para prevenir riscos psicossociais, reduzir passivos e
              sustentar a performance do negócio.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-base font-medium group">
                <a href="#diagnostico" onClick={handleCTAClick(landingContent.cta)}>
                  <span className="group-hover:scale-105 inline-block transition-transform">{landingContent.cta}</span>
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary/5 text-base font-medium bg-transparent"
              >
                <a href="#como-funciona" onClick={handleSecondaryClick}>
                  Entenda como funciona
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Visual - Interactive HUB Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg aspect-square">
              {/* Central Hub */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 200 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-2xl flex items-center justify-center"
                >
                  <div className="w-24 h-24 rounded-xl bg-white flex items-center justify-center">
                    <span className="text-3xl font-bold text-secondary">CS</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Connection Lines */}
              <motion.svg
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 400 400"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgb(2, 29, 121)" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="rgb(2, 29, 121)" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                {[
                  { x1: 200, y1: 200, x2: 200, y2: 60 },
                  { x1: 200, y1: 200, x2: 340, y2: 130 },
                  { x1: 200, y1: 200, x2: 340, y2: 270 },
                  { x1: 200, y1: 200, x2: 200, y2: 340 },
                  { x1: 200, y1: 200, x2: 60, y2: 270 },
                  { x1: 200, y1: 200, x2: 60, y2: 130 },
                ].map((line, index) => (
                  <motion.line
                    key={index}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.9 + index * 0.1 }}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                  />
                ))}
              </motion.svg>

              {HUB_NODES.map((node, index) => (
                <HubNode key={node.label} {...node} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function HubNode({
  icon: Icon,
  label,
  position,
  description,
  index,
}: {
  icon: any
  label: string
  position: string
  description: string
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)

  const positions: Record<string, string> = {
    top: "top-0 left-1/2 -translate-x-1/2",
    "top-right": "top-[15%] right-0",
    "bottom-right": "bottom-[15%] right-0",
    bottom: "bottom-0 left-1/2 -translate-x-1/2",
    "bottom-left": "bottom-[15%] left-0",
    "top-left": "top-[15%] left-0",
  }

  const tooltipPositions: Record<string, string> = {
    top: "top-full mt-2 left-1/2 -translate-x-1/2",
    "top-right": "top-full mt-2 right-0",
    "bottom-right": "bottom-full mb-2 right-0",
    bottom: "bottom-full mb-2 left-1/2 -translate-x-1/2",
    "bottom-left": "bottom-full mb-2 left-0",
    "top-left": "top-full mt-2 left-0",
  }

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: 1 + index * 0.15,
        type: "spring",
        stiffness: 200,
      }}
      className={`absolute ${positions[position]} group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4 + index * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center gap-2"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`w-16 h-16 rounded-xl bg-white shadow-lg border border-border flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
            isHovered ? "shadow-xl border-primary" : ""
          }`}
          aria-label={`${label}: ${description}`}
          tabIndex={0}
        >
          <Icon className={`w-7 h-7 transition-colors ${isHovered ? "text-primary" : "text-primary/80"}`} />
        </motion.button>
        <span className="text-xs font-semibold text-secondary whitespace-nowrap">{label}</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : -10,
        }}
        transition={{ duration: 0.2 }}
        className={`absolute ${tooltipPositions[position]} z-20 w-48 p-3 bg-secondary text-white text-xs rounded-lg shadow-xl ${
          isHovered ? "visible" : "invisible"
        }`}
        role="tooltip"
      >
        <p className="font-medium mb-1">{label}</p>
        <p className="text-white/80 leading-relaxed">{description}</p>
        <div
          className={`absolute w-2 h-2 bg-secondary transform rotate-45 ${
            position.includes("bottom") ? "bottom-[-4px]" : "top-[-4px]"
          } ${position.includes("left") ? "left-4" : position.includes("right") ? "right-4" : "left-1/2 -translate-x-1/2"}`}
        />
      </motion.div>
    </motion.div>
  )
}
