import React, { useState } from 'react';
import { WeatherCard } from '../components/WeatherCard';
import type { WeatherData } from '../types';

// Example weather data for different cities and conditions
const exampleWeatherData: WeatherData[] = [
  {
    location: 'Rijeka, Croatia',
    temperature: 24,
    windSpeed: 12,
    condition: 'sunny',
  },
  {
    location: 'London, UK',
    temperature: 15,
    windSpeed: 8,
    condition: 'cloudy',
  },
  {
    location: 'Seattle, USA',
    temperature: 18,
    windSpeed: 6,
    condition: 'rainy',
  },
  {
    location: 'Moscow, Russia',
    temperature: -5,
    windSpeed: 15,
    condition: 'snowy',
  },
];

export const WeatherCardExample: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const currentWeatherData = showLoading
    ? null
    : showError
    ? { ...exampleWeatherData[0], error: 'Failed to fetch weather data' }
    : exampleWeatherData[currentIndex];

  const nextExample = () => {
    setCurrentIndex((prev) => (prev + 1) % exampleWeatherData.length);
    setShowLoading(false);
    setShowError(false);
  };

  const toggleLoading = () => {
    setShowLoading(!showLoading);
    setShowError(false);
  };

  const toggleError = () => {
    setShowError(!showError);
    setShowLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 text-center">
        WeatherCard Component Examples
      </h1>

      {/* Weather Card */}
      <WeatherCard weatherData={currentWeatherData} />

      {/* Controls */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={nextExample}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Next City ({currentIndex + 1}/{exampleWeatherData.length})
        </button>

        <button
          onClick={toggleLoading}
          className={`px-4 py-2 rounded-lg transition-colors ${
            showLoading
              ? 'bg-yellow-600 text-white hover:bg-yellow-700'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {showLoading ? 'Hide Loading' : 'Show Loading'}
        </button>

        <button
          onClick={toggleError}
          className={`px-4 py-2 rounded-lg transition-colors ${
            showError
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {showError ? 'Hide Error' : 'Show Error'}
        </button>
      </div>

      {/* Info */}
      <div className="text-sm text-gray-600 text-center space-y-2">
        <p>This component demonstrates the WeatherCard with:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Different weather conditions (sunny, cloudy, rainy, snowy)</li>
          <li>Various cities and temperatures</li>
          <li>Loading states</li>
          <li>Error handling</li>
          <li>Responsive design with Tailwind CSS</li>
        </ul>
      </div>
    </div>
  );
};
