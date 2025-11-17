import { useContext, useEffect } from 'react';

import { useMutation } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import AppContext from '../context/app-context';
import { NOTIFICATION_TYPE } from '../types/types';
import { getErrorMessage } from '../utils/error-normalise';

export const useQueryMutateHook = <T>(
  api: (args: T) => Promise<AxiosResponse>,
  successMessage = 'Operation successful',
  options = {} // Accept additional options
) => {
  const { notification } = useContext(AppContext);
  const {
    data: response,
    isPending,
    mutate,
    mutateAsync,
    error,
  } = useMutation<AxiosResponse, unknown, T>({
    mutationFn: api,
    throwOnError: false,
    onSuccess: () => {
      notification.showNotification(
        successMessage,
        NOTIFICATION_TYPE.SUCCESS,
        3000
      );
    },
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
  }, [error]);

  return {
    data: response?.data,
    isPending,
    mutate,
    error,
    mutateAsync,
  };
};
