import { ReactNode, ButtonHTMLAttributes } from 'react';

type Variant = keyof typeof buttonVariants;
type Size = keyof typeof buttonSizes;

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'variant' | 'size'> {
  onClick?: () => void;
  className?: string;
  variant?: Variant;
  size?: Variant;
  children?: ReactNode;
}
