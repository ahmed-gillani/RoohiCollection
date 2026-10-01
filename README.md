# RoohiCollection

A kids' clothing storefront built with **React**, **TypeScript** and **Vite**. It covers the full shopping flow (browse, filter, wishlist, cart, checkout) with a light/dark theme and a mobile-first responsive layout. All data is client-side; there is no backend.

## Features

- **Browsing:** Home page (featured, new arrivals, categories, best sellers, reviews, newsletter), Shop listing and product detail pages.
- **Categories:** Boys, Girls, Infants, Traditional, New Arrivals and Sale, taken from the product data.
- **Search:** from the header. On mobile, the search icon opens a search field.
- **Filters:** category, size, colour, price range and in-stock only.
- **Sort:** Newest, Price: Low to High, Price: High to Low, Popularity.
- **View modes:** standard grid, large (one card per row on phones) and list.
- **Shareable state:** filters, sort and view are stored in the URL, so links and the back button keep them.
- **Breadcrumbs:** built from the route, e.g. `Home › Shop › Boys › Jackets › Product`.
- **Cart and wishlist:** add, remove and change quantity, with counts on the header icons.
- **Checkout and order confirmation.**
- **Account:** mock login/register modal, plus an account page with orders and wishlist.
- **Light/dark theme:** a toggle in the header (or in the menu on mobile). The choice is saved, falls back to the system setting, and loads without a flash.
- **Responsive:**
  - Mobile header: menu and logo on the left; search, account, wishlist and cart on the right.
  - Slide-in filter panel on mobile and tablet.
  - Two product cards per row on phones.
  - No sideways scrolling.

## Tech stack

| | |
|---|---|
| UI | React 18 + TypeScript 5 |
| Routing | react-router-dom 6 |
| Build | Vite 5 (`@` alias → `src/`) |
| State | React Context API (no external store) |
| Styling | Plain CSS with custom properties (`src/index.css`) |

## Getting started

Requires **Node.js 18+**.

```bash
npm install
npm run dev       # start the dev server
```

| Script | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check (`tsc -b`) and build for production into `dist/` |
| `npm run preview` | Serve the production build locally |

## Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/shop` | Product listing (search, filters, sort, view) |
| `/product/:id` | Product detail |
| `/cart` | Shopping cart |
| `/wishlist` | Wishlist |
| `/checkout` | Checkout |
| `/confirmation` | Order confirmation |
| `/account` | Account / login / register |
| `*` | 404 Not Found |

### Shop URL parameters

| Param | Example | Meaning |
|---|---|---|
| `cat` | `cat=Girls` | Category |
| `q` | `q=dress` | Search (matches name, category and sub-category) |
| `size` | `size=2-3Y&size=4-5Y` | Sizes (repeatable) |
| `color` | `color=%23ffffff` | Colours (repeatable, hex) |
| `min` / `max` | `min=20&max=40` | Price range |
| `avail` | `avail=true` | In stock only |
| `sort` | `sort=price-low` | `newest`, `price-low`, `price-high` or `popularity` |
| `view` | `view=list` | `large` or `list` (the grid view is the default when the param is omitted) |

Example: `/shop?cat=Girls&sort=price-low&view=list`

## Project structure

```
index.html              # sets the saved/system theme before first paint
src/
  main.tsx              # app entry (BrowserRouter)
  App.tsx               # providers + routes
  index.css             # all styles, theme tokens, breakpoints
  types/product.ts      # Product, CartItem, Order, User, ShopFilters
  data/products.ts      # product catalogue + reviews
  assets/               # hero, category and product images
  context/
    ThemeContext.tsx    # light/dark theme + toggle
    CartContext.tsx
    WishlistContext.tsx
    AuthContext.tsx     # mock auth
    OrderContext.tsx
    ToastContext.tsx
  components/
    Navbar.tsx          # header, mobile menu and search panel
    Footer.tsx
    Breadcrumb.tsx      # route-based breadcrumb
    ProductGrid.tsx     # grid / large / list views
    ProductCard.tsx
    Filters.tsx         # filter controls (sidebar or mobile panel)
    SortMenu.tsx        # "Sort +" dropdown
    AuthModal.tsx, Modal.tsx, Button.tsx, Toast.tsx,
    Stars.tsx, EmptyState.tsx, ScrollToTop.tsx
  pages/
    Home, Shop, ProductDetail, Cart, Wishlist,
    Checkout, OrderConfirmation, Account, NotFound
```

## Theming

All colours are CSS custom properties defined at the top of `src/index.css`:

- **Page:** `--bg`, `--surface`, `--ink`, `--sub`, `--line`
- **Accents:** `--gold`, `--gold-d`, `--link`, `--sale`, `--accent-hover`
- **Header and footer:** `--hdr-bg`, `--hdr-fg`, `--hdr-line`, `--hdr-muted`, …
- **Misc:** `--card`, `--ph-a`/`--ph-b` (image placeholders), `--ok-*`/`--err-*` (form messages)

How it works:

- The active theme is the `data-theme="light" | "dark"` attribute on `<html>`.
- An inline script in `index.html` sets it before the page draws, using the saved choice or the system setting.
- `ThemeContext` updates it when you toggle and saves the choice to `localStorage` (`theme`).
- To add a colour, define the token in `:root` **and** in both dark blocks (the `prefers-color-scheme` media query and `:root[data-theme="dark"]`).

## Responsive breakpoints

| Width | Changes |
|---|---|
| ≤ 1023px | Product grid uses smaller minimum card width; large view goes to 2 columns |
| ≤ 860px | Mobile header (menu on the left, icon group on the right); search becomes an icon; theme toggle moves into the menu |
| ≤ 820px | Shop filters become a slide-in panel; toolbar shows `FILTER +` / `SORT +` |
| ≤ 760px | Footer brand spans full width above the 2-column links |
| ≤ 599px | Two product cards per row; large view becomes 1 column |
| ≤ 480px | 16px side gutters, tighter section spacing |
| ≤ 380px | Header icons shrink from 40px to 36px |

## Notes and limitations

- **No backend:** products and reviews come from `src/data/products.ts`.
- **In-memory state:** cart, wishlist, login and orders reset when the page reloads. Only the theme preference is saved.
- **Mock auth:** any email and password are accepted.
- **"Newest" sort:** shows items flagged `isNew` first, because products have no date field.
- **Sub-category links:** in the breadcrumb these open the shop filtered by category plus a search for the sub-category.
