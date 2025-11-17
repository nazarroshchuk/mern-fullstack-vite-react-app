import React, { useEffect, useReducer } from 'react';

import classNames from 'classnames';

import './Input.css';
import { initialInputState, inputReducer } from './inputReducer';

interface InputProps {
  placeholder?: string;
  value?: string | File | null;
  onChange?: (
    id: string,
    value: string | File | null,
    isValid: boolean
  ) => void;
  type?: string;
  className?: string;
  label?: string;
  element?: 'input' | 'textarea';
  id: string;
  rows?: number;
  required?: boolean;
  validators?: ((value: string | File | null) => {
    isValid: boolean;
    errorText: string;
  })[];
  isValid?: boolean;
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
  onChange,
  value,
  isValid,
}) => {
  const [inputState, dispatch] = useReducer(
    inputReducer,
    initialInputState(value as string, isValid)
  );

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({ type: 'CHANGE', val: e.target.value, validators });
  };

  useEffect(() => {
    if (onChange) {
      onChange(id, inputState.value, inputState.isValid);
    }
  }, [id, onChange, inputState.value, inputState.isValid]);

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
          value={inputState.value as string}
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
          value={inputState.value as string}
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
