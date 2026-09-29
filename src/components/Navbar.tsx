import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = (e.target as HTMLInputElement).value;
      navigate(`/shop?q=${encodeURIComponent(value)}`);
      setMenuOpen(false);
    }
  };

  return (
    <header>
     
      <div className="wrap nav">
        <Link to="/" className="logo">RoohiCollection</Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/shop?cat=Boys">Boys</Link>
          <Link to="/shop?cat=Girls">Girls</Link>
          <Link to="/shop?cat=Infants">Infants</Link>
          <Link to="/shop?cat=Sale">Sale</Link>
        </nav>
        <div className="nav-icons">
          <div className="search-box">
            <span>⌕</span>
            <input placeholder="Search products..." onKeyDown={handleSearch} />
          </div>
          <button className="icon-btn" onClick={() => navigate('/account')} aria-label="Account">☺</button>
          <button className="icon-btn" onClick={() => navigate('/wishlist')} aria-label="Wishlist">
            ♡{wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
          </button>
          <button className="icon-btn" onClick={() => navigate('/cart')} aria-label="Cart">
            ⛃{count > 0 && <span className="badge">{count}</span>}
          </button>
          <button className="hamburger" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">☰</button>
        </div>
      </div>
      <div className={`wrap mobile-menu ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
        <Link to="/shop?cat=Boys" onClick={() => setMenuOpen(false)}>Boys</Link>
        <Link to="/shop?cat=Girls" onClick={() => setMenuOpen(false)}>Girls</Link>
        <Link to="/shop?cat=Infants" onClick={() => setMenuOpen(false)}>Infants</Link>
        <Link to="/shop?cat=Sale" onClick={() => setMenuOpen(false)}>Sale</Link>
        <Link to="/account" onClick={() => setMenuOpen(false)}>Account</Link>
      </div>
    </header>
  );
}
