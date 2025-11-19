import React from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { ImageUpload } from '../components/FormElements/ImageUpload';
import Input from '../components/FormElements/Input';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useFormHook from '../hooks/useFormHook';
import { useQueryHook } from '../hooks/useQueryHook';
import { useQueryMutateHook } from '../hooks/useQueryMutateHook';
import { placeServices } from '../services/place-services';
import { QUERY_KEYS } from '../services/react-query';
import { createFormData } from '../utils/form-data';
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../utils/input-validators';
import './UpdatePlace.css';

const UpdatePlace = () => {
  const { placeId } = useParams();
  const navigate = useNavigate();

  const { data, isFetching } = useQueryHook(
    [QUERY_KEYS.places, `${placeId}`],
    () => placeServices.getPlaceById(placeId!)
  );

  const { mutate: updatePlace, isPending } = useQueryMutateHook(
    placeServices.updatePlace
  );

  const { place } = data || {};

  const { formData, onInputHandler } = useFormHook(
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false },
      image: { value: '', isValid: false },
    },
    false
  );

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.isFormValid) {
      updatePlace(createFormData(formData, { id: placeId! }), {
        onSuccess: () => {
          navigate(`/${place?.creator}/place`);
        },
      });
    }
  };

  if (isFetching) {
    return (
      <div className="center">
        <Card>
          <LoadingSpinner asOverlay />
        </Card>
      </div>
    );
  }

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
        label="Title"
        validators={[VALIDATOR_REQUIRE, VALIDATOR_MAXLENGTH(50)]}
        onChange={onInputHandler}
        required
        value={place.title ?? ''}
        isValid={true}
      />
      <Input
        id="description"
        element="textarea"
        rows={5}
        label="Description"
        validators={[VALIDATOR_MINLENGTH(10), VALIDATOR_MAXLENGTH(200)]}
        onChange={onInputHandler}
        required
        value={place.description ?? ''}
        isValid={true}
      />
      <ImageUpload
        id="image"
        center
        onChange={onInputHandler}
        errorText="Please upload an image"
        imagePlaceholder={place.image}
      />
      <Button type="submit" disabled={!formData.isFormValid || isPending}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
