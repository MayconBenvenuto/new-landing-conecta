/**
 * Script para descobrir pipelines (funis) e status (etapas) no Kommo
 * Execute: npx tsx scripts/discover-kommo-pipelines.ts
 */

import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const KOMMO_BASE_URL = process.env.KOMMO_BASE_URL
const KOMMO_ACCESS_TOKEN = process.env.KOMMO_ACCESS_TOKEN

async function discoverPipelines() {
  console.log("\n🔍 Descobrindo funis de vendas no Kommo...\n")

  if (!KOMMO_BASE_URL || !KOMMO_ACCESS_TOKEN) {
    console.error("❌ Erro: Configure as variáveis de ambiente")
    process.exit(1)
  }

  try {
    const response = await fetch(`${KOMMO_BASE_URL}/api/v4/leads/pipelines`, {
      headers: {
        Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}`,
      },
    })

    if (!response.ok) {
      console.error(`❌ Erro: ${response.status} ${response.statusText}`)
      process.exit(1)
    }

    const data = await response.json()
    const pipelines = data._embedded?.pipelines || []

    console.log(`✅ Encontrados ${pipelines.length} funis de vendas\n`)
    console.log("=" .repeat(80))

    pipelines.forEach((pipeline: any) => {
      console.log(`\n📊 FUNIL: ${pipeline.name}`)
      console.log(`   ID: ${pipeline.id}`)
      console.log(`   Principal: ${pipeline.is_main ? "Sim" : "Não"}`)
      console.log(`   Arquivado: ${pipeline.is_archive ? "Sim" : "Não"}`)
      console.log(`\n   📍 ETAPAS (Status):`)

      const statuses = Object.values(pipeline._embedded?.statuses || {})
      statuses.forEach((status: any, index: number) => {
        const emoji = index === 0 ? "🟢" : index === statuses.length - 1 ? "🏁" : "⚪"
        console.log(`   ${emoji} ${status.name}`)
        console.log(`      ID: ${status.id}`)
        console.log(`      Tipo: ${status.type === 1 ? "Padrão" : status.type === 142 ? "Ganho" : status.type === 143 ? "Perdido" : "Outro"}`)
        console.log(`      Cor: ${status.color}`)
        console.log(`      Ordem: ${status.sort}`)
        console.log("")
      })

      console.log("-".repeat(80))
    })

    // Sugestões de uso
    console.log("\n\n💡 COMO USAR:\n")
    console.log("1. Localize o ID do funil 'LANDING PAGE' acima")
    console.log("2. Escolha o ID da primeira etapa (geralmente 'Novo lead' ou similar)")
    console.log("3. Adicione no arquivo lib/kommo.ts:\n")
    console.log("   const leadPayload = {")
    console.log("     name: `${leadData.company} - ${leadData.role}`,")
    console.log("     price: this.calculateLeadValue(leadData.leadScore),")
    console.log("     pipeline_id: SEU_PIPELINE_ID, // ← ID do funil LANDING PAGE")
    console.log("     status_id: SEU_STATUS_ID,     // ← ID da primeira etapa")
    console.log("     // ... resto do código")
    console.log("   }\n")

    // Encontrar funil LANDING PAGE
    const landingPagePipeline = pipelines.find((p: any) => 
      p.name.toLowerCase().includes("landing")
    )

    if (landingPagePipeline) {
      console.log("\n🎯 FUNIL LANDING PAGE ENCONTRADO!\n")
      console.log(`Pipeline ID: ${landingPagePipeline.id}`)
      
      const statuses = Object.values(landingPagePipeline._embedded?.statuses || {})
      const firstStatus = statuses[0] as any
      
      if (firstStatus) {
        console.log(`Status Inicial: ${firstStatus.name} (ID: ${firstStatus.id})`)
        console.log("\n📝 CÓDIGO PRONTO PARA USAR:\n")
        console.log(`pipeline_id: ${landingPagePipeline.id},`)
        console.log(`status_id: ${firstStatus.id},`)
      }
    }

    console.log("\n✅ Descoberta completa!\n")
  } catch (error) {
    console.error("\n❌ Erro:", error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

discoverPipelines()
