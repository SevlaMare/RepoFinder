import { JSX } from 'react';
import { ImageProps } from './types';

const variantStyles: Record<string, string> = {
  'default': 'w-12 h-12',
  'rounded': 'w-12 h-12 rounded-full',
};

export function Image({ src, alt, className = '', variant = 'default' }: ImageProps): JSX.Element {
  return <img alt={alt} src={src} className={`${variantStyles[variant]} ${className}`} />;
}
