import { useState } from 'react';

import {
  SearchType,
  SortBy,
  OrderBy,
  SearchResponse,
  Repository,
} from './types';

import { SearchForm } from './components/SearchForm';
import { RepoList } from './components/List';
import { Pagination } from '@/components/pagination';
import { ErrorAlert } from '@/components/popup';
import { LoadingSpinner } from '@/components/spinner';
import { Title } from '@/components/title';

export const SearchBoard = () => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    searchType: 'repo' as SearchType,
    language: '',
    license: '',
    minStars: '',
    sortBy: 'stars' as SortBy,
    orderBy: 'desc' as OrderBy,
  });
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const buildSearchQuery = () => {
    let searchQuery = query;
    searchQuery += ` in:${filters.searchType}`;
    if (filters.language)
      searchQuery += ` language:${filters.language.toLowerCase()}`;
    if (filters.license) searchQuery += ` license:${filters.license}`;
    if (filters.minStars) searchQuery += ` stars:>=${filters.minStars}`;
    return searchQuery;
  };

  const searchRepositories = async () => {
    if (!query.trim()) {
      setError('Please enter a search query');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const searchQuery = buildSearchQuery();
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(searchQuery)}&sort=${filters.sortBy}&order=${filters.orderBy}&page=${page}&per_page=10`,
        {
          headers: {
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
          },
        }
      );

      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      const data: SearchResponse = await response.json();

      setRepositories(data.items);
      setTotalResults(data.total_count);
      setSearchPerformed(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred'
      );
      setRepositories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    setPage(1);
    searchRepositories();
  };

  const handleResetFilters = () => {
    setFilters({
      searchType: 'repo',
      language: '',
      license: '',
      minStars: '',
      sortBy: 'stars',
      orderBy: 'desc',
    });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    searchRepositories();
  };

  return (
    <div className='max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen'>
      <Title name='Search GitHub Repositories' />

      <SearchForm
        query={query}
        onQueryChange={setQuery}
        filters={filters}
        onFiltersChange={setFilters}
        onResetFilters={handleResetFilters}
        onSubmit={handleSubmit}
        loading={loading}
      />

      {error && <ErrorAlert message={error} />}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <RepoList
            repositories={repositories}
            totalResults={totalResults}
            searchPerformed={searchPerformed}
          />
          {totalResults > 0 && (
            <Pagination
              currentPage={page}
              totalItems={totalResults}
              itemsPerPage={10}
              onPageChange={handlePageChange}
              loading={loading}
            />
          )}
        </>
      )}
    </div>
  );
};
