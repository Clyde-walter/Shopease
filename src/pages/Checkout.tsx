
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, User, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore } from '@/contexts/StoreContext';
import { toast } from '@/hooks/use-toast';

export function Checkout() {
  const navigate = useNavigate();
  const { cart, getCartTotal, createOrder, clearCart } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: ''
  });

  const total = getCartTotal();
  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.08;
  const finalTotal = total + shipping + tax;

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerInfo.name || !customerInfo.email || !customerInfo.address) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate Stripe payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const order = createOrder(customerInfo);
      
      toast({
        title: "Order placed successfully!",
        description: `Order #${order.id} has been created.`
      });
      
      navigate(`/orders/${order.id}`);
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add some products to proceed with checkout.</p>
          <Button onClick={() => navigate('/products')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information Form */}
          <div className="space-y-6">
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
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <Input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

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
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="123 Main St"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">City</label>
                    <Input
                      value={customerInfo.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">ZIP Code</label>
                    <Input
                      value={customerInfo.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      placeholder="10001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Country</label>
                    <Input
                      value={customerInfo.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      placeholder="United States"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

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
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium text-sm">{item.product.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <hr />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <Button
                    type="submit"
                    className="w-full bg-ecommerce-600 hover:bg-ecommerce-700"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : `Pay $${finalTotal.toFixed(2)}`}
                  </Button>
                </form>
                
                <p className="text-xs text-gray-500 text-center">
                  By placing your order, you agree to our terms and conditions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
