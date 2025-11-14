import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import Input from '../components/FormElements/Input';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import { DUMMY_PLACES } from '../constants/dummy-data';
import useFormHook from '../hooks/useFormHook';
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../utils/input-validators';
import './UpdatePlace.css';

const UpdatePlace = () => {
  const { placeId } = useParams();

  const place = DUMMY_PLACES.find(p => p.id === placeId);

  const { formData, onInputHandler, setFormData } = useFormHook(
    {
      title: { value: place?.title || '', isValid: false },
      description: { value: place?.description || '', isValid: false },
    },
    false
  );

  useEffect(() => {
    if (place) {
      setFormData(
        {
          title: { value: place?.title || '', isValid: true },
          description: { value: place?.description || '', isValid: true },
        },
        true
      );
    }
  }, [setFormData, place]);

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.isFormValid) {
      console.log('Form is invalid!');
      return;
    }
    console.log('Submitted!', formData.inputs);
  };

  if (!place) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={onSubmitHandler}>
      <Input
        id="title"
        type="text"
        label="title"
        validators={[VALIDATOR_REQUIRE, VALIDATOR_MAXLENGTH(50)]}
        onChange={onInputHandler}
        required
        value={formData.inputs.title?.value || ''}
        isValid={formData.inputs.title?.isValid || false}
      />
      <Input
        id="description"
        element="textarea"
        rows={5}
        label="Description"
        validators={[VALIDATOR_MINLENGTH(10), VALIDATOR_MAXLENGTH(200)]}
        onChange={onInputHandler}
        required
        value={formData.inputs.description?.value || ''}
        isValid={formData.inputs.description?.isValid || false}
      />
      <Button type="submit" disabled={!formData.isFormValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
