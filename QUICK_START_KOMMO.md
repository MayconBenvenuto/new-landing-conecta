# 🚀 Guia Rápido de Integração com Kommo

## ⚡ Início Rápido (5 minutos)

### Passo 1: Configure as Credenciais

1. Crie o arquivo `.env.local` na raiz do projeto:

```bash
KOMMO_BASE_URL=https://seudominio.amocrm.com
KOMMO_ACCESS_TOKEN=seu_token_de_acesso_aqui
```

> 💡 **Onde obter essas informações?**
> - Veja o guia completo em [KOMMO_INTEGRATION.md](./KOMMO_INTEGRATION.md)
> - Acesse: Kommo → Configurações → Integrações → API

### Passo 2: Descubra os IDs dos Campos

Execute o script de descoberta automática:

```bash
pnpm kommo:discover
```

Este script irá:
- ✅ Testar sua conexão com o Kommo
- ✅ Listar todos os campos customizados disponíveis
- ✅ Mostrar os IDs que você precisa configurar

### Passo 3: Atualize os IDs no Código

Abra o arquivo `lib/kommo.ts` e atualize os `field_id` com os valores descobertos:

```typescript
// Exemplo (linhas 61-87):
{
  field_id: 123456, // ← Substitua pelo ID real do campo "Empresa"
  values: [{ value: leadData.company }]
}
```

**Campos que você precisa mapear:**
- ✏️ Empresa (company)
- ✏️ Cargo (position)
- ✏️ Número de Colaboradores (employeeCount)
- ✏️ Lead Score (leadScore)
- ✏️ Email no Contato (geralmente código EMAIL)
- ✏️ Telefone no Contato (geralmente código PHONE)

### Passo 4: Teste a Integração

1. Inicie o servidor:
```bash
pnpm dev
```

2. Acesse: http://localhost:3000

3. Preencha o formulário de lead

4. Verifique os logs no terminal:
```
✅ Lead enviado para Kommo com sucesso!
   ID do Lead: 12345678
```

5. Confirme no Kommo:
   - Abra seu Kommo
   - Verifique se o lead apareceu
   - Confira se todos os campos foram preenchidos

---

## 🔧 Troubleshooting

### ❌ Erro: "Missing KOMMO_ACCESS_TOKEN"
**Solução:** Certifique-se de que criou o arquivo `.env.local` com as credenciais

### ❌ Erro: 401 Unauthorized
**Solução:** Token de acesso inválido ou expirado. Gere um novo token no Kommo

### ❌ Erro: 400 Bad Request - Invalid custom field
**Solução:** Os IDs dos campos estão incorretos. Execute `pnpm kommo:discover` novamente

### ❌ Lead criado mas campos vazios
**Solução:** Verifique se os `field_id` estão corretos no arquivo `lib/kommo.ts`

---

## 📚 Documentação Completa

Para configuração avançada, OAuth2, webhooks e mais:
👉 Leia [KOMMO_INTEGRATION.md](./KOMMO_INTEGRATION.md)

---

## ✅ Checklist de Verificação

Antes de colocar em produção:

- [ ] Arquivo `.env.local` criado com credenciais
- [ ] Script `pnpm kommo:discover` executado com sucesso
- [ ] IDs dos campos atualizados em `lib/kommo.ts`
- [ ] Lead de teste criado com sucesso
- [ ] Todos os campos aparecem corretamente no Kommo
- [ ] Logs não mostram erros
- [ ] Variáveis de ambiente configuradas na Vercel

---

## 🎉 Pronto!

Sua integração com o Kommo está funcionando! Agora todos os leads do formulário serão automaticamente enviados para seu CRM.

**Próximos passos:**
- Configure pipelines e automações no Kommo
- Adicione webhooks para sincronização bidirecional
- Implemente notificações em tempo real
