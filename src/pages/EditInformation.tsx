
import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, Save, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

export function EditInformation() {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-01-01',
    newsletter: true,
    smsNotifications: false,
    emailNotifications: true
  });
  const [profileImage, setProfileImage] = useState('/placeholder.svg');

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
        toast({
          title: "Profile photo updated!",
          description: "Your profile photo has been changed successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log('Saving user information:', formData);
    toast({
      title: "Changes saved!",
      description: "Your information has been updated successfully.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Information</h1>

        <div className="space-y-6">
          {/* Profile Picture */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={profileImage} />
                <AvatarFallback className="text-xl">
                  {formData.firstName[0]}{formData.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="profile-image-upload"
                />
                <label htmlFor="profile-image-upload">
                  <Button variant="outline" className="mb-2 cursor-pointer" asChild>
                    <span>
                      <Camera className="w-4 h-4 mr-2" />
                      Change Photo
                    </span>
                  </Button>
                </label>
                <p className="text-sm text-gray-600">
                  JPG, PNG or GIF. Max size 2MB.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <div className="relative">
                    <Input 
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="pl-10"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <Input 
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <div className="relative">
                  <Input 
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10"
                    type="email"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <div className="relative">
                  <Input 
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="pl-10"
                  />
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date of Birth</label>
                <div className="relative">
                  <Input 
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="pl-10"
                    type="date"
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-gray-600">Receive order updates and promotions via email</p>
                </div>
                <Switch 
                  checked={formData.emailNotifications}
                  onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">SMS Notifications</h4>
                  <p className="text-sm text-gray-600">Receive order updates via text message</p>
                </div>
                <Switch 
                  checked={formData.smsNotifications}
                  onCheckedChange={(checked) => handleInputChange('smsNotifications', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Newsletter</h4>
                  <p className="text-sm text-gray-600">Stay updated with our latest collections</p>
                </div>
                <Switch 
                  checked={formData.newsletter}
                  onCheckedChange={(checked) => handleInputChange('newsletter', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={handleSave}
            className="w-full bg-ecommerce-600 hover:bg-ecommerce-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
