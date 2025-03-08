import { createContext, type Dispatch, type SetStateAction } from 'react';

export type AuthContextType = {
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
