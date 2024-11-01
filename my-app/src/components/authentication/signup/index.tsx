// 회원가입 컴포넌트

"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CREATE_USER = gql`
  mutation createUserInput(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(
      createUserInput: { email: $email, name: $name, password: $password }
    ) {
      _id
      email
      name
    }
  }
`;

export default function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [createUser] = useMutation(CREATE_USER);

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onClickSignup = async () => {
    // 입력 필드가 모두 채워졌는지 확인
    if (!email || !name || !password) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    const result = await createUser({
      variables: {
        email,
        name,
        password,
      },
    });

    console.log(result);
    alert("회원가입을 축하합니다.");
    router.push("/authentication/login");
  };

  return (
    <>
      <main className={styles.main}>
        <div className={styles.signupSection}>
          <div className={styles.title}>회원가입</div>
          <div className={styles.subTitle}>
            회원가입을 위해 아래 빈칸을 모두 채워 주세요.
          </div>
          <div className={styles.inputArea}>
            <div className={styles.inputSection}>
              <span className={styles.inputText}>
                이메일<span className={styles.inputStar}>*</span>
              </span>
              <input
                onChange={onChangeEmail}
                className={styles.input}
                type="text"
                placeholder="이메일을 입력해 주세요."
              />
            </div>
            <div className={styles.inputSection}>
              <span className={styles.inputText}>
                이름<span className={styles.inputStar}>*</span>
              </span>
              <input
                onChange={onChangeName}
                className={styles.input}
                type="text"
                placeholder="이름을 입력해 주세요."
              />
            </div>
            <div className={styles.inputSection}>
              <span className={styles.inputText}>
                비밀번호<span className={styles.inputStar}>*</span>
              </span>
              <input
                onChange={onChangePassword}
                className={styles.input}
                type="text"
                placeholder="비밀번호를 입력해 주세요."
              />
            </div>
            <div className={styles.inputSection}>
              <span className={styles.inputText}>
                비밀번호 확인<span className={styles.inputStar}>*</span>
              </span>
              <input
                className={styles.input}
                type="text"
                placeholder="비밀번호를 한번 더 입력해 주세요."
              />
            </div>
            <button onClick={onClickSignup} className={styles.signupBtn}>
              회원가입
            </button>
          </div>
        </div>

        <div className={styles.signupImage}>
          <Image
            className={styles.image}
            src="/signup/signupImg.jpeg"
            alt="회원가입 배경사진"
            width={1000}
            height={0}
          />
        </div>
      </main>
    </>
  );
}
