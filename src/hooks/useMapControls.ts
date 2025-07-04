import { useCallback, useRef } from 'react';

interface MapControls {
  addMarker: (lat: number, lng: number, popup?: string) => void;
  clearMarkers: () => void;
}

export const useMapControls = () => {
  const mapControlsRef = useRef<MapControls | null>(null);

  const setMapControls = useCallback((addMarker: (lat: number, lng: number, popup?: string) => void, clearMarkers: () => void) => {
    mapControlsRef.current = { addMarker, clearMarkers };
  }, []);

  const addMarker = useCallback((lat: number, lng: number, popup?: string) => {
    if (mapControlsRef.current) {
      mapControlsRef.current.addMarker(lat, lng, popup);
    }
  }, []);

  const clearMarkers = useCallback(() => {
    if (mapControlsRef.current) {
      mapControlsRef.current.clearMarkers();
    }
  }, []);

  return {
    setMapControls,
    addMarker,
    clearMarkers,
  };
};
