import { cva, type VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';
import Link from 'next/link';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-primary-900 text-white hover:bg-primary-950',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        outline: 'border border-gray-300 text-gray-900 hover:border-gray-400 hover:bg-gray-50',
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
}

export function Button({ children, href, variant, size, className, type, ...props }: ButtonProps) {
  const baseClass = buttonVariants({ variant, size, className });

  if (href) {
    return (
      <Link href={href} className={baseClass}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type || 'button'} className={baseClass} {...props}>
      {children}
    </button>
  );
}
