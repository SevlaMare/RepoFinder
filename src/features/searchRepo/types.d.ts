export interface Repository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  language: string | null;
  license: {
    key: string;
    name: string;
  } | null;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface SearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}

export type SearchType = 'repo' | 'user' | 'org';
export type SortBy = 'stars' | 'forks' | 'updated';
export type OrderBy = 'desc' | 'asc';

export interface SearchFilters {
  searchType: SearchType;
  language: string;
  license: string;
  minStars: string;
  sortBy: SortBy;
  orderBy: OrderBy;
}

export interface SearchFormProps {
  query: string;
  onQueryChange: (value: string) => void;
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onResetFilters: () => void;
  onSubmit: () => void;
  loading: boolean;
}

export interface RepoListProps {
  repositories: Repository[];
  totalResults: number;
  searchPerformed: boolean;
}

export interface ErrorAlertProps {
  message: string;
}

export interface RepoCardProps {
  repo: Repository;
}
