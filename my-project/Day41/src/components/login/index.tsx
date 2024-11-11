"use client";

import Image from "next/image";
import useLogin from "./hook";

export default function Login() {
  const { errorMessage, onChangeInput, onClickLogin } = useLogin();
  return (
    <div className="flex flex-col gap-6 mx-5">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-6">
          <div className="w-[120px] h-[80px] relative">
            <Image
              src="/img/logo.svg"
              alt="loginLogo"
              fill
              object-fit="cover"
            />
          </div>
          <div className="w-full font-semibold text-[18px] leading-6 text-center">
            트립트립에 오신걸 환영합니다.
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="w-full font-medium text-[14px] leading-5 text-center">
            트립트립에 로그인 하세요.
          </div>
          <div className="flex flex-col gap-4 w-full">
            <input
              type="text"
              className="w-full min-h-10 rounded-lg py-2 px-4 border border-[#d4d3d3] font-normal text-[14px] leading-5 text-[#000000]"
              placeholder="이메일을 입력해 주세요."
              name="email"
              onChange={onChangeInput}
            />
            <input
              type="password"
              className="w-full min-h-10 rounded-lg py-2 px-4 border border-[#d4d3d3] font-normal text-[14px] leading-5 text-[#000000]"
              placeholder="비밀번호를 입력해 주세요."
              name="password"
              onChange={onChangeInput}
            />
          </div>
          <div
            className="font-normal text-3 leading-5 text-[#f66a6a]"
            style={{ visibility: errorMessage }}
          >
            아이디 또는 비밀번호를 확인해 주세요.
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <button
          className="w-full h-12 rounded-lg py-3 px-4 bg-[#2974e5] font-semibold text-[18px] leading-6 text-center text-[#ffffff]"
          onClick={onClickLogin}
        >
          로그인
        </button>
        <div className="font-normal text-[14px] leading-5 text-[#333333]">
          회원가입
        </div>
      </div>
    </div>
  );
}
