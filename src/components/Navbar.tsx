import { useState } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

const navItems = ['Home', 'Shop', 'Boys', 'Girls', 'Infants', 'Sale'] as const;

function isNavActive(location: ReturnType<typeof useLocation>, item: string, searchParams: URLSearchParams) {
  const path = location.pathname;
  if (item === 'Home') return path === '/';
  if (item === 'Shop') return (path === '/shop' || path.startsWith('/product/')) && !searchParams.has('cat');
  return path === '/shop' && searchParams.get('cat') === item;
}

function getNavHref(item: string) {
  if (item === 'Home') return '/';
  if (item === 'Shop') return '/shop';
  return `/shop?cat=${encodeURIComponent(item)}`;
}

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
);

const AccountIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

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
        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item}
              to={getNavHref(item)}
              className={isNavActive(location, item, searchParams) ? 'active' : ''}
            >
              {item}
            </Link>
          ))}
        </nav>
        <div className="nav-icons">
          <div className="search-box">
            <SearchIcon />
            <input placeholder="Search products..." onKeyDown={handleSearch} aria-label="Search" />
          </div>
          <button className="icon-btn" onClick={() => navigate('/account')} aria-label="My Account" title="Account">
            <AccountIcon />
          </button>
          <button className="icon-btn" onClick={() => navigate('/wishlist')} aria-label={`Wishlist (${wishlist.length})`} title="Wishlist">
            <HeartIcon />
            {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
          </button>
          <button className="icon-btn" onClick={() => navigate('/cart')} aria-label={`Shopping cart (${count})`} title="Cart">
            <CartIcon />
            {count > 0 && <span className="badge">{count}</span>}
          </button>
          <button
            className="hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <MenuIcon />
          </button>
        </div>
      </div>
      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="search-box-mobile wrap" style={{ margin: '12px 0', padding: '0 24px' }}>
          <SearchIcon />
          <input
            placeholder="Search..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const value = (e.target as HTMLInputElement).value;
                navigate(`/shop?q=${encodeURIComponent(value)}`);
                setMenuOpen(false);
              }
            }}
            aria-label="Search"
          />
        </div>
        <div className="wrap" style={{ padding: '0 24px' }}>
          {navItems.map((item) => (
            <Link
              key={item}
              to={getNavHref(item)}
              onClick={() => setMenuOpen(false)}
              className={isNavActive(location, item, searchParams) ? 'active' : ''}
              style={{ display: 'block', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,.1)' }}
            >
              {item}
            </Link>
          ))}
          <Link to="/account" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '12px 0' }}>Account</Link>
        </div>
      </div>
    </header>
  );
}
