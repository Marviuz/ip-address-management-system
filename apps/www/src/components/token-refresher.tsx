'use client';

import { type FC, useEffect } from 'react';
import { signOut } from '@/lib/auth';
import { refreshToken } from '../lib/refresh-token';

const ONE_SECOND = 1000;

export const TokenRefresher: FC = () => {
  useEffect(() => {
    const runRefresh = async () => {
      const { success } = await refreshToken();
      if (!success) return signOut();
    };

    void runRefresh();

    const interval = setInterval(async () => {
      await runRefresh();
    }, 50 * ONE_SECOND);

    return () => clearInterval(interval);
  }, []);

  return null;
};
