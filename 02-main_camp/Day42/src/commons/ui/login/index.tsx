"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";
import { InputForm } from "@/app/_components/commons/input";
import { LogoIcon } from "../icon";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILoginSchema, loginSchema } from "./schema";
import { useMutation } from "@apollo/client";
import { LoginUserDocument } from "@/commons/gql/graphql";
import { Button__48__full } from "../button";
import { NavigationPaths, useNavigate } from "@/commons/navigate";
import { useAccessTokenStore } from "@/app/_store/accessToken/store";

interface ILoginProps {
  handleSignUp: () => void;
}

export default function Login({ handleSignUp }: ILoginProps) {
  const navigate = useNavigate();
  const [loginUser] = useMutation(LoginUserDocument);

  const { setAccessToken } = useAccessTokenStore();

  const methods = useForm<ILoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const errorMessages = methods.formState.errors;
  console.log(errorMessages.password?.message);

  const [isLoginFailed, setIsLoginFailed] = useState(false);

  const onClickLogin = async (data: ILoginSchema) => {
    console.log("로그인 버튼을 눌렀습니다.");
    try {
      const result = await loginUser({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
      const accessToken = result.data?.loginUser.accessToken;
      console.log(accessToken);

      if (accessToken === undefined) {
        setIsLoginFailed(true);
        alert("로그인을 실패했습니다.");
        return;
      }

      setAccessToken(accessToken);
      localStorage.setItem("accessToken", accessToken);

      setIsLoginFailed(false);
      navigate(NavigationPaths.boards);

      alert("로그인 성공!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className={styles.login__container}>
        <div className={styles.logo__container}>
          <LogoIcon width={7.5} height={5} />
          <span className={styles.description}>
            트립트립에 오신걸 환영합니다.
          </span>
        </div>
        <div className={styles.input__container}>
          <span className={styles.login__description}>
            트립트립에 로그인 하세요.
          </span>
          <div className={styles.inputs}>
            <InputForm<ILoginSchema>
              validationStatus={isLoginFailed ? "error" : "default"}
              keyName="email"
              type="text"
              placeholder="이메일을 입력해주세요."
            />
            <InputForm<ILoginSchema>
              validationStatus={isLoginFailed ? "error" : "default"}
              keyName="password"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              errorMessage={
                isLoginFailed ? "아이디 또는 비밀번호를 확인해 주세요." : ""
              }
            />
          </div>
        </div>
        <div className={styles.buttons__container}>
          <Button__48__full
            label="로그인"
            onClick={methods.handleSubmit(onClickLogin)}
          />
          <button className={styles.button__signUp} onClick={handleSignUp}>
            회원가입
          </button>
        </div>
      </div>
    </FormProvider>
  );
}
