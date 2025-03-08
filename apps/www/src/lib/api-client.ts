import ky from 'ky';
import { env } from '@/env';

const publicApi = ky.create({
  prefixUrl: env.VITE_BACKEND_URL,
});

const privateApi = ky.create({
  prefixUrl: env.VITE_BACKEND_URL,
});

export const api = {
  public: publicApi,
  private: privateApi,
};
