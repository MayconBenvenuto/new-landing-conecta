# 🎬 Plano de Animações Profissionais - Conecta Saúde

## 🎯 Objetivo

Implementar animações elegantes e profissionais que:
- ✨ Melhorem a experiência do usuário
- 🎨 Destaquem elementos importantes
- 📱 Sejam performáticas e responsivas
- ♿ Respeitem preferências de acessibilidade (prefers-reduced-motion)
- 🏢 Mantenham o tom profissional e corporativo

## 🎨 Filosofia de Animação

**Princípios:**
1. **Sutileza** - Animações devem guiar, não distrair
2. **Performance** - Usar apenas propriedades performáticas (transform, opacity)
3. **Significado** - Cada animação deve ter um propósito
4. **Consistência** - Timing e easing curves padronizados

**Timing Base:**
- Micro-interações: 150-200ms
- Transições de estado: 300-400ms
- Animações de entrada: 500-700ms
- Animações complexas: 800-1200ms

**Easing Curves:**
- `ease-out`: Entrada de elementos (cubic-bezier(0, 0, 0.2, 1))
- `ease-in-out`: Transições suaves (cubic-bezier(0.4, 0, 0.2, 1))
- `ease-in`: Saída de elementos (cubic-bezier(0.4, 0, 1, 1))

---

## 📋 Animações Propostas por Componente

### 1. Navbar
**Efeitos:**
- ✅ Fade in + slide down ao carregar (já implementado parcialmente)
- ➕ Logo bounce sutil ao hover
- ➕ Indicador de seção ativa com transição suave
- ➕ Menu mobile com animação stagger
- ➕ Background blur gradual ao fazer scroll

**Código sugerido:**
```tsx
// Logo hover
className="transition-transform hover:scale-105 duration-300"

// Indicador ativo
className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full 
           animate-in slide-in-from-left duration-300"

// Menu mobile items (stagger)
items.map((item, i) => (
  <div
    key={i}
    className="animate-in slide-in-from-right"
    style={{ animationDelay: `${i * 50}ms` }}
  >
    {item}
  </div>
))
```

---

### 2. Hero Section (HeroHub)
**Efeitos:**
- ➕ Título com fade in + slide up
- ➕ HUB central com pulse suave (heartbeat)
- ➕ Nós do HUB orbitam suavemente
- ➕ Linhas de conexão animadas (draw effect)
- ➕ CTAs com hover lift + shadow
- ➕ Parallax suave no background

**Animações específicas:**

**HUB Central Pulse:**
```css
@keyframes hub-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.9; }
}
```

**Nós Orbitando:**
```css
@keyframes orbit-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
```

**Linhas Conectando (SVG):**
```tsx
<line
  stroke="url(#gradient)"
  strokeDasharray="200"
  className="animate-draw"
/>

// CSS
@keyframes draw {
  to { stroke-dashoffset: 0; }
}
```

---

### 3. Pain Section
**Efeitos:**
- ➕ Cards com fade in sequencial (stagger)
- ➕ Ícones com scale bounce ao aparecer
- ➕ Hover: lift + shadow expansion
- ➕ Background gradient shift ao hover

**Implementação:**
```tsx
{pains.map((pain, i) => (
  <Card
    key={i}
    className="animate-in fade-in slide-in-from-bottom-4 
               hover:-translate-y-2 hover:shadow-xl
               transition-all duration-300"
    style={{ animationDelay: `${i * 150}ms` }}
  >
    <div className="animate-in zoom-in delay-300">
      <pain.icon />
    </div>
  </Card>
))}
```

---

### 4. Hub360 Section
**Efeitos:**
- ➕ Infográfico circular com reveal animation
- ➕ Nós aparecem um por um (sequencial)
- ➕ Linhas desenham de dentro para fora
- ➕ Pillars cards com parallax scroll
- ➕ Logo central rotaciona suavemente

**SVG Animação:**
```tsx
<svg className="animate-in fade-in duration-1000">
  {nodes.map((node, i) => (
    <g
      key={i}
      className="animate-in zoom-in"
      style={{ 
        animationDelay: `${500 + i * 200}ms`,
        transformOrigin: `${centerX}px ${centerY}px`
      }}
    >
      <circle />
      <text />
    </g>
  ))}
</svg>
```

