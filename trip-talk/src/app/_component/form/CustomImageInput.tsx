import React, { RefObject } from 'react';

export default function CustomImageInput({
  onClickFnc,
  onChangeFnc,
  imageTarget,
  imageUrl,
}: {
  onClickFnc: () => void;
  onChangeFnc: (event: React.ChangeEvent<HTMLInputElement>) => void;
  imageTarget: RefObject<HTMLInputElement>;
  imageUrl: string;
}) {
  return (
    <div className="w-[100px] h-[100px] bg-gray/100" onClick={onClickFnc}>
      <input type="file" onChange={onChangeFnc} ref={imageTarget} />
      {imageUrl && (
        <img src={`https://storage.googleapis.com/${imageUrl}`} alt="dd" />
      )}
    </div>
  );
}
