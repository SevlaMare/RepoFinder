import { ReactNode } from 'react';

export interface TextProps {
  as?: 'p' | 'label' | 'span';
  variant?: Variant;
  text?: string;
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
  htmlFor?: string;
}
