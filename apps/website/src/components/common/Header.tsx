'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { HiBars3, HiXMark, HiChevronDown } from 'react-icons/hi2';
import { Button } from '@/components/ui/Button';
import { Megamenu } from './Megamenu';
import { menuItems, megamenuContent, type DropdownKey } from './nav-data';

const OPEN_DELAY = 80;
const CLOSE_DELAY = 180;
const EXIT_DURATION = 200;

export function Header() {
  const pathname = usePathname();
  const [openSection, setOpenSection] = useState<DropdownKey | null>(null);
  const [mountedSection, setMountedSection] = useState<DropdownKey | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<DropdownKey | null>(null);

  const openTimer = useRef<ReturnType<typeof setTimeout>>();
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  const unmountTimer = useRef<ReturnType<typeof setTimeout>>();
  const triggerRefs = useRef<Partial<Record<DropdownKey, HTMLButtonElement | null>>>({});
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const clearTimers = () => {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);
    clearTimeout(unmountTimer.current);
  };

  const openDropdown = (key: DropdownKey) => {
    clearTimers();
    setMountedSection(key);
    openTimer.current = setTimeout(() => setOpenSection(key), OPEN_DELAY);
  };

  const scheduleClose = () => {
    clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => {
      setOpenSection(null);
      unmountTimer.current = setTimeout(() => setMountedSection(null), EXIT_DURATION);
    }, CLOSE_DELAY);
  };

  const closeNow = () => {
    clearTimers();
    setOpenSection(null);
    unmountTimer.current = setTimeout(() => setMountedSection(null), EXIT_DURATION);
  };

  useEffect(() => clearTimers, []);

  // Close any open dropdown on route change.
  useEffect(() => {
    setOpenSection(null);
    setMountedSection(null);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  // While the drawer is translated off-screen its controls must stay out of the tab order.
  const drawerTabIndex = isMobileMenuOpen ? 0 : -1;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="container-main flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center">
          <Image src="/logo/lipid-horizontal.png" alt="LIPID Ingredients" width={140} height={42} priority />
        </Link>

        <nav className="hidden lg:flex lg:items-center lg:gap-4 xl:gap-7">
          {menuItems.map((item) => {
            const active = isActive(item.href);
            const isOpen = item.dropdownKey ? openSection === item.dropdownKey : false;

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdownKey && openDropdown(item.dropdownKey)}
                onMouseLeave={() => item.dropdownKey && scheduleClose()}
                onKeyDown={(e) => {
                  if (e.key === 'Escape' && item.dropdownKey && isOpen) {
                    closeNow();
                    triggerRefs.current[item.dropdownKey]?.focus();
                  }
                }}
                onBlur={(e) => {
                  if (item.dropdownKey && !e.currentTarget.contains(e.relatedTarget as Node)) {
                    closeNow();
                  }
                }}
              >
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    onFocus={() => item.dropdownKey && openDropdown(item.dropdownKey)}
                    className={clsx(
                      'py-2 text-sm transition-colors duration-150',
                      active || isOpen ? 'font-semibold text-gray-900' : 'font-medium text-gray-600 hover:text-gray-900',
                    )}
                  >
                    {item.label}
                  </Link>

                  {item.dropdownKey && (
                    <button
                      ref={(el) => {
                        triggerRefs.current[item.dropdownKey!] = el;
                      }}
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      aria-controls={`megamenu-${item.dropdownKey}`}
                      aria-label={`${isOpen ? 'Fechar' : 'Abrir'} submenu de ${item.label.toLowerCase()}`}
                      onClick={() => (isOpen ? closeNow() : openDropdown(item.dropdownKey!))}
                      className="ml-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                    >
                      <HiChevronDown
                        className={clsx('h-3.5 w-3.5 transition-transform duration-200', isOpen && 'rotate-180')}
                      />
                    </button>
                  )}
                </div>

                <span
                  aria-hidden
                  className={clsx(
                    'absolute left-0 top-full mt-0.5 h-1 w-1 rounded-full bg-primary-600 transition-opacity duration-150',
                    active ? 'opacity-100' : 'opacity-0',
                  )}
                />

                {item.dropdownKey && mountedSection === item.dropdownKey && (
                  <Megamenu
                    id={`megamenu-${item.dropdownKey}`}
                    section={item.dropdownKey}
                    open={isOpen}
                    onNavigate={closeNow}
                  />
                )}
              </div>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <div className="xl:hidden">
            <Button href="/contato" variant="primary" size="sm">
              Fale conosco
            </Button>
          </div>
          <div className="hidden xl:block">
            <Button href="/contato" variant="primary" size="md">
              Fale com um especialista
            </Button>
          </div>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          className="flex h-10 w-10 items-center justify-center text-gray-900 lg:hidden"
          onClick={() => setIsMobileMenuOpen((v) => !v)}
        >
          {isMobileMenuOpen ? <HiXMark className="h-6 w-6" /> : <HiBars3 className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile / tablet drawer */}
      <div
        className={clsx(
          'fixed inset-0 z-[60] bg-gray-900/25 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden motion-reduce:transition-none',
          isMobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden={!isMobileMenuOpen}
      />

      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        aria-hidden={!isMobileMenuOpen}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setIsMobileMenuOpen(false);
            menuButtonRef.current?.focus();
          }
        }}
        className={clsx(
          'fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden motion-reduce:transition-none',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-100 px-4">
          <Image src="/logo/lipid-horizontal.png" alt="LIPID Ingredients" width={120} height={36} />
          <button
            type="button"
            tabIndex={drawerTabIndex}
            aria-label="Fechar menu"
            className="flex h-10 w-10 items-center justify-center text-gray-500 hover:text-gray-900"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <HiXMark className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {menuItems.map((item) => {
            const active = isActive(item.href);

            if (!item.dropdownKey) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  tabIndex={drawerTabIndex}
                  className={clsx(
                    'flex min-h-12 items-center rounded-xl px-3 text-[15px] transition-colors duration-150',
                    active ? 'bg-gray-50 font-semibold text-gray-900' : 'font-medium text-gray-700 hover:bg-gray-50',
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            }

            const isExpanded = expandedMobile === item.dropdownKey;
            const section = megamenuContent[item.dropdownKey];

            return (
              <div key={item.label} className="border-b border-gray-50 last:border-b-0">
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    tabIndex={drawerTabIndex}
                    className={clsx(
                      'flex min-h-12 flex-1 items-center rounded-xl px-3 text-[15px] transition-colors duration-150',
                      active ? 'font-semibold text-gray-900' : 'font-medium text-gray-700 hover:bg-gray-50',
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    tabIndex={drawerTabIndex}
                    aria-haspopup="true"
                    aria-expanded={isExpanded}
                    aria-controls={`mobile-submenu-${item.dropdownKey}`}
                    aria-label={`${isExpanded ? 'Fechar' : 'Abrir'} submenu de ${item.label.toLowerCase()}`}
                    onClick={() => setExpandedMobile(isExpanded ? null : item.dropdownKey!)}
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center text-gray-400 hover:text-gray-700"
                  >
                    <HiChevronDown
                      className={clsx('h-4 w-4 transition-transform duration-200', isExpanded && 'rotate-180')}
                    />
                  </button>
                </div>

                <div
                  id={`mobile-submenu-${item.dropdownKey}`}
                  className={clsx(
                    'grid overflow-hidden transition-all duration-200 ease-out motion-reduce:transition-none',
                    isExpanded ? 'grid-rows-[1fr] pb-2 opacity-100' : 'grid-rows-[0fr] opacity-0',
                  )}
                >
                  <div className="min-h-0 space-y-0.5 pl-3">
                    {section.items.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        tabIndex={isMobileMenuOpen && isExpanded ? 0 : -1}
                        className="flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm text-gray-600 hover:bg-gray-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 text-primary-600">
                          <sub.icon className="h-4 w-4" />
                        </span>
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="flex-shrink-0 border-t border-gray-100 p-4">
          <Button
            href="/contato"
            variant="primary"
            size="md"
            className="w-full"
            tabIndex={drawerTabIndex}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Fale com um especialista
          </Button>
        </div>
      </div>
    </header>
  );
}
