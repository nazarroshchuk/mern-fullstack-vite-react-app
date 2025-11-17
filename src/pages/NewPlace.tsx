import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import Input from '../components/FormElements/Input';
import Button from '../components/UI/Button';
import AppContext from '../context/app-context';
import useFormHook from '../hooks/useFormHook';
import { useQueryMutateHook } from '../hooks/useQueryMutateHook';
import { placeServices } from '../services/place-services';
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
} from '../utils/input-validators';
import './NewPlace.css';

const NewPlace = () => {
  const { authentication } = useContext(AppContext);
  const { mutate } = useQueryMutateHook(
    placeServices.createPlace,
    'New Place was added successfully!'
  );

  const navigate = useNavigate();

  const { formData, onInputHandler } = useFormHook(
    {
      title: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const placeSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.isFormValid) {
      console.log('Form is not valid, abort submit.');
      return;
    }

    mutate(
      {
        title: formData.inputs.title.value,
        description: formData.inputs.description.value,
        address: formData.inputs.address.value,
        creator: authentication.userId,
      },
      {
        onSuccess: () => {
          navigate('/');
        },
      }
    );
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        placeholder="Enter place title"
        required
        validators={[VALIDATOR_MINLENGTH(10), VALIDATOR_MAXLENGTH(50)]}
        onChange={onInputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        placeholder="Enter place description"
        rows={5}
        required
        validators={[VALIDATOR_MINLENGTH(10), VALIDATOR_MAXLENGTH(200)]}
        onChange={onInputHandler}
      />
      <Input
        id="address"
        element="input"
        label="Address"
        placeholder="Enter place address"
        required
        validators={[VALIDATOR_MINLENGTH(10), VALIDATOR_MAXLENGTH(100)]}
        onChange={onInputHandler}
      />
      <Button type="submit" disabled={!formData.isFormValid}>
        Add place
      </Button>
    </form>
  );
};

export default NewPlace;
