import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineMapPin } from 'react-icons/hi2';
import { FaLinkedin, FaInstagram, FaFacebookF } from 'react-icons/fa6';
import { Container } from './Container';
import { CONTATO } from '@/lib/contato';

const footerLinks = {
  navegacao: [
    { label: 'Sobre a Lipid', href: '/sobre' },
    { label: 'Tecnologias', href: '/tecnologias' },
    { label: 'Segmentos', href: '/segmentos' },
    { label: 'Ingredientes', href: '/ingredientes' },
    { label: 'Conteúdo', href: '/blog' },
    { label: 'Parceiros', href: '/parceiros' },
    { label: 'Contato', href: '/contato' },
  ],
};

export function Footer() {
  return (
    <>
      <footer className="border-t border-gray-100 bg-white">
        <Container className="py-14 md:py-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div>
              <Image src="/logo/lipid-horizontal.png" alt="LIPID Ingredients" width={150} height={45} />
              <p className="mt-4 max-w-xs text-sm text-gray-600">
                Ciência, tecnologia e ingredientes de alta performance para transformar formulações em
                resultados.
              </p>
              <div className="mt-4 flex items-center gap-2">
                {[
                  { href: CONTATO.redes.linkedin, rotulo: 'LinkedIn', Icone: FaLinkedin },
                  { href: CONTATO.redes.instagram, rotulo: 'Instagram', Icone: FaInstagram },
                  { href: CONTATO.redes.facebook, rotulo: 'Facebook', Icone: FaFacebookF },
                ].map(({ href, rotulo, Icone }) => (
                  <a
                    key={rotulo}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-300 hover:text-primary-600"
                    aria-label={rotulo}
                  >
                    <Icone className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-4">Navegação</h4>
              <ul className="space-y-2.5">
                {footerLinks.navegacao.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-gray-600 hover:text-primary-600">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-4">
                Entre em contato
              </h4>
              <div className="space-y-2.5">
                <a
                  href={`mailto:${CONTATO.email}`}
                  className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-primary-600"
                >
                  <HiOutlineEnvelope className="h-4 w-4 flex-shrink-0" />
                  {CONTATO.email}
                </a>
                <a
                  href={`tel:${CONTATO.telefoneLink}`}
                  className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-primary-600"
                >
                  <HiOutlinePhone className="h-4 w-4 flex-shrink-0" />
                  {CONTATO.telefone}
                </a>
                <p className="flex items-start gap-2 text-sm text-gray-600">
                  <HiOutlineMapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>
                    {CONTATO.endereco.logradouro}
                    <br />
                    {CONTATO.endereco.complemento}
                    <br />
                    {CONTATO.endereco.bairro} · {CONTATO.endereco.cidade}/{CONTATO.endereco.estado}
                    <br />
                    CEP {CONTATO.endereco.cep}
                  </span>
                </p>
              </div>
              <Link
                href="/contato"
                className="mt-4 inline-block text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
              >
                Fale com um especialista →
              </Link>
            </div>
          </div>
        </Container>
      </footer>

      <div className="bg-primary-950 text-white">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/70 md:flex-row">
          <p>© {new Date().getFullYear()} LIPID Ingredients. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <span>Política de Privacidade</span>
          </div>
        </Container>

        <div className="border-t border-white/10 py-4">
          <Container className="flex items-center justify-center">
            <span className="flex items-center gap-2 text-xs font-light tracking-wide text-white/70">
              Powered by
              <Image
                src="/icons/whale-daksa.svg"
                alt="Daksa"
                width={14}
                height={14}
                className="opacity-70"
              />
              DAKSA
            </span>
          </Container>
        </div>
      </div>
    </>
  );
}
