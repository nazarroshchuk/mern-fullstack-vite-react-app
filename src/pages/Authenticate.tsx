import Input from '../components/FormElements/Input';
import Button from '../components/UI/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from '../utils/input-validators';
import useFormHook from '../hooks/useFormHook';
import Card from '../components/UI/Card';

import './Authenticate.css';
import { useContext, useState } from 'react';
import AuthContext from '../context/auth-context';

const initialFormState = {
  email: { value: '', isValid: false },
  password: { value: '', isValid: false },
};

const Authenticate = () => {
  const authContext = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { formData, onInputHandler, setFormData } = useFormHook(
    initialFormState,
    false
  );

  console.log('formData', formData);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted!', formData);
    authContext.login();
  };

  const switchModeHandler = () => {
    console.log('Switching mode', formData.inputs);

    if (!isLoginMode) {
      const data = structuredClone(formData.inputs);
      delete data.name;
      console.log('!isLoginMode', data);
      setFormData(data, data.email.isValid && data.password.isValid);
    } else {
      console.log('isLogin', {
        ...formData.inputs,
        name: { value: '', isValid: false },
      });
      setFormData(
        {
          ...formData.inputs,
          name: { value: '', isValid: false },
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  return (
    <Card className="authentication">
      <form onSubmit={submitHandler}>
        {!isLoginMode && (
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            placeholder="Enter your name"
            required
            value={formData.inputs.name?.value || ''}
            isValid={formData.inputs.name?.isValid || false}
            onChange={onInputHandler}
            validators={[VALIDATOR_MINLENGTH(3)]}
          />
        )}
        <Input
          id="email"
          type="email"
          element="input"
          label="E-mail"
          placeholder="Enter your name"
          required
          value={formData.inputs.email?.value || ''}
          isValid={formData.inputs.email?.isValid || false}
          onChange={onInputHandler}
          validators={[VALIDATOR_EMAIL]}
        />
        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          placeholder="Enter your password"
          required
          value={formData.inputs.password?.value || ''}
          isValid={formData.inputs.password?.isValid || false}
          onChange={onInputHandler}
          validators={[VALIDATOR_MINLENGTH(8)]}
        />
        <Button type="submit" disabled={!formData.isFormValid}>
          {isLoginMode ? 'Login' : 'Signup'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        Switch to {isLoginMode ? 'Signup' : 'Login'}
      </Button>
    </Card>
  );
};

export default Authenticate;
