import React, { type ChangeEvent, useEffect } from 'react';

import Button from '../UI/Button';
import './ImageUpload.css';

interface Props {
  id: string;
  center?: boolean;
  onChange: (id: string, file: File | null, isValid: boolean) => void;
  errorText: string;
}

export const ImageUpload: React.FC<Props> = ({
  id,
  center,
  onChange,
  errorText,
  ...props
}) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [isValid, setIsValid] = React.useState<boolean>(false);

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

  return (
    <div className="image-upload-wrapper">
      <input
        id={id}
        type="file"
        className="input-controll"
        style={{ display: 'none' }}
        ref={ref}
        accept={'.jpg,.png,.jpeg'}
        onChange={pickedHandler}
        {...props}
      />
      <div className={`image-upload ${center && 'center'}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl ?? ''} alt="" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={chooseFileHandler}>
          Choose image
        </Button>
        {!isValid && <p>{errorText}</p>}
      </div>
    </div>
  );
};
