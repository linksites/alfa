import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaXmark, FaChevronLeft, FaChevronRight, FaVolumeHigh, FaVolumeXmark } from 'react-icons/fa6'

/**
 * Lightbox de vídeos estilo Stories.
 *
 * - Barra de progresso no topo (uma por clipe); a atual preenche conforme o
 *   tempo do vídeo e avança sozinha ao terminar (faz a volta no último).
 * - Navegação: setas na tela, teclado (←/→/Esc) e swipe horizontal no mobile.
 * - Som ligado por padrão (a abertura é um gesto do usuário); se o navegador
 *   bloquear o autoplay com áudio, cai para mudo e continua tocando.
 * - Trava o scroll do fundo e fecha ao clicar fora do vídeo.
 */
export default function VideoLightbox({ videos, index, onClose, onIndexChange }) {
  const open = index !== null
  const videoRef = useRef(null)
  const closeRef = useRef(null)
  const dialogRef = useRef(null)
  const touchX = useRef(null)
  const [muted, setMuted] = useState(false)
  const [progress, setProgress] = useState(0)

  const go = useCallback(
    (dir) => {
      if (index === null) return
      const next = (index + dir + videos.length) % videos.length
      setProgress(0)
      onIndexChange(next)
    },
    [index, videos.length, onIndexChange],
  )

  // Teclado
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'Tab') {
        const buttons = dialogRef.current?.querySelectorAll('button')
        const edge = e.shiftKey ? buttons?.[0] : buttons?.[buttons.length - 1]
        if (edge === document.activeElement) {
          e.preventDefault()
          const next = e.shiftKey ? buttons[buttons.length - 1] : buttons[0]
          next.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, go, onClose])

  // Trava o scroll do fundo enquanto aberto
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    const trigger = document.activeElement
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prev
      trigger?.focus({ preventScroll: true })
    }
  }, [open])

  // Carrega e toca o clipe atual (com fallback para mudo)
  useEffect(() => {
    const el = videoRef.current
    if (!el || index === null) return
    let active = true
    el.play().catch(() => {
      if (!active) return
      el.muted = true
      setMuted(true)
      el.play().catch(() => {})
    })
    return () => {
      active = false
    }
  }, [index])

  function toggleSound() {
    const el = videoRef.current
    if (!el) return
    el.muted = !el.muted
    setMuted(el.muted)
  }

  if (!open) return null
  const video = videos[index]

  return (
    <AnimatePresence>
      <motion.div
        ref={dialogRef}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-carvao/95 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Vídeo: ${video.titulo}`}
      >
        <div
          className="relative flex h-full max-h-[90svh] w-full max-w-[min(92vw,480px)] flex-col"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return
            const dx = e.changedTouches[0].clientX - touchX.current
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
            touchX.current = null
          }}
        >
          {/* Barras de progresso */}
          <div className="mb-3 flex gap-1.5">
            {videos.map((_, i) => (
              <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-creme/20">
                <div
                  className="h-full rounded-full bg-creme"
                  style={{
                    width: i < index ? '100%' : i === index ? `${progress}%` : '0%',
                    transition: i === index ? 'width 0.1s linear' : 'none',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Vídeo */}
          <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-black">
            <video
              ref={videoRef}
              key={video.mp4}
              autoPlay
              muted={muted}
              playsInline
              poster={video.poster}
              onTimeUpdate={(e) => {
                const v = e.currentTarget
                if (v.duration) setProgress((v.currentTime / v.duration) * 100)
              }}
              onEnded={() => go(1)}
              className="h-full w-full object-contain"
            >
              <source src={video.webm} type="video/webm" />
              <source src={video.mp4} type="video/mp4" />
            </video>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
              <p className="font-display text-2xl uppercase text-creme">{video.titulo}</p>
            </div>
          </div>

          {/* Controles */}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="absolute right-3 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-carvao/75 text-creme transition hover:bg-carvao"
          >
            <FaXmark />
          </button>

          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? 'Ativar som' : 'Desativar som'}
            className="absolute right-[3.875rem] top-6 flex h-11 w-11 items-center justify-center rounded-full bg-carvao/75 text-creme backdrop-blur transition hover:bg-carvao"
          >
            {muted ? <FaVolumeXmark /> : <FaVolumeHigh />}
          </button>

          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Vídeo anterior"
            className="absolute -left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-creme/10 text-creme transition hover:bg-creme/20 md:-left-14"
          >
            <FaChevronLeft />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Próximo vídeo"
            className="absolute -right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-creme/10 text-creme transition hover:bg-creme/20 md:-right-14"
          >
            <FaChevronRight />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
