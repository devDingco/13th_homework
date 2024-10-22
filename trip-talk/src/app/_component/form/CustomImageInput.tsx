import { CloseCircleOutlined, FileImageOutlined } from '@ant-design/icons';
import React, { MouseEventHandler, RefObject, useState } from 'react';

export default function CustomImageInput({
  onClickFnc,
  onChangeFnc,
  onCancelImage,
  imageRef,
  imageUrl,
  index,
}: {
  onClickFnc: (index: number) => void;
  onChangeFnc: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void;
  onCancelImage: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    index: number,
  ) => void;
  imageRef: RefObject<HTMLInputElement[]>;
  imageUrl: string[];
  index: number;
}) {
  const [imgCancelButton, setImgCancelButton] = useState(false);

  return (
    <div
      className="flex justify-center itmes-center w-[200px] h-[200px] bg-gray/100 relative"
      onClick={() => onClickFnc(index)}
      onMouseEnter={() => setImgCancelButton(true)}
      onMouseLeave={() => setImgCancelButton(false)}>
      <input
        className="hidden"
        type="file"
        onChange={(el) => onChangeFnc(el, index)}
        ref={(el) => {
          if (imageRef.current) {
            imageRef.current[index] = el as HTMLInputElement;
          }
        }}
      />
      {imageUrl[index] ? (
        <img
          src={`https://storage.googleapis.com/${imageUrl[index]}`}
          alt="dd"
        />
      ) : (
        <FileImageOutlined className="text-[100px]" />
      )}
      {imgCancelButton && (
        <button
          type="button"
          className="absolute top-1 right-1 "
          onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) =>
            onCancelImage(event, index)
          }>
          <CloseCircleOutlined className="text-[red] text-4xl" />
        </button>
      )}
    </div>
  );
}
