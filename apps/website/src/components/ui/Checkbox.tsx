import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Checkbox({ label, error, className, ...props }: CheckboxProps) {
  return (
    <div className="space-y-2">
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          className={clsx(
            'mt-0.5 h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-500',
            className,
          )}
          {...props}
        />
        <span className="text-sm text-gray-600">{label}</span>
      </label>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
