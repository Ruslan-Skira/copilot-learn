import type { DetectedAddress, LocationInfo, PointOfInterest } from '../types';

export interface GeocodingResult {
  lat: number;
  lng: number;
  formatted: string;
  city?: string;
  country?: string;
  postalCode?: string;
  state?: string;
}

// Using Nominatim (OpenStreetMap) geocoding service - free and no API key required
export const geocodeAddress = async (address: string): Promise<GeocodingResult | null> => {
  try {
    const encodedAddress = encodeURIComponent(address);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1&addressdetails=1`
    );

    if (!response.ok) {
      throw new Error('Geocoding request failed');
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      return null;
    }

    const result = data[0];
    const addressComponents = result.address || {};

    return {
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
      formatted: result.display_name,
      city: addressComponents.city || addressComponents.town || addressComponents.village,
      country: addressComponents.country,
      postalCode: addressComponents.postcode,
      state: addressComponents.state || addressComponents.province,
    };
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
};

interface OverpassElement {
  id: number;
  lat?: number;
  lon?: number;
  center?: {
    lat: number;
    lon: number;
  };
  tags?: {
    name?: string;
    amenity?: string;
    [key: string]: string | undefined;
  };
}

interface OverpassResponse {
  elements: OverpassElement[];
}

// Get nearby places using Overpass API (OpenStreetMap)
export const getNearbyPlaces = async (lat: number, lng: number, radiusMeters: number = 1000): Promise<PointOfInterest[]> => {
  try {
    const overpassQuery = `
      [out:json][timeout:25];
      (
        node["amenity"~"restaurant|cafe|bank|hospital|school|hotel|pharmacy|supermarket|gas_station|post_office|library|museum|cinema|theatre|park|playground|swimming_pool|gym|church|mosque|synagogue|temple|university|college|police|fire_station|bus_station|subway_station|railway_station|taxi_stand|car_rental|tourist_information|attraction|monument|viewpoint|fountain|statue|memorial|castle|ruins|historic|gallery|zoo|aquarium|amusement_park|theme_park|water_park|stadium|arena|raceway|golf_course|sports_centre|tennis_court|basketball_court|football_field|baseball_field|cricket_field|rugby_field|hockey_field|volleyball_court|badminton_court|table_tennis|bowling_alley|billiards|darts|bingo|casino|nightclub|bar|pub|fast_food|food_court|ice_cream|bakery|butcher|deli|grocery|convenience|department_store|mall|shopping_centre|market|flea_market|car_wash|car_repair|fuel|charging_station|parking|bicycle_rental|car_sharing|boat_rental|marina|dock|pier|beach|swimming_area|sauna|spa|beauty_salon|hairdresser|barber|dentist|veterinary|clinic|nursing_home|kindergarten|childcare|social_centre|community_centre|town_hall|courthouse|embassy|consulate|government|office|coworking_space|conference_centre|exhibition_centre|trade_centre|research_institute|laboratory|studio|workshop|factory|warehouse|industrial"](around:${radiusMeters},${lat},${lng});
        way["amenity"~"restaurant|cafe|bank|hospital|school|hotel|pharmacy|supermarket|gas_station|post_office|library|museum|cinema|theatre|park|playground|swimming_pool|gym|church|mosque|synagogue|temple|university|college|police|fire_station|bus_station|subway_station|railway_station|taxi_stand|car_rental|tourist_information|attraction|monument|viewpoint|fountain|statue|memorial|castle|ruins|historic|gallery|zoo|aquarium|amusement_park|theme_park|water_park|stadium|arena|raceway|golf_course|sports_centre|tennis_court|basketball_court|football_field|baseball_field|cricket_field|rugby_field|hockey_field|volleyball_court|badminton_court|table_tennis|bowling_alley|billiards|darts|bingo|casino|nightclub|bar|pub|fast_food|food_court|ice_cream|bakery|butcher|deli|grocery|convenience|department_store|mall|shopping_centre|market|flea_market|car_wash|car_repair|fuel|charging_station|parking|bicycle_rental|car_sharing|boat_rental|marina|dock|pier|beach|swimming_area|sauna|spa|beauty_salon|hairdresser|barber|dentist|veterinary|clinic|nursing_home|kindergarten|childcare|social_centre|community_centre|town_hall|courthouse|embassy|consulate|government|office|coworking_space|conference_centre|exhibition_centre|trade_centre|research_institute|laboratory|studio|workshop|factory|warehouse|industrial"](around:${radiusMeters},${lat},${lng});
        relation["amenity"~"restaurant|cafe|bank|hospital|school|hotel|pharmacy|supermarket|gas_station|post_office|library|museum|cinema|theatre|park|playground|swimming_pool|gym|church|mosque|synagogue|temple|university|college|police|fire_station|bus_station|subway_station|railway_station|taxi_stand|car_rental|tourist_information|attraction|monument|viewpoint|fountain|statue|memorial|castle|ruins|historic|gallery|zoo|aquarium|amusement_park|theme_park|water_park|stadium|arena|raceway|golf_course|sports_centre|tennis_court|basketball_court|football_field|baseball_field|cricket_field|rugby_field|hockey_field|volleyball_court|badminton_court|table_tennis|bowling_alley|billiards|darts|bingo|casino|nightclub|bar|pub|fast_food|food_court|ice_cream|bakery|butcher|deli|grocery|convenience|department_store|mall|shopping_centre|market|flea_market|car_wash|car_repair|fuel|charging_station|parking|bicycle_rental|car_sharing|boat_rental|marina|dock|pier|beach|swimming_area|sauna|spa|beauty_salon|hairdresser|barber|dentist|veterinary|clinic|nursing_home|kindergarten|childcare|social_centre|community_centre|town_hall|courthouse|embassy|consulate|government|office|coworking_space|conference_centre|exhibition_centre|trade_centre|research_institute|laboratory|studio|workshop|factory|warehouse|industrial"](around:${radiusMeters},${lat},${lng});
      );
      out center meta;
    `;

    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `data=${encodeURIComponent(overpassQuery)}`,
    });

    if (!response.ok) {
      throw new Error('Overpass API request failed');
    }

    const data: OverpassResponse = await response.json();

    return data.elements.slice(0, 10).map((element: OverpassElement): PointOfInterest => {
      const elementLat = element.lat || element.center?.lat || lat;
      const elementLng = element.lon || element.center?.lon || lng;

      return {
        id: element.id.toString(),
        name: element.tags?.name || element.tags?.amenity || 'Unknown',
        type: element.tags?.amenity || 'unknown',
        coordinates: {
          lat: elementLat,
          lng: elementLng,
        },
        distance: calculateDistance(lat, lng, elementLat, elementLng),
      };
    });
  } catch (error) {
    console.error('Error fetching nearby places:', error);
    return [];
  }
};

// Calculate distance between two points in meters
const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lng2-lng1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return Math.round(R * c);
};

// Main function to handle address detection from chat
export const handleAddressDetection = async (address: string): Promise<DetectedAddress | null> => {
  const geocodingResult = await geocodeAddress(address);

  if (!geocodingResult) {
    return null;
  }

  return {
    id: Date.now().toString(),
    text: address,
    coordinates: {
      lat: geocodingResult.lat,
      lng: geocodingResult.lng,
    },
    formatted: geocodingResult.formatted,
    city: geocodingResult.city,
    country: geocodingResult.country,
    postalCode: geocodingResult.postalCode,
  };
};

// Function to get complete location info (for InfoBox)
export const getLocationInfo = async (address: DetectedAddress): Promise<LocationInfo> => {
  const nearbyPlaces = await getNearbyPlaces(
    address.coordinates.lat,
    address.coordinates.lng,
    1000 // 1km radius
  );

  return {
    address,
    nearbyPlaces,
    // Weather data can be added here in the future
  };
};
