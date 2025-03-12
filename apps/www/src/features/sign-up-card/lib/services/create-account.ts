import { type CreateUserPayload } from '@ip-address-management-system/shared';
import { type SignUpSchema } from '../schemas/sign-up-schema';
import { api } from '@/lib/api-client';

export async function createAccount(params: SignUpSchema) {
  const response = await api.post<{ message: string }>('/auth/register', {
    email: params.email,
    password: params.password,
    role: params.role,
    givenName: params.firstName,
    familyName: params.lastName,
  } satisfies CreateUserPayload);
  return response.data;
}
