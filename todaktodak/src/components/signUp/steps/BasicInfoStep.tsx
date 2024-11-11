"use client";

import { InputField } from "../common/InputField";
import { AddressField } from "../common/AddressField";

export default function BasicInfoStep() {
  return (
    <div className="space-y-6">
      {/* 이름, 닉네임 */}
      <div className="grid grid-cols-2 gap-8">
        <InputField
          name="name"
          label="이름"
          placeholder="이름을 입력해주세요"
          required
        />
        <InputField
          name="nickname"
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
          required
        />
      </div>

      {/* 이메일 */}
      <InputField
        name="email"
        label="이메일"
        type="email"
        placeholder="이메일을 입력해주세요"
        required
      />

      {/* 비밀번호 */}
      <div className="space-y-4">
        <InputField
          name="password"
          label="비밀번호"
          type="password"
          placeholder="영문, 숫자, 특수문자 포함 8자 이상"
          required
        />
        <InputField
          name="passwordConfirm"
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          required
        />
      </div>

      {/* 주소 입력 */}
      <AddressField />
    </div>
  );
}
