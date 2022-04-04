import useSWR from 'swr';

import { config } from '../config';
import { fetcher } from '../utils';

const { apiURI } = config;

export function useCourses(id) {
  const { data, error } = useSWR(
    `${apiURI}/courses${id ? '/' + id : ''}`,
    fetcher
  );

  return {
    data: data && data.data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
  };
}
