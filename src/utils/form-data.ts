import type { FormState } from '../hooks/useFormHook';

export const createFormData = (
  formData: FormState,
  extendingData?: Record<string, string | Blob>
): FormData => {
  const formDataToSend = new FormData();
  for (const key in formData.inputs) {
    if (formData.inputs[key] !== null) {
      formDataToSend.append(key, formData.inputs[key].value as string | Blob);
    }
  }

  if (extendingData) {
    for (const key in extendingData) {
      formDataToSend.append(key, extendingData[key]);
    }
  }

  return formDataToSend;
};
