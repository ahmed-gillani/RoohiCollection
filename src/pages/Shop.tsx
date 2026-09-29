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
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<ShopFilters>({
    ...DEFAULT_FILTERS,
    cat: searchParams.get('cat') ?? '',
    q: searchParams.get('q') ?? '',
  });

  const categories = useMemo(() => [...new Set(PRODUCTS.map((p) => p.cat))], []);
  const allSizes = useMemo(() => [...new Set(PRODUCTS.flatMap((p) => p.sizes))], []);
  const allColors = useMemo(() => [...new Set(PRODUCTS.flatMap((p) => p.colors))], []);

  const list = useMemo(() => {
    let result = [...PRODUCTS];
    if (filters.cat) result = result.filter((p) => p.cat === filters.cat || (filters.cat === 'Sale' && p.sale));
    if (filters.q) result = result.filter((p) => p.name.toLowerCase().includes(filters.q.toLowerCase()));
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
  }, [filters]);

  const updateFilters = (next: Partial<ShopFilters>) => setFilters((prev) => ({ ...prev, ...next }));

  return (
    <div className="wrap" style={{ paddingTop: 36 }}>
      <div className="breadcrumb">
        <Link to="/">Home</Link> / Shop
      </div>
      <h1 className="page-title">{filters.cat || 'All Products'}</h1>
      <p style={{ color: 'var(--sub)', marginBottom: 30, fontSize: 14 }}>{list.length} products</p>
      <div className="shop-layout">
        <Filters
          filters={filters}
          categories={categories}
          allSizes={allSizes}
          allColors={allColors}
          onChange={updateFilters}
          onClear={() => setFilters(DEFAULT_FILTERS)}
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
