
import React from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomerCareForm } from './CustomerCareForm';

interface CustomerCareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CustomerCareModal({ isOpen, onClose }: CustomerCareModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="w-full max-w-md mx-4 max-h-[90vh] overflow-hidden">
        <CardHeader className="bg-blue-600 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Customer Care
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-blue-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-blue-100 text-sm">
            How can we help you today?
          </p>
        </CardHeader>
        
        <CardContent className="p-6">
          <CustomerCareForm onSubmitSuccess={onClose} />
        </CardContent>
      </Card>
    </div>
  );
}
