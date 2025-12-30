/**
 * Script utilitário para descobrir IDs de campos customizados no Kommo
 * Execute: npx tsx scripts/discover-kommo-fields.ts
 */

import { config } from 'dotenv'
import { resolve } from 'path'

// Carrega variáveis de ambiente do .env.local
config({ path: resolve(process.cwd(), '.env.local') })

const KOMMO_BASE_URL = process.env.KOMMO_BASE_URL
const KOMMO_ACCESS_TOKEN = process.env.KOMMO_ACCESS_TOKEN

async function discoverKommoFields() {
  console.log("\n🔍 Descobrindo campos do Kommo...\n")

  if (!KOMMO_BASE_URL || !KOMMO_ACCESS_TOKEN) {
    console.error("❌ Erro: Configure KOMMO_BASE_URL e KOMMO_ACCESS_TOKEN no .env.local")
    console.log("\nExemplo:")
    console.log("KOMMO_BASE_URL=https://seudominio.amocrm.com")
    console.log("KOMMO_ACCESS_TOKEN=seu_token_aqui\n")
    process.exit(1)
  }

  try {
    // 1. Testar conexão
    console.log("1️⃣  Testando conexão com Kommo...")
    const accountResponse = await fetch(`${KOMMO_BASE_URL}/api/v4/account`, {
      headers: {
        Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}`,
      },
    })

    if (!accountResponse.ok) {
      console.error(`❌ Erro de autenticação: ${accountResponse.status} ${accountResponse.statusText}`)
      process.exit(1)
    }

    const account = await accountResponse.json()
    console.log(`✅ Conectado à conta: ${account.name || "Sem nome"}`)
    console.log(`   ID: ${account.id}`)
    console.log(`   Subdomínio: ${account.subdomain}\n`)

    // 2. Buscar campos de Leads
    console.log("2️⃣  Buscando campos customizados de Leads...")
    const leadsFieldsResponse = await fetch(`${KOMMO_BASE_URL}/api/v4/leads/custom_fields`, {
      headers: {
        Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}`,
      },
    })

    if (!leadsFieldsResponse.ok) {
      console.error(`❌ Erro ao buscar campos: ${leadsFieldsResponse.status}`)
      process.exit(1)
    }

    const leadsFieldsData = await leadsFieldsResponse.json()
    const leadsFields = leadsFieldsData._embedded?.custom_fields || []

    console.log(`✅ Encontrados ${leadsFields.length} campos customizados\n`)
    console.log("📋 Campos disponíveis para Leads:\n")

    leadsFields.forEach((field: any) => {
      console.log(`   - ${field.name}`)
      console.log(`     ID: ${field.id}`)
      console.log(`     Tipo: ${field.type}`)
      console.log(`     Código: ${field.code || "N/A"}`)
      console.log("")
    })

    // 3. Buscar campos de Contatos
    console.log("\n3️⃣  Buscando campos customizados de Contatos...")
    const contactsFieldsResponse = await fetch(`${KOMMO_BASE_URL}/api/v4/contacts/custom_fields`, {
      headers: {
        Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}`,
      },
    })

    if (contactsFieldsResponse.ok) {
      const contactsFieldsData = await contactsFieldsResponse.json()
      const contactsFields = contactsFieldsData._embedded?.custom_fields || []

      console.log(`✅ Encontrados ${contactsFields.length} campos customizados\n`)
      console.log("📋 Campos disponíveis para Contatos:\n")

      // Campos importantes para mapear
      const importantFields = ["EMAIL", "PHONE"]

      contactsFields.forEach((field: any) => {
        const isImportant = importantFields.includes(field.code)
        const marker = isImportant ? "⭐" : "  "

        console.log(`${marker} - ${field.name}`)
        console.log(`     ID: ${field.id}`)
        console.log(`     Tipo: ${field.type}`)
        console.log(`     Código: ${field.code || "N/A"}`)

        if (isImportant) {
          console.log(`     👉 Use este ID no arquivo lib/kommo.ts`)
        }
        console.log("")
      })
    }

    // 4. Sugestões de mapeamento
    console.log("\n" + "=".repeat(60))
    console.log("\n📝 PRÓXIMOS PASSOS:\n")
    console.log("1. Localize os IDs dos campos que você precisa mapear:")
    console.log("   - Empresa")
    console.log("   - Cargo")
    console.log("   - Número de Colaboradores")
    console.log("   - Lead Score")
    console.log("   - Email (geralmente código EMAIL)")
    console.log("   - Telefone (geralmente código PHONE)")
    console.log("")
    console.log("2. Abra o arquivo: lib/kommo.ts")
    console.log("")
    console.log("3. Atualize os field_id nas linhas 61-87 (campos de Lead)")
    console.log("   e linhas 93-102 (campos de Contato)")
    console.log("")
    console.log("4. Teste enviando um lead pelo formulário")
    console.log("")
    console.log("✅ Pronto para integração!\n")
  } catch (error) {
    console.error("\n❌ Erro:", error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

// Executa o script
discoverKommoFields()
