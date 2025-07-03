<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# City Explorer Project Instructions

## Project Description

City Explorer is an interactive chat application where users can start conversations about cities, mention street addresses, and see them displayed on an interactive map with detailed location information.

### App Layout

The application features:

- **Full-width header** spanning the entire screen width
- **Three equal-width columns** below the header:
  1. **Info Box** - Displays city information, statistics, and context
  2. **Interactive Map** - Shows mentioned addresses and locations visually
  3. **Chat** - Interactive conversation area with input controls

### Core Functionality

- **Chat Interface**: Users can discuss cities and mention specific street addresses
- **Address Recognition**: The app detects street addresses mentioned in chat
- **Map Integration**: Addresses are automatically displayed on the interactive map
- **Location Details**: Users can get detailed information about specific locations
- **Chat Controls**: Text input, submit button, and new chat functionality

## Technology Stack

This is a React.js web application built with:

- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework with @tailwindcss/postcss plugin
- **React 18** - Modern React with hooks

## Project Structure

- Focus on clean, modern React components with TypeScript
- Use Tailwind CSS classes for styling (no custom CSS files unless necessary)
- Implement responsive design patterns
- Follow React best practices and hooks patterns
- Keep components in `src/components/` directory when created
- Use absolute imports for better maintainability

## Code Style Preferences

### TypeScript Guidelines

- Use functional components with hooks exclusively
- Prefer `const` assertions and explicit typing
- Define interfaces for all props and data structures
- Use proper TypeScript generics for reusable components
- Avoid `any` type - use proper typing or `unknown`
- Use optional chaining (`?.`) and nullish coalescing (`??`) operators

### React Best Practices

- Use `useState` for local component state
- Use `useEffect` with proper dependency arrays
- Implement custom hooks for reusable logic
- Use `React.memo` for performance optimization when needed
- Handle loading states and error boundaries properly
- Prefer composition over inheritance

### Styling Guidelines

- Use Tailwind utility classes exclusively for styling
- Follow mobile-first responsive design (sm:, md:, lg:, xl:)
- Use Tailwind's design tokens for consistency
- Implement hover, focus, and active states using Tailwind modifiers
- Use CSS Grid and Flexbox via Tailwind classes
- Prefer semantic color names (blue-500, gray-100) over arbitrary values

## Component Structure

When creating new components, follow this structure:

```tsx
interface ComponentProps {
  // Define props with proper TypeScript types
}

export const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // State declarations
  // Effect hooks
  // Event handlers
  // Render JSX

  return <div className="tailwind-classes">{/* Component content */}</div>;
};
```

## Features to Implement

### Core Features

- **Chat Interface**:

  - Real-time chat functionality with message history
  - Text input field with submit button
  - "Start New Chat" button to reset conversation
  - Message timestamps and user identification
  - Debounced input handling for performance

- **Address Recognition & Mapping**:

  - Automatic detection of street addresses in chat messages
  - Interactive map integration showing mentioned locations
  - Pin markers for detected addresses on map
  - Location details popup on marker interaction
  - Map zoom and pan functionality

- **Information Display**:

  - City statistics and demographic information
  - Real-time location data and context
  - Address validation and geocoding
  - Point-of-interest information near addresses

- **UI/UX Features**:
  - Responsive three-column layout
  - Modern chat interface with smooth animations
  - Interactive map with hover effects
  - Loading states for address processing
  - Error handling for invalid addresses

### Advanced Features

- **Enhanced Chat**:

  - Message search and filtering
  - Chat history persistence with local storage
  - Export chat conversations
  - Message reactions and formatting
  - Bot responses for city information

- **Map Enhancements**:

  - Multiple map view types (satellite, street, terrain)
  - Route planning between mentioned addresses
  - Nearby points of interest overlay
  - Custom map markers for different location types
  - Street View integration

- **Data Integration**:

  - Real-time weather data for locations
  - Local business and attraction information
  - Public transit information
  - Demographics and city statistics
  - Historical data about locations

- **User Experience**:
  - Dark/light theme toggle
  - Keyboard shortcuts for chat operations
  - Voice input for messages
  - Offline functionality with service workers
  - Progressive Web App (PWA) capabilities

## UI/UX Guidelines

### Color Scheme

- Primary: Blue/Indigo palette (blue-500, blue-600, indigo-500)
- Secondary: Gray scale for text and backgrounds
- Accent: Green for success states, Red for errors
- Use Tailwind's built-in color system

### Layout Patterns

- Mobile-first responsive design
- Card-based layouts with proper spacing
- Consistent padding and margins using Tailwind spacing scale
- Use CSS Grid for complex layouts, Flexbox for simpler ones
- Implement proper loading skeletons and empty states

### Interactions

- Smooth transitions using Tailwind transition utilities
- Hover effects on interactive elements
- Focus states for accessibility
- Loading spinners and progress indicators
- Toast notifications for user feedback

## Data Management

### State Management

- Use React's built-in state management (useState, useContext)
- Consider Zustand for complex global state if needed
- Implement proper error handling and loading states
- Use React Query/TanStack Query for server state management

### Data Types

Define proper TypeScript interfaces for all data:

```tsx
interface ChatMessage {
  id: string;
  text: string;
  timestamp: Date;
  sender: "user" | "bot";
  addresses?: DetectedAddress[];
}

interface DetectedAddress {
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

interface LocationInfo {
  address: DetectedAddress;
  nearbyPlaces: PointOfInterest[];
  weather?: WeatherData;
  demographics?: CityStats;
}

interface PointOfInterest {
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

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  lastActivity: Date;
}
```

## Performance Guidelines

- Use React.memo for expensive components
- Implement virtual scrolling for large lists
- Optimize images with proper loading and sizing
- Use code splitting for route-based chunks
- Implement proper caching strategies
- Monitor bundle size and Core Web Vitals

## Accessibility

- Use semantic HTML elements
- Implement proper ARIA labels and roles
- Ensure keyboard navigation works properly
- Maintain proper color contrast ratios
- Provide alt text for images
- Use focus indicators and skip links

## Error Handling

- Implement error boundaries for React components
- Handle API errors gracefully with user-friendly messages
- Provide fallback UI for failed image loads
- Log errors appropriately for debugging
- Show loading states during async operations

## Testing Considerations

- Write unit tests for utility functions
- Test component interactions and state changes
- Mock external API calls in tests
- Test responsive behavior and accessibility
- Use React Testing Library best practices