---

### 5. How It Works
**Efeitos:**
- ➕ Steps aparecem com slide lateral
- ➕ Números com counter animation (0 → 01)
- ➕ Linhas conectoras desenham progressivamente
- ➕ Ícones com rotate + scale ao aparecer
- ➕ Cards se elevam ao hover

**Counter Animation:**
```tsx
const AnimatedCounter = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const duration = 1000
    const steps = 20
    const increment = target / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [target])
  
  return <span>{String(count).padStart(2, '0')}</span>
}
```

---

### 6. Evidence ROI (Dashboard Mock)
**Efeitos:**
- ➕ Dashboard aparece com slide from right
- ➕ KPI números com counter animation
- ➕ Gráfico desenha progressivamente
- ➕ Cards pulsam sutilmente
- ➕ Badges com shimmer effect

**Gráfico Animado:**
```css
@keyframes draw-path {
  from {
    stroke-dashoffset: 1000;
  }
  to {
    stroke-dashoffset: 0;
  }
}

polyline {
  stroke-dasharray: 1000;
  animation: draw-path 2s ease-out forwards;
  animation-delay: 500ms;
}
```

**Shimmer Effect:**
```css
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}

.shimmer {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255,255,255,0.3),
    transparent
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}
```

---

### 7. NR1 Section
**Efeitos:**
- ➕ Badge oficial com glow pulse
- ➕ Checklist items aparecem progressivamente
- ➕ Checkmarks animados (draw + scale)
- ➕ Background pattern sutil

**Animated Checkmark:**
```tsx
<svg className="checkmark">
  <path
    d="M5 13 L9 17 L19 7"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    className="checkmark-path"
  />
</svg>

<style>
.checkmark-path {
  stroke-dasharray: 50;
  stroke-dashoffset: 50;
  animation: draw-check 600ms ease-out forwards;
}

@keyframes draw-check {
  to { stroke-dashoffset: 0; }
}
</style>
```

---

### 8. FAQ
**Efeitos:**
- ➕ Items aparecem com stagger
- ➕ Expansão suave (já tem com Radix)
- ➕ Ícone + rotaciona suavemente
- ➕ Highlight ao abrir
- ➕ Scroll automático para item aberto

**Melhorias:**
```tsx
<AccordionItem
  className="animate-in fade-in slide-in-from-bottom-2
             transition-all duration-300
             data-[state=open]:bg-primary/5
             data-[state=open]:shadow-lg
             data-[state=open]:scale-[1.02]"
  style={{ animationDelay: `${index * 100}ms` }}
>
  <AccordionTrigger className="group">
    <ChevronDown className="
      transition-transform duration-300
      group-data-[state=open]:rotate-180
    " />
  </AccordionTrigger>
</AccordionItem>
```

---

### 9. Lead Form
**Efeitos:**
- ➕ Form aparece com fade in
- ➕ Campos com focus ring animado
- ➕ Labels flutuam ao focar (floating labels)
- ➕ Validação com shake em erro
- ➕ Success com confetti/check animado
- ➕ Loading com skeleton shimmer
- ➕ Timeline steps progressivos

**Shake on Error:**
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
}

.error-shake {
  animation: shake 400ms ease-in-out;
}
```

**Success Animation:**
```tsx
const SuccessCheck = () => (
  <div className="relative">
    <div className="
      w-20 h-20 rounded-full bg-green-500
      animate-in zoom-in duration-300
    ">
      <svg className="w-12 h-12 text-white">
        <path
          d="M5 13 L9 17 L19 7"
          className="animate-draw-check"
        />
      </svg>
    </div>
    <div className="
      absolute inset-0 rounded-full bg-green-500/20
      animate-ping
    " />
  </div>
)
```

---

### 10. Footer
**Efeitos:**
- ➕ Links com underline slide on hover
- ➕ Social icons com bounce ao hover
- ➕ Newsletter form com subtle glow
- ➕ Scroll to top button com fade + slide

**Underline Animation:**
```css
.link-hover {
  position: relative;
}

