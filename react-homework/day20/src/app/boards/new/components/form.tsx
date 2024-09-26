"use client";

import { useState } from "react";
import { ChangeEvent } from "react";
import styles from "../styles.module.css";
import InputGroup from "./inputGroup";
import AddressGroup from "./address";
import ContentGroup from "./content";
import UploadFile from "./upload";

// input state 타입정의
interface IInputs {
  user: string;
  password: string;
  title: string;
  content: string;
}
// error state 타입정의
interface IErrors {
  user?: string;
  password?: string;
  title?: string;
  content?: string;
}

const Form = () => {
  // input state
  const [inputs, setInputs] = useState<IInputs>({
    user: "",
    password: "",
    title: "",
    content: "",
  });
  // error state
  const [errors, setErrors] = useState<IErrors>({});
  // 등록하기버튼 비활성화
  const [isDisabled, setIsDisabled] = useState(true);

  const onChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newInputs = {
      ...inputs,
      [event.target.name]: event.target.value,
    };
    setInputs(newInputs);

    // input state들의 값이 모두 빈 문자열이 아니면
    const allInputFilled = Object.values(newInputs).every(
      (input) => input !== ""
    );
    setIsDisabled(!allInputFilled);
  };

  const onClickBtn = () => {
    // 에러 담을 객체
    const newErrors: IErrors = {};

    Object.keys(inputs).forEach((key) => {
      const inputKey = key as keyof IInputs;
      // 각 input state가 빈 문자열이면 newErrors에 넣어주기
      if (!inputs[inputKey]) {
        newErrors[inputKey] = "필수입력 사항 입니다.";
      }
    });

    // input중에 하나라도 입력 안되어있으면 error state에 newErrors 넣어주기
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
    } else {
      setErrors({});
      alert("등록이 가능한 상태입니다!");
      setInputs({ user: "", password: "", title: "", content: "" });
    }
  };

  return (
    <div className={styles.post_main}>
      <div className={styles.user_box}>
        <InputGroup
          label={"작성자"}
          name={"user"}
          value={inputs.user}
          onChange={onChangeInput}
          placeholder={"작성자 명을 입력하세요"}
          error={errors.user}
        />

        <InputGroup
          label={"비밀번호"}
          type="password"
          name={"password"}
          value={inputs.password}
          onChange={onChangeInput}
          placeholder={"비밀번호를 입력하세요"}
          error={errors.password}
        />
      </div>
      <hr />
      <InputGroup
        label={"제목"}
        name={"title"}
        value={inputs.title}
        onChange={onChangeInput}
        placeholder={"제목을 입력하세요"}
        error={errors.title}
      />
      <hr />
      <ContentGroup
        onChange={onChangeInput}
        value={inputs.content}
        error={errors.content}
      />
      {/* 주소입력 필드 */}
      <AddressGroup />
      <hr />
      <InputGroup label={"유튜브 링크"} placeholder={"링크를 입력해 주세요."} />
      <hr />
      <div className={styles.input_group}>
        <label className={styles.input_label}>사진 첨부</label>
        <div className={styles.upload_group}>
          <UploadFile />
          <UploadFile />
          <UploadFile />
        </div>
      </div>

      <div className={styles.btn_group}>
        <button className={styles.btn_cancel}>취소</button>
        <button
          onClick={onClickBtn}
          type="submit"
          className={
            isDisabled
              ? styles.btn_register_disabled
              : styles.btn_register_active
          }
          disabled={isDisabled}
        >
          등록하기
        </button>
      </div>
    </div>
  );
};

export default Form;
