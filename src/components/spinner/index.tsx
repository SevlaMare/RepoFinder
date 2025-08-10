const variant = {
  default: 'border-blue-500',
};

export const LoadingSpinner = () => {
  return (
    <div className='flex justify-center my-12'>
      <div
        className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${variant.default}`}
      ></div>
    </div>
  );
};
