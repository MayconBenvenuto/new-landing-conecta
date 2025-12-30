import { Card } from "@/components/ui/card"
import { Users, Scale, HardHat } from "lucide-react"

export function Hub360() {
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
      className="py-20 md:py-32 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-background"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance text-secondary">
            Mais que uma plataforma. Um sistema de gestão integrada.
          </h2>
          <p className="text-lg text-foreground/90 leading-relaxed">
            Diferente de soluções isoladas, o Conecta Saúde opera como um HUB sistêmico que conecta áreas, dados e
            decisões. Isso permite enxergar riscos de forma ampla, agir preventivamente e sustentar a operação com
            segurança jurídica e humana.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pillars.map((pillar, index) => (
            <Card key={index} className="p-8 hover:shadow-xl transition-shadow border-border/50 bg-white">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <pillar.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-secondary">{pillar.title}</h3>
              <p className="text-foreground/80 leading-relaxed">{pillar.description}</p>
            </Card>
          ))}
        </div>

        {/* Circular Infographic */}
        <div className="flex justify-center mt-16">
          <CircularInfographic />
        </div>
      </div>
    </section>
  )
}

function CircularInfographic() {
  const nodes = ["RH", "Jurídico", "Compliance", "SST", "Gestão", "Saúde"]
  const radius = 140
  const centerX = 200
  const centerY = 200

  return (
    <div className="relative w-full max-w-md aspect-square">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <defs>
          <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(2, 29, 121)" />
            <stop offset="100%" stopColor="rgb(1, 17, 71)" />
          </linearGradient>
        </defs>

        {/* Center Logo */}
        <circle cx={centerX} cy={centerY} r="50" fill="url(#circleGradient)" />
        <text x={centerX} y={centerY + 8} textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">
          CS
        </text>

        {/* Orbiting Nodes */}
        {nodes.map((node, index) => {
          const angle = (index * 60 - 90) * (Math.PI / 180)
          const x = centerX + radius * Math.cos(angle)
          const y = centerY + radius * Math.sin(angle)

          return (
            <g key={index}>
              <line
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke="rgb(2, 29, 121)"
                strokeWidth="2"
                strokeOpacity="0.3"
              />
              <circle cx={x} cy={y} r="35" fill="white" stroke="rgb(2, 29, 121)" strokeWidth="2" />
              <text x={x} y={y + 5} textAnchor="middle" fill="rgb(1, 17, 71)" fontSize="14" fontWeight="600">
                {node}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
