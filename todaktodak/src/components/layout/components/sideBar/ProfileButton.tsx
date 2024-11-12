import Image from "next/image";
import { useSession } from "next-auth/react";

interface ProfileButtonProps {
  isDropdownOpen: boolean;
  onClick: () => void;
}

export default function ProfileButton({
  isDropdownOpen,
  onClick,
}: ProfileButtonProps) {
  // 로그인한 사용자 정보
  const { data: session } = useSession();

  const userName = session?.user?.name ?? "사용자";
  const userImage = session?.user?.image ?? `/images/default-profile.png`;

  return (
    <button
      className="w-full p-4 border-t cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:bg-gray-50"
      onClick={onClick}
      aria-expanded={isDropdownOpen}
      aria-haspopup="true"
      aria-label="사용자 메뉴"
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
          <Image
            src={userImage}
            alt=""
            width={40}
            height={40}
            className="object-cover rounded-full w-full h-full"
          />
        </div>
        <div className="text-left">
          <div className="font-medium text-gray-800">{userName}</div>
          <div className="text-sm text-gray-500">내 프로필</div>
        </div>
      </div>
    </button>
  );
}
