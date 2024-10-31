import type { SignupForm } from "@/types/signup";
import { AddressFields } from "../AddressFields";
import { InputField } from "../common/InputField";

interface AdditionalInfoStepProps {
  formData: SignupForm;
  errors: Record<string, string>;
  passwordStrength: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AdditionalInfoStep({
  formData,
  errors,
  passwordStrength,
  onChange,
}: AdditionalInfoStepProps) {
  return (
    <div className="space-y-6">
      <AddressFields />

      <div>
        <InputField
          type="password"
          label="비밀번호"
          name="password"
          value={formData.password}
          onChange={onChange}
          error={errors.password}
          required
        />
        <div className="mt-2">
          <div className="h-1 bg-gray-200 rounded-full">
            <div
              className={`h-full rounded-full transition-all ${
                passwordStrength > 80
                  ? "bg-green-500"
                  : passwordStrength > 50
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${passwordStrength}%` }}
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {getPasswordStrengthText(passwordStrength)}
          </p>
        </div>
      </div>

      <InputField
        type="password"
        label="비밀번호 확인"
        name="passwordConfirm"
        value={formData.passwordConfirm}
        onChange={onChange}
        error={errors.passwordConfirm}
        required
      />
    </div>
  );
}
