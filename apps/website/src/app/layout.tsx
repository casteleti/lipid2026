import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

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
        <header className="sticky top-0 border-b bg-white">
          <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
            <div className="text-2xl font-bold">Daksa</div>
            <ul className="flex gap-8">
              <li><a href="/">Home</a></li>
              <li><a href="/aplicacoes">Aplicações</a></li>
              <li><a href="/tecnologias">Tecnologias</a></li>
              <li><a href="/sobre">Sobre</a></li>
              <li><a href="/contato">Contato</a></li>
            </ul>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="border-t bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-12">
            <p className="text-center text-sm text-gray-600">
              © 2026 Daksa. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
