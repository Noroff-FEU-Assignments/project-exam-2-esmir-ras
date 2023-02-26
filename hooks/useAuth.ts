import { getProfileByName, localStorageName, localStorageTokenName } from 'api';
import { useEffect, useState } from 'react';
import { Profile } from 'types';

export const useAuth = () => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState<Profile | null>(null);
  const authHeader = `Bearer ${token}`;

  const logout = () => {
    localStorage.removeItem(localStorageTokenName);
    localStorage.removeItem(localStorageName);
    location.assign('/');
  };

  useEffect(() => {
    const lsToken = localStorage.getItem(localStorageTokenName);
    if (!lsToken) return;
    setToken(lsToken);
  }, []);

  useEffect(() => {
    if (!token) return;
    const name = localStorage.getItem(localStorageName);
    if (!name) return;
    getProfileByName(name, authHeader).then((user) => setUser(user));
  }, [token]);

  return { authHeader: token.length > 0 ? authHeader : null, user, logout };
};
