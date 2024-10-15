"use client";
import Input from "@/components/input";
// import { Controller } from "react-hook-form";
import { useJoinPage } from "./hook";
import { Button } from "antd";

export default function JoinPage() {
  const { control } = useJoinPage();
  return (
    <>
      <h1 className="font-semibold text-md">회원가입</h1>
      <div className="flex flex-col gap-4">
        <p className="text-xs font-medium">
          회원가입을 위해 아래 빈칸을 모두 채워 주세요.
        </p>
        <form className="flex flex-col gap-3">
          <Input
            control={control}
            id="joinEmail"
            className="h-10"
            title="이메일"
            type="email"
            required
          />

          <Input
            control={control}
            id="joinName"
            className="h-10"
            title="이름"
            type="text"
            required
          />

          <Input
            control={control}
            id="joinPassword"
            className="h-10"
            title="비밀번호"
            type="password"
            required
          />

          <Input
            id="joinPasswordConfirm"
            control={control}
            className="h-10"
            title="비밀번호 확인"
            type="password"
            required
          />
        </form>
        <Button variant="solid" color="primary">
          회원가입
        </Button>
      </div>
    </>
  );
}
