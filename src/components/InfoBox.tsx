import { useCityExplorer } from '../context/useCityExplorer';

interface InfoBoxProps {
  className?: string;
}

export const InfoBox: React.FC<InfoBoxProps> = ({ className = "" }) => {
  const { currentLocation, isLoadingLocation } = useCityExplorer();

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="h-full flex flex-col">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Location Information</h2>
          <div className="w-12 h-1 bg-blue-500 rounded"></div>
        </div>

        <div className="flex-1 space-y-6">
          {isLoadingLocation ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading location info...</span>
            </div>
          ) : currentLocation ? (
            <>
              {/* Address Information */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">� Current Location</h3>
                <div className="space-y-1 text-sm text-blue-800">
                  <p className="font-medium">{currentLocation.address.formatted}</p>
                  <div className="flex justify-between">
                    <span>Latitude:</span>
                    <span className="font-mono">{currentLocation.address.coordinates.lat.toFixed(6)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Longitude:</span>
                    <span className="font-mono">{currentLocation.address.coordinates.lng.toFixed(6)}</span>
                  </div>
                  {currentLocation.address.city && (
                    <div className="flex justify-between">
                      <span>City:</span>
                      <span>{currentLocation.address.city}</span>
                    </div>
                  )}
                  {currentLocation.address.country && (
                    <div className="flex justify-between">
                      <span>Country:</span>
                      <span>{currentLocation.address.country}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Nearby Places */}
              {currentLocation.nearbyPlaces.length > 0 && (
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-medium text-green-900 mb-2">🎯 Nearby Places</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {currentLocation.nearbyPlaces.slice(0, 8).map((place) => (
                      <div key={place.id} className="flex justify-between items-center text-sm">
                        <div className="flex-1">
                          <p className="font-medium text-green-800">{place.name}</p>
                          <p className="text-green-600 text-xs capitalize">{place.type.replace(/_/g, ' ')}</p>
                        </div>
                        {place.distance && (
                          <span className="text-green-700 text-xs font-mono">
                            {place.distance > 1000
                              ? `${(place.distance / 1000).toFixed(1)}km`
                              : `${place.distance}m`
                            }
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Statistics */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">📊 Statistics</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Nearby Places:</span>
                    <span className="font-medium">{currentLocation.nearbyPlaces.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Search Radius:</span>
                    <span className="font-medium">1 km</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data Source:</span>
                    <span className="font-medium">OpenStreetMap</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Default content when no location is selected */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">💬 Getting Started</h3>
                <p className="text-sm text-gray-600">
                  Mention a street address or location in the chat to see detailed information about that place.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">� Features</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Address detection and geocoding</li>
                  <li>• Interactive map integration</li>
                  <li>• Nearby places discovery</li>
                  <li>• Real-time location data</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-medium text-green-900 mb-2">📍 Try It Out</h3>
                <p className="text-sm text-green-700">
                  Try saying: "Show me 123 Main Street, New York" or "What's near the Eiffel Tower?"
                </p>
              </div>
            </>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            View All Cities
          </button>
        </div>
      </div>
    </div>
  );
};
