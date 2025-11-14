import { createContext } from 'react';

const initialState = {
  isLoggedIn: false,
  userId: null as string | null,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext(initialState);

export default AuthContext;
