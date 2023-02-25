import { useAuth } from 'hooks/useAuth';
import { createContext, ReactNode } from 'react';
import { Profile } from 'types';

interface AuthContextType {
  authHeader: string | null;
  user: Profile | null;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  authHeader: null,
  user: null,
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
