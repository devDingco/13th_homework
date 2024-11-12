"use client";

import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { ResetUserPasswordDocument } from "@/commons/graphql/graphql";

export const usePasswordChange = () => {
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isActive, setIsActive] = useState(false);

  const [resetUserPassword] = useMutation(ResetUserPasswordDocument);

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangePasswordCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(event.target.value);
  };

  function resetFormData() {
    setPassword("");
    setPasswordCheck("");
  }

  useEffect(() => {
    if (!!password.trim() && !!passwordCheck.trim()) {
      setIsActive(true);
    }
  });

  const onClickChangePassword = async () => {
    if (!password.trim() || !passwordCheck.trim()) {
      Modal.error({
        content: "비밀번호를 입력해 주세요.",
      });
    } else if (password !== passwordCheck) {
      Modal.error({
        content: "비밀번호가 일치하지 않습니다.",
      });
      return;
    }

    try {
      const result = await resetUserPassword({
        variables: {
          password: password,
        },
      });
      resetFormData();
      Modal.success({
        title: "비밀번호 변경 완료",
        content: "비밀번호가 변경 되었습니다.",
      });
      console.log(result);
    } catch (error) {
      console.log("🚀 ~ registButton ~ error:", error);
      Modal.error({ content: "에러가 발생하였습니다. 다시 시도해주세요." });
    }
  };

  return {
    onChangePassword,
    onChangePasswordCheck,
    onClickChangePassword,
    isActive,
  };
};
