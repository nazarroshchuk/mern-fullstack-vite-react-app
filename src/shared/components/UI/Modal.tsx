import React from 'react';

import './Modal.css';
import ReactDOM from 'react-dom';
import Backdrop from './Backdrop';
import { CSSTransition } from 'react-transition-group';

interface ModalProps {
  onClose: () => void;
  style?: React.CSSProperties;
  headerClass?: string;
  modalClass?: string;
  contentClass?: string;
  footerClass?: string;
  header?: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  children: React.ReactNode;
  footerContent?: React.ReactNode;
  isOpen?: boolean;
  footer?: React.ReactNode;
}

const ModalOverlay: React.FC<ModalProps> = ({
  onClose,
  style,
  headerClass,
  modalClass,
  contentClass,
  footerClass,
  header,
  onSubmit,
  children,
  footerContent,
}) => {
  const content = (
    <div className={`modal ${modalClass}`} style={style} onClick={onClose}>
      <header className={`modal__header ${headerClass}`}>
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit ? onSubmit : e => e.preventDefault()}>
        <div
          className={`modal__content ${contentClass}`}
          onClick={e => e.stopPropagation()}
        >
          {children}
        </div>
        <footer className={`modal__footer ${footerClass}`}>
          {footerContent}
        </footer>
      </form>
    </div>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById('modal-portal')!
  );
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, ...props }) => {
  if (!isOpen) return null;

  return (
    <>
      <Backdrop show={isOpen} onClick={onClose} />
      <CSSTransition
        timeout={200}
        classNames="modal"
        in={isOpen}
        mountOnEnter
        unmountOnExit
      >
        <ModalOverlay isOpen={isOpen} onClose={onClose} {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;
