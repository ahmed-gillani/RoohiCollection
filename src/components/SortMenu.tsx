import { useEffect, useRef, useState } from 'react';
import type { ShopFilters } from '@/types/product';

type Sort = ShopFilters['sort'];

// Only sorts backed by product data: isNew flag, price, rating
const OPTIONS: { value: Sort; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'popularity', label: 'Popularity' },
];

export default function SortMenu({ value, onChange }: { value: Sort; onChange: (sort: Sort) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="sort-menu" ref={ref}>
      <button
        type="button"
        className="ctrl-btn"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        Sort <span aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <ul className="sort-pop" role="listbox" aria-label="Sort products">
          {OPTIONS.map((o) => (
            <li key={o.value} role="option" aria-selected={value === o.value}>
              <button
                type="button"
                className={value === o.value ? 'sel' : ''}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
