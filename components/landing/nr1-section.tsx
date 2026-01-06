import Image from "next/image"
import { Check } from "lucide-react"
import { ContextualCTA } from "./contextual-cta"
import { AuthorityBadges } from "./authority-badges"

export function NR1Section() {
  const actions = [
    "Inventário de Riscos Psicossociais: Mapeamento técnico e profundo dos fatores estressores de cada unidade.",
    "Medidas de Controle Efetivas: Planos de ação práticos que vão além da teoria e reduzem o adoecimento.",
    "Execução do Plano de Ação: Suporte direto na implementação das medidas recomendadas, garantindo que as mudanças aconteçam na prática operacional.",
    "Segurança Jurídica: Documentação robusta para defesa em fiscalizações e perícias trabalhistas.",
    "Monitoramento Contínuo: Relatórios inteligentes que garantem que a NR-01 seja uma gestão viva, não apenas um arquivo.",
  ]

  return (
    <section id="nr1" className="py-20 md:py-32 px-4 md:px-6 lg:px-8 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16">
          <AuthorityBadges />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance text-secondary">
              NR-01 & Riscos Psicossociais: A Base da Gestão Moderna
            </h2>
            <p className="text-xl font-semibold text-primary">
              Onde o cumprimento legal encontra a estratégia de preservação humana.
            </p>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>
                O cenário corporativo mudou. A gestão de riscos psicossociais dentro da NR-01 deixou de ser apenas uma
                tendência para se tornar uma exigência regulatória e estratégica. Mais do que um documento, é o novo
                padrão de gestão responsável que protege a empresa e o colaborador simultaneamente.
              </p>
              <p>
                Empresas que lideram o mercado compreendem que o PGR (Programa de Gerenciamento de Riscos) só é efetivo
                quando integra a integridade das pessoas à sustentabilidade do negócio.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <h3 className="font-bold text-lg text-secondary">Atuação Preventiva e Sistêmica (O que entregamos na NR-01):</h3>
              <ul className="space-y-3">
                {actions.map((action, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 rounded-full bg-primary/10 p-1 flex-shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground/90">{action}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right - Image */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/modern-corporate-office-professionals-walking-glas.jpg"
              alt="Gestão moderna de riscos psicossociais NR-1"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/20" />
          </div>
        </div>

        <div className="mt-16">
          <ContextualCTA
            headline="Sua empresa está preparada para a NR-1?"
            description="Realize um diagnóstico prévio gratuito e identifique gaps de conformidade antes que se tornem problemas."
            buttonText="Agendar Diagnóstico NR-1"
            location="nr1-section"
          />
        </div>
      </div>
    </section>
  )
}
