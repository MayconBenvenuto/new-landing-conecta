/**
 * Script para atualizar cores das etapas do funil LANDING PAGE
 * Execute: npx tsx scripts/update-pipeline-colors.ts
 */

import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const KOMMO_BASE_URL = process.env.KOMMO_BASE_URL
const KOMMO_ACCESS_TOKEN = process.env.KOMMO_ACCESS_TOKEN
const PIPELINE_ID = 12804379

async function updatePipelineColors() {
  console.log("\n🎨 Atualizando cores das etapas do funil LANDING PAGE...\n")

  if (!KOMMO_BASE_URL || !KOMMO_ACCESS_TOKEN) {
    console.error("❌ Erro: Configure as variáveis de ambiente")
    process.exit(1)
  }

  // Mapeamento: ID → Nova Cor (apenas cores validadas pelo Kommo)
  const colorUpdates = [
    { id: 98774179, name: "Lead Qualificado", color: "#87f2c0" },          // Verde claro ✓
    { id: 98773663, name: "Tentativa de Contato", color: "#98cbff" },      // Azul claro (cor existente)
    { id: 98774183, name: "Reuniao Agendada", color: "#ffc8c8" },          // Rosa claro ✓
    { id: 98774187, name: "Proposta Enviada", color: "#ebffb1" },          // Amarelo esverdeado (cor existente)
    { id: 98773667, name: "Em Negociacao", color: "#ffdb99" },             // Laranja claro (cor existente)
    { id: 98773671, name: "Fechamento Iminente", color: "#e6e8ea" },       // Cinza médio (cor existente)
  ]

  try {
    for (const stage of colorUpdates) {
      console.log(`🎨 Atualizando "${stage.name}"...`)
      console.log(`   Cor: ${stage.color}`)

      const response = await fetch(
        `${KOMMO_BASE_URL}/api/v4/leads/pipelines/${PIPELINE_ID}/statuses/${stage.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}`,
          },
          body: JSON.stringify({
            color: stage.color,
          }),
        }
      )

      if (response.ok) {
        console.log(`   ✅ Cor atualizada!\n`)
      } else {
        const error = await response.json().catch(() => ({}))
        console.log(`   ⚠️  Erro: ${response.status}`)
        console.log(`   ${JSON.stringify(error, null, 2)}\n`)
      }

      await new Promise((resolve) => setTimeout(resolve, 200))
    }

    console.log("\n✅ Cores atualizadas com sucesso!\n")
    console.log("🎨 PALETA DE CORES APLICADA:\n")
    console.log("🔵 Cinza claro  → Etapa de leads de entrada")
    console.log("🟢 Verde claro  → Lead Qualificado")
    console.log("🔵 Azul claro   → Tentativa de Contato")
    console.log("🔴 Rosa claro   → Reunião Agendada")
    console.log("🟡 Amarelo      → Proposta Enviada")
    console.log("🟠 Laranja      → Em Negociação")
    console.log("💚 Verde água   → Fechamento Iminente")
    console.log("✅ Verde forte  → Venda ganha")
    console.log("⚫ Cinza escuro → Venda perdida\n")

    console.log("🔍 Verifique em: https://kommobelz.kommo.com/\n")
  } catch (error) {
    console.error("\n❌ Erro:", error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

updatePipelineColors()
