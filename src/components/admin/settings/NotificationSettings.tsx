
import React from 'react';
import { Save, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { saveToLocalStorage } from '@/utils/adminSettings';

interface NotificationsType {
  newOrders: boolean;
  lowStock: boolean;
  customerReviews: boolean;
  marketingUpdates: boolean;
}

interface NotificationSettingsProps {
  notifications: NotificationsType;
  setNotifications: (notifications: NotificationsType) => void;
}

export function NotificationSettings({ notifications, setNotifications }: NotificationSettingsProps) {
  const handleSaveNotifications = () => {
    saveToLocalStorage('notificationSettings', notifications);
    toast({
      title: "Notification settings saved!",
      description: "Your notification preferences have been updated.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notification Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">New Orders</p>
              <p className="text-sm text-gray-600">Get notified when new orders are placed</p>
            </div>
            <Switch
              checked={notifications.newOrders}
              onCheckedChange={(checked) => setNotifications({...notifications, newOrders: checked})}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Low Stock Alerts</p>
              <p className="text-sm text-gray-600">Get notified when products are running low</p>
            </div>
            <Switch
              checked={notifications.lowStock}
              onCheckedChange={(checked) => setNotifications({...notifications, lowStock: checked})}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Customer Reviews</p>
              <p className="text-sm text-gray-600">Get notified when customers leave reviews</p>
            </div>
            <Switch
              checked={notifications.customerReviews}
              onCheckedChange={(checked) => setNotifications({...notifications, customerReviews: checked})}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Marketing Updates</p>
              <p className="text-sm text-gray-600">Receive updates about marketing features</p>
            </div>
            <Switch
              checked={notifications.marketingUpdates}
              onCheckedChange={(checked) => setNotifications({...notifications, marketingUpdates: checked})}
            />
          </div>
        </div>
        <Button onClick={handleSaveNotifications} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Save Notifications
        </Button>
      </CardContent>
    </Card>
  );
}
