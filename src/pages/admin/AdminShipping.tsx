
import React, { useState } from 'react';
import { Truck, Plus, Edit, Trash2, MapPin, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

const mockShippingZones: ShippingZone[] = [
  {
    id: '1',
    name: 'United States',
    regions: ['US'],
    methods: [
      {
        id: '1',
        name: 'Standard Shipping',
        type: 'standard',
        cost: 9.99,
        estimatedDays: '5-7',
        freeShippingThreshold: 50,
        isActive: true
      },
      {
        id: '2',
        name: 'Express Shipping',
        type: 'express',
        cost: 19.99,
        estimatedDays: '2-3',
        isActive: true
      },
      {
        id: '3',
        name: 'Overnight Shipping',
        type: 'overnight',
        cost: 39.99,
        estimatedDays: '1',
        isActive: true
      }
    ]
  },
  {
    id: '2',
    name: 'International',
    regions: ['CA', 'EU', 'AU'],
    methods: [
      {
        id: '4',
        name: 'International Standard',
        type: 'standard',
        cost: 24.99,
        estimatedDays: '10-15',
        isActive: true
      },
      {
        id: '5',
        name: 'International Express',
        type: 'express',
        cost: 49.99,
        estimatedDays: '5-7',
        isActive: false
      }
    ]
  }
];

export function AdminShipping() {
  const [shippingZones, setShippingZones] = useState<ShippingZone[]>(mockShippingZones);
  const [isAddZoneOpen, setIsAddZoneOpen] = useState(false);

  const totalShippingMethods = shippingZones.reduce((sum, zone) => sum + zone.methods.length, 0);
  const activeShippingMethods = shippingZones.reduce((sum, zone) => 
    sum + zone.methods.filter(method => method.isActive).length, 0);
  const avgShippingCost = shippingZones.reduce((sum, zone) => 
    sum + zone.methods.reduce((methodSum, method) => methodSum + method.cost, 0), 0) / totalShippingMethods;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Shipping Management</h1>
        <p className="text-gray-600">Manage shipping zones, methods, and rates.</p>
      </div>

      {/* Stats Overview */}
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

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <Dialog open={isAddZoneOpen} onOpenChange={setIsAddZoneOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Shipping Zone
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Shipping Zone</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="zoneName">Zone Name</Label>
                <Input id="zoneName" placeholder="e.g., Europe" />
              </div>
              <div>
                <Label htmlFor="regions">Regions (comma separated)</Label>
                <Input id="regions" placeholder="e.g., FR, DE, IT" />
              </div>
              <Button className="w-full">Create Zone</Button>
            </div>
          </DialogContent>
        </Dialog>
        
        <Button variant="outline">
          <Edit className="w-4 h-4 mr-2" />
          Bulk Edit
        </Button>
      </div>

      {/* Shipping Zones */}
      {shippingZones.map((zone) => (
        <Card key={zone.id} className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{zone.name}</CardTitle>
                <p className="text-sm text-gray-600">Regions: {zone.regions.join(', ')}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Zone
                </Button>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Method
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Method Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Estimated Delivery</TableHead>
                  <TableHead>Free Shipping</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {zone.methods.map((method) => (
                  <TableRow key={method.id}>
                    <TableCell className="font-medium">{method.name}</TableCell>
                    <TableCell>
                      <Badge variant={method.type === 'overnight' ? 'default' : 'secondary'}>
                        {method.type}
                      </Badge>
                    </TableCell>
                    <TableCell>${method.cost.toFixed(2)}</TableCell>
                    <TableCell>{method.estimatedDays} days</TableCell>
                    <TableCell>
                      {method.freeShippingThreshold ? 
                        `$${method.freeShippingThreshold}+` : 
                        'Not available'
                      }
                    </TableCell>
                    <TableCell>
                      <Badge variant={method.isActive ? 'default' : 'secondary'}>
                        {method.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
