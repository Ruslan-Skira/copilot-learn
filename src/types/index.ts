// Data types as specified in copilot-instructions
export interface ChatMessage {
  id: string;
  text: string;
  timestamp: Date;
  sender: 'user' | 'bot';
  addresses?: DetectedAddress[];
}

export interface DetectedAddress {
  id: string;
  text: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  formatted: string;
  city?: string;
  country?: string;
  postalCode?: string;
}

export interface LocationInfo {
  address: DetectedAddress;
  nearbyPlaces: PointOfInterest[];
  weather?: WeatherData;
  demographics?: CityStats;
}

export interface PointOfInterest {
  id: string;
  name: string;
  type: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  rating?: number;
  distance?: number;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  lastActivity: Date;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

export interface CityStats {
  population: number;
  area: number;
  density: number;
  medianIncome?: number;
}
