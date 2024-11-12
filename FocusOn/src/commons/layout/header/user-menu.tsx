import Image from "next/image";
import styles from "./styles.module.css";
import { useMutation, useApolloClient } from "@apollo/client";
import { LogoutUserDocument } from "@/commons/graphql/graphql";
import { useRouter } from "next/navigation";
import { Coins, LogOut, Wallet } from "lucide-react";
import { useAccessTokenStore } from "@/commons/stores/accessToken";

export default function UserMenu(props) {
  const router = useRouter();
  const client = useApolloClient();
  const { setAccessToken } = useAccessTokenStore();
  const [logoutUser] = useMutation(LogoutUserDocument, {
    onCompleted: () => {
      // accessToken 제거
      setAccessToken("");

      // FetchUserLoggedInDocument 캐시 데이터 삭제
      client.cache.evict({ fieldName: "fetchUserLoggedIn" });
      client.cache.gc(); // 캐시 정리

      // 로그아웃 후 페이지 이동
      router.push("/products");
    },
    onError: (error) => {
      console.error("Logout Error:", error);
    },
  });

  const onClickLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.dropdown_content}>
      <div className={styles.dropdown_label}>
        <p className={styles.user_name}>
          {props.data?.fetchUserLoggedIn.name} 고객님
        </p>
        <div className={styles.points_container}>
          <Coins color="#ffd700" />
          <span className={styles.points_value}>
            {props.data?.fetchUserLoggedIn.userPoint.amount} P
          </span>
        </div>
      </div>
      <div className={styles.dropdown_separator} />
      <div className={styles.dropdown_item}>
        <Wallet className={styles.dropdown_item_icon} />
        <span>포인트 충전</span>
      </div>
      <div className={styles.dropdown_item} onClick={onClickLogout}>
        <LogOut className={styles.dropdown_item_icon} />
        <span>로그아웃</span>
      </div>
    </div>
  );
}
