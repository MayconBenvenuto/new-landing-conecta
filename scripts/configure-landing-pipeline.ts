/**
 * Script consolidado para configurar completamente o funil LANDING PAGE
 * Renomeia etapas + atualiza cores em uma única execução
 * Execute: npx tsx scripts/configure-landing-pipeline.ts
 */

import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const KOMMO_BASE_URL = process.env.KOMMO_BASE_URL
const KOMMO_ACCESS_TOKEN = process.env.KOMMO_ACCESS_TOKEN
const PIPELINE_ID = 12804379

async function configurePipeline() {
  console.log("\n🔧 Configurando funil LANDING PAGE completo...\n")

  if (!KOMMO_BASE_URL || !KOMMO_ACCESS_TOKEN) {
    console.error("❌ Erro: Configure as variáveis de ambiente")
    process.exit(1)
  }

  try {
    // 1. Buscar etapas atuais do pipeline
    console.log("1️⃣  Buscando etapas atuais...\n")
    
    const getPipelineResponse = await fetch(
      `${KOMMO_BASE_URL}/api/v4/leads/pipelines/${PIPELINE_ID}`,
      {
        headers: {
          Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}`,
        },
      }
    )

    if (!getPipelineResponse.ok) {
      console.error(`❌ Erro ao buscar pipeline: ${getPipelineResponse.status}`)
      process.exit(1)
    }

    const pipelineData = await getPipelineResponse.json()
    const currentStatuses = Object.values(pipelineData._embedded?.statuses || {})
      .sort((a: any, b: any) => a.sort - b.sort)

    console.log(`✅ Encontradas ${currentStatuses.length} etapas\n`)

    // 2. Configurações desejadas (nome + cor para cada ID)
    const statusConfigs = [
      { id: 98773659, name: "Novo Lead", color: "#c1c1c1" },           // Cinza - entrada
      { id: 98774179, name: "Lead Qualificado", color: "#87f2c0" },    // Verde claro
      { id: 98773663, name: "Tentativa de Contato", color: "#98cbff" },// Azul claro
      { id: 98774183, name: "Reuniao Agendada", color: "#ffc8c8" },    // Rosa claro
      { id: 98774187, name: "Proposta Enviada", color: "#ebffb1" },    // Amarelo esverdeado
      { id: 98773667, name: "Em Negociacao", color: "#ff8f92" },       // Salmão
      { id: 98773671, name: "Fechamento Iminente", color: "#e6e8ea" }, // Cinza médio
    ]

    // 3. Atualizar cada etapa
    console.log("2️⃣  Atualizando etapas...\n")

    for (const config of statusConfigs) {
      const currentStatus = currentStatuses.find((s: any) => s.id === config.id)
      
      if (!currentStatus) {
        console.log(`⚠️  Etapa ID ${config.id} não encontrada, pulando...\n`)
        continue
      }

      console.log(`🔄 Atualizando: ${config.name}`)
      console.log(`   ID: ${config.id}`)
      console.log(`   Cor: ${config.color}`)

      const response = await fetch(
        `${KOMMO_BASE_URL}/api/v4/leads/pipelines/${PIPELINE_ID}/statuses/${config.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}`,
          },
          body: JSON.stringify({
            name: config.name,
            color: config.color,
          }),
        }
      )

      if (response.ok) {
        console.log(`   ✅ Atualizado com sucesso!\n`)
      } else {
        const error = await response.json().catch(() => ({}))
        console.log(`   ⚠️  Erro parcial: ${response.status}`)
        
        // Se falhar, tenta só o nome
        const retryResponse = await fetch(
          `${KOMMO_BASE_URL}/api/v4/leads/pipelines/${PIPELINE_ID}/statuses/${config.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}`,
            },
            body: JSON.stringify({ name: config.name }),
          }
        )

        if (retryResponse.ok) {
          console.log(`   ✅ Nome atualizado (cor mantida)\n`)
        } else {
          console.log(`   ❌ Falha: ${JSON.stringify(error)}\n`)
        }
      }

      // Pequeno delay para não sobrecarregar API
      await new Promise((resolve) => setTimeout(resolve, 300))
    }

    // 4. Verificar resultado final
    console.log("\n3️⃣  Verificando resultado...\n")
    
    const finalResponse = await fetch(
      `${KOMMO_BASE_URL}/api/v4/leads/pipelines/${PIPELINE_ID}`,
      {
        headers: {
          Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}`,
        },
      }
    )

    if (finalResponse.ok) {
      const finalPipeline = await finalResponse.json()
      const statuses = Object.values(finalPipeline._embedded?.statuses || {})
        .sort((a: any, b: any) => a.sort - b.sort)

      console.log("📊 FUNIL LANDING PAGE - CONFIGURAÇÃO FINAL:\n")
      statuses.forEach((status: any, index: number) => {
        const emoji = index === 0 ? "🟢" : 
                     status.name.includes("ganha") ? "✅" :
                     status.name.includes("perdida") ? "❌" : "⚪"
        console.log(`${emoji} ${status.name}`)
        console.log(`   ID: ${status.id} | Cor: ${status.color}`)
        console.log("")
      })
    }

    console.log("✅ Configuração concluída!\n")
    console.log("🔍 Verifique em: https://kommobelz.kommo.com/")
    console.log("💡 Execute: pnpm kommo:pipelines para ver detalhes\n")

  } catch (error) {
    console.error("\n❌ Erro:", error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

configurePipeline()
