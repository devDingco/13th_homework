"use client";
import Image from "next/image";
import Link from "next/link";
import Input from "@/components/input";
import { Controller } from "react-hook-form";
import { useLoginPage } from "./hook";

export default function LoginPage() {
  const { control } = useLoginPage();
  return (
    <>
      <h1>
        <Link href={"/"}>
          <Image
            src="/images/logo.png"
            alt="트립트립"
            width={120}
            height={74.5}
          />
        </Link>
      </h1>
      <h2 className="font-bold">트립토그에 오신것을 환영합니다.</h2>
      <div className="flex flex-col gap-4 w-full">
        <p className="text-sm text-gray-800">트립토크에 로그인 하세요.</p>
        <form className="flex flex-col gap-3">
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                type="text"
                placeholder="이메일을 입력해 주세요."
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                {...field}
              />
            )}
          />
        </form>
      </div>
      <div className="flex flex-col gap-6 w-full">
        <button className="btn btn-primary text-base-100">로그인</button>
        <Link href="/join">회원가입</Link>
      </div>
    </>
  );
}
