import { useContext } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import AppContext from '../context/app-context';
import { getRoutes } from '../utils/routing-helpers';

const AppRoutes = () => {
  const { authentication } = useContext(AppContext);
  const routes = getRoutes(authentication.isLoggedIn);

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
