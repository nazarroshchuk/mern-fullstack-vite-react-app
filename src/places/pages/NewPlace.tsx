import Input from '../../shared/components/FormElements/Input';

import './NewPlace.css';
import { VALIDATOR_MAXLENGTH, VALIDATOR_MINLENGTH } from '../../utils/utils';

const NewPlace = () => {
  return (
    <form className="place-form">
      <Input
        element="input"
        type="text"
        label="Title"
        placeholder="Enter place title"
        required
        validators={[VALIDATOR_MINLENGTH(10), VALIDATOR_MAXLENGTH(50)]}
      />
    </form>
  );
};

export default NewPlace;
