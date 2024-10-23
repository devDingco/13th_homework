"use client";
import Input from "@/components/input";
import { useJoinPage } from "./hook";
import { Button } from "antd";

export default function JoinPage() {
  const { control, joinSubmit, duplicateCheck, errors, isValid, isDirty } =
    useJoinPage();

  return (
    <>
      <h1 className="font-semibold text-md">회원가입</h1>
      <div className="flex flex-col gap-4 w-full">
        <p className="text-xs font-medium">
          회원가입을 위해 아래 빈칸을 모두 채워 주세요.
        </p>
        <form className="flex flex-col gap-3 text-left">
          <div className="flex gap-3 items-end">
            <Input
              control={control}
              id="joinEmail"
              title="이메일"
              type="email"
              placeholder="이메일을 입력해 주세요."
              errormessage={errors?.joinEmail?.message?.toString()}
              addbutton={
                <Button
                  variant="outlined"
                  size="large"
                  color="primary"
                  onClick={() => duplicateCheck()}
                >
                  중복확인
                </Button>
              }
              required
            />
          </div>

          <Input
            control={control}
            id="joinName"
            title="이름"
            placeholder="이름을 입력해 주세요."
            type="text"
            errormessage={errors?.joinName?.message?.toString()}
            required
          />

          <Input
            control={control}
            id="joinPassword"
            title="비밀번호"
            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
            type="password"
            errormessage={errors?.joinPassword?.message?.toString()}
            required
          />

          <Input
            control={control}
            id="joinPasswordConfirm"
            title="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해 주세요."
            type="password"
            errormessage={errors?.joinPasswordConfirm?.message?.toString()}
            required
          />
        </form>
        <Button
          variant="solid"
          color="primary"
          size="large"
          onClick={joinSubmit}
          disabled={!isValid || !isDirty}
        >
          회원가입
        </Button>
      </div>
    </>
  );
}
