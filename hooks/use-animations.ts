import { useEffect, useRef, useState } from "react"

/**
 * Hook para revelar elementos quando entram no viewport
 * @param threshold - Porcentagem do elemento que precisa estar visível (0-1)
 * @param triggerOnce - Se true, a animação só acontece uma vez
 */
export function useScrollReveal(threshold = 0.1, triggerOnce = true) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            observer.disconnect()
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold, triggerOnce])

  return [ref, isVisible] as const
}

/**
 * Hook para detectar se o usuário prefere movimento reduzido
 */
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handler)

    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  return prefersReducedMotion
}

/**
 * Hook para parallax simples baseado em scroll
 * @param speed - Velocidade do parallax (0.1 = lento, 1 = normal, 2 = rápido)
 */
export function useParallax(speed = 0.5) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset * speed)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return offset
}

/**
 * Hook para counter animation
 * @param end - Valor final do contador
 * @param duration - Duração da animação em ms
 * @param start - Valor inicial do contador
 */
export function useCounter(end: number, duration = 2000, start = 0) {
  const [count, setCount] = useState(start)

  useEffect(() => {
    let startTimestamp: number | null = null
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)

      const easeOutQuad = (t: number) => t * (2 - t)
      const currentCount = Math.floor(start + (end - start) * easeOutQuad(progress))

      setCount(currentCount)

      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }

    window.requestAnimationFrame(step)
  }, [end, duration, start])

  return count
}
