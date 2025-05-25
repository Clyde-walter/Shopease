
import React, { useState } from 'react';
import { CreditCard, Plus, Edit, Trash2, Shield, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface PaymentMethod {
  id: number;
  type: string;
  lastFour: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
  cardholderName: string;
}

export function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
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
  const [editingCard, setEditingCard] = useState<number | null>(null);
  const [newCard, setNewCard] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [editCard, setEditCard] = useState<PaymentMethod | null>(null);

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

  const handleAddCard = () => {
    if (newCard.cardholderName && newCard.cardNumber && newCard.expiryDate) {
      const [month, year] = newCard.expiryDate.split('/');
      const cardType = newCard.cardNumber.startsWith('4') ? 'Visa' : 'Mastercard';
      const lastFour = newCard.cardNumber.slice(-4);
      
      const newPaymentMethod: PaymentMethod = {
        id: Date.now(),
        type: cardType,
        lastFour: lastFour,
        expiryMonth: month,
        expiryYear: year,
        isDefault: paymentMethods.length === 0,
        cardholderName: newCard.cardholderName
      };

      setPaymentMethods([...paymentMethods, newPaymentMethod]);
      setNewCard({ cardholderName: '', cardNumber: '', expiryDate: '', cvv: '' });
      setIsAddingCard(false);
    }
  };

  const handleEditCard = (method: PaymentMethod) => {
    setEditingCard(method.id);
    setEditCard({ ...method });
  };

  const handleSaveEdit = () => {
    if (editCard) {
      setPaymentMethods(paymentMethods.map(method => 
        method.id === editCard.id ? editCard : method
      ));
      setEditingCard(null);
      setEditCard(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingCard(null);
    setEditCard(null);
  };

  const handleDeleteCard = (id: number) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
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
                  <Input 
                    placeholder="John Doe" 
                    value={newCard.cardholderName}
                    onChange={(e) => setNewCard({...newCard, cardholderName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Card Number</label>
                  <Input 
                    placeholder="1234 5678 9012 3456" 
                    value={newCard.cardNumber}
                    onChange={(e) => setNewCard({...newCard, cardNumber: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Expiry Date</label>
                    <Input 
                      placeholder="MM/YY" 
                      value={newCard.expiryDate}
                      onChange={(e) => setNewCard({...newCard, expiryDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">CVV</label>
                    <Input 
                      placeholder="123" 
                      type="password" 
                      value={newCard.cvv}
                      onChange={(e) => setNewCard({...newCard, cvv: e.target.value})}
                    />
                  </div>
                </div>
                <Button 
                  className="w-full bg-ecommerce-600 hover:bg-ecommerce-700"
                  onClick={handleAddCard}
                >
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
                {editingCard === method.id && editCard ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                      <Input
                        value={editCard.cardholderName}
                        onChange={(e) => setEditCard({...editCard, cardholderName: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Expiry Month</label>
                        <Input
                          value={editCard.expiryMonth}
                          onChange={(e) => setEditCard({...editCard, expiryMonth: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Expiry Year</label>
                        <Input
                          value={editCard.expiryYear}
                          onChange={(e) => setEditCard({...editCard, expiryYear: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleSaveEdit} className="bg-green-600 hover:bg-green-700">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={handleCancelEdit} variant="outline">
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
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
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditCard(method)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteCard(method.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
