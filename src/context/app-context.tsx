import { createContext } from 'react';

import {
  NOTIFICATION_TYPE,
  type NotificationType,
  type ShowNotificationFunction,
} from '../types/types';

interface AppContextInterface {
  authentication: {
    isLoggedIn: boolean;
    userId: string | null;
    login: (userId: string, token: string) => void;
    logout: () => void;
  };
  notification: {
    isOpen: boolean;
    type: NotificationType;
    message: string;
    duration: number | null;
    showNotification: ShowNotificationFunction;
    hideNotification: () => void;
  };
}

const initialState: AppContextInterface = {
  authentication: {
    isLoggedIn: false,
    userId: null,
    login: () => {},
    logout: () => {},
  },
  notification: {
    isOpen: false,
    type: NOTIFICATION_TYPE.INFO as NotificationType,
    message: '',
    duration: null,
    showNotification: (() => {}) as ShowNotificationFunction,
    hideNotification: (): void => {},
  },
};

const AppContext = createContext<AppContextInterface>(initialState);

export default AppContext;
