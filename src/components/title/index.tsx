import { createElement, JSX } from 'react';
import { TitleProps } from './types';

const variantStyles = {
  1: 'text-3xl font-bold text-gray-800 mb-6',
  2: 'text-xl font-semibold text-gray-700 mb-4',
  3: 'text-xl font-medium text-gray-600 mb-3',
};

export function Title({ name, variant = 1, className = '' }: TitleProps): JSX.Element {
  const dynamicTag = `h${variant}`;
  return createElement(
    dynamicTag,
    { className: `${variantStyles[variant]} ${className}` },
    name
  );
}