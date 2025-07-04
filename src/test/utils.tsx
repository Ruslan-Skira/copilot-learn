import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { CityExplorerProvider } from '../context/CityExplorerContext';

// Custom render function that includes providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <CityExplorerProvider>
      {children}
    </CityExplorerProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

// Re-export everything from React Testing Library
export * from '@testing-library/react';

// Override render method
export { customRender as render };

// Mock data for testing
export const mockDetectedAddress = {
  id: 'test-address-1',
  text: '123 Main St, New York, NY',
  coordinates: { lat: 40.7128, lng: -74.0060 },
  formatted: '123 Main St, New York, NY 10001, USA',
  city: 'New York',
  country: 'United States',
  postalCode: '10001',
};

export const mockLocationInfo = {
  address: mockDetectedAddress,
  nearbyPlaces: [
    {
      id: 'place-1',
      name: 'Central Park',
      type: 'park',
      coordinates: { lat: 40.7829, lng: -73.9654 },
      rating: 4.5,
      distance: 500,
    },
  ],
};

export const mockChatMessage = {
  id: 'msg-1',
  text: 'Hello, I want to explore 123 Main St, New York, NY',
  timestamp: new Date('2023-01-01T10:00:00Z'),
  sender: 'user' as const,
  addresses: [mockDetectedAddress],
};

export const mockGeocodingResult = {
  lat: 40.7128,
  lng: -74.0060,
  formatted: '123 Main St, New York, NY 10001, USA',
  city: 'New York',
  country: 'United States',
  postalCode: '10001',
  state: 'New York',
};
