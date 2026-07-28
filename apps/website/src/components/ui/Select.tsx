import clsx from 'clsx';
import { SelectHTMLAttributes } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
}

export function Select({ label, options, placeholder, error, className, id, ...props }: SelectProps) {
  const errorId = id && error ? `${id}-error` : undefined;

  return (
    <div className="w-full space-y-2">
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-gray-900">
          {label}
          {props.required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <select
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
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={errorId} className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
