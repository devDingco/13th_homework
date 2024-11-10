import Image from "next/image";
import { X } from "lucide-react";

interface ProfileImageProps {
  src: string;
  onImageClick: () => void;
  onDelete?: (e: React.MouseEvent) => void;
  showDeleteIcon?: boolean;
}

export function ProfileImagePreview({
  src,
  onImageClick,
  onDelete,
  showDeleteIcon = false,
}: ProfileImageProps) {
  return (
    <div
      className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 mb-4 cursor-pointer"
      onClick={onImageClick}
    >
      <Image src={src} alt="Profile Preview" layout="fill" objectFit="cover" />

      {/* 삭제 아이콘 오버레이 */}
      {showDeleteIcon && onDelete && (
        <div
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity"
          onClick={onDelete}
        >
          <X className="w-8 h-8 text-white" />
        </div>
      )}
    </div>
  );
}
