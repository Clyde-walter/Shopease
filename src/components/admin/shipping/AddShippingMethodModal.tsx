
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';

interface AddShippingMethodModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  zoneId: string;
  onAddMethod: (zoneId: string, method: {
    name: string;
    type: 'standard' | 'express' | 'overnight';
    cost: number;
    estimatedDays: string;
    freeShippingThreshold?: number;
    isActive: boolean;
  }) => void;
}

export function AddShippingMethodModal({ isOpen, onOpenChange, zoneId, onAddMethod }: AddShippingMethodModalProps) {
  const [methodName, setMethodName] = useState('');
  const [methodType, setMethodType] = useState<'standard' | 'express' | 'overnight'>('standard');
  const [cost, setCost] = useState('');
  const [estimatedDays, setEstimatedDays] = useState('');
  const [freeShippingThreshold, setFreeShippingThreshold] = useState('');
  const [hasFreeShipping, setHasFreeShipping] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!methodName.trim() || !cost || !estimatedDays.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const costNum = parseFloat(cost);
    const freeThreshold = hasFreeShipping && freeShippingThreshold ? parseFloat(freeShippingThreshold) : undefined;

    if (isNaN(costNum) || costNum < 0) {
      toast({
        title: "Error",
        description: "Please enter a valid cost",
        variant: "destructive"
      });
      return;
    }

    onAddMethod(zoneId, {
      name: methodName,
      type: methodType,
      cost: costNum,
      estimatedDays,
      freeShippingThreshold: freeThreshold,
      isActive
    });

    toast({
      title: "Success",
      description: "Shipping method added successfully",
    });

    // Reset form
    setMethodName('');
    setMethodType('standard');
    setCost('');
    setEstimatedDays('');
    setFreeShippingThreshold('');
    setHasFreeShipping(false);
    setIsActive(true);
    onOpenChange(false);
  };

  const handleTypeChange = (value: string) => {
    setMethodType(value as 'standard' | 'express' | 'overnight');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Shipping Method</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="methodName">Method Name</Label>
            <Input 
              id="methodName" 
              value={methodName}
              onChange={(e) => setMethodName(e.target.value)}
              placeholder="e.g., Standard Shipping" 
              required
            />
          </div>
          
          <div>
            <Label htmlFor="methodType">Shipping Type</Label>
            <Select value={methodType} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="express">Express</SelectItem>
                <SelectItem value="overnight">Overnight</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="cost">Shipping Cost ($)</Label>
            <Input 
              id="cost" 
              type="number"
              step="0.01"
              min="0"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              placeholder="9.99" 
              required
            />
          </div>

          <div>
            <Label htmlFor="estimatedDays">Estimated Delivery</Label>
            <Input 
              id="estimatedDays" 
              value={estimatedDays}
              onChange={(e) => setEstimatedDays(e.target.value)}
              placeholder="e.g., 5-7, 2-3, 1" 
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="hasFreeShipping" 
              checked={hasFreeShipping}
              onCheckedChange={(checked) => setHasFreeShipping(checked as boolean)}
            />
            <Label htmlFor="hasFreeShipping">Enable free shipping threshold</Label>
          </div>

          {hasFreeShipping && (
            <div>
              <Label htmlFor="freeShippingThreshold">Free Shipping Threshold ($)</Label>
              <Input 
                id="freeShippingThreshold" 
                type="number"
                step="0.01"
                min="0"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(e.target.value)}
                placeholder="50.00" 
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="isActive" 
              checked={isActive}
              onCheckedChange={(checked) => setIsActive(checked as boolean)}
            />
            <Label htmlFor="isActive">Active method</Label>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">Add Method</Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
