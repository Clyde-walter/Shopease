
import React from 'react';
import { Save, Upload, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { saveToLocalStorage, applyTheme } from '@/utils/adminSettings';

interface AppearanceSettingsProps {
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
  logoFile: File | null;
  setLogoFile: (file: File | null) => void;
  logoPreview: string | null;
  setLogoPreview: (preview: string | null) => void;
}

export function AppearanceSettings({ 
  selectedTheme, 
  setSelectedTheme, 
  logoFile, 
  setLogoFile, 
  logoPreview, 
  setLogoPreview 
}: AppearanceSettingsProps) {
  const themes = [
    { id: 'blue', name: 'Blue Theme', color: 'bg-blue-500' },
    { id: 'green', name: 'Green Theme', color: 'bg-green-500' },
    { id: 'purple', name: 'Purple Theme', color: 'bg-purple-500' },
    { id: 'dark', name: 'Dark Theme', color: 'bg-gray-500' }
  ];

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAppearance = () => {
    applyTheme(selectedTheme);
    saveToLocalStorage('siteTheme', selectedTheme);
    
    if (logoFile) {
      saveToLocalStorage('siteLogo', logoPreview || '');
    }
    
    toast({
      title: "Appearance saved!",
      description: "Theme and logo changes have been applied.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Store Appearance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label>Store Logo</Label>
          <div className="flex items-center gap-4 mt-2">
            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              {logoPreview ? (
                <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
              ) : (
                <Upload className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <div>
              <input
                type="file"
                id="logo-upload"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <Button variant="outline" onClick={() => document.getElementById('logo-upload')?.click()}>
                <Upload className="w-4 h-4 mr-2" />
                Upload Logo
              </Button>
            </div>
          </div>
        </div>
        <Separator />
        <div>
          <Label>Theme Settings</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`p-4 border rounded-lg cursor-pointer hover:border-blue-500 ${
                  selectedTheme === theme.id ? 'border-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => setSelectedTheme(theme.id)}
              >
                <div className={`w-full h-16 ${theme.color} rounded mb-2`}></div>
                <p className="text-sm font-medium">{theme.name}</p>
              </div>
            ))}
          </div>
        </div>
        <Button onClick={handleSaveAppearance} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Save Appearance
        </Button>
      </CardContent>
    </Card>
  );
}
