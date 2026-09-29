import { Link } from 'react-router-dom';
import { PRODUCTS } from '@/data/products';
import { useWishlist } from '@/context/WishlistContext';
import ProductGrid from '@/components/ProductGrid';
import EmptyState from '@/components/EmptyState';

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));

  if (!items.length) {
    return (
      <div className="wrap">
        <EmptyState
          icon="♡"
          title="Your wishlist is empty"
          message="Save items you love for later."
          action={<Link className="btn btn-primary" to="/shop">Browse Products</Link>}
        />
      </div>
    );
  }

  return (
    <div className="wrap" style={{ padding: '36px 0 80px' }}>
      <h1 className="page-title">Your Wishlist</h1>
      <p style={{ color: 'var(--sub)', marginBottom: 26 }}>{items.length} items</p>
      <ProductGrid products={items} />
    </div>
  );
}
