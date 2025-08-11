import { LinkProps } from './types';

const baseStyle = `hover:underline`;
export const linkVariants = {
  primary: `text-blue-600`,
};

export function Link({
  href,
  children,
  onClick,
  variant = 'primary',
}: LinkProps) {
  return (
    <a
      href={href}
      className={`${baseStyle} ${linkVariants[variant]}`}
      onClick={onClick}
      target='_blank'
      rel='noopener noreferrer'
    >
      {children}
    </a>
  );
}
