interface InfoBoxProps {
  className?: string;
}

export const InfoBox: React.FC<InfoBoxProps> = ({ className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="h-full flex flex-col">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">City Information</h2>
          <div className="w-12 h-1 bg-blue-500 rounded"></div>
        </div>

        <div className="flex-1 space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">📊 Statistics</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Total Cities:</span>
                <span className="font-medium">247</span>
              </div>
              <div className="flex justify-between">
                <span>Countries:</span>
                <span className="font-medium">52</span>
              </div>
              <div className="flex justify-between">
                <span>Continents:</span>
                <span className="font-medium">7</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">🌟 Featured</h3>
            <p className="text-sm text-blue-700">
              Discover the world's most beautiful cities with detailed information,
              weather data, and local attractions.
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-medium text-green-900 mb-2">🎯 Quick Facts</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Real-time weather updates</li>
              <li>• Interactive city maps</li>
              <li>• Local attraction guides</li>
              <li>• Population insights</li>
            </ul>
          </div>
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
