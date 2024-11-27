"use client";

import { ChangeEvent, useRef } from "react";
import { useImageStore } from "../stores/useImageStore";

export default function useImageUpload(id: string) {
  const fileRef = useRef<HTMLInputElement>(null);
  const { imageMap, setImage } = useImageStore();

  const onClickImage = () => {
    fileRef.current?.click();
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    // setImage(id, )
  };

  return {
    onClickImage,
    handleImageUpload,
    fileRef,
    imageUrl: imageMap[id] || "",
  };
}
