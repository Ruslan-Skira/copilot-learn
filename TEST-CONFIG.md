# Test Configuration and Environment

## Environment Setup

```bash
# Install dependencies
npm install

# Run tests
npm test

# Generate coverage report
npm run test:coverage
```

## Test Files Structure

```
src/
├── __tests__/
│   └── App.test.tsx
├── components/
│   └── __tests__/
│       ├── Header.test.tsx
│       ├── InfoBox.test.tsx
│       ├── InteractiveMap.test.tsx
│       └── ChatBox.test.tsx
├── context/
│   └── __tests__/
│       └── CityExplorerContext.test.tsx
├── hooks/
│   └── __tests__/
│       └── useMapControls.test.ts
├── services/
│   └── __tests__/
│       └── geocoding.test.ts
├── types/
│   └── __tests__/
│       └── index.test.ts
└── test/
    ├── setup.ts
    └── utils.tsx
```

## Coverage Report

Run `npm run test:coverage` to generate a comprehensive coverage report including:

- HTML report in `coverage/index.html`
- JSON report in `coverage/coverage-final.json`
- Text summary in terminal

## Test Commands

- `npm test` - Run all tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run test:ui` - Run tests with Vitest UI
- `npm test -- --run` - Run tests once (CI mode)
- `npm test -- --grep "pattern"` - Run tests matching pattern
