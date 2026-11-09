import { FaRegGem, FaCouch, FaUserTie } from 'react-icons/fa'

const ITENS = [
  {
    icon: FaRegGem,
    titulo: 'Atendimento Padrão Alfa',
    texto: 'Cada cliente tratado como prioridade, do café à navalha.',
  },
  {
    icon: FaCouch,
    titulo: 'Ambiente Moderno',
    texto: 'Espaço pensado para você relaxar e sair renovado.',
  },
  {
    icon: FaUserTie,
    titulo: 'Profissionais de Elite',
    texto: 'Barbeiros experientes, técnica afiada e olhar para o detalhe.',
  },
]

// Faixa em movimento (marquee) — reforça o tom urbano antes dos cards.
const FAIXA = [
  'ESTILO',
  'ATITUDE',
  'EXPERIÊNCIA',
  'PRECISÃO',
  'CONFIANÇA',
  'PADRÃO ALFA',
]

/**
 * Diferenciais: marquee em movimento contínuo + três cards que revelam
 * ao entrar na tela.
 */
export default function Diferenciais() {
  return (
    <section className="relative border-y border-creme/10 py-20 md:py-28">
      {/* Marquee — letreiro em rolagem contínua, com as palavras surgindo e
          sumindo suavemente nas bordas (máscara em gradiente). Decorativo:
          aria-hidden para não poluir leitores de tela. */}
      <div
        aria-hidden="true"
        className="relative mb-16 flex overflow-hidden select-none"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)',
        }}
      >
        <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
          {[...FAIXA, ...FAIXA].map((t, i) => (
            <span
              key={i}
              className="font-display text-4xl uppercase text-creme/55 md:text-6xl"
            >
              {t}
              <span className="mx-8 text-terracota">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-3 md:px-8">
        {ITENS.map(({ icon: Icon, titulo, texto }) => (
          <div
            key={titulo}
            className="group rounded-2xl border border-creme/10 bg-creme/[0.02] p-8 transition-colors hover:border-terracota/50"
          >
            <Icon
              className="mb-5 text-3xl text-terracota transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            />
            <h3 className="font-display text-2xl uppercase text-creme">
              {titulo}
            </h3>
            <p className="mt-3 text-creme/70">{texto}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
