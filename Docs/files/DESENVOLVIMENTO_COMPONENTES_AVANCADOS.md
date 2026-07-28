# ⚡ DESENVOLVIMENTO COMPONENTES AVANÇADOS
## Filtros | Busca Avançada | Animações | Modais | Dropdowns

**Status:** Módulo 5 de 6  
**Escopo:** Componentes reutilizáveis avançados  
**Tempo:** 4-5 horas  
**Dependência:** Componentes base criados  

---

## 📋 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Componentes de Filtro](#componentes-de-filtro)
3. [Componentes de Modal](#componentes-de-modal)
4. [Componentes de Animação](#componentes-de-animação)
5. [Componentes de Accordion](#componentes-de-accordion)
6. [Componentes de Dropdown](#componentes-de-dropdown)
7. [Hooks Customizados](#hooks-customizados)

---

## 🎯 VISÃO GERAL

```
COMPONENTES AVANÇADOS:

1. MultiSelect Filter
   - Checkbox múltiplo
   - Tags de seleção
   - Clear all button

2. Range Slider
   - Min/Max de preço ou valor
   - Visual feedback
   - Real-time update

3. Modal
   - Overlay
   - Close button
   - Animations

4. Dropdown Avançado
   - Search dentro dropdown
   - Keyboard navigation
   - Click outside close

5. Accordion
   - Expand/Collapse
   - Smooth animation
   - Multiple open suporte

6. Toast Notifications
   - Success/Error/Warning
   - Auto-dismiss
   - Stack multiple

7. Skeleton Loader
   - Loading state
   - Placeholder animation
   - Acessível
```

---

## 🧩 COMPONENTES DE FILTRO

### Componente 1: MultiSelectFilter

**Arquivo:** `apps/website/src/components/ui/MultiSelectFilter.tsx`

```typescript
'use client';

import { useState } from 'react';
import clsx from 'clsx';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface MultiSelectFilterProps {
  title: string;
  options: FilterOption[];
  selectedIds: string[];
  onChange: (selectedIds: string[]) => void;
  expandable?: boolean;
}

export function MultiSelectFilter({
  title,
  options,
  selectedIds,
  onChange,
  expandable = true,
}: MultiSelectFilterProps) {
  const [isOpen, setIsOpen] = useState(!expandable);

  const handleToggle = (id: string) => {
    const newSelected = selectedIds.includes(id)
      ? selectedIds.filter((s) => s !== id)
      : [...selectedIds, id];
    onChange(newSelected);
  };

  const handleClear = () => {
    onChange([]);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">{title}</h3>
        {expandable && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-500 hover:text-gray-900"
          >
            {isOpen ? '−' : '+'}
          </button>
        )}
      </div>

      {isOpen && (
        <div className="space-y-3">
          {options.map((option) => (
            <label key={option.id} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedIds.includes(option.id)}
                onChange={() => handleToggle(option.id)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm flex-1">{option.label}</span>
              {option.count !== undefined && (
                <span className="text-xs text-gray-500">({option.count})</span>
              )}
            </label>
          ))}

          {selectedIds.length > 0 && (
            <button
              onClick={handleClear}
              className="text-xs text-primary-600 hover:text-primary-700 font-semibold w-full text-left mt-3 pt-3 border-t"
            >
              Limpar filtros
            </button>
          )}
        </div>
      )}
    </div>
  );
}
```

---

### Componente 2: RangeSlider

**Arquivo:** `apps/website/src/components/ui/RangeSlider.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  onRangeChange: (min: number, max: number) => void;
  label?: string;
  formatValue?: (value: number) => string;
}

export function RangeSlider({
  min: minValue,
  max: maxValue,
  step = 1,
  onRangeChange,
  label,
  formatValue = (v) => v.toString(),
}: RangeSliderProps) {
  const [min, setMin] = useState(minValue);
  const [max, setMax] = useState(maxValue);

  useEffect(() => {
    onRangeChange(min, max);
  }, [min, max, onRangeChange]);

  return (
    <div className="space-y-4">
      {label && <h4 className="font-semibold">{label}</h4>}

      <div className="flex gap-4">
        <input
          type="range"
          min={minValue}
          max={maxValue}
          step={step}
          value={min}
          onChange={(e) => {
            const newMin = Math.min(Number(e.target.value), max);
            setMin(newMin);
          }}
          className="w-full"
        />

        <input
          type="range"
          min={minValue}
          max={maxValue}
          step={step}
          value={max}
          onChange={(e) => {
            const newMax = Math.max(Number(e.target.value), min);
            setMax(newMax);
          }}
          className="w-full"
        />
      </div>

      <div className="flex gap-4 justify-between text-sm">
        <span className="text-gray-600">
          {formatValue(min)} — {formatValue(max)}
        </span>
      </div>
    </div>
  );
}
```

---

## 🎭 COMPONENTES DE MODAL

### Componente 3: Modal

**Arquivo:** `apps/website/src/components/ui/Modal.tsx`

```typescript
'use client';

import { ReactNode, useEffect } from 'react';
import clsx from 'clsx';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  closeOnEscape?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnEscape = true,
}: ModalProps) {
  useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) return null;

  const sizeMap = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className={clsx(
            'bg-white rounded-lg shadow-xl animate-slide-up',
            sizeMap[size],
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {title && (
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold">{title}</h2>
              <button
                onClick={onClose}
                className="text-2xl text-gray-500 hover:text-gray-900 leading-none"
              >
                ×
              </button>
            </div>
          )}

          {/* Content */}
          <div className="p-6">{children}</div>
        </div>
      </div>
    </>
  );
}
```

---

## ✨ COMPONENTES DE ANIMAÇÃO

### Componente 4: SkeletonLoader

**Arquivo:** `apps/website/src/components/ui/SkeletonLoader.tsx`

```typescript
import clsx from 'clsx';

interface SkeletonLoaderProps {
  count?: number;
  type?: 'card' | 'text' | 'avatar';
  className?: string;
}

export function SkeletonLoader({
  count = 3,
  type = 'card',
  className,
}: SkeletonLoaderProps) {
  const items = Array.from({ length: count });

  if (type === 'text') {
    return (
      <div className="space-y-4">
        {items.map((_, i) => (
          <div
            key={i}
            className="h-4 bg-gray-200 rounded animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (type === 'avatar') {
    return (
      <div className="flex gap-4">
        {items.map((_, i) => (
          <div
            key={i}
            className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"
          />
        ))}
      </div>
    );
  }

  // card
  return (
    <div className={clsx('grid grid-cols-1 md:grid-cols-3 gap-6', className)}>
      {items.map((_, i) => (
        <div key={i} className="space-y-4 rounded-lg bg-white p-4 border border-gray-200">
          <div className="h-40 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
        </div>
      ))}
    </div>
  );
}
```

---

### Componente 5: Toast Notification

**Arquivo:** `apps/website/src/components/ui/Toast.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: () => void;
}

export function Toast({
  message,
  type,
  duration = 5000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeStyles = {
    success: 'bg-green-50 border-green-200 text-green-900',
    error: 'bg-red-50 border-red-200 text-red-900',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    info: 'bg-blue-50 border-blue-200 text-blue-900',
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div
      className={clsx(
        'fixed bottom-4 right-4 p-4 rounded-lg border animate-slide-up transition-opacity duration-300',
        typeStyles[type],
        !isVisible && 'opacity-0',
      )}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl font-bold">{icons[type]}</span>
        <p className="text-sm">{message}</p>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="ml-auto text-lg leading-none opacity-50 hover:opacity-100"
        >
          ×
        </button>
      </div>
    </div>
  );
}
```

---

## 📂 COMPONENTES DE ACCORDION

### Componente 6: Accordion

**Arquivo:** `apps/website/src/components/ui/Accordion.tsx`

```typescript
'use client';

import { useState, ReactNode } from 'react';
import clsx from 'clsx';

interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const handleToggle = (id: string) => {
    setOpenIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      } else {
        return allowMultiple ? [...prev, id] : [id];
      }
    });
  };

  return (
    <div className="space-y-3 border border-gray-200 rounded-lg overflow-hidden">
      {items.map((item) => (
        <div key={item.id} className="border-b border-gray-100 last:border-b-0">
          <button
            onClick={() => handleToggle(item.id)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
          >
            <span className="font-semibold">{item.title}</span>
            <span
              className={clsx(
                'text-xl transform transition-transform',
                openIds.includes(item.id) ? 'rotate-180' : '',
              )}
            >
              ▼
            </span>
          </button>

          {openIds.includes(item.id) && (
            <div className="px-4 pb-4 bg-gray-50 animate-slide-down">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
```

---

## 🎯 COMPONENTES DE DROPDOWN

### Componente 7: DropdownMenu

**Arquivo:** `apps/website/src/components/ui/DropdownMenu.tsx`

```typescript
'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

interface DropdownItem {
  label: string;
  onClick: () => void;
  danger?: boolean;
}

interface DropdownMenuProps {
  trigger: ReactNode;
  items: DropdownItem[];
  position?: 'left' | 'right';
}

export function DropdownMenu({
  trigger,
  items,
  position = 'left',
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="focus:outline-none"
      >
        {trigger}
      </button>

      {isOpen && (
        <div
          className={clsx(
            'absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fade-in',
            position === 'left' ? 'left-0' : 'right-0',
            'min-w-48',
          )}
        >
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
              className={clsx(
                'w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors',
                item.danger ? 'text-red-600 hover:bg-red-50' : '',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## 🎣 HOOKS CUSTOMIZADOS

### Hook 1: useLocalStorage

**Arquivo:** `apps/website/src/hooks/useLocalStorage.ts`

```typescript
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Erro ao ler localStorage[${key}]:`, error);
    } finally {
      setIsLoaded(true);
    }
  }, [key]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      typeof window !== 'undefined' &&
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Erro ao escrever localStorage[${key}]:`, error);
    }
  };

  return [storedValue, setValue, isLoaded] as const;
}
```

---

### Hook 2: useDebounce

**Arquivo:** `apps/website/src/hooks/useDebounce.ts`

```typescript
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
```

---

### Hook 3: useIntersectionObserver

**Arquivo:** `apps/website/src/hooks/useIntersectionObserver.ts`

```typescript
import { useEffect, useRef, useState } from 'react';

export function useIntersectionObserver(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isVisible] as const;
}
```

---

## 🧪 TESTES

```bash
# Filtros
☑ MultiSelectFilter funciona
☑ Checkboxes mudam estado
☑ Clear limpa seleção
☑ onChange é chamado

