
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function IntegrationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Third-Party Integrations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                📧
              </div>
              <div>
                <p className="font-medium">Mailchimp</p>
                <p className="text-sm text-gray-600">Email marketing automation</p>
              </div>
            </div>
            <Button variant="outline">Connect</Button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                📊
              </div>
              <div>
                <p className="font-medium">Google Analytics</p>
                <p className="text-sm text-gray-600">Website analytics and tracking</p>
              </div>
            </div>
            <Button variant="outline">Connect</Button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                📱
              </div>
              <div>
                <p className="font-medium">Facebook Pixel</p>
                <p className="text-sm text-gray-600">Social media advertising</p>
              </div>
            </div>
            <Button variant="outline">Connect</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
