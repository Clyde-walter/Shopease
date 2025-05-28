
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore } from '@/contexts/StoreContext';
import { useLocation } from '@/contexts/LocationContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { OrderMap } from '@/components/map/OrderMap';
import { OrderSearchForm } from '@/components/livemap/OrderSearchForm';
import { OrderDetailsCard } from '@/components/livemap/OrderDetailsCard';
import { OrderTimeline } from '@/components/livemap/OrderTimeline';

export function LiveMap() {
  const { orders } = useStore();
  const { getOrderLocation } = useLocation();
  const { t } = useLanguage();
  const [selectedOrder, setSelectedOrder] = useState('');
  const [orderFound, setOrderFound] = useState(false);

  // Mock tracking data for demo orders
  const mockTrackingData: Record<string, any> = {
    'ORD-001': {
      currentLocation: 'Distribution Center - New York',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      trackingNumber: 'TRK-001-2024',
    },
    'ORD-002': {
      currentLocation: 'Warehouse - California',
      coordinates: { lat: 34.0522, lng: -118.2437 },
      trackingNumber: 'TRK-002-2024',
    }
  };

  const handleOrderFound = (orderId: string) => {
    setSelectedOrder(orderId);
    setOrderFound(true);
  };

  const handleOrderNotFound = () => {
    setOrderFound(false);
    setSelectedOrder('');
  };

  const currentOrder = selectedOrder ? orders.find(order => order.id === selectedOrder) : null;
  const orderLocation = selectedOrder ? getOrderLocation(selectedOrder) : undefined;
  const trackingInfo = selectedOrder ? mockTrackingData[selectedOrder] : undefined;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('livemap.title')}</h1>
      
      <OrderSearchForm 
        orders={orders}
        onOrderFound={handleOrderFound}
        onOrderNotFound={handleOrderNotFound}
      />

      {selectedOrder && orderFound && currentOrder && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  {t('livemap.location.tracking')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <OrderMap
                  coordinates={orderLocation?.coordinates}
                  location={orderLocation?.currentLocation}
                  orderId={selectedOrder}
                />
                {orderLocation && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>{t('order.last.updated')}:</strong> {new Date(orderLocation.lastUpdated).toLocaleString()}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Details */}
          <div className="space-y-6">
            <OrderDetailsCard
              order={currentOrder}
              selectedOrder={selectedOrder}
              orderLocation={orderLocation}
              trackingInfo={trackingInfo}
            />

            <OrderTimeline
              order={currentOrder}
              orderLocation={orderLocation}
            />
          </div>
        </div>
      )}
    </div>
  );
}
