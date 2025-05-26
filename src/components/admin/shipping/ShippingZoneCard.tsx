
import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShippingMethodsTable } from './ShippingMethodsTable';

interface ShippingMethod {
  id: string;
  name: string;
  type: 'standard' | 'express' | 'overnight';
  cost: number;
  estimatedDays: string;
  freeShippingThreshold?: number;
  isActive: boolean;
}

interface ShippingZone {
  id: string;
  name: string;
  regions: string[];
  methods: ShippingMethod[];
}

interface ShippingZoneCardProps {
  zone: ShippingZone;
  onEditZone: (zone: ShippingZone) => void;
  onDeleteZone: (zoneId: string) => void;
  onAddMethod: (zoneId: string) => void;
  onEditMethod: (zoneId: string, methodId: string, updates: Partial<ShippingMethod>) => void;
  onDeleteMethod: (zoneId: string, methodId: string) => void;
}

export function ShippingZoneCard({ 
  zone, 
  onEditZone, 
  onDeleteZone, 
  onAddMethod, 
  onEditMethod, 
  onDeleteMethod 
}: ShippingZoneCardProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{zone.name}</CardTitle>
            <p className="text-sm text-gray-600">Regions: {zone.regions.join(', ')}</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onEditZone(zone)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Zone
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onAddMethod(zone.id)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Method
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onDeleteZone(zone.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Zone
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ShippingMethodsTable 
          methods={zone.methods} 
          onEditMethod={(methodId, updates) => onEditMethod(zone.id, methodId, updates)}
          onDeleteMethod={(methodId) => onDeleteMethod(zone.id, methodId)}
        />
      </CardContent>
    </Card>
  );
}
