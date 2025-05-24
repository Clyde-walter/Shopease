
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  customerInfo: {
    name: string;
    email: string;
    address: string;
  };
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  createOrder: (customerInfo: any) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Sample products data
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    image: '/placeholder.svg',
    description: 'High-quality wireless headphones with noise cancellation',
    category: 'Electronics',
    stock: 15
  },
  {
    id: '2',
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    image: '/placeholder.svg',
    description: 'Comfortable organic cotton t-shirt in various colors',
    category: 'Clothing',
    stock: 50
  },
  {
    id: '3',
    name: 'Stainless Steel Water Bottle',
    price: 24.99,
    image: '/placeholder.svg',
    description: 'Insulated stainless steel water bottle keeps drinks cold for 24 hours',
    category: 'Accessories',
    stock: 30
  },
  {
    id: '4',
    name: 'Bluetooth Speaker',
    price: 79.99,
    image: '/placeholder.svg',
    description: 'Portable Bluetooth speaker with excellent sound quality',
    category: 'Electronics',
    stock: 20
  },
  {
    id: '5',
    name: 'Yoga Mat',
    price: 49.99,
    image: '/placeholder.svg',
    description: 'Non-slip yoga mat perfect for home workouts',
    category: 'Fitness',
    stock: 25
  },
  {
    id: '6',
    name: 'Coffee Mug Set',
    price: 34.99,
    image: '/placeholder.svg',
    description: 'Set of 4 ceramic coffee mugs with elegant design',
    category: 'Home',
    stock: 40
  }
];

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ecommerce-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    const savedOrders = localStorage.getItem('ecommerce-orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ecommerce-cart', JSON.stringify(cart));
  }, [cart]);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('ecommerce-orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product: Product) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return currentCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(currentCart => currentCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(currentCart =>
      currentCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString()
    };
    setProducts(currentProducts => [...currentProducts, newProduct]);
  };

  const updateProduct = (id: string, productData: Partial<Product>) => {
    setProducts(currentProducts =>
      currentProducts.map(product =>
        product.id === id ? { ...product, ...productData } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(currentProducts => currentProducts.filter(product => product.id !== id));
  };

  const createOrder = (customerInfo: any): Order => {
    const newOrder: Order = {
      id: Date.now().toString(),
      items: [...cart],
      total: getCartTotal(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      customerInfo
    };
    setOrders(currentOrders => [...currentOrders, newOrder]);
    clearCart();
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
    <StoreContext.Provider
      value={{
        products,
        cart,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
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

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
