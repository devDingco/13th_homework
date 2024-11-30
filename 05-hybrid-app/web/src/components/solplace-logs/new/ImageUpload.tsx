import Image from "next/image";
import add from "../../../../public/images/icons/add.svg";
import close from "../../../../public/images/icons/close.svg";
import UseUploadFile from "@/common/hooks/solplace-logs/new/useUploadfile";
import { useFormContext } from "react-hook-form";
import { useEffect, type ChangeEvent } from "react";

interface IImageUploadProps {
  images: string[];
}

export default function ImageUpload({ images }: IImageUploadProps) {
  const { register, setValue, trigger } = useFormContext();
  const {
    inputRef,
    imageUrls,
    handleUploadClick,
    setImageUrls,
    setFiles,
    files,
  } = UseUploadFile();

  // 첫 페이지 불러오기
  useEffect(() => {
    if (!files.length && images?.length && !imageUrls.length) {
      setImageUrls(images); // 기존 이미지 불러오기
      setValue("images", images);
    }
  }, [files.length, images]);

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []) as File[];
    if (files.length === 0) return; // 파일이 없으면 종료

    // 사진 크기 5MB
    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB를 초과할 수 없습니다.");
        return;
      }
    }

    const newImageUrls: string[] = [];

    const fileReaders = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            newImageUrls.push(reader.result);
            resolve(reader.result);
          }
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(fileReaders).then(() => {
      // setImageUrls((prev) => [...prev, ...newImageUrls]);
      const mergedImageUrls = [...imageUrls, ...newImageUrls];
      setImageUrls(mergedImageUrls); // 상태 업데이트
      setFiles((prev) => [...prev, ...files]);
      setValue("images", mergedImageUrls);
      trigger("images");
    });
  };

  // 이미지 삭제 핸들러
  const handleRemoveImage = (index: number) => {
    const updatedImageUrls = imageUrls.filter((_, i) => i !== index);
    const updatedFiles = files.filter((_, i) => i !== index);

    setImageUrls(updatedImageUrls);
    setFiles(updatedFiles);
    setValue("images", updatedImageUrls); // 폼 상태와 동기화
    trigger("images");
  };

  return (
    <div className="overflow-x-auto w-full">
      <div className="flex gap-12 min-w-full">
        <div
          className="min-w-100 h-100 bg-[#f2f2f2] rounded-lg flex flex-col justify-center items-center hover:cursor-pointer"
          onClick={handleUploadClick}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            {...register("images")}
            ref={inputRef}
            onChange={onChangeFile}
          />
          <Image src={add} alt="add" />
          <span className="text-[#777777] text-xs font-normal leading-tight">
            사진 등록
          </span>
        </div>

        {/* 이미지 미리보기 */}
        {imageUrls.map((url, index) => (
          <div
            className="relative min-w-100 h-100 rounded-lg"
            key={`image-${url}-${index}`}
          >
            <Image
              src={url}
              alt="미리보기"
              className="min-w-100 h-100 rounded-lg object-cover"
              width={100}
              height={100}
            />
            {/* 삭제하기 */}
            <button
              className="absolute top-8 right-8 w-20 h-20 py-4 bg-black/40 rounded-[100px] justify-center items-center gap-2.5 flex"
              onClick={() => handleRemoveImage(index)}
            >
              <Image src={close} alt="delete" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
