import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { findProduct } from '@/data/products';
import EmptyState from '@/components/EmptyState';
import Button from '@/components/Button';
import Breadcrumb from '@/components/Breadcrumb';

export default function Cart() {
  const { cart, subtotal, changeQty, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (!cart.length) {
    return (
      <div className="wrap">
        <EmptyState
          icon="⛃"
          title="Your cart is empty"
          message="Looks like you haven't added anything yet."
          action={<Link className="btn btn-primary" to="/shop">Start Shopping</Link>}
        />
      </div>
    );
  }

  const shipping = subtotal > 150 ? 0 : 9.99;

  return (
    <div className="wrap" style={{ paddingTop: '36px', paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'Cart' }]} />
      <h1 className="page-title">Shopping Cart</h1>
      <div className="cart-grid">
        <div className="overflow-x">
          {cart.map((c, i) => {
            const p = findProduct(c.pid)!;
            return (
              <div className="cart-row" style={{ minWidth: 520 }} key={`${c.pid}-${c.size}-${c.color}`}>
                <img src={p.image} alt={p.name} className="cart-thumb product-image" loading="lazy" decoding="async" width={80} height={100} />
                <div className="cart-meta">
                  <div className="name">{p.name}</div>
                  <div className="opt">
                    Size: {c.size} · Color swatch:{' '}
                    <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: c.color, border: '1px solid var(--line)', verticalAlign: 'middle' }} />
                  </div>
                </div>
                <div className="qty-row">
                  <button onClick={() => changeQty(i, -1)}>−</button>
                  <span>{c.qty}</span>
                  <button onClick={() => changeQty(i, 1)}>+</button>
                </div>
                <div style={{ fontWeight: 600 }}>${(p.price * c.qty).toFixed(2)}</div>
                <button onClick={() => removeFromCart(i)} style={{ color: 'var(--sale)', fontSize: 13 }}>Remove</button>
              </div>
            );
          })}
        </div>
        <div className="cart-summary">
          <h3 style={{ marginBottom: 14 }}>Order Summary</h3>
          <div className="sum-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="sum-row"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
          <div className="sum-row total"><span>Total</span><span>${(subtotal + shipping).toFixed(2)}</span></div>
          <Button block onClick={() => navigate('/checkout')} className="mt">Proceed to Checkout</Button>
          <Link to="/shop" style={{ display: 'block', textAlign: 'center', fontSize: 13, marginTop: 14, color: 'var(--link)' }}>
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
