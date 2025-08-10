import { PaginationProps } from './types';

export const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  loading,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const canGoPrevious = currentPage > 1 && !loading;
  const canGoNext = currentPage < totalPages && !loading;

  return (
    <div className='flex justify-between mt-8'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrevious}
        className='px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Previous
      </button>

      <span className='self-center'>
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className='px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Next
      </button>
    </div>
  );
};
