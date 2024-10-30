"use client";

import { Button, Input } from "antd";
import type { InputRef } from "antd";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useAccessTokenStore } from "@/commons/stores/22-01-access-token-store";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

export default function LoginPage() {
  const router = useRouter();
  const [loginUser] = useMutation(LOGIN_USER);
  const { setAccessToken } = useAccessTokenStore();

  const emailRef = useRef<InputRef>(null);
  const passRef = useRef<InputRef>(null);

  const onClickLogin = async () => {
    // 1. 엑세스 토근을 받아온다.
    const result = await loginUser({
      variables: {
        email: emailRef.current?.input?.value,
        password: passRef.current?.input?.value,
      },
    });

    const accessToken = result.data.loginUser.accessToken;
    console.log("accessToken", accessToken);

    // 2. 엑세스 토근이 없으면 alert를 띄운다.
    if (accessToken === undefined) {
      return alert("로그인 실패");
    }

    // 3. 엑세스 토근이 있으면 글로벌 스테이트에 저장한다.
    setAccessToken(accessToken);

    // 4. 로컬스토리지에 엑세스 토큰을 저장한다.
    localStorage.setItem("accessToken", accessToken);

    // 5. 로그인 성공 alert를 띄우고 페이지를 이동한다.
    router.push(
      "/section23/23-07-login-localstorage-check-hoc-generic-success"
    );
  };

  return (
    <div className="w-[300px] flex flex-col gap-3">
      <h1>Login</h1>
      <Input size="large" type="text" placeholder="이메일" ref={emailRef} />
      <Input
        size="large"
        type="password"
        placeholder="비밀번호"
        ref={passRef}
      />
      <Button
        size="large"
        color="primary"
        variant="solid"
        onClick={() => onClickLogin()}
      >
        로그인
      </Button>
    </div>
  );
}
