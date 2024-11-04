// 로그인 컴포넌트

"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAccessTokenStore } from "@/commons/stores/access.token-store";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

export default function Login() {
  // lottie 로고 만드느라 사용됨
  useEffect(() => {
    // lottie-player 모듈 스크립트 추가
    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs";
    script.type = "module";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  //===============
  const router = useRouter();
  const [loginUser] = useMutation(LOGIN_USER);

  const { setAccessToken } = useAccessTokenStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onClickLogin = async () => {
    // 1. 로그인 뮤테이션 날려서 accessToken 받아오기
    const result = await loginUser({
      variables: {
        email,
        password,
      },
    });
    const accessToken = result.data?.loginUser?.accessToken;
    console.log(accessToken);

    // 2. 받아온 accessToken을 globalState(주스탠드)에 저장하기 & 로컬에도 함께
    if (!accessToken) {
      alert("로그인에 실패했습니다. 다시 시도하세요");
    }
    setAccessToken(accessToken);
    localStorage.setItem("accessToken", accessToken);

    // 3. 로그인 성공 페이지로 이동하기
    router.push("/boards");
  };

  return (
    <>
      <main className={styles.main}>
        <div className={styles.loginSection}>
          <div className={styles.loginText}>
            <div className={styles.logo}>
              {/* dotlottie-player 태그 사용 */}
              <dotlottie-player
                className={styles.lottieLogo}
                src="/lottiefiles/logolottie.json"
                speed="0.8"
                loop
                autoplay
              ></dotlottie-player>
            </div>
            <div className={styles.title}>사이트에 오신걸 환영합니다.</div>
            <div className={styles.subTitle}>사이트에 로그인 해주세요.</div>
          </div>
          <div className={styles.inputSection}>
            <input
              onChange={onChangeEmail}
              className={styles.input}
              type="text"
              placeholder="이메일을 입력해 주세요."
            />
            <input
              onChange={onChangePassword}
              className={styles.input}
              type="password"
              placeholder="비밀번호를 입력해주세요."
            />
          </div>
          <div className={styles.btnSection}>
            <button onClick={onClickLogin} className={styles.loginBtn}>
              로그인
            </button>
            <Link href="/authentication/signup">
              <button className={styles.signupBtn}>회원가입</button>
            </Link>
          </div>
        </div>
        <div className={styles.signupImage}>
          <Image
            className={styles.image}
            src="/signup/signupImg.jpeg"
            alt="회원가입 배경사진"
            width={1000}
            height={0}
          />
        </div>
      </main>
    </>
  );
}
