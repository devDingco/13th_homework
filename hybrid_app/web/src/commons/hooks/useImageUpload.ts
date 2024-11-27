"use client";

import { ChangeEvent, useRef, useState } from "react";
import { useImageStore } from "../stores/useImageStore";

export default function useImageUpload(id: string) {
  const fileRef = useRef<HTMLInputElement>(null);
  const { imageMap, setImage } = useImageStore();

  const onClickImage = () => {
    fileRef.current?.click();
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      if (typeof event.target?.result === "string")
        setImage(id, event.target?.result);
    };
  };

  return {
    onClickImage,
    handleImageUpload,
    fileRef,
    imageUrl: imageMap[id] || "",
  };
}
