import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
} from 'axios';

// axios instance
// const controller = new AbortController();
// axios.defaults.signal = controller.signal;

export const Axios = () => {
  // const token = getTokenFromLocalStorage();

  // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  // if (!token) {
  //   controller.abort();
  //   // window.location.replace(noAuthenticationRedirectUrl);
  // }

  const api = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  createAxiosResponseInterceptor(api);

  return api;
};

const createAxiosResponseInterceptor = (apiInstance: AxiosInstance) => {
  // const token = getTokenFromLocalStorage();

  apiInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      // if (
      //   error.config?.method === 'patch' &&
      //   error.config?.url === '/token/' &&
      //   error.response?.status === StatusCodes.UNAUTHORIZED
      // ) {
      //   removeToken();
      //   window.location.replace(noAuthenticationRedirectUrl);
      //   return Promise.reject();
      // }

      // if (error.response?.status === StatusCodes.UNAUTHORIZED) {
      //   if (token) {
      //     const originalRequest = error.config;

      //     if (!isRefreshingToken) {
      //       isRefreshingToken = true;

      //       return authenticationServices
      //         .refreshToken()
      //         .then((response) => {
      //           saveToken(response.data.access_token);
      //           apiInstance.defaults.headers.common['Authorization'] =
      //             'Bearer ' + response.data.access_token;
      //           originalRequest.headers['Authorization'] =
      //             'Bearer ' + response.data.access_token;

      //           processQueue(null, response.data.access_token);
      //           return apiInstance(originalRequest);
      //         })
      //         .catch((refreshTokenError) => {
      //           removeToken();
      //           window.location.replace(noAuthenticationRedirectUrl);
      //           return Promise.reject(refreshTokenError);
      //         })
      //         .finally(() => {
      //           isRefreshingToken = false;
      //         });
      //     }

      //     return new Promise((resolve, reject) =>
      //       refreshSubscribers.push((newToken) => {
      //         if (newToken) {
      //           originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
      //           resolve(apiInstance(originalRequest));
      //         } else {
      //           removeToken();
      //           window.location.replace(noAuthenticationRedirectUrl);
      //           reject(new Error('Token refresh failed'));
      //         }
      //       }),
      //     );
      //   }

      //   window.location.replace(noAuthenticationRedirectUrl);
      // }

      return Promise.reject(error);
    }
  );
};
