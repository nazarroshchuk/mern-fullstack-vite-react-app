import { useCallback, useReducer } from 'react';

type InputChangeActionType = {
  type: 'INPUT_CHANGE';
  payload: {
    id: string;
    value: string;
    isValid: boolean;
  };
};

type SetDataActionType = {
  type: 'SET_DATA';
  payload: {
    inputs: { [key: string]: InputState };
    isFormValid: boolean;
  };
};

type InputChangeActions = InputChangeActionType | SetDataActionType;

type InputState = {
  value: string;
  isValid: boolean;
};

type FormState = {
  inputs: {
    [key: string]: InputState;
  };
  isFormValid: boolean;
};

export const formReducer = (state: FormState, action: InputChangeActions) => {
  switch (action.type) {
    case 'INPUT_CHANGE': {
      const { value, id, isValid } = action.payload;
      let formIsValid = true;

      for (const inputId in state.inputs) {
        if (inputId === id) {
          formIsValid = formIsValid && isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [id]: { value: value, isValid: isValid },
        },
        isFormValid: formIsValid,
      };
    }
    case 'SET_DATA': {
      return {
        inputs: action.payload.inputs,
        isFormValid: action.payload.isFormValid,
      };
    }
    default:
      return state;
  }
};

const useFormHook = (
  initialInputs: { [key: string]: InputState },
  initialValidity: boolean
) => {
  const [formData, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isFormValid: initialValidity,
  });

  const onInputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {
      console.log('id, value, isValid: ', id, value, isValid);
      dispatch({
        type: 'INPUT_CHANGE',
        payload: { value, id, isValid },
      });
    },
    []
  );

  const setFormData = useCallback(
    (inputsData: { [key: string]: InputState }, formValidity: boolean) => {
      dispatch({
        type: 'SET_DATA',
        payload: { inputs: inputsData, isFormValid: formValidity },
      });
    },
    []
  );

  return { formData, onInputHandler, setFormData };
};

export default useFormHook;
