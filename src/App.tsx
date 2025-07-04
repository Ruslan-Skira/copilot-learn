import { Header, InfoBox, InteractiveMap, ChatBox } from './components';
import { CityExplorerProvider } from './context/CityExplorerContext';

function App() {
  return (
    <CityExplorerProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
        {/* Full-width Header */}
        <Header />

        {/* Full-width Main Area */}
        <main className="flex-1 w-full p-4 lg:p-6">
          {/* Three equal-width boxes that take up all available vertical space */}
          <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            {/* Info Box */}
            <InfoBox className="h-full min-h-[600px] lg:min-h-0" />

            {/* Interactive Map */}
            <InteractiveMap className="h-full min-h-[600px] lg:min-h-0" />

            {/* Chat Box */}
            <ChatBox className="h-full min-h-[600px] lg:min-h-0" />
          </div>
        </main>
      </div>
    </CityExplorerProvider>
  )
}

export default App
