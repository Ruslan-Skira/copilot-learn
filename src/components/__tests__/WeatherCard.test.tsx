import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WeatherCard } from '../WeatherCard';

// Mock weather data
const mockWeatherData = {
  location: 'Rijeka, Croatia',
  temperature: 24,
  windSpeed: 12,
  condition: 'sunny' as const,
};

const mockWeatherDataRainy = {
  location: 'New York, USA',
  temperature: 18,
  windSpeed: 8,
  condition: 'rainy' as const,
};

const mockWeatherDataCloudy = {
  location: 'London, UK',
  temperature: 15,
  windSpeed: 6,
  condition: 'cloudy' as const,
};

const mockWeatherDataSnowy = {
  location: 'Moscow, Russia',
  temperature: -5,
  windSpeed: 15,
  condition: 'snowy' as const,
};

describe('WeatherCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render weather information correctly', () => {
    render(<WeatherCard weatherData={mockWeatherData} />);

    expect(screen.getByText('Rijeka, Croatia')).toBeInTheDocument();
    expect(screen.getByText('24°C')).toBeInTheDocument();
    expect(screen.getByText('12 km/h')).toBeInTheDocument();
  });

  it('should display sunny icon for sunny weather', () => {
    render(<WeatherCard weatherData={mockWeatherData} />);

    const sunIcon = screen.getByTestId('weather-icon-sunny');
    expect(sunIcon).toBeInTheDocument();
    expect(sunIcon).toHaveClass('text-yellow-500');
  });

  it('should display rainy icon for rainy weather', () => {
    render(<WeatherCard weatherData={mockWeatherDataRainy} />);

    const rainIcon = screen.getByTestId('weather-icon-rainy');
    expect(rainIcon).toBeInTheDocument();
    expect(rainIcon).toHaveClass('text-blue-500');
  });

  it('should display cloudy icon for cloudy weather', () => {
    render(<WeatherCard weatherData={mockWeatherDataCloudy} />);

    const cloudIcon = screen.getByTestId('weather-icon-cloudy');
    expect(cloudIcon).toBeInTheDocument();
    expect(cloudIcon).toHaveClass('text-gray-500');
  });

  it('should display snowy icon for snowy weather', () => {
    render(<WeatherCard weatherData={mockWeatherDataSnowy} />);

    const snowIcon = screen.getByTestId('weather-icon-snowy');
    expect(snowIcon).toBeInTheDocument();
    expect(snowIcon).toHaveClass('text-blue-200');
  });

  it('should handle negative temperatures correctly', () => {
    render(<WeatherCard weatherData={mockWeatherDataSnowy} />);

    expect(screen.getByText('-5°C')).toBeInTheDocument();
  });

  it('should show loading state when no weather data is provided', () => {
    render(<WeatherCard weatherData={null} />);

    expect(screen.getByText('Loading weather...')).toBeInTheDocument();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('should show error state when weatherData has error', () => {
    const errorData = {
      location: '',
      temperature: 0,
      windSpeed: 0,
      condition: 'sunny' as const,
      error: 'Failed to fetch weather data',
    };

    render(<WeatherCard weatherData={errorData} />);

    expect(screen.getByText('Weather Unavailable')).toBeInTheDocument();
    expect(screen.getByText('Failed to fetch weather data')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <WeatherCard weatherData={mockWeatherData} className="custom-class" />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should have proper styling classes', () => {
    const { container } = render(<WeatherCard weatherData={mockWeatherData} />);

    expect(container.firstChild).toHaveClass(
      'bg-white',
      'rounded-lg',
      'shadow-sm',
      'border',
      'border-gray-200',
      'p-6'
    );
  });

  it('should display wind speed with correct units', () => {
    render(<WeatherCard weatherData={mockWeatherData} />);

    expect(screen.getByText(/wind/i)).toBeInTheDocument();
    expect(screen.getByText('12 km/h')).toBeInTheDocument();
  });

  it('should format temperature with degree symbol', () => {
    render(<WeatherCard weatherData={mockWeatherData} />);

    const temperatureElement = screen.getByText('24°C');
    expect(temperatureElement).toBeInTheDocument();
    expect(temperatureElement).toHaveClass('text-3xl', 'font-bold');
  });

  it('should display location prominently', () => {
    render(<WeatherCard weatherData={mockWeatherData} />);

    const locationElement = screen.getByText('Rijeka, Croatia');
    expect(locationElement).toBeInTheDocument();
    expect(locationElement).toHaveClass('text-lg', 'font-semibold');
  });
});
