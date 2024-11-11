import { SocialButton } from "../shared/SocialButton";

export default function SocialLogin() {
  return (
    <div className="space-y-6">
      {/* 구분선과 텍스트 */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">간편 로그인</span>
        </div>
      </div>

      {/* 소셜 로그인 버튼들 */}
      <div className="flex justify-center space-x-4">
        <SocialButton provider="google" />
        <SocialButton provider="kakao" />
        <SocialButton provider="naver" />
      </div>
    </div>
  );
}
