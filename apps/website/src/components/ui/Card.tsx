import { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function Card({ children, className, hoverable = true }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white rounded-2xl border border-gray-200 overflow-hidden',
        hoverable && 'transition-shadow duration-300 hover:shadow-xl',
        className,
      )}
    >
      {children}
    </div>
  );
}
