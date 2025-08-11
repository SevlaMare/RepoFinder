import { linkVariants } from './';

type Variant = keyof typeof linkVariants;

export interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: Variant;
}
