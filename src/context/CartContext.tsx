import { createContext, useContext, useState, useMemo, useCallback, type ReactNode } from 'react';
import type { CartItem } from '@/types/product';
import { findProduct } from '@/data/products';
import { useToast } from '@/context/ToastContext';

interface CartContextValue {
  cart: CartItem[];
  count: number;
  subtotal: number;
  addToCart: (pid: number, size: string, color: string, qty: number) => void;
  changeQty: (index: number, delta: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { showToast } = useToast();

  const addToCart = useCallback((pid: number, size: string, color: string, qty: number) => {
    setCart((prev) => {
      const idx = prev.findIndex((c) => c.pid === pid && c.size === size && c.color === color);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { pid, size, color, qty }];
    });
    showToast('Added to cart');
  }, [showToast]);

  const changeQty = useCallback((index: number, delta: number) => {
    setCart((prev) => prev.map((c, i) => (i === index ? { ...c, qty: Math.max(1, c.qty + delta) } : c)));
  }, []);

  const removeFromCart = useCallback((index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
    showToast('Item removed');
  }, [showToast]);

  const clearCart = useCallback(() => setCart([]), []);

  const count = useMemo(() => cart.reduce((a, c) => a + c.qty, 0), [cart]);
  const subtotal = useMemo(
    () => cart.reduce((a, c) => a + (findProduct(c.pid)?.price ?? 0) * c.qty, 0),
    [cart]
  );

  const value = useMemo(
    () => ({ cart, count, subtotal, addToCart, changeQty, removeFromCart, clearCart }),
    [cart, count, subtotal, addToCart, changeQty, removeFromCart, clearCart]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
