import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Link } from './';

describe('Link component', () => {
  it('renders with correct text and href', () => {
    render(<Link href='https://example.com'>Example</Link>);

    const anchor = screen.getByRole('link', { name: /example/i });
    expect(anchor).toBeInTheDocument();
    expect(anchor).toHaveAttribute('href', 'https://example.com');
  });

  it('applies base and variant styles', () => {
    render(<Link href='#'>Styled Link</Link>);
    const anchor = screen.getByRole('link', { name: /styled link/i });

    // Adjust if variant changes
    expect(anchor.className).toContain('hover:underline');
    expect(anchor.className).toContain('text-blue-600');
  });

  it('sets target and rel attributes for security', () => {
    render(<Link href='#'>Secure Link</Link>);
    const anchor = screen.getByRole('link', { name: /secure link/i });

    expect(anchor).toHaveAttribute('target', '_blank');
    expect(anchor).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(
      <Link href='#' onClick={handleClick}>
        Click Me
      </Link>
    );

    const anchor = screen.getByRole('link', { name: /click me/i });
    fireEvent.click(anchor);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
