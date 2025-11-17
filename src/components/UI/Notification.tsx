import React, { useContext, useEffect, useRef } from 'react';

import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import appContext from '../../context/app-context';
import { type NotificationType } from '../../types/types';
import Card from './Card';
import './Notifications.css';

interface NotificationProps {
  type?: NotificationType;
  message?: string;
}

export const Notification: React.FC<NotificationProps> = () => {
  const { notification } = useContext(appContext);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (notification.isOpen && notification.duration) {
      const timer = setTimeout(() => {
        notification.hideNotification();
      }, notification.duration || 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const renderNotification = () => (
    <div ref={nodeRef}>
      <Card className={`notification ${notification.type}`}>
        <p>{notification.message}</p>
      </Card>
    </div>
  );

  return ReactDOM.createPortal(
    <CSSTransition
      nodeRef={nodeRef}
      timeout={200}
      classNames="notification"
      in={notification.isOpen}
      mountOnEnter
      unmountOnExit
    >
      {renderNotification()}
    </CSSTransition>,
    document.getElementById('notification-portal')!
  );
};
