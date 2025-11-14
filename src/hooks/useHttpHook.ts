import React, { useCallback, useContext, useEffect } from 'react';

import { type AxiosRequestConfig } from 'axios';

import AppContext from '../context/app-context';
import { Axios } from '../services/axios-service';
import { NOTIFICATION_TYPE } from '../types';
import { getErrorMessage } from '../utils/error-normalise';

export const useHttpHook = <T>() => {
  const { notification } = useContext(AppContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [data, setData] = React.useState<T | null>(null);
  const activeHttpRequests = React.useRef<AbortController[]>([]);

  const sendRequest = useCallback(
    async (
      url: string,
      method = 'GET',
      body: unknown = null,
      headers: AxiosRequestConfig['headers'] = {}
    ) => {
      try {
        setIsLoading(true);
        setError(null);

        const controller = new AbortController();
        activeHttpRequests.current.push(controller);

        const axiosInstance = Axios();
        const response = await axiosInstance.request({
          url,
          method,
          data: body,
          headers,
          signal: controller.signal,
        });

        setData(response.data);
        return response;
      } catch (err: unknown) {
        setError(getErrorMessage(err) || 'Something went wrong!');
        notification.showNotification(
          getErrorMessage(err) || 'Something went wrong!',
          NOTIFICATION_TYPE.ERROR,
          3000
        );
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [notification]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach(controller => controller.abort());
    };
  }, []);

  return { isLoading, error, data, sendRequest, clearError };
};
