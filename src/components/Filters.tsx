import { useState } from 'react';
import type { ShopFilters } from '@/types/product';

interface FiltersProps {
  filters: ShopFilters;
  categories: string[];
  allSizes: string[];
  allColors: string[];
  onChange: (next: Partial<ShopFilters>) => void;
  onClear: () => void;
}

export default function Filters({ filters, categories, allSizes, allColors, onChange, onClear }: FiltersProps) {
  const [min, setMin] = useState(filters.min);
  const [max, setMax] = useState(filters.max);

  const toggleArr = (key: 'sizes' | 'colors', val: string) => {
    const arr = filters[key];
    const next = arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
    onChange({ [key]: next } as Partial<ShopFilters>);
  };

  return (
    <aside className="filters">
      <h4>Category</h4>
      {categories.map((c) => (
        <div className="filter-opt" key={c}>
          <input
            type="checkbox"
            checked={filters.cat === c}
            onChange={(e) => onChange({ cat: e.target.checked ? c : '' })}
          />
          {c}
        </div>
      ))}

      <h4>Size</h4>
      <div className="size-row">
        {allSizes.map((s) => (
          <div
            key={s}
            className={`size-chip ${filters.sizes.includes(s) ? 'sel' : ''}`}
            onClick={() => toggleArr('sizes', s)}
          >
            {s}
          </div>
        ))}
      </div>

      <h4>Color</h4>
      <div className="swatch-row">
        {allColors.map((c) => (
          <div
            key={c}
            className={`swatch ${filters.colors.includes(c) ? 'sel' : ''}`}
            style={{ background: c }}
            onClick={() => toggleArr('colors', c)}
          />
        ))}
      </div>

      <h4>Price Range</h4>
      <div className="range-row">
        <input type="number" placeholder="Min" value={min} onChange={(e) => setMin(e.target.value)} /> –
        <input type="number" placeholder="Max" value={max} onChange={(e) => setMax(e.target.value)} />
      </div>
      <div style={{ marginTop: 10 }}>
        <button className="btn btn-outline btn-sm btn-block" onClick={() => onChange({ min, max })}>
          Apply
        </button>
      </div>

      <h4>Availability</h4>
      <div className="filter-opt">
        <input
          type="checkbox"
          checked={filters.avail}
          onChange={(e) => onChange({ avail: e.target.checked })}
        />
        In Stock Only
      </div>

      <div style={{ marginTop: 20 }}>
        <span className="clear-link" onClick={onClear}>Clear all filters</span>
      </div>
    </aside>
  );
}
