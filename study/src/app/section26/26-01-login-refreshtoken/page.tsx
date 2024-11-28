"use client";

import { Button, Input } from "antd";
import type { InputRef } from "antd";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useAccessTokenStore } from "@/commons/stores/22-01-access-token-store";

const LOGIN_USER_EXAMPLE = gql`
  mutation loginUserExample($email: String!, $password: String!) {
    loginUserExample(email: $email, password: $password) {
      accessToken
    }
  }
`;

export default function LoginPage() {
  const router = useRouter();
  const [loginUserExample] = useMutation(LOGIN_USER_EXAMPLE);
  const { setAccessToken } = useAccessTokenStore();

  const emailRef = useRef<InputRef>(null);
  const passRef = useRef<InputRef>(null);

  const onClickLogin = async () => {
    const email = emailRef.current?.input?.value;
    const password = passRef.current?.input?.value;
    console.log(email, password);

    // 1. 엑세스 토근을 받아온다.
    const result = await loginUserExample({
      variables: {
        email,
        password,
      },
    });

    const accessToken = result.data.loginUserExample.accessToken;
    console.log("accessToken", accessToken);

    // 2. 엑세스 토근이 없으면 alert를 띄운다.
    if (accessToken === undefined) {
      return alert("로그인 실패");
    }

    // 3. 엑세스 토근이 있으면 글로벌 스테이트에 저장한다.
    setAccessToken(accessToken);
    // localStorage.setItem("accessToken", accessToken); => 더이상 사용하지 않음(refreshToken을 사용하기 때문에)

    // 4. 로그인 성공 alert를 띄우고 페이지를 이동한다.
    router.push("/section26/26-01-login-refreshtoken-success");
  };

  return (
    <div className="w-[300px] flex flex-col gap-3">
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
