"use client";

import { LoginUserDocument } from "@/commons/graphql/graphql";
import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useLogin = () => {
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [loginUser] = useMutation(LoginUserDocument);

  const onChangeInputs = () => {};

  const onClickLogin = async () => {
    if (!inputs.email.trim() || !inputs.password.trim()) {
      setIsValid(true);
      return;
    }

    try {
      const result = await loginUser({
        variables: {
          ...inputs,
        },
      });
      resetFormData();
      Modal.success({
        title: "로그인 성공",
        content: "로그인에 성공하였습니다.",
      });
    } catch (error) {
      Modal.error({ title: "로그인 실패", content: "다시 시도해주세요." });
    }
  };

  function resetFormData() {
    setInputs({
      email: "",
      password: "",
    });
  }

  const onClickMoveToSignup = () => {
    router.push(`/signup`);
  };

  return {
    onChangeInputs,
    isValid,
    onClickLogin,
    onClickMoveToSignup,
  };
};
