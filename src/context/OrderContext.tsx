import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Order } from '@/types/product';

interface OrderContextValue {
  lastOrder: Order | null;
  placeOrder: (order: Order) => void;
}

const OrderContext = createContext<OrderContextValue | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const placeOrder = (order: Order) => setLastOrder(order);
  return <OrderContext.Provider value={{ lastOrder, placeOrder }}>{children}</OrderContext.Provider>;
}

export function useOrder(): OrderContextValue {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrder must be used within OrderProvider');
  return ctx;
}
