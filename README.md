# Conecta Saúde - Landing Page

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/mayconbenvenutos-projects/v0-conecta-saude-landing-page)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

## 🎯 Visão Geral

Landing page B2B para captação de leads em gestão de riscos ocupacionais (conformidade NR-1). Integração completa com Kommo CRM, lead scoring automático e validação LGPD.

**Stack Principal:**
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Radix UI (via Shadcn/ui)
- Framer Motion
- Vercel Analytics

## 🚀 Deploy Automático

**Projeto ativo:** [v0-conecta-saude-landing-page](https://vercel.com/mayconbenvenutos-projects/v0-conecta-saude-landing-page)

Deploy automático via Git push:
```bash
git push origin main  # → Deploy em produção
git push origin [branch]  # → Preview deploy
```

## 📋 Setup Rápido

### 1. Clonar e Instalar
```bash
git clone [repository-url]
cd new-landing-conecta
pnpm install
```

### 2. Configurar Variáveis de Ambiente
```bash
cp .env.example .env.local
# Editar .env.local com suas credenciais Kommo
```

### 3. Desenvolvimento Local
```bash
pnpm dev  # http://localhost:3000
```

### 4. Configurar Vercel (primeira vez)
No dashboard da Vercel, adicione em **Settings → Environment Variables**:
- `KOMMO_BASE_URL`
- `KOMMO_ACCESS_TOKEN`
- `KOMMO_CLIENT_ID`
- `KOMMO_CLIENT_SECRET`

## 🔧 Scripts Disponíveis

```bash
pnpm dev                # Servidor de desenvolvimento
pnpm build              # Build para produção
pnpm start              # Servidor de produção
pnpm lint               # Linter ESLint
pnpm kommo:discover     # Listar campos custom do Kommo
pnpm kommo:pipelines    # Listar pipelines do Kommo
```

## 📁 Estrutura do Projeto

```
├── app/                    # Next.js App Router
│   ├── api/lead/          # Endpoint de captura de leads
│   ├── privacidade/       # Página de política de privacidade
│   └── page.tsx           # Landing page principal
├── components/
│   ├── landing/           # 11 seções modulares da landing
│   └── ui/                # Componentes Shadcn/ui
├── hooks/                 # Hooks customizados (animações, analytics)
├── lib/                   # Lógica core (validações, Kommo, scoring)
├── scripts/               # Scripts de setup do Kommo
└── public/images/         # Assets estáticos
```

## 🎨 Componentes da Landing

11 seções importadas em ordem:
1. **Navbar** - Navegação com scroll spy
2. **HeroHub** - Chamada principal
3. **PainSection** - Dores do público-alvo
4. **Hub360** - Solução 360°
5. **HowItWorks** - Como funciona
6. **EvidenceROI** - Provas e ROI
7. **NR1Section** - Conformidade NR-1
8. **AboutSection** - Sobre a empresa
9. **FAQ** - Perguntas frequentes
10. **LeadForm** - Formulário de captura
11. **Footer** - Rodapé com links

## 🔐 Fluxo de Captura de Leads

1. **Validação** (`lib/validations.ts`)
   - Honeypot anti-spam (campo `website`)
   - Formato WhatsApp brasileiro
   - Aceita emails pessoais (gmail, hotmail)
   - Checkbox LGPD obrigatório

2. **Lead Scoring** (`lib/lead-scoring.ts`)
   - HIGH (≥3): Cargo estratégico + empresa grande (501+)
   - MEDIUM (≥2): Cargo estratégico OU empresa média/grande
   - LOW: Demais casos

3. **Integração Kommo** (`lib/kommo.ts`)
   - Cria contato com email/telefone
   - Cria lead vinculado com campos customizados
   - Telefone formatado com +55 (Brasil)

4. **API Route** (`app/api/lead/route.ts`)
   - Orquestra pipeline completo
   - Graceful degradation (falhas do Kommo não bloqueiam UX)

## 🎭 Animações

Hooks disponíveis (`hooks/use-animations.ts`):
- `useScrollReveal` - Reveal on scroll
- `usePrefersReducedMotion` - Acessibilidade
- `useParallax` - Efeito parallax
- `useCounter` - Contador animado

5 componentes usam Framer Motion: HeroHub, Hub360, HowItWorks, EvidenceROI, FAQ

## 📊 Monitoramento

### Vercel Analytics
Integrado automaticamente via `@vercel/analytics`:
- Page views e unique visitors
- Core Web Vitals (LCP, FID, CLS)
- Acesso via Dashboard → Analytics

### Logs do Kommo
```bash
# Via Vercel CLI
vercel logs [deployment-url]

# Buscar no dashboard: Functions → /api/lead → Runtime Logs
# Procure por: "[Kommo] Lead criado com sucesso"
```

## 🛠️ Testes

### Teste Local de Lead
```bash
npx tsx scripts/test-kommo-lead.ts
```

### Checklist de Validação
- [ ] Honeypot (preencher campo `website` → sucesso fake)
- [ ] Email pessoal (gmail/hotmail → aceito)
- [ ] WhatsApp inválido → erro 400
- [ ] Integração Kommo funcionando (checar logs)
- [ ] Lead aparece no dashboard do Kommo

## 📚 Documentação Completa

- [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md) - Guia completo de deploy e otimizações
- [DOCUMENTATION.md](DOCUMENTATION.md) - Documentação técnica detalhada
- [COMPONENTS_GUIDE.md](COMPONENTS_GUIDE.md) - Guia de componentes
- [KOMMO_INTEGRATION.md](KOMMO_INTEGRATION.md) - Integração com Kommo CRM
- [QUICK_START_KOMMO.md](QUICK_START_KOMMO.md) - Setup rápido do Kommo

## 🆘 Troubleshooting

### Build Falha
```bash
rm -rf .next node_modules
pnpm install
pnpm build
```

### Kommo API Errors
1. Verificar tokens válidos (JWT expira)
2. Testar localmente: `pnpm kommo:discover`
3. Checar logs: Vercel Dashboard → Functions → /api/lead

### TypeScript Errors
Configurado `ignoreBuildErrors: true` - builds não falham por TS
Mas é recomendado corrigir: `pnpm lint`

## 📄 Licença

Propriedade de Conecta Saúde. Todos os direitos reservados.

## 🔗 Links Úteis

- **Dashboard Vercel:** [vercel.com/dashboard](https://vercel.com/dashboard)
- **Kommo CRM:** [kommobelz.kommo.com](https://kommobelz.kommo.com/)
- **Docs Next.js:** [nextjs.org/docs](https://nextjs.org/docs)
- **Docs Vercel:** [vercel.com/docs](https://vercel.com/docs)
