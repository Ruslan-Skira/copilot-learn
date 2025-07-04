import React, { createContext, useState, useCallback } from 'react';
import type { DetectedAddress, LocationInfo } from '../types';
import type { CityExplorerContextType } from './types';

const CityExplorerContext = createContext<CityExplorerContextType | undefined>(undefined);

interface CityExplorerProviderProps {
  children: React.ReactNode;
}

export const CityExplorerProvider: React.FC<CityExplorerProviderProps> = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState<LocationInfo | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const setLocation = useCallback(async (address: DetectedAddress) => {
    setIsLoadingLocation(true);
    try {
      // Create initial location info
      const locationInfo: LocationInfo = {
        address,
        nearbyPlaces: [],
        // Additional data will be populated by the map component
      };

      setCurrentLocation(locationInfo);
    } catch (error) {
      console.error('Error setting location:', error);
    } finally {
      setIsLoadingLocation(false);
    }
  }, []);

  const updateLocationInfo = useCallback((locationInfo: LocationInfo) => {
    setCurrentLocation(locationInfo);
  }, []);

  return (
    <CityExplorerContext.Provider
      value={{
        currentLocation,
        setLocation,
        updateLocationInfo,
        isLoadingLocation,
      }}
    >
      {children}
    </CityExplorerContext.Provider>
  );
};

export { CityExplorerContext };
