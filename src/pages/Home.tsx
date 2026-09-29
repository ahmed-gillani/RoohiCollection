import { Link } from 'react-router-dom';
import { PRODUCTS, REVIEWS } from '@/data/products';
import ProductGrid from '@/components/ProductGrid';
import Stars from '@/components/Stars';
import Button from '@/components/Button';
import { useToast } from '@/context/ToastContext';

import heroKids from '@/assets/hero-kids.jpg';
import boysImg from '@/assets/categories/boys.jpg';
import girlsImg from '@/assets/categories/girls.jpg';
import infantsImg from '@/assets/categories/infants.jpg';
import newArrivalsImg from '@/assets/categories/new-arrivals.jpg';
import traditionalImg from '@/assets/categories/traditional.jpg';
import saleImg from '@/assets/categories/sale.jpg';

const CATEGORIES: [string, string][] = [
  ["Women's Clothing", girlsImg],
  ["Men's Clothing", boysImg],
  ['Dresses', infantsImg],
  ['Traditional Wear', traditionalImg],
  ['New Arrivals', newArrivalsImg],
  ['Sale', saleImg],
];

export default function Home() {
  const { showToast } = useToast();
  const featured = PRODUCTS.slice(0, 4);
  const arrivals = PRODUCTS.filter((p) => p.isNew).slice(0, 4);
  const bestSellers = [...PRODUCTS].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <>
      <section className="hero" style={{ backgroundImage: `url(${heroKids})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="wrap">
          <p className="kicker">Autumn Collection 2026</p>
          <h1>Elegance, <br />Woven Into Every Thread</h1>
          <p className="sub">
            Discover RoohiCollections — considered clothing crafted from premium fabrics, designed for every moment of your life.
          </p>
          <Link to="/shop" className="btn btn-primary">Shop The Collection</Link>
        </div>
      </section>

      <section className="wrap">
        <div className="section-head">
          <h2>Featured Products</h2>
          <Link to="/shop">View All →</Link>
        </div>
        <ProductGrid products={featured} />
      </section>

      <section className="wrap" style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="section-head">
          <h2>New Arrivals</h2>
          <Link to="/shop?cat=New Arrivals">View All →</Link>
        </div>
        <ProductGrid products={arrivals} />
      </section>

      <section className="wrap">
        <div className="section-head"><h2>Shop by Category</h2></div>
        <div className="cat-grid">
          {CATEGORIES.map(([name, icon]) => (
            <Link className="cat-tile" key={name} to={`/shop?cat=${encodeURIComponent(name)}`}>
              <div className="ic">
                <img src={icon} alt={name} className="product-image" />
              </div>
              <h4>{name}</h4>
            </Link>
          ))}
        </div>
      </section>

      <section className="promo">
        <div className="wrap">
          <h2 className="serif">End of Season Sale — Up to 40% Off</h2>
          <p>Refresh your wardrobe with premium pieces at exceptional prices.</p>
          <Link to="/shop?cat=Sale" className="btn btn-gold">Shop the Sale</Link>
        </div>
      </section>

      <section className="wrap">
        <div className="section-head">
          <h2>Best Sellers</h2>
          <Link to="/shop">View All →</Link>
        </div>
        <ProductGrid products={bestSellers} />
      </section>

      <section className="wrap">
        <div className="section-head"><h2>What Our Customers Say</h2></div>
        <div className="rev-grid">
          {REVIEWS.map((r) => (
            <div className="rev-card" key={r.name}>
              <Stars rating={r.stars} className="stars" />
              <p>"{r.text}"</p>
              <div className="rev-name">{r.name}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="newsletter">
        <h2 className="serif" style={{ fontSize: 26 }}>Join the RoohiCollections Circle</h2>
        <p style={{ color: 'var(--sub)', fontSize: 14, marginTop: 8 }}>
          Be first to know about new arrivals and exclusive offers.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            showToast('Subscribed successfully!');
            e.currentTarget.reset();
          }}
        >
          <input type="email" required placeholder="Enter your email address" />
          <Button type="submit">Subscribe</Button>
        </form>
      </div>
    </>
  );
}
