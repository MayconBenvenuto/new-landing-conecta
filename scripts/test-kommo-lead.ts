/**
 * Script para testar criação de lead no Kommo e descobrir enums corretos
 * Execute: npx tsx scripts/test-kommo-lead.ts
 */

import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const KOMMO_BASE_URL = process.env.KOMMO_BASE_URL
const KOMMO_ACCESS_TOKEN = process.env.KOMMO_ACCESS_TOKEN

async function testKommoLead() {
  console.log("\n🧪 Testando criação de lead no Kommo...\n")

  if (!KOMMO_BASE_URL || !KOMMO_ACCESS_TOKEN) {
    console.error("❌ Erro: Configure as variáveis de ambiente")
    process.exit(1)
  }

  // Primeiro, vamos descobrir os enums corretos dos campos multitext
  console.log("1️⃣  Buscando detalhes dos campos multitext...\n")

  const fieldsResponse = await fetch(`${KOMMO_BASE_URL}/api/v4/contacts/custom_fields`, {
    headers: {
      Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}`,
    },
  })

  if (fieldsResponse.ok) {
    const fieldsData = await fieldsResponse.json()
    const fields = fieldsData._embedded?.custom_fields || []

    const emailField = fields.find((f: any) => f.code === "EMAIL")
    const phoneField = fields.find((f: any) => f.code === "PHONE")

    console.log("📧 Campo Email:")
    console.log(JSON.stringify(emailField, null, 2))
    console.log("\n📱 Campo Phone:")
    console.log(JSON.stringify(phoneField, null, 2))
    console.log("\n")

    // Agora vamos tentar criar um lead de teste simples
    console.log("2️⃣  Tentando criar lead de teste...\n")

    // Tenta sem enum_code primeiro
    const testPayload1 = {
      name: "Lead Teste - Sem Enum",
      price: 10000,
      custom_fields_values: [
        {
          field_id: 3859842,
          values: [{ value: "Empresa Teste" }],
        },
      ],
      _embedded: {
        contacts: [
          {
            name: "Contato Teste",
            custom_fields_values: [
              {
                field_id: 3702724, // Email
                values: [{ value: "teste@example.com" }],
              },
              {
                field_id: 3702722, // Phone
                values: [{ value: "(81) 99999-9999" }],
              },
            ],
          },
        ],
      },
    }

    console.log("📤 Tentativa 1 - Sem enum_code:")
    console.log(JSON.stringify(testPayload1, null, 2))
    console.log("")

    const response1 = await fetch(`${KOMMO_BASE_URL}/api/v4/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}`,
      },
      body: JSON.stringify([testPayload1]),
    })

    if (response1.ok) {
      const data = await response1.json()
      console.log("✅ Sucesso sem enum_code!")
      console.log(JSON.stringify(data, null, 2))
    } else {
      const error = await response1.json().catch(() => ({}))
      console.log("❌ Erro sem enum_code:")
      console.log(JSON.stringify(error, null, 2))
      
      // Se falhar, tenta buscar os enums do campo
      if (emailField?.enums) {
        console.log("\n📋 Enums disponíveis para Email:")
        emailField.enums.forEach((e: any) => console.log(`   - ${e.value} (${e.enum_code || e.enum})`))
      }
      if (phoneField?.enums) {
        console.log("\n📋 Enums disponíveis para Phone:")
        phoneField.enums.forEach((e: any) => console.log(`   - ${e.value} (${e.enum_code || e.enum})`))
      }
    }
  }
}

testKommoLead()
