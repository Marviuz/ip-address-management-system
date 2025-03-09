import { type AxiosError } from 'axios';
import {
  type FC,
  type PropsWithChildren,
  useLayoutEffect,
  useState,
} from 'react';
import { AuthContext } from './core';
import { api } from '@/lib/api-client';
import { refreshToken } from '@/lib/services/refresh-token';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useLayoutEffect(() => {
    if (!accessToken) return;

    const authInterceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [accessToken]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const response = error.response;
        const config = error.config;
        if (!config) {
          return Promise.reject(error);
        }
        if (
          response?.status === 401 &&
          !config.url?.includes('/auth/refresh')
        ) {
          const tokens = await refreshToken();
          if (tokens.success) {
            setAccessToken(tokens.data.access_token);
            return api(config);
          }
        }
        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, []);

  return (
    <AuthContext value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext>
  );
};
