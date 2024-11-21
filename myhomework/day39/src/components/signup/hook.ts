"use client";

import { CreateUserDocument } from "@/commons/graphql/graphql";
import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useSignup = () => {
  const router = useRouter();
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isPassword, setIsValidPassword] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);
  const [isValidPasswordCheck, setIsValidPasswordCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    password: "",
  });

  const [createUser] = useMutation(CreateUserDocument);

  const onChangeInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const onChangePasswordCheck = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordCheck(event.target.value);
  };

  const onClickSignup = async () => {
    // 초기 상태 리셋
    setIsValidEmail(false);
    setIsEmail(false);
    setIsValidName(false);
    setIsValidPassword(false);
    setIsValidPasswordCheck(false);
    setIsPasswordCheck(false);

    // 유효성 검사 플래그
    let isValid = true;

    // 이메일 유효성 검사
    if (!inputs.email.trim()) {
      setIsValidEmail(true); // 이메일 비어있음
      isValid = false;
    } else if (!inputs.email.includes("@")) {
      setIsEmail(true); // 이메일 형식 잘못됨
      isValid = false;
    }

    // 이름 유효성 검사
    if (!inputs.name.trim()) {
      setIsValidName(true); // 이름 비어있음
      isValid = false;
    }

    // 비밀번호 유효성 검사
    if (!inputs.password.trim()) {
      setIsValidPassword(true); // 비밀번호 비어있음
      isValid = false;
    }

    // 비밀번호 확인 유효성 검사
    if (!passwordCheck.trim()) {
      setIsValidPasswordCheck(true); // 비밀번호 확인 비어있음
      isValid = false;
    } else if (inputs.password !== passwordCheck) {
      setIsPasswordCheck(true); // 비밀번호 불일치
      isValid = false;
    }

    // 유효성 검사 실패 시 함수 종료
    if (!isValid) return;

    // 회원가입 로직 실행
    try {
      const result = await createUser({
        variables: {
          createUserInput: {
            ...inputs,
          },
        },
      });
      resetFormData();
      setIsSignup(true);
    } catch (error) {
      Modal.error({ title: "회원가입 실패", content: "다시 시도해주세요." });
    }
  };

  const onClickMoveToLogin = () => {
    router.push(`/`);
  };

  function resetFormData() {
    setInputs({
      email: "",
      name: "",
      password: "",
    });
  }

  return {
    onChangeInputs,
    isValidEmail,
    isEmail,
    isValidName,
    isPassword,
    isPasswordCheck,
    isValidPasswordCheck,
    onClickSignup,
    onChangePasswordCheck,
    isSignup,
    setIsSignup,
    onClickMoveToLogin,
  };
};
