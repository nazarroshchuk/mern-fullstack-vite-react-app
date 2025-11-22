import { useCallback, useEffect, useState } from 'react';

let tokenExpirationTimer: number | undefined;

export const useAuthHook = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);

  const login = useCallback(
    (userId: string, token: string, expirationDate?: Date) => {
      setUserId(userId);
      setToken(token);
      const tokenExpiration =
        expirationDate && !isNaN(expirationDate.getTime())
          ? expirationDate
          : new Date(new Date().getTime() + 1000 * 60 * 60);

      setExpirationDate(tokenExpiration);

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('tokenExpiration', tokenExpiration.toLocaleString());
    },
    []
  );

  const logout = useCallback(() => {
    setUserId(null);
    setToken(null);
    setExpirationDate(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    const storedTokenExpiration = localStorage.getItem('tokenExpiration');

    if (storedTokenExpiration) {
      const expirationDate = new Date(storedTokenExpiration);

      if (storedUserId && storedToken && expirationDate > new Date()) {
        login(storedUserId, storedToken, expirationDate);
      } else {
        logout();
      }
    }
  }, []);

  useEffect(() => {
    if (token && expirationDate) {
      tokenExpirationTimer = setTimeout(
        logout,
        expirationDate.getTime() - new Date().getTime()
      );
    } else {
      clearTimeout(tokenExpirationTimer);
    }

    return () => {
      clearTimeout(tokenExpirationTimer);
    };
  }, [token, expirationDate]);

  return {
    userId,
    token,
    login,
    logout,
  };
};
