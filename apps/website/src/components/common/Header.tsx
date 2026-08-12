'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { HiBars3, HiXMark, HiChevronDown } from 'react-icons/hi2';
import { Button } from '@/components/ui/Button';
import { BotaoEspecialista } from '@/components/ui/BotaoEspecialista';
import { LogoLipid } from './LogoLipid';
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
  const [scrolled, setScrolled] = useState(false);
  const [hasBackground, setHasBackground] = useState(false);

  // Two thresholds, on purpose — they answer different questions.
  //
  // `hasBackground` (a few pixels): the moment the page moves, content starts sliding
  // *under* the bar. With a transparent bar the dark nav labels sit straight on top of
  // that content and both become unreadable. So the solid pill has to show up as soon as
  // there is anything behind it, not halfway down the hero.
  //
  // `scrolled` (past the hero): purely the compact treatment — wordmark swaps for the
  // symbol, bar gets shorter. That one is a deliberate design beat and stays where it was.
  //
  // Deliberately no DOM lookups (no sentinel, no IntersectionObserver) — just scrollY, so
  // it can't silently no-op if some element isn't where expected. Same on every page.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHasBackground(y > 8);
      setScrolled(y > window.innerHeight * 0.55);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

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
    <header
      className={clsx(
        'sticky top-0 z-50 transition-[padding] duration-500 ease-brand',
        scrolled ? 'pt-2' : 'pt-4',
      )}
    >
      <div className="px-3 md:px-4 lg:px-5">
        <div
          className={clsx(
            'relative transition-all duration-500 ease-brand md:rounded-full',
            // Vidro de verdade: translúcido + desfoque do que passa por trás. O
            // `saturate` compensa a lavagem de cor que o blur causa — sem ele o conteúdo
            // atrás fica acinzentado e parece sujeira, não vidro. Opacidade alta (80%)
            // porque abaixo disso o texto do menu começa a competir com o conteúdo,
            // que é justamente o problema que essa barra resolve.
            hasBackground
              ? 'border border-white/60 bg-white/80 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.28),0_6px_20px_-8px_rgba(15,23,42,0.14)] backdrop-blur-2xl backdrop-saturate-150'
              : 'border border-transparent bg-transparent shadow-none',
          )}
        >
          {/* subtle inner highlight — only reads once the glass bar is actually there */}
          <div
            aria-hidden
            className={clsx(
              'pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent transition-opacity duration-500',
              hasBackground ? 'opacity-100' : 'opacity-0',
            )}
          />

          <div
            className={clsx(
              'relative grid grid-cols-[auto_1fr_auto] items-center px-3 transition-all duration-500 ease-brand md:px-5',
              scrolled ? 'h-14 md:h-16' : 'h-16 md:h-20',
            )}
          >
            {/* Brand area — protected zone, pinned to the far edge.
                A altura do <Link> deixou de mudar com o scroll: o handoff do logo é
                explícito em que o símbolo não reduz nem se desloca — quem colapsa é o
                wordmark ao lado dele. */}
            <Link href="/" className="relative flex shrink-0 items-center">
              <LogoLipid colapsado={scrolled} />
            </Link>

            {/* Navigation area — truly centered on the whole bar (not just the leftover
                space between logo/CTA, which shifts as those change width by state) */}
            <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 xl:flex xl:items-center">
          {menuItems.map((item) => {
            const active = isActive(item.href);
            const isOpen = item.dropdownKey ? openSection === item.dropdownKey : false;

            return (
              <div
                key={item.label}
                // Grupo NOMEADO de propósito: o Megamenu renderiza aqui dentro e cada item
                // dele tem seu próprio `group`. Um `group` anônimo neste ancestral faria o
                // hover em qualquer ponto do item acender todos os ícones do submenu de uma
                // vez — `group/nav` mantém o efeito restrito à seta desta palavra.
                className="group/nav relative shrink-0 px-4 2xl:px-6"
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
                      // Azul do hover é o mesmo dos links do resto do site (primary-600).
                      // `isOpen` também pinta de azul: nos itens com dropdown, o hover que
                      // colore o texto é o mesmo que abre o submenu — sem tratar os dois
                      // juntos, TECNOLOGIAS e SEGMENTOS ficariam de fora do efeito.
                      'whitespace-nowrap py-2 transition-all duration-300 hover:text-primary-600',
                      scrolled ? 'text-[11px]' : 'text-[12px]',
                      active || isOpen ? 'font-semibold' : 'font-medium',
                      isOpen ? 'text-primary-600' : active ? 'text-gray-900' : 'text-gray-600',
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
                      className={clsx(
                        // A seta acompanha a palavra no hover, um tom mais claro para não
                        // competir com ela. `group-hover` cobre a janela do hover-intent,
                        // entre o mouse entrar e o submenu de fato abrir.
                        'ml-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-150 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                        isOpen ? 'text-primary-500' : 'text-gray-400 group-hover/nav:text-primary-400',
                      )}
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
                    'absolute left-1/2 top-full mt-0.5 h-1 w-1 -translate-x-1/2 rounded-full bg-primary-600 transition-opacity duration-150',
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

        {/* Conversion area — protected zone, pinned to the far edge */}
        <div className="flex items-center justify-end pl-4 xl:pl-6">
          <div className="hidden xl:block">
            <BotaoEspecialista href="/especialista">Fale com um especialista</BotaoEspecialista>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="flex h-11 w-11 items-center justify-center text-gray-900 xl:hidden"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
          >
            {isMobileMenuOpen ? <HiXMark className="h-6 w-6" /> : <HiBars3 className="h-6 w-6" />}
          </button>
        </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet drawer */}
      <div
        className={clsx(
          'fixed inset-0 z-[60] bg-gray-900/25 backdrop-blur-[2px] transition-opacity duration-300 xl:hidden motion-reduce:transition-none',
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
          'fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out xl:hidden motion-reduce:transition-none',
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
            href="/especialista"
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
