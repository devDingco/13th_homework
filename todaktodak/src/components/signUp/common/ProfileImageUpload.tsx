import { Camera } from "lucide-react";

interface ProfileImageUploadProps {
  image: string | null;
  onUpload: () => void;
}

export function ProfileImageUpload({
  image,
  onUpload,
}: ProfileImageUploadProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="relative group">
        <div className="w-32 h-32 rounded-full bg-gray-100 overflow-hidden">
          {image ? (
            <img
              src={image}
              alt="프로필"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <Camera className="w-8 h-8" />
            </div>
          )}
        </div>
        <button
          onClick={onUpload}
          className="absolute bottom-0 right-0 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Camera className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
