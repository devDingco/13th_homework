"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
// import { useApolloClient } from "@apollo/client";
import { useMutation } from "@apollo/client";

import {
  LoginUserDocument,
  LogoutUserDocument,
} from "@/commons/graphql/graphql";
import { useAccessTokenStore } from "@/commons/stores/access-token";
import { useLoginStore } from "@/commons/stores/login-store";

export const useLoginPage = () => {
  const { setIsLogged } = useLoginStore();

  // const client = useApolloClient();
  // 로그인
  const [loginUser] = useMutation(LoginUserDocument);
  // 로그아웃
  const [logoutUser] = useMutation(LogoutUserDocument);

  const { setAccessToken } = useAccessTokenStore();

  const router = useRouter();

  const methods = useForm({
    mode: "onChange",
  });

  //! 로그아웃 함수
  const userLogOut = async () => {
    try {
      const result = await logoutUser();
      console.log(result);
    } catch (e) {
      console.error(e);
    }
  };

  //! 로그인 제출 함수
  const signInSubmit = async () => {
    const { email, password } = methods.getValues();
    // 0. 이메일과 비밀번호가 입력되었는지 확인
    if (!email || !password) {
      return alert("이메일과 비밀번호를 입력해 주세요.");
    }

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
      setIsLogged(true); //
      router.push("/");
    }
  };

  return { signInSubmit, router, userLogOut, methods };
};
