/**
 * Script para criar/atualizar régua de vendas no funil LANDING PAGE
 * Execute: npx tsx scripts/setup-landing-pipeline.ts
 */

import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const KOMMO_BASE_URL = process.env.KOMMO_BASE_URL
const KOMMO_ACCESS_TOKEN = process.env.KOMMO_ACCESS_TOKEN
const PIPELINE_ID = 12804379 // Funil LANDING PAGE

async function setupPipeline() {
  console.log("\n🎨 Configurando régua de vendas do funil LANDING PAGE...\n")

  if (!KOMMO_BASE_URL || !KOMMO_ACCESS_TOKEN) {
    console.error("❌ Erro: Configure as variáveis de ambiente")
    process.exit(1)
  }

  try {
    // 1. Buscar configuração atual do pipeline
    console.log("1️⃣  Buscando configuração atual...\n")
    
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

    const currentPipeline = await getPipelineResponse.json()
    console.log(`✅ Pipeline atual: ${currentPipeline.name}`)
    console.log(`   Etapas atuais: ${Object.keys(currentPipeline._embedded?.statuses || {}).length}\n`)

    // 2. Definir nova régua otimizada
    console.log("2️⃣  Aplicando régua otimizada...\n")

    const newStatuses = [
      {
        name: "🆕 Novo Lead",
        sort: 10,
        color: "#99ccff",
        type: 0, // Status normal
      },
      {
        name: "✅ Qualificado",
        sort: 20,
        color: "#87f2c0",
        type: 0,
      },
      {
        name: "📞 Aguardando contato",
        sort: 30,
        color: "#ffcc99",
        type: 0,
      },
      {
        name: "📅 Reunião agendada",
        sort: 40,
        color: "#ffc8c8",
        type: 0,
      },
      {
        name: "📝 Proposta enviada",
        sort: 50,
        color: "#ebffb1",
        type: 0,
      },
      {
        name: "🤝 Em negociação",
        sort: 60,
        color: "#ffdb99",
        type: 0,
      },
      {
        name: "💰 Fechamento iminente",
        sort: 70,
        color: "#b4f0a7",
        type: 0,
      },
    ]

    // 3. Atualizar pipeline
    const updatePayload = {
      name: "LANDING PAGE",
      sort: 100,
      is_main: false,
      is_unsorted_on: true,
      _embedded: {
        statuses: newStatuses,
      },
    }

    console.log("📤 Enviando atualização...\n")

    const updateResponse = await fetch(
      `${KOMMO_BASE_URL}/api/v4/leads/pipelines/${PIPELINE_ID}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}`,
        },
        body: JSON.stringify(updatePayload),
      }
    )

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json().catch(() => ({}))
      console.error("❌ Erro ao atualizar pipeline:")
      console.error(JSON.stringify(errorData, null, 2))
      
      // Se PATCH não funcionar, tenta criar novos status individualmente
      console.log("\n⚠️  Tentando criar etapas individualmente...\n")
      
      for (const status of newStatuses) {
        console.log(`   Criando: ${status.name}...`)
        
        const createStatusResponse = await fetch(
          `${KOMMO_BASE_URL}/api/v4/leads/pipelines/${PIPELINE_ID}/statuses`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}`,
            },
            body: JSON.stringify([status]),
          }
        )

        if (createStatusResponse.ok) {
          const data = await createStatusResponse.json()
          console.log(`   ✅ Criado: ID ${data._embedded?.statuses?.[0]?.id}`)
        } else {
          const error = await createStatusResponse.json().catch(() => ({}))
          console.log(`   ⚠️  Erro: ${createStatusResponse.status}`)
          console.log(`   ${JSON.stringify(error)}`)
        }
      }
    } else {
      const updatedPipeline = await updateResponse.json()
      console.log("✅ Pipeline atualizado com sucesso!")
      console.log(JSON.stringify(updatedPipeline, null, 2))
    }

    // 4. Verificar resultado final
    console.log("\n3️⃣  Verificando resultado final...\n")
    
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
      
      console.log("📊 RÉGUA FINAL:\n")
      statuses.forEach((status: any, index: number) => {
        const emoji = index === 0 ? "🟢" : "⚪"
        console.log(`${emoji} ${status.name}`)
        console.log(`   ID: ${status.id}`)
        console.log(`   Cor: ${status.color}`)
        console.log("")
      })

      // Sugestão para atualizar o código
      const firstStatus = statuses[0] as any
      if (firstStatus) {
        console.log("\n💡 PRÓXIMO PASSO:\n")
        console.log("Atualize o arquivo lib/kommo.ts com o novo status inicial:")
        console.log(`status_id: ${firstStatus.id}, // ${firstStatus.name}`)
      }
    }

    console.log("\n✅ Configuração concluída!\n")
    console.log("Execute: pnpm kommo:pipelines")
    console.log("Para verificar todos os funis e etapas.\n")

  } catch (error) {
    console.error("\n❌ Erro:", error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

setupPipeline()
