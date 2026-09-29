import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useOrder } from '@/context/OrderContext';
import { findProduct } from '@/data/products';
import Button from '@/components/Button';

type ShipMethod = 'standard' | 'express';
type PayMethod = 'card' | 'cod';

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart();
  const { placeOrder } = useOrder();
  const navigate = useNavigate();
  const [shipMethod, setShipMethod] = useState<ShipMethod>('standard');
  const [payMethod, setPayMethod] = useState<PayMethod>('card');

  if (!cart.length) return <Navigate to="/cart" replace />;

  const shipping = shipMethod === 'express' ? 18 : subtotal > 150 ? 0 : 9.99;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const orderItems = cart.map((c) => ({ ...c, product: findProduct(c.pid)! }));
    placeOrder({
      id: 'RC-' + Math.floor(100000 + Math.random() * 899999),
      name: String(fd.get('fullName')),
      email: String(fd.get('email')),
      address: `${fd.get('address')}, ${fd.get('city')} ${fd.get('postal')}`,
      items: orderItems,
      total: subtotal + shipping,
    });
    clearCart();
    navigate('/confirmation');
  };

  return (
    <div className="wrap" style={{ padding: '36px 0 80px' }}>
      <h1 className="page-title">Checkout</h1>
      <div className="checkout-grid">
        <form onSubmit={handleSubmit}>
          <div className="step-title">1. Customer Information</div>
          <div className="form-row2">
            <div className="form-field"><label>Full Name</label><input required name="fullName" placeholder="Jane Doe" /></div>
            <div className="form-field"><label>Email</label><input required type="email" name="email" placeholder="jane@email.com" /></div>
          </div>
          <div className="form-row2">
            <div className="form-field"><label>Phone</label><input required name="phone" placeholder="+1 555 000 0000" /></div>
            <div className="form-field"><label>City</label><input required name="city" placeholder="New York" /></div>
          </div>
          <div className="form-row2">
            <div className="form-field"><label>Address</label><input required name="address" placeholder="123 Fifth Ave" /></div>
            <div className="form-field"><label>Postal Code</label><input required name="postal" placeholder="10001" /></div>
          </div>

          <div className="step-title">2. Shipping Method</div>
          <div className={`radio-card ${shipMethod === 'standard' ? 'sel' : ''}`} onClick={() => setShipMethod('standard')}>
            <input type="radio" name="ship" checked={shipMethod === 'standard'} readOnly /> Standard (3–5 days) — {subtotal > 150 ? 'Free' : '$9.99'}
          </div>
          <div className={`radio-card ${shipMethod === 'express' ? 'sel' : ''}`} onClick={() => setShipMethod('express')}>
            <input type="radio" name="ship" checked={shipMethod === 'express'} readOnly /> Express (1–2 days) — $18.00
          </div>

          <div className="step-title">3. Payment Method</div>
          <div className={`radio-card ${payMethod === 'card' ? 'sel' : ''}`} onClick={() => setPayMethod('card')}>
            <input type="radio" name="pay" checked={payMethod === 'card'} readOnly /> Credit / Debit Card
          </div>
          <div className={`radio-card ${payMethod === 'cod' ? 'sel' : ''}`} onClick={() => setPayMethod('cod')}>
            <input type="radio" name="pay" checked={payMethod === 'cod'} readOnly /> Cash on Delivery
          </div>
          {payMethod === 'card' && (
            <div className="form-row2" style={{ marginTop: 12 }}>
              <div className="form-field"><label>Card Number</label><input required placeholder="4242 4242 4242 4242" /></div>
              <div className="form-field"><label>Expiry</label><input required placeholder="MM/YY" /></div>
            </div>
          )}
          <Button block type="submit" style={{ marginTop: 10 }}>Place Order</Button>
        </form>

        <div className="cart-summary">
          <h3 style={{ marginBottom: 14 }}>Order Summary</h3>
          {cart.map((c) => {
            const p = findProduct(c.pid)!;
            return (
              <div className="sum-row" key={`${c.pid}-${c.size}-${c.color}`}>
                <span>{p.name} × {c.qty}</span><span>${(p.price * c.qty).toFixed(2)}</span>
              </div>
            );
          })}
          <div className="sum-row"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
          <div className="sum-row total"><span>Total</span><span>${(subtotal + shipping).toFixed(2)}</span></div>
        </div>
      </div>
    </div>
  );
}
