"use client";
import Image from "next/image";
import Link from "next/link";
import Input from "@/components/input";
import { useLoginPage } from "./hook";
import { Button } from "antd";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { control } = useLoginPage();
  const router = useRouter();
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
          <Input
            id="loginEmail"
            type="text"
            placeholder="이메일을 입력해 주세요."
            control={control}
          />

          <Input
            id="loginPassword"
            control={control}
            type="password"
            placeholder="비밀번호를 입력해 주세요."
          />
        </form>
      </div>
      <div className="flex flex-col gap-6 w-full">
        <Button color="default" variant="outlined">
          로그인
        </Button>
        <Button
          color="primary"
          variant="solid"
          onClick={() => router.push("/join")}
        >
          회원가입
        </Button>
      </div>
    </>
  );
}
