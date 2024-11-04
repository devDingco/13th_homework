"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";

import {
  LoginUserDocument,
  LogoutUserDocument,
} from "@/commons/graphql/graphql";
import { useAccessTokenStore } from "@/commons/stores/access-token";

export const useLoginPage = () => {
  // 로그인
  const [loginUser] = useMutation(LoginUserDocument);
  // 로그아웃
  const [logoutUser] = useMutation(LogoutUserDocument);

  const { setAccessToken } = useAccessTokenStore();

  const router = useRouter();

  const { control, getValues } = useForm({
    mode: "onChange",
  });

  //! 로그아웃 함수
  const userLogOut = async () => {
    try {
      const result = await logoutUser();
      if (result.data?.logoutUser) {
        // 쿠키에 저장되어있는 리프레시 토큰 삭제
        document.cookie =
          "refreshToken = ; expires = Thu, 01 Jan 1970 00:00:00 GMT";

        alert("로그아웃 되었습니다.");
        router.push("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(`${error.message}`);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  //! 로그인 제출 함수
  const signInSubmit = async () => {
    const { email, password } = getValues();
    // 0. 이메일과 비밀번호가 입력되었는지 확인
    if (!email || !password) {
      return alert("이메일과 비밀번호를 입력해 주세요.");
    }

    // try {
    // 1. 로그인 요청
    const result = await loginUser({
      variables: {
        email,
        password,
      },
    });

    // 2. 로그인 성공 시
    if (result.data?.loginUser.accessToken) {
      setAccessToken(result.data?.loginUser.accessToken);
      router.push("/");
    }
  };

  return { control, signInSubmit, router, userLogOut };
};
