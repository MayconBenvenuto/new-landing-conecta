"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"
import { ContextualCTA } from "./contextual-cta"
import { useScrollReveal } from "@/hooks/use-animations"
import { AnimatedCounter } from "@/components/ui/animated-counter"

export function EvidenceROI() {
  const [ref, isVisible] = useScrollReveal()

  return (
    <section id="prova" ref={ref} className="py-20 md:py-32 px-4 md:px-6 lg:px-8 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance text-secondary">
              Decisões baseadas em evidências, não em suposições.
            </h2>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>
                No Conecta Saúde, a conformidade legal é apenas o ponto de partida. Nosso diferencial está na análise
                integrada de dados, que transforma saúde em inteligência de negócio.
              </p>
              <p>
                Levantamos informações, analisamos evidências e cruzamos indicadores para revelar padrões invisíveis à
                gestão tradicional, antecipando riscos antes que se tornem afastamentos, ações judiciais ou perdas
                operacionais.
              </p>
              <p className="font-bold text-secondary">
                Não entregamos apenas relatórios. Entregamos base técnica para decisões estratégicas, com impacto direto
                no ROI do capital humano.
              </p>
            </div>
          </motion.div>

          {/* Right - Dashboard Mock */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <DashboardMock isVisible={isVisible} />
          </motion.div>
        </div>

        <div className="mt-16">
          <ContextualCTA
            headline="Entenda os riscos invisíveis da sua operação"
            description="Nossa análise integrada revela padrões que a gestão tradicional não consegue identificar."
            buttonText="Solicitar Análise"
            location="evidence-roi-section"
          />
        </div>
      </div>
    </section>
  )
}

function DashboardMock({ isVisible }: { isVisible: boolean }) {
  const kpiData = [
    { Icon: TrendingDown, label: "Absenteísmo", value: 24, suffix: "%", color: "green", prefix: "-" },
    { Icon: TrendingUp, label: "Engajamento", value: 87, suffix: "%", color: "blue", prefix: "" },
    { Icon: Activity, label: "Conformidade", value: 98, suffix: "%", color: "primary", prefix: "" },
    { Icon: TrendingDown, label: "Passivos", value: 31, suffix: "%", color: "green", prefix: "-" },
  ]

  return (
    <Card className="p-6 border-border/50 shadow-2xl bg-white">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <h3 className="text-lg font-bold text-primary">Dashboard de Riscos</h3>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-4">
          {kpiData.map((kpi, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1, type: "spring", stiffness: 200 }}
              className="bg-background rounded-xl p-4 border border-border/50 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 mb-2">
                <kpi.Icon
                  className="w-4 h-4 text-primary"
                />
                <span className="text-xs text-muted-foreground">{kpi.label}</span>
              </div>
              <div className="text-2xl font-bold text-secondary">
                <AnimatedCounter end={kpi.value} prefix={kpi.prefix} suffix={kpi.suffix} />
              </div>
              <div className="text-xs text-primary">
                {kpi.color === "blue" ? "acima da meta" : index === 2 ? "NR-1 atendida" : index === 0 ? "vs. trimestre anterior" : "redução anual"}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fake Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-background rounded-xl p-4 border border-border/50"
        >
          <div className="text-xs text-muted-foreground mb-3">Evolução de Riscos Psicossociais</div>
          <svg viewBox="0 0 300 100" className="w-full" aria-label="Gráfico de evolução de riscos">
            <motion.polyline
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isVisible ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 2, delay: 0.7, ease: "easeInOut" }}
              points="0,80 50,70 100,65 150,50 200,45 250,35 300,30"
              fill="none"
              stroke="rgb(2, 29, 121)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <polyline points="0,80 50,70 100,65 150,50 200,45 250,35 300,30 300,100 0,100" fill="url(#gradient)" opacity="0.2" />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(2, 29, 121)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
    </Card>
  )
}
