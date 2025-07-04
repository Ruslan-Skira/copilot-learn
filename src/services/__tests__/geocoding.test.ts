import { describe, it, expect, vi, beforeEach } from 'vitest';
import { geocodeAddress, getNearbyPlaces, handleAddressDetection, getLocationInfo } from '../geocoding';

// Mock fetch
const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

describe('geocoding service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('geocodeAddress', () => {
    it('should return geocoding result for valid address', async () => {
      const mockResponse = [
        {
          lat: '40.7128',
          lon: '-74.0060',
          display_name: '123 Main St, New York, NY 10001, USA',
          address: {
            city: 'New York',
            country: 'United States',
            postcode: '10001',
            state: 'New York',
          },
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await geocodeAddress('123 Main St, New York, NY');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('https://nominatim.openstreetmap.org/search')
      );
      expect(result).toEqual({
        lat: 40.7128,
        lng: -74.0060,
        formatted: '123 Main St, New York, NY 10001, USA',
        city: 'New York',
        country: 'United States',
        postalCode: '10001',
        state: 'New York',
      });
    });

    it('should return null for invalid address', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      const result = await geocodeAddress('invalid address');

      expect(result).toBeNull();
    });

    it('should handle API errors gracefully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const result = await geocodeAddress('123 Main St');

      expect(result).toBeNull();
    });

    it('should handle network errors gracefully', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await geocodeAddress('123 Main St');

      expect(result).toBeNull();
    });
  });

  describe('getNearbyPlaces', () => {
    it('should return nearby places for valid coordinates', async () => {
      const mockResponse = {
        elements: [
          {
            id: 1,
            tags: {
              name: 'Central Park',
              amenity: 'park',
            },
            lat: 40.7829,
            lon: -73.9654,
          },
          {
            id: 2,
            tags: {
              name: 'Starbucks',
              amenity: 'cafe',
            },
            lat: 40.7589,
            lon: -73.9851,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getNearbyPlaces(40.7128, -74.0060);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        id: '1',
        name: 'Central Park',
        type: 'park',
        coordinates: { lat: 40.7829, lng: -73.9654 },
        distance: expect.any(Number),
      });
    });

    it('should filter out places without names', async () => {
      const mockResponse = {
        elements: [
          {
            id: 1,
            tags: {
              name: 'Central Park',
              amenity: 'park',
            },
            lat: 40.7829,
            lon: -73.9654,
          },
          {
            id: 2,
            tags: {
              amenity: 'cafe',
            },
            lat: 40.7589,
            lon: -73.9851,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getNearbyPlaces(40.7128, -74.0060);

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Central Park');
      expect(result[1].name).toBe('cafe'); // Uses amenity as fallback
    });

    it('should handle API errors gracefully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const result = await getNearbyPlaces(40.7128, -74.0060);

      expect(result).toEqual([]);
    });
  });

  describe('handleAddressDetection', () => {
    it('should return detected address for valid input', async () => {
      const mockResponse = [
        {
          lat: '40.7128',
          lon: '-74.0060',
          display_name: '123 Main St, New York, NY 10001, USA',
          address: {
            city: 'New York',
            country: 'United States',
            postcode: '10001',
            state: 'New York',
          },
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await handleAddressDetection('123 Main St, New York, NY');

      expect(result).toEqual({
        id: expect.any(String),
        text: '123 Main St, New York, NY',
        coordinates: { lat: 40.7128, lng: -74.0060 },
        formatted: '123 Main St, New York, NY 10001, USA',
        city: 'New York',
        country: 'United States',
        postalCode: '10001',
      });
    });

    it('should return null for invalid address', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      const result = await handleAddressDetection('invalid address');

      expect(result).toBeNull();
    });
  });

  describe('getLocationInfo', () => {
    it('should return location info with nearby places', async () => {
      const mockAddress = {
        id: 'test-1',
        text: '123 Main St, New York, NY',
        coordinates: { lat: 40.7128, lng: -74.0060 },
        formatted: '123 Main St, New York, NY 10001, USA',
        city: 'New York',
        country: 'United States',
        postalCode: '10001',
      };

      const mockResponse = {
        elements: [
          {
            id: 1,
            tags: {
              name: 'Central Park',
              amenity: 'park',
            },
            lat: 40.7829,
            lon: -73.9654,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getLocationInfo(mockAddress);

      expect(result.address).toEqual(mockAddress);
      expect(result.nearbyPlaces).toHaveLength(1);
      expect(result.nearbyPlaces[0].name).toBe('Central Park');
    });
  });
});
