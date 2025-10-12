import AuthContext from './auth-context';
import React, { useState } from 'react';

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };
  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext value={{ isLoggedIn, login, logout, userId: null }}>
      {children}
    </AuthContext>
  );
};

export default AuthContextProvider;
