# 📚 Guia de Componentes - Conecta Saúde

## 🧩 Componentes Landing

### 1. Navbar (`components/landing/navbar.tsx`)

Navegação fixa com efeitos de scroll e menu responsivo.

**Funcionalidades:**
- Scroll spy para destacar seção ativa
- Background glassmorphism ao fazer scroll
- Menu mobile com animações
- Navegação suave (smooth scroll)
- Tracking de analytics

**Props:** Nenhuma

**Hooks utilizados:**
- `useScrollSpy` - Detecta seção visível
- `useAnalytics` - Tracking de cliques
- `useState` - Gerenciamento de estado
- `useEffect` - Listeners de scroll

**Exemplo de uso:**
```tsx
<Navbar />
```

---

### 2. HeroHub (`components/landing/hero-hub.tsx`)

Hero section com visualização do HUB de integração e CTAs adaptativos.

**Funcionalidades:**
- Visualização interativa do HUB 360°
- CTAs adaptativos por versão
- Animação de hover nos nós
- Descrições tooltips
- Tracking de conversões

**Props:**
```typescript
{
  version?: string  // Versão da landing para A/B testing
}
```

**Dados do HUB:**
```typescript
const HUB_NODES = [
  { icon: Users, label: "RH", position: "top" },
  { icon: Scale, label: "Jurídico", position: "top-right" },
  { icon: Shield, label: "Compliance", position: "bottom-right" },
  { icon: HardHat, label: "SST", position: "bottom" },
  { icon: HeartPulse, label: "Saúde", position: "bottom-left" },
  { icon: BarChart3, label: "Gestão", position: "top-left" },
]
```

---

### 3. PainSection (`components/landing/pain-section.tsx`)

Apresenta as dores do cliente antes da solução.

**Estrutura:**
- Grid de 3 colunas (responsivo)
- Cards com ícones
- Foco em problemas reais
- Transição para solução

---

### 4. Hub360 (`components/landing/hub-360.tsx`)

Explica os diferenciais do sistema integrado.

**Funcionalidades:**
- 3 pilares principais (RH & Saúde, Jurídico & Compliance, SST & Gestão)
- Infográfico circular SVG
- Animações de hover
- Grid responsivo

**Componente interno:**
```typescript
<CircularInfographic />
// SVG animado com nós orbitando o centro
```

---

### 5. HowItWorks (`components/landing/how-it-works.tsx`)

Explica o processo passo a passo.

**Estrutura típica:**
- Timeline vertical/horizontal
- 4-5 etapas
- Ícones representativos
- Descrições claras

---

### 6. EvidenceROI (`components/landing/evidence-roi.tsx`)

Apresenta provas sociais e ROI.

**Elementos:**
- Estatísticas com números grandes
- Depoimentos de clientes
- Cases de sucesso
- Badges de autoridade

---

### 7. NR1Section (`components/landing/nr1-section.tsx`)

Destaca conformidade com NR-1.

**Conteúdo:**
- Requisitos da norma
- Como o sistema atende
- Diferencial de compliance
- Call-to-action específico

---

### 8. AboutSection (`components/landing/about-section.tsx`)

Apresenta a empresa e credibilidade.

**Elementos:**
- História da empresa
- Missão e valores
- Equipe (opcional)
- Certificações

---

### 9. FAQ (`components/landing/faq.tsx`)

Perguntas frequentes em accordion.

**Funcionalidades:**
- Accordion do Radix UI
- Animações suaves
- Busca (opcional)
- Categorização

**Estrutura de dados:**
```typescript
const faqs = [
  {
    question: "...",
    answer: "..."
  }
]
```

---

### 10. LeadForm (`components/landing/lead-form.tsx`)

Formulário de captura de leads com validações avançadas.

**Campos:**
```typescript
{
  name: string           // Nome completo
  company: string        // Empresa
  role: string          // Cargo (select)
  email: string         // Email corporativo
  phone: string         // WhatsApp formatado
  employees: string     // Faixa de funcionários
  message: string       // Mensagem opcional
  lgpd: boolean        // Consentimento
  website: string       // Honeypot (hidden)
}
```

**Validações:**
- Email com regex e blacklist de domínios
- Telefone formatado automaticamente
- LGPD obrigatório
- Honeypot para bots
- Validação real-time

