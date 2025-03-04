import ky, { type KyInstance } from 'ky';
import { type ZodSchema, type ZodTypeDef } from 'zod';
import { env } from '@/env';
import { getAuthSession } from './auth';

const publicClient = ky.create({
  prefixUrl: env.BACKEND_URL,
});

const privateClient = ky.create({
  prefixUrl: env.BACKEND_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        const { data: session } = await getAuthSession();
        if (!session) return;
        request.headers.set('Authorization', `Bearer ${session.accessToken}`);
      },
    ],
  },
});

type Callback<T> = (client: KyInstance) => Promise<T>;

async function publicFetch<TOut, TTypeDef extends ZodTypeDef, TIn>(
  callback: Callback<TOut>,
  schema?: ZodSchema<TOut, TTypeDef, TIn>,
) {
  const response = await callback(publicClient);
  if (schema) return schema.parse(response);
  return response;
}

async function privateFetch<TOut, TTypeDef extends ZodTypeDef, TIn>(
  callback: Callback<TOut>,
  schema?: ZodSchema<TOut, TTypeDef, TIn>,
) {
  const response = await callback(privateClient);
  if (schema) return schema.parse(response);
  return response;
}

export const api = {
  public: publicFetch,
  private: privateFetch,
};
