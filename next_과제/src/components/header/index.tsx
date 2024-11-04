"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "antd";
import Icon from "@/components/icon-factory";
import { useHeader } from "./hook";
import styles from "./index.module.scss";
import { useLoadStore } from "@/commons/stores/load-store";

const Header = () => {
  const { isLoaded } = useLoadStore();

  const {
    isHeaderHide,
    menuItems,
    router,
    menuMouseOver,
    menuMouseOut,
    data,
    userLogOut,
  } = useHeader();

  if (!isHeaderHide)
    return (
      <header className="max-w-7xl flex justify-between items-center m-auto p-4 navbar max-xl:pr-24">
        <nav className="flex items-center gap-6">
          <h1>
            <Link href={"/"}>
              <Image
                className="dark:invert"
                src="/images/logo.png"
                alt="트립트립"
                width={52}
                height={32}
                style={{ cursor: "pointer", width: "52px", height: "32px" }}
              />
            </Link>
          </h1>
          <ul id={styles.menu}>
            {menuItems.map((item, idx) => (
              <li
                key={idx}
                onMouseOver={(e) => menuMouseOver(e)}
                // onMouseOut={(e) => menuMouseOut(e)}
              >
                <Link
                  className={item.children ? styles.subMenuParent : ""}
                  href={item.key || "#"}
                >
                  <span>{item.label}</span>
                  {item.children && (
                    <ul
                      className={styles.subMenu}
                      onMouseOut={(e) => menuMouseOut(e)}
                    >
                      {item.children.map((child) => (
                        <li
                          key={child.key}
                          onClick={() => router.push(child.label)}
                        >
                          {/* <Link href={child.key}>{child.label}</Link> */}
                          {child.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex gap-6">
          {isLoaded ? (
            <div className="flex justify-end items-center relative">
              <button
                className="flex gap-1 items-center"
                onClick={(e) => {
                  console.log(e.currentTarget);
                  e.currentTarget.nextElementSibling?.classList.toggle(
                    "hidden"
                  );
                }}
              >
                <Image
                  src={data?.picture ?? "/images/profile.png"}
                  alt={data?.name + "님의 프로필 사진"}
                  width={40}
                  height={40}
                />
                <div className="w-6 h-6">
                  <div className="blind">펼쳐보기</div>
                  <Icon icon="downArrow" className="w-6 h-6" />
                </div>
              </button>
              <div className="min-w-60 absolute bg-white text-nowrap right-0 top-0 shadow-lg rounded-lg p-5 flex flex-col gap-3 border border-gray-100 hidden">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src={data?.picture ?? "/images/profile.png"}
                      alt={data?.name + "님의 프로필 사진"}
                      width={40}
                      height={40}
                    />
                    <span>{data?.name}</span>
                  </div>
                  <button>
                    <div className="blind">펼쳐보기</div>
                    <Icon icon="downArrow" className="w-6 h-6" />
                  </button>
                </div>
                <hr />
                <div className="flex gap-2">
                  <Icon icon="point" className="w-6 h-6" />
                  <span className="text-base font-medium">
                    {data?.userPoint?.amount.toLocaleString("ko-KR")}P
                  </span>
                </div>
                <hr />
                <ul className="flex flex-col">
                  <li className="py-2 flex items-center gap-1">
                    <Icon icon="charge" className="w-4 h-4" />
                    <span className="text-sm">포인트 충전</span>
                  </li>
                  <li className="py-2 flex items-center gap-1">
                    <button onClick={() => userLogOut()}>
                      <Icon icon="logout" className="w-4 h-4" />
                      <span className="text-sm">로그아웃</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Button
              style={{ paddingRight: "15px" }}
              color="default"
              variant="solid"
              // type="default"
              shape="round"
              size="large"
              onClick={() => router.push("/login")}
              icon={
                <Icon
                  icon="rightArrow"
                  className="w-5 h-5 flex"
                  viewBox="-3 0 24 24"
                />
              }
              iconPosition="end"
            >
              로그인
            </Button>
          )}
        </div>
      </header>
    );
};
export default Header;
