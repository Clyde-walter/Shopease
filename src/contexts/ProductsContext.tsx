
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
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  const triggerUpdate = () => {
    setLastUpdated(Date.now());
    // Trigger a custom event for real-time updates
    window.dispatchEvent(new CustomEvent('productsUpdated', { detail: { timestamp: Date.now() } }));
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString()
    };
    setProducts(currentProducts => [...currentProducts, newProduct]);
    triggerUpdate();
  };

  const updateProduct = (id: string, productData: Partial<Product>) => {
    setProducts(currentProducts =>
      currentProducts.map(product =>
        product.id === id ? { ...product, ...productData } : product
      )
    );
    triggerUpdate();
  };

  const deleteProduct = (id: string) => {
    setProducts(currentProducts => currentProducts.filter(product => product.id !== id));
    triggerUpdate();
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
