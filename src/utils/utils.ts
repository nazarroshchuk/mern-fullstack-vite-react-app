// Plain validation functions that return validation result objects

interface ValidationResult {
  isValid: boolean;
  errorText: string;
}

export const VALIDATOR_REQUIRE = (value: string): ValidationResult => {
  const isValid = value.trim().length > 0;
  return {
    isValid,
    errorText: isValid ? '' : 'This field is required',
  };
};

export const VALIDATOR_FILE = (value: File): ValidationResult => {
  const isValid = value instanceof File;
  return {
    isValid,
    errorText: isValid ? '' : 'Please select a valid file',
  };
};

export const VALIDATOR_MINLENGTH =
  (minLength: number) =>
  (value: string): ValidationResult => {
    const isValid = value.trim().length >= minLength;
    return {
      isValid,
      errorText: isValid ? '' : `Minimum length is ${minLength} characters`,
    };
  };

export const VALIDATOR_MAXLENGTH =
  (maxLength: number) =>
  (value: string): ValidationResult => {
    const isValid = value.trim().length <= maxLength;
    return {
      isValid,
      errorText: isValid ? '' : `Maximum length is ${maxLength} characters`,
    };
  };

export const VALIDATOR_MIN =
  (minValue: number) =>
  (value: string): ValidationResult => {
    const isValid = +value >= minValue;
    return {
      isValid,
      errorText: isValid ? '' : `Minimum value is ${minValue}`,
    };
  };

export const VALIDATOR_MAX =
  (maxValue: number) =>
  (value: string): ValidationResult => {
    const isValid = +value <= maxValue;
    return {
      isValid,
      errorText: isValid ? '' : `Maximum value is ${maxValue}`,
    };
  };

export const VALIDATOR_EMAIL = (value: string): ValidationResult => {
  const isValid = /^\S+@\S+\.\S+$/.test(value);
  return {
    isValid,
    errorText: isValid ? '' : 'Please enter a valid email address',
  };
};

// Helper function to run multiple validations
export const validate = (
  value: string,
  validators: ((value: string) => ValidationResult)[]
): ValidationResult => {
  for (const validator of validators) {
    const result = validator(value);
    if (!result.isValid) {
      return result;
    }
  }
  return { isValid: true, errorText: '' };
};
