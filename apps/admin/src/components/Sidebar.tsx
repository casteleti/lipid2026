'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sections: { title: string; items: { href: string; label: string }[] }[] = [
  {
    title: 'Geral',
    items: [{ href: '/', label: 'Dashboard' }],
  },
  {
    title: 'Conteúdo',
    items: [
      { href: '/aplicacoes', label: 'Aplicações' },
      { href: '/tecnologias', label: 'Tecnologias' },
      { href: '/ingredientes', label: 'Ingredientes' },
      { href: '/parceiros', label: 'Parceiros' },
      { href: '/blog', label: 'Blog' },
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
    <aside className="w-64 flex-shrink-0 border-r border-gray-200 bg-white flex flex-col overflow-y-auto">
      <div className="px-6 py-6 border-b border-gray-200">
        <Image src="/logo/lipid-horizontal-sm.png" alt="LIPID Ingredients" width={140} height={42} />
      </div>

      <nav className="flex-1 px-3 py-6 space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              {section.title}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
