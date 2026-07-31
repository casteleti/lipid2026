import { ReactNode } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  /** When set, the whole card becomes a single clickable link instead of relying on a nested link. */
  href?: string;
}

export function Card({ children, className, hoverable = true, href }: CardProps) {
  const classes = clsx(
    'group bg-white rounded-[20px] border border-black/[0.05] overflow-hidden',
    hoverable &&
      'transition-all duration-700 ease-brand hover:-translate-y-1.5 hover:border-black/[0.08] hover:shadow-[0_40px_60px_-30px_rgba(15,23,42,0.22),0_8px_20px_-12px_rgba(15,23,42,0.08)]',
    href &&
      'block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}
