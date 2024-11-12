import Image from "next/image";
import styles from "./styles.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import UserMenu from "./user-menu";
import { FetchUserLoggedInDocument } from "@/commons/graphql/graphql";

const Navigation = () => {
  const pathname = usePathname();
  const isboards = pathname.startsWith("/boards");
  const isProducts = pathname.startsWith("/products");
  const { data } = useQuery(FetchUserLoggedInDocument);

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  return (
    <div className={styles.navigation_box}>
      <div className={styles.navigation}>
        <div className={styles.left_area}>
          <Image
            src="/images/focuson.png"
            width={0}
            height={0}
            alt="로고이미지"
            sizes="100vw"
            className={styles.logo}
          />

          <Link
            href="/boards"
            className={isboards ? styles.active_menu : styles.menu}
          >
            포커스 톡
          </Link>

          <Link
            href="/products"
            className={isProducts ? styles.active_menu : styles.menu}
          >
            포커스 마켓
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
          {/* TODO:로그인 했으면 프로필 보여주기 */}
          {data ? (
            <div className={styles.user_profile}>
              <Image
                src="/images/profile.png"
                width={30}
                height={30}
                alt="프로필이미지"
              />
              <ChevronDown color="#919191" size={16} onClick={toggleDropdown} />
              {isDropDownOpen && <UserMenu data={data} />}
            </div>
          ) : (
            // 로그인 안했으면 로그인 버튼
            <div className={styles.button_box}>
              <Link href="/login" className={styles.login_button}>
                로그인
              </Link>
              <Link href="/signup" className={styles.signup_button}>
                회원가입
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navigation;
