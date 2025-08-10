import { RepoListProps } from '../types';

import { Text } from '@/components/text';
import { RepoCard } from './Card';

export const RepoList = ({
  repositories,
  totalResults,
  searchPerformed,
}: RepoListProps) => {
  return (
    <>
      {searchPerformed && (
        <div>
          <Text variant='hidden'>
            Found {totalResults} repositories matching your criteria. Showing{' '}
            {repositories.length} results.
          </Text>
        </div>
      )}

      <div className='space-y-4'>
        {repositories.map(repo => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </>
  );
};
