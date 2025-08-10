import { ChangeEvent } from 'react';
import { InputProps } from './types';

const baseStyle =
  'w-full p-3 border rounded-lg focus:ring-2 focus:border-transparent';

const variants: Record<NonNullable<InputProps['variant']>, string> = {
  default: 'border-gray-300 focus:ring-blue-500',
  search:
    'pl-3 border border-gray-300 focus:ring-blue-500 bg-gray-50 placeholder-gray-400',
  danger: 'pl-1 border border-red-400 focus:ring-red-500 bg-red-50',
};

export function Input({
  value,
  onChange,
  className = '',
  placeholder = '',
  id,
  type = 'text',
  name,
  'aria-label': ariaLabel,
  variant = 'default',
  min,
  max,
}: InputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    onChange(event.target.value);

  return (
    <input
      id={id}
      name={name}
      value={value}
      onChange={handleChange}
      type={type}
      placeholder={placeholder}
      aria-label={ariaLabel}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      min={min}
      max={max}
    />
  );
}
