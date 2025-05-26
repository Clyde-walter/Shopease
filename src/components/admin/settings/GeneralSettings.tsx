
import React from 'react';
import { Save, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { saveToLocalStorage } from '@/utils/adminSettings';

interface StoreSettings {
  storeName: string;
  storeDescription: string;
  storeEmail: string;
  storePhone: string;
  currency: string;
  timezone: string;
  taxRate: number;
}

interface GeneralSettingsProps {
  storeSettings: StoreSettings;
  setStoreSettings: (settings: StoreSettings) => void;
}

export function GeneralSettings({ storeSettings, setStoreSettings }: GeneralSettingsProps) {
  const handleSaveStoreSettings = () => {
    saveToLocalStorage('storeSettings', storeSettings);
    toast({
      title: "Settings saved!",
      description: "Store information has been updated successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Store Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="storeName">Store Name</Label>
            <Input
              id="storeName"
              value={storeSettings.storeName}
              onChange={(e) => setStoreSettings({...storeSettings, storeName: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="storeEmail">Store Email</Label>
            <Input
              id="storeEmail"
              type="email"
              value={storeSettings.storeEmail}
              onChange={(e) => setStoreSettings({...storeSettings, storeEmail: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="storePhone">Store Phone</Label>
            <Input
              id="storePhone"
              value={storeSettings.storePhone}
              onChange={(e) => setStoreSettings({...storeSettings, storePhone: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="currency">Currency</Label>
            <Select value={storeSettings.currency} onValueChange={(value) => setStoreSettings({...storeSettings, currency: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD - US Dollar</SelectItem>
                <SelectItem value="EUR">EUR - Euro</SelectItem>
                <SelectItem value="GBP">GBP - British Pound</SelectItem>
                <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="timezone">Timezone</Label>
            <Select value={storeSettings.timezone} onValueChange={(value) => setStoreSettings({...storeSettings, timezone: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/New_York">Eastern Time</SelectItem>
                <SelectItem value="America/Chicago">Central Time</SelectItem>
                <SelectItem value="America/Denver">Mountain Time</SelectItem>
                <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="taxRate">Tax Rate (%)</Label>
            <Input
              id="taxRate"
              type="number"
              step="0.1"
              value={storeSettings.taxRate}
              onChange={(e) => setStoreSettings({...storeSettings, taxRate: parseFloat(e.target.value)})}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="storeDescription">Store Description</Label>
          <Textarea
            id="storeDescription"
            value={storeSettings.storeDescription}
            onChange={(e) => setStoreSettings({...storeSettings, storeDescription: e.target.value})}
            rows={3}
          />
        </div>
        <Button onClick={handleSaveStoreSettings} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}
