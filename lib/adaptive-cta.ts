export type UserProfile = {
  role: string
  employees: string
}

export type AdaptiveCTA = {
  text: string
  headline: string
  subheadline: string
}

export function getAdaptiveCTA(profile: UserProfile): AdaptiveCTA {
  const { role, employees } = profile
  const isLargeCompany = ["201-500", "501-1000", "1000+"].includes(employees)

  // CTA adaptativo por cargo + tamanho
  if (role === "RH" && isLargeCompany) {
    return {
      text: "Agendar Diagnóstico de Riscos Psicossociais",
      headline: "Gestão estratégica de pessoas orientada por dados",
      subheadline: "Identifique riscos psicossociais antes que impactem clima, turnover e produtividade.",
    }
  }

  if (role === "Jurídico") {
    return {
      text: "Avaliar Conformidade NR-1",
      headline: "Proteção jurídica baseada em evidências",
      subheadline: "Estruture a governança de riscos para reduzir passivos trabalhistas e fiscalizações.",
    }
  }

  if (role === "Diretoria") {
    return {
      text: "Reduzir Riscos Estratégicos",
      headline: "Visão executiva de riscos corporativos",
      subheadline: "Decisões baseadas em dados para proteger o negócio e sustentar a operação.",
    }
  }

  if (role === "SST") {
    return {
      text: "Integrar Gestão de SST",
      headline: "Saúde e Segurança conectadas à estratégia",
      subheadline: "Unifique PGR, riscos psicossociais e indicadores em uma única visão.",
    }
  }

  if (role === "RH") {
    return {
      text: "Agendar Diagnóstico de Clima e Saúde",
      headline: "Transforme dados em cuidado",
      subheadline: "Mapeie riscos psicossociais e construa um ambiente de trabalho saudável.",
    }
  }

  // Default
  return {
    text: "Agendar Diagnóstico Gratuito",
    headline: "Gestão de riscos integrada e baseada em evidências",
    subheadline: "Conecte RH, Jurídico e SST em uma única inteligência de dados.",
  }
}

// Versioning support for campaigns
export type LandingVersion = "default" | "nr1" | "juridico" | "rh" | "sst" | "diretoria"

export function getLandingContent(version: LandingVersion) {
  const content: Record<LandingVersion, { headline: string; cta: string; focus: string }> = {
    default: {
      headline: "Sua empresa não é fragmentada. Por que a gestão de riscos dela seria?",
      cta: "Agendar Diagnóstico Gratuito",
      focus: "integração",
    },
    nr1: {
      headline: "NR-1 atualizada: sua empresa está preparada para os riscos psicossociais?",
      cta: "Avaliar Conformidade NR-1",
      focus: "compliance",
    },
    juridico: {
      headline: "Reduza passivos trabalhistas com gestão de riscos baseada em evidências",
      cta: "Agendar Consultoria Jurídica",
      focus: "jurídico",
    },
    rh: {
      headline: "Transforme a gestão de pessoas com inteligência de dados em saúde",
      cta: "Agendar Diagnóstico de Clima",
      focus: "pessoas",
    },
    sst: {
      headline: "Integre SST, PGR e riscos psicossociais em uma única plataforma",
      cta: "Conhecer Solução SST",
      focus: "segurança",
    },
    diretoria: {
      headline: "Proteja o negócio com governança de riscos orientada por dados",
      cta: "Agendar Reunião Executiva",
      focus: "estratégia",
    },
  }

  return content[version] || content.default
}
