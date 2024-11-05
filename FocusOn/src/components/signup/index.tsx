import styles from "./styles.module.css";
import FieldWrapper from "../commons/fieldWrapper";
import useSignUp from "./hook";
import Link from "next/link";
import { FormProvider } from "react-hook-form";
import { InputSoftMFull } from "@/commons/ui/input";
import { ButtonSoftMFullMain } from "@/commons/ui/button";
import ErrorMessage from "@/commons/ui/error";

export default function SignUp() {
  const { onClickSignUp, methods } = useSignUp();

  return (
    <div className={styles.signup_page_body}>
      <div className={styles.main_box}>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onClickSignUp)}
            className={styles.main_form}
          >
            <div className={styles.title_box}>
              <div className={styles.signup_title}>회원가입</div>
              <div>새로운 계정을 만들어보세요</div>
            </div>
            <div className={styles.input_form}>
              <FieldWrapper label="이메일">
                <InputSoftMFull
                  type="text"
                  name="email"
                  placeholder="이메일을 입력해 주세요."
                />
                <ErrorMessage name="email" />
              </FieldWrapper>
              <FieldWrapper label="이름">
                <InputSoftMFull
                  type="text"
                  name="name"
                  placeholder="이름을 입력해 주세요."
                />
                <ErrorMessage name="name" />
              </FieldWrapper>
              <FieldWrapper label="비밀번호">
                <InputSoftMFull
                  type="password"
                  name="password"
                  placeholder="비밀번호를 입력해 주세요."
                />
                <ErrorMessage name="password" />
              </FieldWrapper>
              <FieldWrapper label="비밀번호 확인">
                <InputSoftMFull
                  type="password"
                  name="passwordConfirm"
                  placeholder="비밀번호를 한번 더 입력해 주세요."
                />
                <ErrorMessage name="passwordConfirm" />
              </FieldWrapper>
            </div>
            <ButtonSoftMFullMain>회원가입</ButtonSoftMFullMain>
            <div className={styles.login_button_box}>
              <div className={styles.question}>계정이 있으신가요?</div>
              <Link href="/login" className={styles.login_button}>
                로그인하러 가기
              </Link>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
