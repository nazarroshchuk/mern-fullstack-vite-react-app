import React, { useState } from 'react';

import { NOTIFICATION_TYPE, type NotificationType } from '../types';
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
  const [userId, setUserId] = useState<string | null>(null);
  const [notification, setNotification] = useState(initialNotificationState);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (userId: string) => {
    setUserId(userId);
    setIsLoggedIn(true);
  };
  const logout = () => {
    setUserId(null);
  };

  const showNotification = (
    message: string,
    type: NotificationType,
    duration?: number | null
  ) => {
    setNotification({
      type,
      message,
      duration: duration ?? null,
      isOpen: true,
    });
  };

  const hideNotification = () => {
    setNotification(prevState => ({
      ...initialNotificationState,
      type: prevState.type,
    }));
    setIsLoggedIn(false);
  };

  return (
    <AppContext
      value={{
        authentication: { isLoggedIn, login, logout, userId },
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
