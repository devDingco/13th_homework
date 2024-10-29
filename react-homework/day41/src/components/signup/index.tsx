import styles from "./styles.module.css";
import InputField from "../commons/input";
import FieldWrapper from "../commons/fieldWrapper";
import useSignUp from "./hook";
import ErrorMsg from "../commons/error";

export default function SignUp() {
  const { onChangeSignupInputs, onClickSignUp, errors } = useSignUp();
  return (
    <div className={styles.signup_page_body}>
      <div className={styles.main_box}>
        <div className={styles.main_form}>
          <div className={styles.signup_title}>회원가입</div>
          <div className={styles.input_form}>
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
          </div>

          <button className={styles.signup_button} onClick={onClickSignUp}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
