import { useNavigate } from 'react-router-dom';
import type { Product } from '@/types/product';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import Button from '@/components/Button';

export default function ProductCard({ product }: { product: Product }) {
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
          aria-label="Toggle wishlist"
        >
          {wished ? '♥' : '♡'}
        </button>
        <img src={product.image} alt={product.name} className="product-image" />
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
