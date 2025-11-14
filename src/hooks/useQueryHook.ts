import { useContext, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import AppContext from '../context/app-context';
import { NOTIFICATION_TYPE } from '../types';
import { getErrorMessage } from '../utils/error-normalise';

export const useQueryHook = (
  query: string[],
  api: () => Promise<AxiosResponse>,
  options = {} // Accept additional options
) => {
  const { notification } = useContext(AppContext);
  const {
    data: response,
    isFetching,
    error,
  } = useQuery<AxiosResponse>({
    queryKey: query,
    queryFn: api,
    throwOnError: false,
    ...options,
  });

  useEffect(() => {
    if (error) {
      notification.showNotification(
        getErrorMessage(error),
        NOTIFICATION_TYPE.ERROR,
        3000
      );
    }
  }, [error, notification]);

  return { data: response?.data, isFetching, error };
};
