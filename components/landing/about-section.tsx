"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileCheck, HeartPulse, Database, Award, Users2, TrendingUp, Shield, CheckCircle2 } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-animations"

export function AboutSection() {
  const [ref, isVisible] = useScrollReveal(0.1, true)
  const expertise = [
    {
      icon: FileCheck,
      title: "Auditoria & Conformidade",
      description: "Rigor metodológico em conformidade com NR-1, ISO 45003 e toda legislação trabalhista vigente.",
    },
    {
      icon: HeartPulse,
      title: "Saúde Corporativa Integrada",
      description: "Gestão completa de saúde mental, física e riscos psicossociais com abordagem preventiva.",
    },
    {
      icon: Database,
      title: "Inteligência de Dados",
      description: "Dashboard unificado e análises preditivas para decisões estratégicas baseadas em evidências.",
    },
  ]

  const team = [
    {
      role: "Medicina do Trabalho",
      specialty: "SST e Gestão de Saúde Ocupacional",
      icon: HeartPulse,
    },
    {
      role: "Compliance Jurídico",
      specialty: "Direito Trabalhista e Conformidade Legal",
      icon: Shield,
    },
    {
      role: "Psicologia Organizacional",
      specialty: "Riscos Psicossociais e Saúde Mental",
      icon: CheckCircle2,
    },
  ]

  const stats = [
    { icon: Award, value: "15+", label: "Anos de experiência" },
    { icon: Users2, value: "150+", label: "Empresas atendidas" },
    { icon: TrendingUp, value: "100%", label: "Conformidade legal" },
  ]

  const badges = ["NR-1 Compliant", "ISO 45003", "LGPD", "Metodologia Própria"]

  return (
    <section ref={ref} id="quem-somos" className="py-20 md:py-32 px-4 md:px-6 lg:px-8 relative overflow-hidden" style={{ backgroundColor: '#011147' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <Badge className="mb-4 bg-primary/100 text-white border-primary/30 hover:bg-primary/30">
                Quem Somos
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance text-white">
                Especialistas em Gestão de Riscos Ocupacionais
              </h2>
            </div>
            
            <div className="space-y-4 text-white/95 leading-relaxed text-lg">
              <p>
                O <span className="text-white font-semibold">Conecta Saúde</span> é o HUB de Gestão de Riscos 
                conduzido por especialistas com atuação técnica em auditoria, conformidade legal, saúde corporativa e análise de evidências.
              </p>
              <p>
                Nossa equipe multidisciplinar combina <span className="text-[#00CC88] font-semibold">rigor metodológico</span>, 
                visão sistêmica e experiência prática para apoiar empresas na tomada de decisões <span className="text-white font-semibold">seguras, 
                humanas e sustentáveis</span>.
              </p>
              <p className="text-base text-white/90 italic border-l-3 border-[#00CC88] pl-4 bg-white/5 py-3 rounded-r">
                "Transformamos complexidade regulatória em clareza estratégica, 
                reduzindo riscos e protegendo pessoas através de dados e evidências."
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4">
              {badges.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                >
                  <Badge variant="outline" className="border-white/50 text-white bg-white/10 px-4 py-2 text-sm hover:bg-white/20 hover:border-white/70 transition-colors">
                    {badge}
                  </Badge>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-3 gap-4 pt-6"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <stat.icon className="w-6 h-6 text-[#00CC88] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/85 mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Expertise Cards */}
            {expertise.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card className="p-6 border-gray-200 hover:shadow-xl hover:border-primary/50 transition-all duration-300 bg-white group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/25 group-hover:scale-110 transition-all duration-300">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
