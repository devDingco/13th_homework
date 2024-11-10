"use client";

import React from "react";
import styles from "./styles.module.css";
import { InputForm } from "@/app/_components/commons/input";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { Modal } from "antd";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";

interface IAddressInputFormProps<T extends FieldValues> {
  zipcodeKey: Path<T>;
  addressKey: Path<T>;
  addressDetailKey: Path<T>;
  isOpen: boolean;
  onClickSearchZipcode: () => void;
  handleOk: () => void;
  handleCancel: () => void;
  handleZipcodeSelect: (data: Address) => void;
}

export default function AddressInputForm<T extends FieldValues>({
  zipcodeKey,
  addressKey,
  addressDetailKey,
  isOpen,
  onClickSearchZipcode,
  handleOk,
  handleCancel,
  handleZipcodeSelect,
}: IAddressInputFormProps<T>) {
  return (
    <>
      {isOpen && (
        <Modal open={isOpen} onOk={handleOk} onCancel={handleCancel}>
          <DaumPostcodeEmbed onComplete={handleZipcodeSelect} />
        </Modal>
      )}

      <div className={styles.AddressFormContainer}>
        <InputForm<T>
          keyName={zipcodeKey}
          label="주소"
          type="text"
          placeholder="01234"
          isRequired={true}
        >
          <button
            className={styles.search__zip__code__button}
            onClick={onClickSearchZipcode}
          >
            우편번호 검색
          </button>
        </InputForm>
        <InputForm<T>
          keyName={addressDetailKey}
          type="text"
          placeholder="상세 주소를 입력해주세요."
          isHiddenHeader={true}
        ></InputForm>
      </div>
    </>
  );
}
