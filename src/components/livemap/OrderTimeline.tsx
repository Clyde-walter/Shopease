
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Order } from '@/types/store';

interface OrderTimelineProps {
  order: Order;
  orderLocation?: {
    lastUpdated: string;
  };
}

export function OrderTimeline({ order, orderLocation }: OrderTimelineProps) {
  const { t } = useLanguage();

  const timelineItems = [
    { status: 'pending', time: order.createdAt, completed: true },
    { status: 'processing', time: '', completed: order.status !== 'pending' },
    { status: 'shipped', time: '', completed: ['shipped', 'delivered'].includes(order.status) },
    { status: 'in-transit', time: orderLocation?.lastUpdated || '', completed: order.status === 'delivered' || !!orderLocation },
    { status: 'delivered', time: '', completed: order.status === 'delivered' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('order.timeline')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timelineItems.map((item, index) => (
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
  );
}
