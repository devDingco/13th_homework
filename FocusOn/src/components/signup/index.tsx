import styles from "./styles.module.css";
import InputField from "../commons/input";
import FieldWrapper from "../commons/fieldWrapper";
import useSignUp from "./hook";
import ErrorMsg from "../commons/error";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function SignUp() {
  const { onChangeSignupInputs, onClickSignUp, errors } = useSignUp();
  return (
    <div className={styles.signup_page_body}>
      <div className={styles.main_box}>
        <form className={styles.main_form}>
          <div className={styles.title_box}>
            <div className={styles.signup_title}>회원가입</div>
            <div>새로운 계정을 만들어보세요</div>
          </div>
          <form className={styles.input_form}>
            <FieldWrapper label="이메일" isRequired={true}>
              <InputField
                placeholder="이메일을 입력해 주세요."
                name="email"
                onChange={onChangeSignupInputs}
              />
              {errors.email && <ErrorMsg errorMessage={errors.email} />}
            </FieldWrapper>
            <FieldWrapper label="이름" isRequired={true}>
              <InputField
                placeholder="이름을 입력해 주세요."
                name="name"
                onChange={onChangeSignupInputs}
              />
              {errors.name && <ErrorMsg errorMessage={errors.name} />}
            </FieldWrapper>
            <FieldWrapper label="비밀번호" isRequired={true}>
              <InputField
                placeholder="비밀번호를 입력해 주세요."
                name="password"
                onChange={onChangeSignupInputs}
              />
              {errors.password && <ErrorMsg errorMessage={errors.password} />}
            </FieldWrapper>
            <FieldWrapper label="비밀번호 확인" isRequired={true}>
              <InputField
                placeholder="비밀번호를 한번 더 입력해 주세요."
                name="passwordConfirm"
                onChange={onChangeSignupInputs}
              />
              {errors.passwordConfirm && (
                <ErrorMsg errorMessage={errors.passwordConfirm} />
              )}
            </FieldWrapper>
          </form>
          <button className={styles.signup_button} onClick={onClickSignUp}>
            회원가입
          </button>
          <div className={styles.login_button_box}>
            <div className={styles.question}>계정이 있으신가요?</div>
            <Link href="/login" className={styles.login_button}>
              로그인하러 가기
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
