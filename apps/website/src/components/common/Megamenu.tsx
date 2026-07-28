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
        'absolute left-0 top-full z-40 mt-3 w-[380px] rounded-2xl border border-gray-100 bg-white p-2 shadow-[0_20px_45px_-15px_rgba(15,23,42,0.18)] transition-all duration-200 ease-out motion-reduce:transition-none',
        open
          ? 'translate-y-0 scale-100 opacity-100'
          : 'pointer-events-none -translate-y-1 scale-[0.98] opacity-0',
      )}
    >
      <div className="px-3 pb-3 pt-2.5">
        <p className="eyebrow mb-1.5">{section}</p>
        <h3 className="text-base font-bold leading-snug text-gray-900">{content.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{content.description}</p>
      </div>

      <div className="space-y-0.5">
        {content.items.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            tabIndex={open ? 0 : -1}
            onClick={onNavigate}
            className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 hover:bg-gray-50 focus-visible:bg-gray-50 focus-visible:outline-none"
          >
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 text-primary-600 transition-colors duration-150 group-hover:border-primary-100 group-hover:bg-primary-50">
              <item.icon className="h-4 w-4" />
            </span>
            <span className="pt-0.5">
              <span className="block text-sm font-semibold text-gray-900">{item.name}</span>
              <span className="block text-xs text-gray-500">{item.desc}</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-1 border-t border-gray-100 px-3 pt-3">
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
