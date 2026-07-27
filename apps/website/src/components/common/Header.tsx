'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { HiBars3, HiXMark, HiChevronDown } from 'react-icons/hi2';
import { Button } from '@/components/ui/Button';
import { Megamenu } from './Megamenu';

const menuItems = [
  { label: 'SOBRE', href: '/sobre' },
  { label: 'TECNOLOGIAS', href: '/tecnologias', hasDropdown: true },
  { label: 'APLICAÇÕES', href: '/aplicacoes', hasDropdown: true },
  { label: 'INGREDIENTES', href: '/ingredientes' },
  { label: 'CONTEÚDO TÉCNICO', href: '/blog', hasDropdown: true },
  { label: 'PARCEIROS', href: '/parceiros' },
  { label: 'CONTATO', href: '/contato' },
];

export function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="container-main flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center">
          <Image src="/logo/lipid-horizontal.png" alt="LIPID Ingredients" width={140} height={42} priority />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {menuItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className={clsx(
                  'flex items-center gap-1 py-2 text-sm font-medium transition-colors',
                  activeDropdown === item.label ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900',
                )}
              >
                {item.label}
                {item.hasDropdown && <HiChevronDown className="h-3.5 w-3.5" />}
              </Link>

              {item.hasDropdown && activeDropdown === item.label && <Megamenu section={item.label} />}
            </div>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contato" variant="primary" size="md">
            Fale com um especialista
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden text-gray-900"
          onClick={() => setIsMobileMenuOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          {isMobileMenuOpen ? <HiXMark className="h-7 w-7" /> : <HiBars3 className="h-7 w-7" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <nav className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block rounded-lg px-2 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2">
            <Button href="/contato" variant="primary" size="md" className="w-full">
              Fale com um especialista
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
