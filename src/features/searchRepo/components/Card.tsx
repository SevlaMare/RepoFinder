import { Link } from 'react-router-dom';
import { RepoCardProps } from '../types';

import { Title } from '@/components/title';
import { Text } from '@/components/text';
import { Image } from '@/components/image';

export const RepoCard = ({ repo }: RepoCardProps) => {
  return (
    <div className='p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow'>
      <div className='flex items-start gap-4'>
        <Image
          src={repo.owner.avatar_url}
          alt={`${repo.owner.login}'s avatar`}
          className='w-12 h-12 rounded-full'
        />

        <div className='flex-1'>
          <Link
            to={`/repo/${repo.full_name}`}
            className={'flex-item text-center mr-2.5 last:mr-0'}
          >
            <Title variant={2} name={repo.full_name} />
          </Link>

          {repo.description && <Text text={repo.description} />}

          <div className='flex flex-wrap gap-4 mt-3 text-sm text-gray-600'>
            {repo.language && (
              <div className='flex items-center'>
                <Text
                  as='span'
                  className='w-3 h-3 rounded-full bg-gray-900 mr-1'
                >
                  {repo.language}
                </Text>
              </div>
            )}

            {repo.license && <Text as='span'>📜 {repo.license.name}</Text>}
            <Text as='span'>⭐ {repo.stargazers_count}</Text>
            <Text as='span'>🍴 {repo.forks_count}</Text>
            <Text as='span'>
              {' '}
              🔄 Updated: {new Date(repo.updated_at).toLocaleDateString()}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};
