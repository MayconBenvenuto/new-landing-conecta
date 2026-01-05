import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileCheck, HeartPulse, Database, Award, Users2, TrendingUp } from "lucide-react"

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

  const team = [
    {
      role: "Médica do Trabalho",
      credentials: "CRM 123456 | Especialista em SST",
      experience: "15+ anos",
    },
    {
      role: "Advogado Trabalhista",
      credentials: "OAB/SP 234567 | Especialista em Compliance",
      experience: "12+ anos",
    },
    {
      role: "Psicólogo Organizacional",
      credentials: "CRP 345678 | Especialista em Riscos Psicossociais",
      experience: "10+ anos",
    },
  ]

  const stats = [
    { icon: Award, value: "15+", label: "Anos de experiência" },
    { icon: Users2, value: "150+", label: "Empresas atendidas" },
    { icon: TrendingUp, value: "98%", label: "Satisfação dos clientes" },
  ]

  const badges = ["NR-1", "ISO 45003", "LGPD Compliant", "Certificado ISO 9001"]

  return (
    <section id="quem-somos" className="py-20 md:py-32 px-4 md:px-6 lg:px-8" style={{ backgroundColor: '#011147' }}>
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Text */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance text-white">
              Quem Somos
            </h2>
            <div className="space-y-4 text-white/90 leading-relaxed text-lg">
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
                <Badge key={index} variant="outline" className="border-white/30 text-white px-4 py-2 text-sm">
                  {badge}
                </Badge>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-6 h-6 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Cards */}
          <div className="space-y-4">
            {/* Expertise Cards */}
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

            {/* Team Credentials */}
            <Card className="p-6 border-primary/20 bg-primary/5">
              <h3 className="font-bold text-lg mb-4 text-secondary">Nossa Equipe Técnica</h3>
              <div className="space-y-4">
                {team.map((member, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b border-border/30 last:border-0 last:pb-0">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-secondary font-bold text-sm">{member.experience.split("+")[0]}</span>
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold text-secondary text-sm">{member.role}</p>
                      <p className="text-xs text-foreground/70">{member.credentials}</p>
                      <p className="text-xs text-primary font-medium mt-1">{member.experience} de experiência</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
