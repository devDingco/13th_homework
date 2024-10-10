import styles from "./styles.module.css";
import CONSTANTS_DESCRIPTION from "@/commons/constants/description";
import CONSTANTS_TITLE from "@/commons/constants/title";

export const AddressInputForm = () => {
  return (
    <div className={styles.AddressFormContainer}>
      <div className={styles.inputFormTitle}>{CONSTANTS_TITLE.ADDRESS}</div>
      <div className={styles.zipCodeContainer}>
        <input
          type="text"
          className={styles.inputFormText}
          placeholder={CONSTANTS_DESCRIPTION.ZIP_CODE}
        />
        <button className={styles.zipCodeSearchButton}>우편번호 검색</button>
      </div>
      <input
        type="text"
        className={styles.inputFormText}
        placeholder={CONSTANTS_DESCRIPTION.ADDRESS}
      />
      <input
        type="text"
        className={styles.inputFormText}
        placeholder={CONSTANTS_DESCRIPTION.ADDRESS_DETAIL}
      />
    </div>
  );
};
