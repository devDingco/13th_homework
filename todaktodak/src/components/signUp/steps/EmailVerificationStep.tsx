import { InputField } from "../common/InputField";

interface EmailVerificationStepProps {
  email: string;
  verificationCode: string;
  verificationSent: boolean;
  timer: number;
  onSendVerification: () => void;
  onVerificationCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export function EmailVerificationStep({
  email,
  verificationCode,
  verificationSent,
  timer,
  onSendVerification,
  onVerificationCodeChange,
  error,
}: EmailVerificationStepProps) {
  return (
    <div className="space-y-4">
      <div>
        <InputField
          label="이메일"
          name="email"
          type="email"
          value={email}
          error={error}
          required
        />
        <div className="flex mt-2">
          <button
            type="button"
            onClick={onSendVerification}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
          >
            인증번호 발송
          </button>
          {verificationSent && timer > 0 && (
            <span className="ml-2 text-sm text-red-500">
              {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
            </span>
          )}
        </div>
      </div>

      {verificationSent && (
        <InputField
          label="인증번호"
          value={verificationCode}
          onChange={onVerificationCodeChange}
          placeholder="인증번호 6자리 입력"
          maxLength={6}
        />
      )}
    </div>
  );
}
