"use client";

import React from "react";
import styles from "./styles.module.css";
import { InputForm } from "@/app/_components/commons/input";

export default function AddressInputForm() {
  return (
    <div className={styles.AddressFormContainer}>
      <InputForm label="주소" type="text" placeholder="01234" isRequired={true}>
        <button className={styles.search__zip__code__button}>
          우편번호 검색
        </button>
      </InputForm>
      <InputForm
        type="text"
        placeholder="상세 주소를 입력해주세요."
        isHiddenHeader={true}
      ></InputForm>
    </div>
  );
}
