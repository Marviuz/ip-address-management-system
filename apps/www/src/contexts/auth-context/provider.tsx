import { type FC, type PropsWithChildren, useState } from 'react';
import { AuthContext } from './core';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  return (
    <AuthContext value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext>
  );
};
