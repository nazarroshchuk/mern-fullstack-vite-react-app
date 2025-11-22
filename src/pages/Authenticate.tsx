import { useContext, useState } from 'react';

import { ImageUpload } from '../components/FormElements/ImageUpload';
import Input from '../components/FormElements/Input';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import AppContext from '../context/app-context';
import useFormHook from '../hooks/useFormHook';
import { useHttpHook } from '../hooks/useHttpHook';
import { createFormData } from '../utils/form-data';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from '../utils/input-validators';
import './Authenticate.css';

const initialFormState = {
  email: { value: '', isValid: false },
  password: { value: '', isValid: false },
};

const Authenticate = () => {
  const { authentication } = useContext(AppContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { formData, onInputHandler, setFormData } = useFormHook(
    initialFormState,
    false
  );
  const { isLoading, sendRequest } = useHttpHook();

  const authSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoginMode) {
      // Login logic
      const response = await sendRequest('/users/login', 'POST', {
        email: formData.inputs.email.value,
        password: formData.inputs.password.value,
      });
      authentication.login(response.data.userId, response.data.token);
    } else {
      // Signup logic
      const response = await sendRequest(
        '/users/signup',
        'POST',
        createFormData(formData)
      );
      authentication.login(response.data.userId, response.data.token);
    }
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      const data = structuredClone(formData.inputs);
      delete data.name;
      setFormData(data, data.email.isValid && data.password.isValid);
    } else {
      setFormData(
        {
          ...formData.inputs,
          name: { value: '', isValid: false },
          image: { value: null, isValid: false },
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  console.log(formData);

  return (
    <Card className="authentication">
      {isLoading && <LoadingSpinner asOverlay />}
      <form onSubmit={authSubmitHandler}>
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
        {!isLoginMode && (
          <ImageUpload
            center
            id="image"
            errorText="Choose a valid format of image."
            onChange={onInputHandler}
          />
        )}
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
