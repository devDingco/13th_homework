"use client";

import React from "react";
import { DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/ko_KR";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import styles from "./styles.module.css";

export default function PlanNewPage() {
  const { RangePicker } = DatePicker;
  dayjs.locale("ko");
  return (
    <div className={styles.planWriteContainer}>
      <h3 className={styles.header}>일정 등록</h3>
      <div className={styles.inputFormContainer}>
        <div className={styles.inputForm}>
          계획명
          <input type="text" />
        </div>
        <div className={styles.inputForm}>
          날짜
          <RangePicker className={styles.datePicker} locale={locale} />
        </div>
        <div className={styles.inputForm}>
          동반자
          <input type="text" />
        </div>
        <div className={styles.inputForm}>
          목적지
          <input type="text" />
        </div>
        <div className={styles.inputForm}>타임라인</div>
      </div>
    </div>
  );
}
