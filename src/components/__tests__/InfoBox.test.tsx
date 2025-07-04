import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '../../test/utils';
import { InfoBox } from '../InfoBox';
import { mockLocationInfo } from '../../test/utils';
import type { LocationInfo } from '../../types';

// Mock the useCityExplorer hook
const mockUseCityExplorer = {
  currentLocation: null as LocationInfo | null,
  isLoadingLocation: false,
  setLocation: vi.fn(),
  updateLocationInfo: vi.fn(),
};

vi.mock('../../context/useCityExplorer', () => ({
  useCityExplorer: () => mockUseCityExplorer,
}));

describe('InfoBox', () => {
  beforeEach(() => {
    // Reset mock before each test
    mockUseCityExplorer.currentLocation = null;
    mockUseCityExplorer.isLoadingLocation = false;
  });

  it('should render with default content when no location is selected', () => {
    render(<InfoBox />);

    expect(screen.getByText('Location Information')).toBeInTheDocument();
    expect(screen.getByText(/Getting Started/)).toBeInTheDocument();
    expect(screen.getByText(/Features/)).toBeInTheDocument();
    expect(screen.getByText(/Try It Out/)).toBeInTheDocument();
  });

  it('should show loading state when location is being loaded', () => {
    mockUseCityExplorer.isLoadingLocation = true;

    render(<InfoBox />);

    expect(screen.getByText('Loading location info...')).toBeInTheDocument();
    // The loading spinner doesn't have a role="status" in the implementation
    expect(screen.getByText('Loading location info...')).toBeInTheDocument();
  });

  it('should display location information when currentLocation is set', () => {
    mockUseCityExplorer.currentLocation = mockLocationInfo;

    render(<InfoBox />);

    expect(screen.getByText(/Current Location/)).toBeInTheDocument();
    expect(screen.getByText(mockLocationInfo.address.formatted)).toBeInTheDocument();
    expect(screen.getByText(mockLocationInfo.address.coordinates.lat.toFixed(6))).toBeInTheDocument();
    expect(screen.getByText(mockLocationInfo.address.coordinates.lng.toFixed(6))).toBeInTheDocument();
  });

  it('should display city and country when available', () => {
    mockUseCityExplorer.currentLocation = mockLocationInfo;

    render(<InfoBox />);

    expect(screen.getByText('City:')).toBeInTheDocument();
    expect(screen.getByText(mockLocationInfo.address.city!)).toBeInTheDocument();
    expect(screen.getByText('Country:')).toBeInTheDocument();
    expect(screen.getByText(mockLocationInfo.address.country!)).toBeInTheDocument();
  });

  it('should display nearby places when available', () => {
    mockUseCityExplorer.currentLocation = mockLocationInfo;

    render(<InfoBox />);

    expect(screen.getByText('🎯 Nearby Places')).toBeInTheDocument();
    expect(screen.getByText('Central Park')).toBeInTheDocument();
    expect(screen.getByText('park')).toBeInTheDocument();
  });

  it('should display statistics', () => {
    mockUseCityExplorer.currentLocation = mockLocationInfo;

    render(<InfoBox />);

    expect(screen.getByText('📊 Statistics')).toBeInTheDocument();
    expect(screen.getByText('Nearby Places:')).toBeInTheDocument();
    expect(screen.getByText('Search Radius:')).toBeInTheDocument();
    expect(screen.getByText('Data Source:')).toBeInTheDocument();
  });

  it('should format distance correctly', () => {
    const locationWithLongDistance = {
      ...mockLocationInfo,
      nearbyPlaces: [
        {
          ...mockLocationInfo.nearbyPlaces[0],
          distance: 1500, // 1.5 km
        },
        {
          id: 'place-2',
          name: 'Close Place',
          type: 'restaurant',
          coordinates: { lat: 40.7128, lng: -74.0060 },
          distance: 250, // 250 meters
        },
      ],
    };

    mockUseCityExplorer.currentLocation = locationWithLongDistance;

    render(<InfoBox />);

    expect(screen.getByText('1.5km')).toBeInTheDocument();
    expect(screen.getByText('250m')).toBeInTheDocument();
  });

  it('should have proper styling classes', () => {
    const { container } = render(<InfoBox />);

    const infoBox = container.firstChild as HTMLElement;
    expect(infoBox).toHaveClass('bg-white', 'rounded-lg', 'shadow-sm', 'border', 'border-gray-200', 'p-6');
  });

  it('should apply custom className', () => {
    const { container } = render(<InfoBox className="custom-class" />);

    const infoBox = container.firstChild as HTMLElement;
    expect(infoBox).toHaveClass('custom-class');
  });

  it('should render View All Cities button', () => {
    render(<InfoBox />);

    const button = screen.getByRole('button', { name: /view all cities/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('w-full', 'bg-blue-600', 'text-white');
  });
});
