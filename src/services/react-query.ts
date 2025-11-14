import { QueryClient } from '@tanstack/react-query';

export const QUERY_KEYS = {
  users: 'users',
  places: 'places',
};

export const defaultQueryClientOptions = {
  queries: {
    staleTime: 0, // 10 minutes
    cacheTime: 0, // default cacheTime is 5 minutes; doesn't make sense for staleTime to exceed cacheTime
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  },
};

export const queryClient = new QueryClient({
  defaultOptions: defaultQueryClientOptions,
});
