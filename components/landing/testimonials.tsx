"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-animations"

export function Testimonials() {
  const [ref, isVisible] = useScrollReveal()

  const testimonials = [
    {
      name: "Maria Silva",
      role: "Diretora de RH",
      company: "Empresa Tecnologia Ltda",
      image: "/images/testimonials/avatar-1.jpg",
      text: "O Conecta Saúde transformou nossa gestão de riscos. Reduzimos 35% dos afastamentos em 6 meses e, mais importante, criamos uma cultura preventiva real na empresa.",
      rating: 5,
      metric: "35% menos afastamentos",
    },
    {
      name: "Carlos Mendes",
      role: "Gerente Jurídico",
      company: "Indústria ABC S.A.",
      image: "/images/testimonials/avatar-2.jpg",
      text: "A análise integrada evitou passivos que poderiam custar milhões. A conformidade com NR-1 foi alcançada em tempo recorde, com zero autuações na última fiscalização.",
      rating: 5,
      metric: "Zero autuações",
    },
    {
      name: "Ana Paula Costa",
      role: "CEO",
      company: "Startup XYZ",
      image: "/images/testimonials/avatar-3.jpg",
      text: "Profissionalismo e tecnologia de ponta. O dashboard permite decisões baseadas em dados reais, não achismos. Nosso engajamento subiu 40% em um trimestre.",
      rating: 5,
      metric: "+40% engajamento",
    },
  ]

  return (
    <section ref={ref} className="py-20 md:py-32 px-4 md:px-6 lg:px-8" style={{ backgroundColor: '#011147' }}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance text-white">
            O que nossos clientes dizem
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Resultados reais de empresas que transformaram sua gestão de riscos
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
            >
              <Card className="p-8 h-full flex flex-col hover:shadow-xl transition-all duration-300 border-border/50 bg-white relative">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-foreground/80 leading-relaxed mb-6 flex-grow italic">"{testimonial.text}"</p>

                {/* Metric Badge */}
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                    {testimonial.metric}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-secondary font-bold text-lg">
                      {testimonial.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-secondary">{testimonial.name}</p>
                    <p className="text-sm text-foreground/60">{testimonial.role}</p>
                    <p className="text-xs text-foreground/50">{testimonial.company}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/5 rounded-full border border-primary/20">
            <Star className="w-5 h-5 fill-primary text-primary" />
            <span className="font-semibold text-secondary">4.9/5.0</span>
            <span className="text-foreground/70">baseado em 150+ avaliações</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
