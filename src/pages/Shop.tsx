import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '@/data/products';
import ProductGrid, { type GridView } from '@/components/ProductGrid';
import Filters from '@/components/Filters';
import Breadcrumb, { type Crumb } from '@/components/Breadcrumb';
import SortMenu from '@/components/SortMenu';
import type { ShopFilters } from '@/types/product';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const cat = searchParams.get('cat') ?? '';
  const q = searchParams.get('q') ?? '';
  const sizeParam = searchParams.getAll('size');
  const colorParam = searchParams.getAll('color');
  const minParam = searchParams.get('min') ?? '';
  const maxParam = searchParams.get('max') ?? '';
  const availParam = searchParams.get('avail') === 'true';
  const sortParam = searchParams.get('sort') as ShopFilters['sort'] || 'newest';
  const viewParam = searchParams.get('view');
  const view: GridView = viewParam === 'large' || viewParam === 'list' ? viewParam : 'grid';
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Mobile filter drawer: lock page scroll and close on Escape while open
  useEffect(() => {
    if (!filtersOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFiltersOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [filtersOpen]);

  const categories = useMemo(() => [...new Set(PRODUCTS.map((p) => p.cat))], []);
  const allSizes = useMemo(() => [...new Set(PRODUCTS.flatMap((p) => p.sizes))], []);
  const allColors = useMemo(() => [...new Set(PRODUCTS.flatMap((p) => p.colors))], []);

  const list = useMemo(() => {
    let result = [...PRODUCTS];
    if (cat) result = result.filter((p) => p.cat === cat || (cat === 'Sale' && p.sale));
    if (q) result = result.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.cat.toLowerCase().includes(q.toLowerCase()) || p.sub.toLowerCase().includes(q.toLowerCase()));
    if (sizeParam.length) result = result.filter((p) => p.sizes.some((s) => sizeParam.includes(s)));
    if (colorParam.length) result = result.filter((p) => p.colors.some((c) => colorParam.includes(c)));
    if (minParam) result = result.filter((p) => p.price >= Number(minParam));
    if (maxParam) result = result.filter((p) => p.price <= Number(maxParam));
    if (availParam) result = result.filter((p) => p.avail);

    if (sortParam === 'price-low') result.sort((a, b) => a.price - b.price);
    else if (sortParam === 'price-high') result.sort((a, b) => b.price - a.price);
    else if (sortParam === 'popularity') result.sort((a, b) => b.rating - a.rating);
    else result.sort((a, b) => Number(b.isNew) - Number(a.isNew));

    return result;
  }, [cat, q, sizeParam, colorParam, minParam, maxParam, availParam, sortParam]);

  const updateFilters = (updates: Partial<ShopFilters>) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (updates.cat !== undefined) next.set('cat', updates.cat);
      if (updates.q !== undefined) next.set('q', updates.q);
      if (updates.sizes) {
        next.delete('size');
        updates.sizes.forEach(s => next.append('size', s));
      }
      if (updates.colors) {
        next.delete('color');
        updates.colors.forEach(c => next.append('color', c));
      }
      if (updates.min !== undefined) next.set('min', updates.min);
      if (updates.max !== undefined) next.set('max', updates.max);
      if (updates.avail !== undefined) next.set('avail', String(updates.avail));
      if (updates.sort) next.set('sort', updates.sort);
      return next;
    }, { replace: true });
  };

  const setView = (next: GridView) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (next === 'grid') params.delete('view');
      else params.set('view', next);
      return params;
    }, { replace: true });
  };

  const activeFilters = (cat ? 1 : 0) + sizeParam.length + colorParam.length + (minParam || maxParam ? 1 : 0) + (availParam ? 1 : 0);

  const crumbs: Crumb[] = [{ label: 'Shop', to: '/shop' }];
  if (cat) crumbs.push({ label: cat, to: `/shop?cat=${encodeURIComponent(cat)}` });
  if (q) crumbs.push({ label: `Search: "${q}"` });

  const views: { value: GridView; label: string; icon: ReactNode }[] = [
    { value: 'large', label: 'Large view', icon: <rect x="5" y="5" width="14" height="14" rx="1" /> },
    { value: 'grid', label: 'Grid view', icon: <><rect x="4" y="5" width="7" height="14" rx="1" /><rect x="13" y="5" width="7" height="14" rx="1" /></> },
    { value: 'list', label: 'List view', icon: <><rect x="4" y="5" width="5" height="5" rx="1" /><rect x="4" y="14" width="5" height="5" rx="1" /><path d="M12 7.5h8M12 16.5h8" /></> },
  ];

  return (
    <div className="wrap" style={{ paddingTop: 36 }}>
      <Breadcrumb items={crumbs} />
      <h1 className="page-title">{cat || 'All Products'}</h1>
      <p style={{ color: 'var(--sub)', marginBottom: 30, fontSize: 14 }}>{list.length} products</p>
      <div className="shop-layout">
        <button
          type="button"
          className={`filters-backdrop ${filtersOpen ? 'open' : ''}`}
          aria-label="Close filters"
          tabIndex={filtersOpen ? 0 : -1}
          onClick={() => setFiltersOpen(false)}
        />
        <div id="shop-filters" className={`filters-panel ${filtersOpen ? 'open' : ''}`} aria-label="Filters">
          <div className="filters-panel-head">
            <span>Filters</span>
            <button type="button" className="ctrl-btn" onClick={() => setFiltersOpen(false)} aria-label="Close filters">✕</button>
          </div>
          <Filters
            filters={{ cat, q, sizes: sizeParam, colors: colorParam, min: minParam, max: maxParam, avail: availParam, sort: sortParam }}
            categories={categories}
            allSizes={allSizes}
            allColors={allColors}
            onChange={updateFilters}
            onClear={() => setSearchParams({}, { replace: true })}
          />
          <div className="filters-panel-foot">
            <button type="button" className="btn btn-primary btn-block" onClick={() => setFiltersOpen(false)}>
              Show {list.length} results
            </button>
          </div>
        </div>
        <div className="shop-main">
          <div className="shop-toolbar">
            <span className="result-count">Showing {list.length} results</span>
            <div className="view-toggle" role="group" aria-label="Product view">
              {views.map((v) => (
                <button
                  key={v.value}
                  type="button"
                  className={view === v.value ? 'sel' : ''}
                  aria-pressed={view === v.value}
                  aria-label={v.label}
                  title={v.label}
                  onClick={() => setView(v.value)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">{v.icon}</svg>
                </button>
              ))}
            </div>
            <button
              type="button"
              className="ctrl-btn filter-btn"
              onClick={() => setFiltersOpen(true)}
              aria-expanded={filtersOpen}
              aria-controls="shop-filters"
            >
              Filter{activeFilters > 0 ? ` (${activeFilters})` : ''} <span aria-hidden="true">+</span>
            </button>
            <SortMenu value={sortParam} onChange={(sort) => updateFilters({ sort })} />
          </div>
          <ProductGrid products={list} view={view} />
        </div>
      </div>
    </div>
  );
}
