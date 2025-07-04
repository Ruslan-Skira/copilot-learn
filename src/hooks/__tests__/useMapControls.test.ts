import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMapControls } from '../useMapControls';

describe('useMapControls', () => {
  it('should initialize with empty controls', () => {
    const { result } = renderHook(() => useMapControls());

    expect(result.current.setMapControls).toBeInstanceOf(Function);
    expect(result.current.addMarker).toBeInstanceOf(Function);
    expect(result.current.clearMarkers).toBeInstanceOf(Function);
  });

  it('should set map controls', () => {
    const { result } = renderHook(() => useMapControls());

    const mockAddMarker = vi.fn();
    const mockClearMarkers = vi.fn();

    act(() => {
      result.current.setMapControls(mockAddMarker, mockClearMarkers);
    });

    // Should not throw error
    expect(() => result.current.addMarker(40.7128, -74.0060)).not.toThrow();
    expect(() => result.current.clearMarkers()).not.toThrow();
  });

  it('should call addMarker when controls are set', () => {
    const { result } = renderHook(() => useMapControls());

    const mockAddMarker = vi.fn();
    const mockClearMarkers = vi.fn();

    act(() => {
      result.current.setMapControls(mockAddMarker, mockClearMarkers);
    });

    act(() => {
      result.current.addMarker(40.7128, -74.0060, 'Test popup');
    });

    expect(mockAddMarker).toHaveBeenCalledWith(40.7128, -74.0060, 'Test popup');
  });

  it('should call clearMarkers when controls are set', () => {
    const { result } = renderHook(() => useMapControls());

    const mockAddMarker = vi.fn();
    const mockClearMarkers = vi.fn();

    act(() => {
      result.current.setMapControls(mockAddMarker, mockClearMarkers);
    });

    act(() => {
      result.current.clearMarkers();
    });

    expect(mockClearMarkers).toHaveBeenCalled();
  });

  it('should handle calls before controls are set', () => {
    const { result } = renderHook(() => useMapControls());

    // Should not throw error when called before controls are set
    expect(() => result.current.addMarker(40.7128, -74.0060)).not.toThrow();
    expect(() => result.current.clearMarkers()).not.toThrow();
  });
});
