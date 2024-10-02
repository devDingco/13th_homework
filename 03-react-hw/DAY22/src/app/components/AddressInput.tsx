import React, { ChangeEvent } from "react";
import styles from "../boards/new/styles.module.css";

interface AddressInputProps {
  zipCode: string; // 우편번호
  address: string; // 주소
  detailAddress: string; // 상세주소
  onZipCodeChange: (event: ChangeEvent<HTMLInputElement>) => void; // 우편번호 변경
  onAddressChange: (event: ChangeEvent<HTMLInputElement>) => void; // 주소 변경
  onDetailAddressChange: (event: ChangeEvent<HTMLInputElement>) => void; // 상세주소
  onSearchClick: () => void; // 우편번호 검색 버튼
}

const AddressInput: React.FC<AddressInputProps> = ({
  zipCode,
  address,
  detailAddress,
  onZipCodeChange,
  onAddressChange,
  onDetailAddressChange,
  onSearchClick,
}) => {
  return (
    <div className={styles.구분상자}>
      <span>주소</span>
      {/* 우편번호 입력 및 검색 버튼 */}
      <div className={styles.우편번호검색상자}>
        <input
          type="text"
          value={zipCode}
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
        value={detailAddress}
        onChange={onDetailAddressChange}
        placeholder="상세주소"
        className={styles.긴입력창크기}
      />
    </div>
  );
};

export default AddressInput;
