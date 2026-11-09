import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Helper: respeita a preferência de movimento reduzido.
const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Reveal com máscara (clip-path) — o elemento surge sendo "desvendado"
 * de baixo para cima, em vez de um simples fade.
 */
export function revealMask(el, { delay = 0, y = 40 } = {}) {
  if (!el) return
  if (reducedMotion()) {
    gsap.set(el, { clipPath: 'inset(0% 0% 0% 0%)', y: 0, opacity: 1 })
    return
  }
  gsap.fromTo(
    el,
    {
      clipPath: 'inset(0% 0% 100% 0%)',
      y,
      opacity: 0,
    },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      y: 0,
      opacity: 1,
      duration: 1.1,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      },
    },
  )
}

/**
 * Stagger de filhos — usado no slogan do Hero (palavras entrando em sequência)
 * e em listas de cards.
 */
export function staggerIn(targets, { stagger = 0.12, y = 30, delay = 0 } = {}) {
  if (!targets) return
  if (reducedMotion()) {
    gsap.set(targets, { y: 0, opacity: 1 })
    return
  }
  gsap.fromTo(
    targets,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: 'power3.out',
      stagger,
      delay,
    },
  )
}
