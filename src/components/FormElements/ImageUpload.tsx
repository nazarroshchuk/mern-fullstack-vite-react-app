import React, { type ChangeEvent, useEffect } from 'react';

import Button from '../UI/Button';
import './ImageUpload.css';

interface Props {
  id: string;
  center?: boolean;
  onChange: (id: string, file: File | null, isValid: boolean) => void;
  errorText: string;
  imagePlaceholder?: string;
}

export const ImageUpload: React.FC<Props> = ({
  id,
  center,
  onChange,
  errorText,
  imagePlaceholder,
  ...props
}) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  const [isValid, setIsValid] = React.useState<boolean>(!!imagePlaceholder);

  // Only construct imageUrl if we're not skipping preview and have a preview or placeholder
  const imageUrl = previewUrl
    ? previewUrl
    : imagePlaceholder
      ? `${import.meta.env.VITE_IMAGE_UPLOAD_URL}/${imagePlaceholder}`
      : null;

  const chooseFileHandler = () => {
    ref.current?.click();
  };

  const pickedHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let file = null;
    let fileIsValid = isValid;
    if (e.target?.files && e.target.files.length !== 0) {
      file = e.target.files[0];
      setFile(file);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    onChange(id, file, fileIsValid);
  };

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  useEffect(() => {
    if (imagePlaceholder && !file) {
      // Send the existing image filename as a string
      onChange(id, null, true);
      setIsValid(true);
    }
  }, [imagePlaceholder, onChange, id, file]);

  return (
    <div className="image-upload-wrapper">
      <input
        id={id}
        type="file"
        className="input-controll"
        style={{ display: 'none' }}
        ref={ref}
        accept={'.jpg,.png,.jpeg, .webp'}
        onChange={pickedHandler}
        {...props}
      />
      <div className={`image-upload ${center && 'center'}`}>
        <div className="image-upload__preview">
          {imageUrl && <img src={imageUrl ?? ''} alt="" />}
          {!imageUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={chooseFileHandler}>
          Choose image
        </Button>
        {!isValid && <p>{errorText}</p>}
      </div>
    </div>
  );
};
