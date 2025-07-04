import type { DetectedAddress, LocationInfo } from '../types';

export interface CityExplorerContextType {
  // Current location being explored
  currentLocation: LocationInfo | null;

  // Function to set a new location (triggered by chat)
  setLocation: (address: DetectedAddress) => void;

  // Function to update location info (triggered by map)
  updateLocationInfo: (locationInfo: LocationInfo) => void;

  // Loading state
  isLoadingLocation: boolean;
}
