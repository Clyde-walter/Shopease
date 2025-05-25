
import React, { useState, useEffect } from 'react';
import { MapPin, Package, Truck, Clock, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function LiveMap() {
  const [selectedOrder, setSelectedOrder] = useState('');
  const [orderInput, setOrderInput] = useState('');
  const [orderFound, setOrderFound] = useState(false);

  // Mock order tracking data
  const orderData: Record<string, any> = {
    'ORD-001': {
      status: 'In Transit',
      estimatedDelivery: '2024-05-26 14:30',
      currentLocation: 'Distribution Center - New York',
      coordinates: { lat: 40.7128, lng: -74.0060 },
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
      status: 'Processing',
      estimatedDelivery: '2024-05-28 16:00',
      currentLocation: 'Warehouse - California',
      coordinates: { lat: 34.0522, lng: -118.2437 },
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
    if (orderData[orderInput]) {
      setSelectedOrder(orderInput);
      setOrderFound(true);
    } else {
      setOrderFound(false);
      setSelectedOrder('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Live Order Tracking</h1>
      
      {/* Order Input Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Track Your Order</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Input
              placeholder="Enter your order number (e.g., ORD-001)"
              value={orderInput}
              onChange={(e) => setOrderInput(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleTrackOrder} className="bg-ecommerce-600 hover:bg-ecommerce-700">
              <Search className="w-4 h-4 mr-2" />
              Track Order
            </Button>
          </div>
          {orderInput && !orderFound && orderInput.length > 0 && (
            <p className="text-red-500 text-sm mt-2">Order not found. Please check your order number.</p>
          )}
        </CardContent>
      </Card>

      {selectedOrder && orderFound && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Live Location Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 mx-auto text-ecommerce-600 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
                    <p className="text-gray-600">
                      Real-time tracking map will be displayed here
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Current Location: {orderData[selectedOrder].currentLocation}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Order ID:</span>
                  <span>{selectedOrder}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Status:</span>
                  <Badge className="bg-ecommerce-600">
                    {orderData[selectedOrder].status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Est. Delivery:</span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {orderData[selectedOrder].estimatedDelivery}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Carrier:</span>
                  <span className="flex items-center">
                    <Truck className="w-4 h-4 mr-1" />
                    Express Delivery
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderData[selectedOrder].timeline.map((item: any, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-3 h-3 rounded-full mt-1 ${
                        item.completed ? 'bg-ecommerce-600' : 'bg-gray-300'
                      }`} />
                      <div className="flex-1">
                        <p className={`font-medium ${
                          item.completed ? 'text-ecommerce-600' : 'text-gray-500'
                        }`}>
                          {item.status}
                        </p>
                        <p className="text-sm text-gray-500">{item.time}</p>
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
