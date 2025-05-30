
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Collection {
  id: string;
  name: string;
  description: string;
  images: string[];
  productCount: number;
  status: 'Active' | 'Inactive';
}

interface CollectionsContextType {
  collections: Collection[];
  addCollection: (collection: Omit<Collection, 'id'>) => void;
  updateCollection: (id: string, collection: Partial<Collection>) => void;
  deleteCollection: (id: string) => void;
  lastUpdated: number;
}

const CollectionsContext = createContext<CollectionsContextType | undefined>(undefined);

const initialCollections: Collection[] = [
  {
    id: '1',
    name: 'Summer Collection',
    description: 'Fresh summer styles for the season',
    productCount: 12,
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop'],
    status: 'Active'
  },
  {
    id: '2',
    name: 'Winter Collection',
    description: 'Cozy winter essentials',
    productCount: 8,
    images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop'],
    status: 'Active'
  }
];

export function CollectionsProvider({ children }: { children: React.ReactNode }) {
  const [collections, setCollections] = useState<Collection[]>(() => {
    // Try to load from localStorage first, fallback to initial collections
    const stored = localStorage.getItem('shopease_collections');
    return stored ? JSON.parse(stored) : initialCollections;
  });
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  // Save to localStorage whenever collections change
  useEffect(() => {
    localStorage.setItem('shopease_collections', JSON.stringify(collections));
  }, [collections]);

  const triggerUpdate = () => {
    setLastUpdated(Date.now());
    // Trigger a custom event for real-time updates across components
    window.dispatchEvent(new CustomEvent('collectionsUpdated', { 
      detail: { 
        timestamp: Date.now(),
        collections: collections
      } 
    }));
  };

  const addCollection = (collectionData: Omit<Collection, 'id'>) => {
    const newCollection: Collection = {
      ...collectionData,
      id: Date.now().toString()
    };
    setCollections(currentCollections => {
      const updated = [...currentCollections, newCollection];
      // Trigger update after state is set
      setTimeout(() => triggerUpdate(), 0);
      return updated;
    });
  };

  const updateCollection = (id: string, collectionData: Partial<Collection>) => {
    setCollections(currentCollections => {
      const updated = currentCollections.map(collection =>
        collection.id === id ? { ...collection, ...collectionData } : collection
      );
      // Trigger update after state is set
      setTimeout(() => triggerUpdate(), 0);
      return updated;
    });
  };

  const deleteCollection = (id: string) => {
    setCollections(currentCollections => {
      const updated = currentCollections.filter(collection => collection.id !== id);
      // Trigger update after state is set
      setTimeout(() => triggerUpdate(), 0);
      return updated;
    });
  };

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        addCollection,
        updateCollection,
        deleteCollection,
        lastUpdated
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
}

export function useCollections() {
  const context = useContext(CollectionsContext);
  if (context === undefined) {
    throw new Error('useCollections must be used within a CollectionsProvider');
  }
  return context;
}
