export interface Product {
  id: number;
  name: string;
  cat: string;
  sub: string;
  price: number;
  orig: number | null;
  sale: boolean;
  isNew: boolean;
  colors: string[];
  sizes: string[];
  avail: boolean;
  rating: number;
  desc: string;
  image: string;
  gallery: string[];
}

export interface Review {
  name: string;
  text: string;
  stars: number;
}

export interface CartItem {
  pid: number;
  size: string;
  color: string;
  qty: number;
}

export interface Order {
  id: string;
  name: string;
  email: string;
  address: string;
  items: (CartItem & { product: Product })[];
  total: number;
}

export interface User {
  name: string;
  email: string;
}

export interface ShopFilters {
  cat: string;
  q: string;
  sizes: string[];
  colors: string[];
  min: string;
  max: string;
  avail: boolean;
  sort: 'newest' | 'price-low' | 'price-high' | 'popularity';
}
