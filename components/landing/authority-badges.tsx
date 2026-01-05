import { Shield, FileCheck, Brain, Lock, Award, CheckCircle2 } from "lucide-react"

const BADGES = [
  {
    icon: FileCheck,
    label: "NR-1",
    description: "Conformidade regulatória",
  },
  {
    icon: Shield,
    label: "ISO 45003",
    description: "Alinhamento às diretrizes",
  },
  {
    icon: Brain,
    label: "Riscos Psicossociais",
    description: "Gestão especializada",
  },
  {
    icon: Lock,
    label: "LGPD Compliant",
    description: "Dados protegidos",
  },
  {
    icon: Award,
    label: "ISO 9001",
    description: "Gestão de qualidade",
  },
  {
    icon: CheckCircle2,
    label: "SSL/TLS",
    description: "Conexão segura",
  },
]

export function AuthorityBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
      {BADGES.map((badge) => (
        <div
          key={badge.label}
          className="flex items-center gap-3 bg-white border border-border/50 rounded-full px-4 py-2 shadow-sm"
        >
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <badge.icon className="w-4 h-4 text-primary" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-secondary">{badge.label}</p>
            <p className="text-xs text-muted-foreground">{badge.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
