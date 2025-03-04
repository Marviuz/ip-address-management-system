'use client';

import { type FC, type PropsWithChildren, useEffect, useState } from 'react';
import { signOut } from '@/lib/auth';
import { refreshToken } from '../lib/refresh-token';

const ONE_SECOND = 1000;

export const TokenRefresher: FC<PropsWithChildren> = ({ children }) => {
  const [isRefreshed, setIsRefreshed] = useState(false);

  useEffect(() => {
    const runRefresh = async () => {
      const { success } = await refreshToken();
      if (!success) return signOut();
      setIsRefreshed(true);
    };

    void runRefresh();

    const interval = setInterval(refreshToken, 50 * ONE_SECOND);

    return () => clearInterval(interval);
  }, []);

  return isRefreshed ? children : null;
};
