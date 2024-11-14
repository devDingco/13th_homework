"use client";
// TODO 리프레시토큰할때 여기보셈2
import Image from "next/image";
import styles from "./styles.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import { gql, useApolloClient, useLazyQuery, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { withAuth } from "@/commons/hocs/withAuth";

const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
    }
  }
`;

function LayoutNavigation() {
  const router = useRouter();
  const { data } = useQuery(FETCH_USER_LOGGED_IN);
  const [selected, setSelected] = useState(""); // nav에서 선택한 항목을 선택함

  const handleClick = (item) => {
    setSelected(item); // 이 부분의 세미콜론 문제 확인
  };

  return (
    <>
      <main className={styles.main}>
        <div className={styles.navLeft}>
          <Link href="/boards">
            <div
              className={styles.logoSection}
              onClick={() => handleClick("트립토크")}
            >
              <Image
                src="/images/logo.png"
                alt="페이지 로고"
                className={styles.logoIcon}
                width={100} // 적절한 width와 height 값 지정
                height={100}
                sizes="100vw"
              />
            </div>
          </Link>

          <div className={styles.navBar}>
            <Link href="/boards">
              <div
                className={`${styles.navContents} ${
                  selected === "트립토크" ? styles.navChoice : ""
                }`}
                onClick={() => handleClick("트립토크")}
              >
                트립토크
              </div>
            </Link>
            <Link href="/purchase">
              <div
                className={`${styles.navContents} ${
                  selected === "숙박권구매" ? styles.navChoice : ""
                }`}
                onClick={() => handleClick("숙박권구매")}
              >
                숙박권구매
              </div>
            </Link>
            <Link href="/mypage">
              <div
                className={`${styles.navContents} ${
                  selected === "마이페이지" ? styles.navChoice : ""
                }`}
                onClick={() => handleClick("마이페이지")}
              >
                마이페이지
              </div>
            </Link>
          </div>
        </div>
        <div className={styles.navRight}>
          <div>{data?.fetchUserLoggedIn?.name}님 오늘도 좋은 하루 되세요!</div>

          <div className={styles.loginBtnSection}>
            <Link href="/authentication/login">
              <button className={styles.loginBtn}>
                로그인
                <RightOutlined />
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default withAuth(LayoutNavigation);
