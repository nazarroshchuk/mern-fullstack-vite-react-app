import Input from '../components/FormElements/Input';
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
} from '../utils/input-validators';
import Button from '../components/UI/Button';
import useFormHook from '../hooks/useFormHook';

import './NewPlace.css';

const NewPlace = () => {
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
      console.log('Form is invalid!');
      return;
    }
    console.log('Submitted!', formData.inputs);
  };

  console.log('formData: ', formData);

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
