export type RepositoryStatisticsProps = {
  repo: {
    name: string;
    owner: {
      avatar_url: string;
      login: string;
    };
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    languages: Record<string, number>;
    contributors: Array<{
      login: string;
      contributions: number;
      avatar_url: string;
    }>;
    commit_history: Array<{
      week: number;
      total: number;
    }>;
  };
};

export interface Contributor {
  login: string;
  contributions: number;
  avatar_url?: string;
  isOthers?: boolean;
}

export interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  html_url: string;
  owner: {
    avatar_url: string;
  };
  created_at: string;
}
