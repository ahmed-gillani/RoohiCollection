import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <h5 className="serif" style={{ fontSize: 18, textTransform: 'none' }}>RoohiCollection</h5>
            <p style={{ fontSize: 13, color: 'var(--sub)', maxWidth: 260, marginTop: 10, lineHeight: 1.6 }}>
              Quality clothing for kids at every stage. Designed with comfort and style in mind.
            </p>
          </div>
          <div>
            <h5>Shop</h5>
            <ul>
              <li><Link to="/shop?cat=New%20Arrivals">New Arrivals</Link></li>
              <li><Link to="/shop?cat=Boys">Boys</Link></li>
              <li><Link to="/shop?cat=Girls">Girls</Link></li>
              <li><Link to="/shop?cat=Infants">Infants</Link></li>
              <li><Link to="/shop?cat=Sale">Sale</Link></li>
            </ul>
          </div>
          <div>
            <h5>Help</h5>
            <ul>
              <li>Shipping</li><li>Returns</li><li>Size Guide</li><li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              <li>About Us</li><li>Careers</li><li>Sustainability</li><li>Press</li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">© 2026 RoohiCollection. All rights reserved.</div>
      </div>
    </footer>
  );
}
