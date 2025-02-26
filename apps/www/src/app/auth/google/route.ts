import assert from 'node:assert';
import { TOKEN_LABELS } from '@ip-address-management-system/shared';
import { type NextRequest } from 'next/server';
import { redirect } from 'next/navigation';
import { signIn } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const { accessToken, refreshToken } = {
    accessToken: searchParams.get(TOKEN_LABELS.ACCESS_TOKEN),
    refreshToken: searchParams.get(TOKEN_LABELS.REFRESH_TOKEN),
  };

  assert(accessToken, 'accessToken is required');
  assert(refreshToken, 'refreshToken is required');

  await signIn({ accessToken, refreshToken });

  return redirect('/');
}
