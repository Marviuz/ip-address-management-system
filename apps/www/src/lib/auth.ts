'use server';

import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { env } from '@/env';

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

type Session = {
  data: Tokens | null;
};

async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession<Session>(cookieStore, {
    cookieName: '_session',
    password: env.AUTH_SECRET,
  });
  return session;
}

export async function getAuthSession(): Promise<Session> {
  const session = await getSession();
  return session;
}

export async function signIn(tokens: Tokens) {
  const session = await getSession();
  session.data = tokens;
  await session.save();

  return getAuthSession();
}

export async function signOut() {
  const session = await getSession();
  session.destroy();
}
