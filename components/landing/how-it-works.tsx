"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ClipboardCheck, Search, GitBranch, FileCheck } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-animations"

const STEPS = [
  {
    icon: ClipboardCheck,
    step: "01",
    title: "Levantamento técnico",
    description: "Coleta estruturada de dados sobre a operação, indicadores de saúde e histórico de riscos.",
  },
  {
    icon: Search,
    step: "02",
    title: "Análise de riscos psicossociais",
    description: "Identificação e classificação de fatores que podem impactar a saúde mental e a produtividade.",
  },
  {
    icon: GitBranch,
    step: "03",
    title: "Cruzamento de dados",
    description: "Correlação entre absenteísmo, sinistralidade, turnover e indicadores de clima organizacional.",
  },
  {
    icon: FileCheck,
    step: "04",
    title: "Recomendações estratégicas",
    description: "Plano de ação personalizado com priorização baseada em impacto e viabilidade de implementação.",
  },
]

export function HowItWorks() {
  const [ref, isVisible] = useScrollReveal()

  return (
    <section id="como-funciona" ref={ref} className="py-20 md:py-32 px-4 md:px-6 lg:px-8" style={{ backgroundColor: '#011147' }}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4 block">Metodologia</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance text-white">
            Como funciona o diagnóstico
          </h2>
          <p className="text-lg text-white/80 leading-relaxed">
            Um processo estruturado para identificar, analisar e priorizar riscos com base em evidências e dados reais
            da sua operação.
          </p>

          {/* Process Info */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white" />
              <span className="text-white/80">
                <strong className="text-white">7 dias</strong> para diagnóstico completo
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white" />
              <span className="text-white/80">
                <strong className="text-white">100% remoto</strong> ou presencial
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white" />
              <span className="text-white/80">
                <strong className="text-white">Sem compromisso</strong> na avaliação inicial
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.2 + index * 0.15,
                type: "spring",
                stiffness: 100,
              }}
            >
              <Card className="p-6 bg-background border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative group h-full">
                {/* Step number */}
                <motion.span
                  initial={{ scale: 0 }}
                  animate={isVisible ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.15, type: "spring", stiffness: 200 }}
                  className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center shadow-lg"
                >
                  {step.step}
                </motion.span>

                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors"
                >
                  <step.icon className="w-6 h-6 text-primary" />
                </motion.div>

                <h3 className="text-lg font-bold mb-3 text-secondary">{step.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{step.description}</p>

                {/* Connector line for desktop */}
                {index < STEPS.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isVisible ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.15 }}
                    className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-primary/30 origin-left"
                  />
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
