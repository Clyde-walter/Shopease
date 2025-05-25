
import React, { useState } from 'react';
import { MapPin, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

interface Address {
  id: number;
  type: string;
  isDefault: boolean;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export function ManageAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      type: 'Home',
      isDefault: true,
      name: 'John Doe',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      phone: '+1 (555) 123-4567'
    },
    {
      id: 2,
      type: 'Work',
      isDefault: false,
      name: 'John Doe',
      street: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'United States',
      phone: '+1 (555) 987-6543'
    }
  ]);

  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<number | null>(null);
  const [newAddress, setNewAddress] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });
  const [editAddress, setEditAddress] = useState<Address | null>(null);

  const handleAddAddress = () => {
    if (newAddress.firstName && newAddress.lastName && newAddress.street && newAddress.city) {
      const address: Address = {
        id: Date.now(),
        type: 'Home',
        isDefault: addresses.length === 0,
        name: `${newAddress.firstName} ${newAddress.lastName}`,
        street: newAddress.street,
        city: newAddress.city,
        state: newAddress.state,
        zipCode: newAddress.zipCode,
        country: 'United States',
        phone: newAddress.phone
      };

      setAddresses([...addresses, address]);
      setNewAddress({ firstName: '', lastName: '', street: '', city: '', state: '', zipCode: '', phone: '' });
      setIsAddingAddress(false);
      
      toast({
        title: "Address added successfully",
        description: "Your new address has been saved."
      });
    } else {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
    }
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address.id);
    setEditAddress({ ...address });
  };

  const handleSaveEdit = () => {
    if (editAddress) {
      setAddresses(addresses.map(address => 
        address.id === editAddress.id ? editAddress : address
      ));
      setEditingAddress(null);
      setEditAddress(null);
      
      toast({
        title: "Address updated successfully",
        description: "Your address has been saved."
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingAddress(null);
    setEditAddress(null);
  };

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter(address => address.id !== id));
    
    toast({
      title: "Address deleted",
      description: "The address has been removed from your account."
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Manage Addresses</h1>
          <Dialog open={isAddingAddress} onOpenChange={setIsAddingAddress}>
            <DialogTrigger asChild>
              <Button className="bg-ecommerce-600 hover:bg-ecommerce-700">
                <Plus className="w-4 h-4 mr-2" />
                Add New Address
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Address</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <Input 
                      placeholder="John" 
                      value={newAddress.firstName}
                      onChange={(e) => setNewAddress({...newAddress, firstName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <Input 
                      placeholder="Doe" 
                      value={newAddress.lastName}
                      onChange={(e) => setNewAddress({...newAddress, lastName: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Street Address</label>
                  <Input 
                    placeholder="123 Main Street" 
                    value={newAddress.street}
                    onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">City</label>
                    <Input 
                      placeholder="New York" 
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">State</label>
                    <Input 
                      placeholder="NY" 
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">ZIP Code</label>
                    <Input 
                      placeholder="10001" 
                      value={newAddress.zipCode}
                      onChange={(e) => setNewAddress({...newAddress, zipCode: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <Input 
                      placeholder="+1 (555) 123-4567" 
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                    />
                  </div>
                </div>
                <Button 
                  className="w-full bg-ecommerce-600 hover:bg-ecommerce-700"
                  onClick={handleAddAddress}
                >
                  Save Address
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {addresses.map((address) => (
            <Card key={address.id}>
              <CardContent className="p-6">
                {editingAddress === address.id && editAddress ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <Input
                        value={editAddress.name}
                        onChange={(e) => setEditAddress({...editAddress, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Street Address</label>
                      <Input
                        value={editAddress.street}
                        onChange={(e) => setEditAddress({...editAddress, street: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">City</label>
                        <Input
                          value={editAddress.city}
                          onChange={(e) => setEditAddress({...editAddress, city: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">State</label>
                        <Input
                          value={editAddress.state}
                          onChange={(e) => setEditAddress({...editAddress, state: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">ZIP Code</label>
                        <Input
                          value={editAddress.zipCode}
                          onChange={(e) => setEditAddress({...editAddress, zipCode: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <Input
                          value={editAddress.phone}
                          onChange={(e) => setEditAddress({...editAddress, phone: e.target.value})}
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
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold">{address.type}</h3>
                        {address.isDefault && (
                          <Badge variant="secondary">Default</Badge>
                        )}
                      </div>
                      <p className="font-medium">{address.name}</p>
                      <p className="text-gray-600">{address.street}</p>
                      <p className="text-gray-600">
                        {address.city}, {address.state} {address.zipCode}
                      </p>
                      <p className="text-gray-600">{address.country}</p>
                      <p className="text-gray-600">{address.phone}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditAddress(address)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteAddress(address.id)}
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
