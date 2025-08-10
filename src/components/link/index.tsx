import { LinkProps } from './types';

export function Link({ href, children, onClick }: LinkProps) {
  return (
    <a
      href={href}
      className='text-blue-600 hover:underline'
      onClick={onClick}
      target='_blank'
      rel='noopener noreferrer'
    >
      {children}
    </a>
  );
}
