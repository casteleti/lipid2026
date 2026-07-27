interface Option {
  id: string;
  label: string;
}

interface CheckboxGroupProps {
  label?: string;
  options: Option[];
  selected: string[];
  onChange: (ids: string[]) => void;
  disabled?: boolean;
  emptyText?: string;
}

export function CheckboxGroup({
  label,
  options,
  selected,
  onChange,
  disabled,
  emptyText = 'Nenhuma opção disponível.',
}: CheckboxGroupProps) {
  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-semibold text-gray-900 mb-2">{label}</label>}

      {options.length === 0 ? (
        <p className="text-sm text-gray-500">{emptyText}</p>
      ) : (
        <div className="max-h-56 space-y-2 overflow-y-auto rounded-lg border border-gray-300 p-3">
          {options.map((option) => (
            <label key={option.id} className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={selected.includes(option.id)}
                onChange={() => toggle(option.id)}
                disabled={disabled}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
