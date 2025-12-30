import { Card } from "@/components/ui/card"
import { ClipboardCheck, Search, GitBranch, FileCheck } from "lucide-react"

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
  return (
    <section id="como-funciona" className="py-20 md:py-32 px-4 md:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">Metodologia</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance text-secondary">
            Como funciona o diagnóstico
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Um processo estruturado para identificar, analisar e priorizar riscos com base em evidências e dados reais
            da sua operação.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, index) => (
            <Card
              key={index}
              className="p-6 bg-background border-border/50 hover:shadow-lg transition-shadow relative group"
            >
              {/* Step number */}
              <span className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center shadow-lg">
                {step.step}
              </span>

              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <step.icon className="w-6 h-6 text-primary" />
              </div>

              <h3 className="text-lg font-bold mb-3 text-secondary">{step.title}</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">{step.description}</p>

              {/* Connector line for desktop */}
              {index < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
              )}
            </Card>
          ))}
        </div>

        
      </div>
    </section>
  )
}
