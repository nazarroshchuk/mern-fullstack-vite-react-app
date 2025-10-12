import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthContext from '../context/auth-context';
import { getRoutes } from '../utils/routing-helpers';

const AppRoutes = () => {
  const auth = useContext(AuthContext);
  const routes = getRoutes(auth.isLoggedIn);

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={route.path || index}
          path={route.path}
          element={route.element}
        />
      ))}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
