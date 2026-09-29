# RoohiCollections — React + TypeScript

```
npm install
npm run dev
```

## Structure
```
src/
  types/       # shared TS interfaces
  data/        # product + review data
  context/     # Cart, Wishlist, Auth, Toast, Order (React Context)
  components/  # Navbar, Footer, ProductCard, ProductGrid, Filters, Button, Modal, AuthModal, Toast, Stars, EmptyState
  pages/       # Home, Shop, ProductDetail, Cart, Wishlist, Checkout, OrderConfirmation, Account, NotFound
  App.tsx
  main.tsx
  index.css
```

Routing: `react-router-dom`. State: Context API (no external store). Auth/orders are client-side only (no backend).
