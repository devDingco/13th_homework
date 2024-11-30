import { useRef, useState } from "react";

export default function UseUploadFile() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return {
    inputRef,
    imageUrls,
    handleUploadClick,
    setImageUrls,
    setFiles,
    files,
  };
}
