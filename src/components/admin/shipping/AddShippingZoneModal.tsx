
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

interface AddShippingZoneModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddZone: (zone: { name: string; regions: string[] }) => void;
}

export function AddShippingZoneModal({ isOpen, onOpenChange, onAddZone }: AddShippingZoneModalProps) {
  const [zoneName, setZoneName] = useState('');
  const [regions, setRegions] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!zoneName.trim() || !regions.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const regionArray = regions.split(',').map(region => region.trim()).filter(region => region);
    
    onAddZone({
      name: zoneName,
      regions: regionArray
    });

    toast({
      title: "Success",
      description: "Shipping zone created successfully",
    });

    // Reset form
    setZoneName('');
    setRegions('');
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Shipping Zone</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="zoneName">Zone Name</Label>
            <Input 
              id="zoneName" 
              value={zoneName}
              onChange={(e) => setZoneName(e.target.value)}
              placeholder="e.g., Europe, Asia Pacific" 
            />
          </div>
          <div>
            <Label htmlFor="regions">Regions (comma separated)</Label>
            <Input 
              id="regions" 
              value={regions}
              onChange={(e) => setRegions(e.target.value)}
              placeholder="e.g., FR, DE, IT, ES" 
            />
            <p className="text-xs text-gray-500 mt-1">Enter country codes separated by commas</p>
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">Create Zone</Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
