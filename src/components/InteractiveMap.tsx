import { useEffect, useRef, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useCityExplorer } from '../context/useCityExplorer';
import { getLocationInfo } from '../services/geocoding';

// Fix for default markers in React-Leaflet
const iconDefault = L.Icon.Default.prototype as L.Icon.Default & {
  _getIconUrl?: () => string;
};
delete iconDefault._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface InteractiveMapProps {
  className?: string;
  center?: [number, number];
  zoom?: number;
  markers?: Array<{
    id: string;
    position: [number, number];
    popup?: string;
  }>;
  onMapReady?: (addMarker: (lat: number, lng: number, popup?: string) => void, clearMarkers: () => void) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  className = "",
  center = [45.3271, 14.4422], // Rijeka, Croatia coordinates
  zoom = 13,
  markers = [],
  onMapReady
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [currentMarkers, setCurrentMarkers] = useState<L.Marker[]>([]);

  // Get city explorer context
  const { currentLocation, updateLocationInfo } = useCityExplorer();

  // Method to add new markers (will be used for address detection)
  const addMarker = (lat: number, lng: number, popup?: string) => {
    if (mapRef.current) {
      const marker = L.marker([lat, lng]).addTo(mapRef.current);
      if (popup) {
        marker.bindPopup(popup);
      }
      setCurrentMarkers(prev => [...prev, marker]);
      // Center map on new marker
      mapRef.current.setView([lat, lng], 15);
    }
  };

  // Method to clear all markers
  const clearMarkers = useCallback(() => {
    if (mapRef.current) {
      currentMarkers.forEach(marker => {
        mapRef.current!.removeLayer(marker);
      });
      setCurrentMarkers([]);
    }
  }, [currentMarkers]);

  // Handle address detection from chat
  useEffect(() => {
    if (currentLocation && mapRef.current) {
      const { address } = currentLocation;

      // Clear existing markers
      clearMarkers();

      // Add new marker for the detected address
      addMarker(
        address.coordinates.lat,
        address.coordinates.lng,
        `<div>
          <strong>${address.formatted}</strong><br/>
          ${address.city ? `${address.city}, ` : ''}${address.country || ''}
        </div>`
      );

      // Get additional location info and update context
      getLocationInfo(address).then(locationInfo => {
        updateLocationInfo(locationInfo);
      });
    }
  }, [currentLocation, updateLocationInfo, clearMarkers]);

  useEffect(() => {
    setMapReady(true);
    if (onMapReady && mapRef.current) {
      onMapReady(addMarker, clearMarkers);
    }
  }, [onMapReady, clearMarkers]);

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="h-full flex flex-col">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Interactive Map</h2>
          <div className="w-12 h-1 bg-indigo-500 rounded"></div>
        </div>

        <div className="flex-1 rounded-lg overflow-hidden relative">
          {mapReady ? (
            <MapContainer
              center={center}
              zoom={zoom}
              style={{ height: '100%', width: '100%' }}
              className="rounded-lg"
              ref={mapRef}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              {/* Default marker for Rijeka */}
              <Marker position={center}>
                <Popup>
                  <div className="text-center">
                    <strong>Rijeka, Croatia</strong>
                    <br />
                    Port city on the Adriatic Sea
                  </div>
                </Popup>
              </Marker>

              {/* Dynamic markers from props */}
              {markers.map((marker) => (
                <Marker key={marker.id} position={marker.position}>
                  {marker.popup && (
                    <Popup>
                      <div>{marker.popup}</div>
                    </Popup>
                  )}
                </Marker>
              ))}
            </MapContainer>
          ) : (
            <div className="h-full bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading map...</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <span className="inline-flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              OpenStreetMap
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={clearMarkers}
              className="text-xs text-gray-500 hover:text-gray-700 font-medium"
            >
              Clear Markers
            </button>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View Full Screen →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
