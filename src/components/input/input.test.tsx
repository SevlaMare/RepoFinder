import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './';

describe('Input component', () => {
  it('renders with default variant and props', () => {
    render(<Input value='' onChange={() => {}} placeholder='Enter text' />);

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('border-gray-300');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('renders with danger variant', () => {
    render(
      <Input
        value=''
        onChange={() => {}}
        placeholder='Danger'
        variant='danger'
      />
    );

    const input = screen.getByPlaceholderText('Danger');
    expect(input).toHaveClass('border-red-400');
  });

  it('calls onChange with new value', () => {
    const handleChange = vi.fn();
    render(<Input value='' onChange={handleChange} placeholder='Type here' />);

    const input = screen.getByPlaceholderText('Type here');
    fireEvent.change(input, { target: { value: 'Hello' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('Hello');
  });

  it('passes min and max attributes', () => {
    render(
      <Input
        value='5'
        onChange={() => {}}
        type='number'
        min={1}
        max={10}
        placeholder='Number'
      />
    );

    const input = screen.getByPlaceholderText('Number');
    expect(input).toHaveAttribute('min', '1');
    expect(input).toHaveAttribute('max', '10');
  });
});
