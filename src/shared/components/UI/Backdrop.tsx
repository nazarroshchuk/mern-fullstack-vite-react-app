import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

interface BackdropProps {
    onClick: () => void;
    show: boolean;
}

const Backdrop: React.FC<BackdropProps> = props => {

    if(!props.show) {
        return null;
    }

  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById('backdrop-portal')!
  );
};

export default Backdrop;
