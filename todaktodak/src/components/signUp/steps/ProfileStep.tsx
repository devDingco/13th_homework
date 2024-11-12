import { ProfileImagePreview } from "@/components/profile/ProfileImagePreview";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

export const DEFAULT_PROFILE_IMAGE = `/images/default-profile.png`;

export function ProfileStep() {
  const { setValue } = useFormContext();
  // 파일 입력 요소ㅅ참조
  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(DEFAULT_PROFILE_IMAGE); // 이미지 미리보기 url
  const [isHovered, setIsHovered] = useState(false); // 삭제

  // 이미지 영역 클릭 시 파일 선택
  const handleImageClick = () => {
    fileRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 선택된 파일
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      /*
      // 이미지 파일만
      if (!file.type.includes("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }

      // 5MB 이하
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB 이하여야 합니다.");
        return;
      }
        */

      console.log("선택한 사진: ", file);

      // Form에 파일 데이터 설정
      setValue("image", file, {
        shouldValidate: true, // 유효성 검사: zod에서 설정해둠
      });
      setSelectedImage(file);

      // FileReader를 사용하여 이미지를 data url로 변환
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      // 파일 읽기 완료되면
      fileReader.onload = async (e) => {
        if (typeof e.target?.result === "string") {
          setSelectedImage(file); // 선택된 이미지 파일 저장
          setPreviewUrl(e.target.result); //// 미리보기 URL 설정
        }
      };

      // 파일 읽기 실패
      fileReader.onerror = () => {
        alert("이미지 파일을 읽는 중 오류가 발생했습니다.");
      };
    } catch (error) {
      console.error("이미지 처리 중 오류:", error);
      alert("이미지 처리 중 오류가 발생했습니다.");
    }
  };

  // 이미지 삭제
  const handleDeleteImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImage(null);
    setPreviewUrl(DEFAULT_PROFILE_IMAGE); //기본이미지로 변경

    // Form의 image 값
    setValue("image", null, {
      shouldValidate: true,
    });

    // 파일 입력 초기화
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
          {/* 이미지 미리보기 */}
          <ProfileImagePreview
            src={previewUrl}
            onImageClick={handleImageClick}
            onDelete={handleDeleteImage}
            showDeleteIcon={isHovered && selectedImage !== null}
          />
        </div>

        {/* 숨김 파일 입력 */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* 선택해라 변경해라 */}
        <p className="text-sm text-gray-500 mt-2">
          {selectedImage
            ? "이미지를 변경하려면 클릭하세요"
            : "클릭하여 프로필 사진을 선택하세요"}
        </p>
      </div>
    </div>
  );
}
