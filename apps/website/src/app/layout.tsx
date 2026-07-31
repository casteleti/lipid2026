import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { CONTATO } from '@/lib/contato';

const inter = Inter({ subsets: ['latin'] });

const SITE_URL = 'https://lipid.daksa.app.br';
const SITE_NAME = 'Lipid Ingredients';
const DEFAULT_DESCRIPTION =
  'Ingredientes especializados, tecnologia internacional e suporte técnico para projetos farmacêuticos, cosméticos, nutricionais e veterinários. Representante exclusiva do Grupo Lipoid no Brasil.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Lipid Ingredients | Ingredientes, Tecnologia e Suporte Técnico',
    template: '%s | Lipid Ingredients',
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    'ingredientes farmacêuticos',
    'ingredientes cosméticos',
    'fosfolipídios',
    'lecitinas',
    'lipossomas',
    'ativos cosméticos',
    'extratos botânicos',
    'Lipoid Brasil',
    'suporte técnico formulação',
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Lipid Ingredients | Ingredientes, Tecnologia e Suporte Técnico',
    description: DEFAULT_DESCRIPTION,
    // 1200x630 é o cartão grande do WhatsApp, LinkedIn, Facebook, X e Slack.
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lipid Ingredients | Ingredientes, Tecnologia e Suporte Técnico',
    description: DEFAULT_DESCRIPTION,
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo/lipid-horizontal.png`,
  image: `${SITE_URL}/og-image.png`,
  description: DEFAULT_DESCRIPTION,
  email: CONTATO.email,
  telephone: CONTATO.telefone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: CONTATO.endereco.logradouro,
    addressLocality: CONTATO.endereco.cidade,
    addressRegion: CONTATO.endereco.estado,
    postalCode: CONTATO.endereco.cep,
    addressCountry: 'BR',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'suporte técnico',
    telephone: CONTATO.telefone,
    email: CONTATO.email,
    availableLanguage: ['pt-BR'],
  },
  // Confirma ao buscador que estes perfis são da mesma empresa.
  sameAs: [CONTATO.redes.linkedin, CONTATO.redes.instagram, CONTATO.redes.facebook],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