**Estados:**
```typescript
const [isSubmitting, setIsSubmitting] = useState(false)
const [isSuccess, setIsSuccess] = useState(false)
const [errors, setErrors] = useState<Record<string, string>>({})
```

**Fluxo de submissão:**
1. Validação client-side
2. POST para `/api/lead`
3. Lead scoring automático
4. Feedback visual (toast)
5. Limpeza do formulário

**Timeline de processo:**
```typescript
const TIMELINE_STEPS = [
  { icon: FileText, title: "Diagnóstico" },
  { icon: BarChart3, title: "Evidências" },
  { icon: ClipboardList, title: "Plano" },
  { icon: Rocket, title: "Execução" },
]
```

---

### 11. Footer (`components/landing/footer.tsx`)

Rodapé com links e informações.

**Seções:**
- Logo e descrição
- Links de navegação
- Links legais (Privacidade, Termos)
- Redes sociais
- Copyright

---

## 🎨 Componentes UI (Shadcn)

### Button (`components/ui/button.tsx`)

Botão customizável com variantes.

**Variantes:**
```typescript
{
  variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size: "default" | "sm" | "lg" | "icon"
}
```

**Exemplo:**
```tsx
<Button variant="default" size="lg">
  Click me
</Button>

<Button asChild>
  <a href="#section">Link Button</a>
</Button>
```

---

### Input (`components/ui/input.tsx`)

Campo de entrada de texto.

**Exemplo:**
```tsx
<Input
  type="text"
  placeholder="Digite seu nome"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

---

### Textarea (`components/ui/textarea.tsx`)

Campo de texto multilinha.

**Exemplo:**
```tsx
<Textarea
  placeholder="Deixe sua mensagem"
  rows={4}
/>
```

---

### Checkbox (`components/ui/checkbox.tsx`)

Checkbox acessível do Radix UI.

**Exemplo:**
```tsx
<div className="flex items-center space-x-2">
  <Checkbox 
    id="terms" 
    checked={agreed}
    onCheckedChange={setAgreed}
  />
  <label htmlFor="terms">
    Aceito os termos
  </label>
</div>
```

---

### Card (`components/ui/card.tsx`)

Container para conteúdo com elevação.

**Componentes:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descrição</CardDescription>
  </CardHeader>
  <CardContent>
    Conteúdo principal
  </CardContent>
  <CardFooter>
    Rodapé
  </CardFooter>
</Card>
```

---

### Accordion (`components/ui/accordion.tsx`)

Accordion acessível para FAQ.

**Exemplo:**
```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Pergunta 1?</AccordionTrigger>
    <AccordionContent>
      Resposta 1
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

---

### Toast (`components/ui/toast.tsx`)

Notificações temporárias.

**Uso com hook:**
```tsx
const { toast } = useToast()

toast({
  title: "Sucesso!",
  description: "Operação concluída.",
  variant: "default" // ou "destructive"
})
```

---

## 🪝 Hooks Customizados

### useAnalytics (`hooks/use-analytics.ts`)

Hook para tracking de eventos.

**Métodos:**
```typescript
const { trackCTAClick, trackFormSubmit } = useAnalytics()

// Tracking de CTA
trackCTAClick("Nome do CTA", "seção")

// Tracking de formulário
trackFormSubmit({
  email: "user@example.com",
  role: "RH",
  employees: "501-1000"
})
```

**Integração:**
- Vercel Analytics
- Custom events
- User properties

---

### useScrollSpy (`hooks/use-scroll-spy.ts`)

Detecta qual seção está visível no viewport.

**Uso:**
```typescript
const activeSection = useScrollSpy(
  ["hero", "como-funciona", "diferenciais"],
  120  // offset em pixels
)

// Retorna: "hero" | "como-funciona" | "diferenciais" | null
```

**Lógica:**
- IntersectionObserver API
- Threshold configurável
- Debounce automático

---

### useToast (`hooks/use-toast.ts`)

Gerenciamento de notificações toast.

**API:**
```typescript
const { toast, dismiss } = useToast()

// Mostrar toast
const toastId = toast({
  title: "Título",
  description: "Descrição",
  action: <Button>Ação</Button>,
  duration: 5000
})

// Fechar toast
dismiss(toastId)
```

---

## 🛠️ Utilitários (Lib)

### adaptive-cta.ts

Sistema de CTAs adaptativos baseado em perfil.

**Função principal:**
```typescript
getAdaptiveCTA({
  role: "RH",
  employees: "501-1000"
})

