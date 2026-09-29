import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '@/data/products';
import ProductGrid from '@/components/ProductGrid';
import Filters from '@/components/Filters';
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

  return (
    <div className="wrap" style={{ paddingTop: 36 }}>
      <div className="breadcrumb">
        <Link to="/">Home</Link> / Shop
      </div>
      <h1 className="page-title">{cat || 'All Products'}</h1>
      <p style={{ color: 'var(--sub)', marginBottom: 30, fontSize: 14 }}>{list.length} products</p>
      <div className="shop-layout">
        <Filters
          filters={{ cat, q, sizes: sizeParam, colors: colorParam, min: minParam, max: maxParam, avail: availParam, sort: sortParam }}
          categories={categories}
          allSizes={allSizes}
          allColors={allColors}
          onChange={updateFilters}
          onClear={() => setSearchParams({}, { replace: true })}
        />
        <div>
          <div className="shop-toolbar">
            <span style={{ fontSize: 13, color: 'var(--sub)' }}>Showing {list.length} results</span>
            <select value={sortParam} onChange={(e) => updateFilters({ sort: e.target.value as ShopFilters['sort'] })}>
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
