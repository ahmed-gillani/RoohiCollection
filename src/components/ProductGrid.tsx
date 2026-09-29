import type { Product } from '@/types/product';
import ProductCard from '@/components/ProductCard';
import EmptyState from '@/components/EmptyState';

export default function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return <EmptyState icon="🔍" title="No products found" message="Try adjusting your filters or search." />;
  }
  return (
    <div className="grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
