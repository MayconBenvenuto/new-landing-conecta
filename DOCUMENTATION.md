# 🏥 Conecta Saúde - Documentação Completa

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/mayconbenvenutos-projects/v0-conecta-saude-landing-page)
[![Built with Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

## 📋 Sobre o Projeto

Landing page profissional para **Conecta Saúde**, um HUB de Gestão de Riscos que integra Recursos Humanos, Jurídico e Saúde e Segurança do Trabalho em uma única inteligência de dados. O sistema é orientado para conformidade com a **NR-1** e focado na prevenção de riscos psicossociais.

### 🎯 Objetivo

Capturar leads qualificados de empresas interessadas em soluções de gestão integrada de riscos ocupacionais, com sistema de lead scoring automatizado e validação inteligente de formulários.

## 🚀 Tecnologias Utilizadas

### Core
- **Next.js 16.0.10** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **React 19** - Biblioteca de componentes
- **Tailwind CSS** - Framework CSS utility-first

### UI/UX
- **Radix UI** - Componentes acessíveis e não estilizados
- **Lucide React** - Ícones modernos
- **Shadcn/ui** - Sistema de componentes baseado em Radix
- **Source Serif 4 & Source Sans 3** - Tipografia do Google Fonts
- **class-variance-authority** - Gerenciamento de variantes de componentes

### Funcionalidades
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Vercel Analytics** - Análise de tráfego e conversões
- **Next Themes** - Suporte a tema dark/light

### Performance & SEO
- Otimização de imagens com next/image
- Metadados dinâmicos para SEO
- Suporte a Open Graph e Twitter Cards
- Google Fonts com display swap

## 📁 Estrutura do Projeto

```
new-landing-conecta/
├── app/
│   ├── api/
│   │   └── lead/
│   │       └── route.ts              # API endpoint para captura de leads
│   ├── privacidade/
│   │   └── page.tsx                  # Página de política de privacidade
│   ├── globals.css                   # Estilos globais
│   ├── layout.tsx                    # Layout raiz com metadados SEO
│   └── page.tsx                      # Página principal (homepage)
│
├── components/
│   ├── landing/                      # Componentes específicos da landing
│   │   ├── navbar.tsx                # Navegação com scroll spy
│   │   ├── hero-hub.tsx              # Hero section com HUB visual
│   │   ├── pain-section.tsx          # Seção de dores do cliente
│   │   ├── hub-360.tsx               # Diferenciais do sistema
│   │   ├── how-it-works.tsx          # Como funciona
│   │   ├── evidence-roi.tsx          # Evidências e ROI
│   │   ├── nr1-section.tsx           # Conformidade NR-1
│   │   ├── about-section.tsx         # Quem somos
│   │   ├── faq.tsx                   # Perguntas frequentes
│   │   ├── lead-form.tsx             # Formulário de captura de leads
│   │   ├── footer.tsx                # Rodapé
│   │   ├── authority-badges.tsx      # Selos de autoridade
│   │   └── contextual-cta.tsx        # CTAs contextuais
│   │
│   ├── ui/                           # Componentes reutilizáveis (Shadcn)
│   │   ├── accordion.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── textarea.tsx
│   │   └── toast.tsx
│   │
│   └── theme-provider.tsx            # Provider de temas
│
├── hooks/
│   ├── use-analytics.ts              # Hook para tracking de eventos
│   ├── use-scroll-spy.ts             # Hook para detecção de scroll
│   └── use-toast.ts                  # Hook para notificações
│
├── lib/
│   ├── adaptive-cta.ts               # Sistema de CTAs adaptativos
│   ├── lead-scoring.ts               # Lógica de qualificação de leads
│   ├── validations.ts                # Validações de formulários
│   └── utils.ts                      # Utilitários gerais
│
├── public/
│   └── images/                       # Imagens e assets estáticos
│
└── styles/
    └── globals.css                   # Estilos globais adicionais
```

## 🎨 Sistema de Design

### Paleta de Cores

```css
--primary: #021d79       /* Azul Conecta Saúde */
--secondary: #011147     /* Navy escuro */
--background: #f6f6f6    /* Off-white */
--foreground: #011147    /* Navy para texto */
```

### Tipografia

- **Headings**: Source Serif 4 (variável)
- **Body**: Source Sans 3 (variável)

### Componentes UI

Todos os componentes UI são baseados no Shadcn/ui e Radix UI, garantindo:
- ✅ Acessibilidade (WCAG 2.1)
- ✅ Responsividade
- ✅ Temas customizáveis
- ✅ Animações suaves

## 🧩 Funcionalidades Principais

### 1. Sistema de Lead Scoring

O sistema analisa automaticamente os leads e classifica em três níveis:

```typescript
// lib/lead-scoring.ts
- HIGH: Cargos estratégicos + Empresas grandes (500+ funcionários)
- MEDIUM: Perfis intermediários
- LOW: Perfis básicos
```

**Flags automáticas:**
- Cargo estratégico
- Empresa grande/média
- Lead estratégico

### 2. Validações Inteligentes

```typescript
// lib/validations.ts
- Validação de email (formato e domínios comuns)
- Formatação automática de telefone (WhatsApp)
- Validação de CNPJ (quando aplicável)
- Honeypot para proteção contra bots
- Validação de consentimento LGPD
```

### 3. CTAs Adaptativos

O sistema de CTAs se adapta ao perfil do usuário:

```typescript
// lib/adaptive-cta.ts
- Mensagens personalizadas por cargo
- Ajuste de urgência por tamanho de empresa
- Variações A/B testing ready
```

### 4. Analytics Integrado

```typescript
// hooks/use-analytics.ts
- Tracking de cliques em CTAs
- Rastreamento de submissões de formulário
- Integração com Vercel Analytics
- Eventos customizados por seção
```

### 5. Scroll Spy Navigation

```typescript
// hooks/use-scroll-spy.ts
- Detecção automática de seção ativa
- Navegação suave com smooth scroll
- Indicadores visuais no navbar
```

## 🔧 Instalação e Desenvolvimento

### Pré-requisitos

- Node.js 18+ ou superior
- pnpm (recomendado) ou npm

### Instalação

```bash
# Clonar o repositório
git clone <repository-url>
cd new-landing-conecta

# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev
```

O projeto estará disponível em `http://localhost:3000`

### Scripts Disponíveis

```bash
pnpm dev      # Inicia servidor de desenvolvimento
pnpm build    # Build de produção
pnpm start    # Inicia servidor de produção
pnpm lint     # Executa ESLint
```

## 📊 API Routes

### POST /api/lead

Endpoint para captura e processamento de leads.

**Request Body:**
```json
{
  "name": "João Silva",
  "company": "Empresa XYZ",
  "role": "RH",
  "email": "joao@empresa.com",
  "phone": "(11) 98765-4321",
  "employees": "501-1000",
  "message": "Mensagem opcional",
  "lgpd": true,
  "website": ""  // Honeypot field
}
```

**Response Success:**
```json
{
  "success": true,
  "message": "Lead registrado com sucesso",
  "leadId": "lead_1234567890"
}
```

**Processamento:**
1. Validação de honeypot (bot detection)
2. Validação de campos obrigatórios
3. Cálculo de lead score
4. Preparação para integração CRM
5. Log para observabilidade

## 🔐 Segurança e Privacidade

### Proteção contra Bots
- Campo honeypot invisível
- Validação server-side
- Rate limiting (via Vercel)

### LGPD Compliance
- Consentimento explícito obrigatório
- Link para política de privacidade
- Registro de timestamp de consentimento
- Página dedicada em `/privacidade`

## 🎯 SEO e Performance

### Metadados Otimizados
- Title e description customizados
- Open Graph tags
- Twitter Cards
- Keywords estratégicos: NR-1, riscos psicossociais, SST, compliance

### Performance
- Score Lighthouse: 90+
- Imagens otimizadas com next/image
- Fonts com display swap
- Code splitting automático
- CSS purge em produção

## 🚀 Deploy

O projeto está configurado para deploy automático na Vercel:

1. Push para `main` branch
2. Build automático
3. Deploy em produção
4. Analytics habilitado

**URL de Produção:** [https://vercel.com/mayconbenvenutos-projects/v0-conecta-saude-landing-page](https://vercel.com/mayconbenvenutos-projects/v0-conecta-saude-landing-page)

## 📝 Variáveis de Ambiente

```env
# Não há variáveis de ambiente obrigatórias no momento
# Para integração CRM, adicionar:
# KOMMO_API_KEY=
# RD_STATION_API_KEY=
# HUBSPOT_API_KEY=
```

## 🔄 Integrações Futuras

**CRM Ready:**
- [ ] Kommo
- [ ] RD Station
- [ ] HubSpot

**Analytics:**
- [x] Vercel Analytics
- [ ] Google Analytics 4
- [ ] Meta Pixel

**Comunicação:**
- [ ] WhatsApp API
- [ ] Email Marketing (SendGrid/Mailchimp)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é proprietário e confidencial. Todos os direitos reservados à Conecta Saúde.

## 📞 Contato

**Conecta Saúde**
- Website: conectasaude.com.br
- Email: contato@conectasaude.com.br

---

Desenvolvido com ❤️ para transformar a gestão de riscos corporativos no Brasil.
