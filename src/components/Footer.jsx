import { FaWhatsapp, FaMapMarkerAlt, FaInstagram } from 'react-icons/fa'
import { MARCA, WHATSAPP_URL, LOGO, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../lib/site'

/**
 * Footer: nome, endereço, telefone e ano atual.
 */
export default function Footer() {
  const ano = new Date().getFullYear()

  return (
    <footer className="border-t border-creme/10 px-5 py-12 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={LOGO}
              alt=""
              className="h-12 w-12 shrink-0 rounded-full object-cover sm:h-14 sm:w-14"
            />
            <p className="font-display text-2xl uppercase text-creme sm:text-3xl">
              {MARCA.nome.split(' ')[0]}
              <span className="text-terracota">.</span>
              <span className="text-creme/70">{MARCA.nome.split(' ')[1]}</span>
            </p>
          </div>
          <p className="mt-3 max-w-xs text-sm text-creme/60">{MARCA.slogan}.</p>
        </div>

        <ul className="space-y-3 text-sm text-creme/70">
          <li className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-terracota" aria-hidden="true" />
            {MARCA.endereco}
          </li>
          <li>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-3 hover:text-terracota"
            >
              <FaWhatsapp className="text-terracota" aria-hidden="true" />
              {MARCA.telefone}
            </a>
          </li>
          <li>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-3 hover:text-terracota"
            >
              <FaInstagram className="text-terracota" aria-hidden="true" />
              {INSTAGRAM_HANDLE}
            </a>
          </li>
        </ul>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-creme/10 pt-6 text-center text-xs uppercase tracking-widest text-creme/60 md:flex md:justify-between md:text-left">
        <span>
          © {ano} {MARCA.nome}. Todos os direitos reservados.
        </span>
        <span className="mt-2 block md:mt-0">
          Desenvolvido por <span className="text-creme/70">TECHLAB</span>
        </span>
      </div>
    </footer>
  )
}
