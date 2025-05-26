
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShippingStats } from '@/components/admin/shipping/ShippingStats';
import { ShippingZoneCard } from '@/components/admin/shipping/ShippingZoneCard';
import { AddShippingZoneModal } from '@/components/admin/shipping/AddShippingZoneModal';
import { EditShippingZoneModal } from '@/components/admin/shipping/EditShippingZoneModal';
import { AddShippingMethodModal } from '@/components/admin/shipping/AddShippingMethodModal';
import { toast } from '@/hooks/use-toast';

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
  const [isEditZoneOpen, setIsEditZoneOpen] = useState(false);
  const [isAddMethodOpen, setIsAddMethodOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState<ShippingZone | null>(null);
  const [selectedZoneId, setSelectedZoneId] = useState<string>('');

  const handleAddZone = (newZone: { name: string; regions: string[] }) => {
    const zone: ShippingZone = {
      id: Date.now().toString(),
      name: newZone.name,
      regions: newZone.regions,
      methods: []
    };
    setShippingZones([...shippingZones, zone]);
  };

  const handleEditZone = (zoneId: string, updates: { name: string; regions: string[] }) => {
    setShippingZones(zones => 
      zones.map(zone => 
        zone.id === zoneId ? { ...zone, ...updates } : zone
      )
    );
  };

  const handleDeleteZone = (zoneId: string) => {
    if (window.confirm('Are you sure you want to delete this shipping zone?')) {
      setShippingZones(zones => zones.filter(zone => zone.id !== zoneId));
      toast({
        title: "Shipping zone deleted successfully!"
      });
    }
  };

  const handleAddMethod = (zoneId: string, newMethod: Omit<ShippingMethod, 'id'>) => {
    const method: ShippingMethod = {
      ...newMethod,
      id: Date.now().toString()
    };
    
    setShippingZones(zones => 
      zones.map(zone => 
        zone.id === zoneId 
          ? { ...zone, methods: [...zone.methods, method] }
          : zone
      )
    );
  };

  const handleEditMethod = (zoneId: string, methodId: string, updates: Partial<ShippingMethod>) => {
    setShippingZones(zones => 
      zones.map(zone => 
        zone.id === zoneId 
          ? { 
              ...zone, 
              methods: zone.methods.map(method => 
                method.id === methodId ? { ...method, ...updates } : method
              ) 
            }
          : zone
      )
    );
    toast({
      title: "Shipping method updated successfully!"
    });
  };

  const handleDeleteMethod = (zoneId: string, methodId: string) => {
    if (window.confirm('Are you sure you want to delete this shipping method?')) {
      setShippingZones(zones => 
        zones.map(zone => 
          zone.id === zoneId 
            ? { 
                ...zone, 
                methods: zone.methods.filter(method => method.id !== methodId) 
              }
            : zone
        )
      );
      toast({
        title: "Shipping method deleted successfully!"
      });
    }
  };

  const handleEditZoneClick = (zone: ShippingZone) => {
    setSelectedZone(zone);
    setIsEditZoneOpen(true);
  };

  const handleAddMethodClick = (zoneId: string) => {
    setSelectedZoneId(zoneId);
    setIsAddMethodOpen(true);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Shipping Management</h1>
        <p className="text-gray-600">Manage shipping zones, methods, and rates.</p>
      </div>

      <ShippingStats shippingZones={shippingZones} />

      <div className="flex gap-4 mb-6">
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setIsAddZoneOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Shipping Zone
        </Button>
      </div>

      {shippingZones.map((zone) => (
        <ShippingZoneCard
          key={zone.id}
          zone={zone}
          onEditZone={handleEditZoneClick}
          onDeleteZone={handleDeleteZone}
          onAddMethod={handleAddMethodClick}
          onEditMethod={handleEditMethod}
          onDeleteMethod={handleDeleteMethod}
        />
      ))}

      <AddShippingZoneModal
        isOpen={isAddZoneOpen}
        onOpenChange={setIsAddZoneOpen}
        onAddZone={handleAddZone}
      />

      <EditShippingZoneModal
        isOpen={isEditZoneOpen}
        onOpenChange={setIsEditZoneOpen}
        zone={selectedZone}
        onEditZone={handleEditZone}
      />

      <AddShippingMethodModal
        isOpen={isAddMethodOpen}
        onOpenChange={setIsAddMethodOpen}
        zoneId={selectedZoneId}
        onAddMethod={handleAddMethod}
      />
    </div>
  );
}
