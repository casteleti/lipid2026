import clsx from 'clsx';
import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'light' | 'dark';
}

export function Section({ children, className, variant = 'default' }: SectionProps) {
  const variantStyles = {
    default: 'bg-white',
    light: 'bg-gray-50',
    dark: 'bg-primary-950 text-white',
  };

  return (
    <section className={clsx('py-16 md:py-20 lg:py-24', variantStyles[variant], className)}>
      <div className="container-main">{children}</div>
    </section>
  );
}
