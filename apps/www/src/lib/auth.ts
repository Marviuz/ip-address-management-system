import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { env } from '@/env';

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession<Tokens>(cookieStore, {
    cookieName: '_session',
    password: env.AUTH_SECRET,
  });
  return session;
}

export async function getAuthSession(): Promise<Tokens> {
  const session = await getSession();

  return {
    accessToken: session.accessToken,
    refreshToken: session.refreshToken,
  };
}

export async function signIn(tokens: Tokens) {
  const session = await getSession();
  session.accessToken = tokens.accessToken;
  session.refreshToken = tokens.refreshToken;
  await session.save();
  return getAuthSession();
}

export async function signOut() {
  const session = await getSession();
  session.destroy();
}
