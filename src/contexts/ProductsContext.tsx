
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types/store';
import { initialProducts } from '@/data/initialProducts';

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  lastUpdated: number;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    // Try to load from localStorage first, fallback to initial products
    const stored = localStorage.getItem('shopease_products');
    return stored ? JSON.parse(stored) : initialProducts;
  });
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  // Save to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem('shopease_products', JSON.stringify(products));
  }, [products]);

  const triggerUpdate = () => {
    setLastUpdated(Date.now());
    // Trigger a custom event for real-time updates across components
    window.dispatchEvent(new CustomEvent('productsUpdated', { 
      detail: { 
        timestamp: Date.now(),
        products: products
      } 
    }));
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString()
    };
    setProducts(currentProducts => {
      const updated = [...currentProducts, newProduct];
      // Trigger update after state is set
      setTimeout(() => triggerUpdate(), 0);
      return updated;
    });
  };

  const updateProduct = (id: string, productData: Partial<Product>) => {
    setProducts(currentProducts => {
      const updated = currentProducts.map(product =>
        product.id === id ? { ...product, ...productData } : product
      );
      // Trigger update after state is set
      setTimeout(() => triggerUpdate(), 0);
      return updated;
    });
  };

  const deleteProduct = (id: string) => {
    setProducts(currentProducts => {
      const updated = currentProducts.filter(product => product.id !== id);
      // Trigger update after state is set
      setTimeout(() => triggerUpdate(), 0);
      return updated;
    });
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        lastUpdated
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}
