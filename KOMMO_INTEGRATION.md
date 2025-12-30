# 🔗 Guia de Integração com Kommo (amoCRM)

## 📋 Pré-requisitos

1. Conta ativa no Kommo (https://www.amocrm.com/)
2. Acesso de administrador para criar integrações

---

## 🚀 Passo a Passo para Configuração

### 1️⃣ **Obter Credenciais do Kommo**

#### Opção A: Access Token Simples (Recomendado para Começar)

1. Acesse seu Kommo: `https://[seu-dominio].amocrm.com`
2. Vá em **Configurações** → **API** → **Integrações**
3. Clique em **"Criar Integração"**
4. Preencha os dados:
   - **Nome**: Conecta Saúde Landing
   - **URL de redirecionamento**: `http://localhost:3000` (pode mudar depois)
5. Após criar, copie:
   - **Client ID**
   - **Client Secret**
   - **Access Token** (se disponível)

#### Opção B: Gerar Access Token via OAuth (Mais Seguro)

1. Use o fluxo OAuth2 do Kommo
2. Documentação: https://www.amocrm.com/developers/content/oauth/step-by-step
3. Você receberá um `access_token` e um `refresh_token`

---

### 2️⃣ **Configurar Variáveis de Ambiente**

1. Na raiz do projeto, crie o arquivo `.env.local`:

```bash
# Windows PowerShell
New-Item -Path .env.local -ItemType File

# Ou crie manualmente
```

2. Adicione as variáveis:

```env
# URL da sua conta Kommo (substitua 'seudominio')
KOMMO_BASE_URL=https://seudominio.amocrm.com

# Access Token obtido no passo anterior
KOMMO_ACCESS_TOKEN=seu_access_token_aqui

# Opcional: para refresh automático
KOMMO_CLIENT_ID=seu_client_id
KOMMO_CLIENT_SECRET=seu_client_secret
```

---

### 3️⃣ **Mapear Campos Customizados**

Os campos customizados no Kommo têm IDs específicos. Você precisa descobrir os IDs dos seus campos.

#### Como descobrir os IDs:

1. **Via API** (Recomendado):
   ```bash
   curl -X GET "https://seudominio.amocrm.com/api/v4/leads/custom_fields" \
     -H "Authorization: Bearer SEU_ACCESS_TOKEN"
   ```

2. **Via Interface do Kommo**:
   - Vá em Configurações → Configurações → Leads → Campos personalizados
   - Inspecione a página (F12) e procure pelos IDs

#### Campos Padrão que você precisa mapear:

No arquivo `lib/kommo.ts`, atualize os `field_id` nas linhas 61-87:

```typescript
const customFields = [
  {
    field_id: 123456, // ← SUBSTITUIR pelo ID real do campo "Empresa"
    values: [{ value: leadData.company }],
  },
  {
    field_id: 123457, // ← SUBSTITUIR pelo ID real do campo "Cargo"
    values: [{ value: leadData.role }],
  },
  {
    field_id: 123458, // ← SUBSTITUIR pelo ID real do campo "Nº Colaboradores"
    values: [{ value: leadData.employees }],
  },
  {
    field_id: 123459, // ← SUBSTITUIR pelo ID real do campo "Lead Score"
    values: [{ value: leadData.leadScore }],
  },
]
```

#### Campos de Contato (Email e Telefone):

Os IDs comuns são:
- **Email**: geralmente `482331` (mas pode variar)
- **Telefone**: geralmente `482333` (mas pode variar)

Atualize nas linhas 93-102:

```typescript
custom_fields_values: [
  {
    field_id: 482331, // ← Confirme o ID do campo Email
    values: [{ value: leadData.email }],
  },
  {
    field_id: 482333, // ← Confirme o ID do campo Telefone
    values: [{ value: leadData.phone }],
  },
]
```

---

### 4️⃣ **Testar a Integração**

1. **Inicie o servidor de desenvolvimento**:
   ```bash
   pnpm dev
   ```

2. **Acesse**: http://localhost:3000

3. **Preencha o formulário de lead**

4. **Verifique os logs no terminal**:
   ```
   [Lead] New submission: { email: '...', company: '...', ... }
   [Kommo] Lead criado com sucesso: { leadId: 12345, ... }
   ```

5. **Confirme no Kommo**:
   - Acesse seu Kommo
   - Vá em **Leads**
   - Verifique se o lead apareceu

---

## 🔍 Verificação de Configuração

Execute este teste para verificar a conexão:

```bash
# Cole no terminal do PowerShell (ajuste as variáveis)
$baseUrl = "https://seudominio.amocrm.com"
$token = "seu_access_token"

curl "$baseUrl/api/v4/account" -H "Authorization: Bearer $token"
```

✅ **Sucesso**: Você verá dados da sua conta
❌ **Erro 401**: Access token inválido ou expirado
❌ **Erro 403**: Token sem permissões necessárias

---

## 🛠️ Script de Descoberta de Campos

Crie um arquivo temporário para descobrir os IDs dos campos:

```typescript
// scripts/discover-kommo-fields.ts
import { kommoClient } from '@/lib/kommo'

async function discoverFields() {
  const fields = await kommoClient.getCustomFields()
  console.log('Campos disponíveis:', JSON.stringify(fields, null, 2))
}

discoverFields()
```

Execute:
```bash
npx tsx scripts/discover-kommo-fields.ts
```

---

## 📊 Estrutura do Lead no Kommo

Cada lead criado conterá:

| Campo | Descrição | Origem |
|-------|-----------|--------|
| **Nome** | `[Empresa] - [Cargo]` | Gerado automaticamente |
| **Valor** | R$ 10.000 - R$ 50.000 | Baseado no Lead Score |
| **Contato** | Nome completo | Formulário |
| **Email** | Email fornecido | Formulário |
| **Telefone** | WhatsApp formatado | Formulário |
| **Empresa** | Nome da empresa | Formulário |
| **Cargo** | Cargo selecionado | Formulário |
| **Nº Colaboradores** | Faixa de funcionários | Formulário |
| **Lead Score** | HIGH / MEDIUM / LOW | Calculado automaticamente |
| **Perfil** | Ex: "RH + Empresa 501-1000" | Gerado |
| **Origem** | landing-page | Fixo |
| **Nota** | Mensagem do lead + Flags | Se fornecida |

---

## ⚙️ Configurações Avançadas

### Valores dos Leads

Os valores são atribuídos automaticamente baseados no Lead Score:

```typescript
// Ajuste em lib/kommo.ts, método calculateLeadValue()
"high"   → R$ 50.000
"medium" → R$ 25.000
"low"    → R$ 10.000
```

### Funil e Etapa

Por padrão, o lead é criado no funil principal, primeira etapa. Para customizar:

```typescript
const payload = {
  name: `${leadData.company} - ${leadData.role}`,
  price: this.calculateLeadValue(leadData.leadScore),
  pipeline_id: 123456, // ← Adicione o ID do funil
  status_id: 654321,   // ← Adicione o ID da etapa
  // ...
}
```

### Tags Automáticas

Adicione tags baseadas no Lead Score:

```typescript
const payload = {
  // ...
  _embedded: {
    tags: [
      { name: leadData.leadScore.toUpperCase() },
      { name: 'Landing Page' },
      { name: leadData.role },
    ],
  },
}
```

---

## 🔄 Refresh Token Automático

Para tokens que expiram, implemente refresh automático:

```typescript
// lib/kommo-auth.ts
export async function refreshKommoToken() {
  const response = await fetch('https://www.amocrm.com/oauth2/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.KOMMO_CLIENT_ID,
      client_secret: process.env.KOMMO_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: process.env.KOMMO_REFRESH_TOKEN,
      redirect_uri: process.env.KOMMO_REDIRECT_URI,
    }),
  })
  
  const data = await response.json()
  // Salve o novo access_token e refresh_token
  return data
}
```

---

## 🐛 Troubleshooting

### Erro: "Kommo não configurado"
✅ **Solução**: Verifique se `.env.local` existe e tem as variáveis corretas

### Erro: "401 Unauthorized"
✅ **Solução**: Access token expirado. Gere um novo token

### Erro: "400 Bad Request"
✅ **Solução**: IDs dos campos customizados incorretos. Use o script de descoberta

### Lead não aparece no Kommo
✅ **Solução**: 
1. Verifique os logs do terminal
2. Confirme que `kommoResult.success` é `true`
3. Verifique se o token tem permissões de escrita

### Campos vazios no Kommo
✅ **Solução**: 
1. Confirme os IDs dos campos customizados
2. Remova campos com `field_id: 0` (não configurados)

---

## 📝 Checklist de Deploy

Antes de fazer deploy em produção:

- [ ] Todas as variáveis de ambiente configuradas no Vercel
- [ ] IDs dos campos customizados mapeados corretamente
- [ ] Access token válido e com permissões adequadas
- [ ] Testado pelo menos 3 leads de teste
- [ ] Logs verificados no Vercel
- [ ] Webhook configurado (opcional, para atualizações bidireciais)

---

## 🔒 Segurança

⚠️ **NUNCA commite** o arquivo `.env.local` no Git!

O arquivo `.gitignore` já deve incluir:
```
.env.local
.env*.local
```

---

## 📚 Recursos Úteis

- **Documentação Oficial**: https://www.amocrm.com/developers/content/crm_platform/
- **API Reference**: https://www.amocrm.com/developers/content/crm_platform/platform-api-overview
- **OAuth Guide**: https://www.amocrm.com/developers/content/oauth/step-by-step
- **Postman Collection**: https://www.postman.com/kommo-dev

---

## 💡 Próximos Passos

1. Configure webhook reverso para atualizar status no site
2. Adicione automações no Kommo (emails automáticos, tarefas)
3. Implemente dashboard de analytics
4. Configure integrações adicionais (RD Station, HubSpot)

---

**Dúvidas?** Verifique os logs do terminal e do Kommo para mais detalhes! 🚀
