import { SocialButton } from "../shared/SocialButton";

export default function SocialLogin() {
  return (
    <>
      <div className="my-6 flex items-center">
        <div className="flex-1 border-t"></div>
        <span className="px-4 text-sm text-gray-500">간편 로그인</span>
        <div className="flex-1 border-t"></div>
      </div>
      <div className="flex justify-center space-x-4">
        <SocialButton provider="google" />
        <SocialButton provider="kakao" />
        <SocialButton provider="naver" />
      </div>
    </>
  );
}
