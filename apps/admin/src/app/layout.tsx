import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Daksa CMS - Painel Administrativo',
  description: 'Gerenciamento de conteúdo LIPID',
  robots: 'noindex,nofollow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <aside
            style={{
              width: '16rem',
              borderRight: '1px solid #e5e7eb',
              background: '#111827',
              color: 'white',
              padding: '1.5rem',
            }}
          >
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>
              Daksa CMS
            </h1>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href="/admin">Dashboard</a>
              <a href="/admin/aplicacoes">Aplicações</a>
              <a href="/admin/tecnologias">Tecnologias</a>
              <a href="/admin/ingredientes">Ingredientes</a>
              <a href="/admin/conteudo">Conteúdo</a>
              <a href="/admin/leads">Leads</a>
              <a href="/admin/usuarios">Usuários</a>
            </nav>
          </aside>

          <main style={{ flex: 1, padding: '2rem' }}>{children}</main>
        </div>
      </body>
    </html>
  );
}
