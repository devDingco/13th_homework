"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";

import { LoginUserDocument } from "@/commons/graphql/graphql";
import { useAccessTokenStore } from "@/commons/stores/access-token";
import { useLoginCheck } from "@/commons/hooks/useLoginCheck";

export const useLoginPage = () => {
  const { setIsLogin } = useLoginCheck();
  // const client = useApolloClient();
  // 로그인
  const [loginUser] = useMutation(LoginUserDocument);

  const { setAccessToken } = useAccessTokenStore();

  const router = useRouter();

  const methods = useForm({
    mode: "onChange",
  });

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
      setIsLogin(true); // 로그인 상태로 변경
      setAccessToken(result.data?.loginUser.accessToken); // 스테이트에 액세스 토큰 저장
      router.push("/");
    }
  };

  return { signInSubmit, router, methods };
};
