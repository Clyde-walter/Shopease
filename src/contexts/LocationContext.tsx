
import React, { createContext, useContext, useState, useEffect } from 'react';

interface OrderLocation {
  orderId: string;
  currentLocation: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  lastUpdated: string;
}

interface LocationContextType {
  orderLocations: OrderLocation[];
  updateOrderLocation: (orderId: string, location: string, coordinates: { lat: number; lng: number }) => void;
  getOrderLocation: (orderId: string) => OrderLocation | undefined;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [orderLocations, setOrderLocations] = useState<OrderLocation[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedLocations = localStorage.getItem('order-locations');
    if (savedLocations) {
      setOrderLocations(JSON.parse(savedLocations));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('order-locations', JSON.stringify(orderLocations));
  }, [orderLocations]);

  const updateOrderLocation = (orderId: string, location: string, coordinates: { lat: number; lng: number }) => {
    setOrderLocations(currentLocations => {
      const existingIndex = currentLocations.findIndex(loc => loc.orderId === orderId);
      const newLocation: OrderLocation = {
        orderId,
        currentLocation: location,
        coordinates,
        lastUpdated: new Date().toISOString()
      };

      if (existingIndex >= 0) {
        const updated = [...currentLocations];
        updated[existingIndex] = newLocation;
        return updated;
      } else {
        return [...currentLocations, newLocation];
      }
    });
  };

  const getOrderLocation = (orderId: string) => {
    return orderLocations.find(loc => loc.orderId === orderId);
  };

  return (
    <LocationContext.Provider value={{
      orderLocations,
      updateOrderLocation,
      getOrderLocation
    }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}
