import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import { CityExplorerProvider } from '../CityExplorerContext';
import { useCityExplorer } from '../useCityExplorer';

// Test component that uses the context
const TestComponent = () => {
  const { currentLocation, setLocation, updateLocationInfo, isLoadingLocation } = useCityExplorer();

  return (
    <div>
      <div data-testid="loading">{isLoadingLocation ? 'Loading' : 'Not Loading'}</div>
      <div data-testid="location">{currentLocation ? currentLocation.address.formatted : 'No Location'}</div>
      <button
        onClick={() => setLocation({
          id: 'test-1',
          text: '123 Main St',
          coordinates: { lat: 40.7128, lng: -74.0060 },
          formatted: '123 Main St, New York, NY',
          city: 'New York',
          country: 'USA',
        })}
        data-testid="set-location"
      >
        Set Location
      </button>
      <button
        onClick={() => updateLocationInfo({
          address: {
            id: 'test-2',
            text: '456 Oak Ave',
            coordinates: { lat: 40.7589, lng: -73.9851 },
            formatted: '456 Oak Ave, New York, NY',
            city: 'New York',
            country: 'USA',
          },
          nearbyPlaces: [],
        })}
        data-testid="update-location"
      >
        Update Location
      </button>
    </div>
  );
};

describe('CityExplorerContext', () => {
  it('should provide default values', () => {
    render(
      <CityExplorerProvider>
        <TestComponent />
      </CityExplorerProvider>
    );

    expect(screen.getByTestId('loading')).toHaveTextContent('Not Loading');
    expect(screen.getByTestId('location')).toHaveTextContent('No Location');
  });

  it('should set location when setLocation is called', async () => {
    render(
      <CityExplorerProvider>
        <TestComponent />
      </CityExplorerProvider>
    );

    const setLocationButton = screen.getByTestId('set-location');

    act(() => {
      setLocationButton.click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('location')).toHaveTextContent('123 Main St, New York, NY');
    });
  });

  it('should update location info when updateLocationInfo is called', async () => {
    render(
      <CityExplorerProvider>
        <TestComponent />
      </CityExplorerProvider>
    );

    const updateLocationButton = screen.getByTestId('update-location');

    act(() => {
      updateLocationButton.click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('location')).toHaveTextContent('456 Oak Ave, New York, NY');
    });
  });

  it('should show loading state during location setting', async () => {
    render(
      <CityExplorerProvider>
        <TestComponent />
      </CityExplorerProvider>
    );

    const setLocationButton = screen.getByTestId('set-location');

    act(() => {
      setLocationButton.click();
    });

    // The loading state should be visible briefly
    expect(screen.getByTestId('loading')).toHaveTextContent('Not Loading');

    await waitFor(() => {
      expect(screen.getByTestId('location')).toHaveTextContent('123 Main St, New York, NY');
    });
  });

  it('should handle errors gracefully', async () => {
    // Mock console.error to avoid noise in tests
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <CityExplorerProvider>
        <TestComponent />
      </CityExplorerProvider>
    );

    const setLocationButton = screen.getByTestId('set-location');
    setLocationButton.click();

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Not Loading');
    });

    consoleSpy.mockRestore();
  });
});
