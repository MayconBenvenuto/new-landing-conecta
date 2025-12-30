// Lead Scoring Utility - Pre-qualification logic for CRM
export type LeadScore = "high" | "medium" | "low"

export interface LeadScoreResult {
  leadScore: LeadScore
  perfil: string
  flags: string[]
}

const STRATEGIC_ROLES = ["Diretoria", "RH", "Jurídico"]
const LARGE_COMPANY_RANGES = ["501-1000", "1000+"]
const MEDIUM_COMPANY_RANGES = ["201-500"]

export function calculateLeadScore(role: string, employees: string): LeadScoreResult {
  const flags: string[] = []
  let score = 0

  // Role scoring
  if (STRATEGIC_ROLES.includes(role)) {
    score += 2
    flags.push("Cargo estratégico")
  }

  // Company size scoring
  if (LARGE_COMPANY_RANGES.includes(employees)) {
    score += 2
    flags.push("Empresa grande")
  } else if (MEDIUM_COMPANY_RANGES.includes(employees)) {
    score += 1
    flags.push("Empresa média")
  }

  // Determine lead score
  let leadScore: LeadScore = "low"
  if (score >= 3) {
    leadScore = "high"
    flags.push("Lead estratégico")
  } else if (score >= 2) {
    leadScore = "medium"
    flags.push("Lead médio")
  }

  // Build profile string
  const employeeLabel = employees === "1000+" ? "Empresa 1000+" : `Empresa ${employees}`
  const perfil = `${role} + ${employeeLabel}`

  return {
    leadScore,
    perfil,
    flags,
  }
}