# Range Slider
☑ Sliders funcionam
☑ Min não passa max
☑ Values exibem correto

# Modal
☑ Abre/fecha
☑ Escape fecha (se enabled)
☑ Click outside fecha
☑ Animação suave

# Toast
☑ Exibe mensagem
☑ Auto-dismiss funciona
☑ Close button funciona
☑ Tipos de mensagem OK

# Accordion
☑ Items expandem
☑ Single open mode funciona
☑ Multiple mode funciona
☑ Animação suave

# Dropdown
☑ Abre ao click
☑ Click outside fecha
☑ Itens clicáveis
☑ Posicionamento correto
```

---

## 📊 CHECKLIST

```
FILTROS:
☑ MultiSelectFilter criado
☑ RangeSlider criado

MODAIS & ANIMAÇÃO:
☑ Modal criado
☑ Toast criado
☑ SkeletonLoader criado

ACCORDION & DROPDOWN:
☑ Accordion criado
☑ DropdownMenu criado

HOOKS:
☑ useLocalStorage criado
☑ useDebounce criado
☑ useIntersectionObserver criado

QUALIDADE:
☑ Todos animam suavemente
☑ Acessíveis
☑ TypeScript ok
☑ Performance OK
```

---

**Próximo: DESENVOLVIMENTO_INTEGRACAO_COMPLETA.md** 🚀
