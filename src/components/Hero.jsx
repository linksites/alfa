import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FaClock, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa'
import Button from './ui/Button'
import { MARCA, LOGO, VIDEOS } from '../lib/site'
import { staggerIn } from '../lib/animations'

/**
 * O reel mantém o enquadramento vertical em uma faixa no desktop e ocupa
 * o fundo da abertura no celular.
 */
export default function Hero() {
  const palavrasRef = useRef([])
  const reducedMotion = useReducedMotion()

  // Nome da marca em duas linhas (BARBEARIA / ALFA) para o título do hero.
  const marca = MARCA.nome.split(' ')

  // Primeiro reel serve de fundo atmosférico do hero.
  const fundo = VIDEOS[0]

  useEffect(() => {
    staggerIn(palavrasRef.current, { stagger: 0.12, y: 50, delay: 0.2 })
  }, [])

  return (
    <section
      id="topo"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-carvao"
    >
      <div className="hero-background absolute inset-0 -z-10" aria-hidden="true">
        <div className="hero-background-frame" style={{ backgroundImage: `url("${fundo.poster}")` }}>
          {reducedMotion === false && (
            <video className="h-full w-full object-cover" poster={fundo.poster} autoPlay muted loop playsInline preload="metadata">
              <source src={fundo.webm} type="video/webm" />
              <source src={fundo.mp4} type="video/mp4" />
            </video>
          )}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="mx-auto w-full max-w-7xl px-5 pb-14 pt-28 md:px-8 lg:pb-24">
        {/* Emblema da marca (no fluxo, acima do título) */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, scale: 0.92, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          className="relative mb-7 w-fit"
        >
          <div className="absolute inset-0 -z-10 scale-150 rounded-full bg-terracota/20 blur-2xl" />
          <img
            src={LOGO}
            alt=""
            className="w-24 rounded-full shadow-2xl shadow-black/50 ring-1 ring-creme/10 sm:w-28"
          />
        </motion.div>

        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-terracota">
          {MARCA.endereco}
        </p>

        <h1 className="font-display text-[clamp(2.5rem,12vw,9rem)] uppercase leading-[0.85] text-creme">
          <span className="block overflow-hidden">
            <span
              ref={(el) => (palavrasRef.current[0] = el)}
              className="inline-block"
            >
              {marca[0]}
              <span className="text-terracota">.</span>
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              ref={(el) => (palavrasRef.current[1] = el)}
              className="inline-block text-terracota"
            >
              {marca[1]}
            </span>
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-creme/80 md:text-lg">
          {MARCA.descricao}
        </p>

        <div className="mt-9">
          <Button className="text-base md:text-lg">Agendar pelo WhatsApp</Button>
        </div>

        {/* Selos de confiança */}
        <ul className="mt-8 flex flex-wrap gap-2">
          {[
            { icon: FaClock, texto: 'Seg a Sáb' },
            { icon: FaMapMarkerAlt, texto: 'Belém-PA' },
            { icon: FaWhatsapp, texto: 'Resposta rápida no WhatsApp' },
          ].map(({ icon: Icon, texto }) => (
            <li
              key={texto}
              className="flex items-center gap-2 rounded-full border border-creme/15 px-3 py-1.5 text-xs text-creme/75"
            >
              <Icon className="text-terracota" aria-hidden="true" />
              {texto}
            </li>
          ))}
        </ul>
      </div>

      {/* Indicador de scroll */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-creme/50 lg:flex">
        <span className="text-[10px] uppercase tracking-[0.3em]">Role</span>
        <span className="h-10 w-px animate-pulse bg-creme/40" />
      </div>
    </section>
  )
}
