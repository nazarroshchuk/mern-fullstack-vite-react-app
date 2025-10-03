import { validate } from '../../../utils/utils';

interface InputState {
  value: string;
  isValid: boolean;
  isTouched: boolean;
  errorText: string;
}

type InputAction =
  | {
      type: 'CHANGE';
      val: string;
      validators: ((value: string) => {
        isValid: boolean;
        errorText: string;
      })[];
    }
  | {
      type: 'TOUCH';
    };

export const inputReducer = (
  state: InputState,
  action: InputAction
): InputState => {
  switch (action.type) {
    case 'CHANGE': {
      let isValid = true;
      let errorText = '';

      if (action.validators.length > 0) {
        const validationResult = validate(action.val, action.validators);
        isValid = validationResult.isValid;
        errorText = validationResult.errorText;
      } else {
        isValid = !!action.val;
      }

      return {
        ...state,
        isTouched: false,
        value: action.val,
        isValid,
        errorText,
      };
    }
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

export const initialInputState = {
  value: '',
  isValid: false,
  isTouched: false,
  errorText: '',
};
