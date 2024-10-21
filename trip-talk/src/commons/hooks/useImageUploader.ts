import { useMutation } from "@apollo/client";
import { ChangeEvent, useRef, useState } from "react";
import { UploadFileDocument } from "../graphql/graphql";

export default function useImageUploader() {
  const [imageUrl, setImageUrl] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadFile] = useMutation(UploadFileDocument);

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
