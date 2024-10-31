import { CheckIcon } from "lucide-react";

interface SignupCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export function SignupCompleteModal({
  isOpen,
  onClose,
  onLogin,
}: SignupCompleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-lg p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckIcon className="w-10 h-10 text-indigo-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">가입 완료!</h3>
          <p className="mt-2 text-gray-600">
            토닥토닥의 회원이 되신 것을 환영합니다
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={onLogin}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            로그인하기
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 text-gray-600 hover:text-gray-800"
          >
            홈으로 가기
          </button>
        </div>
      </div>
    </div>
  );
}
