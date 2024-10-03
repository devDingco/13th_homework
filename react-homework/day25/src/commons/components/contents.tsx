import React from "react";
import styles from "./styles.module.css";
import ErrorMsg from "./error";
import { IContentsGroup } from "../../types/components";

const ContentsGroup: React.FC<IContentsGroup> = ({
  onChange,
  defaultValue,
  error,
}) => {
  return (
    <div className={styles.input_group}>
      <div className={styles.input_label}>
        내용<span className={styles.require}> *</span>
      </div>
      <textarea
        className={styles.content_input_box}
        name="contents"
        placeholder="내용을 입력해 주세요."
        onChange={onChange}
        defaultValue={defaultValue}
      ></textarea>
      {error && <ErrorMsg errorMessage={error} />}
    </div>
  );
};

export default ContentsGroup;
