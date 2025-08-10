import { ButtonProps } from './types';

const baseStyle =
  'rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

const buttonVariants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
};

const buttonSizes: Record<NonNullable<ButtonProps['variant']>, string> = {
  small: 'py-1 px-2',
  medium: 'px-6 py-3',
  large: 'py-3 px-6',
};

export function Button({
  onClick,
  variant = 'primary',
  size = 'medium',
  className = '',
  children,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${buttonSizes[size]} ${buttonVariants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
