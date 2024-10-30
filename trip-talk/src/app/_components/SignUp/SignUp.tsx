"use client";

import { Controller } from "react-hook-form";
import useSignUp from "../../../commons/hooks/useSignUp";
import Button from "../Button/Button";
import Input from "../Input/Input";

export default function SignUp() {
  const { onClickSubmit, handleSubmit, control } = useSignUp();

  return (
    <form
      onSubmit={handleSubmit(onClickSubmit)}
      className="flex flex-col w-80 items-center gap-6 self-stretch px-5 pt-16"
    >
      <div className="self-stretch text-black text-center text-lg not-italic font-semibold leading-6">
        회원가입
      </div>
      <div className="self-stretch text-[color:var(--gray-800,#333)] text-center text-sm not-italic font-medium leading-5">
        회원가입을 위해 아래 빈칸을 모두 채워 주세요.
      </div>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input id="email" {...field} isLabel={true} required={true} />
        )}
      />
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input id="name" {...field} isLabel={true} required={true} />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input id="password" {...field} isLabel={true} required={true} />
        )}
      />
      <Controller
        name="checkPassword"
        control={control}
        render={({ field }) => (
          <Input id="checkPassword" {...field} isLabel={true} required={true} />
        )}
      />
      <Button id="singUp" color="white" width="100%" />
    </form>
  );
}
