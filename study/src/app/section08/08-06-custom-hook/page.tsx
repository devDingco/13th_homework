"use client";

import { useLoginCheck } from "@/commons/hooks/08-06-use-login-check";

export default function CustomHookPage() {
  const { loginCheck } = useLoginCheck();

  const onClickSubmit = () => {
    // 1. 로그인 체크
    loginCheck();
    // 2. 결제하기
  };
  return (
    <button className="btn" onClick={() => onClickSubmit()}>
      결제하기
    </button>
  );
}