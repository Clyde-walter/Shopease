
import React from 'react';
import { CreditCard, Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function PaymentInfoForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Payment Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-ecommerce-50 p-4 rounded-lg border border-ecommerce-200">
          <div className="flex items-center gap-2 text-ecommerce-700">
            <Lock className="w-4 h-4" />
            <span className="text-sm font-medium">Secure Payment with Stripe</span>
          </div>
          <p className="text-sm text-ecommerce-600 mt-1">
            Your payment information is encrypted and secure.
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Card Number</label>
          <Input placeholder="4242 4242 4242 4242" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Expiry Date</label>
            <Input placeholder="MM/YY" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">CVC</label>
            <Input placeholder="123" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
