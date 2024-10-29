"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, LOGOUT_USERS } from "./queries";
import { useAccessTokenStore } from "@/commons/stores/access-token";

export const useLoginPage = () => {
  const [loginUser] = useMutation(LOGIN_USER);
  const [logoutUser] = useMutation(LOGOUT_USERS);

  const { setAccessToken } = useAccessTokenStore();

  const router = useRouter();

  const { control, getValues } = useForm({
    mode: "onChange",
  });

  //! 로그아웃 함수
  const logOut = async () => {
    const result = await logoutUser();
    console.log(result);
  };

  //! 로그인 제출 함수
  const signInSubmit = async () => {
    const { email, password } = getValues();
    // 0. 이메일과 비밀번호가 입력되었는지 확인
    if (!email || !password) {
      return alert("이메일과 비밀번호를 입력해 주세요.");
    }

    try {
      // 1. 로그인 요청
      const result = await loginUser({
        variables: {
          email,
          password,
        },
      });

      // 2. 로그인 성공 시
      setAccessToken(result.data?.loginUser.accessToken);
      localStorage.setItem("accessToken", result.data?.loginUser.accessToken);
    } catch (e) {
      console.log("에러 확인: ", e);
      alert("로그인에 실패했습니다.");
    }
  };

  return { control, signInSubmit, router, logOut };
};
