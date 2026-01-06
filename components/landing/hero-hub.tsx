"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Users, Scale, HardHat, BarChart3, HeartPulse, Shield, TrendingDown, Award, Clock } from "lucide-react"
import { useAnalytics } from "@/hooks/use-analytics"
import { getLandingContent, type LandingVersion } from "@/lib/adaptive-cta"
import { AnimatedCounter } from "@/components/ui/animated-counter"

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
    <section className="relative pt-24 pb-12 md:pt-28 md:pb-16 px-4 md:px-6 lg:px-8 overflow-hidden" style={{ backgroundColor: '#011147' }}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
           className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
          style={{ backgroundImage: "url('/images/hero-image.png')" }}
        />
        
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4 md:space-y-5"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold leading-snug text-balance text-white"
            >
              Sua empresa não é fragmentada.
              <br />
              A gestão de riscos também não deveria ser.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl leading-relaxed text-white/90"
            >
              Um HUB de Gestão de Riscos estruturado para integrar Recursos Humanos, Jurídico e Saúde e Segurança do
              Trabalho em uma única inteligência de dados, orientado para a Segurança Jurídica da NR-1 e o cuidado real
              com as pessoas e capaz de preservar a integridade das pessoas.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base text-white/80 leading-relaxed"
            >
              Decisões baseadas em evidências, estruturadas para prevenir riscos psicossociais, reduzir passivos e
              sustentar a performance do negócio.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-base font-medium group">
                <a href="#diagnostico" onClick={handleCTAClick(landingContent.cta)}>
                  <span className="group-hover:scale-105 inline-block transition-transform">{landingContent.cta}</span>
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-base font-medium bg-transparent"
              >
                <a href="#como-funciona" onClick={handleSecondaryClick}>
                  Entenda como funciona
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Empty space for background illustration */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  )
}