"use client";

import Link from "next/link";
import styles from "./styles.module.css";
import useLogin from "./hook";
import Image from "next/image";
import { FormProvider } from "react-hook-form";
import { InputSoftMFull } from "@/commons/ui/input";
import { ButtonSoftMFullMain } from "@/commons/ui/button";
import ErrorMessage from "@/commons/ui/error";

export default function Login() {
  const { onClickLogin, methods } = useLogin();
  return (
    <div className={styles.login_page_body}>
      <div className={styles.main_box}>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onClickLogin)}
            className={styles.main_form}
          >
            <Image
              src="/images/focuson.png"
              width={0}
              height={0}
              sizes="100vw"
              alt="FocusOn로고"
              className={styles.logo}
            />
            <div className={styles.login_title}>
              포커스온에 오신것을 환영합니다
            </div>
            <div className={styles.input_form}>
              <InputSoftMFull
                type="text"
                placeholder="이메일을 입력해 주세요."
                name="email"
              />
              <ErrorMessage name="email" />
              <InputSoftMFull
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                name="password"
              />
              <ErrorMessage name="password" />
            </div>

            <ButtonSoftMFullMain>로그인</ButtonSoftMFullMain>
            <div className={styles.signup_box}>
              <div className={styles.question}>아직 계정이 없으신가요?</div>
              <Link href="/signup" className={styles.signup_button}>
                회원가입하러 가기
              </Link>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
