
import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface OrderMapProps {
  coordinates?: { lat: number; lng: number };
  location?: string;
  orderId?: string;
}

export function OrderMap({ coordinates, location, orderId }: OrderMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!coordinates || !mapRef.current) return;

    // Simulate a simple map with marker
    const mapContainer = mapRef.current;
    mapContainer.innerHTML = '';
    
    // Create a simple visual map representation
    const mapDiv = document.createElement('div');
    mapDiv.className = 'relative w-full h-full bg-blue-50 rounded-lg overflow-hidden';
    
    // Add grid pattern
    mapDiv.style.backgroundImage = `
      linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
    `;
    mapDiv.style.backgroundSize = '20px 20px';
    
    // Position marker based on coordinates
    const markerX = (coordinates.lng + 180) / 360 * 100;
    const markerY = (90 - coordinates.lat) / 180 * 100;
    
    const marker = document.createElement('div');
    marker.className = 'absolute transform -translate-x-1/2 -translate-y-1/2 z-10';
    marker.style.left = `${Math.max(5, Math.min(95, markerX))}%`;
    marker.style.top = `${Math.max(5, Math.min(95, markerY))}%`;
    
    marker.innerHTML = `
      <div class="relative">
        <div class="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
          <div class="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <div class="absolute top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
          ${location || 'Order Location'}
        </div>
      </div>
    `;
    
    mapDiv.appendChild(marker);
    mapContainer.appendChild(mapDiv);
  }, [coordinates, location]);

  if (!coordinates) {
    return (
      <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Location Available</h3>
          <p className="text-gray-600">
            Location tracking will appear here once available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 rounded-lg h-96 relative overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-red-500" />
          <div>
            <p className="text-sm font-medium">{location}</p>
            <p className="text-xs text-gray-500">
              {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
