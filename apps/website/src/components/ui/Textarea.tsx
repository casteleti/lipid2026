import clsx from 'clsx';
import { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className, id, rows = 5, ...props }: TextareaProps) {
  const errorId = id && error ? `${id}-error` : undefined;

  return (
    <div className="w-full space-y-2">
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-gray-900">
          {label}
          {props.required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={clsx(
          'w-full resize-none rounded-xl border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2',
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
