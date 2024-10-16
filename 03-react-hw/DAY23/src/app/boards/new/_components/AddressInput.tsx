import styles from "../boardNew.module.css";
import { AddressInputProps } from "@/types/board";
import React from "react";

const AddressInput: React.FC<AddressInputProps> = ({
  zipcode,
  address,
  addressDetail,
  onZipCodeChange,
  onAddressChange,
  onAddressDetailChange,
  onSearchClick,
}) => {
  return (
    <div className={styles.구분상자}>
      <span>주소</span>
      {/* 우편번호 입력 및 검색 버튼 */}
      <div className={styles.우편번호검색상자}>
        <input
          type="text"
          value={zipcode}
          onChange={onZipCodeChange}
          placeholder="01234"
          className={styles.작은입력창크기}
        />
        <button onClick={onSearchClick}>우편번호 검색</button>
      </div>
      {/* 주소 입력 */}
      <input
        type="text"
        value={address}
        onChange={onAddressChange}
        placeholder="주소를 입력해 주세요."
        className={styles.긴입력창크기}
      />
      {/* 상세주소 입력 */}
      <input
        type="text"
        value={addressDetail}
        onChange={onAddressDetailChange}
        placeholder="상세주소"
        className={styles.긴입력창크기}
      />
    </div>
  );
};

export default AddressInput;
