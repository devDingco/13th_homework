"use client";
import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import styles from "./style.module.css";
import { useAccessTokenStore } from "@/commons/stores/access-token-store";

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser] = useMutation(LOGIN_USER);
  const { setAccessToken } = useAccessTokenStore();

  const onSubmit = async () => {
    const result = await loginUser({
      variables: { email, password },
    });

    const token = result.data.loginUser.accessToken;
    console.log(token);

    if (token === undefined) {
      alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요!");
    }
    setAccessToken(token);
    localStorage.setItem("accessToken", token);

    alert("로그인 성공!");
    router.push("/boards");
  };

  const onClickSignup = () => {
    router.push("/signup");
  };

  return (
    <div className={styles.wallpaper}>
      <div className={styles.formBox}>
        <h2 className={styles.title}>Login</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <a href="#" className={styles.signup} onClick={onClickSignup}>
            회원가입
          </a>
        </div>

        <button type="submit" className={styles.loginButton} onClick={onSubmit}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
