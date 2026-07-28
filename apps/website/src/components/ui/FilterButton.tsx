import clsx from 'clsx';

interface FilterButtonProps {
  label: string;
  active?: boolean;
  onClick: () => void;
}

export function FilterButton({ label, active = false, onClick }: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={clsx(
        'rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200',
        active ? 'bg-primary-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
      )}
    >
      {label}
    </button>
  );
}
