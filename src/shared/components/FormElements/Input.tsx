import React, { useReducer } from 'react';

import classNames from 'classnames';

import { initialInputState, inputReducer } from './inputReducer';

import './Input.css';

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type?: string;
  className?: string;
  label?: string;
  element?: 'input' | 'textarea';
  id?: string;
  rows?: number;
  required?: boolean;
  validators?: ((value: string) => { isValid: boolean; errorText: string })[];
}

const Input: React.FC<InputProps> = ({
  placeholder,
  type = 'text',
  label,
  element,
  id,
  rows,
  required = false,
  validators = [],
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, initialInputState);

  console.log(inputState);

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({ type: 'CHANGE', val: e.target.value, validators });
  };
  return (
    <div
      className={classNames('form-control', {
        'form-control--invalid': !inputState.isValid && inputState.isTouched,
      })}
    >
      <label htmlFor={id}>{label}</label>
      {element === 'input' ? (
        <input
          className="input"
          id={id}
          type={type}
          placeholder={placeholder}
          value={inputState.value}
          onChange={changeHandler}
          required={required}
          onTouchEnd={() => dispatch({ type: 'TOUCH' })}
          onBlur={() => dispatch({ type: 'TOUCH' })}
        />
      ) : (
        <textarea
          className="textarea"
          id={id}
          rows={rows || 4}
          placeholder={placeholder}
          value={inputState.value}
          onChange={changeHandler}
          onTouchEnd={() => dispatch({ type: 'TOUCH' })}
          onBlur={() => dispatch({ type: 'TOUCH' })}
        />
      )}
      {!inputState.isValid && inputState.isTouched && (
        <p className="form-control--error-text">{inputState.errorText}</p>
      )}
    </div>
  );
};

export default Input;
