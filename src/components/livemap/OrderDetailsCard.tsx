
import React from 'react';
import { Package, Truck, Clock, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Order } from '@/types/store';

interface OrderDetailsCardProps {
  order: Order;
  selectedOrder: string;
  orderLocation?: {
    currentLocation: string;
    coordinates: { lat: number; lng: number };
    lastUpdated: string;
  };
  trackingInfo?: {
    trackingNumber: string;
  };
}

export function OrderDetailsCard({ order, selectedOrder, orderLocation, trackingInfo }: OrderDetailsCardProps) {
  const { t } = useLanguage();

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

  return (
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
          <span>{order.customerInfo?.name || 'Customer'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">{t('order.status')}:</span>
          <Badge className={getStatusColor(order.status)}>
            {t(`status.${order.status}`)}
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
            {new Date(order.createdAt).toLocaleDateString()}
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
            {order.items.map((item, index) => (
              <li key={index} className="ml-2">• {item.product.name} (x{item.quantity})</li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">{t('order.total')}:</span>
          <span className="font-semibold">${order.total.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
