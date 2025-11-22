import { BrowserRouter as Router } from 'react-router-dom';

import { TanStackDevtools } from '@tanstack/react-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';

import './App.css';
import AppRoutes from './components/AppRoutes';
import MainNavigation from './components/Navigation/MainNavigation';
import { Notification } from './components/UI/Notification';
import AppContextProvider from './context/app-context-provider';
import { queryClient } from './services/react-query';

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TanStackDevtools
          plugins={[
            {
              name: 'TanStack Query',
              render: <ReactQueryDevtoolsPanel />,
              defaultOpen: true,
            },
          ]}
        />
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
    </>
  );
}

export default App;
