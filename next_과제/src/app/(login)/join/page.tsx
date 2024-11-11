"use client";
import Input from "@/components/input";
import { useJoinPage } from "./hook";
import { Button } from "antd";
import { FormProvider } from "react-hook-form";

export default function JoinPage() {
  const { methods, joinSubmit } = useJoinPage();

  return (
    <>
      <h1 className="font-semibold text-md">회원가입</h1>
      <FormProvider {...methods}>
        <div className="flex flex-col gap-4 w-full">
          <p className="text-xs font-medium">
            회원가입을 위해 아래 빈칸을 모두 채워 주세요.
          </p>
          <form className="flex flex-col gap-3 text-left">
            <div className="flex gap-3 items-end">
              <Input
                id="joinEmail"
                title="이메일"
                type="email"
                placeholder="이메일을 입력해 주세요."
                required
              />
            </div>

            <Input
              id="joinName"
              title="이름"
              placeholder="이름을 입력해 주세요."
              type="text"
              required
            />

            <Input
              id="joinPassword"
              title="비밀번호"
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
              type="password"
              required
            />

            <Input
              id="joinPasswordConfirm"
              title="비밀번호 확인"
              placeholder="비밀번호를 다시 입력해 주세요."
              type="password"
              required
            />
          </form>
          <Button
            variant="solid"
            color="primary"
            size="large"
            onClick={joinSubmit}
            disabled={!methods.formState.isValid || !methods.formState.isDirty}
          >
            회원가입
          </Button>
        </div>
      </FormProvider>
    </>
  );
}
