"use client";
import Information from "@/components/mypage/information";
import styles from "./styles.module.css";
import Link from "next/link";

export default function mypage() {
  return (
    <>
      <div className={styles.mypageSection}>
        <div className={styles.title}>마이페이지</div>
        <Information />

        <br />
        <br />
        <Link href="/mypage/transactionHistory">거래내역</Link>
        <br />
        <Link href="/mypage/pointHistory">포인트 내역</Link>
        <br />
        <Link href="/mypage/changePassword">비번 변경</Link>
      </div>
    </>
  );
}

// mypage안에 자식폴더 만들고 내정보까지는 여기에 그리고
// 거래내역, 포인트, 비밀번호 클릭하면 그 폴더로 이동하는게 지금보다 좋아보임
// 내일 이 부분 다시 공사하기
