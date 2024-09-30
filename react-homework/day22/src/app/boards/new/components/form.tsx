"use client";

import { useState, ChangeEvent } from "react";
import styles from "../styles.module.css";
import { IInputs, IErrors } from "../../types/states";
import { CREATE_BOARD } from "../../types/api";

import InputGroup from "./inputGroup";
import AddressGroup from "./address";
import ContentGroup from "./content";
import UploadFile from "./upload";

import { useMutation } from "@apollo/client";
import Button from "@/commons/components/button";

const Form = () => {
  // input state
  const [inputs, setInputs] = useState<IInputs>({
    writer: "",
    password: "",
    title: "",
    content: "",
  });
  // error state
  const [errors, setErrors] = useState<IErrors>({});
  // 등록하기버튼 비활성화
  const [isDisabled, setIsDisabled] = useState(true);
  // graphql
  const [uploadInput] = useMutation(CREATE_BOARD);

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

  // graphql state 전달
  const boardSubmit = async () => {
    // graphql 요청
    const result = await uploadInput({
      variables: {
        createBoardInput: {
          writer: inputs.writer,
          password: inputs.password,
          title: inputs.title,
          contents: inputs.content,
        },
      },
    });
    console.log(result);
  };

  const onClickSubmit = () => {
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
      boardSubmit();
      alert("게시글을 등록하였습니다😊");

      setInputs({ writer: "", password: "", title: "", content: "" });
    }
  };

  return (
    <div className={styles.post_main}>
      <div className={styles.writer_box}>
        {/* 작성자 입력 필드 */}
        <InputGroup
          label={"작성자"}
          name={"writer"}
          value={inputs.writer}
          onChange={onChangeInput}
          placeholder={"작성자 명을 입력하세요"}
          error={errors.writer}
        />

        {/* 비밀번호 입력 필드 */}
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
      {/* 제목 입력 필드 */}
      <InputGroup
        label={"제목"}
        name={"title"}
        value={inputs.title}
        onChange={onChangeInput}
        placeholder={"제목을 입력하세요"}
        error={errors.title}
      />
      <hr />
      {/* 내용 입력 필드 */}
      <ContentGroup
        onChange={onChangeInput}
        value={inputs.content}
        error={errors.content}
      />
      {/* 주소 입력 필드 */}
      <AddressGroup />
      <hr />
      {/* 유튜브링크 입력 필드 */}
      <InputGroup
        label={"유튜브 링크"}
        placeholder={"링크를 입력해 주세요."}
        isRequired={false}
      />
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
        <Button variant="cancel">취소</Button>
        <Button
          onClick={onClickSubmit}
          variant={isDisabled ? "disabled" : "blue_active"}
          disabled={isDisabled}
        >
          등록하기
        </Button>
      </div>
    </div>
  );
};

export default Form;
