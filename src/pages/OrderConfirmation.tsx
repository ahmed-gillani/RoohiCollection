import { Link } from 'react-router-dom';
import { useOrder } from '@/context/OrderContext';

export default function OrderConfirmation() {
  const { lastOrder } = useOrder();

  if (!lastOrder) {
    return (
      <div className="wrap" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>No recent order found</h2>
        <Link className="btn btn-primary" style={{ marginTop: 20 }} to="/shop">Go to Shop</Link>
      </div>
    );
  }

  return (
    <div className="wrap" style={{ padding: '60px 0 90px' }}>
      <div className="confirm-box">
        <div className="ic">✓</div>
        <h1 className="serif" style={{ fontSize: 30 }}>Thank you, your order is confirmed!</h1>
        <p style={{ color: 'var(--sub)', marginTop: 10 }}>
          Order #{lastOrder.id} · A confirmation has been sent to {lastOrder.email}
        </p>
        <div className="order-box">
          {lastOrder.items.map((i) => (
            <div className="row" key={`${i.pid}-${i.size}-${i.color}`}>
              <span>{i.product.name} ({i.size}) × {i.qty}</span>
              <span>${(i.product.price * i.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="row" style={{ borderTop: '1px solid var(--line)', marginTop: 8, paddingTop: 10, color: 'var(--ink)', fontWeight: 700 }}>
            <span>Total</span><span>${lastOrder.total.toFixed(2)}</span>
          </div>
          <div className="row" style={{ marginTop: 10 }}>
            <span>Shipping to</span><span>{lastOrder.address}</span>
          </div>
        </div>
        <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
      </div>
    </div>
  );
}
