import type { FormState } from '../hooks/useFormHook';

export const createFormData = (
  formData: FormState,
  extendingData?: Record<string, string | Blob>
): FormData => {
  const formDataToSend = new FormData();
  for (const key in formData.inputs) {
    if (formData.inputs[key] !== null) {
      const value = formData.inputs[key].value;

      // Special handling for image field
      if (key === 'image') {
        // If it's a File object (new upload), append it
        if (value instanceof File) {
          formDataToSend.append(key, value);
        }
        // If it's a string (existing image filename), don't append it
        // The server will keep the existing image
      } else {
        // For non-image fields, append as usual
        formDataToSend.append(key, value as string | Blob);
      }
    }
  }

  if (extendingData) {
    for (const key in extendingData) {
      formDataToSend.append(key, extendingData[key]);
    }
  }

  return formDataToSend;
};
