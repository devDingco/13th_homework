"use client";
import { useMutation } from "@apollo/client";
import { useState } from "react";

export default function ImageUploadPreviewPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. 이미지 미리보기용 URL 생성 - 가짜 URL 내 브라우저에서만 확인 가능
    // URL.createObjectURL을 사용하여 파일을 읽어온 후, 가짜 URL을 생성하여 이미지 URL로 사용하는 형태
    // 최신 브라우저에서만 접근 가능하다.
    const previewImgUrl = URL.createObjectURL(file);

    // 2. 이미지 미리보기용 URL 생성 - 다른 브라우저에서도 접근 가능하지만 용량이 큰 url
    // fileReader를 사용하여 파일을 읽어온 후, 읽어온 파일을 base64로 변환하여 이미지 URL로 사용하는 형태
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result !== "string") return;
      setImageUrl(result as string);
    };
  };

  return (
    <div>
      <input type="file" onChange={onChangeFile} />
      <br />
      <br />
      {imageUrl && (
        // 가짜 URL로 이미지를 미리보기 처리할것이기 때문에 url 앞쪽에 img 서버주소를 붙여줄 필요가 없다.
        <img src={imageUrl} alt="이미지" style={{ width: "200px" }} />
      )}
    </div>
  );
}
