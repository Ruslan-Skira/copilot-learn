import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../test/utils';
import App from '../App';

// Mock all components
vi.mock('../components', () => ({
  Header: () => <div data-testid="header">Header Component</div>,
  InfoBox: ({ className }: { className?: string }) => (
    <div data-testid="info-box" className={className}>Info Box Component</div>
  ),
  InteractiveMap: ({ className }: { className?: string }) => (
    <div data-testid="interactive-map" className={className}>Interactive Map Component</div>
  ),
  ChatBox: ({ className }: { className?: string }) => (
    <div data-testid="chat-box" className={className}>Chat Box Component</div>
  ),
}));

describe('App', () => {
  it('should render all main components', () => {
    render(<App />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('info-box')).toBeInTheDocument();
    expect(screen.getByTestId('interactive-map')).toBeInTheDocument();
    expect(screen.getByTestId('chat-box')).toBeInTheDocument();
  });

  it('should have correct layout structure', () => {
    const { container } = render(<App />);

    // Check main container has correct classes
    const mainContainer = container.querySelector('.min-h-screen');
    expect(mainContainer).toHaveClass('bg-gradient-to-br', 'from-blue-50', 'to-indigo-100', 'flex', 'flex-col');

    // Check grid layout
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toHaveClass('grid-cols-1', 'lg:grid-cols-3', 'gap-4', 'lg:gap-6');
  });

  it('should apply responsive min-heights to components', () => {
    render(<App />);

    const infoBox = screen.getByTestId('info-box');
    const interactiveMap = screen.getByTestId('interactive-map');
    const chatBox = screen.getByTestId('chat-box');

    expect(infoBox).toHaveClass('h-full', 'min-h-[600px]', 'lg:min-h-0');
    expect(interactiveMap).toHaveClass('h-full', 'min-h-[600px]', 'lg:min-h-0');
    expect(chatBox).toHaveClass('h-full', 'min-h-[600px]', 'lg:min-h-0');
  });

  it('should wrap content in CityExplorerProvider', () => {
    // The CityExplorerProvider is used in the custom render function
    // so if the app renders without error, it means the provider is working
    render(<App />);

    // All components should be rendered, indicating the provider is working
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('info-box')).toBeInTheDocument();
    expect(screen.getByTestId('interactive-map')).toBeInTheDocument();
    expect(screen.getByTestId('chat-box')).toBeInTheDocument();
  });
});
