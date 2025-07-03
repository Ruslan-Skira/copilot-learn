interface InteractiveMapProps {
  className?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="h-full flex flex-col">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Interactive Map</h2>
          <div className="w-12 h-1 bg-indigo-500 rounded"></div>
        </div>

        <div className="flex-1 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg relative overflow-hidden">
          {/* Map placeholder with grid pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-8 grid-rows-6 h-full">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="border border-blue-300"></div>
              ))}
            </div>
          </div>

          {/* Mock map markers */}
          <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-blue-600 rounded-full animate-pulse shadow-lg"></div>
          <div className="absolute top-3/4 left-2/3 w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-purple-500 rounded-full animate-pulse shadow-lg"></div>

          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center bg-white bg-opacity-90 rounded-lg p-6 shadow-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">World Map View</h3>
              <p className="text-sm text-gray-600 mb-4">
                Interactive map will be integrated here
              </p>
              <div className="flex justify-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <span className="inline-flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
              Major Cities
            </span>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View Full Screen →
          </button>
        </div>
      </div>
    </div>
  );
};
