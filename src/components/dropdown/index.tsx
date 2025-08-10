import { SelectProps } from './types';
import { ChangeEvent } from 'react';

const baseStyle =
  'w-full p-3 border  rounded-lg focus:ring-2 focus:border-transparent';

const variants: Record<string, string> = {
  primary: 'border-gray-300 focus:ring-blue-500 bg-white',
};

export function Dropdown<T extends string>({
  id,
  value,
  onChange,
  options,
  className = '',
  variant = 'default',
}: SelectProps<T>) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as T);
  };

  return (
    <select
      id={id}
      value={value}
      onChange={handleChange}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
