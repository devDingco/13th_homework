import { useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { CREATE_USER } from "./queries";
import { useRouter } from "next/navigation";
import { successModal } from "@/utils/modal";

export default function useSignUp() {
  const router = useRouter();
  const [createUser] = useMutation(CREATE_USER);
  // 회원가입 input state
  const [signupInputs, setSignupInputs] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
  });

  // signupInputs 구조분해할당
  const { email, password, name, passwordConfirm } = signupInputs;

  // error메세지 state
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
  });

  // 인풋 입력 핸들러
  const onChangeSignupInputs = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignupInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 로그인페이지 이동
  const routerLogin = () => {
    router.push("/login");
  };

  // 입력 검증
  const validateInputs = () => {
    const newErrors = {
      email: "",
      name: "",
      password: "",
      passwordConfirm: "",
    };

    if (!email) {
      newErrors.email = "이메일을 입력해 주세요.";
    }
    if (!name) {
      newErrors.name = "이름을 입력해 주세요.";
    }
    if (!password) {
      newErrors.password = "비밀번호를 입력해 주세요.";
    }
    if (!passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호를 입력해 주세요.";
    }
    if (
      password &&
      passwordConfirm &&
      password !== signupInputs.passwordConfirm
    ) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).some((error) => error);
  };

  // 회원가입 mutation 로직
  const registerMutation = async () => {
    try {
      const result = await createUser({
        variables: {
          createUserInput: {
            email,
            password,
            name,
          },
        },
      });
      console.log(result.data.createUser);
      successModal("회원가입에 성공하였습니다😊", routerLogin);
    } catch (error) {
      console.error(error);
    }
  };

  // 회원가입 버튼
  const onClickSignUp = async () => {
    if (validateInputs()) {
      return; // 유효성 검사 실패 시 종료
    }
    // 회원가입
    registerMutation();
  };

  return {
    onChangeSignupInputs,
    onClickSignUp,
    errors,
  };
}
