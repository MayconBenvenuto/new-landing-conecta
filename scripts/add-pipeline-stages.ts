/**
 * Script para adicionar novas etapas ao funil LANDING PAGE
 * Execute: npx tsx scripts/add-pipeline-stages.ts
 */

import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const KOMMO_BASE_URL = process.env.KOMMO_BASE_URL
const KOMMO_ACCESS_TOKEN = process.env.KOMMO_ACCESS_TOKEN
const PIPELINE_ID = 12804379 // Funil LANDING PAGE

async function addPipelineStages() {
  console.log("\n➕ Adicionando novas etapas ao funil LANDING PAGE...\n")

  if (!KOMMO_BASE_URL || !KOMMO_ACCESS_TOKEN) {
    console.error("❌ Erro: Configure as variáveis de ambiente")
    process.exit(1)
  }

  const newStages = [
    {
      name: "✅ Lead Qualificado",
      sort: 15,
      color: "#87f2c0", // Verde claro
      type: 0,
    },
    {
      name: "📞 Tentativa de Contato",
      sort: 25,
      color: "#ffcc99", // Laranja claro
      type: 0,
    },
    {
      name: "📅 Reunião Agendada",
      sort: 35,
      color: "#ffc8c8", // Rosa claro
      type: 0,
    },
    {
      name: "📝 Proposta Enviada",
      sort: 45,
      color: "#ebffb1", // Amarelo esverdeado
      type: 0,
    },
    {
      name: "💰 Fechamento Iminente",
      sort: 50,
      color: "#b4f0a7", // Verde médio
      type: 0,
    },
  ]

  console.log("📋 Etapas que serão criadas:\n")
  newStages.forEach((stage, index) => {
    console.log(`   ${index + 1}. ${stage.name}`)
  })
  console.log("")

  try {
    for (const stage of newStages) {
      console.log(`➕ Criando: ${stage.name}...`)

      const response = await fetch(
        `${KOMMO_BASE_URL}/api/v4/leads/pipelines/${PIPELINE_ID}/statuses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}`,
          },
          body: JSON.stringify([stage]),
        }
      )

      if (response.ok) {
        const data = await response.json()
        const createdStatus = data._embedded?.statuses?.[0]
        console.log(`   ✅ Criado com ID: ${createdStatus?.id}`)
        console.log(`      Cor: ${createdStatus?.color}`)
        console.log(`      Ordem: ${createdStatus?.sort}\n`)
      } else {
        const error = await response.json().catch(() => ({}))
        console.log(`   ⚠️  Erro: ${response.status}`)
        console.log(`   ${JSON.stringify(error, null, 2)}\n`)
      }

      // Pequeno delay para não sobrecarregar a API
      await new Promise((resolve) => setTimeout(resolve, 300))
    }

    console.log("\n✅ Processo concluído!\n")
    console.log("🔍 Execute: pnpm kommo:pipelines")
    console.log("   Para ver todas as etapas criadas.\n")
    console.log("📊 Acesse: https://kommobelz.kommo.com/")
    console.log("   Para visualizar o funil atualizado no Kommo.\n")
  } catch (error) {
    console.error("\n❌ Erro:", error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

addPipelineStages()
