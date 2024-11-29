'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function UploadImageComponent() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [Alert, setAlert] = useState<any>(null);

  useEffect(() => {
    import('@/components/ui/alert').then((mod) => setAlert(() => mod.Alert)); // Alert 동적 import
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    // 파일 크기 제한 초과 처리
    if (selectedFile.size > 1024 * 1024 * 5) {
      setShowAlert(true);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        setImageUrls((prev) => [...prev, result]); // 새 이미지를 추가
        setFiles((prev) => [...prev, selectedFile]); // 파일 저장
      }
    };

    fileReader.readAsDataURL(selectedFile);
  };

  const handleDelete = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index)); // 이미지 삭제
    setFiles((prev) => prev.filter((_, i) => i !== index)); // 파일 삭제
  };

  return (
    <main>
      <section className="flex gap-3 overflow-x-auto items-center">
        {/* 사진 등록 버튼 */}
        <label htmlFor="upload" className="cursor-pointer flex-shrink-0">
          <Image
            src="/images/image-add-btn.png"
            alt="사진등록"
            width={100}
            height={100}
          />
          <input
            id="upload"
            type="file"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        {/* 업로드된 이미지 미리보기 */}
        {imageUrls.map((url, index) => (
          <div key={index} className="relative w-24 h-24 flex-shrink-0">
            <Image
              src={url}
              alt={`Preview ${index}`}
              width={100}
              height={100}
              className="w-full h-full rounded-md object-cover"
            />

            <button
              onClick={() => handleDelete(index)}
              className="absolute top-1 right-1 bg-slate-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
            >
              ×
            </button>
          </div>
        ))}
      </section>

      {showAlert && Alert && (
        <Alert>
          <div className="flex flex-col gap-2 p-4 bg-white rounded-md shadow-lg">
            <span className="font-bold text-red-600">파일 크기 초과</span>
            <p>파일 크기가 5MB를 초과합니다.</p>
            <button
              onClick={() => setShowAlert(false)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              닫기
            </button>
          </div>
        </Alert>
      )}
    </main>
  );
}