// Retorna: string com CTA personalizado
```

**Lógica:**
- Diferentes mensagens por cargo
- Urgência por tamanho de empresa
- Versões A/B testing

---

### lead-scoring.ts

Qualificação automática de leads.

**Função:**
```typescript
calculateLeadScore(role: string, employees: string)

// Retorna:
{
  leadScore: "high" | "medium" | "low",
  perfil: "RH + Empresa 501-1000",
  flags: ["Cargo estratégico", "Empresa grande"]
}
```

**Critérios:**
- Cargos estratégicos: +2 pontos
- Empresas grandes (500+): +2 pontos
- Empresas médias (200-500): +1 ponto

**Classificação:**
- HIGH: score >= 3
- MEDIUM: score >= 2
- LOW: score < 2

---

### validations.ts

Validações de formulários.

**Funções:**

```typescript
// Validar formulário completo
validateLeadForm(data: LeadFormData)
// Retorna: { valid: boolean, errors: Record<string, string> }

// Formatar WhatsApp
formatWhatsApp(phone: string)
// "(11) 98765-4321"

// Validar email
validateEmail(email: string)
// true/false

// Blacklist de domínios
const DISPOSABLE_DOMAINS = ["tempmail.com", "guerrillamail.com", ...]
```

**Validações específicas:**
- Email: formato + domínios descartáveis
- Telefone: formato brasileiro
- CNPJ: dígitos verificadores
- LGPD: consentimento obrigatório

---

### utils.ts

Utilitários gerais (classNames, etc).

**Função principal:**
```typescript
cn(...classes: ClassValue[])
// Combina classes com clsx e tailwind-merge
```

**Exemplo:**
```tsx
<div className={cn(
  "base-class",
  condition && "conditional-class",
  "hover:opacity-80"
)}>
```

---

## 🎯 Padrões de Uso

### Estrutura de Componente Típica

```tsx
"use client" // Se usar hooks do React

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAnalytics } from "@/hooks/use-analytics"

interface MyComponentProps {
  title: string
  variant?: "default" | "secondary"
}

export function MyComponent({ title, variant = "default" }: MyComponentProps) {
  const [state, setState] = useState(false)
  const { trackEvent } = useAnalytics()

  const handleClick = () => {
    trackEvent("button_click")
    setState(true)
  }

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold mb-6">{title}</h2>
        <Button onClick={handleClick} variant={variant}>
          Click me
        </Button>
      </div>
    </section>
  )
}
```

### Classes Tailwind Comuns

```css
/* Container */
.container mx-auto max-w-7xl px-4 md:px-6 lg:px-8

/* Seção */
.py-20 md:py-32

/* Título */
.text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-secondary

/* Parágrafo */
.text-lg text-foreground/90 leading-relaxed

/* Grid */
.grid md:grid-cols-2 lg:grid-cols-3 gap-8

/* Card */
.p-8 rounded-xl bg-white shadow-lg border border-border/50

/* Botão hover */
.hover:shadow-xl transition-all duration-300
```

### Animações Recomendadas

```tsx
// Fade in
className="animate-in fade-in duration-500"

// Slide up
className="animate-in slide-in-from-bottom-4 duration-700"

// Hover scale
className="transition-transform hover:scale-105"

// Stagger children
<div className="space-y-4">
  {items.map((item, i) => (
    <div 
      key={i}
      style={{ animationDelay: `${i * 100}ms` }}
      className="animate-in fade-in"
    >
      {item}
    </div>
  ))}
</div>
```

---

## 📝 Checklist de Novo Componente

Ao criar um novo componente:

- [ ] Usar TypeScript com tipos explícitos
- [ ] Documentar props com interface/type
- [ ] Adicionar "use client" se usar hooks
- [ ] Implementar responsividade (mobile-first)
- [ ] Adicionar tracking de analytics (quando relevante)
- [ ] Testar acessibilidade (keyboard navigation)
- [ ] Otimizar performance (React.memo se necessário)
- [ ] Adicionar comentários em lógica complexa
- [ ] Seguir convenções de nomenclatura
- [ ] Exportar do index (se aplicável)

---

Desenvolvido com ❤️ para a equipe Conecta Saúde
