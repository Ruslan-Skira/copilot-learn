import { describe, it, expect } from 'vitest';
import type {
  ChatMessage,
  DetectedAddress,
  LocationInfo,
  PointOfInterest,
  ChatSession
} from '../index';

describe('Types', () => {
  it('should create ChatMessage object', () => {
    const message: ChatMessage = {
      id: 'msg-1',
      text: 'Hello world',
      timestamp: new Date(),
      sender: 'user',
      addresses: [],
    };

    expect(message.id).toBe('msg-1');
    expect(message.text).toBe('Hello world');
    expect(message.sender).toBe('user');
    expect(message.addresses).toEqual([]);
  });

  it('should create DetectedAddress object', () => {
    const address: DetectedAddress = {
      id: 'addr-1',
      text: '123 Main St',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      formatted: '123 Main St, New York, NY',
      city: 'New York',
      country: 'USA',
      postalCode: '10001',
    };

    expect(address.id).toBe('addr-1');
    expect(address.text).toBe('123 Main St');
    expect(address.coordinates.lat).toBe(40.7128);
    expect(address.coordinates.lng).toBe(-74.0060);
    expect(address.city).toBe('New York');
  });

  it('should create PointOfInterest object', () => {
    const poi: PointOfInterest = {
      id: 'poi-1',
      name: 'Central Park',
      type: 'park',
      coordinates: { lat: 40.7829, lng: -73.9654 },
      rating: 4.5,
      distance: 500,
    };

    expect(poi.id).toBe('poi-1');
    expect(poi.name).toBe('Central Park');
    expect(poi.type).toBe('park');
    expect(poi.rating).toBe(4.5);
    expect(poi.distance).toBe(500);
  });

  it('should create LocationInfo object', () => {
    const address: DetectedAddress = {
      id: 'addr-1',
      text: '123 Main St',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      formatted: '123 Main St, New York, NY',
    };

    const poi: PointOfInterest = {
      id: 'poi-1',
      name: 'Central Park',
      type: 'park',
      coordinates: { lat: 40.7829, lng: -73.9654 },
    };

    const locationInfo: LocationInfo = {
      address,
      nearbyPlaces: [poi],
    };

    expect(locationInfo.address).toEqual(address);
    expect(locationInfo.nearbyPlaces).toHaveLength(1);
    expect(locationInfo.nearbyPlaces[0]).toEqual(poi);
  });

  it('should create ChatSession object', () => {
    const message: ChatMessage = {
      id: 'msg-1',
      text: 'Hello',
      timestamp: new Date(),
      sender: 'user',
    };

    const session: ChatSession = {
      id: 'session-1',
      title: 'New Chat',
      messages: [message],
      createdAt: new Date(),
      lastActivity: new Date(),
    };

    expect(session.id).toBe('session-1');
    expect(session.title).toBe('New Chat');
    expect(session.messages).toHaveLength(1);
    expect(session.messages[0]).toEqual(message);
  });

  it('should handle optional properties', () => {
    const message: ChatMessage = {
      id: 'msg-1',
      text: 'Hello',
      timestamp: new Date(),
      sender: 'user',
      // addresses is optional
    };

    expect(message.addresses).toBeUndefined();

    const address: DetectedAddress = {
      id: 'addr-1',
      text: '123 Main St',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      formatted: '123 Main St, New York, NY',
      // city, country, postalCode are optional
    };

    expect(address.city).toBeUndefined();
    expect(address.country).toBeUndefined();
    expect(address.postalCode).toBeUndefined();
  });
});
