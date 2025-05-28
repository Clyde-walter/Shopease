
import React, { useState } from 'react';
import { MapPin, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocation } from '@/contexts/LocationContext';
import { toast } from '@/hooks/use-toast';

interface LocationInputProps {
  orderId: string;
  currentLocation?: string;
  currentCoordinates?: { lat: number; lng: number };
}

export function LocationInput({ orderId, currentLocation, currentCoordinates }: LocationInputProps) {
  const { updateOrderLocation } = useLocation();
  const [location, setLocation] = useState(currentLocation || '');
  const [latitude, setLatitude] = useState(currentCoordinates?.lat?.toString() || '');
  const [longitude, setLongitude] = useState(currentCoordinates?.lng?.toString() || '');

  const handleSave = () => {
    if (!location.trim() || !latitude || !longitude) {
      toast({
        title: "Error",
        description: "Please fill in all location fields",
        variant: "destructive"
      });
      return;
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      toast({
        title: "Error",
        description: "Please enter valid coordinates (Latitude: -90 to 90, Longitude: -180 to 180)",
        variant: "destructive"
      });
      return;
    }

    updateOrderLocation(orderId, location, { lat, lng });
    toast({
      title: "Location Updated",
      description: `Order ${orderId} location has been updated`
    });
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
          toast({
            title: "Location Detected",
            description: "Current location coordinates have been filled in"
          });
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Could not get current location. Please enter coordinates manually.",
            variant: "destructive"
          });
        }
      );
    } else {
      toast({
        title: "Not Supported",
        description: "Geolocation is not supported by this browser",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Update Order Location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="location">Current Location</Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Distribution Center - New York"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              id="latitude"
              type="number"
              step="any"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="e.g., 40.7128"
            />
          </div>
          <div>
            <Label htmlFor="longitude">Longitude</Label>
            <Input
              id="longitude"
              type="number"
              step="any"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="e.g., -74.0060"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            Save Location
          </Button>
          <Button variant="outline" onClick={handleUseCurrentLocation}>
            <MapPin className="w-4 h-4 mr-2" />
            Use Current Location
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
