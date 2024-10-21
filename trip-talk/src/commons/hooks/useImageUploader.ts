import { useMutation } from "@apollo/client";
import { ChangeEvent, useRef, useState } from "react";
import { UPLOAD_FILE } from "../backend-api";

export default function useImageUploader() {
  const [imageUrl, setImageUrl] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const result = await uploadFile({ variables: { file } });
    setImageUrl(result.data?.uploadFile.url ?? "");
    console.log(imageUrl);
  };

  const onClickImage = () => {
    fileRef.current?.click();
  };

  return {
    onClickImage,
    handleImageUpload,
    imageUrl,
    fileRef,
  };
}
