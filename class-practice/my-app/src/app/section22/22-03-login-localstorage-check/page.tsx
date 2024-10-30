"use client";
import { useAccessTokenStore } from "@/commons/stores/22-01-access-token-store";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import React from "react";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

const LoginPage = () => {
  const router = useRouter();
  const [loginUser] = useMutation(LOGIN_USER);
  const { setAccessToken } = useAccessTokenStore();

  const onClickLogin = async () => {
    // 1. 로그인 뮤테이션 받아서 accessToken 받아오기
    const result = await loginUser({
      variables: {
        email: "examplecc@cc.com",
        password: "1234",
      },
    });
    const accessToken = result.data.loginUser.accessToken;
    console.log(accessToken);
    // 2. 받아온 accessToken을 globalState에 저장하기
    if (accessToken === undefined) {
      alert("로그인에 실패했습니다! 다시 시도해 주세요!");
    }
    setAccessToken(accessToken);
    localStorage.setItem("accessToken", accessToken);
    // 3. 로그인 성공페이지로 이동하기
    router.push("/section22/22-03-login-localstorage-check-success");
  };

  return (
    <>
      이메일: <input type="text" />
      비밀번호: <input type="password" />
      <button onClick={onClickLogin}>로그인</button>
    </>
  );
};

export default LoginPage;
