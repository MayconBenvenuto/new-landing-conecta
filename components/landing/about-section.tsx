import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileCheck, HeartPulse, Database } from "lucide-react"

export function AboutSection() {
  const expertise = [
    {
      icon: FileCheck,
      title: "Auditoria & Conformidade",
      description: "Rigor metodológico em conformidade legal, NR-1 e ISO 45003.",
    },
    {
      icon: HeartPulse,
      title: "Saúde Corporativa",
      description: "Gestão integral de saúde mental, física e riscos psicossociais.",
    },
    {
      icon: Database,
      title: "Evidências & Dados",
      description: "Análise integrada para decisões estratégicas baseadas em dados.",
    },
  ]

  const badges = ["NR-1", "ISO 45003", "Governança", "Evidências"]

  return (
    <section id="quem-somos" className="py-20 md:py-32 px-4 md:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Text */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance text-secondary">
              Quem Somos
            </h2>
            <div className="space-y-4 text-foreground/90 leading-relaxed text-lg">
              <p>
                O Conecta Saúde é conduzido por especialistas com atuação técnica em auditoria, conformidade legal,
                saúde corporativa e análise de evidências.
              </p>
              <p>
                Nossa equipe combina rigor metodológico, visão sistêmica e experiência prática para apoiar empresas na
                tomada de decisões seguras, humanas e sustentáveis.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4">
              {badges.map((badge, index) => (
                <Badge key={index} variant="outline" className="border-primary/30 text-primary px-4 py-2 text-sm">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>

          {/* Right - Cards */}
          <div className="space-y-4">
            {expertise.map((item, index) => (
              <Card key={index} className="p-6 border-border/50 hover:shadow-lg transition-shadow bg-background">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-secondary">{item.title}</h3>
                    <p className="text-foreground/80 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
