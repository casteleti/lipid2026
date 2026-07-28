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
    'bg-white rounded-2xl border border-gray-200 overflow-hidden',
    hoverable && 'transition-shadow duration-300 hover:shadow-xl',
    href &&
      'group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
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
