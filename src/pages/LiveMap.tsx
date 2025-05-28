
import React, { useState, useEffect } from 'react';
import { MapPin, Package, Truck, Clock, Search, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useStore } from '@/contexts/StoreContext';
import { useLocation } from '@/contexts/LocationContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { OrderMap } from '@/components/map/OrderMap';

export function LiveMap() {
  const { orders } = useStore();
  const { getOrderLocation } = useLocation();
  const { t } = useLanguage();
  const [selectedOrder, setSelectedOrder] = useState('');
  const [orderInput, setOrderInput] = useState('');
  const [orderFound, setOrderFound] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);

  // Mock tracking data for demo orders - this would normally come from your tracking service
  const mockTrackingData: Record<string, any> = {
    'ORD-001': {
      currentLocation: 'Distribution Center - New York',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      trackingNumber: 'TRK-001-2024',
      timeline: [
        { status: 'Order Placed', time: '2024-05-24 10:00', completed: true },
        { status: 'Processing', time: '2024-05-24 14:00', completed: true },
        { status: 'Shipped', time: '2024-05-25 09:00', completed: true },
        { status: 'In Transit', time: '2024-05-25 16:00', completed: true },
        { status: 'Out for Delivery', time: '2024-05-26 08:00', completed: false },
        { status: 'Delivered', time: '2024-05-26 14:30', completed: false }
      ]
    },
    'ORD-002': {
      currentLocation: 'Warehouse - California',
      coordinates: { lat: 34.0522, lng: -118.2437 },
      trackingNumber: 'TRK-002-2024',
      timeline: [
        { status: 'Order Placed', time: '2024-05-25 15:30', completed: true },
        { status: 'Processing', time: '2024-05-25 18:00', completed: true },
        { status: 'Shipped', time: '2024-05-26 10:00', completed: false },
        { status: 'In Transit', time: '2024-05-27 08:00', completed: false },
        { status: 'Out for Delivery', time: '2024-05-28 08:00', completed: false },
        { status: 'Delivered', time: '2024-05-28 16:00', completed: false }
      ]
    }
  };

  const handleTrackOrder = () => {
    setSearchAttempted(true);
    const trimmedInput = orderInput.trim().toUpperCase();
    
    // First check actual orders from the store
    const actualOrder = orders.find(order => order.id.toUpperCase() === trimmedInput);
    
    if (actualOrder) {
      setSelectedOrder(trimmedInput);
      setOrderFound(true);
      console.log(`Order found: ${trimmedInput}`, actualOrder);
    } else {
      setOrderFound(false);
      setSelectedOrder('');
      console.log(`Order not found: ${trimmedInput}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderInput(e.target.value);
    // Reset search state when user starts typing again
    if (searchAttempted) {
      setSearchAttempted(false);
      setOrderFound(false);
      setSelectedOrder('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleTrackOrder();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-600';
      case 'in transit':
      case 'shipped':
        return 'bg-blue-600';
      case 'processing':
        return 'bg-yellow-600';
      case 'pending':
        return 'bg-orange-600';
      default:
        return 'bg-ecommerce-600';
    }
  };

  const currentOrder = selectedOrder ? orders.find(order => order.id === selectedOrder) : null;
  const orderLocation = selectedOrder ? getOrderLocation(selectedOrder) : undefined;
  const trackingInfo = selectedOrder ? mockTrackingData[selectedOrder] : undefined;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('livemap.title')}</h1>
      
      {/* Order Input Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t('livemap.track.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Input
              placeholder={t('livemap.input.placeholder')}
              value={orderInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={handleTrackOrder} 
              className="bg-ecommerce-600 hover:bg-ecommerce-700"
              disabled={!orderInput.trim()}
            >
              <Search className="w-4 h-4 mr-2" />
              {t('livemap.track.button')}
            </Button>
          </div>
          
          {/* Error message for invalid order */}
          {searchAttempted && !orderFound && orderInput.trim() && (
            <Alert className="mt-4 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">
                {t('livemap.error.notfound').replace('ORDER_NUMBER', orderInput.trim().toUpperCase())}
              </AlertDescription>
            </Alert>
          )}

          {/* Available orders hint */}
          {orders.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700 font-medium mb-2">{t('livemap.recent.orders')}</p>
              <div className="flex flex-wrap gap-2">
                {orders.slice(-5).map((order) => (
                  <button
                    key={order.id}
                    onClick={() => {
                      setOrderInput(order.id);
                      setSelectedOrder(order.id);
                      setOrderFound(true);
                      setSearchAttempted(true);
                    }}
                    className="px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs rounded transition-colors"
                  >
                    {order.id}
                  </button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  {t('order.details')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{t('order.id')}:</span>
                  <span className="font-mono text-sm">{selectedOrder}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{t('order.customer')}:</span>
                  <span>{currentOrder.customerInfo?.name || 'Customer'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{t('order.status')}:</span>
                  <Badge className={getStatusColor(currentOrder.status)}>
                    {t(`status.${currentOrder.status}`)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{t('order.tracking')}:</span>
                  <span className="font-mono text-sm">{trackingInfo?.trackingNumber || `TRK-${selectedOrder.slice(-6)}`}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{t('order.date')}:</span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(currentOrder.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{t('order.carrier')}:</span>
                  <span className="flex items-center">
                    <Truck className="w-4 h-4 mr-1" />
                    Express Delivery
                  </span>
                </div>
                <div>
                  <span className="font-medium">{t('order.items')}:</span>
                  <ul className="text-sm text-gray-600 mt-1">
                    {currentOrder.items.map((item, index) => (
                      <li key={index} className="ml-2">• {item.product.name} (x{item.quantity})</li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{t('order.total')}:</span>
                  <span className="font-semibold">${currentOrder.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>{t('order.timeline')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { status: 'pending', time: currentOrder.createdAt, completed: true },
                    { status: 'processing', time: '', completed: currentOrder.status !== 'pending' },
                    { status: 'shipped', time: '', completed: ['shipped', 'delivered'].includes(currentOrder.status) },
                    { status: 'in-transit', time: orderLocation?.lastUpdated || '', completed: currentOrder.status === 'delivered' || !!orderLocation },
                    { status: 'delivered', time: '', completed: currentOrder.status === 'delivered' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-3 h-3 rounded-full mt-1 ${
                        item.completed ? 'bg-ecommerce-600' : 'bg-gray-300'
                      }`} />
                      <div className="flex-1">
                        <p className={`font-medium ${
                          item.completed ? 'text-ecommerce-600' : 'text-gray-500'
                        }`}>
                          {t(`status.${item.status}`)}
                        </p>
                        {item.time && (
                          <p className="text-sm text-gray-500">
                            {new Date(item.time).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
