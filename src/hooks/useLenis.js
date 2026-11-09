import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Inicializa a rolagem suave global (Lenis) e a sincroniza com o
 * ScrollTrigger do GSAP, para que as animações ligadas ao scroll
 * fiquem perfeitamente acompanhadas com a rolagem "amanteigada".
 *
 * Respeita prefers-reduced-motion: se o usuário pedir menos movimento,
 * o Lenis nem é inicializado (rolagem nativa do navegador).
 */
export function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Mantém o ScrollTrigger em sincronia com o Lenis.
    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(tick)
    }
  }, [])
}
