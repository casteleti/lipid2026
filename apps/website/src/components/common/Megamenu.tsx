'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { megamenuContent, type DropdownKey } from './nav-data';

interface MegamenuProps {
  id: string;
  section: DropdownKey;
  open: boolean;
  onNavigate: () => void;
}

export function Megamenu({ id, section, open, onNavigate }: MegamenuProps) {
  const content = megamenuContent[section];
  if (!content) return null;

  return (
    <div
      id={id}
      role="group"
      aria-label={`Submenu ${section.toLowerCase()}`}
      aria-hidden={!open}
      className={clsx(
        'absolute left-0 top-full z-40 mt-3 w-[380px] overflow-hidden rounded-[20px] border border-black/[0.06] bg-white/95 p-2 shadow-[0_40px_80px_-30px_rgba(15,23,42,0.25),0_8px_24px_-12px_rgba(15,23,42,0.12)] backdrop-blur-2xl transition-all duration-[450ms] ease-brand motion-reduce:transition-none',
        open
          ? 'translate-y-0 scale-100 opacity-100'
          : 'pointer-events-none -translate-y-1 scale-[0.98] opacity-0',
      )}
    >
      {/* ambient gradient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary-500/[0.07] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-12 h-44 w-44 rounded-full bg-primary-400/[0.06] blur-2xl"
      />

      <div className="relative px-3 pb-3 pt-2.5">
        <p className="eyebrow mb-1.5">{section}</p>
        <h3 className="text-base font-bold leading-snug text-gray-900">{content.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{content.description}</p>
      </div>

      <div className="relative space-y-0.5">
        {content.items.map((item, i) => (
          <Link
            key={item.name}
            href={item.href}
            tabIndex={open ? 0 : -1}
            onClick={onNavigate}
            style={open ? { animation: `revealUp 0.5s cubic-bezier(0.22,0.61,0.36,1) ${0.05 + i * 0.05}s both` } : undefined}
            className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 hover:bg-primary-50/60 focus-visible:bg-gray-50 focus-visible:outline-none"
          >
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 text-primary-600 transition-all duration-300 group-hover:border-primary-100 group-hover:bg-primary-50 group-hover:shadow-[0_6px_16px_-6px_rgba(30,63,153,0.35)]">
              <item.icon className="h-4 w-4" />
            </span>
            <span className="pt-0.5">
              <span className="block text-sm font-semibold text-gray-900">{item.name}</span>
              <span className="block text-xs text-gray-500">{item.desc}</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="relative mt-1 border-t border-black/[0.05] px-3 pt-3">
        <Link
          href={content.ctaHref}
          tabIndex={open ? 0 : -1}
          onClick={onNavigate}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors duration-150 hover:text-primary-700 focus-visible:outline-none"
        >
          {content.ctaText}
          <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
