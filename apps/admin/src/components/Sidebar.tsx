'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sections: { title: string; items: { href: string; label: string }[] }[] = [
  {
    title: 'Geral',
    items: [
      { href: '/', label: 'Dashboard' },
      { href: '/leads', label: 'Leads' },
    ],
  },
  {
    title: 'Conteúdo',
    items: [
      { href: '/institucional', label: 'Página Institucional' },
      { href: '/segmentos', label: 'Páginas por Segmento' },
      // "Aplicações" saiu do menu: virou classificação interna (é o que liga ingrediente e
      // tecnologia a um mercado) e não tem mais página pública — quem edita mercado edita
      // Páginas por Segmento. As rotas /aplicacoes do painel foram removidas junto.
      { href: '/tecnologias', label: 'Tecnologias' },
      { href: '/ingredientes', label: 'Ingredientes' },
      { href: '/parceiros', label: 'Parceiros' },
      { href: '/blog', label: 'Conteúdo Técnico' },
      { href: '/categorias', label: 'Categorias' },
    ],
  },
  {
    title: 'Configurações',
    items: [{ href: '/usuarios', label: 'Usuários' }],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside className="flex w-64 flex-shrink-0 flex-col overflow-y-auto border-r border-gray-200/80 bg-white">
      <div className="px-6 py-6">
        <Image src="/logo/lipid-horizontal-sm.png" alt="LIPID Ingredients" width={140} height={42} />
      </div>

      <nav className="flex-1 space-y-7 px-3 pb-6">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
              {section.title}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const ativo = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={ativo ? 'page' : undefined}
                    className={`group relative flex items-center rounded-xl px-3 py-2 text-sm transition-all duration-200 ${
                      ativo
                        ? 'bg-primary-50 font-semibold text-primary-700'
                        : 'font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {/* Marca vertical na aba ativa: diz onde você está sem depender só do
                        fundo colorido, que some em tela com pouco contraste. */}
                    <span
                      aria-hidden
                      className={`absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary-600 transition-all duration-300 ${
                        ativo ? 'opacity-100' : 'opacity-0 group-hover:opacity-30'
                      }`}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
