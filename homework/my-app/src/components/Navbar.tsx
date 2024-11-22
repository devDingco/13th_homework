"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./style.module.css";
import { gql, useQuery } from "@apollo/client";
import { useAccessTokenStore } from "@/commons/stores/access-token-store";
import PointModal from "./point-modal";
import { useUserStore } from "@/commons/stores/useUserStore";

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      _id
      email
      name
      picture
      userPoint {
        _id
        amount
      }
    }
  }
`;

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [isPointModalOpen, setPointModalOpen] = useState(false); // 모달 상태 관리
  const router = useRouter();
  const { useData } = useQuery(FETCH_USER_LOGGED_IN);

  const { accessToken, setAccessToken } = useAccessTokenStore();

  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken"));
  }, []);

  const { data } = useQuery(FETCH_USER_LOGGED_IN, {
    skip: !accessToken,
  });
  console.log("data", data);

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
    router.push(`/mypage`);
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
              }
              alt="Profile"
              className={styles.profileIcon}
              width={50}
              height={50}
              priority
            />
            {isProfileHovered && (
              <div className={styles.profilePopup}>
                <p>{userInfo?._id}</p>
                <p>{userInfo?.name}</p>
                <p>{userInfo?.email}</p>
                <p>{userInfo?.userPoint.amount ?? 0}</p>
                <div className={styles.mypage} onClick={mypageClick}>
                  마이페이지
                </div>
                <div
                  className={styles.mypage}
                  onClick={() => setPointModalOpen(true)} // 모달 열기
                >
                  포인트 충전
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

      {/* PointModal 컴포넌트 */}
      <PointModal
        isOpen={isPointModalOpen}
        onClose={() => setPointModalOpen(false)} // 모달 닫기
      />
    </div>
  );
};

export default Navbar;
