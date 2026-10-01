import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import type { Product } from '@/types/product';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import Button from '@/components/Button';

function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const navigate = useNavigate();
  const { isWished, toggleWish } = useWishlist();
  const { addToCart } = useCart();
  const wished = isWished(product.id);

  return (
    <div className="card" onClick={() => navigate(`/product/${product.id}`)}>
      <div className="card-img">
        {product.sale && <span className="tag sale">Sale</span>}
        {!product.sale && product.isNew && <span className="tag new">New</span>}
        <button
          className={`wish ${wished ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWish(product.id);
          }}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={wished}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={wished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
        <img src={product.image} alt={product.name} className="product-image" loading={priority ? "eager" : "lazy"} decoding="async" width={800} height={1067} fetchPriority={priority ? "high" : undefined} />
      </div>
      <div className="card-info">
        <div className="cat">{product.sub}</div>
        <h3>{product.name}</h3>
        <div className="price-row">
          {product.orig && <span className="old">${product.orig.toFixed(2)}</span>}
          <span className={`now ${product.sale ? 'sale' : ''}`}>${product.price.toFixed(2)}</span>
        </div>
        <div className="card-cta">
          <Button
            variant="outline"
            size="sm"
            block
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product.id, product.sizes[0], product.colors[0], 1);
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);
