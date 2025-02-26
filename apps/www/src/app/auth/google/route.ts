import assert from 'node:assert';
import { type NextRequest } from 'next/server';
import { signIn } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const { accessToken, refreshToken } = {
    accessToken: searchParams.get('access_token'),
    refreshToken: searchParams.get('refresh_token'),
  };

  assert(accessToken, 'accessToken is required');
  assert(refreshToken, 'refreshToken is required');

  const tokens = await signIn({ accessToken, refreshToken });

  return Response.json(tokens);
}
