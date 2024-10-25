import { DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/ko_KR";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useEffect } from "react";
import { CollectionList } from "@/commons/apis/firebase";
import styles from "./styles.module.css";
import useMyPlanWrite from "./hook";
import { DocumentData } from "firebase/firestore";

interface IMyPlanWriteProps {
  isEdit: boolean;
  data?: DocumentData;
}

export default function MyPlanWrite({ isEdit, data }: IMyPlanWriteProps) {
  const pageTitle = isEdit ? "수정" : "등록";
  const { RangePicker } = DatePicker;
  dayjs.locale("ko");

  const {
    isActive,
    initDocumentIndex,
    onClickCreate,
    onClickCancel,
    onChangeInput,
    onChangeDate,
  } = useMyPlanWrite();

  useEffect(() => {
    if (!isEdit) initDocumentIndex(CollectionList.plan);
  }, []);

  return (
    <div className={styles.planWriteContainer}>
      <h3 className={styles.header}>{pageTitle} 등록</h3>
      <div className={styles.inputFormContainer}>
        <div className={styles.inputForm}>
          일정명
          <input type="text" name="title" onChange={onChangeInput} />
        </div>
        <div className={styles.dateForm}>
          여행 일자
          <RangePicker
            className={styles.datePicker}
            locale={locale}
            onChange={onChangeDate}
          />
        </div>
        <div className={styles.inputForm}>
          동행자
          <input type="text" name="companions" onChange={onChangeInput} />
        </div>
        <div className={styles.locationContainer}>
          <div className={styles.inputForm}>
            출발지
            <input
              type="text"
              name="departureLocation"
              onChange={onChangeInput}
            />
          </div>
          <div className={styles.inputForm}>
            목적지
            <input type="text" name="destination" onChange={onChangeInput} />
          </div>
        </div>
        <div className={styles.inputForm}>타임라인</div>
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.button} ${styles.cancelButton}`}
          onClick={onClickCancel}
        >
          취소
        </button>
        <button
          className={
            isActive
              ? `${styles.button} ${styles.submitButton_enable}`
              : styles.button
          }
          onClick={onClickCreate}
          disabled={isActive ? false : true}
        >
          {pageTitle}
        </button>
      </div>
    </div>
  );
}
