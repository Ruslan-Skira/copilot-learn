import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/utils';
import { Header } from '../Header';

describe('Header', () => {
  it('should render with default title', () => {
    render(<Header />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText('🌍 City Explorer')).toBeInTheDocument();
  });

  it('should render with custom title', () => {
    render(<Header title="Custom Title" />);

    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /cities/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  it('should have correct styling classes', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('w-full', 'bg-white', 'shadow-sm', 'border-b', 'border-gray-200');
  });

  it('should have proper heading structure', () => {
    render(<Header />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('text-3xl', 'font-bold', 'text-gray-900');
  });
});
