import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { FaLinkedin } from 'react-icons/fa6';
import { Container } from './Container';

const footerLinks = {
  navegacao: [
    { label: 'Sobre', href: '/sobre' },
    { label: 'Tecnologias', href: '/tecnologias' },
    { label: 'Aplicações', href: '/aplicacoes' },
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
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:border-primary-300 hover:text-primary-600"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-4 w-4" />
              </a>
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
              <a
                href="mailto:contato@daksa.app.br"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600"
              >
                <HiOutlineEnvelope className="h-4 w-4" />
                contato@daksa.app.br
              </a>
              <Link href="/contato" className="mt-3 inline-block text-sm font-semibold text-primary-600">
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
      </div>
    </>
  );
}
