import Link from "next/link";

import styles from "./styles.module.css";

const Aaa = () => {
  return (
    <>
      <div>Aaa 페이지 입니다.</div>
      <span className={styles.greenFont}>초록색으로 나와야합니다.</span>
      <span className={styles.redFont}>빨간색으로 나와야합니다.</span>
      <span className={styles.grayFont}>회색으로 나와야합니다.</span>

      {/* 1. 리액트의 이동방식: 현재페이지에서 JS로 태그만 바꿔치기 => SPA */}
      <Link href="/se4/bbb">Bbb 페이지로 가는 기능 - 신버전</Link>

      {/* 2. 고전HTML 이동방식: html페이지 새로접속함(느림) => MPA */}
      <a href="/se4/bbb">Bbb 페이지 이동 </a>
    </>
  );
};

export default Aaa;
