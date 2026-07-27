import clsx from 'clsx';
import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'dark';
  className?: string;
}

export function Badge({ children, variant = 'primary', className }: BadgeProps) {
  const variantStyles = {
    primary: 'bg-primary-50 text-primary-700 border border-primary-100',
    secondary: 'bg-gray-100 text-gray-600',
    dark: 'bg-white/10 text-white',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider',
        variantStyles[variant],
        className,
      )}
    >
      {variant === 'primary' && <span className="h-1.5 w-1.5 rounded-full bg-primary-600" />}
      {children}
    </span>
  );
}
