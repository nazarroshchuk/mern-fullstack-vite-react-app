import React, { useRef } from 'react';

import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';
import './Modal.css';

interface ModalProps {
  onClose?: () => void;
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
}

const ModalOverlay: React.FC<ModalProps> = ({
  style,
  headerClass,
  modalClass,
  contentClass,
  footerClass,
  header,
  onSubmit,
  children,
  footerContent,
  isOpen,
}) => {
  const contentRef = useRef(null);

  const content = (
    <div className={`modal ${modalClass ?? ''}`} style={style} ref={contentRef}>
      <header className={`modal__header ${headerClass ?? ''}`}>
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit ? onSubmit : e => e.preventDefault()}>
        <div className={`modal__content ${contentClass ?? ''}`}>{children}</div>
        <footer className={`modal__footer ${footerClass ?? ''}`}>
          {footerContent}
        </footer>
      </form>
    </div>
  );

  return ReactDOM.createPortal(
    <CSSTransition
      nodeRef={contentRef}
      timeout={200}
      classNames="modal"
      in={isOpen}
      mountOnEnter
      unmountOnExit
    >
      {content}
    </CSSTransition>,
    document.getElementById('modal-portal')!
  );
};

const Modal: React.FC<ModalProps> = ({ isOpen = false, onClose, ...props }) => {
  return (
    <>
      <Backdrop show={isOpen} onClick={onClose} />
      <ModalOverlay isOpen={isOpen} {...props} />
    </>
  );
};

export default Modal;
