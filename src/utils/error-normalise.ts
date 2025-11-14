import { AxiosError } from 'axios';

export const getErrorMessage = (
  error: Error | AxiosError | unknown,
  defaultMessage?: string
) => {
  if (error instanceof AxiosError) {
    return error?.response ? error?.response.data.message : error?.message;
  } else if (error instanceof Error) {
    return error.message;
  }

  return defaultMessage ? defaultMessage : 'Something went wront, try later.';
};
