import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const errorId = id && error ? `${id}-error` : undefined;

  return (
    <div className="w-full space-y-2">
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-gray-900">
          {label}
          {props.required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={clsx(
          'w-full rounded-xl border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2',
          error
            ? 'border-red-400 focus:ring-red-400'
            : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
          className,
        )}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
