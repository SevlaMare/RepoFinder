import { ErrorAlertProps } from './types';

const variant = {
  error: 'bg-red-100 border-red-500 text-red-700',
};

export const ErrorAlert = ({ message }: ErrorAlertProps) => {
  return (
    <div className={`p-4 mb-6 border-l-4 ${variant.error}`}>
      <p>{message}</p>
    </div>
  );
};
