import { Camera } from "lucide-react";

interface ProfileStepProps {
  profileImage: File | null;
  onUpload: () => void;
}

export function ProfileStep({ profileImage, onUpload }: ProfileStepProps) {
  const imageUrl = profileImage ? URL.createObjectURL(profileImage) : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">프로필 설정</h2>
        <p className="text-gray-600">프로필 이미지를 설정해주세요</p>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative group">
          <div className="w-40 h-40 rounded-full bg-gray-100 overflow-hidden">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="프로필"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <Camera className="w-12 h-12" />
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
        <p className="mt-4 text-sm text-gray-500">
          프로필 이미지는 언제든지 변경할 수 있습니다
        </p>
      </div>
    </div>
  );
}
