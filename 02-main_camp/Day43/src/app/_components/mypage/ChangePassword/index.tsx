import React from "react";
import { InputForm } from "../../commons/input";
import styles from "./styles.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { IChangePasswordSchema } from "@/app/_schema/passwordSchema";
import { Button, ButtonSize, ButtonVariant } from "@/commons/ui/button";

export default function ChangePassword() {
  const methods = useForm<IChangePasswordSchema>();

  return (
    <FormProvider {...methods}>
      <div className={styles.changePasswordContainer}>
        <span className={styles.headerContainer}>비밀번호 변경</span>
        <InputForm
          keyName="password"
          label="새 비밀번호"
          placeholder="새 비밀번호를 입력해 주세요."
          type="password"
        ></InputForm>
        <InputForm
          keyName="checkPassword"
          label="새 비밀번호 확인"
          placeholder="새 비밀번호를 확인해 주세요."
          type="password"
        ></InputForm>
        <Button
          size={ButtonSize.large}
          variant={ButtonVariant.primary}
          label="비밀번호 변경"
        ></Button>
      </div>
    </FormProvider>
  );
}
