import { tokenSchema } from '@ip-address-management-system/shared';
import { type SignInSchema } from '../schemas/sign-in-schema';
import { api } from '@/lib/api-client';

export async function loginUser(params: SignInSchema) {
  const response = await api.post(
    '/auth/login',
    {
      email: params.email,
      password: params.password,
    },
    {
      withCredentials: true,
    },
  );

  return tokenSchema.parse(response.data);
}
