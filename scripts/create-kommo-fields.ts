/**
 * Script para criar campos customizados necessários no Kommo
 * Execute: npx tsx scripts/create-kommo-fields.ts
 */

import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const KOMMO_BASE_URL = process.env.KOMMO_BASE_URL
const KOMMO_ACCESS_TOKEN = process.env.KOMMO_ACCESS_TOKEN

async function createKommoFields() {
  console.log("\n🔧 Criando campos customizados no Kommo...\n")

  if (!KOMMO_BASE_URL || !KOMMO_ACCESS_TOKEN) {
    console.error("❌ Erro: Configure as variáveis de ambiente")
    process.exit(1)
  }

  // Campos para Leads
  const leadFields = [
    {
      name: "Cargo",
      type: "text",
      code: "POSITION"
    },
    {
      name: "Número de Colaboradores",
      type: "text",
      code: "EMPLOYEES"
    },
    {
      name: "Lead Score",
      type: "text",
      code: "LEAD_SCORE"
    }
  ]

  try {
    console.log("📋 Criando campos de Leads...\n")

    for (const field of leadFields) {
      const payload: any = {
        name: field.name,
        type: field.type,
      }

      if (field.code) {
        payload.code = field.code
      }

      console.log(`   Criando: ${field.name}...`)

      const response = await fetch(`${KOMMO_BASE_URL}/api/v4/leads/custom_fields`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}`,
        },
        body: JSON.stringify([payload]),
      })

      if (response.ok) {
        const data = await response.json()
        const createdField = data._embedded?.custom_fields?.[0]
        console.log(`   ✅ Criado com ID: ${createdField?.id}\n`)
      } else {
        const error = await response.json().catch(() => ({}))
        console.log(`   ⚠️  Erro: ${response.status} - ${JSON.stringify(error)}\n`)
      }
    }

    console.log("\n✅ Processo concluído!")
    console.log("\nExecute novamente: pnpm kommo:discover")
    console.log("Para ver os IDs dos campos criados.\n")
  } catch (error) {
    console.error("\n❌ Erro:", error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

createKommoFields()
