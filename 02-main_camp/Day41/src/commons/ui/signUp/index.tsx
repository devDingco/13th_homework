"use client";

import { InputForm } from "@/app/_components/commons/input";
import React from "react";
import styles from "./styles.module.css";
import { ISignUpSchema, signUpSchema } from "../login/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CreateUserDocument } from "@/commons/gql/graphql";

interface ISignUpProps {
  handleCancel?: () => void;
  completionHandler: () => void;
}

export default function SignUp({
  handleCancel,
  completionHandler,
}: ISignUpProps) {
  const [createUser] = useMutation(CreateUserDocument);

  const methods = useForm<ISignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const onClickSignUp = async (data: ISignUpSchema) => {
    console.log("회원가입 버튼을 눌렀습니다.");
    try {
      const result = await createUser({
        variables: {
          createUserInput: {
            email: data.email,
            password: data.password,
            name: data.name,
          },
        },
      });
      console.log(result.data?.createUser);
      alert("회원가입이 완료되었습니다.");
      completionHandler();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className={styles.signUp__container}>
        <span className={styles.title}>회원가입</span>
        <div className={styles.inputForm__container__wrap}>
          <span>회원가입을 위해 아래 빈칸을 모두 채워 주세요.</span>
          <div className={styles.inputForm__container}>
            <InputForm
              keyName="email"
              isRequired={true}
              isHiddenHeader={false}
              label="이메일"
              type="text"
              placeholder="이메일을 입력해 주세요."
            />
            <InputForm
              keyName="name"
              isRequired={true}
              isHiddenHeader={false}
              label="이름"
              type="text"
              placeholder="이름을 입력해 주세요."
            />
            <InputForm
              keyName="password"
              isRequired={true}
              isHiddenHeader={false}
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해 주세요."
            />
            <InputForm
              keyName="checkPassword"
              isRequired={true}
              isHiddenHeader={false}
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호를 한번 더 입력해 주세요."
            />
          </div>
        </div>
        <div className={styles.buttons__container}>
          <button
            className={styles.button__signUp}
            onClick={methods.handleSubmit(onClickSignUp)}
          >
            회원가입
          </button>
          <button className={styles.button__cancel} onClick={handleCancel}>
            취소
          </button>
        </div>
      </div>
    </FormProvider>
  );
}
