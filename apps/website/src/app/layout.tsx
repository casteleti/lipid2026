import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Daksa - Inovação em Lipídios',
  description:
    'Plataforma institucional especializada em tecnologias de lipídios para cosméticos e farmacêutica',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://lipid.daksa.app.br',
    siteName: 'Daksa',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
