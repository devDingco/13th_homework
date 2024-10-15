import styles from "./styles.module.css";

const AddressInput = () => {
  return (
    <>
      <div className={styles.search_group_zip_code}>
        <input
          type="text"
          className={styles.input_box_zip_code}
          placeholder="01234"
        />
        <button className={styles.btn_search_zip_code}>우편번호 검색</button>
      </div>
      <input
        type="text"
        className={styles.input_box}
        placeholder="주소를 입력해 주세요."
      />
      <input type="text" className={styles.input_box} placeholder="상세주소" />
    </>
  );
};

export default AddressInput;
