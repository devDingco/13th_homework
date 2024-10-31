"use client";

import Image from "next/image";
import Input from "../Input/Input";
import Button from "../Button/Button";
import useLogin from "../../../commons/hooks/useLogin";

interface ILogin {
  onClickSignUp: () => void;
}

export default function Login({ onClickSignUp }: ILogin) {
  const { handleInputChange, onClickLogin } = useLogin();
  return (
    <div className="flex flex-col w-80 items-center gap-6 self-stretch px-5 pt-16">
      <Image src="/pngs/logo.png" alt="logo" width={120} height={74.533} />
      <div className="self-stretch text-black text-center text-lg not-italic font-semibold leading-6">
        트립트립에 오신걸 환영합니다.
      </div>
      <div className="self-stretch text-[color:var(--gray-800,#333)] text-center text-sm not-italic font-medium leading-5">
        트립트립에 로그인 하세요.
      </div>

      <Input
        id="email"
        required={false}
        onChange={handleInputChange}
        isLabel={false}
      />
      <Input
        id="password"
        required={false}
        onChange={handleInputChange}
        isLabel={false}
      />
      <Button id="login" color="blue" width="100%" onClick={onClickLogin} />
      <Button id="singUp" color="white" width="100%" onClick={onClickSignUp} />
    </div>
  );
}
