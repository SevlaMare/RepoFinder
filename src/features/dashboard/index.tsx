import { useEffect, useState } from 'react';
import { Contributor, Repository } from './types';
import { get6moTimestampRange } from '@/utils/date';
import { BarChart } from '@/components/chart/bar';
import { LineChart } from '@/components/chart/line';
// import {
//   contributorsData_mock,
//   repoData_mock,
//   mock_commitHistory,
// } from './mock/data';

const parseContributorsData = contributorsData => {
  const sortedContributors = contributorsData.sort(
    (a, b) => b.contributions - a.contributions
  );

  const top5 = sortedContributors.slice(0, 5);

  const othersContributions = sortedContributors
    .slice(5)
    .reduce((sum, c) => sum + c.contributions, 0);
  if (othersContributions > 0) {
    top5.push({
      login: 'Others',
      contributions: othersContributions,
      isOthers: true,
    });
  }

  return top5;
};

const fetchRepoData = async (endpoint: string) => {
  const repoResponse = await fetch(endpoint);
  if (!repoResponse.ok) throw new Error('Failed to fetch repository');
  const repoData: Repository = await repoResponse.json();
  return repoData;
  // return repoData_mock; // TODO: remove
};

const fetchContributorsData = async (endpoint: string) => {
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error('Failed to fetch contributors');
  const contributorsData: Contributor[] = await response.json();
  const top5 = parseContributorsData(contributorsData);
  // const top5 = parseContributorsData(contributorsData_mock); // TODO: remove
  return top5;
};

function parseMonthlyCommits(commits_history_count) {
  const result = [];
  const monthMap = new Map();

  commits_history_count.forEach(commit => {
    const date = new Date(commit.commit.author.date);
    const monthFirstDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    ).getTime();

    if (!monthMap.has(monthFirstDay)) {
      monthMap.set(monthFirstDay, result.length);
      result.push({ timestamp: monthFirstDay, value: 0 });
    }
    result[monthMap.get(monthFirstDay)].value += 1;
  });

  result.sort((a, b) => a.timestamp - b.timestamp);
  console.log(result);
  return result;
}

const fetchCommitHistory = async (endpoint: string) => {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error('Failed to fetch contributors');
  }
  const responseData = await response.json();
  const monthlyCommits = parseMonthlyCommits(responseData);
  // const monthlyCommits = parseMonthlyCommits(mock_commitHistory); // TODO: remove
  return monthlyCommits;
};

function reshapeContribuitors(contributors) {
  const arr = [];
  contributors.forEach(item => {
    arr.push({
      category: item.login,
      value: item.contributions,
    });
  });
  return arr;
}

export function RepoDetails() {
  const [repoDetails, setRepoDetails] = useState<Repository | null>(null);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [commithistory, setCommithistory] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { timestamp_6months_ago, timestamp_current_month } =
    get6moTimestampRange();
  const urlSegments = window.location.href.split('/');
  const owner = urlSegments[urlSegments.length - 2];
  const repoName = urlSegments[urlSegments.length - 1];

  useEffect(() => {
    (async () => {
      let repoData;
      const endpoint_repo_data = `https://api.github.com/repos/${owner}/${repoName}`;
      try {
        repoData = await fetchRepoData(endpoint_repo_data);
      } catch (err) {
        setError(`An unknown error occurred 1 ${err}`);
      } finally {
        setLoading(false);
      }
      setRepoDetails(repoData);

      let top5Data;
      const endpoint_contributors = `https://api.github.com/repos/${owner}/${repoName}/contributors`;
      try {
        top5Data = await fetchContributorsData(endpoint_contributors);
      } catch (err) {
        setError(`An unknown error occurred 2 ${err}`);
      } finally {
        setLoading(false);
      }
      top5Data = reshapeContribuitors(top5Data);
      setContributors(top5Data);

      const commit_history_endpoint = `https://api.github.com/repos/${owner}/${repoName}/commits?since=${timestamp_6months_ago}&until=${timestamp_current_month}`;
      const commits_history_count = await fetchCommitHistory(
        commit_history_endpoint
      );
      setCommithistory(commits_history_count);
    })();
  }, [owner, repoName]);

  if (loading)
    return (
      <div className='flex items-center justify-center h-screen'>
        Loading repository data...
      </div>
    );

  if (error)
    return (
      <div className='flex items-center justify-center h-screen text-red-500'>
        Error: {error}
      </div>
    );

  if (!repoDetails)
    return (
      <div className='flex items-center justify-center h-screen'>
        Repository not found
      </div>
    );

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <header className='bg-white rounded-xl shadow-sm p-6 mb-6'>
        <div className='flex items-center space-x-4'>
          <img
            src={repoDetails.owner.avatar_url}
            alt={`${repoDetails.full_name} icon`}
            className='w-16 h-16 rounded-lg'
          />
          <div>
            <h1 className='text-2xl font-bold text-gray-800'>
              {repoDetails.full_name}
            </h1>
            <p className='text-gray-600'>{repoDetails.description}</p>
            <a
              href={repoDetails.html_url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 hover:text-blue-600 text-sm inline-block mt-2'
            >
              View on GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-blue-50 text-blue-500 mr-4'>
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
              </svg>
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Stars</p>
              <p className='text-2xl font-semibold text-gray-800'>
                {repoDetails.stargazers_count.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-green-50 text-green-500 mr-4'>
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Forks</p>
              <p className='text-2xl font-semibold text-gray-800'>
                {repoDetails.forks_count.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-yellow-50 text-yellow-500 mr-4'>
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Open Issues</p>
              <p className='text-2xl font-semibold text-gray-800'>
                {repoDetails.open_issues_count.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-purple-50 text-purple-500 mr-4'>
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z' />
              </svg>
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Contributors</p>
              <p className='text-2xl font-semibold text-gray-800'>
                {contributors.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contributors */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 space-y-6'>
        <div className='bg-white rounded-xl shadow-sm p-6 lg:col-span-2 pb-20'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-lg font-semibold text-gray-800'>
              Top Contributors
            </h2>
            <span className='text-sm text-gray-500'>
              Commits (Top 5 + Others)
            </span>
          </div>

          <div className='w-full h-80'>
            {contributors && (
              <BarChart dataset={contributors} width={500} height={400} />
            )}
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6 lg:col-span-2'>
          <h2 className='text-lg font-semibold text-gray-800'>
            Last 30 commits
          </h2>
          {commithistory && (
            <LineChart dataset={commithistory} width={580} height={400} />
          )}
        </div>
      </div>
    </div>
  );
}
