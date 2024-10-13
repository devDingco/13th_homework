import styles from "./styles.module.css";
import React from "react";
import CONSTANTS_DESCRIPTION from "@/commons/constants/description";
import CONSTANTS_TITLE from "@/commons/constants/title";
import { useBoardWrite } from "../../../hook";
import Modal from "antd/es/modal/Modal";
import DaumPostcodeEmbed from "react-daum-postcode";
import useAddressInputForm from "./hook";

export const AddressInputForm = () => {
  const { isAddressModalOpen, showAddressSearchModal } = useBoardWrite();
  const { zipcode, address, selectAddressHandler, onChangeAddressDetail } =
    useAddressInputForm();

  return (
    <div className={styles.AddressFormContainer}>
      <div className={styles.inputFormTitle}>{CONSTANTS_TITLE.ADDRESS}</div>
      <div className={styles.zipCodeContainer}>
        <input
          type="text"
          className={styles.inputFormText}
          placeholder={CONSTANTS_DESCRIPTION.ZIP_CODE}
          value={zipcode}
        />
        <button
          className={styles.zipCodeSearchButton}
          onClick={showAddressSearchModal}
        >
          우편번호 검색
        </button>
        {/* {isOpen && ( */}
        <Modal
          open={isAddressModalOpen}
          onOk={showAddressSearchModal}
          onCancel={showAddressSearchModal}
        >
          <div>우편 번호 찾기</div>
          <DaumPostcodeEmbed onComplete={selectAddressHandler} />
        </Modal>
      </div>
      <input
        type="text"
        className={styles.inputFormText}
        placeholder={CONSTANTS_DESCRIPTION.ADDRESS}
        value={address}
      />
      <input
        type="text"
        className={styles.inputFormText}
        onChange={onChangeAddressDetail}
        placeholder={CONSTANTS_DESCRIPTION.ADDRESS_DETAIL}
      />
    </div>
  );
};
