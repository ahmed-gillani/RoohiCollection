export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <h5 className="serif" style={{ fontSize: 18, textTransform: 'none' }}>RoohiCollections</h5>
            <p style={{ fontSize: 13, color: 'var(--sub)', maxWidth: 260, marginTop: 10, lineHeight: 1.6 }}>
              Considered clothing for everyday elegance. Designed with intention, made to last.
            </p>
          </div>
          <div>
            <h5>Shop</h5>
            <ul>
              <li>New Arrivals</li><li>Women's Clothing</li><li>Men's Clothing</li><li>Sale</li>
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
        <div className="foot-bottom">© 2026 RoohiCollections. All rights reserved.</div>
      </div>
    </footer>
  );
}
