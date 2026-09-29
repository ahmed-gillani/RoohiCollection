import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '@/data/products';
import ProductGrid from '@/components/ProductGrid';
import Filters from '@/components/Filters';
import type { ShopFilters } from '@/types/product';

const DEFAULT_FILTERS: ShopFilters = {
  cat: '', q: '', sizes: [], colors: [], min: '', max: '', avail: false, sort: 'newest',
};

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<ShopFilters>({
    ...DEFAULT_FILTERS,
    sizes: [],
    colors: [],
    min: '',
    max: '',
    avail: false,
    sort: 'newest',
  });

  const categories = useMemo(() => [...new Set(PRODUCTS.map((p) => p.cat))], []);
  const allSizes = useMemo(() => [...new Set(PRODUCTS.flatMap((p) => p.sizes))], []);
  const allColors = useMemo(() => [...new Set(PRODUCTS.flatMap((p) => p.colors))], []);

  const cat = searchParams.get('cat') ?? '';
  const q = searchParams.get('q') ?? '';

  const list = useMemo(() => {
    let result = [...PRODUCTS];
    if (cat) result = result.filter((p) => p.cat === cat || (cat === 'Sale' && p.sale));
    if (q) result = result.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
    if (filters.sizes.length) result = result.filter((p) => p.sizes.some((s) => filters.sizes.includes(s)));
    if (filters.colors.length) result = result.filter((p) => p.colors.some((c) => filters.colors.includes(c)));
    if (filters.min) result = result.filter((p) => p.price >= Number(filters.min));
    if (filters.max) result = result.filter((p) => p.price <= Number(filters.max));
    if (filters.avail) result = result.filter((p) => p.avail);

    if (filters.sort === 'price-low') result.sort((a, b) => a.price - b.price);
    else if (filters.sort === 'price-high') result.sort((a, b) => b.price - a.price);
    else if (filters.sort === 'popularity') result.sort((a, b) => b.rating - a.rating);
    else result.sort((a, b) => Number(b.isNew) - Number(a.isNew));

    return result;
  }, [cat, q, filters]);

  const updateFilters = (next: Partial<ShopFilters>) => {
    if (next.cat !== undefined) {
      if (next.cat) {
        setSearchParams({ cat: next.cat, q }, { replace: true });
      } else {
        setSearchParams(q ? { q } : {}, { replace: true });
      }
    } else if (next.q !== undefined) {
      if (next.q) {
        setSearchParams({ q: next.q, ...(cat ? { cat } : {}) }, { replace: true });
      } else {
        setSearchParams(cat ? { cat } : {}, { replace: true });
      }
    } else {
      setFilters((prev) => ({ ...prev, ...next }));
    }
  };

  return (
    <div className="wrap" style={{ paddingTop: 36 }}>
      <div className="breadcrumb">
        <Link to="/">Home</Link> / Shop
      </div>
      <h1 className="page-title">{cat || 'All Products'}</h1>
      <p style={{ color: 'var(--sub)', marginBottom: 30, fontSize: 14 }}>{list.length} products</p>
      <div className="shop-layout">
        <Filters
          filters={{ ...filters, cat, q }}
          categories={categories}
          allSizes={allSizes}
          allColors={allColors}
          onChange={updateFilters}
          onClear={() => {
            setSearchParams({}, { replace: true });
            setFilters(DEFAULT_FILTERS);
          }}
        />
        <div>
          <div className="shop-toolbar">
            <span style={{ fontSize: 13, color: 'var(--sub)' }}>Showing {list.length} results</span>
            <select value={filters.sort} onChange={(e) => updateFilters({ sort: e.target.value as ShopFilters['sort'] })}>
              <option value="newest">Sort: Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
          <ProductGrid products={list} />
        </div>
      </div>
    </div>
  );
}
