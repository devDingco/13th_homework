"use client";

import useNavigetionLayout from "./hook";
import styles from "./styles.module.css";

export default function LayoutNavigation() {
  const { onClickLogo, onClickTripBoards } = useNavigetionLayout();
  return (
    <div className={styles.navigation}>
      <span onClick={onClickLogo}>Logo</span>
      <span onClick={onClickTripBoards}>트립토크</span>
      <span>예약하기</span>
      <span>마이페이지</span>
    </div>
  );
}
