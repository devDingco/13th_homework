"use client";

import React, { ChangeEvent, useState } from "react";
import { DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/ko_KR";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ko";
import styles from "./styles.module.css";
import FirebaseAPI, { CollectionList } from "@/commons/apis/firebase";

export default function PlanNewPage() {
  const { RangePicker } = DatePicker;
  dayjs.locale("ko");

  const [plan, setPlan] = useState({
    title: "",
    startDate: "",
    endDate: "",
    companions: [],
    departureLocation: "",
    destination: "",
    timeline: [],
  });
  const { createDocument } = FirebaseAPI();

  const onClickCreate = () => {
    createDocument(CollectionList.plan, plan);
  };

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const tagName = event.currentTarget.name;
    setPlan((prev) => {
      return {
        ...prev,
        [tagName]: value,
      };
    });
    console.log(value);
  };

  const onChangeDate = (
    dates: [Dayjs | null, Dayjs | null] | null,
    datesString: [string, string]
  ) => {
    setPlan((prev) => {
      return {
        ...prev,
        startDate: datesString[0],
        endDate: datesString[1],
      };
    });
  };

  return (
    <div className={styles.planWriteContainer}>
      <h3 className={styles.header}>일정 등록</h3>
      <div className={styles.inputFormContainer}>
        <div className={styles.inputForm}>
          일정명
          <input type="text" name="title" onChange={onChangeInput} />
        </div>
        <div className={styles.inputForm}>
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
        <div className={styles.inputForm}>타임라인</div>
      </div>
      <button onClick={onClickCreate}>등록하기</button>
    </div>
  );
}
