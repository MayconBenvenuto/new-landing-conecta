# Guia de Deploy na Vercel - Conecta Saúde

## 🚀 Status do Deploy

**Projeto ativo:** [v0-conecta-saude-landing-page](https://vercel.com/mayconbenvenutos-projects/v0-conecta-saude-landing-page)

## 📋 Configuração de Variáveis de Ambiente

### No Dashboard da Vercel

1. Acesse: **Settings → Environment Variables**
2. Adicione as seguintes variáveis:

```env
KOMMO_BASE_URL=https://kommobelz.kommo.com/
KOMMO_ACCESS_TOKEN=seu_jwt_token
KOMMO_CLIENT_ID=seu_uuid
KOMMO_CLIENT_SECRET=seu_secret
```

### Ambientes Recomendados

- **Production**: Todas as variáveis acima (dados reais)
- **Preview**: Mesmas variáveis (ou ambiente de teste se disponível)
- **Development**: Use `.env.local` (nunca commitar no git)

## 🔧 Otimizações Aplicadas

### 1. Headers de Segurança (vercel.json)
- `X-Content-Type-Options: nosniff` - Previne MIME sniffing
- `X-Frame-Options: DENY` - Previne clickjacking
- `X-XSS-Protection` - Proteção contra XSS
- `Referrer-Policy` - Controle de referrer
- `Permissions-Policy` - Restringe APIs do browser

### 2. Cache Strategy
- **API Routes**: `s-maxage=0` (sem cache estático)
- **Static Assets**: Cache automático do Next.js (/_next/static/)
- **Images**: Otimização via Vercel Image Optimization (removi `unoptimized: true`)

### 3. Build Configuration
```json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nextjs"
}
```

### 4. Analytics
O projeto já usa `@vercel/analytics` (package.json):
- Configurado automaticamente no deploy
- Zero configuração necessária
- Métricas disponíveis no dashboard

## 📊 Monitoramento

### Vercel Analytics (Automático)
- **Acessar**: Dashboard → Analytics
- **Métricas**: Page views, unique visitors, top pages
- **Web Vitals**: LCP, FID, CLS (Core Web Vitals)

### Logs de Runtime
```bash
# Via Vercel CLI
vercel logs [deployment-url]

# Ou no dashboard: Deployments → [Deployment] → Runtime Logs
```

### Kommo Integration Logs
- Logs visíveis em: **Functions → /api/lead**
- Busque por: `[Kommo] Lead criado com sucesso` ou erros
- Graceful degradation: falhas não bloqueiam o usuário

## 🔄 Workflow de Deploy

### Deploy Automático (Git Push)
```bash
git add .
git commit -m "feat: nova feature"
git push origin main
```
→ Vercel detecta e deploya automaticamente

### Deploy Manual (Vercel CLI)
```bash
# Instalar CLI
pnpm add -g vercel

# Deploy para preview
vercel

# Deploy para production
vercel --prod
```

### Preview Deploys
- **Cada branch** = URL de preview único
- **Cada PR** = Deploy comment com link
- Ideal para testar antes de mergear

## 🎯 Checklist Pré-Deploy

- [ ] Variáveis de ambiente configuradas (Kommo credentials)
- [ ] Build local passa: `pnpm build`
- [ ] Lint passa: `pnpm lint`
- [ ] Teste de lead funciona (scripts/test-kommo-lead.ts)
- [ ] `.env.local` NÃO está no git (já no .gitignore)
- [ ] Honeypot testado (campo `website`)
- [ ] Validação de email aceita emails pessoais (gmail, hotmail)

## ⚡ Performance Tips

### Já Implementado
- Next.js 16 (App Router) - SSG automático
- Framer Motion code-splitting
- Radix UI tree-shaking
- Tailwind CSS purging
- Vercel Analytics (zero overhead)

### Image Optimization
**Atualizado**: Removido `unoptimized: true` do next.config.mjs
- Vercel otimiza automaticamente todas as imagens
- Suporta WebP/AVIF
- Lazy loading built-in
- Responsive images via `next/image`

### Font Optimization
```tsx
// Já configurado no layout.tsx
import { Source_Serif_4, Source_Sans_3 } from 'next/font/google'
```
- Fonts auto-otimizados (subset, preload)
- Zero layout shift (size-adjust automático)

## 🛠️ Troubleshooting

### Build Falha
```bash
# Limpar cache e rebuildar
pnpm clean  # Se houver script
rm -rf .next node_modules
pnpm install
pnpm build
```

### Variáveis de Ambiente Não Funcionam
1. Verifique se estão no ambiente correto (Production/Preview)
2. Prefixe com `NEXT_PUBLIC_` se for client-side (NÃO para secrets!)
3. Redeploy após adicionar novas vars

### Kommo API Errors
- Verifique logs em: Functions → /api/lead → Runtime Logs
- Confirme tokens válidos (JWT expira)
- Teste localmente: `pnpm kommo:discover`

### TypeScript Errors no Build
**Configurado**: `typescript.ignoreBuildErrors: true` no next.config.mjs
- Build não falha por erros de TS
- **Recomendação**: Corrigir erros localmente com `pnpm lint`

## 📚 Recursos

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying)
- [Vercel Analytics](https://vercel.com/docs/analytics)
- [Environment Variables](https://vercel.com/docs/projects/environment-variables)

## 🆘 Suporte

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)
- **Status Page**: [vercel-status.com](https://www.vercel-status.com/)
