"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./style.module.css";
import { gql, useQuery } from "@apollo/client";
import { useAccessTokenStore } from "@/commons/stores/access-token-store";

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      _id
      email
      name
      picture
    }
  }
`;

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [isProfileHovered, setIsProfileHovered] = useState(false); // 프로필 호버 상태
  const router = useRouter();

  const { accessToken, setAccessToken } = useAccessTokenStore();

  useEffect(() => {
    // 클라이언트에서만 실행되므로 서버 렌더링 시 오류를 방지합니다.
    setAccessToken(localStorage.getItem("accessToken"));
  }, []);

  const { data } = useQuery(FETCH_USER_LOGGED_IN, {
    skip: !accessToken,
  });

  useEffect(() => {
    if (data?.fetchUserLoggedIn) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [data]);

  const menuClick = () => {
    router.push("/boards");
  };

  const mypageClick = () => {
    router.push("/boards/mypage");
  };

  const loginClick = () => {
    router.push("/login");
  };

  const logoutClick = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  const storeClick = () => {
    router.push("/store");
  };

  const userInfo = data?.fetchUserLoggedIn;

  return (
    <div className={styles.Container}>
      <div className={styles.menuContainer}>
        <div className={styles.menu} onClick={menuClick}>
          Co chokchok
        </div>
        <div className={styles.list}>Trip Talk!</div>
        <div className={styles.list} onClick={storeClick}>
          숙박권 구매
        </div>

        {isLoggedIn ? (
          <div
            className={styles.profileContainer}
            onMouseEnter={() => setIsProfileHovered(true)}
            onMouseLeave={() => setIsProfileHovered(false)}
          >
            <Image
              src={
                userInfo?.picture
                  ? `https://storage.googleapis.com/${userInfo.picture}`
                  : "/image/noProfile.webp"
              } // 유저 프로필 사진
              alt="Profile"
              className={styles.profileIcon}
              width={50}
              height={50}
              priority
            />
            {isProfileHovered && (
              <div className={styles.profilePopup}>
                <p>{userInfo?.name}</p>
                <p>{userInfo?.email}</p>
                <div className={styles.mypage} onClick={mypageClick}>
                  마이페이지
                </div>
                <div className={styles.logout} onClick={logoutClick}>
                  로그아웃
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.list} onClick={loginClick}>
            로그인
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
