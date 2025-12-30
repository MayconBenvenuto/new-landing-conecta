/**
 * Tipagem e validação de variáveis de ambiente do Kommo
 */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      KOMMO_BASE_URL: string
      KOMMO_ACCESS_TOKEN: string
    }
  }
}

export const kommoConfig = {
  baseUrl: process.env.KOMMO_BASE_URL || "",
  accessToken: process.env.KOMMO_ACCESS_TOKEN || "",
  
  /**
   * Valida se todas as credenciais necessárias estão configuradas
   */
  isConfigured(): boolean {
    return !!(this.baseUrl && this.accessToken)
  },
  
  /**
   * Obtém mensagem de erro caso configuração esteja incompleta
   */
  getConfigError(): string | null {
    if (!this.baseUrl) {
      return "KOMMO_BASE_URL não configurado no .env.local"
    }
    if (!this.accessToken) {
      return "KOMMO_ACCESS_TOKEN não configurado no .env.local"
    }
    return null
  },
}

export {}
