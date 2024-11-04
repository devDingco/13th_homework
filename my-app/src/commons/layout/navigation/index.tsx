"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";

const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
    }
  }
`;

export default function LayoutNavigation() {
  const router = useRouter();

  const { data } = useQuery(FETCH_USER_LOGGED_IN);

  const [selected, setSElected] = useState(""); // nav에서 선택한 항목을 선택함

  const handleClick = (item) => {
    setSElected(item);
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인 후 이용 가능합니다!");
      router.push("/authentication/login");
    }
  }, []);

  return (
    <>
      <main className={styles.main}>
        <div className={styles.navLeft}>
          <Link href="/boards">
            <div
              className={styles.logoSection}
              onClick={() => handleClick("트립토크")} // 로고 클릭 시 "트립토크" 선택
            >
              <Image
                src="/images/logo.png"
                alt="페이지 로고"
                className={styles.logoIcon}
                width={0}
                height={0}
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
          <div>{data?.fetchUserLoggedIn.name}님 오늘도 좋은 하루 되세요!</div>

          {/* 로그인 안된다면?  이 화면*/}
          <div className={styles.loginBtnSection}>
            <Link href="/authentication/login">
              <button className={styles.loginBtn}>
                로그인
                <RightOutlined />
              </button>
            </Link>
          </div>

          {/* 나중에 로그아웃도 구현해주기 */}
          {/* <div className={styles.loginBtnSection}>
            <Link href="/authentication/login">
              <button className={styles.loginBtn}>로그아웃</button>
            </Link>
          </div> */}

          {/* 로그인 된다면 이 화면 
           <div>
            <Image
              src="/images/profile1.png"
              alt="프로필 아이콘"
              className={styles.profileIcon}
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
          <div>
            <Image
              src="/images/down_arrow.png"
              alt="아래화살표"
              className={styles.downArrow}
              width={0}
              height={0}
              sizes="100vw"
            />
          </div> */}
        </div>
      </main>
    </>
  );
}
