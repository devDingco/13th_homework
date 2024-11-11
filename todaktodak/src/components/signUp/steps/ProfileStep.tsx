import { useFormContext } from "react-hook-form";
import { useRef, useState, useEffect } from "react";
import { ProfileImagePreview } from "@/components/profile/ProfileImagePreview";
import { optimizeImage } from "@/utils/imageUtils";
import type { SignupFormValues } from "@/schemas/auth.schema";

export const DEFAULT_PROFILE_IMAGE = `/images/default-profile.png`;

export function ProfileStep() {
  const { setValue } = useFormContext<SignupFormValues>();
  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(DEFAULT_PROFILE_IMAGE);
  const [isHovered, setIsHovered] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setValue("image", DEFAULT_PROFILE_IMAGE);
  }, [setValue]);

  const handleImageClick = () => {
    if (!isProcessing) {
      fileRef.current?.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      if (!file.type.includes("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB 이하여야 합니다.");
        return;
      }

      setIsProcessing(true);

      // 이미지 최적화 및 Base64 변환
      const base64String = await optimizeImage(file);

      setSelectedImage(file);
      setPreviewUrl(base64String);
      setValue("image", base64String);
    } catch (error) {
      console.error("이미지 처리 중 오류:", error);
      alert("이미지 처리 중 오류가 발생했습니다.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImage(null);
    setPreviewUrl(DEFAULT_PROFILE_IMAGE);
    setValue("image", DEFAULT_PROFILE_IMAGE);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <h2 className="text-xl font-semibold">프로필 설정</h2>

      <div className="flex flex-col items-center">
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <ProfileImagePreview
            src={previewUrl}
            onImageClick={handleImageClick}
            onDelete={handleDeleteImage}
            showDeleteIcon={isHovered && selectedImage !== null}
          />
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {isProcessing ? (
          <p className="text-sm text-blue-500 mt-2">이미지 처리 중...</p>
        ) : (
          <p className="text-sm text-gray-500 mt-2">
            {selectedImage
              ? "이미지를 변경하려면 클릭하세요"
              : "클릭하여 프로필 사진을 선택하세요"}
          </p>
        )}
      </div>
    </div>
  );
}
