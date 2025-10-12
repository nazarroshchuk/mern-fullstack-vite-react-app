import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContextProvider from './context/auth-context-provider';
import AppRoutes from './components/AppRoutes';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <MainNavigation />
        <main>
          <AppRoutes />
        </main>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
