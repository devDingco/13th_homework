"use client";

import { useRouter } from "next/navigation";
import { LOGIN_USER } from "./queries";
import { useMutation } from "@apollo/client";
import { useAccessTokenStore } from "@/commons/stores";
import { ChangeEvent, useState } from "react";

const useLogin = () => {
  const router = useRouter();
  const [loginUser] = useMutation(LOGIN_USER);
  const { setAccessToken } = useAccessTokenStore();
  const [errorMessage, setErrorMessage] = useState("");

  const [loginInputs, setLoginInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginInputs;

  const onChangeLoginInputs = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const loginMutation = async () => {
    try {
      // 1. 로그인 뮤테이션 날려서 accessToken 받아오기
      const result = await loginUser({
        variables: { email, password },
      });
      const accessToken = result.data?.loginUser.accessToken;

      // 2. 받아온 accessToken을 globalSate에 저장하기
      if (accessToken === undefined) {
        alert("로그인에 실패하였습니다. 다시 시도해 주세요🥲");
        return;
      }
      setAccessToken(accessToken);
      localStorage.setItem("accessToken", accessToken);

      // 3. 로그인 성공 페이지로 이동하기
      router.push("/products");
    } catch (error) {
      console.error(error);
      setErrorMessage("아이디 또는 비밀번호를 확인해 주세요.");
    }
  };

  const onClickLogin = async () => {
    // 이메일이나 비밀번호 중 하나라도 입력하지 않으면 에러 메세지
    if (!email || !password) {
      setErrorMessage("아이디 또는 비밀번호를 확인해 주세요.");
      return;
    }
    // 로그인 로직
    loginMutation();
  };
  return {
    onChangeLoginInputs,
    onClickLogin,
    errorMessage,
  };
};
export default useLogin;
