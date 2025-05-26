
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

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
}

export function ShippingMethodsTable({ methods }: ShippingMethodsTableProps) {
  return (
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
  );
}
