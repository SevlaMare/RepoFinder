import { afterEach, describe, it, expect, vi } from 'vitest';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { Button } from '.';

afterEach(() => {
  cleanup();
});

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button'));
  });

  it('calls onClick handler when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies default variant and size classes', () => {
    render(<Button>Test</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-blue-600');
    expect(btn.className).toContain('px-6 py-3');
  });

  it('applies given variant and size classes', () => {
    render(
      <Button variant='danger' size='large'>
        Danger
      </Button>
    );
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-red-600');
    expect(btn.className).toContain('py-3 px-6');
  });

  it('applies additional className', () => {
    render(<Button className='custom-class'>Custom</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('custom-class');
  });

  it('sets the button type attribute', () => {
    render(<Button type='submit'>Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});
