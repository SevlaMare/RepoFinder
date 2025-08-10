import { TextProps } from './types';

export function Text({
  children,
  text,
  as = 'p',
  variant = 'default',
  onClick,
  className = '',
  htmlFor,
}: TextProps) {
  const baseStyles = 'block text-sm font-medium';

  const variants: Record<NonNullable<TextProps['variant']>, string> = {
    default: 'text-gray-800',
    subtle: 'text-gray-700',
    destructive: 'text-red-600',
    hidden: 'text-gray-600',
  };

  // 'p' or 'label'
  const Component = as;

  return (
    <Component
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...(htmlFor ? { htmlFor } : {})}
    >
      {text ?? children}
    </Component>
  );
}
