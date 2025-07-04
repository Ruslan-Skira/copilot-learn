import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock environment variables for testing
Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_OPENAI_API_KEY: 'test-api-key',
    VITE_ASSISTANT_ID: 'test-assistant-id',
  },
  writable: true,
});

// Mock fetch globally for tests
globalThis.fetch = vi.fn();

// Mock window.scrollTo for tests
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

// Mock scrollIntoView for tests
Element.prototype.scrollIntoView = vi.fn();
