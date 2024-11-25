import Image from "next/image";
import styles from "./styles.module.css";
import { MouseEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginButton } from "@/commons/ui/button";
import { useAccessTokenStore } from "@/app/_store/accessToken/store";
import { useUserInfo } from "@/app/_store/userInfo-store";
import { useQuery } from "@apollo/client";
import { FetchUserLoggedInDocument } from "@/commons/gql/graphql";

export default function LayoutNavigation() {
  const navigationItem = ["트립토크", "숙박권 구매", "마이 페이지"];
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState(0);
  const { accessToken } = useAccessTokenStore();
  const { setUserInfo } = useUserInfo();
  const { data } = useQuery(FetchUserLoggedInDocument);

  const isLoggedIn = accessToken !== "" ? true : false;

  const onClickNavigationItem = (event: MouseEvent<HTMLInputElement>) => {
    const id = Number(event.currentTarget?.id);
    setSelectedItem(id);

    if (id === 0) router.push("/boards");
    if (id === 1) router.push("/travelproduct");
    if (id === 2) router.push("/mypage");
  };

  useEffect(() => {
    if (data?.fetchUserLoggedIn) setUserInfo(data.fetchUserLoggedIn);
  }, [data]);

  return (
    <div className={styles.navigationContainer__wrapper}>
      <div className={styles.navigationContainer}>
        <div className={styles.navigationLeftItemContainer}>
          <Image
            src="/assets/logo_area.png"
            alt="로고 이미지"
            width={56}
            height={32}
          ></Image>
          <div className={styles.navigationItemContainer}>
            {navigationItem.map((el, index) => (
              <span
                key={el}
                id={String(index)}
                className={
                  selectedItem === index
                    ? styles.navigationSelectedItem
                    : styles.navigationItem
                }
                onClick={onClickNavigationItem}
              >
                {el}
              </span>
            ))}
          </div>
        </div>

        {isLoggedIn ? (
          <div className={styles.profileContainer}>
            <button className={styles.profileButton}>
              {data?.fetchUserLoggedIn.picture ? (
                <Image
                  src={`https://storage.googleapis.com/${data.fetchUserLoggedIn.picture}`}
                  alt="프로필 이미지"
                  width={25}
                  height={25}
                ></Image>
              ) : (
                <Image
                  src="/assets/profile_icon.png"
                  alt="프로필 이미지"
                  width={25}
                  height={25}
                ></Image>
              )}
            </button>
            <button className={styles.arrowDownButton}>
              <Image
                src="/assets/arrow_down.png"
                alt="프로필 이미지 더보기"
                width={7.5}
                height={7.5}
                sizes="100vw"
              ></Image>
            </button>
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  );
}
