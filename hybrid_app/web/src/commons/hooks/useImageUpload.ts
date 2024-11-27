"use client";

import { ChangeEvent, useRef, useState } from "react";
import checkValidationFile from "../libraries/checkValidationFile";

export default function useImageUpload() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);

  const onClickImage = () => {
    fileRef.current?.click();
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    const isValid = checkValidationFile(file);
    if(!isValid) return true;

    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      if (typeof event.target?.result === "string")
        setImages([event.target?.result, ...images]);
    };
  };

  return {
    onClickImage,
    handleImageUpload,
    fileRef,
    images,
  };
}
