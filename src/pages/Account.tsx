import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useOrder } from '@/context/OrderContext';
import { useWishlist } from '@/context/WishlistContext';
import { PRODUCTS } from '@/data/products';
import ProductGrid from '@/components/ProductGrid';
import Button from '@/components/Button';
import AuthModal from '@/components/AuthModal';

export default function Account() {
  const { user, logout } = useAuth();
  const { lastOrder } = useOrder();
  const { wishlist } = useWishlist();
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  if (!user) {
    return (
      <div className="wrap" style={{ padding: '90px 0', textAlign: 'center' }}>
        <h1 className="page-title">My Account</h1>
        <p style={{ color: 'var(--sub)', marginBottom: 24 }}>
          Sign in to view your orders, wishlist and saved details.
        </p>
        <Button onClick={() => { setAuthMode('login'); setAuthOpen(true); }}>Login</Button>{' '}
        <Button variant="outline" onClick={() => { setAuthMode('register'); setAuthOpen(true); }}>Register</Button>
        <AuthModal open={authOpen} initialMode={authMode} onClose={() => setAuthOpen(false)} />
      </div>
    );
  }

  const wishedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="wrap" style={{ padding: '50px 0 90px' }}>
      <h1 className="page-title">Welcome, {user.name}</h1>
      <p style={{ color: 'var(--sub)', marginBottom: 30 }}>{user.email}</p>

      <div className="step-title">Order History</div>
      {lastOrder ? (
        <div className="order-box">
          <div className="row"><span>Order #{lastOrder.id}</span><span>${lastOrder.total.toFixed(2)}</span></div>
        </div>
      ) : (
        <p style={{ color: 'var(--sub)', fontSize: 14 }}>No orders yet.</p>
      )}

      <div className="step-title">Wishlist</div>
      {wishedProducts.length ? (
        <ProductGrid products={wishedProducts} />
      ) : (
        <p style={{ color: 'var(--sub)', fontSize: 14 }}>No wishlist items yet.</p>
      )}

      <Button variant="outline" style={{ marginTop: 30 }} onClick={logout}>Log Out</Button>
    </div>
  );
}
