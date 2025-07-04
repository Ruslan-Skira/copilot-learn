import React from 'react';
import type { WeatherData, WeatherCondition } from '../types';

interface WeatherCardProps {
  weatherData: WeatherData | null;
  className?: string;
}

const getWeatherIcon = (condition: WeatherCondition) => {
  const iconClasses = "w-12 h-12";

  switch (condition) {
    case 'sunny':
      return (
        <svg
          className={`${iconClasses} text-yellow-500`}
          data-testid="weather-icon-sunny"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 17.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm0 1.5a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-17a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2A.75.75 0 0 1 12 2zM4.22 4.22a.75.75 0 0 1 1.06 0l1.42 1.42a.75.75 0 0 1-1.06 1.06L4.22 5.28a.75.75 0 0 1 0-1.06zm15.56 0a.75.75 0 0 1 0 1.06l-1.42 1.42a.75.75 0 0 1-1.06-1.06l1.42-1.42a.75.75 0 0 1 1.06 0zM2 12a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5h-2A.75.75 0 0 1 2 12zm17.25 0a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1-.75-.75zm-1.61 5.14a.75.75 0 0 1 1.06 1.06l-1.42 1.42a.75.75 0 0 1-1.06-1.06l1.42-1.42zm-13.34 0l1.42 1.42a.75.75 0 0 1-1.06 1.06L4.22 17.2a.75.75 0 0 1 1.06-1.06zM12 19.25a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .75-.75z"/>
        </svg>
      );
    case 'rainy':
      return (
        <svg
          className={`${iconClasses} text-blue-500`}
          data-testid="weather-icon-rainy"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M8 12l-2 3h4l-2-3zm8 0l-2 3h4l-2-3zm-4 0l-2 3h4l-2-3zm-.5-5A4.5 4.5 0 0 0 7 11.5a.75.75 0 0 1-1.5 0A6 6 0 0 1 11.5 5.5a6 6 0 0 1 5.71 4.36A4.5 4.5 0 0 1 19.5 18h-8a.75.75 0 0 1 0-1.5h8a3 3 0 0 0 .36-5.98A4.5 4.5 0 0 0 11.5 7z"/>
        </svg>
      );
    case 'cloudy':
      return (
        <svg
          className={`${iconClasses} text-gray-500`}
          data-testid="weather-icon-cloudy"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M7.5 21a6 6 0 0 1-.36-11.98A4.5 4.5 0 0 1 15.64 5.36a5.5 5.5 0 0 1 3.86 8.14A3.5 3.5 0 0 1 18 20.5H7.5zm0-1.5H18a2 2 0 0 0 .15-3.998l-.65-.003-.128-.63a4 4 0 0 0-3.372-3.369h-.5v-.5a3 3 0 0 0-5.995-.176L7.5 11h-.25A4.5 4.5 0 0 0 7.5 19.5z"/>
        </svg>
      );
    case 'snowy':
      return (
        <svg
          className={`${iconClasses} text-blue-200`}
          data-testid="weather-icon-snowy"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2a.75.75 0 0 1 .75.75v1.69l1.47-1.47a.75.75 0 0 1 1.06 1.06L13.81 5.5l1.47 1.47a.75.75 0 0 1-1.06 1.06L12.75 6.56v1.69a.75.75 0 0 1-1.5 0V6.56L9.78 8.03a.75.75 0 0 1-1.06-1.06L10.19 5.5 8.72 4.03a.75.75 0 0 1 1.06-1.06L11.25 4.44V2.75A.75.75 0 0 1 12 2zm0 16a.75.75 0 0 1 .75.75v1.69l1.47-1.47a.75.75 0 1 1 1.06 1.06L13.81 21.5l1.47 1.47a.75.75 0 1 1-1.06 1.06L12.75 22.56v1.69a.75.75 0 0 1-1.5 0v-1.69l-1.47 1.47a.75.75 0 1 1-1.06-1.06l1.47-1.47-1.47-1.47a.75.75 0 1 1 1.06-1.06l1.47 1.47V18.75A.75.75 0 0 1 12 18zM7.5 10.5A4.5 4.5 0 0 0 3 15a.75.75 0 0 1-1.5 0A6 6 0 0 1 7.5 9a6 6 0 0 1 5.71 4.36A4.5 4.5 0 0 1 15.5 22h-8a.75.75 0 0 1 0-1.5h8a3 3 0 0 0 .36-5.98A4.5 4.5 0 0 0 7.5 10.5z"/>
        </svg>
      );
    default:
      return null;
  }
};

export const WeatherCard: React.FC<WeatherCardProps> = ({
  weatherData,
  className = ""
}) => {
  // Loading state
  if (weatherData === null) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
        <div className="flex items-center justify-center py-8">
          <div
            className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
            data-testid="loading-spinner"
          />
          <span className="ml-3 text-gray-600">Loading weather...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (weatherData.error) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Weather Unavailable</h3>
          <p className="text-sm text-red-600">{weatherData.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between">
        {/* Weather icon */}
        <div className="flex-shrink-0">
          {getWeatherIcon(weatherData.condition)}
        </div>

        {/* Weather info */}
        <div className="flex-1 ml-4">
          <div className="text-lg font-semibold text-gray-900 mb-1">
            {weatherData.location}
          </div>

          <div className="text-3xl font-bold text-gray-900 mb-2">
            {weatherData.temperature}°C
          </div>

          <div className="text-sm text-gray-600">
            <span className="capitalize">{weatherData.condition}</span>
          </div>
        </div>

        {/* Wind info */}
        <div className="flex-shrink-0 text-right">
          <div className="text-sm text-gray-500 mb-1">Wind</div>
          <div className="text-lg font-medium text-gray-700">
            {weatherData.windSpeed} km/h
          </div>
        </div>
      </div>
    </div>
  );
};
