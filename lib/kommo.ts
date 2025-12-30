/**
 * Kommo (amoCRM) Integration
 * Documentação: https://www.amocrm.com/developers/content/crm_platform/
 */

import { kommoConfig } from "./kommo-config"

interface KommoLead {
  name: string
  company: string
  role: string
  email: string
  phone: string
  employees: string
  message?: string
  leadScore: string
  perfil: string
  flags: string[]
  source: string
  timestamp: string
}

interface KommoContact {
  name: string
  custom_fields_values?: Array<{
    field_id: number
    values: Array<{ 
      value: string
      enum_code?: string
    }>
  }>
}

interface KommoLeadPayload {
  name: string
  price: number
  custom_fields_values?: Array<{
    field_id: number
    values: Array<{ value: string }>
  }>
  _embedded?: {
    contacts?: KommoContact[]
  }
}

class KommoClient {
  private baseUrl: string
  private accessToken: string

  constructor() {
    // Valida configuração
    if (!kommoConfig.isConfigured()) {
      const error = kommoConfig.getConfigError()
      console.warn(`[Kommo] ${error}`)
    }

    this.baseUrl = kommoConfig.baseUrl
    this.accessToken = kommoConfig.accessToken
  }

  isConfigured(): boolean {
    return Boolean(this.baseUrl && this.accessToken)
  }

  /**
   * Cria um lead no Kommo
   */
  async createLead(leadData: KommoLead): Promise<{ success: boolean; leadId?: number; error?: string }> {
    if (!this.isConfigured()) {
      return {
        success: false,
        error: "Kommo não configurado",
      }
    }

    try {
      // Passo 1: Criar o contato primeiro
      console.log("[Kommo] Criando contato...")
      
      // Formatar telefone com código do Brasil +55
      const formattedPhone = leadData.phone.startsWith("+55")
        ? leadData.phone
        : `+55${leadData.phone.replace(/\D/g, "")}` // Remove formatação e adiciona +55
      
      const contactPayload = {
        name: leadData.name,
        custom_fields_values: [
          {
            field_id: 3702724, // Campo "O email" (EMAIL)
            values: [
              {
                value: leadData.email,
                enum_code: "WORK",
              },
            ],
          },
          {
            field_id: 3702722, // Campo "Telefone" (PHONE)
            values: [
              {
                value: formattedPhone,
                enum_code: "MOB",
              },
            ],
          },
        ],
      }

      const contactResponse = await fetch(`${this.baseUrl}/api/v4/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`,
        },
        body: JSON.stringify([contactPayload]),
      })

      if (!contactResponse.ok) {
        const errorData = await contactResponse.json().catch(() => ({}))
        console.error("[Kommo] Erro ao criar contato:", {
          status: contactResponse.status,
          error: errorData,
          validationErrors: JSON.stringify(errorData["validation-errors"], null, 2),
        })
        return {
          success: false,
          error: `Erro ao criar contato: HTTP ${contactResponse.status}`,
        }
      }

      const contactData = await contactResponse.json()
      const contactId = contactData._embedded?.contacts?.[0]?.id

      if (!contactId) {
        console.error("[Kommo] ID do contato não retornado")
        return {
          success: false,
          error: "ID do contato não retornado",
        }
      }

      console.log("[Kommo] Contato criado:", contactId)

      // Passo 2: Criar o lead associado ao contato
      console.log("[Kommo] Criando lead...")

      const customFields = [
        {
          field_id: 3859842, // Campo "Empresa" (COMPANY)
          values: [{ value: leadData.company }],
        },
        {
          field_id: 3859846, // Campo "Cargo" (POSITION)
          values: [{ value: leadData.role }],
        },
        {
          field_id: 3859848, // Campo "Número de Colaboradores" (EMPLOYEES)
          values: [{ value: leadData.employees }],
        },
        {
          field_id: 3859850, // Campo "Lead Score" (LEAD_SCORE)
          values: [{ value: leadData.leadScore }],
        },
        {
          field_id: 3859844, // Campo "Origem" (SOURCE)
          values: [{ value: leadData.source }],
        },
      ]

      const leadPayload = {
        name: `${leadData.company} - ${leadData.role}`,
        price: this.calculateLeadValue(leadData.leadScore),
        pipeline_id: 12804379, // Funil "LANDING PAGE"
        status_id: 98774179,   // Primeira etapa customizada: "Lead Qualificado"
        custom_fields_values: customFields,
        _embedded: {
          contacts: [
            {
              id: contactId,
            },
          ],
        },
      }

      const leadResponse = await fetch(`${this.baseUrl}/api/v4/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`,
        },
        body: JSON.stringify([leadPayload]),
      })

      if (!leadResponse.ok) {
        const errorData = await leadResponse.json().catch(() => ({}))
        console.error("[Kommo] Erro ao criar lead:", {
          status: leadResponse.status,
          error: errorData,
          validationErrors: JSON.stringify(errorData["validation-errors"], null, 2),
        })
        return {
          success: false,
          error: `Erro ao criar lead: HTTP ${leadResponse.status}`,
        }
      }

      const leadResponseData = await leadResponse.json()
      const leadId = leadResponseData._embedded?.leads?.[0]?.id

      // Passo 3: Adiciona nota se houver mensagem
      if (leadId && leadData.message) {
        const noteText = `Mensagem do lead:\n${leadData.message}\n\nFlags: ${leadData.flags.join(", ")}`
        await this.addNoteToLead(leadId, noteText)
      }

      console.log("[Kommo] Lead criado com sucesso:", {
        leadId,
        contactId,
        email: leadData.email,
        company: leadData.company,
      })

      return {
        success: true,
        leadId,
      }
    } catch (error) {
      console.error("[Kommo] Erro na integração:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      }
    }
  }

  /**
   * Adiciona uma nota ao lead
   */
  private async addNoteToLead(leadId: number, text: string): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/api/v4/leads/${leadId}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`,
        },
        body: JSON.stringify([
          {
            note_type: "common",
            params: {
              text,
            },
          },
        ]),
      })
    } catch (error) {
      console.error("[Kommo] Erro ao adicionar nota:", error)
    }
  }

  /**
   * Calcula valor estimado do lead baseado no score
   */
  private calculateLeadValue(leadScore: string): number {
    switch (leadScore) {
      case "high":
        return 50000 // R$ 50.000
      case "medium":
        return 25000 // R$ 25.000
      case "low":
        return 10000 // R$ 10.000
      default:
        return 0
    }
  }

  /**
   * Busca os campos customizados disponíveis (útil para configuração)
   */
  async getCustomFields(): Promise<any> {
    if (!this.isConfigured()) {
      return null
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/v4/leads/custom_fields`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        console.log("[Kommo] Campos customizados disponíveis:", data)
        return data
      }
    } catch (error) {
      console.error("[Kommo] Erro ao buscar campos:", error)
    }

    return null
  }
}

// Singleton instance
export const kommoClient = new KommoClient()

/**
 * Função helper para enviar lead ao Kommo
 */
export async function sendLeadToKommo(leadData: KommoLead) {
  return await kommoClient.createLead(leadData)
}
