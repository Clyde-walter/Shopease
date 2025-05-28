
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomerCareChat } from '@/components/customer-care/CustomerCareChat';

export function Chat() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold">Customer Support Chat</h1>
            <p className="text-gray-600">Get help from our support team in real-time</p>
          </div>
        </div>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            Support Team - Online
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 p-0">
          <CustomerCareChat />
        </CardContent>
      </Card>
    </div>
  );
}
