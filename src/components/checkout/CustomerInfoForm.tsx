
import React from 'react';
import { User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CustomerInfoFormProps {
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

export function CustomerInfoForm({ customerInfo, onInputChange }: CustomerInfoFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name *</label>
            <Input
              value={customerInfo.name}
              onChange={(e) => onInputChange('name', e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <Input
              type="email"
              value={customerInfo.email}
              onChange={(e) => onInputChange('email', e.target.value)}
              placeholder="john@example.com"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
