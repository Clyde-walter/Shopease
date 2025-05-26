
import React from 'react';
import { Truck, MapPin, Clock, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ShippingZone {
  id: string;
  name: string;
  regions: string[];
  methods: ShippingMethod[];
}

interface ShippingMethod {
  id: string;
  name: string;
  type: 'standard' | 'express' | 'overnight';
  cost: number;
  estimatedDays: string;
  freeShippingThreshold?: number;
  isActive: boolean;
}

interface ShippingStatsProps {
  shippingZones: ShippingZone[];
}

export function ShippingStats({ shippingZones }: ShippingStatsProps) {
  const totalShippingMethods = shippingZones.reduce((sum, zone) => sum + zone.methods.length, 0);
  const activeShippingMethods = shippingZones.reduce((sum, zone) => 
    sum + zone.methods.filter(method => method.isActive).length, 0);
  const avgShippingCost = totalShippingMethods > 0 ? 
    shippingZones.reduce((sum, zone) => 
      sum + zone.methods.reduce((methodSum, method) => methodSum + method.cost, 0), 0) / totalShippingMethods : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Shipping Zones</p>
              <p className="text-2xl font-bold text-blue-600">{shippingZones.length}</p>
            </div>
            <MapPin className="w-8 h-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Methods</p>
              <p className="text-2xl font-bold text-green-600">{activeShippingMethods}</p>
            </div>
            <Truck className="w-8 h-8 text-green-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Shipping Cost</p>
              <p className="text-2xl font-bold text-purple-600">${avgShippingCost.toFixed(2)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Delivery</p>
              <p className="text-2xl font-bold text-orange-600">5-7 days</p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
