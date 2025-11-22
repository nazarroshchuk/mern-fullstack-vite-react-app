import React, { useCallback, useState } from 'react';

import { useAuthHook } from '../hooks/useAuthHook';
import { NOTIFICATION_TYPE, type NotificationType } from '../types/types';
import AppContext from './app-context';

const initialNotificationState = {
  isOpen: false,
  message: '',
  type: NOTIFICATION_TYPE.INFO as NotificationType,
  duration: null as number | null,
};

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notification, setNotification] = useState(initialNotificationState);
  const { token, userId, login, logout } = useAuthHook();

  const showNotification = useCallback(
    (message: string, type: NotificationType, duration?: number | null) => {
      setNotification({
        type,
        message,
        duration: duration ?? null,
        isOpen: true,
      });
    },
    []
  );

  const hideNotification = useCallback(() => {
    setNotification(prevState => ({
      ...initialNotificationState,
      type: prevState.type,
    }));
  }, []);

  return (
    <AppContext
      value={{
        authentication: { isLoggedIn: !!token, login, logout, userId },
        notification: {
          ...notification,
          showNotification,
          hideNotification,
        },
      }}
    >
      {children}
    </AppContext>
  );
};

export default AppContextProvider;
