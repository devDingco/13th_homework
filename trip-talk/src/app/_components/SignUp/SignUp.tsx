"use client";

import useSignUp from "../../../commons/hooks/useSignUp";
import Button from "../Button/Button";
import Input from "../Input/Input";

export default function SignUp() {
  const { handleInputChange, onClickSignUp } = useSignUp();
  return (
    <div className="flex flex-col w-80 items-center gap-6 self-stretch px-5 pt-16">
      <div className="self-stretch text-black text-center text-lg not-italic font-semibold leading-6">
        회원가입
      </div>
      <div className="self-stretch text-[color:var(--gray-800,#333)] text-center text-sm not-italic font-medium leading-5">
        회원가입을 위해 아래 빈칸을 모두 채워 주세요.
      </div>
      <Input
        id="email"
        onChange={handleInputChange}
        isLabel={true}
        required={true}
      />
      <Input
        id="name"
        onChange={handleInputChange}
        isLabel={true}
        required={true}
      />
      <Input
        id="password"
        onChange={handleInputChange}
        isLabel={true}
        required={true}
      />
      <Input
        id="checkPassword"
        onChange={handleInputChange}
        isLabel={true}
        required={true}
      />
      <Button id="singUp" color="white" width="100%" onClick={onClickSignUp} />
    </div>
  );
}
