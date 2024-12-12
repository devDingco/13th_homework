"use client";
import styles from "./styles.module.css";

import { ISchema, schema } from "./form.schema";
import { useInitialize } from "./form.initialize";
import Form from "@/components/commons/form";
import { ButtonPrimaryMFull } from "@/components/commons/button";
import { InputSignup } from "@/components/commons/input";

export default function Login() {
  return (
    <main className={styles.container}>
      <div className={styles.title}>
        <div className={styles.titleText}>로그인</div>
      </div>
      <Form<ISchema> schema={schema} useInitialize={useInitialize}>
        <div className={styles.form}>
          <InputSignup<ISchema>
            label="이메일"
            name="email"
            placeholder="이메일을 입력해 주세요."
          />
          <InputSignup<ISchema>
            label="비밀번호"
            type="password"
            name="password"
            placeholder="비밀번호를 입력해 주세요."
          />
        </div>
        <div className={styles.loginButtonContainer}>
          <ButtonPrimaryMFull>로그인</ButtonPrimaryMFull>
        </div>
      </Form>
    </main>
  );
}
