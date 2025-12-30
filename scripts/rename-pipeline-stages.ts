/**
 * Script para renomear e organizar etapas do funil LANDING PAGE
 * Execute: npx tsx scripts/rename-pipeline-stages.ts
 */

import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const KOMMO_BASE_URL = process.env.KOMMO_BASE_URL
const KOMMO_ACCESS_TOKEN = process.env.KOMMO_ACCESS_TOKEN
const PIPELINE_ID = 12804379

async function renamePipelineStages() {
  console.log("\n✏️  Renomeando etapas do funil LANDING PAGE...\n")

  if (!KOMMO_BASE_URL || !KOMMO_ACCESS_TOKEN) {
    console.error("❌ Erro: Configure as variáveis de ambiente")
    process.exit(1)
  }

  // Mapeamento: ID → Novo Nome
  const renames = [
    { id: 98773659, name: "Novo Lead", sort: 10 },
    { id: 98774179, name: "Lead Qualificado", sort: 20 },
    { id: 98773663, name: "Tentativa de Contato", sort: 30 },
    { id: 98774183, name: "Reuniao Agendada", sort: 40 },
    { id: 98774187, name: "Proposta Enviada", sort: 50 },
    { id: 98773667, name: "Em Negociacao", sort: 60 },
    { id: 98773671, name: "Fechamento Iminente", sort: 70 },
  ]

  try {
    for (const stage of renames) {
      console.log(`✏️  Renomeando ID ${stage.id} para: "${stage.name}"...`)

      const response = await fetch(
        `${KOMMO_BASE_URL}/api/v4/leads/pipelines/${PIPELINE_ID}/statuses/${stage.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}`,
          },
          body: JSON.stringify({
            name: stage.name,
            sort: stage.sort,
          }),
        }
      )

      if (response.ok) {
        console.log(`   ✅ Atualizado!\n`)
      } else {
        const error = await response.json().catch(() => ({}))
        console.log(`   ⚠️  Erro: ${response.status}`)
        console.log(`   ${JSON.stringify(error, null, 2)}\n`)
      }

      await new Promise((resolve) => setTimeout(resolve, 200))
    }

    console.log("\n✅ Renomeação concluída!\n")
    console.log("📊 RÉGUA FINAL DO FUNIL LANDING PAGE:\n")
    console.log("1. 🟢 Novo Lead (automático)")
    console.log("2. ✅ Lead Qualificado")
    console.log("3. 📞 Tentativa de Contato")
    console.log("4. 📅 Reuniao Agendada")
    console.log("5. 📝 Proposta Enviada")
    console.log("6. 🤝 Em Negociacao")
    console.log("7. 💰 Fechamento Iminente")
    console.log("8. ✅ Venda ganha")
    console.log("9. ❌ Venda perdida\n")

    console.log("🔍 Verifique em: https://kommobelz.kommo.com/\n")
    console.log("💡 Execute: pnpm kommo:pipelines")
    console.log("   Para confirmar as mudanças.\n")
  } catch (error) {
    console.error("\n❌ Erro:", error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

renamePipelineStages()
