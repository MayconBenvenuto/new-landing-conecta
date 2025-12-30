// Form validation utilities

export interface ValidationResult {
  valid: boolean
  errors: Record<string, string>
}

// Corporate email validation - blocks common personal domains
const PERSONAL_DOMAINS = [
  "gmail.com",
  "hotmail.com",
  "outlook.com",
  "yahoo.com",
  "yahoo.com.br",
  "icloud.com",
  "live.com",
  "msn.com",
  "bol.com.br",
  "uol.com.br",
  "terra.com.br",
]

export function validateCorporateEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase()
  if (!domain) return false
  return !PERSONAL_DOMAINS.includes(domain)
}

// WhatsApp validation for Brazilian numbers
export function validateWhatsApp(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "")
  // Brazilian mobile: 11 digits (2 DDD + 9 + 8 digits)
  return cleaned.length >= 10 && cleaned.length <= 11
}

// Format WhatsApp number
export function formatWhatsApp(phone: string): string {
  const cleaned = phone.replace(/\D/g, "")
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
  } else if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`
  }
  return phone
}

export function validateLeadForm(data: {
  name: string
  company: string
  role: string
  email: string
  phone: string
  employees: string
  lgpd: boolean
}): ValidationResult {
  const errors: Record<string, string> = {}

  if (!data.name || data.name.trim().length < 3) {
    errors.name = "Nome deve ter pelo menos 3 caracteres"
  }

  if (!data.company || data.company.trim().length < 2) {
    errors.company = "Nome da empresa é obrigatório"
  }

  if (!data.role) {
    errors.role = "Selecione seu cargo"
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "E-mail inválido"
  } else if (!validateCorporateEmail(data.email)) {
    errors.email = "Por favor, utilize um e-mail corporativo"
  }

  if (!validateWhatsApp(data.phone)) {
    errors.phone = "WhatsApp inválido"
  }

  if (!data.employees) {
    errors.employees = "Selecione o número de colaboradores"
  }

  if (!data.lgpd) {
    errors.lgpd = "Você deve aceitar a política de privacidade"
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}
