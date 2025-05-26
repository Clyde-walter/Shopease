
import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ShippingMethod {
  id: string;
  name: string;
  type: 'standard' | 'express' | 'overnight';
  cost: number;
  estimatedDays: string;
  freeShippingThreshold?: number;
  isActive: boolean;
}

interface ShippingMethodsTableProps {
  methods: ShippingMethod[];
  onEditMethod: (methodId: string, updates: Partial<ShippingMethod>) => void;
  onDeleteMethod: (methodId: string) => void;
}

export function ShippingMethodsTable({ methods, onEditMethod, onDeleteMethod }: ShippingMethodsTableProps) {
  const [editingMethod, setEditingMethod] = useState<ShippingMethod | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEdit = (method: ShippingMethod) => {
    setEditingMethod(method);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingMethod) {
      onEditMethod(editingMethod.id, {
        name: editingMethod.name,
        type: editingMethod.type,
        cost: editingMethod.cost,
        estimatedDays: editingMethod.estimatedDays,
        freeShippingThreshold: editingMethod.freeShippingThreshold,
        isActive: editingMethod.isActive
      });
      setIsEditDialogOpen(false);
      setEditingMethod(null);
    }
  };

  return (
    <>
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
          {methods.map((method) => (
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
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEdit(method)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-600"
                    onClick={() => onDeleteMethod(method.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Shipping Method</DialogTitle>
          </DialogHeader>
          {editingMethod && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="methodName">Method Name</Label>
                <Input 
                  id="methodName"
                  value={editingMethod.name}
                  onChange={(e) => setEditingMethod({...editingMethod, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="methodType">Type</Label>
                <Select 
                  value={editingMethod.type} 
                  onValueChange={(value: 'standard' | 'express' | 'overnight') => 
                    setEditingMethod({...editingMethod, type: value})
                  }
                >
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
                <Label htmlFor="methodCost">Cost ($)</Label>
                <Input 
                  id="methodCost"
                  type="number"
                  step="0.01"
                  value={editingMethod.cost}
                  onChange={(e) => setEditingMethod({...editingMethod, cost: parseFloat(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="estimatedDays">Estimated Days</Label>
                <Input 
                  id="estimatedDays"
                  value={editingMethod.estimatedDays}
                  onChange={(e) => setEditingMethod({...editingMethod, estimatedDays: e.target.value})}
                  placeholder="e.g., 5-7"
                />
              </div>
              <div>
                <Label htmlFor="freeShipping">Free Shipping Threshold ($)</Label>
                <Input 
                  id="freeShipping"
                  type="number"
                  step="0.01"
                  value={editingMethod.freeShippingThreshold || ''}
                  onChange={(e) => setEditingMethod({...editingMethod, freeShippingThreshold: parseFloat(e.target.value) || undefined})}
                  placeholder="Optional"
                />
              </div>
              <div>
                <Label htmlFor="isActive">Status</Label>
                <Select 
                  value={editingMethod.isActive ? 'active' : 'inactive'} 
                  onValueChange={(value) => 
                    setEditingMethod({...editingMethod, isActive: value === 'active'})
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSaveEdit} className="flex-1">Save Changes</Button>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
