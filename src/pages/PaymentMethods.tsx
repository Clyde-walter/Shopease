
import React, { useState } from 'react';
import { CreditCard, Plus, Edit, Trash2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'Visa',
      lastFour: '1234',
      expiryMonth: '12',
      expiryYear: '25',
      isDefault: true,
      cardholderName: 'John Doe'
    },
    {
      id: 2,
      type: 'Mastercard',
      lastFour: '5678',
      expiryMonth: '08',
      expiryYear: '26',
      isDefault: false,
      cardholderName: 'John Doe'
    }
  ]);

  const [isAddingCard, setIsAddingCard] = useState(false);

  const getCardIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'visa':
        return '💳';
      case 'mastercard':
        return '💳';
      case 'amex':
        return '💳';
      default:
        return '💳';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Payment Methods</h1>
          <Dialog open={isAddingCard} onOpenChange={setIsAddingCard}>
            <DialogTrigger asChild>
              <Button className="bg-ecommerce-600 hover:bg-ecommerce-700">
                <Plus className="w-4 h-4 mr-2" />
                Add New Card
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Payment Method</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                  <Input placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Card Number</label>
                  <Input placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Expiry Date</label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">CVV</label>
                    <Input placeholder="123" type="password" />
                  </div>
                </div>
                <Button className="w-full bg-ecommerce-600 hover:bg-ecommerce-700">
                  <Shield className="w-4 h-4 mr-2" />
                  Add Payment Method
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-6">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <p className="text-sm text-blue-800">
                  Your payment information is encrypted and secure. We never store your full card details.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <Card key={method.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{getCardIcon(method.type)}</div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold">
                          {method.type} ending in {method.lastFour}
                        </h3>
                        {method.isDefault && (
                          <Badge variant="secondary">Default</Badge>
                        )}
                      </div>
                      <p className="text-gray-600">{method.cardholderName}</p>
                      <p className="text-gray-600">
                        Expires {method.expiryMonth}/{method.expiryYear}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
