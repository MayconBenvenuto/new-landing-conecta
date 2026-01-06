"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Users, Scale, HardHat } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-animations"

export function Hub360() {
  const [ref, isVisible] = useScrollReveal()

  const pillars = [
    {
      icon: Users,
      title: "RH & Saúde",
      description: "Gestão integral da saúde mental, física e financeira, com foco em clima, retenção e engajamento.",
    },
    {
      icon: Scale,
      title: "Jurídico & Compliance",
      description:
        "Conformidade rigorosa com a Legislação, NR-1 e ISO 45003, reduzindo passivos e fortalecendo a governança.",
    },
    {
      icon: HardHat,
      title: "SST & Gestão",
      description:
        "Gerenciamento de riscos operacionais com cruzamento inteligente de indicadores (absenteísmo, sinistralidade, afastamentos e produtividade).",
    },
  ]

  return (
    <section
      id="diferenciais"
      ref={ref}
      className="py-20 md:py-32 px-4 md:px-6 lg:px-8 bg-background"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance text-secondary">
            Mais que uma plataforma. Um sistema de gestão integrada.
          </h2>
          <p className="text-lg text-foreground/90 leading-relaxed">
            Diferente de soluções isoladas, o Conecta Saúde opera como um HUB sistêmico que conecta áreas, dados e
            decisões. Isso permite enxergar riscos de forma ampla, agir preventivamente e sustentar a operação com
            segurança jurídica e humana.
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <Card className="p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-white/20 bg-white group">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors"
                >
                  <pillar.icon className="w-7 h-7 text-primary" />
                </motion.div>
                <h3 className="text-xl font-bold mb-4 text-secondary">{pillar.title}</h3>
                <p className="text-foreground/80 leading-relaxed">{pillar.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Circular Infographic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex justify-center mt-16"
        >
        </motion.div>
      </div>
    </section>
  )
}