
import React from 'react';
import { Plus, Edit } from 'lucide-react';
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
  onAddMethod: (zoneId: string) => void;
}

export function ShippingZoneCard({ zone, onEditZone, onAddMethod }: ShippingZoneCardProps) {
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
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ShippingMethodsTable methods={zone.methods} />
      </CardContent>
    </Card>
  );
}
