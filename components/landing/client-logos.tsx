"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useScrollReveal } from "@/hooks/use-animations"

export function ClientLogos() {
  const [ref, isVisible] = useScrollReveal()

  const clients = [
    { name: "ABRHPE", logo: "/images/abrhpe.webp" },
    { name: "Cesar", logo: "/images/cesar.webp" },
    { name: "Focus", logo: "/images/focus.webp" },
    { name: "Instituto", logo: "/images/instituto.webp" },
    { name: "Porto Digital", logo: "/images/portodigital.webp" },
    { name: "Ultramega", logo: "/images/ultramega.webp" },
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
            Empresas que já confiam no Grupo Belz
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
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={128}
                  height={64}
                  className="object-contain max-h-16"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
