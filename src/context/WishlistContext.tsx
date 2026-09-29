import { createContext, useContext, useState, type ReactNode } from 'react';
import { useToast } from '@/context/ToastContext';

interface WishlistContextValue {
  wishlist: number[];
  toggleWish: (id: number) => void;
  isWished: (id: number) => boolean;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { showToast } = useToast();

  const toggleWish = (id: number) => {
    setWishlist((prev) => {
      if (prev.includes(id)) {
        showToast('Removed from wishlist');
        return prev.filter((w) => w !== id);
      }
      showToast('Added to wishlist');
      return [...prev, id];
    });
  };

  const isWished = (id: number) => wishlist.includes(id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWish, isWished }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
