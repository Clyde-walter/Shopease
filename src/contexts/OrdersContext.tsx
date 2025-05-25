
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, CartItem } from '@/types/store';

interface OrdersContextType {
  orders: Order[];
  createOrder: (customerInfo: any, cartItems: CartItem[], cartTotal: number) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('ecommerce-orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ecommerce-orders', JSON.stringify(orders));
  }, [orders]);

  const createOrder = (customerInfo: any, cartItems: CartItem[], cartTotal: number): Order => {
    const orderNumber = `ORD-${String(Date.now()).slice(-6)}`;
    
    const newOrder: Order = {
      id: orderNumber,
      orderNumber: orderNumber,
      items: [...cartItems],
      total: cartTotal,
      status: 'pending',
      createdAt: new Date().toISOString(),
      customerInfo
    };
    setOrders(currentOrders => [...currentOrders, newOrder]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(currentOrders =>
      currentOrders.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        createOrder,
        updateOrderStatus
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within a OrdersProvider');
  }
  return context;
}
