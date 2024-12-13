"use client";
import styles from "./styles.module.css";

import { ISchema, schema } from "./form.schema";
import { useInitialize } from "./form.initialize";
import Footer from "@/commons/layout/footer";
import Form from "@/components/commons/form";
import { Modal } from "antd";
import Image from "next/image";
import { ButtonPrimaryMFull } from "@/components/commons/button";
import { InputSignup } from "@/components/commons/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const onClickToLogin = () => {
    setModalOpen(false);
    router.push("/login");
  };
  return (
    <main className={styles.container}>
      <div className={styles.title}>
        <div className={styles.titleText}>회원가입</div>
        <div className={styles.titleDescription}>
          회원가입을 위해 필요한 정보를 모두 입력해 주세요.
        </div>
      </div>
      <Form<ISchema>
        schema={schema}
        useInitialize={(methods) => useInitialize(methods, setModalOpen)}
      >
        <div className={styles.form}>
          <InputSignup<ISchema>
            label="이메일"
            name="email"
            placeholder="이메일을 입력해 주세요."
          />
          <InputSignup<ISchema>
            label="이름"
            name="name"
            placeholder="이름을 입력해 주세요."
          />
          <InputSignup<ISchema>
            label="비밀번호"
            type="password"
            name="password"
            placeholder="비밀번호를 입력해 주세요."
          />
          <InputSignup<ISchema>
            label="비밀번호 확인"
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호를 한번 더 입력해 주세요."
          />
        </div>
        <div className={styles.signupButtonContainer}>
          <ButtonPrimaryMFull>가입하기</ButtonPrimaryMFull>
        </div>
      </Form>
      <Modal
        className={styles.modalContainer}
        closable={false}
        centered
        open={modalOpen}
        footer={null}
      >
        <div className={styles.modal}>
          <div className={styles.contents}>
            <p>회원가입을 축하 드려요.</p>
            <Image
              className={styles.logo}
              src="/images/logo.svg"
              width={0}
              height={0}
              alt="logo"
            />
          </div>
          <div className={styles.buttonContainer}>
            <ButtonPrimaryMFull onClick={onClickToLogin} type="button">
              로그인하기
            </ButtonPrimaryMFull>
          </div>
        </div>
      </Modal>
    </main>
  );
}
