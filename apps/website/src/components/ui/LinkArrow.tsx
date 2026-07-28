import Link from 'next/link';
import clsx from 'clsx';
import { HiArrowRight, HiArrowUpRight } from 'react-icons/hi2';

interface LinkArrowProps {
  href?: string;
  children: React.ReactNode;
  external?: boolean;
  diagonal?: boolean;
  className?: string;
  /** Render as a non-interactive visual indicator (e.g. nested inside a Card that is itself the link). */
  as?: 'link' | 'span';
}

export function LinkArrow({
  href,
  children,
  external = false,
  diagonal = false,
  className,
  as = 'link',
}: LinkArrowProps) {
  const Icon = diagonal ? HiArrowUpRight : HiArrowRight;
  const content = (
    <>
      {children}
      <Icon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </>
  );

  if (as === 'span') {
    return (
      <span
        className={clsx(
          'inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-900 transition-colors duration-200 group-hover:text-primary-600',
          className,
        )}
      >
        {content}
      </span>
    );
  }

  return (
    <Link
      href={href!}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={clsx(
        'inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-900 hover:text-primary-600 transition-colors duration-200 group',
        className,
      )}
    >
      {content}
    </Link>
  );
}
