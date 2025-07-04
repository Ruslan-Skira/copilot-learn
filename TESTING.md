# Testing Documentation

## Overview

This project uses **Vitest** as the testing framework with **React Testing Library** for component testing. The test suite provides comprehensive coverage for all major components, services, hooks, and utilities.

## Test Framework Setup

### Dependencies

- **Vitest**: Modern, fast testing framework
- **React Testing Library**: Testing utilities for React components
- **@testing-library/jest-dom**: Custom Jest matchers
- **@testing-library/user-event**: User interaction simulation
- **jsdom**: DOM environment for testing

### Configuration

- **Test Files**: `**/*.test.{ts,tsx}` and `**/__tests__/**/*`
- **Environment**: jsdom (browser-like environment)
- **Coverage**: v8 provider with HTML, JSON, and text reports
- **Setup**: Global test setup in `src/test/setup.ts`

## Test Structure

### Components Tests

- **Header**: Layout, navigation, styling
- **InfoBox**: Location display, loading states, statistics
- **InteractiveMap**: Map rendering, markers, location updates
- **ChatBox**: User input, message handling, API integration
- **App**: Main layout, component integration

### Services Tests

- **Geocoding**: Address geocoding, nearby places, API error handling
- **Location handling**: Address detection, location info retrieval

### Context Tests

- **CityExplorerContext**: State management, location updates, provider functionality

### Hooks Tests

- **useMapControls**: Map interaction controls, marker management

### Types Tests

- **TypeScript interfaces**: Data structure validation

## Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

### Test Patterns

```bash
# Run specific test file
npm test -- Header.test.tsx

# Run tests matching pattern
npm test -- --grep "should render"

# Run tests for specific component
npm test -- src/components/__tests__/
```

## Test Coverage

### Current Coverage Areas

- ✅ **Components**: All main UI components
- ✅ **Services**: Geocoding and location services
- ✅ **Context**: State management and providers
- ✅ **Hooks**: Custom React hooks
- ✅ **Types**: TypeScript interface validation
- ✅ **App**: Main application component

### Coverage Goals

- **Statements**: >90%
- **Branches**: >85%
- **Functions**: >90%
- **Lines**: >90%

## Test Utilities

### Custom Render

- `render()` function that wraps components with providers
- Includes `CityExplorerProvider` automatically
- Supports all React Testing Library options

### Mock Data

- `mockDetectedAddress`: Sample address data
- `mockLocationInfo`: Sample location with nearby places
- `mockChatMessage`: Sample chat message
- `mockGeocodingResult`: Sample geocoding API response

### Mocking Strategy

- **API Calls**: Mock fetch with predefined responses
- **External Libraries**: Mock Leaflet, React-Leaflet
- **Environment Variables**: Mock Vite env vars
- **DOM APIs**: Mock scrollIntoView, scrollTo

## Common Testing Patterns

### Component Testing

```typescript
describe("ComponentName", () => {
  it("should render correctly", () => {
    render(<ComponentName />);
    expect(screen.getByText("Expected Text")).toBeInTheDocument();
  });
});
```

### User Interaction Testing

```typescript
it("should handle user input", async () => {
  const user = userEvent.setup();
  render(<ComponentName />);

  const input = screen.getByRole("textbox");
  await user.type(input, "test input");

  expect(input).toHaveValue("test input");
});
```

### Async Testing

```typescript
it("should handle async operations", async () => {
  render(<ComponentName />);

  await waitFor(() => {
    expect(screen.getByText("Loaded")).toBeInTheDocument();
  });
});
```

### Mock API Testing

```typescript
it("should call API correctly", async () => {
  const mockFetch = vi.fn();
  global.fetch = mockFetch;

  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ data: "test" }),
  });

  // Test API call
  expect(mockFetch).toHaveBeenCalledWith(expectedUrl);
});
```

## Best Practices

### Test Organization

- Group related tests with `describe` blocks
- Use descriptive test names with "should"
- Test both happy path and error cases
- Mock external dependencies

### Test Data

- Use consistent mock data across tests
- Create reusable test utilities
- Keep test data close to test files
- Use factory functions for complex data

### Assertions

- Use semantic queries (getByRole, getByText)
- Prefer user-centric assertions
- Test behavior, not implementation
- Use proper accessibility queries

### Mocking

- Mock at the boundary (API, external libs)
- Keep mocks simple and predictable
- Reset mocks between tests
- Mock only what's necessary

## Continuous Integration

### GitHub Actions

```yaml
- name: Run Tests
  run: npm test -- --coverage

- name: Upload Coverage
  uses: codecov/codecov-action@v3
```

### Pre-commit Hooks

```bash
# Run tests before commit
npm test -- --run --bail
```

## Debugging Tests

### Common Issues

1. **Missing DOM methods**: Add mocks to test setup
2. **Async operations**: Use waitFor, act wrappers
3. **Environment variables**: Mock in test setup
4. **External libraries**: Mock with vi.mock()

### Debug Commands

```bash
# Run single test in debug mode
npm test -- --debug ComponentName.test.tsx

# Run with verbose output
npm test -- --verbose

# Run with coverage details
npm test -- --coverage --reporter=verbose
```

## Test Maintenance

### Adding New Tests

1. Create test file alongside component
2. Use existing test utilities
3. Follow naming conventions
4. Add to coverage reports

### Updating Tests

1. Update when component API changes
2. Maintain test data consistency
3. Update mocks for new dependencies
4. Keep tests focused and minimal

### Performance

- Use `vi.mock()` for expensive operations
- Avoid unnecessary DOM operations
- Use appropriate waiting strategies
- Keep test suites focused

## Future Improvements

### Planned Enhancements

- [ ] Visual regression tests
- [ ] End-to-end testing with Playwright
- [ ] Performance testing
- [ ] Accessibility testing automation
- [ ] Integration tests with real APIs

### Test Quality Metrics

- [ ] Test execution time monitoring
- [ ] Flaky test detection
- [ ] Coverage trend analysis
- [ ] Test maintenance overhead tracking
