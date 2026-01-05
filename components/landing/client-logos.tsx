"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useScrollReveal } from "@/hooks/use-animations"

export function ClientLogos() {
  const [ref, isVisible] = useScrollReveal()

  // Logos de clientes - substitua com logos reais quando disponíveis
  const clients = [
    { name: "Cliente 1", logo: "/images/clients/client-1.svg" },
    { name: "Cliente 2", logo: "/images/clients/client-2.svg" },
    { name: "Cliente 3", logo: "/images/clients/client-3.svg" },
    { name: "Cliente 4", logo: "/images/clients/client-4.svg" },
    { name: "Cliente 5", logo: "/images/clients/client-5.svg" },
    { name: "Cliente 6", logo: "/images/clients/client-6.svg" },
  ]

  return (
    <section ref={ref} className="py-16 md:py-20 px-4 md:px-6 lg:px-8 bg-background border-y border-border/50">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-3">
            Empresas que já confiam no Conecta Saúde
          </h2>
          <p className="text-foreground/70">
            Mais de <span className="font-bold text-primary">150 empresas</span> transformaram sua gestão de riscos
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
            >
              <div className="relative w-full h-20 flex items-center justify-center">
                {/* Placeholder for client logo */}
                <div className="w-32 h-16 bg-secondary/10 rounded-lg flex items-center justify-center border border-border/30">
                  <span className="text-xs font-semibold text-secondary/60">Logo {index + 1}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-8 text-sm text-foreground/70">
            <div>
              <span className="block text-2xl font-bold text-primary">98%</span>
              <span>Taxa de satisfação</span>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <span className="block text-2xl font-bold text-primary">87%</span>
              <span>Renovam o contrato</span>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <span className="block text-2xl font-bold text-primary">2h</span>
              <span>Tempo médio de resposta</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
