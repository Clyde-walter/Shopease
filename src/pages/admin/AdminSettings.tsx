
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GeneralSettings } from '@/components/admin/settings/GeneralSettings';
import { AppearanceSettings } from '@/components/admin/settings/AppearanceSettings';
import { PaymentSettings } from '@/components/admin/settings/PaymentSettings';
import { NotificationSettings } from '@/components/admin/settings/NotificationSettings';
import { SecuritySettings } from '@/components/admin/settings/SecuritySettings';
import { IntegrationSettings } from '@/components/admin/settings/IntegrationSettings';

export function AdminSettings() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('blue');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  
  const [notifications, setNotifications] = useState({
    newOrders: true,
    lowStock: true,
    customerReviews: false,
    marketingUpdates: true
  });

  const [storeSettings, setStoreSettings] = useState({
    storeName: 'ShopEase',
    storeDescription: 'Your premium electronics store',
    storeEmail: 'admin@shopease.com',
    storePhone: '+1 (555) 123-4567',
    currency: 'USD',
    timezone: 'America/New_York',
    taxRate: 8.5
  });

  const [paymentSettings, setPaymentSettings] = useState({
    stripeEnabled: true,
    paypalEnabled: false,
    stripeApiKey: ''
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Settings</h1>
        <p className="text-gray-600">Manage your store settings and preferences.</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralSettings 
            storeSettings={storeSettings}
            setStoreSettings={setStoreSettings}
          />
        </TabsContent>

        <TabsContent value="appearance">
          <AppearanceSettings 
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
            logoFile={logoFile}
            setLogoFile={setLogoFile}
            logoPreview={logoPreview}
            setLogoPreview={setLogoPreview}
          />
        </TabsContent>

        <TabsContent value="payments">
          <PaymentSettings 
            paymentSettings={paymentSettings}
            setPaymentSettings={setPaymentSettings}
            showApiKey={showApiKey}
            setShowApiKey={setShowApiKey}
          />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings 
            notifications={notifications}
            setNotifications={setNotifications}
          />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettings 
            securitySettings={securitySettings}
            setSecuritySettings={setSecuritySettings}
          />
        </TabsContent>

        <TabsContent value="integrations">
          <IntegrationSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
