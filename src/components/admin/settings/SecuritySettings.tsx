
import React from 'react';
import { Save, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { saveToLocalStorage } from '@/utils/adminSettings';

interface SecuritySettingsType {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  twoFactorEnabled: boolean;
}

interface SecuritySettingsProps {
  securitySettings: SecuritySettingsType;
  setSecuritySettings: (settings: SecuritySettingsType) => void;
}

export function SecuritySettings({ securitySettings, setSecuritySettings }: SecuritySettingsProps) {
  const handleSaveSecurity = () => {
    if (securitySettings.newPassword !== securitySettings.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "New password and confirmation do not match.",
        variant: "destructive"
      });
      return;
    }
    
    saveToLocalStorage('securitySettings', {
      twoFactorEnabled: securitySettings.twoFactorEnabled
    });
    
    toast({
      title: "Security settings updated!",
      description: "Your security preferences have been saved.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Security Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input 
            id="currentPassword" 
            type="password" 
            value={securitySettings.currentPassword}
            onChange={(e) => setSecuritySettings({...securitySettings, currentPassword: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="newPassword">New Password</Label>
          <Input 
            id="newPassword" 
            type="password" 
            value={securitySettings.newPassword}
            onChange={(e) => setSecuritySettings({...securitySettings, newPassword: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input 
            id="confirmPassword" 
            type="password" 
            value={securitySettings.confirmPassword}
            onChange={(e) => setSecuritySettings({...securitySettings, confirmPassword: e.target.value})}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Two-Factor Authentication</p>
            <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
          </div>
          <Switch
            checked={securitySettings.twoFactorEnabled}
            onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorEnabled: checked})}
          />
        </div>
        <Button onClick={handleSaveSecurity} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Update Security
        </Button>
      </CardContent>
    </Card>
  );
}
