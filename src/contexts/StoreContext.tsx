import React, { createContext, useContext } from 'react';
import { ProductsProvider, useProducts } from './ProductsContext';
import { CartProvider, useCart } from './CartContext';
import { WishlistProvider, useWishlist } from './WishlistContext';
import { OrdersProvider, useOrders } from './OrdersContext';
import { NotificationsProvider } from './NotificationsContext';
import { ChatProvider } from './ChatContext';
import { LocationProvider } from './LocationContext';
import { Product, CartItem, WishlistItem, Order } from '@/types/store';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: WishlistItem[];
  orders: Order[];
  addToCart: (product: Product | WishlistItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (itemId: string) => void;
  isInWishlist: (itemId: string) => boolean;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  createOrder: (customerInfo: any) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

function StoreContextProvider({ children }: { children: React.ReactNode }) {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { orders, createOrder: createOrderBase, updateOrderStatus } = useOrders();

  const createOrder = (customerInfo: any): Order => {
    const order = createOrderBase(customerInfo, cart, getCartTotal());
    clearCart();
    return order;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        addProduct,
        updateProduct,
        deleteProduct,
        createOrder,
        updateOrderStatus
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <ChatProvider>
      <LocationProvider>
        <NotificationsProvider>
          <ProductsProvider>
            <CartProvider>
              <WishlistProvider>
                <OrdersProvider>
                  <StoreContextProvider>
                    {children}
                  </StoreContextProvider>
                </OrdersProvider>
              </WishlistProvider>
            </CartProvider>
          </ProductsProvider>
        </NotificationsProvider>
      </LocationProvider>
    </ChatProvider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}

// Re-export types for convenience
export type { Product, CartItem, WishlistItem, Order };