.link-hover::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: currentColor;
  transition: width 300ms ease-out;
}

.link-hover:hover::after {
  width: 100%;
}
```

---

## 🎨 Animações Globais

### Scroll Reveal
```tsx
// Hook customizado
const useScrollReveal = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    
    if (ref.current) {
      observer.observe(ref.current)
    }
    
    return () => observer.disconnect()
  }, [threshold])
  
  return [ref, isVisible] as const
}

// Uso
const [ref, isVisible] = useScrollReveal()

<div ref={ref} className={cn(
  "transition-all duration-700",
  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
)}>
  {content}
</div>
```

### Parallax Background
```tsx
const useParallax = () => {
  const [offset, setOffset] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return offset
}

// Uso
const offset = useParallax()

<div style={{ transform: `translateY(${offset * 0.3}px)` }}>
  {backgroundElement}
</div>
```

### Floating Elements
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.floating {
  animation: float 6s ease-in-out infinite;
}

.floating-delay-1 { animation-delay: 1s; }
.floating-delay-2 { animation-delay: 2s; }
```

---

## 🎭 Micro-interações

### Button Ripple Effect
```tsx
const RippleButton = ({ children, ...props }) => {
  const [ripples, setRipples] = useState([])
  
  const addRipple = (e) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newRipple = { x, y, id: Date.now() }
    setRipples([...ripples, newRipple])
    
    setTimeout(() => {
      setRipples(r => r.filter(rip => rip.id !== newRipple.id))
    }, 600)
  }
  
  return (
    <button {...props} onClick={addRipple} className="relative overflow-hidden">
      {children}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
          }}
        />
      ))}
    </button>
  )
}
```

### Magnetic Button
```tsx
const MagneticButton = ({ children }) => {
  const buttonRef = useRef(null)
  
  const handleMouseMove = (e) => {
    const button = buttonRef.current
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
  }
  
  const handleMouseLeave = () => {
    buttonRef.current.style.transform = 'translate(0, 0)'
  }
  
  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="transition-transform duration-300"
    >
      {children}
    </button>
  )
}
```

---

## ♿ Acessibilidade

**Respeitar preferências do usuário:**

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Hook para detectar:**
```tsx
const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handler = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handler)
    
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])
  
  return prefersReducedMotion
}
```

---

## 📦 Bibliotecas Recomendadas

### Framer Motion (Recomendado)
```bash
pnpm add framer-motion
```

**Vantagens:**
- Animações declarativas
- Variants system
- Layout animations
- Gesture support
- Excelente performance

**Exemplo:**
```tsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {content}
</motion.div>
```

### React Spring (Alternativa)
Para animações baseadas em física.

### GSAP (Para animações complexas)
Para timelines complexas e animações SVG avançadas.

---

## 🚀 Implementação Prioritária

### Fase 1 (Impacto Alto, Esforço Baixo)
1. ✅ Scroll reveal nos cards principais
2. ✅ Hover effects consistentes
3. ✅ Fade in de seções
4. ✅ Button micro-interactions

### Fase 2 (Impacto Alto, Esforço Médio)
5. ⏳ HUB central animado
6. ⏳ Counter animations nos números
7. ⏳ Stagger animations em listas
8. ⏳ Form validations animadas

### Fase 3 (Polimento)
9. ⬜ Parallax backgrounds
10. ⬜ Magnetic buttons
11. ⬜ SVG path animations
12. ⬜ Confetti effects

---

## 📊 Checklist de Performance

- [ ] Usar `transform` e `opacity` (GPU accelerated)
- [ ] Evitar animação de `width`, `height`, `top`, `left`
- [ ] Usar `will-change` com cautela
- [ ] Implementar IntersectionObserver para lazy animations
- [ ] Testar em dispositivos móveis
- [ ] Verificar frame rate (60fps mínimo)
- [ ] Implementar `prefers-reduced-motion`
- [ ] Lazy load animações pesadas

---

**Próximo passo:** Implementação das animações nos componentes existentes! 🚀
