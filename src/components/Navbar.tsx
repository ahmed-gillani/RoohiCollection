import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useTheme } from '@/context/ThemeContext';
import { PRODUCTS } from '@/data/products';

const navItems = ['Home', 'Shop', 'Boys', 'Girls', 'Infants', 'Sale'] as const;
// Mobile menu lists every category that exists in the product data
const menuItems = ['Home', 'Shop', ...new Set(PRODUCTS.map((p) => p.cat))];

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

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
  </svg>
);

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
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
  const [searchOpen, setSearchOpen] = useState(false);
  const { count } = useCart();
  const { wishlist } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const mobileSearchRef = useRef<HTMLInputElement>(null);

  // Close panels whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!menuOpen && !searchOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    if (searchOpen) mobileSearchRef.current?.focus();
  }, [searchOpen]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = (e.target as HTMLInputElement).value;
      navigate(`/shop?q=${encodeURIComponent(value)}`);
      setMenuOpen(false);
      setSearchOpen(false);
    }
  };

  const toggleMenu = () => {
    setSearchOpen(false);
    setMenuOpen((o) => !o);
  };

  const toggleSearch = () => {
    setMenuOpen(false);
    setSearchOpen((o) => !o);
  };

  return (
    <header>
      <div className="wrap nav">
        <div className="nav-start">
          <button
            className="icon-btn hamburger"
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
          <Link to="/" className="logo">RoohiCollection</Link>
        </div>
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
          <button
            className="icon-btn search-toggle"
            onClick={toggleSearch}
            aria-label="Search"
            aria-expanded={searchOpen}
            aria-controls="mobile-search"
          >
            <SearchIcon />
          </button>
          <button
            className="icon-btn theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
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
        </div>
      </div>

      <div id="mobile-search" className={`mobile-search ${searchOpen ? 'open' : ''}`}>
        <div className="wrap">
          <div className="mobile-search-field">
            <SearchIcon />
            <input ref={mobileSearchRef} type="search" placeholder="Search products..." onKeyDown={handleSearch} aria-label="Search products" />
          </div>
        </div>
      </div>

      <nav id="mobile-menu" className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-label="Mobile navigation">
        {/* Also close when tapping a link to the page already open (no route change) */}
        <div className="wrap" onClick={(e) => { if ((e.target as HTMLElement).closest('a')) setMenuOpen(false); }}>
          {menuItems.map((item) => (
            <Link
              key={item}
              to={getNavHref(item)}
              className={isNavActive(location, item, searchParams) ? 'active' : ''}
            >
              {item === 'Shop' ? 'Shop All' : item}
            </Link>
          ))}
          <div className="mobile-menu-sep" />
          <Link to="/account">Account</Link>
          <Link to="/wishlist">Wishlist{wishlist.length > 0 ? ` (${wishlist.length})` : ''}</Link>
          <button type="button" className="mobile-menu-theme" onClick={toggleTheme}>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </nav>
    </header>
  );
}
