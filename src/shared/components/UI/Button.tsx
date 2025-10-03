import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
    to?: string;
    href?: string;
    size?: 'small' | 'default' | 'large';
    inverse?: boolean;
    danger?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    disabled?: boolean;
    children: React.ReactNode;
    classCustom?: string;
}

import './Button.css';

const Button: React.FC<ButtonProps> = props => {
  if (props.href) {
    return (
      <a
        className={`button button--${props.size || 'default'} ${props.inverse &&
          'button--inverse'} ${props.danger && 'button--danger'} ${props.classCustom}`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        className={`button button--${props.size || 'default'} ${props.inverse &&
          'button--inverse'} ${props.danger && 'button--danger'} ${props.classCustom}`}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button
      className={`button button--${props.size || 'default'} ${props.inverse &&
        'button--inverse'} ${props.danger && 'button--danger'} ${props.classCustom}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
