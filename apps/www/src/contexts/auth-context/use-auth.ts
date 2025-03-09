import { use } from 'react';
import { AuthContext } from './core';

export function useAuth() {
  return use(AuthContext);
}
