import { AddressFields } from "../AddressFields";
import { InputField } from "../common/InputField";

interface BasicInfoStepProps {
  formData: {
    name: string;
    nickname: string;
    email: string;
    password: string;
    passwordConfirm: string;
    address: {
      zipcode: string;
      address1: string;
      address2: string;
    };
  };
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function BasicInfoStep({
  formData,
  errors,
  onChange,
}: BasicInfoStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">기본 정보</h2>
        <p className="text-gray-600">회원가입에 필요한 정보를 입력해주세요</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="이름"
          name="name"
          value={formData.name}
          onChange={onChange}
          error={errors.name}
          required
        />
        <div>
          <InputField
            label="닉네임"
            name="nickname"
            value={formData.nickname}
            onChange={onChange}
            error={errors.nickname}
            required
          />
          <button
            type="button"
            className="mt-2 text-sm text-indigo-600 hover:text-indigo-700"
          >
            중복확인
          </button>
        </div>
      </div>

      <InputField
        label="이메일"
        name="email"
        type="email"
        value={formData.email}
        onChange={onChange}
        error={errors.email}
        required
      />

      <AddressFields address={formData.address} onChange={onChange} />

      <div className="space-y-4">
        <InputField
          label="비밀번호"
          name="password"
          type="password"
          value={formData.password}
          onChange={onChange}
          error={errors.password}
          required
          placeholder="영문, 숫자, 특수문자 포함 8자 이상"
        />
        <InputField
          label="비밀번호 확인"
          name="passwordConfirm"
          type="password"
          value={formData.passwordConfirm}
          onChange={onChange}
          error={errors.passwordConfirm}
          required
        />
      </div>
    </div>
  );
}
