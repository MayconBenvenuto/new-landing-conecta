"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useAnalytics } from "@/hooks/use-analytics"
import { useScrollReveal } from "@/hooks/use-animations"

const FAQS = [
  {
    question: "O que é a NR-1 e como ela afeta minha empresa?",
    answer:
      "A NR-1 estabelece as disposições gerais sobre segurança e saúde no trabalho, incluindo a obrigatoriedade de identificar e gerenciar riscos psicossociais no ambiente de trabalho. Empresas de todos os portes devem mapear esses riscos em seus programas de prevenção (PGR/GRO), sob pena de autuações e responsabilização civil e trabalhista.",
  },
  {
    question: "O que são riscos psicossociais?",
    answer:
      "Riscos psicossociais são fatores relacionados à organização do trabalho, relações interpessoais e condições laborais que podem afetar a saúde mental e o bem-estar dos colaboradores. Incluem sobrecarga de trabalho, assédio, falta de autonomia, conflitos interpessoais, insegurança no emprego, entre outros. A gestão adequada desses riscos é agora uma exigência legal.",
  },
  {
    question: "Qual a diferença entre o Conecta Saúde e um PGR tradicional?",
    answer:
      "O PGR tradicional foca principalmente em riscos físicos, químicos e ergonômicos. O Conecta Saúde vai além: integramos a gestão de riscos psicossociais com inteligência de dados, conectando RH, Jurídico e SST em uma visão sistêmica. Não apenas identificamos riscos, mas criamos governança para preveni-los e gerenciá-los de forma contínua.",
  },
  {
    question: "O Conecta Saúde substitui PGR/GRO?",
    answer:
      "O Conecta Saúde integra e dá governança aos processos de gestão de riscos. Dependendo do escopo contratado, pode incluir a elaboração e gestão de PGR/GRO, ou atuar como camada de inteligência sobre documentos existentes, agregando análise de dados e cruzamento de indicadores.",
  },
  {
    question: "Como funciona o diagnóstico prévio?",
    answer:
      "Realizamos um levantamento inicial das práticas atuais de gestão de riscos da empresa, analisamos evidências documentais e indicadores disponíveis, e apresentamos uma proposta customizada com base na maturidade organizacional e nas necessidades específicas identificadas. O diagnóstico é gratuito e sem compromisso.",
  },
  {
    question: "Quais áreas da empresa participam do processo?",
    answer:
      "O Conecta Saúde integra Recursos Humanos, Jurídico/Compliance, Saúde e Segurança do Trabalho, Gestão e áreas de Saúde. Essa visão sistêmica garante que todas as dimensões de risco sejam contempladas e conectadas, evitando silos de informação.",
  },
  {
    question: "Em quanto tempo é possível ver resultados?",
    answer:
      "Os resultados dependem da maturidade organizacional e do nível de adesão ao programa. Indicadores iniciais de engajamento e conformidade podem ser observados nos primeiros 90 dias. Reduções sustentáveis em absenteísmo e passivos tornam-se evidentes entre 6 e 12 meses.",
  },
  {
    question: "Qual o papel do RH na gestão de riscos psicossociais?",
    answer:
      "O RH é peça central na identificação e gestão de riscos psicossociais, pois lida diretamente com clima organizacional, desenvolvimento de lideranças, políticas de bem-estar e processos de feedback. O Conecta Saúde capacita o RH com dados e ferramentas para atuar de forma estratégica e preventiva.",
  },
]

export function FAQ() {
  const { trackEvent } = useAnalytics()
  const [ref, isVisible] = useScrollReveal()

  const handleAccordionChange = (value: string) => {
    if (value) {
      trackEvent("faq_expand", { question: value })
    }
  }

  return (
    <section ref={ref} className="py-20 md:py-32 px-4 md:px-6 lg:px-8" style={{ backgroundColor: '#011147' }}>
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance text-white">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-white/90">Entenda melhor como funciona o Conecta Saúde</p>
        </motion.div>

        <Accordion type="single" collapsible className="w-full space-y-4" onValueChange={handleAccordionChange}>
          {FAQS.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
            >
              <AccordionItem
                value={`item-${index}`}
                className="bg-white border border-border/50 rounded-xl px-6 data-[state=open]:shadow-lg data-[state=open]:border-primary/30 transition-all duration-300"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-secondary pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 leading-relaxed pb-6">{faq.answer}</AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
