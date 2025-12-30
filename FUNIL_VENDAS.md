# 📊 Régua de Vendas - Funil LANDING PAGE

## 🎯 Configuração Atual

**Funil:** LANDING PAGE (ID: 12804379)

### Etapas Configuradas:

1. **🟢 Etapa de leads de entrada** (ID: 98773659) - *Status inicial automático*
   - Lead entra automaticamente aqui ao preencher o formulário
   - Cor: Cinza claro
   
2. **⚪ Contato inicial** (ID: 98773663)
   - Primeiro contato realizado com o lead
   - Cor: Azul claro

3. **⚪ Oferta feita** (ID: 98773667)
   - Proposta comercial enviada
   - Cor: Amarelo claro

4. **⚪ Negociação** (ID: 98773671)
   - Em processo de negociação/ajustes
   - Cor: Laranja

5. **✅ Venda ganha** (ID: 142)
   - Lead convertido em cliente
   - Cor: Verde

6. **🏁 Venda perdida** (ID: 143)
   - Lead não convertido
   - Cor: Cinza escuro

---

## 💡 Régua de Vendas Sugerida (Otimizada para B2B)

### Opção 1: Fluxo Padrão (4 etapas)
Mantém as etapas atuais com automações sugeridas.

### Opção 2: Fluxo Otimizado (6 etapas + segmentação)

Sugestão para alterar no Kommo:

1. **🆕 Novo Lead** (automático via formulário)
   - SLA: 2 horas para primeiro contato
   - Ação: SDR faz qualificação inicial
   - Automação: Enviar email de boas-vindas

2. **📞 Qualificado - Aguardando contato**
   - Lead passou na qualificação (MEDIUM ou HIGH score)
   - SLA: 24 horas para agendar reunião
   - Ação: Tentativas de contato (3x)

3. **📅 Reunião agendada**
   - Primeira reunião comercial marcada
   - Ação: Enviar email confirmação + material institucional
   - Automação: Lembrete 24h antes

4. **📝 Proposta enviada**
   - Proposta comercial formalizada
   - SLA: 5 dias úteis para retorno
   - Ação: Follow-up em D+2 e D+4

5. **🤝 Em negociação**
   - Ajustes de proposta, condições comerciais
   - SLA: 7 dias para fechamento
   - Ação: Reuniões de alinhamento

6. **✅ Contrato assinado** (ganho)
   - Lead convertido em cliente
   - Ação: Onboarding + NPS

7. **❌ Perdido** (com motivo)
   - Motivos: Preço, timing, concorrente, não qualificado
   - Ação: Adicionar à nurturing para remarketing

---

## 🤖 Automações Recomendadas

### No Kommo:

1. **Lead entra → Etapa inicial**
   - ✅ Notificar SDR responsável
   - ✅ Enviar email automático de boas-vindas
   - ✅ Criar tarefa "Primeira qualificação" em 2h

2. **Lead score HIGH**
   - ✅ Notificar gerente comercial
   - ✅ Prioridade máxima na fila

3. **Lead sem movimento há 3 dias**
   - ✅ Alerta para gestor
   - ✅ Criar tarefa de follow-up

4. **Proposta enviada há 5 dias**
   - ✅ Enviar email de follow-up automático
   - ✅ Notificar vendedor

---

## 📊 Métricas para Acompanhar

### Por Etapa:
- Taxa de conversão entre etapas
- Tempo médio em cada etapa
- Volume de leads por etapa

### Globais:
- **Conversion rate**: % de leads que viram clientes
- **Ciclo de vendas**: Tempo médio do lead até fechamento
- **CAC**: Custo de aquisição por cliente
- **Valor médio do contrato**

### Por Lead Score:
- Taxa de conversão HIGH vs MEDIUM vs LOW
- Tempo de ciclo por score

---

## 🎨 Como Editar as Etapas no Kommo

1. Acesse: https://kommobelz.kommo.com/
2. Vá em **Configurações** → **Funis de vendas**
3. Selecione o funil **LANDING PAGE**
4. Clique em **Editar etapas**
5. Adicione/remova/renomeie conforme necessário
6. Execute novamente: `pnpm kommo:discover` para pegar os novos IDs
7. Atualize os IDs no código se criar novas etapas

---

## 🔄 Como Mover Leads Automaticamente

No código atual, todos os leads entram em:
- **Pipeline ID**: 12804379 (LANDING PAGE)
- **Status ID**: 98773659 (Etapa de leads de entrada)

Para mover baseado no Lead Score, você pode adicionar lógica:

\`\`\`typescript
// Exemplo: Leads HIGH vão direto para "Contato inicial"
const statusId = leadData.leadScore === "high" ? 98773663 : 98773659

const leadPayload = {
  // ...
  status_id: statusId,
}
\`\`\`

---

## 📋 Checklist de Implementação

- [x] Funil LANDING PAGE criado
- [x] Leads do formulário vinculados ao funil
- [ ] Customizar nomes das etapas (se desejar)
- [ ] Configurar automações de email no Kommo
- [ ] Definir SLAs por etapa
- [ ] Treinar equipe comercial no novo fluxo
- [ ] Configurar notificações (Slack/Email)
- [ ] Criar dashboard de métricas
- [ ] Implementar nurturing para leads perdidos

---

## 💬 Dúvidas Frequentes

**Q: Posso ter leads em múltiplos funis?**
A: Sim! Cada lead pode estar em apenas um funil, mas você pode mover entre funis.

**Q: Como rotear leads por região/produto?**
A: Crie funis separados ou use tags + automações para distribuir.

**Q: Leads LOW score devem ir para esse funil?**
A: Recomendo criar um funil separado "Nurturing" para leads LOW e movê-los quando qualificarem.

---

✅ **Tudo configurado!** Os leads agora aparecem no funil LANDING PAGE automaticamente.
