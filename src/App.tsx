import { BrowserRouter as Router } from 'react-router-dom';

import { QueryClientProvider } from '@tanstack/react-query';

import './App.css';
import AppRoutes from './components/AppRoutes';
import MainNavigation from './components/Navigation/MainNavigation';
import { Notification } from './components/UI/Notification';
import AppContextProvider from './context/app-context-provider';
import { queryClient } from './services/react-query';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <Notification />
        <Router>
          <MainNavigation />
          <main>
            <AppRoutes />
          </main>
        </Router>
      </AppContextProvider>
    </QueryClientProvider>
  );
}

export default App;
