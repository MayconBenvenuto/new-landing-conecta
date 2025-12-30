import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"
import { ContextualCTA } from "./contextual-cta"

export function EvidenceROI() {
  return (
    <section id="prova" className="py-20 md:py-32 px-4 md:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <div className="space-y-6">
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
              <p className="font-medium text-secondary">
                Não entregamos apenas relatórios. Entregamos base técnica para decisões estratégicas, com impacto direto
                no ROI do capital humano.
              </p>
            </div>
          </div>

          {/* Right - Dashboard Mock */}
          <div className="space-y-4">
            <DashboardMock />
          </div>
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

function DashboardMock() {
  return (
    <Card className="p-6 border-border/50 shadow-2xl bg-white">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-secondary">Dashboard de Riscos</h3>
          
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background rounded-xl p-4 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-green-600" />
              <span className="text-xs text-muted-foreground">Absenteísmo</span>
            </div>
            <div className="text-2xl font-bold text-secondary">-24%</div>
            <div className="text-xs text-green-600">vs. trimestre anterior</div>
          </div>

          <div className="bg-background rounded-xl p-4 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-muted-foreground">Engajamento</span>
            </div>
            <div className="text-2xl font-bold text-secondary">87%</div>
            <div className="text-xs text-blue-600">acima da meta</div>
          </div>

          <div className="bg-background rounded-xl p-4 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Conformidade</span>
            </div>
            <div className="text-2xl font-bold text-secondary">98%</div>
            <div className="text-xs text-primary">NR-1 atendida</div>
          </div>

          <div className="bg-background rounded-xl p-4 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-green-600" />
              <span className="text-xs text-muted-foreground">Passivos</span>
            </div>
            <div className="text-2xl font-bold text-secondary">-31%</div>
            <div className="text-xs text-green-600">redução anual</div>
          </div>
        </div>

        {/* Fake Chart */}
        <div className="bg-background rounded-xl p-4 border border-border/50">
          <div className="text-xs text-muted-foreground mb-3">Evolução de Riscos Psicossociais</div>
          <svg viewBox="0 0 300 100" className="w-full" aria-label="Gráfico de evolução de riscos">
            <polyline
              points="0,80 50,70 100,65 150,50 200,45 250,35 300,30"
              fill="none"
              stroke="rgb(2, 29, 121)"
              strokeWidth="2"
            />
            <polyline points="0,80 50,70 100,65 150,50 200,45 250,35 300,30" fill="url(#gradient)" opacity="0.2" />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(2, 29, 121)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </Card>
  )
}
