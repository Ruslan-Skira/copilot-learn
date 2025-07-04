import { useState } from 'react';
import type { ChatMessage } from '../types';

interface ChatBoxProps {
  className?: string;
}

export const ChatBox: React.FC<ChatBoxProps> = ({ className = "" }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hello! I'm your City Explorer assistant. Mention any street address and I'll show it on the map!",
      sender: 'bot',
      timestamp: new Date('2025-01-07T10:30:00'),
    },
    {
      id: '2',
      text: "Can you show me 123 Main Street, New York, NY?",
      sender: 'user',
      timestamp: new Date('2025-01-07T10:31:00'),
      addresses: [{
        id: 'addr1',
        text: '123 Main Street, New York, NY',
        coordinates: { lat: 40.7128, lng: -74.0060 },
        formatted: '123 Main Street, New York, NY 10001',
        city: 'New York',
        country: 'USA',
        postalCode: '10001'
      }]
    },
    {
      id: '3',
      text: "I've detected the address '123 Main Street, New York, NY' and displayed it on the map! You can see the location marker and nearby points of interest.",
      sender: 'bot',
      timestamp: new Date('2025-01-07T10:31:30'),
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const detectAddresses = (text: string): string[] => {
    // Simple address detection regex (could be enhanced with better patterns)
    const addressPattern = /\d+\s+[A-Za-z\s]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Drive|Dr|Lane|Ln|Way|Court|Ct|Place|Pl),?\s*[A-Za-z\s]+,?\s*[A-Z]{2}/gi;
    return text.match(addressPattern) || [];
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const detectedAddresses = detectAddresses(inputValue);
      const addresses = detectedAddresses.map((addr, index) => ({
        id: `addr_${Date.now()}_${index}`,
        text: addr,
        coordinates: { lat: 40.7128, lng: -74.0060 }, // Mock coordinates
        formatted: addr,
        city: 'New York',
        country: 'USA'
      }));

      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        text: inputValue,
        sender: 'user',
        timestamp: new Date(),
        addresses: addresses.length > 0 ? addresses : undefined
      };

      setMessages([...messages, newMessage]);
      setInputValue('');

      // Simulate bot response for address detection
      if (addresses.length > 0) {
        setTimeout(() => {
          const botResponse: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: `I've detected ${addresses.length} address(es) in your message and displayed them on the map! You can see the location markers and get more details about each area.`,
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, botResponse]);
        }, 1000);
      } else {
        setTimeout(() => {
          const botResponse: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: "I'd be happy to help! Try mentioning a street address like '123 Main Street, City, State' and I'll show it on the map.",
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, botResponse]);
        }, 1000);
      }
    }
  };

  const handleNewChat = () => {
    setMessages([{
      id: 'welcome',
      text: "Hello! I'm your City Explorer assistant. Mention any street address and I'll show it on the map!",
      sender: 'bot',
      timestamp: new Date(),
    }]);
    setInputValue('');
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="h-full flex flex-col">
        <div className="mb-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">City Assistant</h2>
            <div className="w-12 h-1 bg-green-500 rounded"></div>
          </div>
          <button
            onClick={handleNewChat}
            className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            New Chat
          </button>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-0">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm">
                  {message.addresses && message.addresses.length > 0 ? (
                    // Highlight detected addresses
                    message.text.split(new RegExp(`(${message.addresses.map(a => a.text).join('|')})`, 'gi')).map((part, index) => {
                      const isAddress = message.addresses?.some(addr =>
                        addr.text.toLowerCase() === part.toLowerCase()
                      );
                      return isAddress ? (
                        <span key={index} className={`px-1 rounded ${
                          message.sender === 'user' ? 'bg-blue-800' : 'bg-yellow-200 text-gray-900'
                        }`}>
                          📍 {part}
                        </span>
                      ) : part;
                    })
                  ) : (
                    message.text
                  )}
                </p>
                {message.addresses && message.addresses.length > 0 && (
                  <div className="mt-2 text-xs">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full ${
                      message.sender === 'user' ? 'bg-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      📍 {message.addresses.length} address(es) detected
                    </span>
                  </div>
                )}
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat input */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Try: '123 Main Street, New York, NY'"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>

        {/* Status indicator */}
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            Address detection active
          </div>
          <span>{messages.length} messages</span>
        </div>
      </div>
    </div>
  );
};
