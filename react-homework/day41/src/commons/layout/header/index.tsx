import Image from "next/image";
import styles from "./styles.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@apollo/client";
import { useAccessTokenStore } from "@/commons/stores";
import { FETCH_USER_LOGGED_IN } from "./queries";

const Navigation = () => {
  const pathname = usePathname();
  const isboards = pathname.startsWith("/boards");
  const isProducts = pathname.startsWith("/products");
  const { accessToken } = useAccessTokenStore();
  const { data } = useQuery(FETCH_USER_LOGGED_IN);
  console.log(data?.fetchUserLoggedIn.picture);
  return (
    <div className={styles.navigation_box}>
      <div className={styles.navigation}>
        <div className={styles.left_area}>
          <Image
            src="/images/logo.png"
            width={51.521}
            height={32}
            alt="로고이미지"
          />

          <Link
            href="/boards"
            className={isboards ? styles.active_menu : styles.menu}
          >
            트립토크
          </Link>

          <Link
            href="/products"
            className={isProducts ? styles.active_menu : styles.menu}
          >
            숙박권 구매
          </Link>
          <Link
            href="/mypage"
            className={
              pathname === "/mypage" ? styles.active_menu : styles.menu
            }
          >
            마이 페이지
          </Link>
        </div>
        <div className={styles.right_area}>
          {accessToken ? (
            <>
              <Image
                src="/images/profile.png"
                width={40}
                height={40}
                alt="프로필이미지"
              />
              <Image
                src="/images/down_arrow.png"
                width={24}
                height={24}
                alt="드롭다운"
              />
            </>
          ) : (
            <Link href="/login" className={styles.login_button}>
              로그인
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navigation;
