import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import './SideDrawer.css';

interface SideDrawerProps {
    children: React.ReactNode;
    show?: boolean;
    onClose?: () => void;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ children, show, onClose }) => {
    const nodeRef = useRef(null);

    const content = (
        <CSSTransition
            nodeRef={nodeRef}
            in={show}
            timeout={200}
            classNames="slide-in-left"
            mountOnEnter
            unmountOnExit
        >
            <aside
                ref={nodeRef}
                className="side-drawer"
                onClick={onClose}
            >
                {children}
            </aside>
        </CSSTransition>
    );

  return  ReactDOM.createPortal(content, document.getElementById('drawer-portal')!);
}

export default SideDrawer;