import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, OrderDetails } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  hasUnpricedItems: boolean;
  deliveryFee: number;
  grandTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  lastOrder: OrderDetails | null;
  placeOrder: (orderData: Omit<OrderDetails, 'orderId' | 'createdAt' | 'status' | 'items' | 'subtotal' | 'hasUnpricedItems' | 'deliveryFee' | 'total'>) => OrderDetails;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'herd_flock_cart_v2';
const LAST_ORDER_KEY = 'herd_flock_last_order_v2';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(() => {
    try {
      const saved = localStorage.getItem(LAST_ORDER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // storage error fallback
    }
  }, [cart]);

  const addToCart = (product: Product, quantity = 1) => {
    if (quantity <= 0) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const hasUnpricedItems = cart.some((item) => item.product.price === null);

  const subtotal = cart.reduce((sum, item) => {
    if (item.product.price === null) return sum;
    return sum + item.product.price * item.quantity;
  }, 0);

  // Free delivery for orders above PKR 7,000; 0 if empty or only unpriced Call for price items
  const deliveryFee = subtotal > 7000 || subtotal === 0 ? 0 : 350;
  const grandTotal = subtotal + deliveryFee;

  const placeOrder = (
    orderData: Omit<
      OrderDetails,
      'orderId' | 'createdAt' | 'status' | 'items' | 'subtotal' | 'hasUnpricedItems' | 'deliveryFee' | 'total'
    >
  ): OrderDetails => {
    const orderId = `HFV-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: OrderDetails = {
      ...orderData,
      orderId,
      items: [...cart],
      subtotal,
      hasUnpricedItems,
      deliveryFee,
      total: grandTotal,
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
    };

    setLastOrder(newOrder);
    localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(newOrder));
    clearCart();
    setIsCartOpen(false);
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal,
        hasUnpricedItems,
        deliveryFee,
        grandTotal,
        isCartOpen,
        setIsCartOpen,
        lastOrder,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
