import Link from 'next/link';
import clsx from 'clsx';
import { HiArrowRight, HiArrowUpRight } from 'react-icons/hi2';

interface LinkArrowProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  diagonal?: boolean;
  className?: string;
}

export function LinkArrow({ href, children, external = false, diagonal = false, className }: LinkArrowProps) {
  const Icon = diagonal ? HiArrowUpRight : HiArrowRight;

  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={clsx(
        'inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-900 hover:text-primary-600 transition-colors duration-200 group',
        className,
      )}
    >
      {children}
      <Icon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
}
