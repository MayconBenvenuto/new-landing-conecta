# ✅ Checklist de Deploy - Vercel

## 📦 Status Atual

✅ **Projeto configurado e pronto para deploy**

### Arquivos de Configuração
- ✅ `vercel.json` - Configurado com headers de segurança e cache
- ✅ `next.config.mjs` - Otimizado para produção
- ✅ `.gitignore` - Proteção de credenciais (.env.local)
- ✅ `.env.example` - Template de variáveis
- ✅ `package.json` - Scripts de build configurados
- ✅ Zero erros no código

## 🚀 Passos para Deploy

### 1. Configurar Variáveis de Ambiente na Vercel

**IMPORTANTE:** Configure antes do primeiro deploy

1. Acesse: https://vercel.com/mayconbenvenutos-projects/v0-conecta-saude-landing-page
2. Vá em **Settings → Environment Variables**
3. Adicione as seguintes variáveis:

```env
KOMMO_BASE_URL=https://kommobelz.kommo.com/
KOMMO_ACCESS_TOKEN=seu_jwt_token
KOMMO_CLIENT_ID=seu_uuid
KOMMO_CLIENT_SECRET=seu_secret
```

4. Aplique para os ambientes:
   - ✅ Production
   - ✅ Preview
   - ⚠️ Development (opcional - use .env.local localmente)

### 2. Deploy via Git (Recomendado)

```bash
# Certifique-se de que está na branch main
git branch

# Adicione e commite suas mudanças
git add .
git commit -m "chore: preparar para deploy vercel"

# Faça push para o repositório
git push origin main
```

→ Vercel detecta automaticamente e inicia o build

### 3. Deploy via Vercel CLI (Alternativa)

```bash
# Instalar CLI globalmente (se não tiver)
npm install -g vercel

# Login na Vercel
vercel login

# Deploy para preview
vercel

# Deploy para production
vercel --prod
```

## 🔍 Validação Pós-Deploy

### Testes Essenciais

1. **Página inicial carrega** ✓
   - Acesse: https://seu-dominio.vercel.app
   - Verifique: Animações, imagens, seções

2. **Formulário de leads funciona** ✓
   ```bash
   # Teste manual:
   # 1. Preencha o formulário
   # 2. Envie os dados
   # 3. Verifique no Kommo se o lead foi criado
   ```

3. **API Route está ativa** ✓
   - Endpoint: https://seu-dominio.vercel.app/api/lead
   - Método: POST
   - Status esperado: 200 (sucesso) ou 400 (erro de validação)

4. **Logs do Kommo** ✓
   - Vercel Dashboard → Functions → `/api/lead` → Runtime Logs
   - Busque: `[Kommo] Lead criado com sucesso`

5. **Headers de segurança** ✓
   ```bash
   # Testar com curl ou browser DevTools
   curl -I https://seu-dominio.vercel.app
   ```
   - X-Content-Type-Options: nosniff
   - X-Frame-Options: DENY
   - X-XSS-Protection: 1; mode=block

### Vercel Analytics

- Acesse: Dashboard → Analytics
- Métricas disponíveis após primeiras visitas:
  - Page views, unique visitors
  - Core Web Vitals (LCP, FID, CLS)
  - Top pages, referrers

## 🎯 Otimizações Ativas

### Performance
- ✅ Imagens otimizadas (AVIF/WebP)
- ✅ Compressão gzip/brotli automática
- ✅ Static assets com cache agressivo
- ✅ API routes com cache dinâmico

### Segurança
- ✅ Headers de segurança (CORS, XSS, Clickjacking)
- ✅ Variáveis de ambiente protegidas
- ✅ HTTPS forçado (Vercel default)
- ✅ Honeypot anti-bot no formulário

### SEO
- ✅ Meta tags configuradas (layout.tsx)
- ✅ Sitemap gerado automaticamente
- ✅ URLs semânticas (/privacidade)

## 🐛 Troubleshooting

### Build falha

```bash
# Teste localmente primeiro
pnpm build

# Verifique errors no terminal
pnpm lint
```

### API não funciona

1. Verifique variáveis de ambiente na Vercel
2. Confira logs: Dashboard → Functions → `/api/lead`
3. Teste localmente com `.env.local` configurado

### Imagens não carregam

- Verifique `remotePatterns` em [next.config.mjs](next.config.mjs#L7-L12)
- Adicione novos domínios se necessário

### Performance ruim

- Acesse: Vercel Dashboard → Analytics → Web Vitals
- Identifique problemas: LCP > 2.5s, CLS > 0.1
- Otimize imagens grandes ou animações pesadas

## 📚 Recursos

- **Documentação Vercel:** https://vercel.com/docs
- **Next.js Deploy:** https://nextjs.org/docs/app/building-your-application/deploying
- **Kommo API:** https://www.amocrm.com/developers/
- **Docs do projeto:** [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md), [KOMMO_INTEGRATION.md](KOMMO_INTEGRATION.md)

## ⚡ Comandos Úteis

```bash
# Ver logs de produção
vercel logs [deployment-url]

# Listar deployments
vercel ls

# Remover deployment
vercel rm [deployment-url]

# Abrir dashboard
vercel open

# Testar lead localmente
pnpm kommo:discover
npx tsx scripts/test-kommo-lead.ts
```

## 🎉 Pronto!

Seu projeto está configurado para deploy na Vercel. Basta fazer push para o Git ou usar `vercel --prod`.

**Próximos passos:**
1. Configure as variáveis de ambiente na Vercel
2. Faça o deploy (git push ou vercel CLI)
3. Teste o formulário de leads
4. Monitore analytics e logs

---

**Última atualização:** 6 de janeiro de 2026
**Status:** ✅ Pronto para produção
