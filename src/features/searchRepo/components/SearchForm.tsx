import { SearchType, SortBy, OrderBy, SearchFormProps } from '../types';
import { languages, licenses } from '../enums';

import { Text } from '@/components/text';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { Dropdown } from '@/components/dropdown';

export const SearchForm = ({
  query,
  onQueryChange,
  filters,
  onFiltersChange,
  onResetFilters,
  onSubmit,
  loading,
}: SearchFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className='mb-8'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
        <div className='md:col-span-2'>
          <Text
            as='label'
            text='Search Query'
            htmlFor='search'
            className='block text-sm font-medium text-gray-700 mb-1'
          />
          <Input
            id='search'
            type='text'
            value={query}
            onChange={onQueryChange}
            placeholder='Search GitHub repositories...'
            aria-label='Search GitHub repositories'
          />
        </div>

        <div>
          <Text as='label' text='Search In' htmlFor='searchType' />
          <Dropdown<string>
            id='searchType'
            value={filters.searchType}
            onChange={value =>
              onFiltersChange({
                ...filters,
                searchType: value as SearchType,
              })
            }
            options={[
              { value: 'repo', label: 'Repositories' },
              { value: 'user', label: 'User' },
              { value: 'org', label: 'Organization' },
            ]}
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
        <div>
          <Text as='label' text='Language' htmlFor='language' />
          <Dropdown<string>
            id='language'
            value={filters.language}
            onChange={value => onFiltersChange({ ...filters, language: value })}
            options={languages.map(item => ({
              value: item || 'any',
              label: item.toUpperCase() || 'Any Language',
            }))}
          />
        </div>

        <div>
          <Text as='label' text='License' htmlFor='license' />
          <Dropdown<string>
            id='license'
            value={filters.license}
            onChange={value => onFiltersChange({ ...filters, license: value })}
            options={licenses.map(item => ({
              value: item || 'any',
              label: item.toUpperCase() || 'Any License',
            }))}
          />
        </div>

        <div>
          <Text as='label' text='Minimum Stars' htmlFor='minStars' />
          <Input
            id='minStars'
            type='number'
            value={filters.minStars}
            placeholder='0'
            min='0'
            onChange={value => onFiltersChange({ ...filters, minStars: value })}
          />
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <div>
            <Text as='label' text='Sort By' htmlFor='sortBy' />
            <Dropdown<SortBy>
              id='sortBy'
              value={filters.sortBy}
              onChange={value =>
                onFiltersChange({
                  ...filters,
                  sortBy: value as SortBy,
                })
              }
              options={[
                { value: 'stars', label: 'Stars' },
                { value: 'forks', label: 'Forks' },
                { value: 'updated', label: 'Updated' },
              ]}
            />
          </div>

          <div>
            <Text as='label' text='Order' htmlFor='orderBy' />
            <Dropdown<OrderBy>
              id='orderBy'
              value={filters.orderBy}
              onChange={value =>
                onFiltersChange({ ...filters, orderBy: value })
              }
              options={[
                { value: 'desc', label: 'Descending' },
                { value: 'asc', label: 'Ascending' },
              ]}
            />
          </div>
        </div>
      </div>

      <div className='flex gap-2'>
        <Button type='submit' disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>

        <Button variant='secondary' type='button' onClick={onResetFilters}>
          Reset Filters
        </Button>
      </div>
    </form>
  );
};
