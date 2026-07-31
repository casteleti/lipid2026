import { cva, type VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';
import Link from 'next/link';

const buttonVariants = cva(
  'group relative inline-flex items-center justify-center gap-2 overflow-hidden font-semibold transition-all duration-500 ease-brand focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-900 text-white hover:shadow-[0_16px_36px_-12px_rgba(30,64,175,0.5)]',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        outline:
          'border border-gray-300 text-gray-900 transition-colors hover:border-primary-300 hover:bg-gray-50',
        ghost: 'text-primary-600 hover:bg-primary-50',
      },
      size: {
        sm: 'px-4 py-2 text-sm rounded-full',
        md: 'px-5 py-2.5 text-base rounded-full',
        lg: 'px-7 py-3.5 text-base rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  tabIndex?: number;
}

export function Button({ children, href, variant, size, className, type, onClick, tabIndex, ...props }: ButtonProps) {
  const baseClass = buttonVariants({ variant, size, className });
  const isPrimary = (variant ?? 'primary') === 'primary';

  const content = isPrimary ? (
    <>
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-0 transition-opacity duration-500 ease-brand group-hover:opacity-100"
      />
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </>
  ) : (
    children
  );

  if (href) {
    return (
      <Link href={href} className={baseClass} onClick={onClick} tabIndex={tabIndex}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type || 'button'} className={baseClass} onClick={onClick} tabIndex={tabIndex} {...props}>
      {content}
    </button>
  );
}
