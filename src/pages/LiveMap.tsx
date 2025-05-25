
import React, { useState, useEffect } from 'react';
import { MapPin, Package, Truck, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function LiveMap() {
  const [selectedOrder, setSelectedOrder] = useState('ORD-001');

  // Mock order tracking data
  const orderData = {
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
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Live Order Tracking</h1>
      
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
                {orderData[selectedOrder].timeline.map((item, index) => (
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
    </div>
  );
}
