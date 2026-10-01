import type { Product } from '@/types/product';
import ProductCard from '@/components/ProductCard';
import EmptyState from '@/components/EmptyState';

export type GridView = 'grid' | 'large' | 'list';

export default function ProductGrid({ products, view = 'grid' }: { products: Product[]; view?: GridView }) {
  if (!products.length) {
    return <EmptyState icon="🔍" title="No products found" message="Try adjusting your filters or search." />;
  }
  return (
    <div className={`grid grid--${view}`}>
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < 4} />
      ))}
    </div>
  );
}
