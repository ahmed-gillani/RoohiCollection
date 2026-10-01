import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { findProduct, PRODUCTS, REVIEWS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import ProductGrid from '@/components/ProductGrid';
import Stars from '@/components/Stars';
import Button from '@/components/Button';
import Breadcrumb from '@/components/Breadcrumb';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isWished, toggleWish } = useWishlist();

  const product = findProduct(Number(id));
  const [size, setSize] = useState(product?.sizes[0] ?? '');
  const [color, setColor] = useState(product?.colors[0] ?? '');
  const [qty, setQty] = useState(1);
  const [imgIndex, setImgIndex] = useState(0);

  if (!product) {
    return (
      <div className="wrap" style={{ paddingBlock: '100px', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <Link className="btn btn-primary" style={{ marginTop: 20 }} to="/shop">Back to Shop</Link>
      </div>
    );
  }

  const wished = isWished(product.id);
  const related = PRODUCTS.filter((r) => r.cat === product.cat && r.id !== product.id).slice(0, 4);

  return (
    <div className="wrap" style={{ paddingTop: 36 }}>
      <Breadcrumb
        items={[
          { label: 'Shop', to: '/shop' },
          { label: product.cat, to: `/shop?cat=${encodeURIComponent(product.cat)}` },
          ...(product.sub !== product.cat
            ? [{ label: product.sub, to: `/shop?cat=${encodeURIComponent(product.cat)}&q=${encodeURIComponent(product.sub)}` }]
            : []),
          { label: product.name },
        ]}
      />
      <div className="pdp">
        <div>
          <div className="pdp-gallery-main">
            <img src={product.gallery[imgIndex]} alt={`${product.name} - View ${imgIndex + 1}`} className="product-image" decoding="async" fetchPriority="high" width={800} height={1067} />
          </div>
          {product.gallery.length > 1 && (
            <div className="thumb-row">
              {[0, 1, 2].map((i) => (
                <div key={i} className={`thumb ${imgIndex === i ? 'sel' : ''}`} onClick={() => setImgIndex(i)}>
                  <img src={product.gallery[i]} alt={`Thumbnail ${i + 1}`} className="product-image" loading="lazy" decoding="async" width={64} height={80} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pdp-info">
          <div className="cat">{product.sub}</div>
          <h1>{product.name}</h1>
          <div className="stars-sm">
            <Stars rating={product.rating} /> <span style={{ color: 'var(--sub)' }}>({product.rating})</span>
          </div>
          <div className="pdp-price">
            {product.orig && <span className="old">${product.orig.toFixed(2)}</span>}
            <span className={product.sale ? 'sale' : ''}>${product.price.toFixed(2)}</span>
          </div>
          <p className="pdp-desc">{product.desc}</p>

          <div className="opt-block">
            <div className="opt-label">Color</div>
            <div className="swatch-row">
              {product.colors.map((c) => (
                <div key={c} className={`swatch ${color === c ? 'sel' : ''}`} style={{ background: c }} onClick={() => setColor(c)} />
              ))}
            </div>
          </div>
          <div className="opt-block">
            <div className="opt-label">Size</div>
            <div className="size-row">
              {product.sizes.map((s) => (
                <div key={s} className={`size-chip ${size === s ? 'sel' : ''}`} onClick={() => setSize(s)}>{s}</div>
              ))}
            </div>
          </div>
          <div className="opt-block">
            <div className="opt-label">Quantity</div>
            <div className="qty-row">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
          </div>

          <div className="pdp-actions">
            <Button variant="outline" disabled={!product.avail} onClick={() => addToCart(product.id, size, color, qty)}>
              {product.avail ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            <Button
              disabled={!product.avail}
              onClick={() => {
                addToCart(product.id, size, color, qty);
                navigate('/checkout');
              }}
            >
              Buy Now
            </Button>
            <Button variant="outline" onClick={() => toggleWish(product.id)}>
              {wished ? '♥ Wishlisted' : '♡ Wishlist'}
            </Button>
          </div>

          <ul className="specs">
            <li>• Fabric: Premium blend, ethically sourced</li>
            <li>• Care: Dry clean recommended</li>
            <li>• SKU: RC-{1000 + product.id}</li>
            <li>• Free shipping on orders over $150</li>
          </ul>

          <div className="reviews-list">
            <div className="step-title" style={{ marginTop: 26 }}>Customer Reviews</div>
            {REVIEWS.slice(0, 2).map((r) => (
              <div className="review-item" key={r.name}>
                <Stars rating={r.stars} className="stars" />
                <div className="who">{r.name}</div>
                <p style={{ fontSize: 13, color: 'var(--sub)', marginTop: 4 }}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section>
        <div className="section-head"><h2>You May Also Like</h2></div>
        <ProductGrid products={related} />
      </section>
    </div>
  );
}
