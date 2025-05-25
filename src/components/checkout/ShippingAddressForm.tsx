
import React from 'react';
import { MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ShippingAddressFormProps {
  customerInfo: {
    name: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export function ShippingAddressForm({ customerInfo, onInputChange }: ShippingAddressFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Shipping Address
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Address *</label>
          <Input
            value={customerInfo.address}
            onChange={(e) => onInputChange('address', e.target.value)}
            placeholder="123 Main St"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">City</label>
            <Input
              value={customerInfo.city}
              onChange={(e) => onInputChange('city', e.target.value)}
              placeholder="New York"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">ZIP Code</label>
            <Input
              value={customerInfo.zipCode}
              onChange={(e) => onInputChange('zipCode', e.target.value)}
              placeholder="10001"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Country</label>
            <Input
              value={customerInfo.country}
              onChange={(e) => onInputChange('country', e.target.value)}
              placeholder="United States"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
